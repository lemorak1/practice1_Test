import 'dotenv/config';
import { db } from '../src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function run() {
  const snapshot = await getDocs(collection(db, 'properties'));
  console.log(`Found ${snapshot.size} properties`);
}

run().catch((err) => {
  console.error('Firebase connection failed:', err.message);
  process.exit(1);
});
