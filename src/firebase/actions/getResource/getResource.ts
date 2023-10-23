import { adminApp } from '@/firebase/admin';

export const getResource = async <T>(basePath: string, resourceId: string) => {
  try {
    const db = adminApp().database();
    const docRef = db.ref(`${basePath}/${resourceId}`);

    let data: T | null = null;
    const snapshot = await docRef.get();

    if (snapshot.exists()) {
      data = snapshot.val();
    }

    return data;
  } catch (error) {
    console.error('Error getting resource:', error);
    throw error;
  }
};
