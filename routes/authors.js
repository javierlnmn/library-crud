const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

router.get('/', async (req, res) => {
    const authors = await queries.getAllAuthors();
    res.render('authors', { authors });
});

router
    .route('/:id')
    .get(async (req, res) => {
        const author = await queries.getAuthor(req.params.id);
        author.books = await queries.getAuthorsBooks(req.params.id);
        console.log(author.books);
        res.render('author', { author });
    })
    .put((req, res) => {
        res.send('Actualizado al autor con ID: ' + req.params.id);
    })
    .delete((req, res) => {
        res.send('Eliminado al autor con ID: ' + req.params.id);
    });

module.exports = router;