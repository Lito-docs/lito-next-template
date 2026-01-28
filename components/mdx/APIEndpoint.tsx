"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

interface APIEndpointProps {
  method: HttpMethod;
  path: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  deprecated?: boolean;
  auth?: boolean | string;
  baseUrl?: string;
}

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-success/10 text-success border-success/30",
  POST: "bg-primary-500/10 text-primary-600 border-primary-500/30",
  PUT: "bg-warning/10 text-warning border-warning/30",
  PATCH: "bg-info/10 text-info border-info/30",
  DELETE: "bg-danger/10 text-danger border-danger/30",
  HEAD: "bg-gray-500/10 text-gray-600 border-gray-500/30",
  OPTIONS: "bg-gray-500/10 text-gray-600 border-gray-500/30",
};

export function APIEndpoint({
  method,
  path,
  title,
  description,
  children,
  deprecated = false,
  auth,
  baseUrl,
}: APIEndpointProps) {
  const fullPath = baseUrl ? `${baseUrl}${path}` : path;

  return (
    <div className={clsx(
      "not-prose my-6 rounded-xl border overflow-hidden",
      deprecated ? "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50" : "border-border bg-card"
    )}>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border bg-muted/30">
        <span className={clsx(
          "px-2.5 py-1 text-xs font-bold uppercase rounded-md border",
          methodColors[method]
        )}>
          {method}
        </span>

        <code className="flex-1 text-sm font-mono text-foreground break-all">
          {fullPath}
        </code>

        <div className="flex items-center gap-2">
          {deprecated && (
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-warning/10 text-warning border border-warning/30">
              Deprecated
            </span>
          )}
          {auth && (
            <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
              <Icon icon="lucide:lock" className="w-3 h-3" />
              {typeof auth === "string" ? auth : "Auth Required"}
            </span>
          )}
        </div>
      </div>

      {/* Title and Description */}
      {(title || description) && (
        <div className="p-4 border-b border-border">
          {title && (
            <h3 className={clsx(
              "text-lg font-semibold mb-1",
              deprecated ? "text-muted-foreground line-through" : "text-foreground"
            )}>
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Content (parameters, responses, etc.) */}
      {children && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
}
