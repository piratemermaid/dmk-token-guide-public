exports.up = function (knex) {
    return knex.schema.table("character_tokens", function (table) {
        table.string("name");
    });
};

exports.down = function (knex) {
    return knex.schema.table("character_tokens", function (table) {
        table.dropColumn("name");
    });
};
