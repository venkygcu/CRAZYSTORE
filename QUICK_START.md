# 🚀 Quick Start Guide - CrazyShop E-Commerce

## Current Status: ✅ RUNNING

**Application URL**: http://localhost:5001

---

## 🎯 How to Use

### 1️⃣ Access the Application
Open your browser and go to:
```
http://localhost:5001
```

### 2️⃣ First Time Setup
1. You'll be redirected to the login page
2. Click on **"Sign Up"** or **"Create Account"**
3. Fill in:
   - Username
   - Email
   - Password
4. Click **"Sign Up"** button
5. You'll be automatically logged in!

### 3️⃣ Start Shopping
- Browse products on the home page
- Click on categories: Men, Women, Kids
- View product details
- Add items to cart
- Proceed to checkout

---

## 🛑 Stop the Server

To stop the running server:
```powershell
# Find the Node process
Get-Process node | Stop-Process -Force
```

Or press `Ctrl + C` in the terminal where the server is running.

---

## 🔄 Restart the Server

If you need to restart:
```powershell
cd "c:\venky projects\E commerce\crazyshop-ecommerce-store"
npm start
```

The server will start on: http://localhost:5001

---

## 🔧 Development Mode

To run in development mode (with hot reload):
```powershell
cd "c:\venky projects\E commerce\crazyshop-ecommerce-store"
npm run dev
```

This will start:
- Backend server on: http://localhost:5000
- Frontend dev server on: http://localhost:3001

---

## 🏗️ Rebuild Frontend

If you make changes to the frontend code:
```powershell
cd "c:\venky projects\E commerce\crazyshop-ecommerce-store"
npm run build
```

Then restart the server:
```powershell
npm start
```

---

## 📋 Common Commands

### Check if server is running:
```powershell
Invoke-WebRequest -Uri "http://localhost:5001/api/v1/health" -UseBasicParsing
```

Expected response: `{"ok":true}`

### View running Node processes:
```powershell
Get-Process node
```

### Install dependencies:
```powershell
npm install
```

### Run tests:
```powershell
npm test
```

---

## 🔐 Admin Access

To access admin features:
1. Login with email: `gunjivenkatesh072@gmail.com`
2. Navigate to: http://localhost:5001/admin
3. You can:
   - Add new products
   - View customer messages
   - Manage orders

---

## 📁 Important Files

- **Frontend Code**: `src/` directory
- **Backend Code**: `server/src/index.js`
- **Database**: `server/data.db`
- **Environment Variables**: 
  - Frontend: `.env`
  - Backend: `server/.env`
- **Built Frontend**: `build/` directory

---

## 🐛 Quick Troubleshooting

### Problem: Can't access http://localhost:5001
**Solution**: Check if server is running
```powershell
Get-Process node
```
If not running, start it:
```powershell
npm start
```

### Problem: Port already in use
**Solution**: Change port in `server/.env`
```env
PORT=5002
```

### Problem: Login not working
**Solution**: Check browser console for errors. Make sure:
- Server is running
- Database file exists: `server/data.db`

### Problem: Products not showing
**Solution**: 
- Check if REACT_APP_ENABLE_MOCK_DATA is set in `.env`
- Or add products via admin panel

---

## 📞 Need Help?

1. Check `PROJECT_STATUS.md` for detailed documentation
2. Review server logs in the terminal
3. Check browser DevTools console for frontend errors
4. Verify API responses in Network tab

---

## ✅ Verification Checklist

- [x] Dependencies installed
- [x] Frontend built successfully
- [x] Backend server running on port 5001
- [x] Database initialized
- [x] API health check passing
- [x] Application accessible at http://localhost:5001

---

## 🎉 You're All Set!

Your e-commerce store is ready to use. Start by creating an account and exploring the features!

**Happy Shopping! 🛍️**