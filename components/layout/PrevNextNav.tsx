"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import type { SidebarItem, SidebarGroup as ConfigSidebarGroup } from "@/lib/types/config";

interface FlatItem {
  label: string;
  href: string;
}

function flattenSidebar(items: SidebarItem[]): FlatItem[] {
  const flat: FlatItem[] = [];
  for (const item of items) {
    if (item.slug || item.href) {
      flat.push({ label: item.label, href: item.href || `/docs/${item.slug}` });
    }
    if (item.items) flat.push(...flattenSidebar(item.items));
  }
  return flat;
}

interface PrevNextNavProps {
  sidebarConfig?: ConfigSidebarGroup[];
}

export function PrevNextNav({ sidebarConfig }: PrevNextNavProps) {
  const pathname = usePathname();
  const sidebar = sidebarConfig || [];

  const allItems: FlatItem[] = [];
  for (const group of sidebar) {
    allItems.push(...flattenSidebar(group.items));
  }

  const currentIndex = allItems.findIndex((item) => item.href === pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="not-prose flex items-center justify-between gap-4 mt-12 pt-6 border-t border-border">
      {prev ? (
        <Link href={prev.href} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Icon icon="lucide:arrow-left" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Previous</div>
            <div className="font-medium">{prev.label}</div>
          </div>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={next.href} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto">
          <div className="text-left">
            <div className="text-xs text-muted-foreground">Next</div>
            <div className="font-medium">{next.label}</div>
          </div>
          <Icon icon="lucide:arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : <div />}
    </nav>
  );
}
