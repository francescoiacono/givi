import { getDatabase } from 'firebase/database';
import { firebaseApp } from '@/firebase/config';

const db = getDatabase(firebaseApp);

export { db };
