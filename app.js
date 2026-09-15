require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./giftlink-backend/models/db');

const giftRoutes = require('./giftlink-backend/routes/giftRoutes');
const searchRoutes = require('./giftlink-backend/routes/searchRoutes');
const authRoutes = require('./giftlink-backend/routes/authRoutes');

const app = express();
const port = process.env.PORT || 3060;

app.use(cors());
app.use(express.json());

app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);

// Route serving /api/search directly within app.js
app.use('/api/search', searchRoutes);

app.get('/api/search', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        let query = {};

        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }
        if (req.query.condition && req.query.condition !== 'All') {
            query.condition = req.query.condition;
        }
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) };
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

app.get('/', (req, res) => {
    res.send('Inside the backend server for GiftLink');
});

connectToDatabase().catch(console.error);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
