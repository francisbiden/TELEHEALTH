// config/db.js
/*
const mysql = require('mysql2');

// Create a connection pool with your MySQL configurations
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kabete@200',
    database: 'lifewell_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool for use in other parts of your application
module.exports = pool.promise();
*/

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;





