import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider, useI18n } from './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

export const metadata: Metadata = {
  title: 'Real Estate MVP',
  description: 'Demo real estate app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <header className="p-2 border-b flex justify-between">
            <SiteTitle />
            <LanguageSwitcher />
          </header>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

function SiteTitle() {
  const { t } = useI18n();
  return <h1 className="font-bold text-xl">{t('title')}</h1>;
}