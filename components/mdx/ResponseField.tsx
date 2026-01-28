"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface ResponseFieldProps {
  name: string;
  type?: string;
  children?: ReactNode;
  nullable?: boolean;
}

export function ResponseField({
  name,
  type,
  children,
  nullable = false,
}: ResponseFieldProps) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <code className="text-sm font-semibold text-foreground">
          {name}
        </code>

        {type && (
          <span className="px-1.5 py-0.5 text-xs font-mono rounded bg-muted text-muted-foreground">
            {type}
          </span>
        )}

        {nullable && (
          <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            nullable
          </span>
        )}
      </div>

      {children && (
        <div className="text-sm text-muted-foreground prose-sm">
          {children}
        </div>
      )}
    </div>
  );
}

interface ResponseExampleProps {
  status?: number;
  title?: string;
  children: ReactNode;
}

export function ResponseExample({ status, title, children }: ResponseExampleProps) {
  const statusColor = status
    ? status >= 200 && status < 300
      ? "text-success"
      : status >= 400
        ? "text-danger"
        : "text-warning"
    : "text-muted-foreground";

  return (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon icon="lucide:arrow-left" className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {title || "Response"}
        </span>
        {status && (
          <span className={clsx("text-sm font-mono", statusColor)}>
            {status}
          </span>
        )}
      </div>
      <div className="rounded-lg overflow-hidden border border-border">
        {children}
      </div>
    </div>
  );
}

interface ResponseGroupProps {
  title?: string;
  children: ReactNode;
}

export function ResponseGroup({ title, children }: ResponseGroupProps) {
  return (
    <div className="my-4">
      {title && (
        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Icon icon="lucide:arrow-left" className="w-4 h-4 text-muted-foreground" />
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
