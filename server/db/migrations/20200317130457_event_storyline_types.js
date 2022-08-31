const TABLES = require("../../data/tables");

exports.up = async function(knex) {
    await knex.schema.table(TABLES.EVENT_STORYLINE, function(table) {
        table.string("requirement");
        table.integer("amount");
    });

    await knex.schema.createTable(
        TABLES.EVENT_STORYLINE_SPECIAL_TOKENS,
        function(table) {
            table.increments("id");
            table
                .integer("special_token_id")
                .references("id")
                .inTable(TABLES.SPECIAL_TOKENS)
                .onDelete("cascade");
            table
                .integer("event_storyline_id")
                .references("id")
                .inTable(TABLES.EVENT_STORYLINE)
                .onDelete("cascade");
            table.integer("amount");
        }
    );
};

exports.down = async function(knex) {
    await knex.schema.table(TABLES.EVENT_STORYLINE, function(table) {
        table.dropColumn("requirement");
        table.dropColumn("amount");
    });

    await knex.schema.dropTableIfExists(TABLES.EVENT_STORYLINE_SPECIAL_TOKENS);
};
