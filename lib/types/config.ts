/**
 * Core Configuration Types for Lito Next.js Template
 *
 * These types define the configuration structure for docs-config.json
 */

// ============================================================================
// CORE CONFIG
// ============================================================================

export interface DocsConfig {
  metadata: MetadataConfig;
  branding?: BrandingConfig;
  navigation?: NavigationConfig;
  footer?: FooterConfig;
  theme?: ThemeConfig;
  search?: SearchConfig;
  seo?: SEOConfig;
  i18n?: I18nConfig;
  landing?: LandingConfig;
  integrations?: IntegrationsConfig;
  versioning?: VersioningConfig;
}

export interface MetadataConfig {
  /** Site name - REQUIRED */
  name: string;
  /** Site description */
  description?: string;
  /** Production URL */
  url?: string;
  /** Documentation version */
  version?: string;
}

export interface BrandingConfig {
  logo?: LogoConfig;
  favicon?: string;
  colors?: {
    /** Primary brand color */
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  fonts?: {
    body?: string;
    code?: string;
  };
}

export interface LogoConfig {
  light?: string;
  dark?: string;
  href?: string;
}

export interface NavigationConfig {
  navbar?: NavbarConfig;
  sidebar?: SidebarGroup[];
}

export interface NavbarConfig {
  links?: NavLink[];
  cta?: {
    label: string;
    href: string;
    type?: "button" | "link";
  };
}

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface SidebarGroup {
  label: string;
  icon?: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  slug?: string;
  href?: string;
  icon?: string;
  /** HTTP method for API endpoints */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Nested items for sub-groups */
  items?: SidebarItem[];
}

export interface FooterConfig {
  logo?: {
    src: string;
    alt?: string;
    href?: string;
    height?: number;
  };
  tagline?: string;
  copyright?: string;
  showBranding?: boolean;
  showVersion?: boolean;
  layout?: "full" | "compact" | "centered";
  socials?: {
    github?: string;
    twitter?: string;
    discord?: string;
    linkedin?: string;
    youtube?: string;
    email?: string;
  };
  links?: FooterSection[];
  bottomLinks?: FooterLink[];
}

export interface FooterSection {
  title: string;
  items: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ThemeConfig {
  mode?: "auto" | "light" | "dark";
  defaultDark?: boolean;
  primaryColor?: string;
  accentColor?: string;
}

export interface SearchConfig {
  enabled?: boolean;
  provider?: "local" | "algolia";
  placeholder?: string;
  algolia?: {
    appId: string;
    apiKey: string;
    indexName: string;
  };
}

export interface SEOConfig {
  ogImage?: string;
  twitterHandle?: string;
  twitterSite?: string;
  defaultAuthor?: string;
  defaultKeywords?: string[];
  enableJsonLd?: boolean;
  organizationName?: string;
  organizationLogo?: string;
  articleType?: "TechArticle" | "Article";
  autoCanonical?: boolean;
  enableBreadcrumbs?: boolean;
}

export interface I18nConfig {
  defaultLocale?: string;
  locales?: string[];
  routing?: {
    prefixDefaultLocale?: boolean;
  };
  translations?: Record<string, Record<string, string>>;
}

export interface LandingConfig {
  enabled?: boolean;
  type?: "default" | "custom" | "sections" | "none";
  hero?: {
    title: string;
    subtitle?: string;
    version?: string;
    cta?: Array<{
      label: string;
      href: string;
      variant?: "primary" | "secondary";
    }>;
  };
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface IntegrationsConfig {
  analytics?: {
    provider: "google" | "plausible" | "fathom";
    measurementId: string;
  } | null;
  feedback?: FeedbackConfig;
  editPage?: EditPageConfig;
  lastUpdated?: LastUpdatedConfig;
  copyPage?: CopyPageConfig;
}

export interface EditPageConfig {
  enabled?: boolean;
  pattern?: string;
}

export interface LastUpdatedConfig {
  enabled?: boolean;
  format?: "long" | "short" | "relative";
}

export interface FeedbackConfig {
  enabled?: boolean;
  webhookUrl?: string;
}

export interface CopyPageConfig {
  enabled?: boolean;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  aiProviders?: Array<{
    name: string;
    label: string;
    icon: string;
  }>;
  contextPrompt?: string;
}

export interface VersioningConfig {
  enabled?: boolean;
  defaultVersion?: string;
  versions?: Array<{
    id: string;
    label: string;
    path: string;
    deprecated?: boolean;
  }>;
  versionBanner?: {
    enabled?: boolean;
    message?: string;
  };
}
