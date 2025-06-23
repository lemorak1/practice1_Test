"use client";

import { useApp } from '@/context/app-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { Filters } from '@/lib/types';

export function FilterSidebar() {
  const { filters, setFilters, clearFilters, amenitiesList } = useApp();

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter(a => a !== amenity);
    handleFilterChange('amenities', newAmenities);
  };
  
  const MAX_PRICE = 3000000;

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="font-headline">Filter Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search by Location/Title</Label>
          <Input id="search" placeholder="e.g. Metropolis, Modern" value={filters.query} onChange={e => handleFilterChange('query', e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <p className="text-sm text-muted-foreground">${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}</p>
          <Slider
            min={0}
            max={MAX_PRICE}
            step={10000}
            value={filters.priceRange}
            onValueChange={value => handleFilterChange('priceRange', value as [number, number])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select value={filters.propertyType} onValueChange={value => handleFilterChange('propertyType', value)}>
            <SelectTrigger id="property-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select value={filters.bedrooms} onValueChange={value => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger id="bedrooms"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select value={filters.bathrooms} onValueChange={value => handleFilterChange('bathrooms', value)}>
                    <SelectTrigger id="bathrooms"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                            id={`amenity-${amenity}`}
                            checked={filters.amenities.includes(amenity)}
                            onCheckedChange={checked => handleAmenityChange(amenity, !!checked)}
                        />
                        <Label htmlFor={`amenity-${amenity}`} className="font-normal">{amenity}</Label>
                    </div>
                ))}
            </div>
        </div>
        
        <Button variant="ghost" onClick={clearFilters} className="w-full text-accent-foreground/80 hover:text-accent-foreground">
          <X className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
