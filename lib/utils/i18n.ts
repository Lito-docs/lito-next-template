const defaultTranslations: Record<string, Record<string, string>> = {
  en: {
    'search.placeholder': 'Search documentation...',
    'toc.title': 'On this page',
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',
    'lastUpdated': 'Last updated',
    'editPage': 'Edit this page',
    'feedback.helpful': 'Was this page helpful?',
    'feedback.yes': 'Yes',
    'feedback.no': 'No',
    'feedback.thankYou': 'Thanks for your feedback!',
  },
  es: {
    'lastUpdated': 'Ultima actualizacion',
    'editPage': 'Editar esta pagina',
    'feedback.helpful': 'Te fue util esta pagina?',
    'feedback.yes': 'Si',
    'feedback.no': 'No',
    'feedback.thankYou': 'Gracias por tus comentarios!',
  },
  fr: {
    'lastUpdated': 'Derniere mise a jour',
    'editPage': 'Modifier cette page',
    'feedback.helpful': 'Cette page vous a-t-elle ete utile?',
    'feedback.yes': 'Oui',
    'feedback.no': 'Non',
    'feedback.thankYou': 'Merci pour vos commentaires!',
  },
  de: {
    'lastUpdated': 'Zuletzt aktualisiert',
    'editPage': 'Diese Seite bearbeiten',
    'feedback.helpful': 'War diese Seite hilfreich?',
    'feedback.yes': 'Ja',
    'feedback.no': 'Nein',
    'feedback.thankYou': 'Danke fur Ihr Feedback!',
  },
};

export function t(key: string, locale: string = 'en'): string {
  return defaultTranslations[locale]?.[key] || defaultTranslations.en?.[key] || key;
}

export function getLocaleFromPath(pathname: string, locales: string[]): string | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && locales.includes(firstSegment)) return firstSegment;
  return undefined;
}

export function getLocaleDisplayNames(): Record<string, string> {
  return { en: 'English', es: 'Espanol', fr: 'Francais', de: 'Deutsch', ja: '', zh: '', ko: '', pt: 'Portugues' };
}

export function localizedPath(path: string, locale: string, defaultLocale: string, prefixDefaultLocale: boolean = false, allLocales: string[] = []): string {
  const pathWithoutLocale = allLocales.length > 0 ? (() => {
    const loc = getLocaleFromPath(path, allLocales);
    if (loc) {
      const segments = path.split('/').filter(Boolean);
      return '/' + segments.slice(1).join('/');
    }
    return path;
  })() : path;
  const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : '/' + pathWithoutLocale;
  if (locale === defaultLocale && !prefixDefaultLocale) return cleanPath;
  return `/${locale}${cleanPath}`;
}
