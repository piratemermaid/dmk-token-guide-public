const TABLES = require("../../data/tables");

exports.up = async function(knex) {
    await knex.schema.table(TABLES.EVENT_STORYLINE, function(table) {
        table.boolean("subtask");
    });
};

exports.down = async function(knex) {
    await knex.schema.table(TABLES.EVENT_STORYLINE, function(table) {
        table.dropColumn("subtask");
    });
};
