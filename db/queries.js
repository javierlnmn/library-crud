const connection = require('./knex');

getAllBooks = () => {
    return connection('book').select('*');
};

getAllAuthors = () => {
    return connection('author').select('*');
};

getBook = (id) => {
    return connection('book').select('*').where('id', id).first();
};

getAuthorsBooks = (id) => {
    return connection('book').select('*').where('author_id', id);
};

getAuthor = (id) => {
    return connection('author').select('*').where('id', id).first();
};

deleteBook = (id) => {
    return connection('book').where('id', id).del();
};

deleteAuthor = (id) => {
    return connection('author').where('id', id).del();
};

deleteAuthorsBooks = (id) => {
    return connection('book ').where('author_id', id).del();
};

// When doing an update, to modify the data updated we just have to modify the book object
updateBook = (id, book) => {
    return connection('book').where('id', id).update(book);
};

updateAuthor = (id, author) => {
    return connection('author').where('id', id).update(author);
};

insertBook = (book) => {
    return connection('book').insert(book);
};

insertAuthor = (author) => {
    return connection('author').insert(author);
};

module.exports = {
    getAllBooks: getAllBooks,
    getAllAuthors: getAllAuthors,
    getBook: getBook,
    getAuthorsBooks: getAuthorsBooks,
    getAuthor: getAuthor,
    deleteBook: deleteBook,
    deleteAuthor: deleteAuthor,
    deleteAuthorsBooks: deleteAuthorsBooks,
    updateBook: updateBook,
    updateAuthor: updateAuthor,
    insertBook: insertBook,
    insertAuthor: insertAuthor
}
