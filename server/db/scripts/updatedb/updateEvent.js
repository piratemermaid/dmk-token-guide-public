const _ = require("lodash");
const EVENT = require("../../../data/eventData");
const TABLES = require("../../../data/tables");
const { knex } = require("../../../models/config");

async function updateEvent() {
    await removeEvent();

    if (EVENT.NAME) {
        await addNewEvent();
    }

    if (EVENT.GROUPS.length > 0) {
        addEventGroups();
    }

    if (EVENT.CHARACTERS.length > 0) {
        addEventCharacters();
    }

    if (EVENT.SPECIAL_TOKENS.length > 0) {
        addEventSpecialTokens();
    }
}

async function removeEvent() {
    await knex(TABLES.EVENT)
        .where({ id: 1 })
        .update({ name: "", type: "" });
    await knex(TABLES.EVENT_GROUPS)
        .where({ event_id: 1 })
        .del();
    await knex(TABLES.EVENT_CHARACTERS)
        .where({ event_id: 1 })
        .del();
    await knex(TABLES.EVENT_SPECIAL_TOKENS)
        .where({ event_id: 1 })
        .del();
}

async function addNewEvent() {
    const { NAME, TYPE } = EVENT;
    await knex(TABLES.EVENT)
        .where({ id: 1 })
        .update({
            name: NAME,
            type: TYPE
        });

    console.log("added new event - ", NAME, " - ", TYPE);
}

async function addEventGroups() {
    const { GROUPS } = EVENT;

    const groupsByName = _.keyBy(
        await knex(TABLES.CHARACTER_GROUPS).returning("*"),
        "name"
    );

    await knex(TABLES.EVENT_GROUPS).insert(
        GROUPS.map(({ name, type, chapter }) => {
            return {
                event_id: 1,
                type: type || null,
                chapter: chapter || null,
                character_group_id: groupsByName[name].id
            };
        })
    );

    console.log("added event groups");
}

async function addEventCharacters() {
    const { CHARACTERS } = EVENT;

    const charactersByName = _.keyBy(
        await knex(TABLES.CHARACTERS).returning("*"),
        "name"
    );

    await knex(TABLES.EVENT_CHARACTERS).insert(
        CHARACTERS.map(
            ({ name, premium, req_level, chapter, row, featured }) => {
                return {
                    event_id: 1,
                    character_id: charactersByName[name].id,
                    premium: premium || null,
                    req_level: req_level || null,
                    chapter: chapter || null,
                    row: row || null,
                    featured: featured || null
                };
            }
        )
    );

    console.log("added event characters");
}

async function addEventSpecialTokens() {
    const { SPECIAL_TOKENS } = EVENT;

    const specialTokensByName = _.keyBy(
        await knex(TABLES.SPECIAL_TOKENS).returning("*"),
        "name"
    );

    await knex(TABLES.EVENT_SPECIAL_TOKENS).insert(
        SPECIAL_TOKENS.map(name => {
            return {
                event_id: 1,
                special_token_id: specialTokensByName[name].id
            };
        })
    );

    console.log("added event special tokens");
}

module.exports = updateEvent;
