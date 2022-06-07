const dbClient = require('./dbConnector');
const { ObjectId } = require('mongodb')
module.exports = {
    create: async (collection, body) => {
        try {
            const db = await dbClient();
            const res = await db.collection(collection).insertOne(body)
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    get: async (collection, options) => {
        try {
            const db = await dbClient();
            const res = await db.collection(collection).find(options).toArray();
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getById : async (collection, id) => {
        try {
            const db = await dbClient();
            const res = await db.collection(collection).find({_id: ObjectId(id)}).toArray();
            return res[0];
        } catch (error) {
            console.log(error);
        }
    },

    bulkInsert: async (collection, body) => {
        const db = await dbClient();
        const deleteResult = await db.collection(collection).insertMany(body);
        return deleteResult;
    },

    delete: async (collection, condition) => {
        try {
            const db = await dbClient();
            if (condition && condition._id) {
                condition._id = ObjectId(condition._id);
            }
            const deleteResult = await db.collection(collection).deleteMany(condition);
            return deleteResult;
        } catch (error) {
            throw error
        }
    },

    update: async (collection, condition, body, options) => {
        try {
            if (condition && condition._id) {
                condition._id = ObjectId(condition._id);
            }
            const db = await dbClient();
            const res = await db.collection(collection).updateMany(condition, {$set: body}, options );
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}