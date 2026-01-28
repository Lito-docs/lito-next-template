"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import clsx from "clsx";

export interface NavItem {
  title: string;
  href?: string;
  icon?: string;
  items?: NavItem[];
}

export interface SidebarGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  groups: SidebarGroup[];
}

export function Sidebar({ groups }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar scrollbar-hide py-4">
      <nav>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="sidebar-group-header">{group.title}</h3>
            <ul className="space-y-0.5">
              {group.items.map((item, itemIndex) => (
                <SidebarItem key={itemIndex} item={item} pathname={pathname} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  item: NavItem;
  pathname: string;
  depth?: number;
}

function SidebarItem({ item, pathname, depth = 0 }: SidebarItemProps) {
  const isActive = item.href === pathname;
  const hasChildren = item.items && item.items.length > 0;

  if (hasChildren) {
    return (
      <li>
        <div className="sidebar-group-header mt-4 first:mt-0">{item.title}</div>
        <ul className="space-y-0.5">
          {item.items?.map((child, index) => (
            <SidebarItem key={index} item={child} pathname={pathname} depth={depth + 1} />
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href || "#"}
        className={clsx(
          "sidebar-link",
          isActive && "sidebar-link-active"
        )}
        style={{ paddingLeft: `${1 + depth * 0.75}rem` }}
      >
        {item.icon && (
          <Icon icon={item.icon} className="w-4 h-4 flex-shrink-0" />
        )}
        <span>{item.title}</span>
      </Link>
    </li>
  );
}
