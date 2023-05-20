const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

// const methodOverride = require('method-override');
// router.use(methodOverride('_method'));

router.get('/', async (req, res) => {
    const authors = await queries.getAllAuthors();
    res.render('authors', { authors });
});

router
    .route('/new')
    .get((req, res) => {
        req.error = false;
        res.render('create-author', { error: req.error });
    })
    .post(validateAuthor, async (req, res) => {
        if (!req.error) {
            let author = {};
            
            let name = req.body.name;
            author.name = name;

            let surname = req.body.surname;
            author.surname = surname
            
            await queries.insertAuthor(author);
            res.redirect('/authors');
            return;
        }
        res.render('create-author', { error: req.error });
    });

router
    .route('/:id/delete')
    .get(async (req, res) => {
        let authorId = req.params.id;
        await queries.deleteAuthorsBooks(authorId);
        await queries.deleteAuthor(authorId);
        res.redirect('/authors');
    });

router
    .route('/:id')
    .get(async (req, res) => {
        const author = await queries.getAuthor(req.params.id);
        author.books = await queries.getAuthorsBooks(req.params.id);
        res.render('author', { author });
    });



function validateAuthor(req, res, next) {
    let pattern = /^.+?$/;
    if ( !pattern.test(req.body.name) ) {
        req.error = true;
    }
    next();
}

module.exports = router;