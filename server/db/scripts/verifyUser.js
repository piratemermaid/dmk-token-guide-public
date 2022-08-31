const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");
const options = require("../../data/options");

const usernames = ["testaccount"];

async function verifyUser() {
    for (let username of usernames) {
        const user_id = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                if (!user) {
                    console.log(`user ${username} not found`);
                    return;
                }
                return user.id;
            });

        if (user_id) {
            await knex(TABLES.USERS).where({ username }).update({
                verified: true,
                verify_email_token: null,
                verify_email_token_expiry: null
            });

            for (let option of options) {
                const { name, defaultValue } = option;
                const option_id = await knex(TABLES.OPTIONS)
                    .where({ name })
                    .first()
                    .then((option) => {
                        return option.id;
                    });

                await knex(TABLES.USER_OPTIONS).insert({
                    user_id,
                    option_id,
                    value: defaultValue
                });
            }
            console.log(`user ${username} verified`);
        }
    }
}

verifyUser().then(() => {
    console.log("verification complete");
});
