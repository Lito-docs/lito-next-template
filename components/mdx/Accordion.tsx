"use client";

import { ReactNode, useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface AccordionProps {
  children: ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return (
    <div className="not-prose my-6 divide-y divide-border border border-border rounded-lg overflow-hidden">
      {children}
    </div>
  );
}

interface AccordionItemProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function AccordionItem({ title, defaultOpen = false, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-foreground">{title}</span>
        <Icon
          icon="lucide:chevron-down"
          className={clsx(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
