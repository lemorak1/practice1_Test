import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/app-provider';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { montserrat, roboto } from '@/lib/fonts';

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
      <body
        className={cn(
          "font-body antialiased",
          "min-h-screen bg-background",
          roboto.className,
        )}
      >
        <AppProvider>
            {children}
            <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
