# Enhanced Project Plan: User Management and Session Control

## Introduction

### Project Context
The Psychic application is currently a standalone application that provides various psychic reading features (tarot, palm reading, astrology, etc.) without user-specific personalization. This project aims to transform it into a personalized subscription service by implementing a comprehensive user management and session control system.

### Current State
The application currently lacks:
- User authentication and authorization
- User profiles and preferences
- Reading history storage
- Subscription management
- Administrative capabilities

### Technical Approach Rationale
This implementation will leverage:
- **Firebase** for Authentication and Firestore database services:
  - Provides a robust, scalable authentication system with multiple sign-in methods
  - Offers a flexible, NoSQL database for storing user data and reading history
  - Includes security rules for fine-grained access control
  - Reduces backend development time with managed services
  
- **Stripe** for payment processing:
  - Industry-standard payment processing with strong security
  - Comprehensive subscription management capabilities
  - Webhook system for handling subscription lifecycle events
  - Extensive documentation and developer tools

- **React** for frontend and **Express** for backend:
  - Maintains consistency with the existing application architecture
  - Provides a clear separation of concerns between client and server
  - Enables efficient component-based UI development
  - Facilitates API-based communication between frontend and backend

## Project Dependencies and Prerequisites

### Required Tools and Versions
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Git (v2.x or higher)
- Firebase CLI (v9.x or higher) - `npm install -g firebase-tools`
- Stripe CLI (v1.x or higher) - Install from https://stripe.com/docs/stripe-cli

### Access Requirements
- Firebase account with administrative access
- Stripe account with administrative access
- GitHub repository access with write permissions

### Dependency Graph
[Include a visual representation of task dependencies here]

## Phase 0: Project Setup & Essential Configuration

### 1. Directory Structure & Dependency Setup

#### Task 0.1: Restructure Project for Client-Server Architecture

**Objective:** Establish the foundational directory structure for the client-server architecture.

**Rationale:** A clear separation between client and server code is essential for maintainable architecture. This structure follows industry best practices for React and Express applications, ensuring concerns are properly separated and components are organized logically.

**Prerequisites:** None

**Action(s):**
1. Create a new branch for the implementation:
   ```bash
   git checkout -b feature/user-management-structure
   ```

2. Create the following directories:
   ```bash
   mkdir -p client/src/{components/{auth,profile,subscription,admin},contexts,hooks,services,utils}
   mkdir -p server/{config,controllers,middleware,models,routes,services,utils}
   ```
   
   This will create:
   * `client/` (for the React frontend)
   * `server/` (for the Express backend)
   * `server/config/` (for configuration files)
   * `server/controllers/` (for API controllers)
   * `server/middleware/` (for Express middleware)
   * `server/models/` (for data models)
   * `server/routes/` (for API routes)
   * `server/services/` (for business logic)
   * `server/utils/` (for utility functions)
   * `client/src/components/auth/` (for authentication components)
   * `client/src/components/profile/` (for profile components)
   * `client/src/components/subscription/` (for subscription components)
   * `client/src/components/admin/` (for admin components)
   * `client/src/contexts/` (for React contexts)
   * `client/src/hooks/` (for custom React hooks)
   * `client/src/services/` (for API service modules)
   * `client/src/utils/` (for utility functions)

3. Create placeholder README files in each directory to ensure they're tracked by Git:
   ```bash
   for dir in $(find client server -type d); do
     echo "# $(basename $dir)" > "$dir/README.md"
     echo "This directory contains $(basename $dir) related files." >> "$dir/README.md"
   done
   ```

**Troubleshooting:**
- If directories already exist, you may see warnings. This is normal and can be ignored.
- If you don't have permission to create directories, ensure you have the correct access rights to the project folder.

**Verification/Deliverable(s):** 
- Run `find client server -type d | sort` to verify all directories have been created
- Expected output should include all directories listed in the action steps
- Each directory should contain a README.md file

#### Task 0.2: Initialize Backend Dependencies

**Objective:** Set up the necessary Node.js packages for the backend.

