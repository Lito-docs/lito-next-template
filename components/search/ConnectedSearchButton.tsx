"use client";

import { SearchButton } from "@/components/layout/SearchButton";
import { useSearch } from "@/components/providers/SearchProvider";

interface ConnectedSearchButtonProps {
  className?: string;
  iconOnly?: boolean;
}

export function ConnectedSearchButton(props: ConnectedSearchButtonProps) {
  const { openSearch } = useSearch();
  return <SearchButton {...props} onClick={openSearch} />;
}
