Component & Multi-Component Generator Platform

A full-stack web application that generates React components using AI (Google Gemini) with live preview, session management, and real-time collaboration features.

 Live Demo

- **Frontend:** [https://acciojob-nine.vercel.app](https://acciojob-nine.vercel.app)
- **Backend:** [https://acciojob-i0xu.onrender.com](https://acciojob-i0xu.onrender.com)

Features

 Core Features
- AI-Powered Component Generation** - Generate React components using Google Gemini AI
- Live Preview - Real-time rendering of generated components
- Session Management - Save, load, and manage your component generation sessions
- Auto-Save - Automatic saving of chat history and generated code
- Code Export - Download generated JSX and CSS files
- User Authentication - Secure registration and login system

 Bonus Features
- Code Templates - Pre-defined prompts for common components
- Image Upload - Ready for Gemini Vision integration
- Collaboration Panel - Share session URLs with others
- Property Editor - Interactive component property editing
- Session Manager - Full CRUD operations on sessions

Tech Stack

Frontend
- React 18 - UI framework
- Vite - Build tool and dev server
- Zustand - State management
- React Router DOM - Client-side routing
- CSS3 - Styling

Backend
- Node.js - Runtime environment
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- JWT - Authentication
- bcryptjs - Password hashing
- Google Gemini AI - AI component generation

Deployment
- Vercel - Frontend hosting
- Render - Backend hosting
- MongoDB Atlas - Cloud database

Project Structure

```
 ACCIOJOB/
├── .git/                          # Git version control
├── .gitignore                     # Git ignore rules
├── ACCIOJOB.git/                  # Git repository
├── README.md                      # Main project documentation
├── API_DOCUMENTATION.md           # API reference documentation
├── DEPLOYMENT_GUIDE.md            # Deployment instructions
├── PROJECT_SUMMARY.md             # Project summary and achievements
│
├── frontend/                      # React frontend application
│   ├── .gitignore                 # Frontend git ignore
│   ├── README.md                  # Frontend readme
│   ├── eslint.config.js           # ESLint configuration
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Frontend dependencies
│   ├── package-lock.json          # Locked dependencies
│   ├── vite.config.js             # Vite build configuration
│   ├── node_modules/              # Installed packages
│   │
│   ├── public/                    # Static assets
│   │   └── vite.svg              # Vite logo
│   │
│   └── src/                       # Source code
│       ├── App.css                # Main app styles
│       ├── App.jsx                # Main app component
│       ├── index.css              # Global styles
│       ├── main.jsx               # React entry point
│       │
│       ├── assets/                # Static assets
│       │   └── react.svg         # React logo
│       │
│       ├── components/            # React components
│       │   ├── ChatPanel.jsx      # Chat interface component
│       │   ├── CodePreview.jsx    # Code display component
│       │   ├── CodeTemplates.jsx  # Code template component
│       │   ├── CollaborationPanel.jsx # Collaboration features
│       │   ├── ComponentSandbox.jsx   # Safe component rendering
│       │   ├── ImageUpload.jsx    # Image upload component
│       │   ├── LivePreview.jsx    # Live component preview
│       │   ├── Navbar.jsx         # Navigation component
│       │   ├── PropertyEditor.jsx # Component property editor
│       │   ├── ProtectedRoute.jsx # Route protection component
│       │   └── SessionManager.jsx # Session management component
│       │
│       ├── hooks/                 # Custom React hooks
│       │   ├── useAutoSave.js     # Auto-save functionality hook
│       │   └── useSession.js      # Session management hook
│       │
│       ├── pages/                 # Page components
│       │   ├── ChatPage.jsx       # Main chat page
│       │   ├── Login.jsx          # Login page
│       │   ├── Profile.jsx        # User profile page
│       │   └── Register.jsx       # Registration page
│       │
│       ├── services/              # API services
│       │   ├── api.js             # Main API service
│       │   ├── chatService.js     # Chat API service
│       │   └── sessionService.js  # Session API service
│       │
│       ├── store/                 # State management
│       │   ├── useChatStore.js    # Chat state store
│       │   └── useStore.js        # Main application store
│       │
│       └── utils/                 # Utility functions
│           ├── auth.js            # Authentication utilities
│           ├── codeUtils.js       # Code formatting utilities
│           └── config.js          # Configuration utilities
│
└── backend/                       # Node.js backend application
    ├── .gitignore                 # Backend git ignore
    ├── index.js                   # Server entry point
    ├── package.json               # Backend dependencies
    ├── package-lock.json          # Locked dependencies
    ├── node_modules/              # Installed packages
    │
    ├── config/                    # Configuration files
    │   └── db.js                  # Database configuration
    │
    ├── controllers/               # Route controllers
    │   ├── authController.js      # Authentication controller
    │   └── sessionController.js   # Session management controller
    │
    ├── middlewares/               # Express middlewares
    │   └── authMiddleware.js      # JWT authentication middleware
    │
    ├── models/                    # Database models
    │   ├── Session.js             # Session data model
    │   └── User.js                # User data model
    │
    └── routes/                    # API routes
        ├── auth.js                # Authentication routes
        ├── chat.js                # Chat and AI routes
        └── sessions.js            # Session management routes
```

 Quick Start

 Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key

 Frontend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ADHITHYAAMARAGONDA/Acciojob.git
   cd ACCIOJOB/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment file
   ```bash
   # Create .env file in frontend directory
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start development server**
   ```bash
   npm run dev
   ```

 Backend Setup

1. Navigate to backend directory
   ```bash
   cd ../backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment file
   ```bash
   # Create .env file in backend directory
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   NODE_ENV=development
   ```

4. Start development server
   ```bash
   npm run dev
   ```

 Environment Variables

 Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
PORT=5000
```

API Documentation

Authentication Endpoints
 
POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

 GET `/api/auth/profile`
Get user profile (requires authentication)

Chat Endpoints

POST `/api/chat`
Send message to AI for component generation
```json
{
  "message": "Create a modern button component with hover effects",
  "sessionId": "optional_session_id"
}
```

Session Endpoints

GET `/api/sessions`
Get all user sessions (requires authentication)

GET `/api/sessions/:id`
Get specific session (requires authentication)

POST `/api/sessions`
Create new session (requires authentication)
```json
{
  "title": "My Component Session"
}
```

PUT `/api/sessions/:id`
Update session (requires authentication)
```json
{
  "chatHistory": [...],
  "generatedCode": {
    "jsx": "...",
    "css": "..."
  },
  "title": "Updated Title"
}
```

DELETE `/api/sessions/:id`
Delete session (requires authentication)

Security Features

- JWT Authentication - Secure token-based authentication
- Password Hashing - bcryptjs for password security
- CORS Protection - Configured for production domains
- Rate Limiting - API rate limiting for chat endpoints
- Environment Variables - Secure configuration management

UI/UX Features

- Responsive Design - Works on desktop and mobile
- Real-time Preview - Live component rendering
- Auto-save - Automatic session persistence
- Code Templates - Quick start with pre-defined prompts
- Session Management - Organize your component work
- Export Functionality - Download generated code

Future Scope : 
Interactive drag-and-drop property editor with real-time JSX/CSS updates

Chat-driven style overrides for targeted UI element customization

OAuth social logins for simplified user access

Collaborative multi-user sessions with real-time syncing

Support for exporting components as npm packages or Storybook stories

Multi-framework support beyond React (Vue, Angular)

Automated testing and CI/CD pipelines for generated code

Enhanced UI accessibility and responsive design improvements

Conclusion :
This platform showcases a sophisticated, AI-augmented UI development experience combining conversational prompts, live previews, and code export capabilities. It highlights best practices in secure authentication, stateful frontend and backend integration, and the use of modern web technologies. The modular architecture supports extensibility, making it a powerful tool for rapid React component creation and iterative refinement.

THE BELOW IMAGES ARE SCREENSHORTS OF THE WORKING APP:

1)Register/Login :

<img width="649" height="514" alt="Screenshot 2025-07-29 001526" src="https://github.com/user-attachments/assets/c77dd30f-b890-46be-abaf-c94841bc3a9b" />

2)Profile : 

<img width="356" height="334" alt="Screenshot 2025-07-29 003149" src="https://github.com/user-attachments/assets/397378a6-8ce2-4fc6-9449-34c8890ba580" />

3)chat : 

<img width="1918" height="843" alt="Screenshot 2025-07-29 003238" src="https://github.com/user-attachments/assets/a6bfb58e-d91c-4452-833c-e897ed61c81e" /> 

->Sessions : 

<img width="588" height="272" alt="Screenshot 2025-07-29 001609" src="https://github.com/user-attachments/assets/029a8658-68ab-4f13-b2e5-27c5a8909b98" /> 

-> Colloboration : 

<img width="613" height="280" alt="Screenshot 2025-07-29 001614" src="https://github.com/user-attachments/assets/8d4fdf8f-66bf-4e52-ad82-624c8e52f669" />

->Show Templates : 

<img width="1191" height="626" alt="Screenshot 2025-07-29 001630" src="https://github.com/user-attachments/assets/a81d0d9d-62e3-496b-adb9-66d42c43c641" />

->Live Preview : 

<img width="519" height="406" alt="Screenshot 2025-07-29 001636" src="https://github.com/user-attachments/assets/f27c6784-c068-44f4-929e-3d16e2615716" />

->Code copy : 

<img width="519" height="406" alt="Screenshot 2025-07-29 001636" src="https://github.com/user-attachments/assets/ae4166bd-5e3a-43db-92b6-a4c8d11814b4" />

















