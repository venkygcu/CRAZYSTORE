# 🛍️ CrazyShop E-Commerce Store

A full-stack e-commerce application built with React, Node.js, Express, and SQLite. Features include user authentication, shopping cart, payment integration, and admin panel.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-green)

## 🌟 Features

### User Features
- 🔐 **Authentication** - Secure signup/login with JWT
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 🔍 **Product Search** - Search and filter products by category
- 💳 **Multiple Payment Options** - Bank transfer, UPI, Razorpay
- 📱 **Responsive Design** - Mobile-optimized interface
- 📧 **Contact Support** - Direct communication with support team

### Admin Features
- 👨‍💼 **Admin Panel** - Restricted access for administrators
- ➕ **Product Management** - Add new products
- 📬 **Message Management** - View customer inquiries

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/venkygcu/CRAZYSHOP-ECOMMERCE-STORES.git
cd crazyshop-ecommerce-store
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env` in the root directory:
```env
REACT_APP_ENV=development
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_VERSION=v1
REACT_APP_ENABLE_MOCK_DATA=false
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

Create `server/.env`:
```env
PORT=5001
JWT_SECRET=your_strong_jwt_secret_here
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Running the Application

#### Development Mode
```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run dev:server  # Backend on port 5000
npm run dev:client  # Frontend on port 3001
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

The application will be available at:
- **Production**: http://localhost:5001
- **Development Frontend**: http://localhost:3001
- **Development Backend**: http://localhost:5000

## 📁 Project Structure

```
crazyshop-ecommerce-store/
├── src/                      # React frontend
│   ├── Components/           # Reusable components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── CartItems/
│   │   └── ...
│   ├── Pages/               # Page components
│   │   ├── Shop.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── LoginSignup.jsx
│   │   ├── Admin.jsx
│   │   └── ...
│   ├── Context/             # React Context
│   │   └── ShopContext.jsx
│   ├── api/                 # API client
│   │   └── client.js
│   └── App.js               # Main app component
├── server/                  # Backend Express server
│   └── src/
│       └── index.js         # Server entry point
├── public/                  # Static assets
├── build/                   # Production build
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user

### Products
- `GET /api/v1/products` - Get all products
- `POST /api/v1/products` - Add product (Admin only)

### Support
- `POST /api/v1/support/contact` - Submit contact message
- `GET /api/v1/support/messages` - Get messages (Admin only)

### Payment
- `POST /api/v1/payment/create-order` - Create Razorpay order

### Health
- `GET /api/v1/health` - Server health check

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  new_price REAL NOT NULL,
  old_price REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  amount REAL NOT NULL,
  currency TEXT NOT NULL,
  status TEXT DEFAULT 'created',
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🛠️ Technology Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** v6 - Routing
- **Axios** - HTTP client
- **Razorpay** - Payment integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Razorpay** - Payment gateway

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication (7-day expiry)
- ✅ Protected routes requiring authentication
- ✅ Admin role-based access control
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention (parameterized queries)

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first CSS approach
- Hamburger menu for mobile navigation
- Touch-friendly interface
- Optimized images and assets

## 🌐 Deployment

### GitHub Pages
```bash
npm run build:github
npm run deploy
```

### Vercel / Netlify / Render
The project includes configuration files for easy deployment:
- `vercel.json`
- `netlify.toml`
- `render.yaml`

### Docker
```bash
docker-compose up
```

## 📝 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Run development mode (frontend + backend)
- `npm run dev:server` - Run backend only
- `npm run dev:client` - Run frontend only
- `npm run build` - Build for production
- `npm run build:github` - Build for GitHub Pages
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

## 👨‍💼 Admin Access

Admin panel is restricted to:
- **Email**: gunjivenkatesh072@gmail.com

To access admin features:
1. Login with the admin email
2. Navigate to `/admin`
3. Add products and view customer messages

## 📞 Support

For issues or questions:
- **Email**: gunjivenkatesh072@gmail.com
- **Phone**: 9986573492

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Payment processing by [Razorpay](https://razorpay.com/)

## 📚 Additional Documentation

- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Detailed project status
- [COMPLETION_REPORT.md](./COMPLETION_REPORT.md) - Completion report
- [QUICK_START.md](./QUICK_START.md) - Quick start guide

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: January 2025
