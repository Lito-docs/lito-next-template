"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchButton } from "./SearchButton";
import { VersionSwitcher } from "./VersionSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { VersioningConfig } from "@/lib/utils/versioning";
import type { I18nConfig } from "@/lib/types/config";

interface HeaderProps {
  siteName?: string;
  logo?: string;
  githubUrl?: string;
  discordUrl?: string;
  onSearchClick?: () => void;
  versioningConfig?: VersioningConfig;
  i18nConfig?: I18nConfig;
}

export function Header({
  siteName = "Lito Docs",
  logo,
  githubUrl,
  discordUrl,
  onSearchClick,
  versioningConfig,
  i18nConfig,
}: HeaderProps) {
  return (
    <header className="topbar h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left: Logo and site name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 no-underline">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={siteName} className="h-8 w-auto" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <Icon icon="lucide:book-open" className="w-4 h-4 text-white" />
              </div>
            )}
            <span className="font-semibold text-foreground hidden sm:inline">
              {siteName}
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <SearchButton onClick={onSearchClick} />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <SearchButton className="md:hidden" iconOnly onClick={onSearchClick} />

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="GitHub"
            >
              <Icon icon="lucide:github" className="w-5 h-5 text-muted-foreground" />
            </a>
          )}

          {discordUrl && (
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Discord"
            >
              <Icon icon="simple-icons:discord" className="w-5 h-5 text-muted-foreground" />
            </a>
          )}

          <VersionSwitcher versioningConfig={versioningConfig} />
          <LanguageSwitcher i18nConfig={i18nConfig} />
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Icon icon="lucide:menu" className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
