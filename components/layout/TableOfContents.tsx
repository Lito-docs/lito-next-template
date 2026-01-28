"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<TocItem[]>(items || []);

  useEffect(() => {
    // If items not provided, extract from DOM
    if (!items) {
      const article = document.querySelector("article");
      if (article) {
        const elements = article.querySelectorAll("h2, h3");
        const extracted: TocItem[] = [];
        elements.forEach((el) => {
          if (el.id) {
            extracted.push({
              id: el.id,
              title: el.textContent || "",
              level: parseInt(el.tagName.charAt(1)),
            });
          }
        });
        setHeadings(extracted);
      }
    }
  }, [items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="toc scrollbar-hide">
      <h4 className="text-sm font-semibold text-foreground mb-4">On this page</h4>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={clsx(
                  "text-sm block py-1 transition-colors",
                  activeId === heading.id
                    ? "text-primary-600 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
