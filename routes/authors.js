const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

// const methodOverride = require('method-override');
// router.use(methodOverride('_method'));

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
    .route('/:id')
    .get(async (req, res) => {
        console.log('get');
        const author = await queries.getAuthor(req.params.id);
        author.books = await queries.getAuthorsBooks(req.params.id);
        res.render('author', { author });
    });
    // .delete(async (req, res) => {
    //     res.send('Borrando al autor con ID: ' + req.params.id);
    // });
    // .put((req, res) => {
    //     res.send('Actualizado al autor con ID: ' + req.params.id);
    // });

function validateAuthor(req, res, next) {
    if (req.body.name === null || req.body.name === '') {
        req.error = true;
    }
    next();
}

module.exports = router;