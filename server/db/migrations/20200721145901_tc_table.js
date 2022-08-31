const TABLES = require("../../data/tables");

exports.up = async function (knex) {
    await knex.schema.createTable(TABLES.TC, (table) => {
        table.increments("id");
        table.integer("number");
        table.string("grand_prize");
    });

    await knex.schema.createTable(TABLES.TC_PRIZES, (table) => {
        table.increments("id");
        table.integer("tc_id").references("id").inTable(TABLES.TC);
        table.string("name");
        table.integer("cost");
        table.string("currency");
    });

    await knex.schema.createTable(TABLES.TC_CHARACTERS, (table) => {
        table.increments("id");
        table.integer("tc_id").references("id").inTable(TABLES.TC);
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS);
        table.integer("chapter");
        table.integer("row");
        table.boolean("featured");
    });

    await knex.schema.createTable(TABLES.TC_REFRESH_TOKEN_TASKS, (table) => {
        table.increments("id");
        table.integer("tc_id").references("id").inTable(TABLES.TC);
        table.integer("task_id").references("id").inTable(TABLES.TASKS);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(TABLES.TC_REFRESH_TOKEN_TASKS);
    await knex.schema.dropTableIfExists(TABLES.TC_CHARACTERS);
    await knex.schema.dropTableIfExists(TABLES.TC_PRIZES);
    await knex.schema.dropTableIfExists(TABLES.TC);
};
