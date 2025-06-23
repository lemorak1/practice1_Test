'use client';

import { appWithTranslation } from 'next-i18next';
import type { ReactNode } from 'react';
import nextI18NextConfig from '../../next-i18next.config.js';

function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default appWithTranslation(
  I18nProvider as any,
  nextI18NextConfig as any,
) as any;