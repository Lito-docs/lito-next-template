"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import type { EditPageConfig } from "@/lib/types/config";

interface EditPageLinkProps {
  editPageConfig?: EditPageConfig;
}

export function EditPageLink({ editPageConfig }: EditPageLinkProps) {
  const pathname = usePathname();
  const editConfig = editPageConfig;

  if (!editConfig?.enabled || !editConfig.pattern) return null;

  const cleanPath = pathname.replace(/^\/|\/$/g, "") || "index";
  const filePath = `${cleanPath}.mdx`;
  const editUrl = editConfig.pattern.replace("{path}", filePath);

  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
    >
      <Icon icon="lucide:pencil" width={14} />
      <span>Edit this page</span>
    </a>
  );
}
