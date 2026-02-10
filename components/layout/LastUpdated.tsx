import { Icon } from "@iconify/react";
import type { LastUpdatedConfig } from "@/lib/types/config";

interface LastUpdatedProps {
  lastModified?: string;
  lastUpdatedConfig?: LastUpdatedConfig;
}

export function LastUpdated({ lastModified, lastUpdatedConfig }: LastUpdatedProps) {
  if (!lastUpdatedConfig?.enabled || !lastModified) return null;

  const date = new Date(lastModified);
  const format = lastUpdatedConfig.format || "long";

  let formatted: string;
  if (format === "relative") {
    const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) formatted = "today";
    else if (diffDays === 1) formatted = "yesterday";
    else if (diffDays < 30) formatted = `${diffDays} days ago`;
    else if (diffDays < 365) formatted = `${Math.floor(diffDays / 30)} months ago`;
    else formatted = `${Math.floor(diffDays / 365)} years ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = format === "short"
      ? { year: "numeric", month: "short", day: "numeric" }
      : { year: "numeric", month: "long", day: "numeric" };
    formatted = date.toLocaleDateString("en", options);
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Icon icon="lucide:clock" width={14} />
      <span>Last updated: {formatted}</span>
    </div>
  );
}
