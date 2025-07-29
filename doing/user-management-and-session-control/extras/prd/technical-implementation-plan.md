# User Management and Session Control - Technical Implementation Plan

This document outlines the technical approach for implementing the user management and session control features described in the PRD. It provides specific implementation details, architecture decisions, and integration points with the existing codebase.

## Database Solution: Firebase

After evaluating the options, we recommend using Firebase for authentication and database needs:

### Firebase Authentication

Firebase Authentication provides a complete identity solution with minimal custom code:

- **Features**:
  - Email/password authentication
  - Social login providers (Google, Facebook, etc.)
  - Password reset and email verification
  - Multi-factor authentication
  - JWT-based session management

- **Implementation Steps**:
  1. Create a Firebase project in the Firebase console
  2. Enable desired authentication methods
  3. Install Firebase SDK in the project:
     ```bash
     npm install firebase
     ```
  4. Initialize Firebase in the application:
     ```javascript
     // src/firebase/config.js
     import { initializeApp } from 'firebase/app';
     import { getAuth } from 'firebase/auth';
     import { getFirestore } from 'firebase/firestore';

     const firebaseConfig = {
       apiKey: process.env.FIREBASE_API_KEY,
       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
       projectId: process.env.FIREBASE_PROJECT_ID,
       storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
       messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
       appId: process.env.FIREBASE_APP_ID
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     ```

### Firebase Firestore

Firestore will serve as the primary database for user data and reading history:

- **Data Models**:
  
  1. **Users Collection**:
  
  ```
  {
    uid: "string", // Firebase Auth UID
    displayName: "string",
    email: "string",
    photoURL: "string",
    createdAt: "timestamp",
    lastLogin: "timestamp",
    preferences: {
      // User preferences
    }
  }
  ```

  2. **Readings Collection**:
  
  ```
  {
    userId: "string", // Reference to user
    type: "string", // "tarot" or "crystal"
    timestamp: "timestamp",
    content: {
      // Reading-specific data
      // For tarot: cards, spread, interpretation
      // For crystal: crystal, question, insight
    }
  }
  ```

  3. **Subscriptions Collection**:
  
  ```
  {
    userId: "string", // Reference to user
    plan: "string", // "free", "basic", "premium"
    startDate: "timestamp",
    endDate: "timestamp",
    status: "string", // "active", "canceled", "expired"
    paymentInfo: {
      // Payment processor reference
    }
  }
  ```

## Backend Implementation

### Server Architecture Updates

The current Express.js server will be expanded to include:

1. Firebase Admin SDK for server-side authentication verification
2. New API routes for user management
3. Middleware for authentication and authorization

#### Server.js Updates

```javascript
// Add to existing imports
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Add routes for user management
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const readingRoutes = require('./routes/readings');
const subscriptionRoutes = require('./routes/subscriptions');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/readings', authenticateUser, readingRoutes);
app.use('/api/subscriptions', authenticateUser, subscriptionRoutes);
app.use('/api/admin', authenticateUser, adminRoutes);
```

### API Routes Implementation

Create the following route files:

#### routes/auth.js
```javascript
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Registration verification (optional server-side validation)
router.post('/register-verification', async (req, res) => {
  // Server-side validation logic
  res.json({ valid: true });
});

// Custom claims for user roles
router.post('/set-admin-role', async (req, res) => {
  // Admin-only endpoint to set admin role
  // Implementation with proper authorization
});

module.exports = router;
```

#### routes/users.js
```javascript
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userDoc.data());
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  // Implementation
});

// Delete user account
router.delete('/profile', async (req, res) => {
  // Implementation
});

module.exports = router;
```

Similar implementation for other route files:
- routes/readings.js
- routes/subscriptions.js
- routes/admin.js

## Frontend Implementation

### React Context for Authentication

Create an authentication context to manage user state throughout the application:

```javascript
// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

### App.jsx Updates

Update the main App component to include the AuthProvider and protected routes:

```javascript
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TarotReader from './components/TarotReader/TarotReader';
import PalmReader from './components/PalmReader/PalmReader';
import StarshipPsychics from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import './styles/tailwind.scss';
import './styles/app.scss';

