'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Property } from './types';
import PropertyCard from './components/PropertyCard';

export default function HomePage() {
  const { t } = useTranslation();
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
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error('Failed to fetch properties', data);
          setProperties([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching properties', err);
        setProperties([]);
      });
  }, [search, city, county, minPrice, maxPrice, beds, baths]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
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
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </main>
  );
}
