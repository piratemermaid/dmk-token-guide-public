exports.up = function (knex) {
    return knex.schema.table("users", function (table) {
        table.boolean("admin");
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (table) {
        table.dropColumn("admin");
    });
};
