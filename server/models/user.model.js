/**
 * User Model
 * Defines the structure for user profiles in the application
 */

const userModel = {
  // Schema definition for a user
  schema: {
    uid: String,           // Firebase Auth UID
    email: String,         // User's email address
    displayName: String,   // User's display name
    photoURL: String,      // Optional profile photo URL
    createdAt: Date,       // Account creation timestamp
    updatedAt: Date,       // Last update timestamp
    role: {                // User role (user/admin)
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    preferences: {         // User preferences object
      type: Object,
      default: {}
    }
  },

  // Create a new user document
  create: (db, userData) => {
    const user = {
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: userData.role || 'user',
      preferences: userData.preferences || {}
    };

    return db.collection('users').doc(userData.uid).set(user)
      .then(() => user);
  },

  // Get a user by UID
  getByUid: (db, uid) => {
    return db.collection('users').doc(uid).get()
      .then(doc => {
        if (!doc.exists) {
          return null;
        }
        return doc.data();
      });
  },

  // Update a user
  update: (db, uid, userData) => {
    const updates = {
      ...userData,
      updatedAt: new Date()
    };
    
    return db.collection('users').doc(uid).update(updates)
      .then(() => {
        return db.collection('users').doc(uid).get();
      })
      .then(doc => doc.data());
  },

  // Delete a user
  delete: (db, uid) => {
    return db.collection('users').doc(uid).delete();
  },

  // List all users (for admin)
  list: (db, limit = 100, startAfter = null) => {
    let query = db.collection('users').orderBy('createdAt', 'desc').limit(limit);
    
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    
    return query.get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          users.push(doc.data());
        });
        return users;
      });
  }
};

module.exports = userModel;
