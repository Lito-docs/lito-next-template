"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { getLocaleFromPath, getLocaleDisplayNames, localizedPath } from "@/lib/utils/i18n";
import type { I18nConfig } from "@/lib/types/config";

interface LanguageSwitcherProps {
  i18nConfig?: I18nConfig;
}

export function LanguageSwitcher({ i18nConfig }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const locales = i18nConfig?.locales || ["en"];
  const defaultLocale = i18nConfig?.defaultLocale || "en";
  const prefixDefaultLocale = i18nConfig?.routing?.prefixDefaultLocale ?? false;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (locales.length <= 1) return null;

  const currentLocale = getLocaleFromPath(pathname, locales) || defaultLocale;
  const displayNames = getLocaleDisplayNames();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Icon icon="lucide:globe" width={16} />
        <span className="hidden sm:inline">{displayNames[currentLocale] || currentLocale.toUpperCase()}</span>
        <Icon icon="lucide:chevron-down" width={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[160px] py-1 bg-popover border border-border rounded-lg shadow-lg z-50">
          {locales.map((locale) => {
            const isActive = locale === currentLocale;
            const href = localizedPath(pathname, locale, defaultLocale, prefixDefaultLocale, locales);
            return (
              <button
                key={locale}
                onClick={() => { router.push(href); setOpen(false); }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors text-left ${
                  isActive ? "bg-primary-100 text-primary-700 font-medium" : "hover:bg-muted text-foreground"
                }`}
              >
                {isActive && <Icon icon="lucide:check" width={16} />}
                <span className={!isActive ? "ml-6" : ""}>{displayNames[locale] || locale.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
