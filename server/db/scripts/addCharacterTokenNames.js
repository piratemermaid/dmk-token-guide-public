const { characterTokens } = require("../../data/characterData");
const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");

async function addCharacterTokenNames() {
    for (let token of characterTokens) {
        const { name, tokenType, tokenName } = token;
        if (tokenType === "token") {
            if (tokenName) {
                const lookup = await knex(TABLES.CHARACTER_TOKENS)
                    .where({
                        key: `${name}-${tokenType}`
                    })
                    .first();

                if (!lookup.tokenName) {
                    const id = lookup.id;
                    await knex(TABLES.CHARACTER_TOKENS)
                        .where({
                            key: `${name}-${tokenType}`
                        })
                        .update({ name: tokenName });

                    console.log("updated", name, "token name to", tokenName);
                }
            }
        }
    }

    console.log("done");
}

addCharacterTokenNames();
