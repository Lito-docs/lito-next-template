import Link from "next/link";
import { Icon } from "@iconify/react";
import { Header, Footer } from "@/components/layout";
import { getConfig, getLanding } from "@/lib/config";
import { replacePlaceholders } from "@/lib/utils/sidebar";

export default function HomePage() {
  const config = getConfig();
  const landing = getLanding();
  const footer = config.footer;

  // Get values from config
  const siteName = config.metadata.name;
  const githubUrl = footer?.socials?.github;
  const heroTitle = landing?.hero?.title || "Beautiful docs made simple";
  const heroSubtitle = landing?.hero?.subtitle || config.metadata.description;
  const features = landing?.features || defaultFeatures;
  const ctaButtons = landing?.hero?.cta || [
    { label: "Get Started", href: "/docs", variant: "primary" as const },
  ];

  const copyright = footer?.copyright
    ? replacePlaceholders(footer.copyright)
    : `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        siteName={siteName}
        githubUrl={githubUrl}
        discordUrl={footer?.socials?.discord}
      />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary-100 text-primary-700">
              <Icon icon="lucide:sparkles" className="w-4 h-4" />
              Open Source Documentation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              {heroTitle.includes("simple") ? (
                <>
                  {heroTitle.replace("simple", "")}
                  <span className="text-primary-600">simple</span>
                </>
              ) : (
                heroTitle
              )}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {ctaButtons.map((cta, index) => (
                cta.variant === "primary" ? (
                  <Link
                    key={index}
                    href={cta.href}
                    className="cta-button inline-flex items-center gap-2"
                  >
                    {cta.label}
                    <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={cta.href}
                    target={cta.href.startsWith("http") ? "_blank" : undefined}
                    rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    {cta.href.includes("github") && (
                      <Icon icon="lucide:github" className="w-4 h-4" />
                    )}
                    {cta.label}
                  </a>
                )
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything you need for great docs
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon || "lucide:star"}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8">
              Start building beautiful documentation in minutes.
            </p>
            <Link href="/docs" className="cta-button inline-flex items-center gap-2">
              Read the Docs
              <Icon icon="lucide:arrow-right" className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer
        copyright={copyright}
        socials={footer?.socials}
        columns={footer?.links?.map((section) => ({
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

const defaultFeatures = [
  {
    icon: "lucide:palette",
    title: "Beautiful by Default",
    description: "Professional design system with light and dark mode support out of the box.",
  },
  {
    icon: "lucide:component",
    title: "MDX Components",
    description: "25+ pre-built components like alerts, cards, tabs, and code blocks.",
  },
  {
    icon: "lucide:search",
    title: "Full-Text Search",
    description: "Fast, client-side search powered by Pagefind for instant results.",
  },
  {
    icon: "lucide:code-2",
    title: "Syntax Highlighting",
    description: "Beautiful code blocks with line highlighting and copy button.",
  },
  {
    icon: "lucide:globe",
    title: "i18n Ready",
    description: "Built-in internationalization support for multi-language docs.",
  },
  {
    icon: "lucide:git-branch",
    title: "Versioning",
    description: "Document multiple versions of your project with version switching.",
  },
];

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="feature-card">
      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
        <Icon icon={icon} className="w-5 h-5 text-primary-600" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
