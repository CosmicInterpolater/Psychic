const admin = require('firebase-admin');
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
  ? require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
  : null;

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: serviceAccount 
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth
};
