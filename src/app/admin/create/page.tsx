'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { saveLocalProperty } from '../../../lib/localProperties';

export default function CreatePropertyPage() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.name === 'Admin';
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [zip, setZip] = useState('');
  const [county, setCounty] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) {
    return (
      <div className="p-4">
        <p>You must be signed in to access this page.</p>
        <button onClick={() => signIn()} className="underline text-blue-600">
          Sign in
        </button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAdmin) return;
    const payload = {
      address,
      city,
      state: stateVal,
      zip,
      county,
      price: price ? Number(price) : null,
      beds: beds ? Number(beds) : null,
      baths: baths ? parseFloat(baths) : null,
    };
    let created: any = null;
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        created = await res.json();
      }
    } catch {
      // ignore network errors
    }
    if (!created) {
      created = { id: Date.now(), ...payload };
    }
    if (files) {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('propertyId', created.id.toString());
        await fetch('/api/upload', { method: 'POST', body: fd });
      }
    }
    saveLocalProperty(created);
    router.push('/');
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Property</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl"
      >
        <input
          className="border p-2"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="State"
          value={stateVal}
          onChange={(e) => setStateVal(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="ZIP"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="County"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Beds"
          type="number"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Baths"
          type="number"
          step="0.5"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
        />
        <input
          className="border p-2 md:col-span-2"
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        {isAdmin && (
          <button
            className="bg-blue-500 text-white p-2 md:col-span-2"
            type="submit"
          >
            Save
          </button>
        )}
      </form>
    </main>
  );
}
