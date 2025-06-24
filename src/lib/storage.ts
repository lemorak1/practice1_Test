import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`)
  try {
    await uploadBytes(storageRef, file)
  } catch (err) {
    console.error('Firebase upload failed:', err)
    throw err
  }
  return getDownloadURL(storageRef)
}
