const { restart, reset } = require("nodemon");
const { knex } = require("../../../models/config");
const username = "userfoo";

async function fakeReset() {
    const user = await knex("users").where({ username }).first();

    await knex("users")
        .where({ id: user.id })
        .update({ reset_password_token: "1234" });

    console.log("Done - test at http://localhost:8080/reset/1234");
}

fakeReset();
