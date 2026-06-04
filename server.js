require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express App
const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Import Routes
const proposalRoutes = require('./routes/proposals');
const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaigns');
const emailRoutes = require('./routes/email');

// Database Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/influencer_elite', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch(err => console.log('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/proposals', proposalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/email', emailRoutes);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'influencer_elite_homepage', 'code.html'));
});

app.get('/brands', (req, res) => {
    res.sendFile(path.join(__dirname, 'influencer_elite_for_brands', 'code.html'));
});

app.get('/influencers', (req, res) => {
    res.sendFile(path.join(__dirname, 'influencer_elite_for_influencers', 'code.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'influencer_elite_campaign_gallery', 'code.html'));
});

// Admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.get('/admin/proposals', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'Influencer Elite API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        timestamp: new Date().toISOString()
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Influencer Elite Server running on port ${PORT}`);
    console.log(`📍 Domain: ${process.env.DOMAIN_URL || `http://localhost:${PORT}`}`);
});

module.exports = app;
