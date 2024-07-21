import { adminApp } from '@/firebase/admin';

/**
 * Retrieves all resources from the Firebase database.
 *
 * @param basePath - The base path of the resources in the database.
 * @param limit - The maximum number of resources to retrieve. Set to `null` to retrieve all resources.
 * @param lastKey - The last key to start retrieving resources from. Optional.
 * @returns A promise that resolves to an array of resources or `null`.
 */
export const getAllResources = async <T>(
  basePath: string,
  limit?: number,
  lastKey?: number
): Promise<T[] | null> => {
  const db = adminApp().database();

  let docRef;
  if (!limit) {
    docRef = !lastKey
      ? db.ref(basePath).orderByChild('date')
      : db.ref(basePath).orderByChild('date').startAt(lastKey);
  } else {
    docRef = !lastKey
      ? db.ref(basePath).orderByChild('date').limitToFirst(limit)
      : db
          .ref(basePath)
          .orderByChild('date')
          .startAt(lastKey)
          .limitToFirst(limit + 1);
  }

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

  if (lastKey && limit !== null && data.length > 0) {
    data.shift(); // Remove the overlapped item
  }

  return data;
};
