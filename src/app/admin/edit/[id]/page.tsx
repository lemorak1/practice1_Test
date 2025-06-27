"use client";

import { useContext } from 'react';
import { AppContext } from '@/context/app-provider';
import { Header } from '@/components/header';
import { PropertyForm } from '../../property-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface EditPropertyPageProps {
  params: { id: string };
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { role, properties } = useContext(AppContext)!;
  const router = useRouter();
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
