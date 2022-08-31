const TABLES = require("../../../data/tables");
const { knex } = require("../../../models/config");
const { charactersTasks } = require("../../../data/taskData");

/**
 * This script is a workaround for new tasks
 * not adding characters. The updatedb script should
 * be updated to fix this
 */

async function newTaskChars() {
    for (let task of charactersTasks) {
        const { name, character_name, key, level } = task;

        const character_id = await knex(TABLES.CHARACTERS)
            .where({ name: character_name })
            .first()
            .then((char) => {
                return char.id;
            });

        const task_id = await knex(TABLES.TASKS)
            .where({ key })
            .first()
            .then((task) => {
                return task.id;
            });

        const exists = await knex(TABLES.CHARACTERS_TO_TASKS)
            .where({ character_id, task_id })
            .first()
            .then((found) => {
                return found;
            });

        if (!exists) {
            await knex(TABLES.CHARACTERS_TO_TASKS)
                .insert({
                    character_id,
                    task_id,
                    level: level || null
                })
                .then(() => {
                    console.log(`added ${character_name} to ${name}`);
                });
        }
    }
}

module.exports = newTaskChars;
