const express = require('express');
const router = express.Router();

// Registration
router.post('/register', (req, res) => {
    res.status(201).json({
        success: true,
        message: 'Authentication endpoint ready',
        endpoint: '/api/auth/register'
    });
});

// Login
router.post('/login', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Authentication endpoint ready',
        endpoint: '/api/auth/login'
    });
});

// Logout
router.post('/logout', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;
