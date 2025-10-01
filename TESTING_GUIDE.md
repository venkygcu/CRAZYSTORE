# 🧪 CrazyShop E-Commerce Store - Testing Guide

## Overview
This guide provides comprehensive testing instructions for the CrazyShop E-Commerce Store application.

---

## 🚀 Pre-Testing Setup

### 1. Start the Application

**Option A: Production Mode**
```bash
npm start
```
Access at: http://localhost:5001

**Option B: Development Mode**
```bash
npm run dev
```
Access at: http://localhost:3001 (Frontend) and http://localhost:5000 (Backend)

### 2. Verify Server Health
```bash
curl http://localhost:5001/api/v1/health
```
Expected response: `{"ok":true}`

---

## 🧪 Manual Testing Checklist

### 1. Authentication Testing

#### Test Case 1.1: User Registration
**Steps:**
1. Navigate to http://localhost:5001/login
2. Click "Signup" tab
3. Enter:
   - Name: Test User
   - Email: testuser@example.com
   - Password: Test123!
4. Click "Signup" button

**Expected Result:**
- ✅ Success message appears
- ✅ Redirected to home page
- ✅ User is logged in
- ✅ Navbar shows "Logout" button

#### Test Case 1.2: User Login
**Steps:**
1. Logout if logged in
2. Navigate to /login
3. Enter:
   - Email: testuser@example.com
   - Password: Test123!
4. Click "Login" button

**Expected Result:**
- ✅ Success message appears
- ✅ Redirected to home page
- ✅ User is logged in

#### Test Case 1.3: Invalid Login
**Steps:**
1. Navigate to /login
2. Enter incorrect credentials
3. Click "Login"

**Expected Result:**
- ✅ Error message: "Invalid credentials"
- ✅ User remains on login page

#### Test Case 1.4: Protected Routes
**Steps:**
1. Logout
2. Try to access /cart directly

**Expected Result:**
- ✅ Redirected to /login
- ✅ After login, redirected back to /cart

---

### 2. Product Browsing Testing

#### Test Case 2.1: Home Page
**Steps:**
1. Navigate to home page (/)

**Expected Result:**
- ✅ Hero section displays
- ✅ Popular products section shows
- ✅ Offers section displays
- ✅ New collections section shows
- ✅ Newsletter section displays

#### Test Case 2.2: Category Browsing
**Steps:**
1. Click "Men" in navbar
2. Verify products display
3. Click "Women" in navbar
4. Verify products display
5. Click "Kids" in navbar
6. Verify products display

**Expected Result:**
- ✅ Each category shows relevant products
- ✅ Banner image displays for each category
- ✅ Product count is accurate

#### Test Case 2.3: Product Sorting
**Steps:**
1. Navigate to /mens
2. Click sort dropdown
3. Select "Price: Low to High"
4. Verify products are sorted correctly
5. Select "Price: High to Low"
6. Verify products are sorted correctly

**Expected Result:**
- ✅ Products sort correctly by price
- ✅ Products sort correctly by name

#### Test Case 2.4: Product Search
**Steps:**
1. Navigate to /products
2. Enter search term in search box
3. Verify filtered results

**Expected Result:**
- ✅ Products filter based on search term
- ✅ Result count updates
- ✅ No results message if no matches

---

### 3. Product Details Testing

#### Test Case 3.1: View Product Details
**Steps:**
1. Click on any product
2. Verify product details page

**Expected Result:**
- ✅ Product image displays
- ✅ Product name displays
- ✅ Price information shows (old and new price)
- ✅ Star rating displays
- ✅ Size selection available
- ✅ "Add to Cart" button visible
- ✅ Breadcrumb navigation shows
- ✅ Description section displays
- ✅ Related products show

---

### 4. Shopping Cart Testing

#### Test Case 4.1: Add to Cart
**Steps:**
1. Navigate to a product
2. Click "ADD TO CART" button
3. Check cart icon in navbar

**Expected Result:**
- ✅ Cart count increases
- ✅ Product added to cart

#### Test Case 4.2: View Cart
**Steps:**
1. Add items to cart
2. Click cart icon in navbar

