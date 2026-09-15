require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
let dbInstance = null;
const dbName = "giftdb";

// Fallback in-memory database simulation for out-of-the-box local testing
class FallbackCollection {
    constructor(initialItems = []) {
        this.data = [...initialItems];
    }
    async find(query = {}) {
        return {
            toArray: async () => {
                return this.data.filter(item => {
                    for (const [key, value] of Object.entries(query)) {
                        if (value && typeof value === 'object' && value.$regex) {
                            const regex = new RegExp(value.$regex, value.$options || 'i');
                            if (!regex.test(item[key] || '')) return false;
                        } else if (value && typeof value === 'object' && value.$lte !== undefined) {
                            if (Number(item[key]) > Number(value.$lte)) return false;
                        } else if (item[key] !== value) {
                            return false;
                        }
                    }
                    return true;
                });
            }
        };
    }
    async findOne(query) {
        return this.data.find(item => {
            for (const [key, value] of Object.entries(query)) {
                if (item[key] !== value && String(item[key]) !== String(value)) return false;
            }
            return true;
        }) || null;
    }
    async insertOne(doc) {
        const newDoc = { _id: 'id_' + Date.now(), ...doc };
        this.data.push(newDoc);
        return { insertedId: newDoc._id, acknowledged: true };
    }
    async insertMany(docs) {
        const insertedIds = {};
        docs.forEach((doc, idx) => {
            const id = 'id_' + (Date.now() + idx);
            this.data.push({ _id: id, ...doc });
            insertedIds[idx] = id;
        });
        return { acknowledged: true, insertedCount: docs.length, insertedIds };
    }
    async updateOne(filter, update) {
        const item = await this.findOne(filter);
        if (item && update.$set) {
            Object.assign(item, update.$set);
            return { matchedCount: 1, modifiedCount: 1 };
        }
        return { matchedCount: 0, modifiedCount: 0 };
    }
    async countDocuments() {
        return this.data.length;
    }
}

class FallbackDatabase {
    constructor() {
        const sampleDataPath = path.join(__dirname, 'initialData.json');
        let initialGifts = [];
        try {
            initialGifts = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
        } catch (e) {
            console.warn("Could not load initialData.json for fallback store:", e.message);
        }
        this.collections = {
            gifts: new FallbackCollection(initialGifts),
            users: new FallbackCollection()
        };
    }
    collection(name) {
        if (!this.collections[name]) {
            this.collections[name] = new FallbackCollection();
        }
        return this.collections[name];
    }
}

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        const client = new MongoClient(url, { serverSelectionTimeoutMS: 2000 });
        await client.connect();
        dbInstance = client.db(dbName);
        console.log(`Connected successfully to MongoDB database: ${dbName}`);
        return dbInstance;
    } catch (err) {
        console.warn(`Could not connect to MongoDB server at ${url}: ${err.message}`);
        console.log("Activating resilient local embedded datastore for seamless local execution.");
        dbInstance = new FallbackDatabase();
        return dbInstance;
    }
}

module.exports = connectToDatabase;
