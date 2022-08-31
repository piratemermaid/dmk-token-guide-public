const { CHARACTERS, COSTUMES, FABRIC } = require("./constants");

const costumeList = {
    [CHARACTERS.MICKEY]: [
        { name: COSTUMES.PIRATE },
        { name: COSTUMES.CLASSIC, tokens: ["Classic"] },
        {
            name: COSTUMES.SORCEROR,
            tokens: ["Red Star", "Blue Moon", "Rope Material"]
        },
        { name: COSTUMES.SPRING },
        { name: COSTUMES.HOLIDAY },
        { name: COSTUMES.LUNAR },
        { name: COSTUMES.TUXEDO },
        { name: COSTUMES.HALLOWEEN, tokens: ["Blue"] },
        { name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG },
        { name: COSTUMES.WDW_50 }
    ],
    [CHARACTERS.GOOFY]: [
        { name: COSTUMES.PIRATE },
        { name: COSTUMES.HALLOWEEN, tokens: ["Blue", "Green Dot"] },
        { name: COSTUMES.SPRING }
    ],
    [CHARACTERS.PLUTO]: [{ name: COSTUMES.SPRING }, { name: COSTUMES.LUNAR }],
    [CHARACTERS.DAISY]: [
        { name: COSTUMES.HALLOWEEN, tokens: ["Purple", "Green Dot"] },
        { name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG }
    ],
    [CHARACTERS.PETE]: [
        { name: COSTUMES.CLASSIC, tokens: ["Classic", "Buttoned Classic"] }
    ],
    [CHARACTERS.MINNIE]: [
        { name: COSTUMES.HALLOWEEN, tokens: ["Purple", "Red Striped"] },
        { name: COSTUMES.PIRATE, tokens: ["Pirate"] },
        { name: COSTUMES.CLASSIC, tokens: ["Classic", "Buttoned Classic"] },
        { name: COSTUMES.SPRING },
        { name: COSTUMES.HOLIDAY },
        { name: COSTUMES.LUNAR },
        { name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG },
        { name: COSTUMES.WDW_50 }
    ],
    [CHARACTERS.DONALD]: [
        { name: COSTUMES.PIRATE },
        {
            name: COSTUMES.HALLOWEEN,
            tokens: ["White & Blue Pattern", "Orange Pattern"]
        },
        { name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG }
    ],
    [CHARACTERS.CHIP]: [{ name: COSTUMES.LUNAR }],
    [CHARACTERS.DALE]: [{ name: COSTUMES.LUNAR }],
    [CHARACTERS.BO_PEEP]: [{ name: COSTUMES.TS4 }],
    [CHARACTERS.CINDERELLA]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.JACK_SPARROW]: [
        { name: COSTUMES.CAPTAIN_COAT, tokens: ["Pirate"] }
    ],
    [CHARACTERS.RAPUNZEL]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.AURORA]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.POCAHONTAS]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.ELASTIGIRL]: [{ name: COSTUMES.ELASTIGIRL }],
    [CHARACTERS.ANNA]: [
        { name: COSTUMES.HOLIDAY },
        { name: "Travel" },
        { name: "Queen Anna" }
    ],
    [CHARACTERS.ELSA]: [
        { name: COSTUMES.HOLIDAY },
        { name: "Travel" },
        { name: "Snow Queen" }
    ],
    [CHARACTERS.OLAF]: [{ name: COSTUMES.HOLIDAY }],
    [CHARACTERS.MULAN]: [{ name: COSTUMES.WARRIOR }, { name: COSTUMES.COMFY }],
    [CHARACTERS.BELLE]: [
        { name: COSTUMES.FORMAL_DRESS },
        { name: COSTUMES.COMFY }
    ],
    [CHARACTERS.BEAST]: [{ name: COSTUMES.FORMAL_SUIT }],
    [CHARACTERS.ALADDIN]: [{ name: COSTUMES.PRINCE_ALI }],
    [CHARACTERS.JASMINE]: [
        { name: COSTUMES.PURPLE_DRESS },
        { name: COSTUMES.COMFY }
    ],
    [CHARACTERS.SNOW_WHITE]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.BAYMAX]: [{ name: COSTUMES.ARMOR }],
    [CHARACTERS.POOH]: [{ name: COSTUMES.HONEY_DAY }],
    [CHARACTERS.ARIEL]: [{ name: COSTUMES.MERMAID }, { name: COSTUMES.COMFY }],
    [CHARACTERS.TIANA]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.MOANA]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.MERIDA]: [{ name: COSTUMES.COMFY }],
    [CHARACTERS.LUKE_SKYWALKER]: [{ name: "X-Wing Pilot" }, { name: "Bespin" }],
    [CHARACTERS.BOBA_FETT]: [{ name: "Bounty Hunter" }],
    [CHARACTERS.DUG]: [{ name: "Cone of Shame" }]
};

//TODO: get correct values for these
const fabricTokens = [
    { name: "Blue", rarity: "uncommon" },
    { name: "Red Star", rarity: "common" },
    { name: "Blue Moon", rarity: "common" },
    { name: "Rope Material", rarity: "common" },
    { name: "Classic", rarity: "common" },
    { name: "Buttoned Classic", rarity: "common" },
    { name: "Pirate", rarity: "common" },
    { name: "Glitched", rarity: "common" },
    { name: "Purple", rarity: "common" },
    { name: "Red Striped", rarity: "common" },
    { name: "Green Dot", rarity: "common" },
    { name: "White & Blue Pattern", rarity: "common" },
    { name: "Orange Pattern", rarity: "common" }
];

let costumes = [];
let costumeFabricTokens = [];

let index = 0;
for (let char in costumeList) {
    const costumeNames = costumeList[char];
    for (let i in costumeNames) {
        index++;
        const { name, tokens } = costumeNames[i];
        costumes.push({
            name,
            character: char,
            key: `${name}-${char}`,
            order: index
        });
        if (tokens) {
            for (let i in tokens) {
                costumeFabricTokens.push({
                    name: tokens[i],
                    costumeKey: `${name}-${char}`
                });
            }
        }
    }
}

module.exports = { fabricTokens, costumes, costumeFabricTokens };
