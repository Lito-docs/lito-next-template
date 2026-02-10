export interface Version {
  id: string;
  label: string;
  path: string;
  deprecated?: boolean;
}

export interface VersioningConfig {
  enabled: boolean;
  defaultVersion: string;
  versions: Version[];
  versionBanner?: {
    enabled: boolean;
    message: string;
  };
}

export function getVersionFromPath(path: string, config: VersioningConfig | undefined): Version | null {
  if (!config?.enabled || !config.versions?.length) return null;
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];
  const version = config.versions.find((v) => v.path === firstSegment);
  if (version) return version;
  return getDefaultVersion(config);
}

export function getDefaultVersion(config: VersioningConfig | undefined): Version | null {
  if (!config?.enabled || !config.versions?.length) return null;
  const defaultVersion = config.versions.find((v) => v.id === config.defaultVersion);
  return defaultVersion || config.versions[0] || null;
}

export function isDefaultVersion(currentVersion: Version | null, config: VersioningConfig | undefined): boolean {
  if (!config?.enabled || !currentVersion) return true;
  return currentVersion.id === config.defaultVersion;
}

export function buildVersionedPath(path: string, targetVersion: Version, config: VersioningConfig | undefined): string {
  if (!config?.enabled) return path;
  const pathWithinVersion = getPathWithinVersion(path, config);
  const cleanInnerPath = pathWithinVersion.replace(/^\/+|\/+$/g, '');
  const defaultVersion = getDefaultVersion(config);
  if (targetVersion.id === defaultVersion?.id) return '/' + cleanInnerPath;
  return `/${targetVersion.path}/${cleanInnerPath}`.replace(/\/+$/, '') || '/';
}

export function getPathWithinVersion(path: string, config: VersioningConfig | undefined): string {
  if (!config?.enabled || !config.versions?.length) return path;
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];
  if (config.versions.some((v) => v.path === firstSegment)) {
    return '/' + segments.slice(1).join('/');
  }
  return path;
}

export function formatBannerMessage(message: string, currentVersion: Version, defaultVersion: Version | null): string {
  return message.replace('{version}', currentVersion.label).replace('{latest}', defaultVersion?.label || 'latest');
}
