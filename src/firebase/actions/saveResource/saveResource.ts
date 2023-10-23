import { adminApp } from '@/firebase/admin';

// Save a resource of type T to the database
export const saveResource = async <T>(
  basePath: string,
  resourceId: string,
  resourceData: T
): Promise<void> => {
  try {
    const db = adminApp().database();
    const postRef = db.ref(`${basePath}/${resourceId}`);
    await postRef.set(resourceData);
  } catch (error) {
    console.error('Error saving resource:', error);
    throw error;
  }
};
