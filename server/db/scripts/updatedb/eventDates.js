const _ = require("lodash");
const TABLES = require("../../../data/tables");
const EVENT = require("../../../data/eventData");
const { knex } = require("../../../models/config");

async function updateEventDates() {
    const { DATES } = EVENT;

    if (!DATES) {
        console.log("no event dates to update");
        return;
    }

    await knex(TABLES.EVENT_DATES).del();
    await knex.raw(
        `ALTER SEQUENCE ${TABLES.EVENT_DATES}_id_seq RESTART WITH 1`
    );

    const formatted = _.map(DATES, (date) => {
        return { date };
    });

    await knex(TABLES.EVENT_DATES).insert(formatted);

    console.log(`updated event dates`);
}

module.exports = updateEventDates;
