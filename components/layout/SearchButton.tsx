"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";

interface SearchButtonProps {
  className?: string;
  iconOnly?: boolean;
  onClick?: () => void;
}

export function SearchButton({ className, iconOnly, onClick }: SearchButtonProps) {
  // The onClick prop is optional - if provided, use it; otherwise do nothing
  // This allows the button to work both with and without SearchProvider
  const handleClick = onClick || (() => {});

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={clsx(
          "p-2 rounded-lg hover:bg-muted transition-colors",
          className
        )}
        aria-label="Search"
      >
        <Icon icon="lucide:search" className="w-5 h-5 text-muted-foreground" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "search-input flex items-center gap-2 text-left cursor-pointer",
        className
      )}
    >
      <Icon icon="lucide:search" className="w-4 h-4 text-muted-foreground" />
      <span className="text-muted-foreground text-sm">Search documentation...</span>
      <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border text-muted-foreground">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
