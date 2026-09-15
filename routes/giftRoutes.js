const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const { analyzeSentiment } = require('../util/sentiment');

// Route serving /api/gifts (GET all gifts)
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

// Route serving /api/gifts/:id (GET specific gift)
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;
        const gift = await collection.findOne({ id: id });
        if (!gift) {
            return res.status(404).json({ error: "Gift not found" });
        }
        res.json(gift);
    } catch (e) {
        next(e);
    }
});

// Route to add a comment with sentiment evaluation to a gift
router.post('/:id/comments', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;
        const { author, comment } = req.body;

        if (!comment) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const sentimentScore = analyzeSentiment(comment);
        const newComment = {
            author: author || "Anonymous User",
            comment,
            sentiment: sentimentScore,
            date: new Date().toISOString()
        };

        const gift = await collection.findOne({ id: id });
        if (!gift) {
            return res.status(404).json({ error: "Gift not found" });
        }

        const comments = gift.comments || [];
        comments.push(newComment);

        await collection.updateOne({ id: id }, { $set: { comments } });
        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
