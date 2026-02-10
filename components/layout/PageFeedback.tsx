"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import type { FeedbackConfig } from "@/lib/types/config";

interface PageFeedbackProps {
  feedbackConfig?: FeedbackConfig;
}

export function PageFeedback({ feedbackConfig }: PageFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);

  const page = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    if (page && localStorage.getItem(`feedback-${page}`)) {
      setSubmitted(true);
    }
  }, [page]);

  if (!feedbackConfig?.enabled) return null;

  function handleFeedback(helpful: boolean) {
    localStorage.setItem(`feedback-${page}`, helpful ? "yes" : "no");
    setSubmitted(true);

    if (feedbackConfig?.webhookUrl) {
      fetch(feedbackConfig.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, helpful, timestamp: new Date().toISOString() }),
      }).catch(() => {});
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 py-4 text-sm text-success">
        Thanks for your feedback!
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 py-4">
      <span className="text-sm text-muted-foreground">Was this page helpful?</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleFeedback(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.8125rem] font-medium text-muted-foreground bg-muted border border-border rounded-md hover:text-foreground hover:bg-accent hover:border-primary-300 transition-colors"
        >
          <Icon icon="lucide:thumbs-up" width={16} />
          Yes
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.8125rem] font-medium text-muted-foreground bg-muted border border-border rounded-md hover:text-foreground hover:bg-accent hover:border-primary-300 transition-colors"
        >
          <Icon icon="lucide:thumbs-down" width={16} />
          No
        </button>
      </div>
    </div>
  );
}
