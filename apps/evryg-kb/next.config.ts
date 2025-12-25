import type { NextConfig } from "next";
import nextra from 'nextra'

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  },
  // Enable Turbopack filesystem cache for faster subsequent dev server starts
  // (becomes default in Next.js 16.1)
  experimental: {
    turbopackFileSystemCacheForDev: true
  }
};

// Set up Nextra with its configuration
const withNextra = nextra({
  latex: true,
  unstable_shouldAddLocaleToLinks: true
})

// Export the final Next.js config with Nextra included
export default withNextra(nextConfig)