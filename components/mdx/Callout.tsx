"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

type CalloutVariant = "default" | "info" | "warning" | "danger" | "success";

interface CalloutProps {
  variant?: CalloutVariant;
  emoji?: string;
  children: ReactNode;
}

const variantConfig: Record<
  CalloutVariant,
  { bgClass: string; borderClass: string; iconClass: string }
> = {
  default: {
    bgClass: "bg-muted/50",
    borderClass: "border-border",
    iconClass: "text-muted-foreground",
  },
  info: {
    bgClass: "bg-info-light",
    borderClass: "border-info",
    iconClass: "text-info",
  },
  warning: {
    bgClass: "bg-warning-light",
    borderClass: "border-warning",
    iconClass: "text-warning",
  },
  danger: {
    bgClass: "bg-danger-light",
    borderClass: "border-danger",
    iconClass: "text-danger",
  },
  success: {
    bgClass: "bg-success-light",
    borderClass: "border-success",
    iconClass: "text-success",
  },
};

const variantIcons: Record<CalloutVariant, string> = {
  default: "lucide:quote",
  info: "lucide:info",
  warning: "lucide:triangle-alert",
  danger: "lucide:octagon-x",
  success: "lucide:check-circle",
};

export function Callout({ variant = "default", emoji, children }: CalloutProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={clsx(
        "not-prose my-4 flex gap-3 rounded-lg border p-4",
        config.bgClass,
        config.borderClass
      )}
    >
      <div className="flex-shrink-0">
        {emoji ? (
          <span className="text-lg">{emoji}</span>
        ) : (
          <Icon icon={variantIcons[variant]} className={clsx("w-5 h-5", config.iconClass)} />
        )}
      </div>
      <div className="text-sm text-foreground/90">{children}</div>
    </div>
  );
}
