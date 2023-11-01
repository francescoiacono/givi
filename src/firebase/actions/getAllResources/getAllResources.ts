import { adminApp } from '@/firebase/admin';

export const getAllResources = async <T>(
  basePath: string
): Promise<T[] | null> => {
  const db = adminApp().database();
  const docRef = db.ref(basePath);

  const data: T[] = [];

  const snapshot = await docRef.get();

  if (snapshot.exists()) {
    snapshot.forEach(childSnapshot => {
      data.push(childSnapshot.val());
    });
  }

  return data;
};
