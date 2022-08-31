const { CHARACTERS, BUILDINGS, SPECIAL_ITEMS } = require("./constants");
const welcome = "welcome";
const build = "build";
const quest = "quest";
const battle = "battle";
const stringbold = "stringbold";

const dates = {
    1: "April 28",
    2: "April 30",
    3: "May 4",
    4: "May 10"
};

const eventStoryline = [
    {
        type: welcome,
        name: CHARACTERS.RUSSELL,
        time: "6s",
        EC: 100,
        common: 4,
        token: 0,
        ears: 0,
        date: dates[1]
    },
    {
        type: build,
        name: BUILDINGS.CARL_HOUSE,
        time: "8h",
        EC: null,
        date: dates[2]
    },
    {
        type: welcome,
        name: CHARACTERS.CARL_FREDRICKSEN,
        time: "6s",
        EC: 15000,
        common: 15,
        token: 15,
        ears: 15,
        date: dates[3]
    }

    // {
    //     type: stringbold,
    //     name: "Luke Skywalker's Bespin Costume (6s) - 1000 EC, 10 common tokens, 5 Luke's Lightsaber tokens, 10 Bespin Fabric",
    //     date: dates[1]
    // },
    // {
    //     type: quest,
    //     name: "Cooldown",
    //     time: "6h",
    //     characters: [{ name: CHARACTERS.LUKE_SKYWALKER, level: 2 }],
    //     date: dates[1]
    // },
    // {
    //     type: welcome,
    //     name: CHARACTERS.LANDO_CALRISSIAN,
    //     time: "6s",
    //     EC: 3000,
    //     common: 15,
    //     token: 15,
    //     ears: 12,
    //     date: dates[2]
    // },
    // {
    //     type: quest,
    //     name: "Clear My Schedule",
    //     time: "4h",
    //     characters: [{ name: CHARACTERS.LANDO_CALRISSIAN, level: 1 }],
    //     date: dates[2]
    // },
    // {
    //     type: quest,
    //     name: "A Brave Face",
    //     time: "4h",
    //     characters: [{ name: CHARACTERS.LANDO_CALRISSIAN, level: 2 }],
    //     date: dates[2]
    // },
    // {
    //     type: build,
    //     name: BUILDINGS.DAGOBAH,
    //     time: "6h",
    //     EC: 800,
    //     date: dates[2]
    // },
    // {
    //     type: quest,
    //     name: "Meeting with a Master",
    //     time: "4h",
    //     characters: [{ name: CHARACTERS.LUKE_SKYWALKER, level: 2 }],
    //     date: dates[2]
    // },
    // {
    //     type: quest,
    //     name: "A Braver Face",
    //     time: "6h",
    //     characters: [{ name: CHARACTERS.LANDO_CALRISSIAN, level: 2 }],
    //     date: dates[2]
    // },
    // {
    //     type: welcome,
    //     name: CHARACTERS.BOBA_FETT,
    //     time: "6s",
    //     EC: 5000,
    //     common: 20,
    //     token: 8,
    //     ears: 6,
    //     date: dates[3]
    // },
    // {
    //     type: stringbold,
    //     name: "Boba Fett's Bounty Hunter Costume (6s) - 10000 EC, 25 common tokens, 12 Boba Fett tokens, 10 Bounty Hunter Fabric",
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "Hunted",
    //     time: "2h",
    //     characters: [{ name: CHARACTERS.BOBA_FETT, level: 1 }],
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "Where Indeed",
    //     time: "4h",
    //     characters: [{ name: CHARACTERS.LUKE_SKYWALKER, level: 3 }],
    //     date: dates[3]
    // },
    // {
    //     type: build,
    //     name: BUILDINGS.CLOUD_CITY,
    //     time: "8h",
    //     EC: 6000,
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "Into the Field",
    //     time: "2h",
    //     characters: [{ name: CHARACTERS.BOBA_FETT, level: 2 }],
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "Hunting a Hunter",
    //     time: "4h",
    //     characters: [
    //         { name: CHARACTERS.BOBA_FETT, level: 2 },
    //         { name: CHARACTERS.LANDO_CALRISSIAN, level: 3 }
    //     ],
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "Feint Riposte",
    //     time: "4h",
    //     characters: [{ name: CHARACTERS.BOBA_FETT, level: 3 }],
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "Playback Error",
    //     time: "2h",
    //     characters: [{ name: CHARACTERS.LUKE_SKYWALKER, level: 3 }],
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "C-3PO's Warning",
    //     time: "4h",
    //     characters: [
    //         { name: CHARACTERS.BOBA_FETT, level: 3 },
    //         { name: CHARACTERS.LANDO_CALRISSIAN, level: 3 },
    //         { name: CHARACTERS.LUKE_SKYWALKER, level: 4 }
    //     ],
    //     date: dates[3]
    // },
    // {
    //     type: quest,
    //     name: "Unfinished Business",
    //     time: "4h",
    //     characters: [
    //         { name: CHARACTERS.BOBA_FETT, level: 3 },
    //         { name: CHARACTERS.LANDO_CALRISSIAN, level: 4 }
    //     ],
    //     date: dates[3]
    // },
    // {
    //     type: welcome,
    //     name: CHARACTERS.YODA,
    //     time: null,
    //     EC: null,
    //     common: null,
    //     token: null,
    //     ears: null,
    //     date: dates[4]
    // }
];

// templates

//welcome template
// {
//     type: welcome,
//     name: CHARACTERS.HERCULES,
//     time: "6s",
//     EC: null,
//     common: null,
//     token: null,
//     ears: null,
//     date: dates[4]
// }

//build template
// {
//     type: build,
//     name: BUILDINGS.TRAINING_GROUNDS,
//     time: null,
//     EC: null,
//     date: dates[2]
// }

//quest template
// {
//     type: quest,
//     name: "",
//     time: "",
//     characters: [{ name: CHARACTERS., level:  }],
//     date: dates[1]
// }

//battle template
// {
//     type: battle,
//     name: "Make like a Tree...",
//     requirement: "Recruit Nymphs",
//     amount: 6,
//     time: "30m",
//     characters: [{ name: "Phil" }, { name: "Meg" }, { name: "Pegasus" }],
//     date: dates[3],
//     specialTokens: [
//         { name: "Hercules' Shoes", amount: 2 },
//         { name: "Lightning Bolt", amount: 1 }
//     ]
// }

//custom item template
// {
//     type: stringbold,
//     name:
//         "Merida's Comfy Costume (1h) - 10000 EC, 10 common tokens, 10 Glitched Fabric, 10 Comfy Merida Fabric",
//     date: dates[4]
// }

let i = 0;
module.exports = eventStoryline.map((item) => {
    i++;
    return { ...item, order: i, key: `${i}-${item.type}-${item.name}` };
});
