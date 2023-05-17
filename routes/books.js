const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

router.get('/', async (req, res) => {
    const books = await queries.getAllBooks();
    res.send(books);
});

module.exports = router;