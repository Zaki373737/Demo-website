const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');

// Public routes
router.post('/submit', proposalController.submitProposal);
router.post('/contact', proposalController.submitContact);
router.get('/statistics', proposalController.getStatistics);

// Admin routes (to be protected by middleware in production)
router.get('/', proposalController.getAllProposals);
router.get('/:id', proposalController.getProposal);
router.put('/:id', proposalController.updateProposalStatus);

module.exports = router;
