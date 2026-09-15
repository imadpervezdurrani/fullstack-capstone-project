require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./models/db');

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3060;

// Enable CORS for frontend development
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes serving the APIs
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Inside the backend server for GiftLink');
});

// Connect to Database and start server
connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to database:", err);
        app.listen(port, () => {
            console.log(`Server running on port ${port} (resilient mode)`);
        });
    });

module.exports = app;
