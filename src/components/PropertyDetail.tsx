import { Property } from '../data';

interface Props {
  property: Property;
  onBack: () => void;
}

export default function PropertyDetail({ property, onBack }: Props) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-blue-500 mb-2">Back to listings</button>
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover mb-2" />
      <h2 className="text-2xl font-bold">{property.title}</h2>
      <p>{property.city}, {property.county}</p>
      <p className="font-bold mb-2">${property.price.toLocaleString()}</p>
      <p>{property.description}</p>
    </div>
  );
}
