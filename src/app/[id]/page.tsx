import { notFound } from 'next/navigation';
import type { Property } from '../types';

async function getProperty(id: string): Promise<Property | null> {
  const res = await fetch(`/api/properties/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function PropertyPage({ params }: any) {
  const property = await getProperty(params.id);
  if (!property) notFound();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{property.address}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          {property.photos?.map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt=""
              className="mb-2 w-full object-cover"
            />
          ))}
        </div>
        {property.wholesalers && (
          <div>
            <h2 className="font-semibold mt-4 md:mt-0">Wholesalers</h2>
            <ul className="list-disc pl-5">
              {property.wholesalers.map((w) => (
                <li key={w.id}>{w.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
