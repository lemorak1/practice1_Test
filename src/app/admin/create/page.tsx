'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

export default function CreatePropertyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [address, setAddress] = useState('');

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) {
    return (
      <div className="p-4">
        <p>You must be signed in to access this page.</p>
        <button onClick={() => signIn()} className="underline text-blue-600">
          Sign in
        </button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
    if (res.ok) router.push('/');
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Property</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input
          className="border p-2"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" type="submit">
          Save
        </button>
      </form>
    </main>
  );
}
