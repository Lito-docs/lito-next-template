"use client";

import { ReactNode, useState, Children, isValidElement } from "react";
import clsx from "clsx";

interface CodeGroupProps {
  children: ReactNode;
}

interface CodeBlockProps {
  title?: string;
  children: ReactNode;
}

export function CodeGroup({ children }: CodeGroupProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const childArray = Children.toArray(children).filter(isValidElement);

  return (
    <div className="not-prose my-6 rounded-lg border border-border overflow-hidden">
      {/* Tab headers */}
      <div className="flex bg-muted/50 border-b border-border">
        {childArray.map((child, index) => {
          const title = (child.props as CodeBlockProps).title || `Tab ${index + 1}`;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={clsx(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                index === activeIndex
                  ? "border-primary-500 text-primary-600 bg-card"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {title}
            </button>
          );
        })}
      </div>
      {/* Active content */}
      <div className="bg-gray-900 text-gray-100">
        {childArray[activeIndex]}
      </div>
    </div>
  );
}

export function CodeBlock({ children }: CodeBlockProps) {
  return <div className="p-4 overflow-x-auto">{children}</div>;
}
