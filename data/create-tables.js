// load connection string from .env
require('dotenv').config();
// "require" pg (after `npm i pg`)
const pg = require('pg');
// Use the pg Client
const Client = pg.Client;
// **note:** you will need to create the database!

// async/await needs to run in a function
run();

async function run() {
    // make a new pg client to the supplied url
    const client = new Client(process.env.DATABASE_URL);

    try {
        // initiate connecting to db
        await client.connect();
    
        // run a query to create tables
        await client.query(`
            CREATE TABLE genres (
                id SERIAL PRIMARY KEY NOT NU
                LL,
                genre VARCHAR(256) NOT NULL
            );

            CREATE TABLE books (
                id SERIAL PRIMARY KEY NOT NULL,
                title VARCHAR(256) NOT NULL,
                author VARCHAR(256) NOT NULL,
                pages INTEGER NOT NULL,
                is_hardback BOOLEAN NOT NULL,
                genre_id INTEGER NOT NULL REFERENCES genres(id),
                img VARCHAR(256) NOT NULL
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
    
}