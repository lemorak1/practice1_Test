"use client";

import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import type { Property, Filters } from '@/lib/types';
import { mockProperties } from '@/lib/mock-data';
import { createProperty } from '@/lib/firestore';

const MAX_PRICE = 3000000;

interface AppContextType {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  role: 'user' | 'admin';
  setRole: React.Dispatch<React.SetStateAction<'user' | 'admin'>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredProperties: Property[];
  clearFilters: () => void;
  amenitiesList: string[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const initialFilters: Filters = {
  query: '',
  priceRange: [0, MAX_PRICE],
  propertyType: 'all',
  bedrooms: 'any',
  bathrooms: 'any',
  amenities: [],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const addProperty = async (propertyData: Omit<Property, 'id'>) => {
    const id = await createProperty(propertyData);
    const newProperty: Property = {
      ...propertyData,
      id,
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const { query, priceRange, propertyType, bedrooms, bathrooms, amenities } = filters;
      if (query && !property.title.toLowerCase().includes(query.toLowerCase()) && !property.location.toLowerCase().includes(query.toLowerCase())) return false;
      if (property.price < priceRange[0] || property.price > priceRange[1]) return false;
      if (propertyType !== 'all' && property.type !== propertyType) return false;
      if (bedrooms !== 'any' && property.bedrooms < parseInt(bedrooms)) return false;
      if (bathrooms !== 'any' && property.bathrooms < parseInt(bathrooms)) return false;
      if (amenities.length > 0 && !amenities.every(amenity => property.amenities.includes(amenity))) return false;
      return true;
    });
  }, [properties, filters]);

  const amenitiesList = useMemo(() => {
    const allAmenities = new Set<string>();
    properties.forEach(p => p.amenities.forEach(a => allAmenities.add(a)));
    return Array.from(allAmenities);
  }, [properties]);
  
  const value = {
    properties,
    setProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    role,
    setRole,
    filters,
    setFilters,
    filteredProperties,
    clearFilters,
    amenitiesList
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
