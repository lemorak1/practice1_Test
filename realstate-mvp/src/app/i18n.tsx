'use client';
import { createContext, useContext, useState } from 'react';

const translations = {
  en: { title: 'Properties', addNew: 'Add New' },
  es: { title: 'Propiedades', addNew: 'Agregar' },
};

type Locale = 'en' | 'es';

const I18nContext = createContext<{ locale: Locale; t: (k: string) => string; setLocale: (l: Locale) => void }>({ locale: 'en', t: () => '', setLocale: () => {} });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const value = { locale, setLocale, t: (k: string) => translations[locale][k as keyof typeof translations.en] || k };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);