import Link from "next/link";
import { Icon } from "@iconify/react";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  columns?: FooterColumn[];
  copyright?: string;
  socials?: {
    github?: string;
    twitter?: string;
    discord?: string;
  };
}

export function Footer({ columns = [], copyright, socials }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {columns.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {columns.map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {copyright || `© ${currentYear} All rights reserved.`}
          </p>

          {socials && (
            <div className="flex items-center gap-4">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Icon icon="lucide:github" className="w-5 h-5" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Icon icon="lucide:twitter" className="w-5 h-5" />
                </a>
              )}
              {socials.discord && (
                <a
                  href={socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Discord"
                >
                  <Icon icon="simple-icons:discord" className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <a
              href="https://github.com/Lito-docs/lito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Lito
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
