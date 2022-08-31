const tokenRarities = ["common", "uncommon", "rare", "epic", "legendary"];
const tokenTypes = [
    { name: "token", type: "character" },
    { name: "ears", type: "character" },
    { name: "common", type: "character_group" },
    { name: "mini_event", type: "special" },
    { name: "event", type: "special" },
    { name: "fabric", type: "fabric" }
];

module.exports = { tokenRarities, tokenTypes };
