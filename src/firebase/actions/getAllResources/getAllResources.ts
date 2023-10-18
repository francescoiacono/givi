import { db } from '@/firebase/database';
import { get, ref } from 'firebase/database';

export const getAllResources = async <T>(
  basePath: string
): Promise<T[] | null> => {
  const docRef = ref(db, basePath);
  const snapshot = await get(docRef);
  const data: T[] = [];

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      data.push(childData);
    });
    return data;
  } else {
    return null;
  }
};
