const _ = require("lodash");
const TABLES = require("../../../data/tables");
const { knex } = require("../../../models/config");
const { formatMagicCosts } = require("../../../data/characterData");
const { magicCosts } = require("../../../data/magicCosts");

async function updateMagicCosts() {
    for (let char in magicCosts) {
        const costs = magicCosts[char];

        const current = await knex(TABLES.CHARACTERS)
            .where({ name: char })
            .first();

        if (!_.isEqual(current.magic_costs, formatMagicCosts(costs))) {
            await knex(TABLES.CHARACTERS)
                .where({ name: char })
                .update({ magic_costs: formatMagicCosts(costs) })
                .then(() => {
                    console.log(`updated ${char} magic costs`);
                });
        }
    }
}

module.exports = updateMagicCosts;
