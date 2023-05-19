const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

router.get('/', async (req, res) => {
    const authors = await queries.getAllAuthors();
    res.render('authors', { authors });
});

router.
    route('/new')
    .get((req, res) => {
        req.error = false;
        res.render('create-author', { error: req.error });
    })
    .post(validateAuthor, async (req, res) => {
        if (req.error) {
            res.render('create-author', { error: req.error });
        } else {
            let author = {};
            let name = req.body.name;
            author.name = name;
            if (req.body.surname !== null && req.body.surname !== '') {
                let surname = req.body.surname;
                author.surname = surname
            }
            await queries.insertAuthor(author);
            res.redirect('/authors');
        }
    });

router
    .route('/:id')
    .get(async (req, res) => {
        const author = await queries.getAuthor(req.params.id);
        author.books = await queries.getAuthorsBooks(req.params.id);
        res.render('author', { author });
    })
    .put((req, res) => {
        res.send('Actualizado al autor con ID: ' + req.params.id);
    })
    .delete((req, res) => {
        res.send('Eliminado al autor con ID: ' + req.params.id);
    });

function validateAuthor(req, res, next) {
    console.log(req.body.name);
    if (req.body.name === null ||req.body.name === '') {
        req.error = true;
    }
    next();
}

module.exports = router;