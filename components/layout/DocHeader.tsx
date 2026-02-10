"use client";

import { Header } from "@/components/layout/Header";
import { useSearch } from "@/components/providers/SearchProvider";
import type { VersioningConfig } from "@/lib/utils/versioning";
import type { I18nConfig } from "@/lib/types/config";

interface DocHeaderProps {
  siteName?: string;
  logo?: string;
  githubUrl?: string;
  discordUrl?: string;
  versioningConfig?: VersioningConfig;
  i18nConfig?: I18nConfig;
}

export function DocHeader(props: DocHeaderProps) {
  const { openSearch } = useSearch();
  return <Header {...props} onSearchClick={openSearch} />;
}
