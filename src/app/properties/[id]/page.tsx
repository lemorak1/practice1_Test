'use client';

// Ensure this page is treated as dynamic when using `useParams`
export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase'; // Assuming you have firebase initialized here
import type { Property } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, AreaChart, MapPin } from 'lucide-react';
import { Header } from '@/components/header';

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setError('Property ID is missing.');
        setLoading(false);
        return;
      }
      try {
        const propertyDocRef = doc(db, 'properties', propertyId);
        const propertyDocSnap = await getDoc(propertyDocRef);

        if (propertyDocSnap.exists()) {
          const data = propertyDocSnap.data();
          // Fetch agent details
          let agent = undefined;
          if (data.agentRef) {
            const agentDocSnap = await getDoc(data.agentRef);
            if (agentDocSnap.exists()) {
              agent = { id: agentDocSnap.id, ...(agentDocSnap.data() as any) };
            }
          }
          setProperty({ id: propertyDocSnap.id, ...data, agent } as Property);
        } else {
          setError('Property not found.');
        }
      } catch (err: any) {
        setError('Error fetching property: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, db]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {property ? (
        <main className="flex-1 container mx-auto p-4 md:p-8">
          <Card>
            <CardHeader className="p-0 relative">
              {property.imageUrl && (
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  width={800}
                  height={500}
                  className="object-cover w-full h-64 md:h-96"
                  data-ai-hint={`${property.type.toLowerCase()} exterior`}
                />
              )}
              <Badge className="absolute top-4 right-4 text-lg" variant="default" style={{ backgroundColor: 'hsl(var(--primary))' }}>
                {property.type}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <CardTitle className="font-headline text-3xl mb-2">{property.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5" />
                  {property.location}
                </CardDescription>
                <p className="text-4xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-muted-foreground">
                <div className="flex items-center gap-3">
                  <BedDouble className="h-6 w-6 text-primary/80" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="h-6 w-6 text-primary/80" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <AreaChart className="h-6 w-6 text-primary/80" />
                  <span>{property.area.toLocaleString()} sqft</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h3 className="font-semibold text-xl mb-2">Amenities</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {property.amenities.map(amenity => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}

              {property.agent && (
                <div>
                  <h3 className="font-semibold text-xl mb-2">Contact Agent</h3>
                  <div className="flex items-center">
                    <Image
                      src={property.agent.avatarUrl}
                      alt={property.agent.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4 object-cover"
                      data-ai-hint="professional portrait"
                    />
                    <div>
                      <p className="font-semibold text-lg">{property.agent.name}</p>
                      <p className="text-muted-foreground">Real Estate Agent</p>
                      {/* You could add agent contact info here if available */}
                    </div>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </main>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>Property details could not be loaded.</p>
        </div>
      )}
    </div>
  );
}