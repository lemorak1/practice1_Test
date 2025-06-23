export interface StoredProperty {
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
}

export function loadLocalProperties(): StoredProperty[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('localProperties');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalProperty(property: StoredProperty) {
  if (typeof window === 'undefined') return;
  const props = loadLocalProperties();
  const index = props.findIndex((p) => p.id === property.id);
  if (index >= 0) {
    props[index] = property;
  } else {
    props.push(property);
  }
  localStorage.setItem('localProperties', JSON.stringify(props));
}

export function removeLocalProperty(id: number) {
  if (typeof window === 'undefined') return;
  const props = loadLocalProperties().filter((p) => p.id !== id);
  localStorage.setItem('localProperties', JSON.stringify(props));
}
