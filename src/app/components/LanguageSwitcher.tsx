'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import i18nConfig from '../../next-i18next.config.js';

const { locales } = i18nConfig.i18n;

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  return (
    <div className="space-x-2">
      {locales.map((lng) => (
        <Link key={lng} href={pathname} locale={lng} prefetch={false}>
          <span className={i18n.language === lng ? 'font-bold' : ''}>
            {lng.toUpperCase()}
          </span>
        </Link>
      ))}
    </div>
  );
}
