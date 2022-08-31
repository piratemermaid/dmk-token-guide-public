const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");
const options = require("../../data/options");

async function verifyAllUsers() {
    const allUnverified = await knex(TABLES.USERS).where({ verified: false });

    for (let user of allUnverified) {
        const user_id = user.id;

        await knex(TABLES.USERS)
            .where({ id: user_id })
            .update({
                verified: true,
                verify_email_token: null,
                verify_email_token_expiry: null
            });

        for (let option of options) {
            const { name, defaultValue } = option;
            const option_id = await knex(TABLES.OPTIONS)
                .where({ name })
                .first()
                .then(option => {
                    return option.id;
                });

            await knex(TABLES.USER_OPTIONS).insert({
                user_id,
                option_id,
                value: defaultValue
            });
        }
        console.log(`user ${user.username} verified`);
    }

    console.log(`${allUnverified.length} users verified`);
}

// verifyAllUsers().then(() => {
//     console.log("verifications complete");
// });

module.exports = verifyAllUsers;
