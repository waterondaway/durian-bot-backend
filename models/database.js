const mysql = require('mysql2/promise');

// Create a connection to the MySQL database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'durian_db',
    waitForConnections: true,  // To wait if no connection is available
    connectionLimit: 10,  // Number of concurrent connections allowed
    queueLimit: 0         // No limit on queued connections
});

connection.getConnection()
    .then(() => {
        console.log('Connected to the MySQL database!');
    })
    .catch(err => {
        console.error('Error connecting to the MySQL database:', err);
    });

module.exports = connection;
