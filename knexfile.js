export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './todo.db' // path to your SQLite database file
    },
    useNullAsDefault: true, // SQLite requires this configuration
    migrations: {
      directory: './db/migrations' // directory for your migration files
    }
  }
};
