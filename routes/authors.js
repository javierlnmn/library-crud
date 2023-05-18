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
        author[0].books = await queries.getAuthorsBooks(req.params.id);
        res.render('author', {
            author: author[0]
        });
    })
    .put((req, res) => {
        res.send('Actualizado al autor con ID: ' + req.params.id);
    })
    .delete((req, res) => {
        res.send('Eliminado al autor con ID: ' + req.params.id);
    });

module.exports = router;