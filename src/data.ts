export interface Property {
  id: number;
  title: string;
  city: string;
  county: string;
  price: number;
  image: string;
  description: string;
}

export const properties: Property[] = [
  {
    id: 1,
    title: 'Cozy Bungalow',
    city: 'Springfield',
    county: 'Greene',
    price: 250000,
    image: 'https://via.placeholder.com/400x300',
    description: 'A charming 2 bedroom bungalow in a quiet neighborhood.'
  },
  {
    id: 2,
    title: 'Modern Condo',
    city: 'Shelbyville',
    county: 'Shelby',
    price: 300000,
    image: 'https://via.placeholder.com/400x300',
    description: 'Downtown condo with great amenities and views.'
  },
  {
    id: 3,
    title: 'Spacious Farmhouse',
    city: 'Ogdenville',
    county: 'Ogden',
    price: 450000,
    image: 'https://via.placeholder.com/400x300',
    description: 'Large farmhouse perfect for a growing family.'
  }
];
