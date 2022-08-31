exports.up = function(knex) {
    return knex.schema.createTable("dev_notes", function(table) {
        table.increments("id");
        table.string("type");
        table.string("desc");
        table.boolean("done");
        table.boolean("latest");
        table.boolean("inProgress");
        table
            .timestamp("created_at")
            .defaultTo(knex.fn.now())
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("dev_notes");
};
