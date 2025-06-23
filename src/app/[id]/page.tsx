'use client';
import { useEffect, useState } from 'react';
import type { Property } from '../types';
import PhotoCarousel from '../components/PhotoCarousel';
import { loadLocalProperties } from '../../lib/localProperties';

export default function PropertyPage({ params }: any) {
  const id = Number(params.id);
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (isNaN(id)) return;
    fetch(`/api/properties/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setProperty(data);
        } else {
          const local = loadLocalProperties().find((p) => p.id === id);
          if (local) setProperty(local as any);
        }
      })
      .catch(() => {
        const local = loadLocalProperties().find((p) => p.id === id);
        if (local) setProperty(local as any);
      });
  }, [id]);

  if (!property) return <p className="p-4">Property not found.</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{property.address}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <PhotoCarousel urls={property.photos?.map((p) => p.url) ?? []} />
        <div className="space-y-2">
          <p>
            {[property.city, property.state, property.zip]
              .filter(Boolean)
              .join(', ')}
          </p>
          {property.county && <p>County: {property.county}</p>}
          {property.price && (
            <p className="font-semibold">Price: ${property.price}</p>
          )}
          {property.beds != null && <p>Beds: {property.beds}</p>}
          {property.baths != null && <p>Baths: {property.baths}</p>}

          {property.wholesalers && (
            <div>
              <h2 className="font-semibold">Wholesalers</h2>
              <ul className="list-disc pl-5">
                {property.wholesalers.map((w) => (
                  <li key={w.id}>{w.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
