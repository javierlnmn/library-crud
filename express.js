const express = require('express');
const app = express();
const port = 1200;

app.set('view engine', 'ejs');
// app.set('views', 'views-folder-name'); for if we wanted to use a custom one. views by default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.get('', (req, res) => {
    res.render('index', {});
});

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

// Start the server
app.listen(port, () => {
    console.clear();
    console.log(`Server's url: http://localhost:${port}/`);
});
