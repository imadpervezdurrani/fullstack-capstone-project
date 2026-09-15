const express = require('express');
const router = express.Router();
const connectToDatabase = require('../giftlink-backend/models/db');

// Route serving /api/search with filtering by category, condition, age, and name
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        let query = {};

        // Filter items by category
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }

        // Filter items by name keyword
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        // Filter items by condition
        if (req.query.condition && req.query.condition !== 'All') {
            query.condition = req.query.condition;
        }

        // Filter items by age
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) };
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
