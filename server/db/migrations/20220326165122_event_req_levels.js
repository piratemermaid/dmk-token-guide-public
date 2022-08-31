const TABLES = require("../../data/tables");

exports.up = async function (knex) {
    await knex.schema.createTable(TABLES.EVENT_DATES, (table) => {
        table.increments("id");
        table.string("date");
    });

    await knex.schema.createTable(TABLES.EVENT_REQ_LEVELS, (table) => {
        table.increments("id");
        table.string("character_name");
        table.json("levels_by_date_id");
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(TABLES.EVENT_REQ_LEVELS);
    await knex.schema.dropTableIfExists(TABLES.EVENT_DATES);
};
