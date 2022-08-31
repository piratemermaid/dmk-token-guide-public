const TABLES = require("../../../data/tables");
const { knex } = require("../../../models/config");
const { characterTokens } = require("../../../data/characterData");

async function updateTokenNames() {
    const unnamedTokens = await knex(TABLES.CHARACTER_TOKENS).where({
        token_type_id: 1,
        name: null
    });

    for (let token of unnamedTokens) {
        const charName = token.key.split("-token")[0];
        const tokenName = characterTokens.filter((item) => {
            return item.name === charName && item.tokenType === "token";
        })[0].tokenName;

        if (tokenName) {
            await knex(TABLES.CHARACTER_TOKENS)
                .where({ id: token.id })
                .update({ name: tokenName });
            console.log(`Updated ${charName} token name to ${tokenName}`);
        }
    }
}

module.exports = updateTokenNames;
