"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

type AlertVariant = "note" | "tip" | "info" | "warning" | "danger" | "caution" | "important";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  { icon: string; bgClass: string; borderClass: string; iconClass: string; titleClass: string }
> = {
  note: {
    icon: "lucide:pencil",
    bgClass: "bg-note-light",
    borderClass: "border-note",
    iconClass: "text-note",
    titleClass: "text-note",
  },
  tip: {
    icon: "lucide:lightbulb",
    bgClass: "bg-success-light",
    borderClass: "border-success",
    iconClass: "text-success",
    titleClass: "text-success",
  },
  info: {
    icon: "lucide:info",
    bgClass: "bg-info-light",
    borderClass: "border-info",
    iconClass: "text-info",
    titleClass: "text-info",
  },
  warning: {
    icon: "lucide:triangle-alert",
    bgClass: "bg-warning-light",
    borderClass: "border-warning",
    iconClass: "text-warning",
    titleClass: "text-warning",
  },
  danger: {
    icon: "lucide:octagon-x",
    bgClass: "bg-danger-light",
    borderClass: "border-danger",
    iconClass: "text-danger",
    titleClass: "text-danger",
  },
  caution: {
    icon: "lucide:triangle-alert",
    bgClass: "bg-warning-light",
    borderClass: "border-warning",
    iconClass: "text-warning",
    titleClass: "text-warning",
  },
  important: {
    icon: "lucide:message-circle-warning",
    bgClass: "bg-note-light",
    borderClass: "border-note",
    iconClass: "text-note",
    titleClass: "text-note",
  },
};

const variantTitles: Record<AlertVariant, string> = {
  note: "Note",
  tip: "Tip",
  info: "Info",
  warning: "Warning",
  danger: "Danger",
  caution: "Caution",
  important: "Important",
};

export function Alert({ variant = "note", title, children }: AlertProps) {
  const config = variantConfig[variant];
  const displayTitle = title || variantTitles[variant];

  return (
    <div
      className={clsx(
        "not-prose my-4 rounded-lg border-l-4 p-4",
        config.bgClass,
        config.borderClass
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon icon={config.icon} className={clsx("h-5 w-5 mt-0.5 flex-shrink-0", config.iconClass)} />
        <div className="flex-1 min-w-0">
          <p className={clsx("font-semibold text-sm mb-1", config.titleClass)}>{displayTitle}</p>
          <div className="text-sm text-foreground/90 prose-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
