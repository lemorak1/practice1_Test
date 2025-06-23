import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
