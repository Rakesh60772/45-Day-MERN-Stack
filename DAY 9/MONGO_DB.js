const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database name
const dbName = 'resumeData';
async function connectToMongoDB() {
try {
await client.connect();
console.log('✅ Connected successfully to MongoDB');
const db = client.db(dbName);
console.log(`📊 Using database: ${dbName}`);
return db;
} catch (error) {
console.error('❌ MongoDB connection error:', error);
throw error;
}
}
// Usage
connectToMongoDB().then(db => {
// Use the database connection here
}).catch(console.error);