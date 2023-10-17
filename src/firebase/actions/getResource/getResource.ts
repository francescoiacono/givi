import { db } from '@/firebase/database';
import { get, ref } from 'firebase/database';

export const getResource = async <T>(basePath: string, resourceId: string) => {
  const docRef = ref(db, `${basePath}/${resourceId}`);
  const snapshot = await get(docRef);

  if (snapshot.exists()) {
    const data: T = snapshot.val();
    return data;
  } else {
    return null;
  }
};
