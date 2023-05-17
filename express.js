const express = require('express');
const app = express();
const port = 1200;
const pagesDir = __dirname + '/pages/';

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.get('', (req, res) => {
    res.sendFile(`${pagesDir}`);
});

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}\nServer's url: http://localhost:${port}/`);
});
