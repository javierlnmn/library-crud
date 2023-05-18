const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

router.get('/', async (req, res) => {
    const books = await queries.getAllBooks();
    const authors = await queries.getAllAuthors();
    res.render('books', { books, authors });
});

module.exports = router;