**Rationale:** These dependencies provide the core functionality needed for the backend server, including web framework, authentication, database access, security, and development tools. Each package has been selected for its reliability, community support, and specific functionality needed for this project.

**Prerequisites:** Task 0.1 (Restructure Project for Client-Server Architecture)

**Action(s):**
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```

2. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```

3. Install core dependencies:
   ```bash
   npm install express firebase-admin firebase-functions cors dotenv jsonwebtoken stripe joi helmet morgan
   ```
   
   These packages provide:
   * `express` - Web framework for creating the API
   * `firebase-admin` - Firebase Admin SDK for server-side Firebase operations
   * `firebase-functions` - For creating Firebase Cloud Functions (if deploying to Firebase)
   * `cors` - Middleware for handling Cross-Origin Resource Sharing
   * `dotenv` - For loading environment variables from .env files
   * `jsonwebtoken` - For creating and verifying JWTs
   * `stripe` - Stripe API client for payment processing
   * `joi` - For request validation
   * `helmet` - Security middleware for setting HTTP headers
   * `morgan` - HTTP request logger middleware

4. Install development dependencies:
   ```bash
   npm install --save-dev nodemon jest supertest
   ```
   
   These packages provide:
   * `nodemon` - For automatically restarting the server during development
   * `jest` - Testing framework
   * `supertest` - For API testing

5. Add scripts to package.json:
   ```bash
   npm pkg set scripts.start="node server.js" scripts.dev="nodemon server.js" scripts.test="jest"
   ```

**Troubleshooting:**
- If you encounter permission errors, try running with sudo (Linux/Mac) or as administrator (Windows)
- If packages fail to install, check your Node.js version with `node -v` (should be 14.x or higher)
- If network errors occur, check your internet connection and try again

**Verification/Deliverable(s):** 
- Verify package.json contains all dependencies:
  ```bash
  cat package.json
  ```
- Confirm node_modules directory was created:
  ```bash
  ls -la | grep node_modules
  ```
- Test that express can be imported:
  ```bash
  node -e "require('express')"
  ```
  (No output means success, errors indicate a problem)

#### Task 0.3: Initialize Frontend Dependencies

**Objective:** Set up the necessary React packages for the frontend.

**Rationale:** These dependencies provide the core functionality needed for the frontend application, including UI framework, routing, API communication, form handling, and payment processing. Each package has been selected for its reliability, community support, and specific functionality needed for this project.

**Prerequisites:** Task 0.1 (Restructure Project for Client-Server Architecture)

