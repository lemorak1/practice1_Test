import { notFound } from 'next/navigation'

async function getProperty(id) {
  const res = await fetch(`http://localhost:3000/api/properties/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function Page({ params }) {
  const property = await getProperty(params.id)
  if (!property) return notFound()
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">{property.title}</h1>
      <p>{property.address}</p>
      <p>{property.city}, {property.state}</p>
      <p>${property.price}</p>
    </main>
  )
}