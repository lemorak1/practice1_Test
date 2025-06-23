import { Header } from '@/components/header';
import { FilterSidebar } from '@/components/filter-sidebar';
import { PropertyList } from '@/components/property-list';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 w-full container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>
          <main className="md:col-span-3">
            <PropertyList />
          </main>
        </div>
      </div>
    </div>
  );
}