**Action(s):**
1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```

2. If not already a React project, initialize with Create React App:
   ```bash
   npx create-react-app .
   ```
   
   If it's already a React project, clean up unnecessary files:
   ```bash
   rm -rf src/*
   mkdir -p src/{components,contexts,hooks,services,utils}
   touch src/index.js src/App.js
   ```

3. Install core dependencies:
   ```bash
   npm install firebase react-router-dom axios @stripe/stripe-js @stripe/react-stripe-js formik yup tailwindcss
   ```
   
   These packages provide:
   * `firebase` - Firebase JS SDK for client-side Firebase operations
   * `react-router-dom` - For routing and navigation
   * `axios` - For making HTTP requests to the backend API
   * `@stripe/stripe-js` and `@stripe/react-stripe-js` - For Stripe payment integration
   * `formik` - For form handling
   * `yup` - For form validation
   * `tailwindcss` - For styling (if using Tailwind CSS)

4. Initialize Tailwind CSS (if using):
   ```bash
   npx tailwindcss init
   ```

5. Create basic index.js file:
   ```bash
   cat > src/index.js << 'EOL'
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';
   
   ReactDOM.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
     document.getElementById('root')
   );
   EOL
   ```

6. Create basic App.js file:
   ```bash
   cat > src/App.js << 'EOL'
   import React from 'react';
   
   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <h1>Psychic Application</h1>
           <p>User Management and Session Control</p>
         </header>
       </div>
     );
   }
   
   export default App;
   EOL
   ```

**Troubleshooting:**
- If Create React App fails, ensure you have sufficient disk space and a stable internet connection
- If you see dependency conflicts, try using `--force` with npm install
- For permission issues, check your directory permissions

**Verification/Deliverable(s):** 
- Verify package.json contains all dependencies:
  ```bash
  cat package.json
  ```
- Test that the React app can start:
  ```bash
  npm start
  ```
  (Should open a browser window with the basic app)
- Verify the directory structure:
  ```bash
  find src -type d | sort
  ```

### 2. Firebase & Stripe Setup

#### Task 2.1: Set Up Firebase Project

**Objective:** Create and configure a Firebase project for authentication and database.

**Rationale:** Firebase provides a comprehensive suite of tools for authentication, database, and hosting that will significantly reduce development time and complexity. Using Firebase Auth simplifies the implementation of secure authentication, while Firestore provides a flexible, scalable database for user data.

**Prerequisites:** None (can be done in parallel with Task 0.1, 0.2, and 0.3)

**Action(s):**
1. Go to the Firebase Console (https://console.firebase.google.com/) and sign in with your Google account.

2. Click "Add project" and follow these steps:
   - Enter a project name (e.g., "Psychic-App")
   - Choose whether to enable Google Analytics (recommended)
   - Click "Create project"

3. Once the project is created, enable Authentication:
   - In the Firebase console, click "Authentication" in the left sidebar
   - Click "Get started"
   - In the "Sign-in method" tab, enable the following providers:
     - Email/Password
     - Google
     - Facebook (if required)
   - For each provider, follow the configuration steps provided by Firebase

4. Create a Firestore database:
   - In the Firebase console, click "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a database location closest to your users
   - Click "Enable"

5. Set up security rules for Firestore:
   - In the Firestore Database section, click the "Rules" tab
   - Replace the default rules with the following:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         // Allow authenticated users to read their own data
         match /users/{userId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
         
         // Allow authenticated users to read and write their own readings
         match /readings/{readingId} {
           allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
         }
         
         // Allow authenticated users to read and write their own subscriptions
         match /subscriptions/{subscriptionId} {
           allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
         }
         
         // Admin access rules would be handled server-side
       }
     }
     ```
   - Click "Publish"

6. Generate and download service account credentials:
   - In the Firebase console, click the gear icon (⚙️) next to "Project Overview"
   - Select "Project settings"
   - Go to the "Service accounts" tab
   - Click "Generate new private key"
   - Save the JSON file securely (you'll need this for server-side Firebase access)

**Troubleshooting:**
- If you can't create a project, verify you have the necessary permissions in your Google account
- If authentication providers fail to enable, check that you've completed all required configuration steps
- If Firestore creation fails, try a different region

**Verification/Deliverable(s):** 
- Firebase project is created and accessible in the Firebase console
- Authentication is enabled with all required sign-in methods
- Firestore database is created with security rules in place
- Service account credentials JSON file is downloaded and secured
- Test authentication by creating a test user in the Authentication section

#### Task 2.2: Set Up Stripe Account

[Content continues with similar detailed structure for remaining tasks...]

## Complete File Structure

```
project-root/
├── client/                      # Frontend React application
│   ├── public/                  # Static files
│   └── src/                     # Source code
│       ├── components/          # React components
│       │   ├── admin/           # Admin components
│       │   ├── auth/            # Authentication components
│       │   ├── profile/         # User profile components
│       │   └── subscription/    # Subscription components
│       ├── contexts/            # React contexts
│       ├── hooks/               # Custom React hooks
│       ├── services/            # API service modules
│       └── utils/               # Utility functions
├── server/                      # Backend Express application
│   ├── config/                  # Configuration files
│   ├── controllers/             # API controllers
│   ├── middleware/              # Express middleware
│   ├── models/                  # Data models
│   ├── routes/                  # API routes
│   ├── services/                # Business logic
│   └── utils/                   # Utility functions
```

## Conclusion

This enhanced task list provides a comprehensive guide for implementing the User Management and Session Control system for the Psychic application. Each task includes detailed context, rationale, prerequisites, step-by-step actions, troubleshooting guidance, and verification steps to ensure successful implementation without requiring additional tribal knowledge.
