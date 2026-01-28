"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="not-prose my-6 space-y-0">
      {children}
    </div>
  );
}

interface StepProps {
  title: string;
  stepNumber?: number;
  children: ReactNode;
}

export function Step({ title, stepNumber, children }: StepProps) {
  return (
    <div className="relative pl-10 pb-8 last:pb-0 group">
      {/* Connector line */}
      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border group-last:hidden" />

      {/* Step number circle */}
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm border-2 border-primary-200">
        {stepNumber || "•"}
      </div>

      {/* Content */}
      <div>
        <h4 className="font-semibold text-foreground mb-2">{title}</h4>
        <div className="text-muted-foreground text-sm">{children}</div>
      </div>
    </div>
  );
}
