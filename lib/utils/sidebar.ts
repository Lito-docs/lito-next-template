import type { SidebarGroup as ConfigSidebarGroup, SidebarItem as ConfigSidebarItem } from "@/lib/types/config";
import type { SidebarGroup, NavItem } from "@/components/layout/Sidebar";

/**
 * Convert config sidebar format to component sidebar format
 */
export function convertSidebar(configSidebar: ConfigSidebarGroup[]): SidebarGroup[] {
  return configSidebar.map((group) => ({
    title: group.label,
    items: convertSidebarItems(group.items),
  }));
}

function convertSidebarItems(items: ConfigSidebarItem[]): NavItem[] {
  return items.map((item) => ({
    title: item.label,
    href: item.href || (item.slug ? `/docs/${item.slug}` : undefined),
    icon: item.icon,
    items: item.items ? convertSidebarItems(item.items) : undefined,
  }));
}

/**
 * Get the current year for copyright
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Replace placeholders in strings
 */
export function replacePlaceholders(text: string): string {
  return text.replace("{year}", getCurrentYear().toString());
}
