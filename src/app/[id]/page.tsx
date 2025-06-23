import { notFound } from 'next/navigation';
import type { Property } from '../types';
import { getPropertyById } from '../../lib/db';
import PhotoCarousel from '../components/PhotoCarousel';

export default async function PropertyPage({ params }: any) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{property.address}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <PhotoCarousel
          urls={property.photos?.map((p) => p.url) ?? []}
        />
        <div className="space-y-2">
          <p>
            {[property.city, property.state, property.zip]
              .filter(Boolean)
              .join(', ')}
          </p>
          {property.county && <p>County: {property.county}</p>}
          {property.price && <p className="font-semibold">Price: ${property.price}</p>}
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
