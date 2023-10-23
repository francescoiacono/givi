import { adminApp } from '@/firebase/admin';

export const deleteResource = async (basePath: string, resourceId: string) => {
  const db = adminApp().database();
  const docRef = db.ref(`${basePath}/${resourceId}`);

  const snapshot = await docRef.get();

  if (snapshot.exists()) {
    await docRef.remove();
    return true;
  } else {
    return false;
  }
};
