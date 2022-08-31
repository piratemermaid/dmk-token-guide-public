const TABLES = require("../../data/tables");

module.exports.up = async function(knex) {
    await knex.schema.createTable(TABLES.CHARACTER_GROUPS, table => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("key").notNullable();
        table.string("nickname");
        table.integer("order");
    });

    await knex.schema.createTable(TABLES.TOKEN_RARITY, table => {
        table.increments("id");
        table.string("name").notNullable();
    });

    await knex.schema.createTable(TABLES.TOKEN_TYPES, table => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("type").notNullable();
    });

    await knex.schema.createTable(TABLES.CHARACTERS, table => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("key").notNullable();
        table.string("nickname");
        table.jsonb("magic_costs");
        table.integer("order");
        table
            .integer("character_group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.CHARACTER_TOKENS, table => {
        table.increments("id");
        table.string("key");
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS)
            .onDelete("cascade");
        table
            .integer("token_type_id")
            .references("id")
            .inTable(TABLES.TOKEN_TYPES)
            .onDelete("cascade");
        table
            .integer("token_rarity_id")
            .references("id")
            .inTable(TABLES.TOKEN_RARITY)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.COSTUMES, table => {
        table.increments("id");
        table.string("key");
        table.string("name").notNullable();
        table.integer("order");
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.FABRIC_TOKENS, table => {
        table.increments("id");
        table.string("name");
        table
            .integer("token_rarity_id")
            .references("id")
            .inTable(TABLES.TOKEN_RARITY)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.COSTUMES_TO_FABRIC_TOKENS, table => {
        table.increments("id");
        table
            .integer("costume_id")
            .references("id")
            .inTable(TABLES.COSTUMES)
            .onDelete("cascade");
        table
            .integer("fabric_token_id")
            .references("id")
            .inTable(TABLES.FABRIC_TOKENS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.SPECIAL_TOKENS, table => {
        table.increments("id");
        table.string("name");
        table.string("key");
        table.string("mini_event");
        table
            .integer("token_rarity_id")
            .references("id")
            .inTable(TABLES.TOKEN_RARITY)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.BUILDINGS, table => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("key").notNullable();
        table.string("time");
        table.boolean("trophies");
        table.string("unlock_type");
        table.string("unlock_info");
        table.string("theme");
        table.string("group");
        table.string("enchantment_group");
    });

    await knex.schema.createTable(TABLES.TASKS, table => {
        table.increments("id");
        table.string("key");
        table.string("name");
        table.string("time");
        table.boolean("trophies");
    });

    await knex.schema.createTable(TABLES.CHARACTERS_TO_TASKS, table => {
        table.increments("id");
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("task_id")
            .references("id")
            .inTable(TABLES.TASKS)
            .onDelete("cascade")
            .notNullable();
        table.integer("level");
    });

    await knex.schema.createTable(TABLES.TASKS_TO_CHARACTER_TOKENS, table => {
        table.increments("id");
        table
            .integer("task_id")
            .references("id")
            .inTable(TABLES.TASKS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("character_token_id")
            .references("id")
            .inTable(TABLES.CHARACTER_TOKENS)
            .onDelete("cascade");
        // .notNullable();
    });

    await knex.schema.createTable(TABLES.TASKS_TO_GROUP_TOKENS, table => {
        table.increments("id");
        table
            .integer("task_id")
            .references("id")
            .inTable(TABLES.TASKS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.TASKS_TO_FABRIC_TOKENS, table => {
        table.increments("id");
        table
            .integer("task_id")
            .references("id")
            .inTable(TABLES.TASKS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("fabric_token_id")
            .references("id")
            .inTable(TABLES.FABRIC_TOKENS)
            .onDelete("cascade");
        // .notNullable();
    });

    await knex.schema.createTable(TABLES.TASKS_TO_SPECIAL_TOKENS, table => {
        table.increments("id");
        table
            .integer("task_id")
            .references("id")
            .inTable(TABLES.TASKS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("special_token_id")
            .references("id")
            .inTable(TABLES.SPECIAL_TOKENS)
            .onDelete("cascade");
        // .notNullable();
    });

    await knex.schema.createTable(
        TABLES.BUILDINGS_TO_CHARACTER_TOKENS,
        table => {
            table.increments("id");
            table.integer("level");
            table
                .integer("building_id")
                .references("id")
                .inTable(TABLES.BUILDINGS)
                .onDelete("cascade")
                .notNullable();
            table
                .integer("character_token_id")
                .references("id")
                .inTable(TABLES.CHARACTER_TOKENS)
                .onDelete("cascade");
            // .notNullable();
        }
    );

    await knex.schema.createTable(TABLES.BUILDINGS_TO_GROUP_TOKENS, table => {
        table.increments("id");
        table.integer("level");
        table
            .integer("building_id")
            .references("id")
            .inTable(TABLES.BUILDINGS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.BUILDINGS_TO_FABRIC_TOKENS, table => {
        table.increments("id");
        table.integer("level");
        table
            .integer("building_id")
            .references("id")
            .inTable(TABLES.BUILDINGS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("fabric_token_id")
            .references("id")
            .inTable(TABLES.FABRIC_TOKENS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.BUILDINGS_TO_SPECIAL_TOKENS, table => {
        table.increments("id");
        table.integer("level");
        table
            .integer("building_id")
            .references("id")
            .inTable(TABLES.BUILDINGS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("special_token_id")
            .references("id")
            .inTable(TABLES.SPECIAL_TOKENS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.FLOATS_TO_CHARACTER_TOKENS, table => {
        table.increments("id");
        table
            .integer("group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("character_token_id")
            .references("id")
            .inTable(TABLES.CHARACTER_TOKENS)
            .onDelete("cascade");
        // .notNullable();
    });

    await knex.schema.createTable(TABLES.FLOATS_TO_GROUP_TOKENS, table => {
        table.increments("id");
        table
            .integer("group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("group_token_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade")
            .notNullable();
    });

    await knex.schema.createTable(TABLES.FLOATS_TO_SPECIAL_TOKENS, table => {
        table.increments("id");
        table
            .integer("special_token_id")
            .references("id")
            .inTable(TABLES.SPECIAL_TOKENS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade")
            .notNullable();
    });

    await knex.schema.createTable(TABLES.TASK_BUILDING_REQUIREMENTS, table => {
        table.increments("id");
        table.integer("level");
        table
            .integer("building_id")
            .references("id")
            .inTable(TABLES.BUILDINGS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("task_id")
            .references("id")
            .inTable(TABLES.TASKS)
            .onDelete("cascade");
        // .notNullable();
    });

    await knex.schema.createTable(TABLES.TASK_COSTUME_REQUIREMENTS, table => {
        table.increments("id");
        table
            .integer("costume_id")
            .references("id")
            .inTable(TABLES.COSTUMES)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("task_id")
            .references("id")
            .inTable(TABLES.TASKS)
            .onDelete("cascade");
        // .notNullable();
    });

    await knex.schema.createTable(TABLES.CONCESSIONS, table => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("key").notNullable();
        table.string("time");
        table.integer("magic");
        table.string("category");
        table.string("obtain");
        table.string("group");
        table.integer("rarity");
        table.integer("order");
    });

    await knex.schema.createTable(TABLES.USERS, table => {
        table
            .increments("id")
            .unsigned()
            .primary();
        table
            .string("username")
            .unique()
            .notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.string("sessionId");
        table.string("reset_password_token");
        table.timestamp("reset_token_expiry");
    });

    await knex.schema.createTable(TABLES.USERS_TO_CHARACTERS, table => {
        table.increments("id");
        table.integer("level");
        table.boolean("ready");
        table.boolean("favorite");
        table
            .integer("user_id")
            .references("id")
            .inTable(TABLES.USERS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS)
            .onDelete("cascade")
            .notNullable();
    });

    await knex.schema.createTable(TABLES.USERS_TO_BUILDINGS, table => {
        table.increments("id");
        table.integer("level");
        table
            .integer("user_id")
            .references("id")
            .inTable(TABLES.USERS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("building_id")
            .references("id")
            .inTable(TABLES.BUILDINGS)
            .onDelete("cascade")
            .notNullable();
    });

    await knex.schema.createTable(TABLES.USERS_TO_COSTUMES, table => {
        table.increments("id");
        table
            .integer("user_id")
            .references("id")
            .inTable(TABLES.USERS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("costume_id")
            .references("id")
            .inTable(TABLES.COSTUMES)
            .onDelete("cascade")
            .notNullable();
    });

    await knex.schema.createTable(TABLES.USERS_TO_FLOATS, table => {
        table.increments("id");
        table
            .integer("user_id")
            .references("id")
            .inTable(TABLES.USERS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("character_group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade")
            .notNullable();
    });

    await knex.schema.createTable(TABLES.OPTIONS, table => {
        table.increments("id");
        table.string("name");
        table.string("type");
        table.boolean("defaultValue");
    });

    await knex.schema.createTable(TABLES.USER_OPTIONS, table => {
        table.increments("id");
        table.boolean("value");
        table
            .integer("user_id")
            .references("id")
            .inTable(TABLES.USERS)
            .onDelete("cascade")
            .notNullable();
        table
            .integer("option_id")
            .references("id")
            .inTable(TABLES.OPTIONS)
            .onDelete("cascade")
            .notNullable();
    });

    await knex.schema.createTable(TABLES.USERS_TO_CONCESSIONS, table => {
        table.increments("id");
        table
            .integer("concession_id")
            .references("id")
            .inTable(TABLES.CONCESSIONS)
            .onDelete("cascade");
        table
            .integer("user_id")
            .references("id")
            .inTable(TABLES.USERS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.EVENT, table => {
        table.increments("id");
        table.string("name");
        table.string("type");
    });

    await knex.schema.createTable(TABLES.EVENT_CHARACTERS, table => {
        table.increments("id");
        table.boolean("premium");
        table.integer("req_level");
        table.integer("chapter");
        table.integer("row");
        table.boolean("featured");
        table
            .integer("event_id")
            .references("id")
            .inTable(TABLES.EVENT)
            .onDelete("cascade");
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.EVENT_GROUPS, table => {
        table.increments("id");
        table.string("type");
        table.integer("chapter");
        table
            .integer("event_id")
            .references("id")
            .inTable(TABLES.EVENT)
            .onDelete("cascade");
        table
            .integer("character_group_id")
            .references("id")
            .inTable(TABLES.CHARACTER_GROUPS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.EVENT_SPECIAL_TOKENS, table => {
        table.increments("id");
        table
            .integer("event_id")
            .references("id")
            .inTable(TABLES.EVENT)
            .onDelete("cascade");
        table
            .integer("special_token_id")
            .references("id")
            .inTable(TABLES.SPECIAL_TOKENS)
            .onDelete("cascade");
    });

    await knex.schema.createTable(TABLES.TC_PLANNER, table => {
        table.increments("id");
        table
            .integer("user_id")
            .references("id")
            .inTable(TABLES.USERS)
            .onDelete("cascade");
        table
            .integer("character_id")
            .references("id")
            .inTable(TABLES.CHARACTERS)
            .onDelete("cascade");
        table.boolean("tired");
    });
};

module.exports.down = async function(knex) {
    const tableOrder = [
        TABLES.TC_PLANNER,
        TABLES.EVENT_SPECIAL_TOKENS,
        TABLES.EVENT_GROUPS,
        TABLES.EVENT_CHARACTERS,
        TABLES.EVENT,
        TABLES.USER_OPTIONS,
        TABLES.USERS_TO_CONCESSIONS,
        TABLES.OPTIONS,
        TABLES.USERS_TO_FLOATS,
        TABLES.USERS_TO_COSTUMES,
        TABLES.USERS_TO_BUILDINGS,
        TABLES.USERS_TO_CHARACTERS,
        TABLES.USERS,
        TABLES.TASK_COSTUME_REQUIREMENTS,
        TABLES.TASK_BUILDING_REQUIREMENTS,
        TABLES.FLOATS_TO_CHARACTER_TOKENS,
        TABLES.FLOATS_TO_GROUP_TOKENS,
        TABLES.FLOATS_TO_SPECIAL_TOKENS,
        TABLES.BUILDINGS_TO_SPECIAL_TOKENS,
        TABLES.BUILDINGS_TO_FABRIC_TOKENS,
        TABLES.BUILDINGS_TO_GROUP_TOKENS,
        TABLES.BUILDINGS_TO_CHARACTER_TOKENS,
        TABLES.TASKS_TO_SPECIAL_TOKENS,
        TABLES.TASKS_TO_FABRIC_TOKENS,
        TABLES.TASKS_TO_GROUP_TOKENS,
        TABLES.TASKS_TO_CHARACTER_TOKENS,
        TABLES.CHARACTERS_TO_TASKS,
        TABLES.CONCESSIONS,
        TABLES.TASKS,
        TABLES.BUILDINGS,
        TABLES.SPECIAL_TOKENS,
        TABLES.COSTUMES_TO_FABRIC_TOKENS,
        TABLES.FABRIC_TOKENS,
        TABLES.COSTUMES,
        TABLES.CHARACTER_TOKENS,
        TABLES.CHARACTERS,
        TABLES.TOKEN_TYPES,
        TABLES.TOKEN_RARITY,
        TABLES.CHARACTER_GROUPS
    ];
    for (let i in tableOrder) {
        await knex.schema.dropTableIfExists(tableOrder[i]);
    }
};
