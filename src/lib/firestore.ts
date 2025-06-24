import { collection, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Property } from './types';

export async function createProperty(data: Omit<Property, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'properties'), data);
    return docRef.id;
  } catch (err) {
    console.error('Firestore write failed:', err);
    throw err;
  }

}

export async function updatePropertyInDb(id: string, data: Omit<Property, 'id'>): Promise<void> {
  await setDoc(doc(db, 'properties', id), data);
}

export async function deletePropertyFromDb(id: string): Promise<void> {
  await deleteDoc(doc(db, 'properties', id));
}
