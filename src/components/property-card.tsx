import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, MapPin, AreaChart } from 'lucide-react';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0 relative">
        <Image
          src={property.imageUrl}
          alt={property.title}
          width={600}
          height={400}
          className="object-cover w-full h-48"
          data-ai-hint={`${property.type.toLowerCase()} exterior`}
        />
        <Badge className="absolute top-2 right-2" variant="default" style={{backgroundColor: 'hsl(var(--primary))'}}>
          {property.type}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-1 truncate">{property.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            {property.location}
        </CardDescription>
        <p className="text-2xl font-bold text-primary mb-3">
          ${property.price.toLocaleString()}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-primary/80"/>
                <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-primary/80"/>
                <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2">
                <AreaChart className="h-5 w-5 text-primary/80"/>
                <span>{property.area.toLocaleString()} sqft</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30">
        <div className="flex items-center w-full">
            <Image
                src={property.agent.avatarUrl}
                alt={property.agent.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
                data-ai-hint="professional portrait"
            />
            <div>
                <p className="font-semibold text-sm">{property.agent.name}</p>
                <p className="text-xs text-muted-foreground">Real Estate Agent</p>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
