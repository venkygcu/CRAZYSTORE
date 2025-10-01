# 🚀 CrazyShop E-Commerce Store - Deployment Guide

Complete guide for deploying the CrazyShop E-Commerce Store to various platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed to Git
- [ ] Environment variables are configured
- [ ] Application builds successfully (`npm run build`)
- [ ] All tests pass
- [ ] Database is set up (if using external DB)
- [ ] Payment gateway credentials are valid
- [ ] Security settings are production-ready

---

## 🌐 Deployment Options

### 1. GitHub Pages (Frontend Only - Static)

**Best for:** Static demo, portfolio showcase

#### Steps:

1. **Update package.json homepage**
```json
"homepage": "https://yourusername.github.io/repository-name/"
```

2. **Build and deploy**
```bash
npm run build:github
npm run deploy
```

3. **Configure GitHub Pages**
- Go to repository Settings → Pages
- Source: gh-pages branch
- Save

**Note:** GitHub Pages only hosts static files. Backend API won't work. Use mock data mode:
```env
REACT_APP_ENABLE_MOCK_DATA=true
```

---

### 2. Vercel (Full-Stack)

**Best for:** Quick deployment, automatic CI/CD

#### Steps:

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Configure Environment Variables**
In Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env` and `server/.env`

5. **Production Deployment**
```bash
vercel --prod
```

#### Vercel Configuration (vercel.json)
Already included in project:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/src/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/src/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/build/$1"
    }
  ]
}
```

---

### 3. Netlify (Frontend + Serverless Functions)

**Best for:** JAMstack deployment, serverless backend

#### Steps:

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**
```bash
netlify login
```

3. **Initialize**
```bash
netlify init
```

4. **Deploy**
```bash
netlify deploy --prod
```

5. **Configure Environment Variables**
In Netlify Dashboard:
- Site Settings → Build & Deploy → Environment
- Add all environment variables

#### Netlify Configuration (netlify.toml)
Already included in project:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 4. Render (Full-Stack)

**Best for:** Full-stack apps with database, free tier available

#### Steps:

1. **Create Render Account**
- Go to https://render.com
- Sign up with GitHub

2. **Create Web Service**
- New → Web Service
- Connect your repository
- Configure:
  - Name: crazyshop-ecommerce
  - Environment: Node
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`

3. **Add Environment Variables**
In Render Dashboard:
- Environment → Add Environment Variable
- Add all variables from `.env` and `server/.env`

4. **Add Persistent Disk (Optional)**
For SQLite database:
- Add Disk
- Mount Path: `/opt/render/project/src/server`
- Size: 1GB

5. **Deploy**
- Click "Create Web Service"
- Render will automatically deploy

#### Render Configuration (render.yaml)
Already included in project:
```yaml
services:
  - type: web
    name: crazyshop-ecommerce
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5001
```

---

### 5. Heroku (Full-Stack)

**Best for:** Traditional PaaS deployment

#### Steps:

1. **Install Heroku CLI**
```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create crazyshop-ecommerce
```

4. **Add Buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

5. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_secret_here
heroku config:set RAZORPAY_KEY_ID=your_key_here
heroku config:set RAZORPAY_KEY_SECRET=your_secret_here
```

6. **Deploy**
```bash
git push heroku main
```

7. **Open App**
```bash
heroku open
```

#### Procfile
Create `Procfile` in root:
```
web: npm start
```

---

### 6. Docker Deployment

**Best for:** Containerized deployment, any cloud provider

#### Steps:

1. **Build Docker Image**
```bash
docker build -t crazyshop-ecommerce .
```

2. **Run Container**
```bash
docker run -p 5001:5001 \
  -e JWT_SECRET=your_secret \
  -e RAZORPAY_KEY_ID=your_key \
  -e RAZORPAY_KEY_SECRET=your_secret \
  crazyshop-ecommerce
```

3. **Using Docker Compose**
```bash
docker-compose up -d
```

#### Dockerfile
Already included in project:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]
```

#### docker-compose.yml
Already included in project:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5001:5001"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - RAZORPAY_KEY_ID=${RAZORPAY_KEY_ID}
      - RAZORPAY_KEY_SECRET=${RAZORPAY_KEY_SECRET}
    volumes:
      - ./server/data.db:/app/server/data.db
```

---

### 7. AWS (EC2 + S3)

**Best for:** Enterprise deployment, full control

#### Steps:

1. **Launch EC2 Instance**
- Ubuntu Server 22.04 LTS
- t2.micro (free tier)
- Security Group: Allow ports 22, 80, 443, 5001

