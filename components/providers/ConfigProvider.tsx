"use client";

import { createContext, useContext, ReactNode } from "react";
import type { DocsConfig } from "@/lib/types/config";

interface ConfigContextType {
  config: DocsConfig;
}

const ConfigContext = createContext<ConfigContextType | null>(null);

interface ConfigProviderProps {
  config: DocsConfig;
  children: ReactNode;
}

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): DocsConfig {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context.config;
}

export function useOptionalConfig(): DocsConfig | null {
  const context = useContext(ConfigContext);
  return context?.config || null;
}
