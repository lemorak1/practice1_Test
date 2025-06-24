"use client"
import { Header } from '@/components/header';
import { PropertyForm } from '../property-form';
import { useApp } from '@/context/app-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewPropertyPage() {
    const { role } = useApp();
    const router = useRouter();

    useEffect(() => {
        if (role !== 'admin') {
            router.push('/');
        }
    }, [role, router]);

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
    
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <PropertyForm />
      </main>
    </div>
  );
}
