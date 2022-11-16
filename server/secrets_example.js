const DB_DEV = {
    host: "localhost",
    user: "user",
    password: "password",
    database: "dmktg",
    charset: "utf8"
};

const DB_PROD = {
    host: "localhost",
    user: "user",
    password: "password",
    database: "dmktg",
    charset: "utf8"
};

const HASH = {
    saltRounds: 12,
    password: "password"
};

const EMAIL = {
    API_KEY: "api_key",
    SENDER_ADDRESS: "no-reply@email.com",
    RECEIVE_ADDRESS: "email@email.com"
};

module.exports = { DB_DEV, DB_PROD, HASH, EMAIL };
