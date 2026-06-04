# Influencer Elite - Setup & Deployment Guide

## 🎯 What You Have

A fully functional **Influencer Elite** website with:
- ✅ Beautiful responsive design (Obsidian Kinetic theme)
- ✅ Express.js backend with MongoDB
- ✅ Email automation (Gmail SMTP)
- ✅ Proposal form submission
- ✅ Admin dashboard for managing proposals
- ✅ API endpoints for campaigns, auth, and more

---

## 🚀 LOCAL SETUP (Windows)

### Step 1: Install Node.js
1. Download from https://nodejs.org/ (LTS version)
2. Run installer, accept defaults
3. Restart terminal/CMD
4. Verify: `node --version`

### Step 2: Install MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Run installer, accept defaults
3. MongoDB will run as a Windows service automatically

### Step 3: Setup Project

```powershell
# Navigate to project folder
cd "c:\Users\aalim\OneDrive\Desktop\Vibe coding\stitch\stitch"

# Install dependencies
npm install

# Start server
npm start
```

You should see:
```
✅ MongoDB connected
🚀 Influencer Elite Server running on port 5000
```

### Step 4: Test Locally

Open browser:
- Homepage: http://localhost:5000
- For Brands: http://localhost:5000/brands
- Gallery: http://localhost:5000/gallery
- Admin Dashboard: http://localhost:5000/admin

### Step 5: Test Form Submission

1. Go to http://localhost:5000/brands
2. Scroll to "Start Your Campaign" form
3. Fill out the form
4. Click "Request Proposal"
5. Check your email for confirmation

---

## 🗄️ MONGODB SETUP

### Option A: Cloud MongoDB (Recommended)

**Free tier available - perfect for starting**

1. Create account: https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier)
3. Get connection string
4. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/influencer_elite
```

### Option B: Local MongoDB
- Already set up in Step 2
- Default: `mongodb://localhost:27017/influencer_elite`

---

## 📧 GMAIL SETUP (Email Functionality)

### Enable App Password

1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to https://myaccount.google.com/apppasswords
4. Select: Mail + Windows Computer
5. Copy the 16-character password
6. Add to `.env`:

```
EMAIL_USER=aalimuhammad236@gmail.com
EMAIL_PASS=aqtc ldjx oecp lzuu
EMAIL_FROM=support@zaki.com
```

**Note:** Emails will be sent FROM support@zaki.com but use gmail account authentication

---

## 🌐 DEPLOY TO HEROKU (Easiest)

### Prerequisites
- Heroku account (free): https://www.heroku.com
- Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

### Step 1: Setup Git
```powershell
cd "c:\Users\aalim\OneDrive\Desktop\Vibe coding\stitch\stitch"

# Initialize git repo
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Login to Heroku
```powershell
heroku login
```

### Step 3: Create App
```powershell
# Replace YOUR-APP-NAME with unique name
heroku create your-app-name

# Example:
heroku create zaki-influencer-elite
```

### Step 4: Set Environment Variables
```powershell
heroku config:set PORT=5000
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your-mongodb-connection-string"
heroku config:set EMAIL_USER="aalimuhammad236@gmail.com"
heroku config:set EMAIL_PASS="aqtc ldjx oecp lzuu"
heroku config:set EMAIL_FROM="support@zaki.com"
heroku config:set DOMAIN_URL="https://your-app-name.herokuapp.com"
heroku config:set JWT_SECRET="your-secret-key-here"
```

### Step 5: Deploy
```powershell
git push heroku master
# or if using main branch:
git push heroku main
```

### Step 6: Open App
```powershell
heroku open
```

Your site is now live at: `https://your-app-name.herokuapp.com`

### Monitor Logs
```powershell
heroku logs --tail
```

---

## 🔗 CONNECT DOMAIN (zaki.com)

### Option 1: Use Heroku Domain
- Your app automatically gets: `your-app-name.herokuapp.com`
- Works immediately after deployment

### Option 2: Custom Domain (zaki.com)

1. **Purchase domain** from Namecheap, GoDaddy, etc.

2. **Add domain to Heroku**
```powershell
heroku domains:add zaki.com
heroku domains:add www.zaki.com
```

