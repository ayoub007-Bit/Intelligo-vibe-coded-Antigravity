const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Document = require('../models/Document');
const { extractText } = require('../services/ocrService');
const { analyzeDocument, rewriteText } = require('../services/llmService');

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        const newDoc = new Document({
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            path: req.file.path,
            userId: req.user ? req.user.id : null
        });
        await newDoc.save();
        res.json(newDoc);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/:id/process', async (req, res) => {
    let doc = null;
    try {
        doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        doc.status = 'processing';
        await doc.save();

        const text = await extractText(doc.path, doc.mimeType);
        doc.extractedText = text;

        const analysis = await analyzeDocument(text);
        doc.analysis = analysis;

        doc.status = 'analyzed';
        await doc.save();
        res.json(doc);
    } catch (err) {
        console.error(err);
        if (doc) {
            doc.status = 'failed';
            await doc.save();
        }
        res.status(500).send('Server Error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        // If user is authenticated, return their documents
        // If guest, return empty list (or handle as needed)
        if (!req.user) {
            return res.json([]);
        }
        const docs = await Document.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(docs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        // Check ownership if document has a userId
        if (doc.userId && (!req.user || doc.userId.toString() !== req.user.id)) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/:id/action', async (req, res) => {
    try {
        const { instruction } = req.body;
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        const result = await rewriteText(doc.extractedText, instruction);
        res.json({ result });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// DELETE - Supprimer un document
router.delete('/:id', async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document non trouvé' });

        // Supprimer le fichier physique si il existe
        if (doc.path) {
            const fs = require('fs');
            const path = require('path');
            const filePath = path.resolve(doc.path);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`✅ Fichier supprimé: ${filePath}`);
            }
        }

        // Supprimer le document de la base de données
        await Document.findByIdAndDelete(req.params.id);

        res.json({ message: 'Document supprimé avec succès' });
    } catch (err) {
        console.error('❌ Erreur lors de la suppression:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// POST - Analyser du texte copié-collé directement (sans fichier)
router.post('/analyze-text', auth, async (req, res) => {
    try {
        const { text, title } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ message: 'Le texte est requis' });
        }

        // Créer un document sans fichier
        const newDoc = new Document({
            filename: 'texte-colle.txt',
            originalName: title || 'Texte collé',
            mimeType: 'text/plain',
            path: null, // Pas de fichier physique
            extractedText: text,
            status: 'processing',
            userId: req.user ? req.user.id : null
        });

        await newDoc.save();

        // Analyser directement le texte
        const analysis = await analyzeDocument(text);
        newDoc.analysis = analysis;
        newDoc.status = 'analyzed';
        await newDoc.save();

        res.json(newDoc);
    } catch (err) {
        console.error('❌ Erreur lors de l\'analyse du texte:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
