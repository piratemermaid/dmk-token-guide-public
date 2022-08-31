if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
}
const knexconfig = require("../knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexconfig);
const bookshelf = require("bookshelf")(knex);
const jsonApiParams = require("bookshelf-jsonapi-params");
bookshelf.plugin(jsonApiParams);

module.exports = {
    bookshelf,
    knex,
    knexconfig,
    models: bookshelf.registry.models
};
