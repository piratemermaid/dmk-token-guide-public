const { knex } = require("../../../models/config");
const username = "testaccount";

async function resetForEmailVerifTest() {
    const user = await knex("users").where({ username }).first();

    await knex("users")
        .where({ id: user.id })
        .update({ new_email_token: "1234" });
    // .update({ old_email_token: "1234" });

    console.log(
        "Done - test at http://localhost:8080/verify_email_change/1234"
    );
}

resetForEmailVerifTest();
