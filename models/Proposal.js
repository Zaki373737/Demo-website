const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: /.+\@.+\..+/
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    budget: {
        type: String,
        enum: ['10k-25k', '25k-50k', '50k+'],
        required: true
    },
    goals: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'in-progress', 'completed'],
        default: 'pending'
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Proposal', proposalSchema);
