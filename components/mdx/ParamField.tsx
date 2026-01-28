"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface ParamFieldProps {
  name: string;
  type?: string;
  required?: boolean;
  default?: string;
  children?: ReactNode;
  deprecated?: boolean;
  /** Where the parameter is located: path, query, header, body */
  location?: "path" | "query" | "header" | "body" | "cookie";
}

export function ParamField({
  name,
  type,
  required = false,
  default: defaultValue,
  children,
  deprecated = false,
  location,
}: ParamFieldProps) {
  return (
    <div className={clsx(
      "py-3 border-b border-border last:border-0",
      deprecated && "opacity-60"
    )}>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <code className={clsx(
          "text-sm font-semibold",
          deprecated ? "line-through text-muted-foreground" : "text-foreground"
        )}>
          {name}
        </code>

        {type && (
          <span className="px-1.5 py-0.5 text-xs font-mono rounded bg-muted text-muted-foreground">
            {type}
          </span>
        )}

        {required && (
          <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-danger/10 text-danger">
            required
          </span>
        )}

        {location && (
          <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-info/10 text-info">
            {location}
          </span>
        )}

        {deprecated && (
          <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-warning/10 text-warning">
            deprecated
          </span>
        )}
      </div>

      {defaultValue && (
        <div className="text-xs text-muted-foreground mb-1">
          Default: <code className="px-1 py-0.5 rounded bg-muted">{defaultValue}</code>
        </div>
      )}

      {children && (
        <div className="text-sm text-muted-foreground prose-sm">
          {children}
        </div>
      )}
    </div>
  );
}

interface ParamGroupProps {
  title?: string;
  children: ReactNode;
}

export function ParamGroup({ title, children }: ParamGroupProps) {
  return (
    <div className="my-4">
      {title && (
        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Icon icon="lucide:list" className="w-4 h-4 text-muted-foreground" />
          {title}
        </h4>
      )}
      <div className="border border-border rounded-lg divide-y divide-border">
        <div className="px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
