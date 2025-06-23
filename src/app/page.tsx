'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Property } from './types';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('address', search);
    if (city) params.set('city', city);
    if (county) params.set('county', county);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (beds) params.set('beds', beds);
    if (baths) params.set('baths', baths);

    fetch(`/api/properties?${params.toString()}`)
      .then((res) => res.json())
      .then(setProperties)
      .catch(console.error);
  }, [search, city, county, minPrice, maxPrice, beds, baths]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 max-w-xl">
        <input
          className="border p-2"
          placeholder="Address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="County"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        <input
          className="border p-2"
          type="number"
          step="0.5"
          placeholder="Baths"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {properties.map((p) => (
          <Link
            key={p.id}
            href={`/${p.id}`}
            className="border rounded p-4 flex flex-col hover:shadow"
          >
            <h2 className="font-semibold">{p.address}</h2>
            {(p.city || p.county) && (
              <p className="text-sm text-gray-600">
                {[p.city, p.county].filter(Boolean).join(', ')}
              </p>
            )}
            {p.price && <p className="mt-1 font-semibold">${p.price}</p>}
          </Link>
        ))}
      </div>
    </main>
  );
}
