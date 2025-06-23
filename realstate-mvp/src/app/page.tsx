import Link from 'next/link';
import { useI18n } from './i18n';
import { Property } from './types';

async function getProperties() {
  const res = await fetch('http://localhost:3000/api/properties', { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const properties = await getProperties();
  return (
    <main className="p-4">
      <HomeContent properties={properties} />
    </main>
  );
}

function HomeContent({ properties }: { properties: Property[] }) {
  const { t } = useI18n();
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <Link href="/new" className="underline">{t('addNew')}</Link>
      <ul className="mt-4 space-y-2">
        {properties.map((p) => (
          <li key={p.id} className="border p-2">
            <Link href={`/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}