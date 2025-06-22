import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="p-4">
      {children}
    </main>
  );
}
