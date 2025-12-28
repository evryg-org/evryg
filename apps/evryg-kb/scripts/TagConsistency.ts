import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, "../content");

interface ArticleInfo {
  file: string;
  lang: "en" | "fr";
  canonicalSlug: string;
  tags: string[];
}

interface TagInconsistency {
  canonicalSlug: string;
  enFile: string;
  frFile: string;
  enTags: string[];
  frTags: string[];
  onlyInEn: string[];
  onlyInFr: string[];
}

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (entry.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    // Handle tags array: tags: [tag1, tag2, tag3]
    const tagsMatch = line.match(/^tags:\s*\[(.*)\]$/);
    if (tagsMatch) {
      frontmatter.tags = tagsMatch[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      continue;
    }

    // Handle simple key: value
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      // Remove quotes if present
      frontmatter[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return frontmatter;
}

function getSlugFromPath(filePath: string): string {
  // Extract the folder name containing index.mdx
  // e.g., .../les-monoides-une-abstraction-omnipresente/index.mdx -> les-monoides-une-abstraction-omnipresente
  const parts = filePath.split("/");
  const indexOfFile = parts.findIndex((p) => p === "index.mdx");
  return indexOfFile > 0 ? parts[indexOfFile - 1] : "";
}

function parseArticle(filePath: string): ArticleInfo | null {
  const content = readFileSync(filePath, "utf-8");
  const frontmatter = extractFrontmatter(content);

  // Skip non-article pages
  if (frontmatter.pageType !== "article") {
    return null;
  }

  const relativePath = relative(CONTENT_DIR, filePath);
  const lang = relativePath.startsWith("en/") ? "en" : "fr";

  // For EN: use canonical-slug from frontmatter
  // For FR: use the folder name (which is the canonical slug)
  let canonicalSlug: string;
  if (lang === "en") {
    canonicalSlug = frontmatter["canonical-slug"] as string;
    if (!canonicalSlug) {
      console.warn(`Warning: EN article missing canonical-slug: ${relativePath}`);
      return null;
    }
  } else {
    canonicalSlug = getSlugFromPath(filePath);
  }

  const tags = (frontmatter.tags as string[]) || [];

  return {
    file: relativePath,
    lang,
    canonicalSlug,
    tags,
  };
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

function findDifferences(a: string[], b: string[]): { onlyInA: string[]; onlyInB: string[] } {
  const setA = new Set(a);
  const setB = new Set(b);
  return {
    onlyInA: a.filter((x) => !setB.has(x)),
    onlyInB: b.filter((x) => !setA.has(x)),
  };
}

function main() {
  console.log("Checking tag consistency across language versions...\n");

  const mdxFiles = getAllMdxFiles(CONTENT_DIR);
  console.log(`Found ${mdxFiles.length} MDX files\n`);

  // Group articles by canonical slug
  const articlesBySlug = new Map<string, { en?: ArticleInfo; fr?: ArticleInfo }>();

  for (const file of mdxFiles) {
    const article = parseArticle(file);
    if (!article) continue;

    const existing = articlesBySlug.get(article.canonicalSlug) || {};
    existing[article.lang] = article;
    articlesBySlug.set(article.canonicalSlug, existing);
  }

  console.log(`Found ${articlesBySlug.size} unique articles\n`);

  // Find inconsistencies
  const inconsistencies: TagInconsistency[] = [];
  const missingTranslations: { slug: string; lang: "en" | "fr"; file: string }[] = [];

  for (const [slug, versions] of articlesBySlug) {
    if (!versions.en || !versions.fr) {
      const existing = versions.en || versions.fr;
      if (existing) {
        missingTranslations.push({
          slug,
          lang: existing.lang === "en" ? "fr" : "en",
          file: existing.file,
        });
      }
      continue;
    }

    if (!arraysEqual(versions.en.tags, versions.fr.tags)) {
      const { onlyInA: onlyInEn, onlyInB: onlyInFr } = findDifferences(
        versions.en.tags,
        versions.fr.tags
      );

      inconsistencies.push({
        canonicalSlug: slug,
        enFile: versions.en.file,
        frFile: versions.fr.file,
        enTags: versions.en.tags,
        frTags: versions.fr.tags,
        onlyInEn,
        onlyInFr,
      });
    }
  }

  // Report missing translations
  if (missingTranslations.length > 0) {
    console.log(`Found ${missingTranslations.length} article(s) missing translations:\n`);
    for (const { slug, lang, file } of missingTranslations) {
      console.log(`  ${slug}`);
      console.log(`    Has: ${file}`);
      console.log(`    Missing: ${lang.toUpperCase()} version\n`);
    }
  }

  // Report tag inconsistencies
  if (inconsistencies.length === 0) {
    console.log("No tag inconsistencies found!");
    process.exit(0);
  }

  console.log(`Found ${inconsistencies.length} tag inconsistency(ies):\n`);

  for (const inc of inconsistencies) {
    console.log(`Article: ${inc.canonicalSlug}`);
    console.log(`  EN: ${inc.enFile}`);
    console.log(`  FR: ${inc.frFile}`);
    if (inc.onlyInEn.length > 0) {
      console.log(`  Only in EN: [${inc.onlyInEn.join(", ")}]`);
    }
    if (inc.onlyInFr.length > 0) {
      console.log(`  Only in FR: [${inc.onlyInFr.join(", ")}]`);
    }
    console.log();
  }

  process.exit(1);
}

main();
