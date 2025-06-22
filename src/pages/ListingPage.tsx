import { useState } from 'react';
import { properties, Property } from '../data';
import SearchFilter, { FilterState } from '../components/SearchFilter';
import PropertyCard from '../components/PropertyCard';
import PropertyDetail from '../components/PropertyDetail';

export default function ListingPage() {
  const [selected, setSelected] = useState<Property | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    city: '',
    county: '',
    minPrice: '',
    maxPrice: ''
  });

  const applyFilters = (list: Property[]) => {
    return list.filter(p => {
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.county && p.county.toLowerCase() !== filters.county.toLowerCase()) return false;
      if (filters.minPrice && p.price < parseFloat(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > parseFloat(filters.maxPrice)) return false;
      return true;
    });
  };

  if (selected) {
    return <PropertyDetail property={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listings</h1>
      <SearchFilter onFilter={setFilters} />
      <div className="grid md:grid-cols-3 gap-4">
        {applyFilters(properties).map(p => (
          <PropertyCard key={p.id} property={p} onSelect={() => setSelected(p)} />
        ))}
      </div>
    </div>
  );
}
