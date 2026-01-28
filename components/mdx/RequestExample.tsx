"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface RequestExampleProps {
  title?: string;
  language?: string;
  children: string;
}

export function RequestExample({ title, language = "bash", children }: RequestExampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon icon="lucide:arrow-right" className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {title || "Request"}
          </span>
          {language && (
            <span className="px-1.5 py-0.5 text-xs font-mono rounded bg-muted text-muted-foreground">
              {language}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon
            icon={copied ? "lucide:check" : "lucide:copy"}
            className={clsx("w-3.5 h-3.5", copied && "text-success")}
          />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="rounded-lg overflow-hidden border border-border">
        <pre className="p-4 text-sm font-mono overflow-x-auto bg-gray-900 text-gray-100">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
