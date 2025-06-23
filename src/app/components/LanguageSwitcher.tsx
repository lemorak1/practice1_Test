'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18nConfig = require('../../../next-i18next.config.js');

const { locales } = i18nConfig.i18n;

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  return (
    <div className="space-x-2">
      {locales.map((lng: string) => (
        <Link key={lng} href={pathname} locale={lng} prefetch={false}>
          <span className={i18n.language === lng ? 'font-bold' : ''}>
            {lng.toUpperCase()}
          </span>
        </Link>
      ))}
    </div>
  );
}
