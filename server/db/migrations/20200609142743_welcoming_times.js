exports.up = function (knex) {
    return knex.schema.table("characters", function (table) {
        table.string("welcome_time");
    });
};

exports.down = function (knex) {
    return knex.schema.table("characters", function (table) {
        table.dropColumn("welcome_time");
    });
};
