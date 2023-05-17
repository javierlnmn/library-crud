

app.get('/books', (req, res) => {
    bookTable
        .select('*')
        .then((books) => {
            res.json(books);
        })
        .catch((error) => {
            console.error('Error retrieving books:', error);
            res.status(500).send('Failed to retrieve books');
        });
});