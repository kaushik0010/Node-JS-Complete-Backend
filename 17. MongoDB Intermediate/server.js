require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route');
const bookRoutes = require('./routes/book.route');


const app = express();
const PORT = process.env.PORT || 3000;

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Database connected successfully`);
    })
    .catch((e) => console.log(e));


// use middleware
app.use(express.json());
app.use('/products', productRoutes);
app.use('/reference', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is now running at port ${PORT}`);
})