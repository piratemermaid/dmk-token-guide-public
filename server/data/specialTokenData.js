const { SPECIAL_ITEMS, TOKEN_RARITIES } = require("./constants");
const { C, U, R, E, L } = TOKEN_RARITIES;

const specialTokenList = [
    { name: "Refresh Token", rarity: R },
    { name: "Glitched Fabric", rarity: U },
    { name: "Anna Travel Fabric", rarity: C },
    { name: "Elsa Travel Fabric", rarity: R },
    { name: "Broom", rarity: U },
    { name: "Lid", rarity: C },
    { name: "String", rarity: U },
    { name: "Wood-Carving Tools", rarity: C },
    { name: "Witch's Potion Bottle", rarity: R },
    { name: "Comfy Merida Fabric", rarity: L },
    { name: "Binoculars", rarity: C },
    { name: "Ion Grenade", rarity: U },
    { name: "X-Wing Pilot Luke Fabric", rarity: R },
    { name: SPECIAL_ITEMS.LUKE_BESPIN_FABRIC, rarity: U },
    { name: SPECIAL_ITEMS.BOBA_FETT_BOUNTY_HUNTER_FABRIC, rarity: E }
];

const miniEventTokenList = {
    "Honey Bees": [
        { name: SPECIAL_ITEMS.HONEYCOMB, rarity: U },
        { name: SPECIAL_ITEMS.HONEY_DIPPER, rarity: U }
    ],
    "Battle Bots": [
        { name: SPECIAL_ITEMS.GAMING_REMOTE, rarity: R },
        { name: SPECIAL_ITEMS.GAMING_VISOR, rarity: R }
    ],
    Virus: [
        { name: SPECIAL_ITEMS.ANTIVIRUS, rarity: C },
        { name: SPECIAL_ITEMS.VIRUS_TRACKER, rarity: U }
    ],
    "Lunch on the Loose!": [
        { name: SPECIAL_ITEMS.KEY, rarity: C },
        { name: SPECIAL_ITEMS.HEART_LOCK, rarity: U }
    ],
    "Frogs!": [
        { name: SPECIAL_ITEMS.CRITTER_NET, rarity: C },
        { name: SPECIAL_ITEMS.CRITTER_CONTAINER, rarity: U }
    ],
    Coco: [
        { name: SPECIAL_ITEMS.SWEET_TREAT, rarity: C },
        { name: SPECIAL_ITEMS.COMFY_BASKET, rarity: U }
    ],
    "Droid-Be-Gone": [
        { name: SPECIAL_ITEMS.EMP, rarity: C },
        { name: SPECIAL_ITEMS.FUSION_CUTTER, rarity: U }
    ],
    "Sand Whirls": [
        { name: SPECIAL_ITEMS.BRUSH, rarity: C },
        { name: SPECIAL_ITEMS.DUSTPAN, rarity: C }
    ],
    "Forest Fiends": [
        { name: SPECIAL_ITEMS.GARDEN_SHEARS, rarity: C },
        { name: SPECIAL_ITEMS.CURSEBEGONE, rarity: U }
    ],
    "Fly Free!": [
        // { name: SPECIAL_ITEMS.RED_STRING, rarity: C },
        { name: SPECIAL_ITEMS.STRING, rarity: C },
        { name: SPECIAL_ITEMS.BAG, rarity: R }
    ],
    Hercules: [
        { name: "Hercules' Shoes", rarity: C },
        { name: "Lightning Bolt", rarity: R }
    ],
    "Shadow Spirits": [
        { name: SPECIAL_ITEMS.LANTERN, rarity: E },
        { name: SPECIAL_ITEMS.LOTUS_CANDLE, rarity: C }
    ],
    "Tooka Doll": [
        { name: SPECIAL_ITEMS.NUNA_TURKEY_JERKEY, rarity: R },
        { name: SPECIAL_ITEMS.BLUE_AND_GREEN_MILK, rarity: C }
    ],
    "Lost Puppies": [
        { name: SPECIAL_ITEMS.PUPPY_LEASH, rarity: U },
        { name: SPECIAL_ITEMS.FEATHERDUSTER, rarity: R }
    ],
    "Shimmery Shiny!": [
        { name: SPECIAL_ITEMS.GEM_LURE, rarity: U },
        { name: SPECIAL_ITEMS.NET, rarity: U }
    ],
    Arachnophobia: [
        { name: SPECIAL_ITEMS.ICE_SPIDER_EGG, rarity: C },
        { name: SPECIAL_ITEMS.FLAMETHROWER, rarity: C }
    ],
    "Flight Control": [
        { name: SPECIAL_ITEMS.DRUMSTICK, rarity: U },
        { name: SPECIAL_ITEMS.BLASTER, rarity: U }
    ]
};

// These would be for temporary event tokens
// e.g. Blowgun and Grass Basket from Moana
// export const eventTokens = {}

let specialTokens = [];

for (let token of specialTokenList) {
    specialTokens.push({ ...token, key: token.name });
}

for (let event in miniEventTokenList) {
    const tokens = miniEventTokenList[event];
    for (let token of tokens) {
        specialTokens.push({
            ...token,
            key: token.name,
            mini_event: event
        });
    }
}

module.exports = specialTokens;