3. **Update DNS at your registrar**
- Point your domain to Heroku nameservers
- Or use CNAME: `your-app-name.herokuapp.com`

4. **Enable SSL**
```powershell
# Free SSL from Heroku
heroku certs:auto:enable
```

---

## 📱 TESTING CHECKLIST

- [ ] Homepage loads correctly
- [ ] For Brands page loads
- [ ] For Influencers page loads
- [ ] Gallery loads
- [ ] Form submits on brands page
- [ ] Confirmation email received
- [ ] Admin dashboard accessible at /admin
- [ ] Admin can view proposals

---

## 🔧 TROUBLESHOOTING

### Port 5000 already in use
```powershell
# Find process
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID 12345 /F
```

### MongoDB connection failed
- Check MONGODB_URI in .env
- Ensure whitelist IP in MongoDB Atlas
- Verify username/password

### Emails not sending
- Check Gmail 2FA enabled
- Verify App Password in .env
- Check spam folder
- Test with: `npm test:email`

### Heroku deployment fails
```powershell
# Check logs
heroku logs --tail

# Common: Add Procfile
echo "web: node server.js" > Procfile
git add Procfile
git commit -m "Add Procfile"
git push heroku main
```

---

## 📊 ADMIN DASHBOARD

Access at: `http://localhost:5000/admin` or `https://your-app-name.herokuapp.com/admin`

Features:
- View all proposals
- Update proposal status
- Add notes to proposals
- View statistics

---

## 📚 API Documentation

### Submit Proposal
```
POST /api/proposals/submit
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@company.com",
  "company": "Acme Inc",
  "budget": "50k+",
  "goals": "Increase brand awareness"
}

Response:
{
  "success": true,
  "message": "Proposal submitted successfully!",
  "proposalId": "..."
}
```

### Get Proposals (Admin)
```
GET /api/proposals

Response:
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### Update Proposal
```
PUT /api/proposals/{id}
Content-Type: application/json

{
  "status": "contacted",
  "notes": "Follow up scheduled"
}
```

### Get Statistics
```
GET /api/proposals/statistics

Response:
{
  "success": true,
  "statistics": {
    "totalProposals": 10,
    "pendingProposals": 3,
    "contactedProposals": 5,
    "completedProposals": 2
  }
}
```

---

## 🎨 CUSTOMIZATION

### Change Theme Colors
Edit `/server.js` - search for tailwind config colors section

### Modify Email Templates
Edit `/services/emailService.js` - customize HTML templates

### Add Navigation Links
Edit HTML files in each folder - update `<nav>` sections

### Add Authentication
Implement JWT in `/middleware/auth.js` (scaffolding ready)

---

## 📞 SUPPORT

**Email:** aalimuhammad236@gmail.com
**Domain:** zaki.com
**GitHub:** Your repository URL

---

## ✅ SUCCESS INDICATORS

You're all set when you see:
1. ✅ "✅ MongoDB connected" in terminal
2. ✅ "🚀 Influencer Elite Server running on port 5000"
3. ✅ Forms submit without errors
4. ✅ Confirmation emails arrive
5. ✅ Admin dashboard loads proposals
6. ✅ Website is live on Heroku

---

## 🚀 NEXT STEPS AFTER DEPLOYMENT

1. **Setup Analytics** - Add Google Analytics
2. **Add Blog** - Create content section
3. **Social Integration** - Add Instagram feed
4. **Payment Integration** - Add Stripe for bookings
5. **User Authentication** - Full login system
6. **Email Campaigns** - MailChimp integration
7. **SEO Optimization** - Meta tags, robots.txt
8. **Mobile App** - React Native version

---

## 📝 NOTES

- Keep `.env` file SECRET - never commit to git
- Change `JWT_SECRET` in production
- Monitor MongoDB usage (free tier has limits)
- Heroku free tier sleeps after 30 mins inactivity
- Upgrade to paid Heroku dyno for always-on

---

**Created:** 2024
**Framework:** Node.js + Express + MongoDB
**Design:** Obsidian Kinetic
**Status:** Production Ready