// PrivateRoute component for protected routes
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const App = () => {
  // Existing starfield effect code...

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {/* Cosmic Background with Effects */}
          <div className="cosmic-background">
            {/* Animated Starfield */}
            <div className="starfield" id="starfield"></div>

            {/* Floating Orbs */}
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
            <div className="floating-orb orb-3"></div>

            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main className="app-main">
              <Routes>
                <Route path="/" element={<StarshipPsychics />} />
                <Route path="/tarot" element={<TarotReader />} />
                <Route path="/palm-reader" element={<PalmReader />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

// Simple 404 component (existing code)

export default App;
```

### New Components

Create the following new components:

#### Authentication Components

1. **Login Component**:
```javascript
// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    }
    
    setLoading(false);
  }

  return (
    <div className="page-container">
      <section className="page-section">
        <h1 className="page-title">Cosmic Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="cosmic-button" 
            disabled={loading}
          >
            Log In
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
```

Similar components will be created for:
- src/components/Auth/Signup.jsx
- src/components/Auth/ForgotPassword.jsx

#### Profile Component

```javascript
// src/components/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ReadingHistory from './ReadingHistory';

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch user profile data from Firestore
    const fetchProfile = async () => {
      // Implementation
    };
    
    fetchProfile();
  }, [currentUser]);
  
  return (
    <div className="page-container">
      <section className="page-section">
        <h1 className="page-title">My Cosmic Profile</h1>
        
        {loading ? (
          <div className="loading">Loading profile...</div>
        ) : (
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                {/* Avatar/image */}
              </div>
              <div className="profile-info">
                <h2>{profile?.displayName || 'Cosmic Traveler'}</h2>
                <p>{profile?.email}</p>
              </div>
            </div>
            
            <div className="profile-sections">
              <div className="profile-section">
                <h3>Account Settings</h3>
                {/* Account settings form */}
              </div>
              
              <div className="profile-section">
                <h3>Subscription</h3>
                {/* Subscription info */}
              </div>
              
              <div className="profile-section">
                <h3>Reading History</h3>
                <ReadingHistory />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
```

#### Navigation Updates

Update the Navigation component to include user authentication state:

```javascript
// src/components/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <Link to="/">Psychic</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tarot">Tarot</Link>
        <Link to="/palm-reader">Palm Reader</Link>
      </div>
      
      <div className="nav-auth">
        {currentUser ? (
          <>
            <div className="user-menu">
              <div className="user-avatar">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" />
                ) : (
                  <div className="avatar-placeholder">
                    {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="user-dropdown">
                <Link to="/profile">My Profile</Link>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Log In</Link>
            <Link to="/signup" className="cosmic-button">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
```

## Integration with Existing Features

### Tarot and Crystal Reading Integration

Update the existing reading components to save readings to the user's history when logged in:

```javascript
// Example for TarotReader.jsx
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Inside component:
const { currentUser } = useAuth();

// After receiving reading result:
const saveReadingToHistory = async (readingData) => {
  if (!currentUser) return; // Only save for logged-in users
  
  try {
    await addDoc(collection(db, 'readings'), {
      userId: currentUser.uid,
      type: 'tarot',
      timestamp: serverTimestamp(),
      content: {
        spread: spread,
        cards: drawnCards,
        interpretation: readingData.message
      }
    });
  } catch (error) {
    console.error('Error saving reading:', error);
  }
};

// Call this function after receiving the reading result
```

## Environment Configuration

Update the .env file to include Firebase configuration:

```
# Existing variables
OPENAI_API_KEY=your_openai_key

# Firebase configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

## Implementation Timeline

### Phase 1: Core Authentication (2 weeks)
- Week 1:
  - Set up Firebase project
  - Implement AuthContext and authentication components
  - Update Navigation component
  - Add protected routes

- Week 2:
  - Implement backend authentication routes
  - Set up Firestore database schema
  - Create user profile storage
  - Test authentication flows

### Phase 2: User Profiles and History (2 weeks)
- Week 3:
  - Implement profile component
  - Create reading history storage
  - Update existing reading components to save history
  - Implement profile editing functionality

- Week 4:
  - Complete reading history display
  - Add user preferences
  - Implement account deletion
  - Test profile and history features

### Phase 3: Subscription Management (3 weeks)
- Weeks 5-7:
  - Integrate payment processor
  - Implement subscription plans and management
  - Create subscription UI components
  - Add access control for premium features
  - Test subscription flows

### Phase 4: Administrative Features (2 weeks)
- Weeks 8-9:
  - Develop admin dashboard
  - Implement user management tools
  - Create content moderation features
  - Add reporting and analytics
  - Test administrative functions

### Phase 5: Testing and Refinement (1 week)
- Week 10:
  - Comprehensive testing
  - Performance optimization
  - Security review
  - User acceptance testing
  - Documentation and deployment preparation

## Conclusion

This technical implementation plan provides a detailed roadmap for implementing the user management and session control features described in the PRD. By following Firebase's best practices and integrating with the existing codebase, we can efficiently add these features with minimal custom backend code while maintaining security and scalability.
