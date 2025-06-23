'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  function changeLang(lang: string) {
    router.push(`${pathname}?lang=${lang}`);
  }

  return (
    <div className="space-x-2">
      <button onClick={() => changeLang('en')}>EN</button>
      <button onClick={() => changeLang('es')}>ES</button>
    </div>
  );
}