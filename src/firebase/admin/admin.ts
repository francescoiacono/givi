import * as admin from 'firebase-admin';

// Check if the environment variable is set
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error(
    'The FIREBASE_SERVICE_ACCOUNT environment variable is not set.'
  );
}

// Parse the service account key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const adminApp = () => {
  if (admin.apps.length === 1) {
    if (admin.apps[0]) return admin.apps[0];
  }
  console.log(`>>> Initializing Firebase Admin App`);
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
};

export { adminApp };
