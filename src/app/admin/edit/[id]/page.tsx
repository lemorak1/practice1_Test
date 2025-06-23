'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

export default function EditPropertyPage({ params }: any) {
  const { data: session, status } = useSession();
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

  useEffect(() => {
    fetch(`/api/properties/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAddress(data.address || '');
        setCity(data.city || '');
        setStateVal(data.state || '');
        setZip(data.zip || '');
        setCounty(data.county || '');
        setPrice(data.price ?? '');
        setBeds(data.beds ?? '');
        setBaths(data.baths ?? '');
      });
  }, [params.id]);

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
    const res = await fetch(`/api/properties/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address,
        city,
        state: stateVal,
        zip,
        county,
        price: price ? Number(price) : null,
        beds: beds ? Number(beds) : null,
        baths: baths ? parseFloat(baths) : null,
      }),
    });
    if (res.ok) {
      if (files) {
        for (const file of Array.from(files)) {
          const fd = new FormData();
          fd.append('file', file);
          fd.append('propertyId', params.id);
          await fetch('/api/upload', { method: 'POST', body: fd });
        }
      }
      router.push(`/${params.id}`);
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input
          className="border p-2"
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
          className="border p-2"
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button className="bg-blue-500 text-white p-2" type="submit">
          Update
        </button>
      </form>
    </main>
  );
}
