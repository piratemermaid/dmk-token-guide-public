// Update with your config settings.
const { DB_DEV, DB_PROD } = require("./secrets");

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: DB_DEV.host,
            user: DB_DEV.user,
            password: DB_DEV.password,
            database: DB_DEV.database,
            charset: "utf8"
        },
        migrations: {
            directory: __dirname + "/db/migrations"
        },
        seeds: {
            directory: __dirname + "/db/seeds"
        }
    },

    staging: {
        client: "pg",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    production: {
        client: "pg",
        connection: {
            host: DB_PROD.host,
            user: DB_PROD.user,
            password: DB_PROD.password,
            database: DB_PROD.database,
            charset: "utf8"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
