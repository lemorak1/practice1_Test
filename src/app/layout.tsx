"use client";
import './global.css';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import I18nProvider from './i18n';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <SessionProvider>{children}</SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
