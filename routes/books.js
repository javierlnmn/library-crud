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
    })
    // .put((req, res) => {
    //     res.send('Actualizado al libro con ID: ' + req.params.id);
    // })
    // .delete((req, res) => {
    //     res.send('Eliminado al libro con ID: ' + req.params.id);
    // });

async function getAuthors(req, res, next) {
    req.authors = await queries.getAllAuthors();
    next();
}

function validateBook(req, res, next) {
    if (
        req.body.title === null || req.body.title === '' ||
        req.body.authorId === null || req.body.authorId === '' ||
        req.body.date === null || req.body.date === ''
    ) {
        req.error = true;
    }
    next();
}

module.exports = router;