const express = require('express');
const app = express();

// Middleware
app.use(express.json());

let books = [
    {
        id: '1',
        title: 'Book 1',
    },
    {
        id: '2',
        title: 'Book 2',
    },
];


//intro route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our Book Store API'
    });
});


// get all books
app.get('/books', (req, res) => {
    res.json(books);
});


// get a single book
app.get('/books/:id', (req, res) => {
    const book = books.find(item=> item.id === req.params.id);
    if(book){
        res.status(200).json(book)
    } else {
        res.status(404).json({
            message: 'Book not found! Try with a valid id'
        });
    }
})


// add a new book
app.post('/add', (req, res) => {
    const newBook = {
        id: (Math.floor(Math.random() * 1000)).toString(),
        title: `Book ${books.length+1}`
    }

    books.push(newBook);
    res.status(200).json({
        data: newBook,
        message: 'New book added successfully'
    });
});


// update a book
app.put('/update/:id', (req, res) => {
    const findCurrentBook = books.find(
        (bookItem) => bookItem.id === req.params.id
    );
    if(findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title;

        res.status(200).json({
            message: `Book with id ${req.params.id} updated successfully`,
            data: findCurrentBook
        });
    } else {
        res.status(404).json({
            message: 'Book not found!'
        });
    };
});


// delete book
app.delete('/delete/:id', (req, res) => {
    const findIdxofCurrentBook = books.findIndex(item => item.id === req.params.id);
    if(findIdxofCurrentBook !== -1) {
        const deletedBook = books.splice(findIdxofCurrentBook, 1);
        res.status(200).json({
            message: 'Book deleted successfully',
            data: deletedBook
        });
    } else {
        res.status(404).json({
            message: 'Book not found'
        });
    };
});


const port = 3000;
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});