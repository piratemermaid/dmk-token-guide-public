const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");
const tcInfo = require("../../data/towerChallenges");

async function updateTCInfo() {
    await knex(TABLES.TC_PRIZES).del();
    await knex(TABLES.TC_CHARACTERS).del();
    await knex(TABLES.TC_REFRESH_TOKEN_TASKS).del();
    await knex(TABLES.TC).del();

    for (let number in tcInfo) {
        const {
            dateSpan,
            grand_prize,
            prizes,
            characters,
            refresh_token_tasks
        } = tcInfo[number];

        const tc_exists = await knex(TABLES.TC).where({ number }).first();

        if (!tc_exists) {
            const tc_insert = await knex(TABLES.TC)
                .insert({ number, grand_prize, dateSpan })
                .returning("*");
            const tc_id = tc_insert[0].id;

            for (let prize of prizes) {
                const { name, cost } = prize;
                const { amt, currency } = cost;

                await knex(TABLES.TC_PRIZES).insert({
                    tc_id,
                    name,
                    cost: amt,
                    currency
                });
            }

            for (let char of characters) {
                const { name, chapter, row, featured } = char;

                const character_id = await knex(TABLES.CHARACTERS)
                    .where({ name })
                    .first()
                    .then((result) => {
                        if (!result || !result.id) {
                            console.log("no result for", name);
                        }
                        return result.id;
                    });

                await knex(TABLES.TC_CHARACTERS).insert({
                    character_id,
                    tc_id,
                    chapter,
                    row,
                    featured: featured || false
                });
            }

            for (let task_key of refresh_token_tasks) {
                const task_id = await knex(TABLES.TASKS)
                    .where({ key: task_key })
                    .first()
                    .then((result) => {
                        if (!result || !result.id) {
                            console.log("no result for", task_key);
                        }
                        return result.id;
                    });

                await knex(TABLES.TC_REFRESH_TOKEN_TASKS).insert({
                    tc_id,
                    task_id
                });
            }

            console.log(`added TC #${number}`);
        }
    }

    console.log("done");
    process.exit(0);
}

updateTCInfo();
