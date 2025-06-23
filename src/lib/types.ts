export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqft
  type: 'House' | 'Apartment' | 'Condo' | 'Villa';
  amenities: string[];
  imageUrl: string;
  agent: {
    name: string;
    avatarUrl: string;
  };
}

export interface Filters {
  query: string;
  priceRange: [number, number];
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
}
