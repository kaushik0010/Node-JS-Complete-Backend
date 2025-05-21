const express = require('express');
const { getAllBooks, getSingleBookById, addNewBook, updateSingleBook, deleteBook } = require('../controllers/book-controller')

// create express router
const router = express.Router()

// all the routes are related to book only
router.get('/allbooks', getAllBooks);
router.get('/book/:id', getSingleBookById);
router.post('/add', addNewBook);
router.put('/update/:id', updateSingleBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;