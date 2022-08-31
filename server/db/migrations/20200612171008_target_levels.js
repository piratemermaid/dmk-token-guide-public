exports.up = function (knex) {
    return knex.schema.table("users_characters", function (table) {
        table.integer("target_level");
    });
};

exports.down = function (knex) {
    return knex.schema.table("users_characters", function (table) {
        table.dropColumn("target_level");
    });
};
