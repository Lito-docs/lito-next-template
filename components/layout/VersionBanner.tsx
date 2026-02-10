"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getVersionFromPath, getDefaultVersion, isDefaultVersion, formatBannerMessage, buildVersionedPath, type VersioningConfig } from "@/lib/utils/versioning";

interface VersionBannerProps {
  versioningConfig?: VersioningConfig;
}

export function VersionBanner({ versioningConfig }: VersionBannerProps) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  const currentVersion = versioningConfig?.enabled ? getVersionFromPath(pathname, versioningConfig) : null;
  const defaultVersion = versioningConfig?.enabled ? getDefaultVersion(versioningConfig) : null;
  const isDefault = !currentVersion || isDefaultVersion(currentVersion, versioningConfig);

  useEffect(() => {
    if (currentVersion) {
      const key = `version-banner-dismissed-${currentVersion.id}`;
      if (sessionStorage.getItem(key)) setDismissed(true);
    }
  }, [currentVersion]);

  if (!versioningConfig?.enabled || versioningConfig.versionBanner?.enabled === false || isDefault || dismissed) {
    return null;
  }

  const defaultMessage = "You are viewing documentation for {version}. See the latest version.";
  const message = versioningConfig.versionBanner?.message || defaultMessage;
  const formattedMessage = formatBannerMessage(message, currentVersion!, defaultVersion);
  const latestLink = defaultVersion ? buildVersionedPath(pathname, defaultVersion, versioningConfig) : "/";

  function handleDismiss() {
    setDismissed(true);
    if (currentVersion) {
      sessionStorage.setItem(`version-banner-dismissed-${currentVersion.id}`, "true");
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 mb-6 bg-warning-light/30 border border-warning border-l-4 rounded-lg" role="alert">
      <div className="flex items-center gap-3 flex-1">
        <Icon icon="lucide:alert-triangle" width={18} className="text-warning shrink-0" />
        <p className="text-sm text-foreground m-0">
          {formattedMessage.split("latest version")[0]}
          <Link href={latestLink} className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium hover:underline">
            latest version <Icon icon="lucide:arrow-right" width={14} />
          </Link>
        </p>
      </div>
      <button onClick={handleDismiss} className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Dismiss banner">
        <Icon icon="lucide:x" width={16} />
      </button>
    </div>
  );
}
