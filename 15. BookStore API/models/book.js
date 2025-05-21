const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        maxLength: [256, 'Title must be less than 256 characters']
    },
    author: {
        type: String,
        required: [true, 'Book Author is required'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'Publication year is required'],
        min: [1000, 'Year must be atleast 1000'],
        max: [new Date().getFullYear(), 'Year cannot be in future']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Book', bookSchema);