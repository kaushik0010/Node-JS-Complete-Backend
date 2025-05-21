const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (e) {
        console.error('MongoDB connection failed', e);
        process.exit(1);
    }
}

module.exports = connectDB;