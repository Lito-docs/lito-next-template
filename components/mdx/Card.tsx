"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";

interface CardProps {
  title: string;
  icon?: string;
  href?: string;
  children?: ReactNode;
}

export function Card({ title, icon, href, children }: CardProps) {
  const content = (
    <div
      className={clsx(
        "feature-card group",
        href && "cursor-pointer"
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
            <Icon icon={icon} className="w-5 h-5 text-primary-600" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          {children && (
            <div className="text-sm text-muted-foreground">{children}</div>
          )}
        </div>
        {href && (
          <Icon
            icon="lucide:arrow-right"
            className="w-4 h-4 text-muted-foreground group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
          />
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline block">
        {content}
      </Link>
    );
  }

  return content;
}

interface CardGroupProps {
  cols?: 1 | 2 | 3 | 4;
  children: ReactNode;
}

export function CardGroup({ cols = 2, children }: CardGroupProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={clsx("not-prose grid gap-4 my-6", gridCols[cols])}>
      {children}
    </div>
  );
}
