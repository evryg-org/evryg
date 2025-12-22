import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, "../content");

interface BrokenLink {
  file: string;
  line: number;
  linkText: string;
  href: string;
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

function buildValidUrls(mdxFiles: string[]): Set<string> {
  const urls = new Set<string>();

  for (const file of mdxFiles) {
    // content/fr/section/slug/index.mdx → /fr/section/slug
    const relativePath = relative(CONTENT_DIR, file);
    const url =
      "/" +
      relativePath
        .replace(/\/index\.mdx$/, "")
        .replace(/\.mdx$/, "");
    urls.add(url);
  }

  return urls;
}

function extractInternalLinks(
  content: string
): Array<{ line: number; linkText: string; href: string }> {
  const links: Array<{ line: number; linkText: string; href: string }> = [];
  const lines = content.split("\n");

  // Match markdown links: [text](href)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(line)) !== null) {
      const [, linkText, href] = match;

      // Only internal links (starting with /)
      if (href.startsWith("/")) {
        links.push({
          line: i + 1,
          linkText,
          href,
        });
      }
    }
  }

  return links;
}

function normalizeUrl(url: string): string {
  // Strip anchor (#...)
  const withoutAnchor = url.split("#")[0];
  // Strip trailing slash
  return withoutAnchor.replace(/\/$/, "");
}

function main() {
  console.log("Scanning content directory...\n");

  const mdxFiles = getAllMdxFiles(CONTENT_DIR);
  console.log(`Found ${mdxFiles.length} MDX files\n`);

  const validUrls = buildValidUrls(mdxFiles);
  console.log(`Built ${validUrls.size} valid URLs\n`);

  const brokenLinks: BrokenLink[] = [];

  for (const file of mdxFiles) {
    const content = readFileSync(file, "utf-8");
    const links = extractInternalLinks(content);

    for (const { line, linkText, href } of links) {
      const normalizedHref = normalizeUrl(href);

      if (!validUrls.has(normalizedHref)) {
        brokenLinks.push({
          file: relative(CONTENT_DIR, file),
          line,
          linkText,
          href,
        });
      }
    }
  }

  if (brokenLinks.length === 0) {
    console.log("No broken links found!");
    process.exit(0);
  }

  console.log(`Found ${brokenLinks.length} broken link(s):\n`);

  for (const { file, line, linkText, href } of brokenLinks) {
    console.log(`${file}:${line}`);
    console.log(`  Text: "${linkText}"`);
    console.log(`  Href: ${href}\n`);
  }

  process.exit(1);
}

main();
