const TABLES = require("../../data/tables");

exports.up = async function(knex) {
    await knex.schema.createTable(TABLES.EVENT_STORYLINE, function(table) {
        table.increments("id");
        table.string("key").notNullable();
        table.string("type").notNullable();
        table.string("date").notNullable();
        table.string("time");
        table.string("name");
        table.integer("EC");
        table.integer("common");
        table.integer("token");
        table.integer("ears");
        table.integer("order").notNullable();
    });

    await knex.schema.createTable(TABLES.EVENT_STORYLINE_CHARACTERS, function(
        table
    ) {
        table.increments("id");
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS)
            .onDelete("cascade");
        table
            .integer("event_storyline_id")
            .references("id")
            .inTable(TABLES.EVENT_STORYLINE)
            .onDelete("cascade");
        table.integer("level");
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists(TABLES.EVENT_STORYLINE_CHARACTERS);
    await knex.schema.dropTableIfExists(TABLES.EVENT_STORYLINE);
};
