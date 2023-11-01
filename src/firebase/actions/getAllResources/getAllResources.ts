import { adminApp } from '@/firebase/admin';

export const getAllResources = async <T>(
  basePath: string,
  limit: number = 3,
  lastKey?: number
): Promise<T[] | null> => {
  const db = adminApp().database();

  const docRef = !lastKey
    ? db.ref(basePath).orderByChild('date').limitToFirst(limit)
    : db
        .ref(basePath)
        .orderByChild('date')
        .startAfter(lastKey)
        .limitToFirst(limit);

  const data: T[] = [];

  const snapshot = await docRef.get();

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const postData = childSnapshot.val();
      postData.date = -postData.date; // Convert back to positive
      data.push(postData);
    });
  }
  return data;
};
