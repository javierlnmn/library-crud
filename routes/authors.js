const express = require('express');
const router = express.Router();
const queries = require('./../db/queries');

router.get('/', async (req, res) => {
    const authors = await queries.getAllAuthors();
    res.send(authors);
});

module.exports = router;