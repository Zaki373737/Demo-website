const supabase = require('../services/supabaseClient');
const { sendProposalConfirmation, sendProposalNotification } = require('../services/emailService');
const validator = require('validator');

const PROPOSAL_TABLE = 'proposals';
const CONTACT_TABLE = 'contacts';

// Submit brand proposal
exports.submitProposal = async (req, res) => {
    try {
        const { firstName, lastName, email, company, budget, goals } = req.body;

        if (!firstName || !lastName || !email || !company || !budget || !goals) {
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

        const validBudgets = ['10k-25k', '25k-50k', '50k+'];
        if (!validBudgets.includes(budget)) {
            return res.status(400).json({
                error: 'Invalid budget selection',
                success: false
            });
        }

        const proposalPayload = {
            firstName: validator.trim(firstName),
            lastName: validator.trim(lastName),
            email: validator.normalizeEmail(email),
            company: validator.trim(company),
            budget,
            goals: validator.trim(goals),
            status: 'pending',
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from(PROPOSAL_TABLE)
            .insert([proposalPayload])
            .select();

        if (error) {
            console.error('Supabase insert error:', error);
            throw error;
        }

        const proposal = data[0];

        await sendProposalConfirmation({
            firstName,
            company,
            email,
            budget,
            goals
        });

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
            proposalId: proposal.id
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
        const { data: proposals, error } = await supabase
            .from(PROPOSAL_TABLE)
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) {
            console.error('Supabase select error:', error);
            throw error;
        }

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
        const { data, error } = await supabase
            .from(PROPOSAL_TABLE)
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({
                    error: 'Proposal not found',
                    success: false
                });
            }
            console.error('Supabase select error:', error);
            throw error;
        }

        res.status(200).json({
            success: true,
            data
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

        const { data, error } = await supabase
            .from(PROPOSAL_TABLE)
            .update({
                status,
                notes: notes || '',
                updatedAt: new Date().toISOString()
            })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({
                    error: 'Proposal not found',
                    success: false
                });
            }
            console.error('Supabase update error:', error);
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Proposal updated successfully',
            data
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

        const contactPayload = {
            name: validator.trim(name),
            email: validator.normalizeEmail(email),
            subject: validator.trim(subject),
            message: validator.trim(message),
            status: 'new',
            response: null,
            respondedAt: null,
            createdAt: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from(CONTACT_TABLE)
            .insert([contactPayload])
            .select();

        if (error) {
            console.error('Supabase insert error:', error);
            throw error;
        }

        const contact = data[0];

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us. We will get back to you soon!',
            contactId: contact.id
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
        const totalCount = await supabase
            .from(PROPOSAL_TABLE)
            .select('id', { count: 'exact', head: true });

        const pendingCount = await supabase
            .from(PROPOSAL_TABLE)
            .select('id', { count: 'exact', head: true })
            .eq('status', 'pending');

        const contactedCount = await supabase
            .from(PROPOSAL_TABLE)
            .select('id', { count: 'exact', head: true })
            .eq('status', 'contacted');

        const completedCount = await supabase
            .from(PROPOSAL_TABLE)
            .select('id', { count: 'exact', head: true })
            .eq('status', 'completed');

        if (totalCount.error || pendingCount.error || contactedCount.error || completedCount.error) {
            console.error('Supabase count error:', totalCount.error || pendingCount.error || contactedCount.error || completedCount.error);
            throw totalCount.error || pendingCount.error || contactedCount.error || completedCount.error;
        }

        res.status(200).json({
            success: true,
            statistics: {
                totalProposals: totalCount.count || 0,
                pendingProposals: pendingCount.count || 0,
                contactedProposals: contactedCount.count || 0,
                completedProposals: completedCount.count || 0
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
