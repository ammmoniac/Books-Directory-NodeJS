const express = require('express');
const router = express.Router();
const books = require('./books');

let booksDirectory = books;

router.get('/books', (req, res) => {
    res.send(booksDirectory);
});

router.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = booksDirectory.find((b) => b.isbn === id);
    return book ? res.send(book) : res.status(404).send('The book does not exist');
});

router.post('/books', (req, res) => {
    const book = req.body;
    const bookExists = booksDirectory.find((b) => b.isbn === book.isbn);
    return bookExists ? res.status(400).send('The book already exists') : (
        booksDirectory.push(book),
            res.status(201).send(book)
    );
});

router.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = booksDirectory.findIndex((b) => b.isbn === id);
    if (bookIndex === -1) {
        return res.status(404).send('The book does not exist');
    }

    const updatedBook = { ...booksDirectory[bookIndex], ...req.body };
    booksDirectory[bookIndex] = updatedBook;
    return res.send(updatedBook);
});

router.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = booksDirectory.findIndex((b) => b.isbn === id);
    if (bookIndex === -1) {
        return res.status(404).send('The book does not exist');
    }

    booksDirectory.splice(bookIndex, 1);
    return res.send('Success');
});

module.exports = router;