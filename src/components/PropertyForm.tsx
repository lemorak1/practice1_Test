import { useState } from 'react';
import { Property } from '../data';

interface Props {
  onSubmit: (property: Property) => void;
}

export default function PropertyForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now(),
      title,
      city,
      county,
      price: parseFloat(price),
      image: 'https://via.placeholder.com/400x300',
      description
    });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-1" />
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" className="border p-1" />
      <input value={county} onChange={e => setCounty(e.target.value)} placeholder="County" className="border p-1" />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-1" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-1" />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Save</button>
    </form>
  );
}
