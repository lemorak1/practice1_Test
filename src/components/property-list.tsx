"use client";

import { useApp } from '@/context/app-provider';
import { PropertyCard } from './property-card';
import { Card } from './ui/card';

export function PropertyList() {
  const { filteredProperties } = useApp();

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 font-headline tracking-tight">
            Showing {filteredProperties.length} Properties
        </h2>
        {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
            </div>
        ) : (
            <Card className="col-span-full flex items-center justify-center p-12">
                <div className="text-center">
                    <h3 className="text-xl font-semibold">No Properties Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters to find your perfect home.</p>
                </div>
            </Card>
        )}
    </div>
  );
}
