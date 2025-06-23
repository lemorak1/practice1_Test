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
