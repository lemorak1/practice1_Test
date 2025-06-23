'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/admin">Admin</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <LanguageSwitcher />
        {session ? (
          <button onClick={() => signOut()} className="underline">
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn()} className="underline">
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
