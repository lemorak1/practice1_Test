'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Property } from './types';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then(setProperties)
      .catch(console.error);
  }, []);

  const filtered = properties.filter((p) =>
    p.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <input
        className="border p-2 mb-4"
        placeholder="Filter by address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-disc pl-5">
        {filtered.map((p) => (
          <li key={p.id} className="mb-2">
            <Link href={`/${p.id}`}>{p.address}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
