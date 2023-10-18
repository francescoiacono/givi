import { db } from '@/firebase/database';
import { ref, set } from 'firebase/database';

// Save a resource of type T to the database
export const saveResource = async <T>(
  basePath: string,
  resourceId: string,
  resourceData: T
): Promise<void> => {
  const postRef = ref(db, `${basePath}/${resourceId}`);
  await set(postRef, resourceData);
};
