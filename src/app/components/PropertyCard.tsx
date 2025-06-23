'use client';
import Link from 'next/link';
import type { Property } from '../types';

export default function PropertyCard({ property }: { property: Property }) {
  const photo = property.photos?.[0];
  return (
    <Link
      href={`/${property.id}`}
      className="border rounded overflow-hidden hover:shadow-md transition bg-white flex flex-col"
    >
      {photo && (
        <img
          src={photo.url}
          alt=""
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="font-semibold mb-1">{property.address}</h2>
        {(property.city || property.county) && (
          <p className="text-sm text-gray-600 mb-1">
            {[property.city, property.county].filter(Boolean).join(', ')}
          </p>
        )}
        {property.price && (
          <p className="mt-auto font-semibold">${property.price}</p>
        )}
      </div>
    </Link>
  );
}
