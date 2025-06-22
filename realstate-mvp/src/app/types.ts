export interface Property {
  id: number;
  address: string;
  photos?: { id: number; url: string }[];
  wholesalers?: { id: number; name: string }[];
}
