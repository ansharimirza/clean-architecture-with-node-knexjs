module.exports = {
  development: {
    client: "pg",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "smkyadika2",
        database: "basic-shop",
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: 'src/frameworks/database/knex/migrations',
    }
  },
};
