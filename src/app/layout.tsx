import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/app-provider';
import { Toaster } from '@/components/ui/toaster';
import { I18nProvider } from './i18n';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const roboto = localFont({
  src: [
    { path: '../../public/fonts/Roboto-Regular.woff', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Roboto-Medium.woff', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Roboto-Bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-roboto',
  display: 'swap',
});

const montserrat = localFont({
  src: '../../public/fonts/Montserrat-Bold.woff',
  weight: '700',
  style: 'normal',
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Real Estate Hub',
  description: 'Find your next home with Real Estate Hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.variable} ${montserrat.variable}`}> 
      <head />
      <body className={cn('font-body antialiased', 'min-h-screen bg-background font-sans')}>
        <I18nProvider>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
