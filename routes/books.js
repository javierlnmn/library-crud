const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

router.get('/', async (req, res) => {
    const books = await queries.getAllBooks();
    const authors = await queries.getAllAuthors();
    res.render('books', { books, authors });
});

router
    .route('/:id')
    .get(async (req, res) => {
        const author = await queries.getAllAuthors();
        res.render('book', book);
    })
    .put((req, res) => {
        res.send('Actualizado al libro con ID: ' + req.params.id);
    })
    .delete((req, res) => {
        res.send('Eliminado al libro con ID: ' + req.params.id);
    });

module.exports = router;