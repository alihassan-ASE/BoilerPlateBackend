const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'reactnative',
    port: 4500
});

client.on('error', (err) => {
    console.error('Database connection error:', err);
});

client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = client;
