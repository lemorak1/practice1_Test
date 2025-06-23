"use client";
import './global.css';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import Navbar from './components/Navbar';
import I18nProvider from './i18nProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
