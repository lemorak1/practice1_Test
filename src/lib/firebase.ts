import { cert, getApps, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import type { Bucket } from '@google-cloud/storage';

let bucket: Bucket | null = null;

function init() {
  if (bucket) return bucket;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey || !storageBucket) {
    throw new Error('Missing Firebase environment variables');
  }

  const serviceAccount: ServiceAccount = { projectId, clientEmail, privateKey };
  const app = getApps()[0] ?? initializeApp({
    credential: cert(serviceAccount),
    storageBucket,
  });

  bucket = getStorage(app).bucket();
  return bucket;
}

export async function uploadBuffer(buffer: Buffer, filename: string, contentType?: string): Promise<string> {
  const b = init();
  const file = b.file(filename);
  await file.save(buffer, { resumable: false, contentType });
  await file.makePublic();
  return file.publicUrl();
}
