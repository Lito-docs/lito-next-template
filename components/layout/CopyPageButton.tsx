"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export function CopyPageButton() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  function getPageMarkdown(): string {
    const article = document.querySelector("article") || document.querySelector("main");
    if (!article) return "";
    const title = document.querySelector("h1")?.textContent || document.title || "";
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    let md = `# ${title}\n\n`;
    if (description) md += `> ${description}\n\n`;
    md += `Source: ${window.location.href}\n\n---\n\n`;
    md += article.innerText;
    return md;
  }

  async function handleCopy() {
    const md = getPageMarkdown();
    const ok = await copyToClipboard(md);
    setToast(ok ? "Copied as Markdown!" : "Failed to copy");
    setOpen(false);
  }

  async function handleOpenAI(provider: string) {
    const md = getPageMarkdown();
    const prompt = `I'm reading this documentation page and would like your help understanding it:\n\n${md}`;
    await copyToClipboard(prompt);
    setToast(`Content copied! Opening ${provider === "chatgpt" ? "ChatGPT" : "Claude"}...`);
    setOpen(false);
    setTimeout(() => {
      const urls: Record<string, string> = { chatgpt: "https://chatgpt.com/", claude: "https://claude.ai/new" };
      window.open(urls[provider] || urls.chatgpt, "_blank");
    }, 500);
  }

  return (
    <>
      <div ref={containerRef} className="relative inline-block font-sans">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[0.8125rem] font-medium text-muted-foreground bg-muted border border-border rounded-md cursor-pointer transition-all duration-150 hover:text-foreground hover:bg-accent"
          aria-label="Copy page"
          aria-expanded={open}
        >
          <Icon icon="lucide:copy" width={14} />
          <span>Copy page</span>
          <Icon icon="lucide:chevron-down" width={14} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-1.5 min-w-[260px] p-1.5 bg-popover border border-border rounded-lg shadow-lg z-30">
            <button onClick={handleCopy} className="flex items-start gap-2.5 w-full px-2.5 py-2 text-[0.8125rem] text-foreground rounded-md hover:bg-muted text-left">
              <Icon icon="lucide:file-text" width={16} className="mt-0.5 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">Copy as Markdown</span>
                <span className="text-xs text-muted-foreground">Copy page content for LLM</span>
              </div>
            </button>
            <div className="h-px bg-border my-1.5" />
            <button onClick={() => handleOpenAI("chatgpt")} className="flex items-start gap-2.5 w-full px-2.5 py-2 text-[0.8125rem] text-foreground rounded-md hover:bg-muted text-left">
              <Icon icon="simple-icons:openai" width={16} className="mt-0.5 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">Open in ChatGPT</span>
                <span className="text-xs text-muted-foreground">Ask ChatGPT about this page</span>
              </div>
            </button>
            <button onClick={() => handleOpenAI("claude")} className="flex items-start gap-2.5 w-full px-2.5 py-2 text-[0.8125rem] text-foreground rounded-md hover:bg-muted text-left">
              <Icon icon="simple-icons:anthropic" width={16} className="mt-0.5 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">Open in Claude</span>
                <span className="text-xs text-muted-foreground">Ask Claude about this page</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 bg-popover border border-border rounded-lg shadow-lg text-sm text-foreground animate-in slide-in-from-bottom-2">
          <Icon icon="lucide:check-circle" width={20} className="text-success" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}
