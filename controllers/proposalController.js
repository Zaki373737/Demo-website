const Proposal = require('../models/Proposal');
const Contact = require('../models/Contact');
const { sendProposalConfirmation, sendProposalNotification } = require('../services/emailService');
const validator = require('validator');

// Submit brand proposal
exports.submitProposal = async (req, res) => {
    try {
        const { firstName, lastName, email, company, budget, goals } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !company || !budget || !goals) {
            return res.status(400).json({ 
                error: 'All fields are required',
                success: false 
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format',
                success: false 
            });
        }

        // Validate budget
        const validBudgets = ['10k-25k', '25k-50k', '50k+'];
        if (!validBudgets.includes(budget)) {
            return res.status(400).json({ 
                error: 'Invalid budget selection',
                success: false 
            });
        }

        // Create proposal
        const proposal = new Proposal({
            firstName: validator.trim(firstName),
            lastName: validator.trim(lastName),
            email: validator.normalizeEmail(email),
            company: validator.trim(company),
            budget,
            goals: validator.trim(goals)
        });

        await proposal.save();

        // Send confirmation email to client
        await sendProposalConfirmation({
            firstName,
            company,
            email,
            budget,
            goals
        });

        // Send notification to admin
        await sendProposalNotification({
            firstName,
            lastName,
            email,
            company,
            budget,
            goals
        });

        res.status(201).json({
            success: true,
            message: 'Proposal submitted successfully!',
            proposalId: proposal._id
        });

    } catch (error) {
        console.error('Error submitting proposal:', error);
        res.status(500).json({
            error: 'Error submitting proposal',
            success: false,
            details: error.message
        });
    }
};

// Get all proposals (admin)
exports.getAllProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: proposals.length,
            data: proposals
        });
    } catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).json({
            error: 'Error fetching proposals',
            success: false
        });
    }
};

// Get single proposal
exports.getProposal = async (req, res) => {
    try {
        const proposal = await Proposal.findById(req.params.id);

        if (!proposal) {
            return res.status(404).json({
                error: 'Proposal not found',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            data: proposal
        });
    } catch (error) {
        console.error('Error fetching proposal:', error);
        res.status(500).json({
            error: 'Error fetching proposal',
            success: false
        });
    }
};

// Update proposal status
exports.updateProposalStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;

        if (!status) {
            return res.status(400).json({
                error: 'Status is required',
                success: false
            });
        }

        const validStatuses = ['pending', 'contacted', 'in-progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: 'Invalid status',
                success: false
            });
        }

        const proposal = await Proposal.findByIdAndUpdate(
            req.params.id,
            {
                status,
                notes: notes || '',
                updatedAt: Date.now()
            },
            { new: true }
        );

        if (!proposal) {
            return res.status(404).json({
                error: 'Proposal not found',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            message: 'Proposal updated successfully',
            data: proposal
        });
    } catch (error) {
        console.error('Error updating proposal:', error);
        res.status(500).json({
            error: 'Error updating proposal',
            success: false
        });
    }
};

// Submit contact form
exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: 'All fields are required',
                success: false
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                error: 'Invalid email format',
                success: false
            });
        }

        const contact = new Contact({
            name: validator.trim(name),
            email: validator.normalizeEmail(email),
            subject: validator.trim(subject),
            message: validator.trim(message)
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us. We will get back to you soon!',
            contactId: contact._id
        });

    } catch (error) {
        console.error('Error submitting contact:', error);
        res.status(500).json({
            error: 'Error submitting contact form',
            success: false
        });
    }
};

// Get statistics
exports.getStatistics = async (req, res) => {
    try {
        const totalProposals = await Proposal.countDocuments();
        const pendingProposals = await Proposal.countDocuments({ status: 'pending' });
        const contactedProposals = await Proposal.countDocuments({ status: 'contacted' });
        const completedProposals = await Proposal.countDocuments({ status: 'completed' });

        res.status(200).json({
            success: true,
            statistics: {
                totalProposals,
                pendingProposals,
                contactedProposals,
                completedProposals
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            error: 'Error fetching statistics',
            success: false
        });
    }
};
