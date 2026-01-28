"use client";

import { Header } from "@/components/layout/Header";
import { useSearch } from "@/components/providers/SearchProvider";

interface DocHeaderProps {
  siteName?: string;
  logo?: string;
  githubUrl?: string;
  discordUrl?: string;
}

export function DocHeader(props: DocHeaderProps) {
  const { openSearch } = useSearch();
  return <Header {...props} onSearchClick={openSearch} />;
}
