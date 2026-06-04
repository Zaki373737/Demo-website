const express = require('express');
const router = express.Router();

// Send email
router.post('/send', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Email endpoint ready'
    });
});

// Get email templates
router.get('/templates', (req, res) => {
    res.status(200).json({
        success: true,
        templates: ['proposal', 'contact', 'campaign_update']
    });
});

module.exports = router;
