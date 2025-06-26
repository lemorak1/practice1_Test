import Link from 'next/link';
import { Header } from '@/components/header';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">Could not find the requested page.</p>
        <Link href="/" className="text-primary hover:underline">Return Home</Link>
      </main>
    </div>
  );
}