2. **Connect to EC2**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone Repository**
```bash
git clone https://github.com/yourusername/crazyshop-ecommerce-store.git
cd crazyshop-ecommerce-store
```

5. **Install Dependencies**
```bash
npm install
```

6. **Configure Environment**
```bash
nano .env
nano server/.env
```

7. **Build Application**
```bash
npm run build
```

8. **Install PM2**
```bash
sudo npm install -g pm2
```

9. **Start Application**
```bash
pm2 start npm --name "crazyshop" -- start
pm2 save
pm2 startup
```

10. **Configure Nginx (Optional)**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/crazyshop
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

11. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/crazyshop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔐 Environment Variables for Production

### Frontend (.env)
```env
REACT_APP_ENV=production
REACT_APP_API_BASE_URL=https://your-domain.com/api
REACT_APP_API_VERSION=v1
REACT_APP_ENABLE_MOCK_DATA=false
REACT_APP_RAZORPAY_KEY_ID=rzp_live_your_key_id
REACT_APP_INSTAGRAM_URL=https://instagram.com/yourprofile
REACT_APP_WHATSAPP_NUMBER=919986573492
```

### Backend (server/.env)
```env
NODE_ENV=production
PORT=5001
JWT_SECRET=your_very_strong_random_secret_here_min_32_chars
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
DB_PATH=/path/to/persistent/data.db
```

---

## 🗄️ Database Options

### Option 1: SQLite (Default)
- **Pros**: Simple, no setup required
- **Cons**: Not suitable for high traffic
- **Use for**: Development, small deployments

### Option 2: PostgreSQL
**Recommended for production**

1. **Install pg package**
```bash
npm install pg
```

2. **Update server code** to use PostgreSQL instead of SQLite

3. **Use managed service**:
- Heroku Postgres
- AWS RDS
- DigitalOcean Managed Databases
- Supabase

### Option 3: MySQL
Similar to PostgreSQL, use managed service:
- AWS RDS
- Google Cloud SQL
- PlanetScale

---

## 🔒 Security Checklist for Production

### Environment Variables
- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] Production Razorpay credentials
- [ ] No sensitive data in code
- [ ] .env files in .gitignore

### CORS Configuration
Update server/src/index.js:
```javascript
app.use(cors({
  origin: ['https://your-domain.com'],
  credentials: true,
}));
```

### HTTPS
- [ ] SSL certificate installed
- [ ] Force HTTPS redirect
- [ ] Secure cookies

### Database
- [ ] Regular backups
- [ ] Parameterized queries (already implemented)
- [ ] Access controls

### API Security
- [ ] Rate limiting
- [ ] Input validation
- [ ] Error handling (no sensitive info in errors)

---

## 📊 Monitoring & Logging

### Option 1: PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Option 2: Cloud Monitoring
- **Vercel**: Built-in analytics
- **Netlify**: Built-in analytics
- **Render**: Metrics dashboard
- **AWS**: CloudWatch

### Option 3: Third-Party Services
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring

---

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test
      # Add deployment steps here
```

---

## 🧪 Post-Deployment Testing

After deployment, test:

1. **Health Check**
```bash
curl https://your-domain.com/api/v1/health
```

2. **User Registration**
- Create test account
- Verify email/password validation

3. **Product Browsing**
- Check all categories
- Test search and filters

4. **Shopping Cart**
- Add items
- Remove items
- Check totals

5. **Payment**
- Test payment flow
- Verify Razorpay integration

6. **Admin Panel**
- Login as admin
- Add test product
- View messages

---

## 🐛 Troubleshooting

### Issue: Build Fails
```bash
# Clear cache
rm -rf node_modules build
npm install
npm run build
```

### Issue: API Not Responding
- Check server logs
- Verify environment variables
- Check CORS settings
- Verify database connection

### Issue: Payment Not Working
- Verify Razorpay credentials
- Check API keys (test vs live)
- Check webhook configuration

### Issue: Database Errors
- Check database path
- Verify write permissions
- Check disk space

---

## 📞 Support

For deployment issues:
- **Email**: gunjivenkatesh072@gmail.com
- **Phone**: 9986573492

---

## 🎉 Deployment Checklist

- [ ] Code committed to Git
- [ ] Environment variables configured
- [ ] Build successful
- [ ] Tests passing
- [ ] Database set up
- [ ] Payment gateway configured
- [ ] Domain configured (if applicable)
- [ ] SSL certificate installed
- [ ] CORS configured
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Post-deployment testing complete

---

**Your application is ready for production! 🚀**