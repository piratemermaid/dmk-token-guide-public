const TABLES = require("../../../data/tables");
const { knex } = require("../../../models/config");
const welcomeTimes = require("../../../data/welcomeTimes");

async function updateWelcomeTimes() {
    for (let char in welcomeTimes) {
        const time = welcomeTimes[char];

        const existing = await knex(TABLES.CHARACTERS)
            .where({ name: char })
            .first();

        if (!existing.welcome_time || existing.welcome_time !== time) {
            await knex(TABLES.CHARACTERS)
                .where({ name: char })
                .update({ welcome_time: time });

            console.log("updated welcome time for", char, "to", time);
        }
    }
}

updateWelcomeTimes();
// module.exports = updateWelcomeTimes;
