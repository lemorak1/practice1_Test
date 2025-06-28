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
  imageUrl: string; // Main image URL
  agent?: Agent; // Agent data
}

export interface Agent {
  id: string;
  name: string;
  avatarUrl: string; // URL to the agent's avatar image
}

export interface Filters {
  query: string;
  priceRange: [number, number];
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
}
