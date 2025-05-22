require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully');
        
    } catch (e) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
}

module.exports = connectDB;
