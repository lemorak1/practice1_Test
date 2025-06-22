'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewProperty() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', address: '', city: '', state: '', price: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <input className="border p-1" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" />
      <input className="border p-1" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" />
      <input className="border p-1" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City" />
      <input className="border p-1" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} placeholder="State" />
      <input className="border p-1" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" />
      <button className="border px-2 py-1" type="submit">Save</button>
    </form>
  );
}