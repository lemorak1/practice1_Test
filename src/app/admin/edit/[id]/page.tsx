"use client";

// Force dynamic rendering to allow use of `useParams` in this client page
export const dynamic = 'force-dynamic';

import { useApp } from '@/context/app-provider';
import { Header } from '@/components/header';
import { PropertyForm } from '../../property-form';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPropertyPage() {
  const { role, properties } = useApp();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/');
    }
  }, [role, router]);
  
  useEffect(() => {
    if (properties.length > 0 && id) {
        const foundProperty = properties.find(p => p.id === id);
        if(foundProperty) {
            setProperty(foundProperty);
        } else {
            router.push('/admin'); // Not found, redirect
        }
        setLoading(false);
    }
  }, [properties, id, router]);

  if (role !== 'admin') {
     return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Access Denied. Redirecting...</p>
            </div>
        </div>
    );
  }

  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto p-4 md:p-8">
                <Skeleton className="h-[600px] w-full" />
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {property ? <PropertyForm property={property} /> : <p>Property not found.</p>}
      </main>
    </div>
  );
}
