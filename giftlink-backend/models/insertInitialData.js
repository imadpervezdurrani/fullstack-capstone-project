const fs = require('fs');
const path = require('path');
const connectToDatabase = require('./db');

async function seedDatabase() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const dataPath = path.join(__dirname, 'initialData.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const gifts = JSON.parse(rawData);

        console.log(`Importing initial data from initialData.json...`);
        const result = await collection.insertMany(gifts);
        console.log(`Successfully inserted ${result.insertedCount || gifts.length} documents into the gifts collection.`);
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.error("Error seeding database:", err);
    }
}

if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
