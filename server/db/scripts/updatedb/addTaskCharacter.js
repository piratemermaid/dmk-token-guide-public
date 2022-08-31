const TABLES = require("../../../data/tables");
const { knex } = require("../../../models/config");

const oldTaskData = {
    // name: "Build a Snowman",
    // characters: [
    //     {
    //         name: "Mickey Mouse",
    //         level: 2
    //     }
    // ]
};

const newCharacter = {
    // name: "Minnie Mouse", level: 3
};

async function addTaskCharacter() {
    if (
        !oldTaskData.hasOwnProperty("name") ||
        !newCharacter.hasOwnProperty("name")
    ) {
        return;
    }
    const taskName = oldTaskData.name;
    const oldCharName = oldTaskData.characters[0].name;
    const newCharName = newCharacter.name;

    const taskId = await knex(TABLES.TASKS)
        .where({ key: `${taskName}-${oldCharName}` })
        .first()
        .then(task => {
            return task.id;
        });

    const oldCharId = await knex(TABLES.CHARACTERS)
        .where({ name: oldCharName })
        .first()
        .then(char => {
            return char.id;
        });

    const newCharId = await knex(TABLES.CHARACTERS)
        .where({ name: newCharName })
        .first()
        .then(char => {
            return char.id;
        });

    const newKey = `${taskName}-${oldCharName}-${newCharName}`;

    // update original entry key in tasks table
    await knex(TABLES.TASKS)
        .where({ id: taskId })
        .update({ key: newKey });

    // add new entry in characters_tasks table
    await knex(TABLES.CHARACTERS_TO_TASKS).insert({
        character_id: newCharId,
        task_id: taskId,
        level: newCharacter.level
    });

    console.log(`updated task ${taskName}`);
}

module.exports = addTaskCharacter;
