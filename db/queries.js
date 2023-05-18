const connection = require('./knex');

getAllBooks = () => {
    return connection('book').select('*');
};

getAllAuthors = () => {
    return connection('author').select('*');
};

getBook = (id) => {
    return connection('book').select('*').where('id', id);
};

getAuthorsBooks = (id) => {
    return connection('book').select('*').where('author_id', parseInt(id));
};

getAuthor = (id) => {
    return connection('author').select('*').where('id', id);
};

deleteBook = (id) => {
    return connection('book').where('id', id).del();
}

deleteAuthor = (id) => {
    return connection('author').where('id', id).del();
}

// When doing an update, to modify the data updated we just have to modify the book object
updateBook = (id, book) => {
    book.added = new Date().toISOString();
    return connection('book').where('id', id).update(book);
}

updateAuthor = (id, author) => {
    author.added = new Date().toISOString();
    return connection('author').where('id', id).update(author);
}

module.exports = {
    getAllBooks: getAllBooks,
    getAllAuthors: getAllAuthors,
    getBook: getBook,
    getAuthorsBooks: getAuthorsBooks,
    getAuthor: getAuthor,
    deleteBook: deleteBook,
    deleteAuthor: deleteAuthor,
    updateBook: updateBook,
    updateAuthor: updateAuthor
}
