const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");

const username = "";
const email = "";

async function deleteUser() {
    const user = username
        ? await knex("users").where({ username }).first()
        : await knex("users").where({ email }).first();

    if (!user) {
        console.log("user does not exist");
        process.exit(0);
    }

    const user_id = user.id;

    await knex(TABLES.USERS_TO_CHARACTERS).where({ user_id }).del();
    await knex(TABLES.USERS_TO_BUILDINGS).where({ user_id }).del();
    await knex(TABLES.USERS_TO_CONCESSIONS).where({ user_id }).del();
    await knex(TABLES.USERS_TO_FLOATS).where({ user_id }).del();
    await knex(TABLES.USER_OPTIONS).where({ user_id }).del();

    await knex(TABLES.USERS).where({ id: user_id }).del();

    console.log("user deleted");
    process.exit(0);
}

deleteUser();
