# CrazyShop E-Commerce Store Repository Guide

## Overview
- **Project Name**: CrazyShop E-Commerce Store
- **Tech Stack**: React (frontend), Node.js/Express (backend), SQLite (database)
- **Purpose**: Full-stack e-commerce application with user, admin, and payment features.

## Directory Structure
- **src/**: React application source code
  - **Components/**: Reusable UI components
  - **Pages/**: Route-level pages
  - **Context/**: Global context providers
  - **api/**: API client utilities
  - **App.js**: Application entry routing
- **server/**: Express backend
  - **src/index.js**: Main server application
  - **data.db**: SQLite database file
- **public/**: Static assets served by React
- **build/**: Production build output
- **.github/**: CI/CD workflows
- **docs** (various .md files): Documentation for deployment, testing, and project status

## Scripts
- **npm run dev**: Start frontend & backend concurrently
- **npm run dev:client**: Start React development server
- **npm run dev:server**: Start Express server with nodemon
- **npm run build**: Build production React assets
- **npm start**: Serve production build & API

## Environment Variables
### Frontend (.env)
```
REACT_APP_ENV=development
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_VERSION=v1
REACT_APP_ENABLE_MOCK_DATA=false
REACT_APP_RAZORPAY_KEY_ID=<replace_with_real_key>
```
### Backend (server/.env)
```
PORT=5001
JWT_SECRET=<replace_with_secure_secret>
RAZORPAY_KEY_ID=<replace_with_real_key>
RAZORPAY_KEY_SECRET=<replace_with_real_secret>
```

## Key Features
- **Authentication**: JWT-based login/signup
- **Product Management**: Category filters, search, pagination
- **Cart & Checkout**: Persistent cart, multiple payment methods
- **Payments**: Razorpay integration
- **Admin Panel**: Restricted product and message management
- **Contact Support**: Message submission and admin viewing
- **Responsive UI**: Mobile-first styling and components

## Coding Standards
- **Components**: Functional components with hooks
- **Styling**: CSS modules per component, global resets for mobile
- **State Management**: React Context for cart and user data
- **API Calls**: Centralized Axios client with interceptors
- **Backend**: Express routes with async/await, error handling, and input validation

## Testing & Quality
- **Testing**: Manual test checklist documented in TESTING_GUIDE.md
- **Linting**: Follow ES6+ conventions, consistent naming
- **Error Handling**: Frontend and backend include user-friendly messaging
- **Security**: Password hashing, JWT tokens, parameterized queries

## Deployment
- **Supported Platforms**: GitHub Pages, Vercel, Netlify, Render, Docker
- **Configs**: vercel.json, netlify.toml, render.yaml, Dockerfile, docker-compose.yml, nginx.conf

## Notes
- Update environment variables before production deployment
- Ensure Razorpay credentials and JWT secrets are secure
- Review COMPLETION_REPORT.md for latest project status