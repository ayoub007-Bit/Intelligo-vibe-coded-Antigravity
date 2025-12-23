const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    originalName: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: false  // Optionnel pour permettre les textes collés sans fichier
    },
    extractedText: {
        type: String,
        default: ''
    },
    analysis: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        enum: ['uploaded', 'processing', 'analyzed', 'failed'],
        default: 'uploaded'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Document', DocumentSchema);
