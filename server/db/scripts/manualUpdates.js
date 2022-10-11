const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");
const { CHARACTERS, BUILDINGS } = require("../../data/constants");

async function getId(table, attribute, name) {
    const id = await knex(table)
        .where({ [attribute]: name })
        .first()
        .then((x) => {
            if (!x) {
                console.log(">> not found:", x);
            }
            return x.id;
        });

    return id;
}

async function addCharacterToTask({ currentKey, newChar, level }) {
    const task_id = await getId(TABLES.TASKS, "key", currentKey);

    const character_id = await getId(TABLES.CHARACTERS, "name", newChar);

    await knex(TABLES.CHARACTERS_TO_TASKS).insert({
        character_id,
        task_id,
        level
    });

    const newKey = `${currentKey}-${newChar}`;

    await knex(TABLES.TASKS).where({ id: task_id }).update({
        key: newKey
    });

    console.log(`updated task- ${newKey}`);
}

// key = task_name-character
// e.g. "Introspection-Pocahontas"
// name here is the character's name
async function updateTaskCharacterLevel({ key, name, level }) {
    const task_id = await getId(TABLES.TASKS, "key", key);

    const character_id = await getId(TABLES.CHARACTERS, "name", name);

    await knex(TABLES.CHARACTERS_TO_TASKS)
        .where({
            character_id,
            task_id
        })
        .update({ level });

    console.log(`updated task - ${key} - ${name} level ${level}`);
}

/**
 *
 * @param {string} key: current task key
 * @param {string} newName: new task name
 * @param {string} newKey: new task key
 */
async function updateTaskName({ char1, char2, oldName, newName }) {
    const oldKey = !char2
        ? `${oldName}-${char1}`
        : `${oldName}-${char1}-${char2}`;

    const taskId = await knex(TABLES.TASKS).where({ key: oldKey }).first();

    if (!taskId) {
        console.log(`error updating task name: ${newKey}`);
        return;
    }

    const newKey = !char2
        ? `${newName}-${char1}`
        : `${newName}-${char1}-${char2}`;

    await knex(TABLES.TASKS)
        .where({ id: taskId })
        .update({ key: newKey, name: newName });

    console.log(`updated task name: ${newKey}`);
}

/**
 *
 * @param {string} key: current task key
 * @param {string} newTime: new task time
 */
async function updateTaskTime({ key, newTime }) {
    await knex(TABLES.TASKS).where({ key }).update({ time: newTime });

    console.log(`updated task time - ${key} - ${newTime}`);
}

async function fixTaskCharacter({
    wrong_key,
    correct_name,
    wrong_name,
    correct_key
}) {
    const task_id = await getId(TABLES.TASKS, "key", wrong_key);

    const correct_character_id = await getId(
        TABLES.CHARACTERS,
        "name",
        correct_name
    );

    const wrong_character_id = await getId(
        TABLES.CHARACTERS,
        "name",
        wrong_name
    );

    const wrong_task = await knex(TABLES.CHARACTERS_TO_TASKS)
        .where({
            task_id,
            character_id: wrong_character_id
        })
        .first();

    await knex(TABLES.CHARACTERS_TO_TASKS)
        .where({
            task_id,
            character_id: wrong_character_id
        })
        .del();

    await knex(TABLES.CHARACTERS_TO_TASKS).insert({
        task_id,
        character_id: correct_character_id,
        level: wrong_task.level
    });

    await knex(TABLES.TASKS).where({ id: task_id }).update({
        key: correct_key
    });

    console.log(`updated task - ${correct_key}`);
}

async function addCostume({ costume_name, character_name }) {
    const character_id = await getId("characters", "name", character_name);
    console.log(character_id);
}

// level can be null
async function updateTaskBuilding({ taskName, newBuildingName, level }) {
    const task = await knex("tasks").where({ name: taskName }).first();

    const building = await knex("buildings")
        .where({ name: newBuildingName })
        .first();

    await knex("tasks_buildings")
        .where({
            task_id: task.id
        })
        .del();

    await knex("tasks_buildings").insert({
        task_id: task.id,
        building_id: building.id,
        level
    });

    console.log(
        `Updated task ${taskName} - replaced building with ${newBuildingName}`
    );
}

async function manualUpdate() {
    await updateTaskCharacterLevel({
        key: `Attend a Ball-${CHARACTERS.CINDERELLA}-${CHARACTERS.CHARMING}`,
        name: CHARACTERS.CINDERELLA,
        level: 7
    });

    process.exit(0);
}

manualUpdate();
