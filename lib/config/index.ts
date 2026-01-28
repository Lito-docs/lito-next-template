import fs from "fs";
import path from "path";
import type { DocsConfig, SidebarGroup } from "../types/config";

let configCache: DocsConfig | null = null;

/**
 * Get the docs configuration from docs-config.json
 * Returns default config if file doesn't exist
 */
export function getConfig(): DocsConfig {
  if (configCache) return configCache;

  const configPath = path.join(process.cwd(), "docs-config.json");

  if (!fs.existsSync(configPath)) {
    return getDefaultConfig();
  }

  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    configCache = JSON.parse(raw);
    return configCache!;
  } catch (error) {
    console.warn("Failed to parse docs-config.json, using defaults:", error);
    return getDefaultConfig();
  }
}

/**
 * Clear the config cache (useful for hot reloading)
 */
export function clearConfigCache(): void {
  configCache = null;
}

/**
 * Get default configuration
 */
export function getDefaultConfig(): DocsConfig {
  return {
    metadata: {
      name: "Documentation",
      description: "Project documentation",
      url: "https://docs.example.com",
      version: "1.0.0",
    },
    branding: {
      logo: {
        light: "/logo-light.svg",
        dark: "/logo-dark.svg",
        href: "/",
      },
      favicon: "/favicon.svg",
      colors: {
        primary: "#10B981",
      },
    },
    theme: {
      mode: "auto",
      defaultDark: false,
    },
    navigation: {
      navbar: {
        links: [],
        cta: {
          label: "Get Started",
          href: "/docs",
          type: "button",
        },
      },
      sidebar: [],
    },
    footer: {
      layout: "full",
      showBranding: true,
      showVersion: true,
      socials: {},
      links: [],
      bottomLinks: [],
    },
    search: {
      enabled: false,
      provider: "local",
      placeholder: "Search docs...",
    },
    seo: {
      enableJsonLd: true,
      articleType: "TechArticle",
      autoCanonical: true,
      enableBreadcrumbs: true,
    },
    landing: {
      enabled: true,
      type: "default",
    },
  };
}

/**
 * Get sidebar navigation from config
 */
export function getSidebar(): SidebarGroup[] {
  const config = getConfig();
  return config.navigation?.sidebar || [];
}

/**
 * Get navbar configuration
 */
export function getNavbar() {
  const config = getConfig();
  return config.navigation?.navbar;
}

/**
 * Get branding configuration
 */
export function getBranding() {
  const config = getConfig();
  return config.branding;
}

/**
 * Get footer configuration
 */
export function getFooter() {
  const config = getConfig();
  return config.footer;
}

/**
 * Get SEO configuration
 */
export function getSEO() {
  const config = getConfig();
  return config.seo;
}

/**
 * Get landing page configuration
 */
export function getLanding() {
  const config = getConfig();
  return config.landing;
}

/**
 * Get metadata
 */
export function getMetadata() {
  const config = getConfig();
  return config.metadata;
}

/**
 * Get theme configuration
 */
export function getTheme() {
  const config = getConfig();
  return config.theme;
}

/**
 * Get search configuration
 */
export function getSearch() {
  const config = getConfig();
  return config.search;
}
