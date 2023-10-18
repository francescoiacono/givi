import { db } from '@/firebase/database';
import { get, ref, remove } from 'firebase/database';

export const deleteResource = async (basePath: string, resourceId: string) => {
  const docRef = ref(db, `${basePath}/${resourceId}`);
  const snapshot = await get(docRef);

  if (snapshot.exists()) {
    await remove(docRef);
    return true;
  } else {
    return false;
  }
};