**Expected Result:**
- ✅ All cart items display
- ✅ Product images show
- ✅ Quantities are correct
- ✅ Prices display correctly
- ✅ Subtotal calculates correctly
- ✅ Total calculates correctly

#### Test Case 4.3: Remove from Cart
**Steps:**
1. In cart page, click remove icon (X)

**Expected Result:**
- ✅ Item removed from cart
- ✅ Cart count decreases
- ✅ Total updates

#### Test Case 4.4: Empty Cart
**Steps:**
1. Remove all items from cart

**Expected Result:**
- ✅ Cart shows as empty
- ✅ Cart count shows 0

---

### 5. Checkout Testing

#### Test Case 5.1: Proceed to Checkout
**Steps:**
1. Add items to cart
2. Click "PROCEED TO CHECKOUT"

**Expected Result:**
- ✅ Redirected to /checkout
- ✅ Total amount displays correctly
- ✅ Payment options display

#### Test Case 5.2: Bank Transfer Option
**Steps:**
1. On checkout page, view bank transfer section

**Expected Result:**
- ✅ Bank details display
- ✅ Account number visible
- ✅ IFSC code visible
- ✅ Copy buttons work

#### Test Case 5.3: UPI Payment Option
**Steps:**
1. On checkout page, view UPI section
2. Click "Pay via UPI App"

**Expected Result:**
- ✅ UPI ID displays
- ✅ Amount shows correctly
- ✅ UPI link opens (if UPI app installed)

#### Test Case 5.4: Razorpay Payment
**Steps:**
1. On checkout page, click "Pay Now" in Razorpay section

**Expected Result:**
- ✅ Razorpay modal opens
- ✅ Amount is correct
- ✅ Payment options display

**Note:** Requires valid Razorpay credentials in environment variables.

---

### 6. Contact Form Testing

#### Test Case 6.1: Submit Contact Form
**Steps:**
1. Navigate to /contact
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Message: Test message
3. Click "Send Message"

**Expected Result:**
- ✅ Success message appears
- ✅ Form clears after submission
- ✅ Message saved to database

#### Test Case 6.2: Contact Form Validation
**Steps:**
1. Navigate to /contact
2. Try to submit empty form

**Expected Result:**
- ✅ Validation errors show
- ✅ Form doesn't submit

---

### 7. Admin Panel Testing

#### Test Case 7.1: Admin Access
**Steps:**
1. Login with admin email: gunjivenkatesh072@gmail.com
2. Navigate to /admin

**Expected Result:**
- ✅ Admin panel displays
- ✅ "Add Product" form visible
- ✅ "Contact Messages" section visible

#### Test Case 7.2: Add Product
**Steps:**
1. In admin panel, fill product form:
   - Name: Test Product
   - Category: Men
   - Image URL: (valid image URL)
   - Price: 999
   - Old Price: 1499
2. Click "Add Product"

**Expected Result:**
- ✅ Success message appears
- ✅ Form clears
- ✅ Product added to database

#### Test Case 7.3: View Messages
**Steps:**
1. In admin panel, scroll to messages section

**Expected Result:**
- ✅ All contact messages display
- ✅ Message details show (name, email, message, date)

#### Test Case 7.4: Non-Admin Access
**Steps:**
1. Login with non-admin email
2. Try to access /admin

**Expected Result:**
- ✅ "Unauthorized" message displays
- ✅ Admin features not accessible

---

### 8. Navigation Testing

#### Test Case 8.1: Navbar Links
**Steps:**
1. Click each navbar link
2. Verify navigation

**Expected Result:**
- ✅ All links work correctly
- ✅ Active menu item highlighted
- ✅ Cart icon always visible

#### Test Case 8.2: Footer Links
**Steps:**
1. Scroll to footer
2. Click each footer link

**Expected Result:**
- ✅ All links work correctly
- ✅ Social media links open in new tab

#### Test Case 8.3: Breadcrumb Navigation
**Steps:**
1. Navigate to a product
2. Check breadcrumb trail

