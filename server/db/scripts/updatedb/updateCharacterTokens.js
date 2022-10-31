const TABLES = require("../../../data/tables");
const { knex } = require("../../../models/config");
const { CHARACTERS } = require("../../../data/constants");

const ids = {
    C: 1,
    U: 2,
    R: 3,
    E: 4,
    L: 5,
    token: 1,
    ears: 2,
    N: null
};

/**
 * update new characters and update token rarities for existing characters
 */

const characterTokenData = [
    { name: CHARACTERS.WINIFRED_SANDERSON, token: "E", ears: "L" },
    { name: CHARACTERS.MARY_SANDERSON, token: "U", ears: "R" },
    { name: CHARACTERS.SARAH_SANDERSON, token: "C", ears: "C" },
    { name: CHARACTERS.DR_FINKELSTEIN, token: "C", ears: "U" },
    { name: CHARACTERS.MAURICE, token: "R", ears: "E" }
];

if (characterTokenData.length > 0) {
    updateCharacterTokens();
}

async function updateCharacterTokens() {
    for (let char of characterTokenData) {
        const { name, token, ears } = char;
        const character_id = await knex(TABLES.CHARACTERS)
            .where({ name })
            .first()
            .then((character) => {
                if (!character) {
                    console.log(
                        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
                        name
                    );
                }
                return character.id;
            });

        const charTokenId = await knex(TABLES.CHARACTER_TOKENS)
            .where({
                character_id,
                token_type_id: 1
            })
            .first()
            .then((token) => {
                if (token) {
                    return token.id;
                } else {
                    return null;
                }
            });

        if (charTokenId) {
            await knex(TABLES.CHARACTER_TOKENS)
                .where({ id: charTokenId })
                .update({ token_rarity_id: ids[token] })
                .then(() => {
                    `updated ${name} token rarity`;
                });
        } else {
            await knex(TABLES.CHARACTER_TOKENS)
                .where({ id: charTokenId })
                .insert({
                    character_id,
                    key: `${name}-token`,
                    token_rarity_id: ids[token],
                    token_type_id: 1
                })
                .then(() => {
                    console.log(`added ${name} token`);
                });
        }

        const charEarsId = await knex(TABLES.CHARACTER_TOKENS)
            .where({
                character_id,
                token_type_id: 2
            })
            .first()
            .then((token) => {
                if (token) {
                    return token.id;
                } else {
                    return null;
                }
            });

        if (charEarsId) {
            await knex(TABLES.CHARACTER_TOKENS)
                .where({ id: charEarsId })
                .update({ token_rarity_id: ids[ears] })
                .then(() => {
                    `updated ${name} token rarity`;
                });
        } else {
            await knex(TABLES.CHARACTER_TOKENS)
                .where({ id: charEarsId })
                .insert({
                    character_id,
                    key: `${name}-ears`,
                    token_rarity_id: ids[ears],
                    token_type_id: 2
                })
                .then(() => {
                    console.log(`added ${name} ears`);
                });
        }
    }
}

module.exports = updateCharacterTokens;
