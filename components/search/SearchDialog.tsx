"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Icon } from "@iconify/react";
import type { SearchDocument } from "@/lib/search";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documents: SearchDocument[];
}

export function SearchDialog({ isOpen, onClose, documents }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useRef(
    new Fuse(documents, {
      keys: [
        { name: "title", weight: 3 },
        { name: "description", weight: 2 },
        { name: "headings", weight: 1.5 },
        { name: "content", weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true,
    })
  );

  // Update fuse when documents change
  useEffect(() => {
    fuse.current = new Fuse(documents, {
      keys: [
        { name: "title", weight: 3 },
        { name: "description", weight: 2 },
        { name: "headings", weight: 1.5 },
        { name: "content", weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [documents]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = fuse.current.search(query).slice(0, 8);
    setResults(searchResults.map((r) => r.item));
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            const slug = results[selectedIndex].slug;
            router.push(`/docs${slug ? `/${slug}` : ""}`);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [results, selectedIndex, router, onClose]
  );

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Icon icon="lucide:search" className="w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 py-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <Icon icon="lucide:search-x" className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="py-2">
              {results.map((result, index) => (
                <li key={result.slug}>
                  <button
                    type="button"
                    className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-primary-100 dark:bg-primary-900/30"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => {
                      router.push(`/docs${result.slug ? `/${result.slug}` : ""}`);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <Icon
                      icon="lucide:file-text"
                      className="w-5 h-5 mt-0.5 text-muted-foreground flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {result.title}
                      </div>
                      {result.description && (
                        <div className="text-sm text-muted-foreground truncate">
                          {result.description}
                        </div>
                      )}
                    </div>
                    <Icon
                      icon="lucide:arrow-right"
                      className={`w-4 h-4 mt-1 text-muted-foreground transition-opacity ${
                        index === selectedIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <p className="text-sm">Start typing to search...</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↵</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">ESC</kbd>
                  <span>Close</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
