'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import type { Property } from '../types';
import PropertyCard from '../components/PropertyCard';

export default function AdminHome() {
  const { data: session, status } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/properties')
        .then((res) => res.json())
        .then((data) => Array.isArray(data) && setProperties(data));
    }
  }, [status]);

  if (status === 'loading') return <p className="p-4">Loading...</p>;
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

  async function handleDelete(id: number) {
    if (!confirm('Delete this property?')) return;
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProperties((props) => props.filter((p) => p.id !== id));
    }
  }

  return (
    <main className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Properties</h1>
        <Link
          href="/admin/create"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Property
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {properties.map((p) => (
          <div key={p.id} className="relative">
            <PropertyCard property={p} />
            <div className="absolute top-2 right-2 flex gap-2">
              <Link
                href={`/admin/edit/${p.id}`}
                className="bg-white/80 px-2 py-1 text-sm rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-white/80 px-2 py-1 text-sm rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
