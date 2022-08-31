exports.up = function (knex) {
    return knex.schema.table("dev_notes", function (table) {
        table.string("date");
        table.dropColumn("latest");
        table.dropColumn("created_at");
    });
};

exports.down = function (knex) {
    return knex.schema.table("dev_notes", function (table) {
        table.dropColumn("date");
        table.boolean("latest");
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
};
