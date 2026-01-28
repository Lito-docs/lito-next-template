"use client";

import { ReactNode, useState, createContext, useContext } from "react";
import clsx from "clsx";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  defaultValue?: string;
  children: ReactNode;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="not-prose my-6">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabProps {
  value: string;
  label: string;
  children: ReactNode;
}

export function Tab({ value, label, children }: TabProps) {
  const context = useContext(TabsContext);

  if (!context) {
    return null;
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value || (!activeTab && value === "");

  return (
    <>
      <button
        type="button"
        onClick={() => setActiveTab(value)}
        className={clsx(
          "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
          isActive
            ? "border-primary-500 text-primary-600"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
        )}
      >
        {label}
      </button>
      {isActive && (
        <div className="p-4 border border-t-0 border-border rounded-b-lg bg-card">
          {children}
        </div>
      )}
    </>
  );
}

// Simple TabList wrapper for styling
export function TabList({ children }: { children: ReactNode }) {
  return (
    <div className="flex border-b border-border bg-muted/50 rounded-t-lg">
      {children}
    </div>
  );
}

// Simple TabPanel wrapper
export function TabPanel({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}
