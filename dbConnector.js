const { MongoClient } = require('mongodb');
require('dotenv').config();

const getDb = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        const db = await client.db(process.env.MONGO_DB);
        return db;
    } catch (error) {
        console.log(error)
    }
}

module.exports = getDb;
