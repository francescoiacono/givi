import { adminApp } from '@/firebase/admin';

export const getAllResources = async <T>(
  basePath: string,
  limit: number = 10,
  lastKey?: number
): Promise<T[] | null> => {
  const db = adminApp().database();

  const docRef = !lastKey
    ? db.ref(basePath).orderByChild('date').limitToFirst(limit)
    : db
        .ref(basePath)
        .orderByChild('date')
        .startAt(lastKey)
        .limitToFirst(limit + 1);

  const data: T[] = [];

  const snapshot = await docRef.get();

  if (snapshot.exists()) {
    snapshot.forEach(childSnapshot => {
      const postData = childSnapshot.val();
      if (postData.date < 0) {
        postData.date = -postData.date;
      }
      data.push(postData);
    });
  }

  if (lastKey && data.length > 0) {
    data.shift(); // Remove the overlapped item
  }

  console.log('data: ', data);
  return data;
};
