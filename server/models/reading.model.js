/**
 * Reading History Model
 * Defines the structure for storing psychic reading history
 */

const readingModel = {
  // Schema definition for a reading
  schema: {
    id: String,            // Auto-generated ID
    userId: String,        // Reference to user
    type: {                // Type of reading
      type: String,
      enum: ['tarot', 'palm', 'astrology', 'crystal', 'general'],
      required: true
    },
    content: {             // The reading content
      type: Object,
      required: true
    },
    createdAt: Date,       // Reading timestamp
    metadata: {            // Additional reading-specific data
      type: Object,
      default: {}
    }
  },

  // Save a new reading
  create: (db, readingData) => {
    const reading = {
      userId: readingData.userId,
      type: readingData.type,
      content: readingData.content,
      createdAt: new Date(),
      metadata: readingData.metadata || {}
    };

    return db.collection('readings').add(reading)
      .then(docRef => {
        return db.collection('readings').doc(docRef.id).update({
          id: docRef.id
        }).then(() => {
          return {
            id: docRef.id,
            ...reading
          };
        });
      });
  },

  // Get a reading by ID
  getById: (db, id) => {
    return db.collection('readings').doc(id).get()
      .then(doc => {
        if (!doc.exists) {
          return null;
        }
        return doc.data();
      });
  },

  // Get readings for a user
  getByUserId: (db, userId, limit = 20, startAfter = null) => {
    let query = db.collection('readings')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(limit);
    
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    
    return query.get()
      .then(snapshot => {
        const readings = [];
        snapshot.forEach(doc => {
          readings.push(doc.data());
        });
        return readings;
      });
  },

  // Delete a reading
  delete: (db, id) => {
    return db.collection('readings').doc(id).delete();
  },

  // Delete all readings for a user (used when deleting a user account)
  deleteByUserId: (db, userId) => {
    return db.collection('readings')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        const batch = db.batch();
        snapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      });
  }
};

module.exports = readingModel;
