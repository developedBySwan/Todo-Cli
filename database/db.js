import sqlite3 from 'sqlite3'

const DB_PATH = "./../todo.db"

// Create a new database object
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Handle database errors
db.on('error', (err) => {
    console.error('Database error:', err.message);
});

// Close the database connection when the application exits
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
            process.exit(0);
        }
    });
});

export default db;