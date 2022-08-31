const _ = require("lodash");
const TABLES = require("../../../data/tables");
const EVENT = require("../../../data/eventData");
const { knex } = require("../../../models/config");

async function updateEventReqLevels() {
    const { TYPE, CHARACTERS } = EVENT;

    if (TYPE !== "Regular") {
        console.log("no event req levels to update");
        return;
    }

    await knex(TABLES.EVENT_REQ_LEVELS).del();
    await knex.raw(
        `ALTER SEQUENCE ${TABLES.EVENT_REQ_LEVELS}_id_seq RESTART WITH 1`
    );

    const formatted = _.map(CHARACTERS, (char) => {
        console.log(char.req_levels);
        if (!char.premium && char.req_levels) {
            return {
                character_name: char.name,
                levels_by_date_id: char.req_levels
            };
        }
    });

    if (formatted.length === 0) {
        console.log("no event req levels updated");
    } else {
        await knex(TABLES.EVENT_REQ_LEVELS).insert(formatted);
        console.log("updated event req levels");
    }
}

module.exports = updateEventReqLevels;
