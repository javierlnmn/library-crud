const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

router.get('/', async (req, res) => {
    const books = await queries.getAllBooks();
    const authors = await queries.getAllAuthors();
    res.render('books', { books, authors });
});

router.
    route('/new')
    .get(getAuthors, (req, res) => {
        req.error = false;
        res.render('create-book', { error: req.error, authors: req.authors });
    })
    .post(validateBook, getAuthors, async (req, res) => {
        if (!req.error) {
            let book = {};

            let title = req.body.title;
            book.title = title;

            let author_id = req.body.authorId;
            book.author_id = author_id;
            
            let date = req.body.date;
            book.date = date;

            await queries.insertBook(book);
            res.redirect('/books');
            return;
        }
        res.render('create-book', { error: req.error, authors: req.authors });
    });

router
    .route('/:id')
    .get(async (req, res) => {
        const book = await queries.getBook(req.params.id);
        book.author = await queries.getAuthor(book.author_id);
        res.render('book', { book });
    });

async function getAuthors(req, res, next) {
    req.authors = await queries.getAllAuthors();
    next();
}

function validateBook(req, res, next) {
    let pattern = /^.+?$/;
    if ( !pattern.test(req.body.title) || !pattern.test(req.body.authorId) || !pattern.test(req.body.date) ) {
        req.error = true;
    }
    next();
}

module.exports = router;