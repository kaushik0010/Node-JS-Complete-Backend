require('dotenv').config()

const express = require('express');
const connectDB = require("./database/db")
const app = express();
const PORT = process.env.PORT || 3000;
const bookRoutes = require('./routes/book-routes');

// connect to database
connectDB();

// middleware
app.use(express.json());

// routes 
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});