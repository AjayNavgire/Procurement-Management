
const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true
    },
    _client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['boolean', 'dropdown', 'multipleChoice', 'text'],
            required: true
        },
        options: [
            {
                type: String
            }
        ], // Only for dropdown and multipleChoice type
        required: {
            type: Boolean,
            default: false
        },
        answer: {
            type: mongoose.Schema.Types.Mixed
        } // Store answer based on type
    }],

    imageBeforeLoading: {
        publice_id: {
            type: String
        },
        url: {
            type: String,
        }
    },
    imageAfterLoading: {
        publice_id: {
            type: String
        },
        url: {
            type: String,
        }
    },
    summary: {
        type: String
    },
    _createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model('Checklist', checklistSchema);