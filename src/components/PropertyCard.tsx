import { Property } from '../data';

interface Props {
  property: Property;
  onSelect: () => void;
}

export default function PropertyCard({ property, onSelect }: Props) {
  return (
    <div className="border rounded shadow p-2 cursor-pointer" onClick={onSelect}>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-xl font-semibold">{property.title}</h2>
      <p className="text-sm">{property.city}, {property.county}</p>
      <p className="font-bold">${property.price.toLocaleString()}</p>
    </div>
  );
}
