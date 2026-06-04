# Influencer Elite - Full Stack Website

Premium influencer marketing platform connecting elite creators with visionary brands.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Gmail account with App Password enabled

### Installation

1. **Clone/Extract the project**
```bash
cd stitch
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Edit `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/influencer_elite
EMAIL_USER=aalimuhammad236@gmail.com
EMAIL_PASS=aqtc ldjx oecp lzuu
EMAIL_FROM=support@zaki.com
DOMAIN_NAME=zaki.com
DOMAIN_URL=https://zaki.com
```

4. **Start the server**
```bash
npm start
```

The server will run on `http://localhost:5000`

## 📁 Project Structure

```
stitch/
├── server.js                    # Main server file
├── package.json                 # Dependencies
├── .env                         # Environment variables
├── models/                      # Database models
│   ├── Proposal.js             # Brand proposal model
│   ├── User.js                 # User/Account model
│   ├── Campaign.js             # Campaign model
│   └── Contact.js              # Contact form model
├── routes/                      # API routes
│   ├── proposals.js            # Proposal endpoints
│   ├── auth.js                 # Authentication endpoints
│   ├── campaigns.js            # Campaign endpoints
│   └── email.js                # Email endpoints
├── controllers/                 # Business logic
│   └── proposalController.js   # Proposal handlers
├── services/                    # Utilities
│   └── emailService.js         # Email sending service
├── middleware/                  # Custom middleware
├── influencer_elite_homepage/   # Homepage
├── influencer_elite_for_brands/ # Brands landing page
├── influencer_elite_for_influencers/ # Influencers landing page
└── influencer_elite_campaign_gallery/ # Campaign gallery
```

## 🔌 API Endpoints

### Proposals
- `POST /api/proposals/submit` - Submit brand proposal
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@company.com",
    "company": "Acme Inc",
    "budget": "50k+",
    "goals": "Reach Gen Z audience"
  }
  ```

- `GET /api/proposals` - Get all proposals (admin)
- `GET /api/proposals/:id` - Get single proposal
- `PUT /api/proposals/:id` - Update proposal status
- `GET /api/proposals/statistics` - Get statistics

### Contacts
- `POST /api/proposals/contact` - Submit contact form
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@email.com",
    "subject": "Partnership Inquiry",
    "message": "Interested in collaboration"
  }
  ```

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get campaign details
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign

## 📧 Email Configuration

The platform uses Gmail SMTP for sending emails. To enable email:

1. Enable 2-factor authentication on Gmail
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add credentials to `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🗄️ Database Setup

### Using MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/influencer_elite`
4. Add to `.env` as `MONGODB_URI`

### Using Local MongoDB

```bash
mongod  # Start MongoDB service
```

Update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/influencer_elite
```

## 🌐 Deployment

### Deploy to Heroku

1. **Create Heroku app**
```bash
heroku login
heroku create your-app-name
```

2. **Set environment variables**
```bash
heroku config:set MONGODB_URI="your-mongodb-url"
heroku config:set EMAIL_USER="your-email@gmail.com"
heroku config:set EMAIL_PASS="your-app-password"
heroku config:set DOMAIN_URL="https://zaki.com"
```

3. **Deploy**
```bash
git push heroku main
```

### Deploy to AWS/DigitalOcean

1. **Setup Ubuntu server**
```bash
sudo apt update
sudo apt install nodejs npm mongodb
```

2. **Clone repository**
```bash
git clone your-repo.git
cd stitch
npm install
```

3. **Setup PM2 for process management**
```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

4. **Setup Nginx reverse proxy**
```bash
sudo apt install nginx
# Configure nginx to proxy to localhost:5000
```

## 🔒 Security Features

- Email validation with validator.js
- Password hashing with bcryptjs
- JWT authentication tokens
- CORS configuration
- Environment variable protection

## 📊 Admin Dashboard

Access admin features at `/admin/proposals` (authentication required)

Features:
- View all proposals
- Update proposal status
- Track conversion metrics
- Email management

## 🎨 Design System

**Color Scheme (Obsidian Kinetic)**
- Primary: #ffffff
- Primary Fixed: #b7f700 (Lime)
- Secondary: #dcb8ff
- Secondary Container: #7701d0 (Violet)
- Surface: #131316
- Background: #131316

**Typography**
- Display: Plus Jakarta Sans 72px
- Headline: Plus Jakarta Sans 48px
- Body: Inter 16px
- Label: JetBrains Mono 12px

## 🔧 Configuration

### CORS Settings

Update in `server.js`:
```javascript
app.use(cors({
    origin: 'https://zaki.com',
    credentials: true
}));
```

### Email Templates

Customize email templates in `services/emailService.js`

## 📱 Features

✅ Brand proposal submission with validation
✅ Automated email confirmations
✅ Admin proposal management
✅ Campaign gallery
✅ Influencer directory
✅ Performance analytics
✅ Responsive design
✅ Dark mode (Obsidian Kinetic)

## 🐛 Troubleshooting

**Cannot connect to MongoDB**
- Ensure MongoDB is running locally or check cloud connection string
- Verify IP whitelist in MongoDB Atlas

**Emails not sending**
- Check Gmail App Password is correct
- Verify email is in `.env`
- Check Gmail account allows "Less secure app access"

**Port 5000 already in use**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

## 📞 Support

For technical support:
- Email: aalimuhammad236@gmail.com
- Documentation: See README.md
- Issues: GitHub Issues

## 📄 License

© 2024 Influencer Elite. All rights reserved.

## 🎯 Next Steps

1. ✅ Setup MongoDB database
2. ✅ Configure Gmail SMTP
3. ✅ Start development server
4. ✅ Test proposal submission
5. ✅ Setup admin dashboard
6. ✅ Configure domain (zaki.com)
7. ✅ Deploy to production
8. ✅ Setup SSL/HTTPS
9. ✅ Monitor analytics
