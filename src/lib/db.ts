import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

export interface Property {
  id: number;
  address: string;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  county?: string | null;
  price?: number | null;
  beds?: number | null;
  baths?: number | null;
  photos?: { id: number; url: string }[];
  wholesalers?: { id: number; name: string }[];
}

let provider = process.env.DB_PROVIDER;
if (provider !== 'supabase' && provider !== 'firebase') {
  console.warn(
    `Unknown DB_PROVIDER "${provider}", defaulting to "supabase".`,
  );
  provider = 'supabase';
}

let supabase: SupabaseClient | null = null;
let pool: Pool | null = null;
let initPromise: Promise<void> | null = null;

if (provider === 'supabase') {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_ANON_KEY as string;
  supabase = createClient(url, key);
  if (process.env.DATABASE_URL) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
} else if (provider === 'firebase') {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

async function ensureTables() {
  if (!pool) {
    console.warn('DATABASE_URL not configured; skipping table check');
    return;
  }
  const sql = `
    CREATE TABLE IF NOT EXISTS "Property" (
      id serial PRIMARY KEY,
      address text NOT NULL,
      city text,
      state text,
      zip text,
      county text,
      price numeric,
      beds integer,
      baths numeric
    );
    CREATE TABLE IF NOT EXISTS "Photo" (
      id serial PRIMARY KEY,
      url text NOT NULL,
      "propertyId" integer REFERENCES "Property"(id) ON DELETE SET NULL
    );
    CREATE TABLE IF NOT EXISTS "Wholesaler" (
      id serial PRIMARY KEY,
      name text NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "_PropertyWholesalers" (
      "A" integer REFERENCES "Property"(id) ON DELETE CASCADE,
      "B" integer REFERENCES "Wholesaler"(id) ON DELETE CASCADE,
      PRIMARY KEY ("A", "B")
    );
  `;
  await pool.query(sql);
}

if (pool) {
  initPromise = ensureTables().catch((err) => {
    console.error('Failed to initialize database tables:', err);
  });
}

export async function getProperties(filters: any = {}): Promise<Property[]> {
  if (initPromise) await initPromise;
  if (provider === 'supabase') {
    let query = supabase!
      .from('Property')
      .select('*, photos(*), wholesalers(*)');

    if (filters.address) query = query.ilike('address', `%${filters.address}%`);
    if (filters.city) query = query.ilike('city', `%${filters.city}%`);
    if (filters.county) query = query.ilike('county', `%${filters.county}%`);
    if (filters.minPrice) query = query.gte('price', filters.minPrice);
    if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
    if (filters.beds) query = query.gte('beds', filters.beds);
    if (filters.baths) query = query.gte('baths', filters.baths);

    const { data, error } = await query;
    if (error) throw error;
    return data as any;
  }

  // firebase (PostgreSQL)
  const conditions: string[] = [];
  const values: any[] = [];
  if (filters.address) {
    values.push(`%${filters.address}%`);
    conditions.push(`address ILIKE $${values.length}`);
  }
  if (filters.city) {
    values.push(`%${filters.city}%`);
    conditions.push(`city ILIKE $${values.length}`);
  }
  if (filters.county) {
    values.push(`%${filters.county}%`);
    conditions.push(`county ILIKE $${values.length}`);
  }
  if (filters.minPrice) {
    values.push(filters.minPrice);
    conditions.push(`price >= $${values.length}`);
  }
  if (filters.maxPrice) {
    values.push(filters.maxPrice);
    conditions.push(`price <= $${values.length}`);
  }
  if (filters.beds) {
    values.push(filters.beds);
    conditions.push(`beds >= $${values.length}`);
  }
  if (filters.baths) {
    values.push(filters.baths);
    conditions.push(`baths >= $${values.length}`);
  }

  let sql =
    'SELECT p.*, ' +
    'COALESCE((SELECT json_agg(json_build_object(\'id\', ph.id, \'url\', ph.url)) FROM "Photo" ph WHERE ph."propertyId" = p.id), \'[]\') AS photos, ' +
    'COALESCE((SELECT json_agg(json_build_object(\'id\', w.id, \'name\', w.name)) FROM "_PropertyWholesalers" pw JOIN "Wholesaler" w ON pw."B" = w.id WHERE pw."A" = p.id), \'[]\') AS wholesalers ' +
    'FROM "Property" p';

  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');

  const { rows } = await pool!.query(sql, values);
  return rows;
}

export async function getPropertyById(id: number): Promise<Property | null> {
  if (initPromise) await initPromise;
  if (provider === 'supabase') {
    const { data, error } = await supabase!
      .from('Property')
      .select('*, photos(*), wholesalers(*)')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data as any;
  }

  const sql =
    'SELECT p.*, ' +
    'COALESCE((SELECT json_agg(json_build_object(\'id\', ph.id, \'url\', ph.url)) FROM "Photo" ph WHERE ph."propertyId" = p.id), \'[]\') AS photos, ' +
    'COALESCE((SELECT json_agg(json_build_object(\'id\', w.id, \'name\', w.name)) FROM "_PropertyWholesalers" pw JOIN "Wholesaler" w ON pw."B" = w.id WHERE pw."A" = p.id), \'[]\') AS wholesalers ' +
    'FROM "Property" p WHERE p.id = $1';
  const { rows } = await pool!.query(sql, [id]);
  return rows[0] || null;
}

export async function createProperty(data: Partial<Property>): Promise<Property> {
  if (initPromise) await initPromise;
  if (provider === 'supabase') {
    const { data: prop, error } = await supabase!
      .from('Property')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return prop as any;
  }

  const fields = [
    'address',
    'city',
    'state',
    'zip',
    'county',
    'price',
    'beds',
    'baths',
  ];
  const cols: string[] = [];
  const placeholders: string[] = [];
  const values: any[] = [];
  fields.forEach((f) => {
    if (f in data) {
      values.push((data as any)[f]);
      cols.push(`"${f}"`);
      placeholders.push(`$${values.length}`);
    }
  });
  const sql = `INSERT INTO "Property"(${cols.join(',')}) VALUES(${placeholders.join(',')}) RETURNING *`;
  const { rows } = await pool!.query(sql, values);
  return rows[0];
}

export async function updateProperty(id: number, data: Partial<Property>): Promise<Property> {
  if (initPromise) await initPromise;
  if (provider === 'supabase') {
    const { data: prop, error } = await supabase!
      .from('Property')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return prop as any;
  }
  const sets: string[] = [];
  const values: any[] = [];
  Object.entries(data).forEach(([key, value]) => {
    values.push(value);
    sets.push(`"${key}" = $${values.length}`);
  });
  values.push(id);
  const sql = `UPDATE "Property" SET ${sets.join(', ')} WHERE id = $${values.length} RETURNING *`;
  const { rows } = await pool!.query(sql, values);
  return rows[0];
}

export async function deleteProperty(id: number): Promise<void> {
  if (initPromise) await initPromise;
  if (provider === 'supabase') {
    const { error } = await supabase!
      .from('Property')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return;
  }
  await pool!.query('DELETE FROM "Property" WHERE id = $1', [id]);
}

export async function createPhoto(data: { url: string; propertyId?: number }): Promise<any> {
  if (initPromise) await initPromise;
  if (provider === 'supabase') {
    const { data: photo, error } = await supabase!
      .from('Photo')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return photo as any;
  }
  const sql = 'INSERT INTO "Photo"(url, "propertyId") VALUES($1, $2) RETURNING *';
  const { rows } = await pool!.query(sql, [data.url, data.propertyId || null]);
  return rows[0];
}
