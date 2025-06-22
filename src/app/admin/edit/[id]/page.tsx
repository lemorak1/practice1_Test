'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

export default function EditPropertyPage({ params }: any) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch(`/api/properties/${params.id}`)
      .then((res) => res.json())
      .then((data) => setAddress(data.address));
  }, [params.id]);

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
    await fetch(`/api/properties/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
    router.push(`/${params.id}`);
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input
          className="border p-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" type="submit">
          Update
        </button>
      </form>
    </main>
  );
}
