const express = require('express');
const router = express.Router();

// Get all campaigns
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Campaigns endpoint ready',
        endpoint: '/api/campaigns'
    });
});

// Get single campaign
router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Campaign details endpoint ready',
        campaignId: req.params.id
    });
});

// Create campaign
router.post('/', (req, res) => {
    res.status(201).json({
        success: true,
        message: 'Campaign created successfully'
    });
});

// Update campaign
router.put('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Campaign updated successfully',
        campaignId: req.params.id
    });
});

module.exports = router;
