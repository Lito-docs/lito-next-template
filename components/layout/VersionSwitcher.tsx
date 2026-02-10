"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { getVersionFromPath, buildVersionedPath, type VersioningConfig, type Version } from "@/lib/utils/versioning";

interface VersionSwitcherProps {
  versioningConfig?: VersioningConfig;
}

export function VersionSwitcher({ versioningConfig }: VersionSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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

  if (!versioningConfig?.enabled || !versioningConfig.versions?.length || versioningConfig.versions.length <= 1) {
    return null;
  }

  const currentVersion = getVersionFromPath(pathname, versioningConfig);

  return (
    <div ref={ref} className="relative font-sans">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-muted border border-border rounded-lg text-[0.8125rem] font-medium text-foreground cursor-pointer transition-all duration-150 hover:bg-accent hover:border-primary-300"
        aria-label="Switch documentation version"
        aria-expanded={open}
      >
        <Icon icon="lucide:git-branch" width={16} />
        <span className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">{currentVersion?.label || "Version"}</span>
        <Icon icon="lucide:chevron-down" width={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[180px] max-w-[250px] p-1.5 bg-popover border border-border rounded-lg shadow-lg z-50">
          {versioningConfig.versions.map((version: Version) => {
            const href = buildVersionedPath(pathname, version, versioningConfig);
            const isActive = version.id === currentVersion?.id;
            return (
              <button
                key={version.id}
                onClick={() => { router.push(href); setOpen(false); }}
                className={`flex items-center justify-between gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors duration-100 text-left ${
                  isActive ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300" : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  {version.label}
                  {version.deprecated && (
                    <span className="text-[0.625rem] font-semibold uppercase tracking-wide px-1.5 py-0.5 bg-warning-light text-warning rounded">Deprecated</span>
                  )}
                </span>
                {isActive && <Icon icon="lucide:check" width={14} className="text-primary-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
