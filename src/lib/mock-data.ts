import type { Property } from './types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'A beautiful and modern apartment located in the heart of the city. Perfect for young professionals and couples.',
    price: 350000,
    location: 'Metropolis, USA',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'Apartment',
    amenities: ['Gym', 'Pool', 'Parking'],
    imageUrl: 'https://placehold.co/600x400.png',
    agent: {
      id: 'agent1',
      name: 'Jane Doe',
      avatarUrl: 'https://placehold.co/100x100.png'
    }
  },
  {
    id: '2',
    title: 'Suburban Family House',
    description: 'Spacious family house with a large backyard. Located in a quiet, family-friendly neighborhood with excellent schools.',
    price: 650000,
    location: 'Suburbia, USA',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: 'House',
    amenities: ['Garage', 'Garden', 'Fireplace'],
    imageUrl: 'https://placehold.co/600x400.png',
    agent: {
      id: 'agent2',
      name: 'John Smith',
      avatarUrl: 'https://placehold.co/100x100.png'
    }
  },
  {
    id: '3',
    title: 'Luxury Beachfront Villa',
    description: 'An exquisite villa with breathtaking ocean views. Features a private beach access and state-of-the-art amenities.',
    price: 2500000,
    location: 'Coastal City, USA',
    bedrooms: 5,
    bathrooms: 5,
    area: 5000,
    type: 'Villa',
    amenities: ['Pool', 'Garage', 'Garden', 'Gym'],
    imageUrl: 'https://placehold.co/600x400.png',
    agent: {
      id: 'agent3',
      name: 'Samantha Ray',
      avatarUrl: 'https://placehold.co/100x100.png'
    }
  },
  {
    id: '4',
    title: 'Cozy Condo with City View',
    description: 'A cozy and affordable condo perfect for a first-time home buyer. Enjoy stunning city views from your balcony.',
    price: 280000,
    location: 'Metropolis, USA',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    type: 'Condo',
    amenities: ['Gym', 'Parking'],
    imageUrl: 'https://placehold.co/600x400.png',
    agent: {
      id: 'agent4',
      name: 'Mike Johnson',
      avatarUrl: 'https://placehold.co/100x100.png'
    }
  },
  {
    id: '5',
    title: 'Rustic Countryside House',
    description: 'Escape the city to this charming rustic house. Surrounded by nature, it offers peace and tranquility.',
    price: 450000,
    location: 'Green Valley, USA',
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    type: 'House',
    amenities: ['Garden', 'Fireplace'],
    imageUrl: 'https://placehold.co/600x400.png',
    agent: {
      id: 'agent5',
      name: 'Emily White',
      avatarUrl: 'https://placehold.co/100x100.png'
    }
  },
  {
    id: '6',
    title: 'Penthouse with Rooftop Terrace',
    description: 'The epitome of luxury living. This penthouse features a private rooftop terrace with a jacuzzi and panoramic views.',
    price: 1800000,
    location: 'Metropolis, USA',
    bedrooms: 3,
    bathrooms: 4,
    area: 3200,
    type: 'Apartment',
    amenities: ['Pool', 'Gym', 'Parking', 'Terrace'],
    imageUrl: 'https://placehold.co/600x400.png',
    agent: {
      id: 'agent6',
      name: 'Jane Doe',
      avatarUrl: 'https://placehold.co/100x100.png'
    }
  }
];
