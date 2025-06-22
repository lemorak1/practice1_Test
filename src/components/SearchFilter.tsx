import { useState } from 'react';

export interface FilterState {
  search: string;
  city: string;
  county: string;
  minPrice: string;
  maxPrice: string;
}

interface Props {
  onFilter: (filters: FilterState) => void;
}

export default function SearchFilter({ onFilter }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    city: '',
    county: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form className="flex flex-wrap gap-2 mb-4" onSubmit={submit}>
      <input
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search"
        className="border p-1"
      />
      <input
        name="city"
        value={filters.city}
        onChange={handleChange}
        placeholder="City"
        className="border p-1"
      />
      <input
        name="county"
        value={filters.county}
        onChange={handleChange}
        placeholder="County"
        className="border p-1"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Min Price"
        className="border p-1 w-24"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="Max Price"
        className="border p-1 w-24"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
        Filter
      </button>
    </form>
  );
}