**Expected Result:**
- ✅ Breadcrumb shows correct path
- ✅ HOME → SHOP BY CATEGORY → Category → Product

---

### 9. Mobile Responsiveness Testing

#### Test Case 9.1: Mobile Menu
**Steps:**
1. Resize browser to mobile width (< 768px)
2. Click hamburger menu icon

**Expected Result:**
- ✅ Mobile menu opens
- ✅ All menu items visible
- ✅ Menu closes when item clicked

#### Test Case 9.2: Mobile Layout
**Steps:**
1. View site on mobile device or mobile viewport

**Expected Result:**
- ✅ All pages responsive
- ✅ Images scale correctly
- ✅ Text readable
- ✅ Buttons touch-friendly

---

### 10. Error Handling Testing

#### Test Case 10.1: Network Error
**Steps:**
1. Stop the backend server
2. Try to login

**Expected Result:**
- ✅ Error message displays
- ✅ App doesn't crash

#### Test Case 10.2: Invalid Product ID
**Steps:**
1. Navigate to /product/99999

**Expected Result:**
- ✅ "Product not found" message displays
- ✅ App doesn't crash

---

## 🔍 API Testing

### Using cURL

#### Test Health Endpoint
```bash
curl http://localhost:5001/api/v1/health
```

#### Test Signup
```bash
curl -X POST http://localhost:5001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123!"}'
```

#### Test Login
```bash
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

#### Test Get Products
```bash
curl http://localhost:5001/api/v1/products
```

#### Test Contact Form
```bash
curl -X POST http://localhost:5001/api/v1/support/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Port Already in Use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Or change port in server/.env
PORT=5002
```

### Issue 2: Database Locked
**Solution:**
```bash
# Delete and recreate database
rm server/data.db
# Restart server (will recreate tables)
npm start
```

### Issue 3: Build Fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules build
npm install
npm run build
```

### Issue 4: CORS Errors
**Solution:**
- Ensure backend is running
- Check REACT_APP_API_BASE_URL in .env
- Verify CORS is enabled in server

---

## ✅ Testing Checklist Summary

### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Invalid credentials handled
- [ ] Protected routes work
- [ ] Logout works

### Products
- [ ] Home page displays correctly
- [ ] Category filtering works
- [ ] Product sorting works
- [ ] Product search works
- [ ] Product details display

### Shopping Cart
- [ ] Add to cart works
- [ ] Remove from cart works
- [ ] Cart count updates
- [ ] Cart totals calculate correctly

### Checkout
- [ ] Checkout page displays
- [ ] Payment options visible
- [ ] Bank transfer info correct
- [ ] UPI payment works
- [ ] Razorpay integration works

### Admin
- [ ] Admin login works
- [ ] Add product works
- [ ] View messages works
- [ ] Non-admin access blocked

### UI/UX
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Footer links work
- [ ] Forms validate
- [ ] Error messages display

---

## 📊 Performance Testing

### Load Time Testing
1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check:
   - ✅ Page load < 3 seconds
   - ✅ API calls < 1 second
   - ✅ Images optimized

### Browser Compatibility
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 🎯 Acceptance Criteria

### Must Pass:
- ✅ All authentication flows work
- ✅ Products display correctly
- ✅ Cart functionality works
- ✅ Checkout process completes
- ✅ Admin panel accessible
- ✅ Mobile responsive
- ✅ No console errors
- ✅ API endpoints respond

### Nice to Have:
- ✅ Fast load times
- ✅ Smooth animations
- ✅ Intuitive UX
- ✅ Helpful error messages

---

## 📝 Test Report Template

```
Test Date: ___________
Tester: ___________
Environment: [ ] Development [ ] Production

Results:
- Authentication: [ ] Pass [ ] Fail
- Products: [ ] Pass [ ] Fail
- Cart: [ ] Pass [ ] Fail
- Checkout: [ ] Pass [ ] Fail
- Admin: [ ] Pass [ ] Fail
- Mobile: [ ] Pass [ ] Fail

Issues Found:
1. ___________
2. ___________

Overall Status: [ ] Pass [ ] Fail
```

---

**Happy Testing! 🧪**