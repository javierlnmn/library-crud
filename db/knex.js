const knex = require('knex');

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: 'db.sqlite3'
    }
});


module.exports = connection;