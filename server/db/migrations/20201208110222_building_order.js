exports.up = function (knex) {
    return knex.schema.table("buildings", function (table) {
        table.integer("order");
    });
};

exports.down = function (knex) {
    return knex.schema.table("buildings", function (table) {
        table.dropColumn("order");
    });
};
