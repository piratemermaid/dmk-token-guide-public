exports.up = function(knex) {
    return knex.schema.table("dev_notes", function(table) {
        table.integer("order");
    });
};

exports.down = function(knex) {
    return knex.schema.table("dev_notes", function(table) {
        table.dropColumn("order");
    });
};
