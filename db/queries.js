const connection = require('./knex');

getAllBooks = () => {
    return connection('books').select('*');
};

getAllAuthors = () => {
    return connection('authors').select('*');
};

// Test function. This one wont be used in the app ----------
getBook = (id) => {
    return connection('books').select('*').where('id', id);
};
// ----------------------------------------------------------

deleteBook = (id) => {
    return connection('books').where('id', id).del();
}

deleteAuthor = (id) => {
    return connection('authors').where('id', id).del();
}

// When doing an update, to modify the data updated we just have to modify the book object
updateBook = (id, book) => {
    book.added = new Date().toISOString();
    return connection('books').where('id', id).update(book);
}

updateAuthor = (id, author) => {
    author.added = new Date().toISOString();
    return connection('authors').where('id', id).update(author);
}

module.exports = {
    getAllBooks: getAllBooks,
    getAllAuthors: getAllAuthors,
    deleteBook: deleteBook,
    deleteAuthor: deleteAuthor,
    updateBook: updateBook,
    updateAuthor: updateAuthor
}
