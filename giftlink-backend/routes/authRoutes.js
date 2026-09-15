const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'giftlink_jwt_super_secret_key_2026';

// 1. Register API
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existingEmail = await collection.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);

        const newUser = await collection.insertOne({
            email,
            firstName: firstName || '',
            lastName: lastName || '',
            password: hash,
            createdAt: new Date()
        });

        const payload = { user: { id: newUser.insertedId, email } };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            authtoken,
            email,
            firstName: firstName || '',
            lastName: lastName || ''
        });
    } catch (e) {
        console.error("Register error:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// 2. Login API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        const theUser = await collection.findOne({ email });
        if (!theUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const checkPassword = await bcryptjs.compare(password, theUser.password);
        if (!checkPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const payload = { user: { id: theUser._id, email: theUser.email } };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            authtoken,
            email: theUser.email,
            firstName: theUser.firstName,
            lastName: theUser.lastName
        });
    } catch (e) {
        console.error("Login error:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3. Update User Information API
router.put('/update', async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required to update profile" });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        const theUser = await collection.findOne({ email });
        if (!theUser) {
            return res.status(404).json({ error: "User not found" });
        }

        await collection.updateOne(
            { email },
            { $set: { firstName: firstName || theUser.firstName, lastName: lastName || theUser.lastName } }
        );

        res.json({
            message: "User updated successfully",
            email,
            firstName: firstName || theUser.firstName,
            lastName: lastName || theUser.lastName
        });
    } catch (e) {
        console.error("Update error:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
