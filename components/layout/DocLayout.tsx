import { ReactNode } from "react";
import { DocHeader } from "./DocHeader";
import { Sidebar, SidebarGroup } from "./Sidebar";
import { Footer } from "./Footer";
import { TableOfContents } from "./TableOfContents";
import { Breadcrumbs } from "./Breadcrumbs";
import { getConfig, getSidebar } from "@/lib/config";
import { convertSidebar, replacePlaceholders } from "@/lib/utils/sidebar";

interface DocLayoutProps {
  children: ReactNode;
  sidebar?: SidebarGroup[];
  showToc?: boolean;
  showBreadcrumbs?: boolean;
  /** Override site name from config */
  siteName?: string;
  /** Override logo from config */
  logo?: string;
  /** Override github URL from config */
  githubUrl?: string;
}

export function DocLayout({
  children,
  sidebar,
  showToc = true,
  showBreadcrumbs = true,
  siteName,
  logo,
  githubUrl,
}: DocLayoutProps) {
  // Load config
  const config = getConfig();
  const configSidebar = getSidebar();

  // Use provided props or fall back to config
  const finalSiteName = siteName || config.metadata.name;
  const finalLogo = logo || config.branding?.logo?.light;
  const finalGithubUrl = githubUrl || config.footer?.socials?.github;

  // Convert config sidebar to component format, or use provided sidebar
  const finalSidebar = sidebar || (configSidebar.length > 0 ? convertSidebar(configSidebar) : getDefaultSidebar());

  // Get footer config
  const footerConfig = config.footer;
  const copyright = footerConfig?.copyright
    ? replacePlaceholders(footerConfig.copyright)
    : `© ${new Date().getFullYear()} ${finalSiteName}. All rights reserved.`;

  return (
    <div className="min-h-screen flex flex-col">
      <DocHeader
        siteName={finalSiteName}
        logo={finalLogo}
        githubUrl={finalGithubUrl}
        discordUrl={footerConfig?.socials?.discord}
      />

      <div className="layout-container pt-16">
        <Sidebar groups={finalSidebar} />

        <main className="main-content">
          <article className="docs-prose">
            {showBreadcrumbs && <Breadcrumbs />}
            {children}
          </article>
        </main>

        {showToc && <TableOfContents />}
      </div>

      <Footer
        copyright={copyright}
        socials={footerConfig?.socials}
        columns={footerConfig?.links?.map((section) => ({
          title: section.title,
          links: section.items.map((item) => ({
            title: item.label,
            href: item.href,
          })),
        }))}
      />
    </div>
  );
}

// Default sidebar for when config is empty
function getDefaultSidebar(): SidebarGroup[] {
  return [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs", icon: "lucide:book-open" },
        { title: "Installation", href: "/docs/installation", icon: "lucide:download" },
        { title: "Quick Start", href: "/docs/quickstart", icon: "lucide:rocket" },
      ],
    },
    {
      title: "Guides",
      items: [
        { title: "Configuration", href: "/docs/configuration", icon: "lucide:settings" },
        { title: "Themes", href: "/docs/themes", icon: "lucide:palette" },
        { title: "Components", href: "/docs/components", icon: "lucide:component" },
      ],
    },
  ];
}
