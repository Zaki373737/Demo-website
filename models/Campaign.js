const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    influencers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    budget: Number,
    duration: {
        startDate: Date,
        endDate: Date
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'completed', 'paused'],
        default: 'draft'
    },
    category: String,
    roi: Number,
    impressions: Number,
    engagementRate: Number,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Campaign', campaignSchema);
