/**
 * List of all groups and characters
 * Group info: key, nickname, characters, and float token drops
 * Character info: key, nickname, and token rarities
 */

const _ = require("lodash");
const { CHARACTERS, GROUPS, TOKENS, TOKEN_RARITIES } = require("./constants");
const { COMMON, EARS, TOKEN } = TOKENS;
const { C, U, R, E, L } = TOKEN_RARITIES;
const { magicCosts } = require("./magicCosts");

const groupOrder = [
    GROUPS.HOCUS_POCUS,
    "Mickey and Friends",
    "DuckTales",
    "Toy Story",
    "Cinderella",
    "Peter Pan",
    "Pirates",
    "Monsters",
    "WALL-E",
    "Tangled",
    "Sleeping Beauty",
    "Zootopia",
    "Bambi",
    "Jungle Book",
    "Lady and the Tramp",
    "Dumbo",
    "Pocahontas",
    "Emperor's New Groove",
    "Ratatouille",
    GROUPS.RESCUERS,
    "Incredibles",
    "Nightmare",
    "Frozen",
    "Mulan",
    "Beauty",
    "Lion King",
    "Aladdin",
    GROUPS.AIW,
    "Snow White",
    GROUPS.WTP,
    GROUPS.LS,
    GROUPS.BH6,
    GROUPS.TLM,
    "Wreck-It Ralph",
    "Princess and the Frog",
    GROUPS.MOANA,
    GROUPS.FN,
    "Coco",
    "Haunted Mansion",
    GROUPS.STAR_WARS,
    "Onward",
    "Hercules",
    "Brave",
    "Raya and the Last Dragon",
    "Luca",
    "101 Dalmatians",
    "Pinocchio",
    GROUPS.ROBINHOOD,
    GROUPS.UP,
    GROUPS.TURNING_RED
];

const characterData = {
    "Mickey and Friends": {
        key: "m&f",
        nickname: "M&F",
        characters: {
            Pluto: { key: "pluto", tokenRarities: [U, R], tokenName: "Collar" },
            "Mickey Mouse": {
                key: "mickey",
                nickname: "Mickey",
                tokenRarities: [C, U],
                tokenName: "Gloves"
            },
            "Minnie Mouse": {
                key: "minnie",
                nickname: "Minnie",
                tokenRarities: [R, R],
                tokenName: "Bow"
            },
            Goofy: { key: "goofy", tokenRarities: [U, U], tokenName: "Hat" },
            "Daisy Duck": {
                key: "daisy",
                nickname: "Daisy",
                tokenRarities: [U, R],
                tokenName: "Bow"
            },
            "Donald Duck": {
                key: "donald",
                nickname: "Donald",
                tokenRarities: [E, L],
                tokenName: "Sailor Hat"
            },
            Pete: {
                key: "pete",
                tokenRarities: [R, E],
                tokenName: "Bowler Hat"
            },
            Chip: { key: "chip", tokenRarities: [R, R], tokenName: "Acorn" },
            Dale: { key: "dale", tokenRarities: [R, R], tokenName: "Peanut" }
        },
        floatTokens: [
            {
                name: CHARACTERS.MICKEY,
                type: "character",
                tokenType: TOKEN,
                remove: true
            },
            { name: CHARACTERS.MICKEY, type: "character", tokenType: EARS },
            { name: CHARACTERS.GOOFY, type: "character", tokenType: EARS },
            { name: CHARACTERS.MINNIE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.PLUTO, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.DAISY, type: "character", tokenType: EARS },
            { name: CHARACTERS.TINK, type: "character", tokenType: EARS }
        ]
    },
    DuckTales: {
        key: "ducktales",
        characters: {
            "Scrooge McDuck": {
                key: "scrooge",
                tokenRarities: [U, R],
                tokenName: "Piggy Bank"
            },
            Huey: {
                key: "huey",
                tokenRarities: [U, U],
                tokenName: "Rocket Toy"
            },
            Dewey: {
                key: "dewey",
                tokenRarities: [R, R],
                tokenName: "Toy Plane"
            },
            Louie: { key: "louie", tokenRarities: [E, E], tokenName: "Toy Car" }
        },
        floatTokens: [
            { name: GROUPS.DUCKTALES, type: "common", tokenType: COMMON },
            { name: CHARACTERS.SCROOGE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.SCROOGE, type: "character", tokenType: EARS },
            { name: CHARACTERS.HUEY, type: "character", tokenType: EARS },
            { name: CHARACTERS.DEWEY, type: "character", tokenType: TOKEN }
        ]
    },
    "Toy Story": {
        key: "ts",
        nickname: "TS",
        characters: {
            Zurg: { key: "zurg", tokenRarities: [R, E], tokenName: "Blaster" },
            Jessie: {
                key: "jessie",
                tokenRarities: [U, R],
                tokenName: "Lasso"
            },
            Woody: {
                key: "woody",
                tokenRarities: [U, U],
                tokenName: "Sheriff Star"
            },
            "Buzz Lightyear": {
                key: "buzz",
                nickname: "Buzz",
                tokenRarities: [U, R],
                tokenName: "Astro Blasters Blaster"
            },
            "Bo Peep": {
                key: "bo peep",
                tokenRarities: [R, R],
                tokenName: "Bonnet"
            },
            Hamm: { key: "hamm", tokenRarities: [U, R], tokenName: "Hat" },
            Sarge: { key: "sarge", tokenRarities: [U, R], tokenName: "Bucket" },
            Rex: {
                key: "rex",
                tokenRarities: [U, R],
                tokenName: "Partysaurus Helmet"
            },
            Bullseye: {
                key: "bullseye",
                tokenRarities: [U, U],
                tokenName: "Toy Saddle"
            },
            "Toy Alien": {
                key: "alien",
                nickname: "Alien",
                tokenRarities: [R, R],
                tokenName: "Claw"
            },
            Ducky: {
                key: "ducky",
                tokenRarities: [R, R],
                tokenName: "Comet Target"
            },
            Bunny: {
                key: "bunny",
                tokenRarities: [R, E],
                tokenName: "Spaceship Target"
            },
            Forky: { key: "forky", tokenRarities: [U, R], tokenName: "A Toy" }
        },
        floatTokens: [
            { name: CHARACTERS.WOODY, type: "character", tokenType: EARS },
            { name: CHARACTERS.JESSIE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.JESSIE, type: "character", tokenType: EARS },
            { name: CHARACTERS.BUZZ, type: "character", tokenType: EARS },
            {
                name: CHARACTERS.BO_PEEP,
                type: "character",
                tokenType: EARS,
                remove: true
            },
            { name: CHARACTERS.HAMM, type: "character", tokenType: EARS },
            { name: CHARACTERS.SARGE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.SARGE, type: "character", tokenType: EARS }
        ]
    },
    Cinderella: {
        key: "cinderella",
        characters: {
            Cinderella: {
                key: "cinderella",
                tokenRarities: [E, R],
                tokenName: "Glass Slipper"
            },
            "Prince Charming": {
                key: "charming",
                nickname: "Charming",
                tokenRarities: [U, U],
                tokenName: "Prince Gloves"
            },
            "Fairy Godmother": {
                key: "godmother",
                nickname: "Godmother",
                tokenRarities: [U, R],
                tokenName: "Magical Wand"
            },
            Anastasia: {
                key: "anastasia",
                tokenRarities: [R, R],
                tokenName: "Hair Feather"
            },
            Drizella: {
                key: "drizella",
                tokenRarities: [U, R],
                tokenName: "Hair Feather"
            },
            "Lady Tremaine": {
                key: "tremaine",
                tokenRarities: [U, R],
                tokenName: "Ring"
            }
        },
        floatTokens: [
            { name: CHARACTERS.ZURG, type: "character", tokenType: TOKEN },
            {
                name: CHARACTERS.CINDERELLA,
                type: "character",
                tokenType: TOKEN
            },
            { name: CHARACTERS.CINDERELLA, type: "character", tokenType: EARS },
            { name: CHARACTERS.CHARMING, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.CHARMING, type: "character", tokenType: EARS },
            { name: CHARACTERS.GOTHEL, type: "character", tokenType: EARS }
        ]
    },
    "Peter Pan": {
        key: "pp",
        nickname: "PP",
        characters: {
            "Peter Pan": {
                key: "peter",
                tokenRarities: [L, L],
                tokenName: "Pan Flute"
            },
            "Wendy Darling": {
                key: "wendy",
                tokenRarities: [E, E],
                tokenName: "Needle and Thread"
            },
            Tinkerbell: {
                key: "tink",
                tokenRarities: [U, R],
                tokenName: "Thimble"
            },
            "Michael Darling": {
                key: "michael",
                tokenRarities: [E, L],
                tokenName: "Bear"
            },
            "John Darling": {
                key: "john",
                tokenRarities: [R, E],
                tokenName: "Umbrella"
            },
            "Captain Hook": {
                key: "hook",
                tokenRarities: [R, E],
                tokenName: "A Captain's Hook"
            }
        },
        floatTokens: [
            { name: CHARACTERS.PETER, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.PETER, type: "character", tokenType: EARS },
            { name: CHARACTERS.WENDY, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.WENDY, type: "character", tokenType: EARS }
        ]
    },
    Pirates: {
        key: "pirates",
        characters: {
            "Elizabeth Swann": {
                key: "elizabeth",
                tokenRarities: [R, E],
                tokenName: "Hat and Sword"
            },
            "Jack Sparrow": {
                key: "jack sparrow",
                tokenRarities: [U, R],
                tokenName: "Magic Compass"
            },
            "Will Turner": {
                key: "will",
                tokenRarities: [U, R],
                tokenName: "Feathered Hat and Sword"
            },
            "Captain Barbossa": {
                key: "barbossa",
                nickname: "Barbossa",
                tokenRarities: [R, E],
                tokenName: "Hat"
            },
            "Tia Dalma": {
                key: "tia",
                tokenRarities: [R, R],
                tokenName: "Heart Locket"
            },
            "Davy Jones": {
                key: "davy",
                tokenRarities: [U, U],
                tokenName: "Heart Chest"
            }
        },
        floatTokens: [
            {
                name: CHARACTERS.WILL_TURNER,
                type: "character",
                tokenType: TOKEN
            },
            {
                name: CHARACTERS.WILL_TURNER,
                type: "character",
                tokenType: EARS
            },
            { name: CHARACTERS.ELIZABETH, type: "character", tokenType: TOKEN },
            {
                name: CHARACTERS.JACK_SPARROW,
                type: "character",
                tokenType: TOKEN
            }
        ]
    },
    Monsters: {
        key: "monsters",
        characters: {
            Mike: { key: "mike", tokenRarities: [U, R], tokenName: "Hard Hat" },
            Sulley: {
                key: "sulley",
                tokenRarities: [U, R],
                tokenName: "Boo's Drawing of Sulley"
            },
            Boo: {
                key: "boo",
                tokenRarities: [U, R],
                tokenName: "Little Mikey"
            },
            Roz: {
                key: "roz",
                tokenRarities: [R, R],
                tokenName: "Horn-Rimmed Glasses"
            },
            "Celia Mae": {
                key: "celia",
                tokenRarities: [R, R],
                tokenName: "Headset"
            },
            "Randall Boggs": {
                key: "randall",
                nickname: "Randall",
                tokenRarities: [R, R],
                tokenName: "Boo's Drawing of Randall"
            }
        },
        floatTokens: [
            { name: CHARACTERS.MIKE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.SULLEY, type: "character", tokenType: EARS },
            { name: CHARACTERS.ROZ, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.CELIA, type: "character", tokenType: EARS },
            { name: CHARACTERS.RANDALL, type: "character", tokenType: TOKEN }
        ]
    },
    "WALL-E": {
        key: "walle",
        characters: {
            "WALL-E": {
                key: "walle",
                tokenRarities: [U, R],
                tokenName: "Plant"
            },
            EVE: {
                key: "eve",
                tokenRarities: [U, R],
                tokenName: "Fire Extinguisher"
            }
        },
        floatTokens: [
            { name: CHARACTERS.ZURG, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.EVE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.EVE, type: "character", tokenType: EARS }
        ]
    },
    Tangled: {
        key: "tangled",
        characters: {
            "Mother Gothel": {
                key: "gothel",
                tokenRarities: [R, E],
                tokenName: "Dagger"
            },
            Flynn: {
                key: "flynn",
                tokenRarities: [R, R],
                tokenName: "Wanted Satchel"
            },
            Pascal: {
                key: "pascal",
                tokenRarities: [E, E],
                tokenName: "Dress"
            },
            Rapunzel: {
                key: "rapunzel",
                tokenRarities: [E, L],
                tokenName: "Glowing Lantern"
            },
            Maximus: {
                key: "maximus",
                tokenRarities: [U, R],
                tokenName: "Red Apple"
            }
        },
        floatTokens: [
            {
                name: CHARACTERS.MINNIE,
                type: "character",
                tokenType: TOKEN,
                remove: true
            },
            { name: CHARACTERS.RAPUNZEL, type: "character", tokenType: EARS },
            { name: CHARACTERS.FLYNN, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.GOTHEL, type: "character", tokenType: TOKEN }
        ]
    },
    "Sleeping Beauty": {
        key: "sb",
        nickname: "SB",
        characters: {
            Aurora: {
                key: "aurora",
                tokenRarities: [E, E],
                tokenName: "Gold Crown"
            },
            "Prince Phillip": {
                key: "phillip",
                tokenRarities: [R, R],
                tokenName: "Large Shield"
            },
            Flora: {
                key: "flora",
                tokenRarities: [U, U],
                tokenName: "Red Fairy Hat"
            },
            Fauna: {
                key: "fauna",
                tokenRarities: [R, E],
                tokenName: "Green Fairy Hat"
            },
            Merryweather: {
                key: "merryweather",
                tokenRarities: [U, R],
                tokenName: "Blue Fairy Hat"
            }
        },
        floatTokens: [
            { name: CHARACTERS.AURORA, type: "character", tokenType: EARS },
            { name: CHARACTERS.PHILLIP, type: "character", tokenType: EARS },
            { name: CHARACTERS.FLORA, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.FAUNA, type: "character", tokenType: TOKEN },
            {
                name: CHARACTERS.MERRYWEATHER,
                type: "character",
                tokenType: TOKEN
            }
        ]
    },
    Zootopia: {
        key: "zootopia",
        characters: {
            "Judy Hopps": {
                key: "judy",
                tokenRarities: [U, R],
                tokenName: "Carrot Pen"
            },
            "Nick Wilde": {
                key: "nick",
                tokenRarities: [R, R],
                tokenName: "Tie"
            },
            "Chief Bogo": {
                key: "bogo",
                tokenRarities: [E, E],
                tokenName: "Chief's Badge"
            },
            Flash: { key: "flash", tokenRarities: [U, R], tokenName: "Mug" }
        },
        floatTokens: [
            { name: CHARACTERS.JUDY, type: "character", tokenType: EARS },
            { name: CHARACTERS.NICK, type: "character", tokenType: EARS },
            { name: CHARACTERS.BOGO, type: "character", tokenType: EARS },
            { name: CHARACTERS.FLASH, type: "character", tokenType: EARS },
            { name: GROUPS.ZOOTOPIA, type: "common", tokenType: COMMON }
        ]
    },
    Bambi: {
        key: "bambi",
        characters: {
            Thumper: {
                key: "thumper",
                tokenRarities: [U, R],
                tokenName: "Clover"
            },
            Bambi: {
                key: "bambi",
                tokenRarities: [R, E],
                tokenName: "Butterfly"
            },
            Flower: {
                key: "flower",
                tokenRarities: [U, R],
                tokenName: "Flower"
            }
        },
        floatTokens: [
            { name: CHARACTERS.THUMPER, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.THUMPER, type: "character", tokenType: EARS },
            { name: CHARACTERS.BAMBI, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.FLOWER, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.FLOWER, type: "character", tokenType: EARS }
        ]
    },
    "Jungle Book": {
        key: "jb",
        nickname: "JB",
        characters: {
            Bagheera: {
                key: "bagheera",
                tokenRarities: [E, E],
                tokenName: "Perch"
            },
            Mowgli: {
                key: "mowgli",
                tokenRarities: [R, R],
                tokenName: "Basket"
            },
            Baloo: {
                key: "baloo",
                tokenRarities: [U, R],
                tokenName: "Disguise Props"
            },
            "King Louie": {
                key: "king louie",
                tokenRarities: [U, R],
                tokenName: "Palm Fan"
            },
            "Shere Khan": {
                key: "shere khan",
                tokenRarities: [L, L],
                tokenName: "Red Fire Stick"
            }
        },
        floatTokens: [
            { name: CHARACTERS.BAGHEERA, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.MOWGLI, type: "character", tokenType: EARS },
            {
                name: CHARACTERS.SHERE_KHAN,
                type: "character",
                tokenType: TOKEN
            },
            { name: CHARACTERS.BALOO, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.KING_LOUIE, type: "character", tokenType: EARS }
        ]
    },
    "Lady and the Tramp": {
        key: "latt",
        nickname: "LatT",
        characters: {
            Lady: { key: "lady", tokenRarities: [L, E], tokenName: "Collar" },
            Tramp: { key: "tramp", tokenRarities: [U, R], tokenName: "Bone" },
            Jock: { key: "jock", tokenRarities: [U, R], tokenName: "Coat" },
            Joe: {
                key: "joe",
                tokenRarities: [R, E],
                tokenName: "Wine Bottle Candle"
            },
            Tony: {
                key: "tony",
                tokenRarities: [R, R],
                tokenName: "Accordion"
            },
            Trusty: {
                key: "trusty",
                tokenRarities: [U, R],
                tokenName: "Bandage"
            }
        },
        floatTokens: [
            { name: CHARACTERS.TRAMP, tokenType: EARS },
            { name: CHARACTERS.TRUSTY, tokenType: EARS },
            { name: CHARACTERS.TONY, tokenType: EARS },
            {
                name: "Brush",
                type: "mini event",
                tokenType: "special",
                remove: true
            },
            {
                name: "Dustpan",
                type: "mini event",
                tokenType: "special",
                remove: true
            }
        ]
    },
    Dumbo: {
        key: "dumbo",
        characters: {
            [CHARACTERS.RINGMASTER]: {
                key: "ringmaster",
                nickname: "Ringmaster",
                tokenRarities: [U, U],
                tokenName: "Whip"
            },
            Dumbo: { key: "dumbo", tokenRarities: [E, L], tokenName: "Flag" },
            "Timothy Q. Mouse": {
                key: "timothy",
                nickname: "Timothy",
                tokenRarities: [U, U],
                tokenName: "Magic Feather"
            }
        },
        floatTokens: [
            { name: GROUPS.DUMBO, type: "common", tokenType: COMMON },
            { name: CHARACTERS.TIMOTHY, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.TIMOTHY, type: "character", tokenType: EARS },
            { name: CHARACTERS.DUMBO, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.DUMBO, type: "character", tokenType: EARS }
        ]
    },
    Pocahontas: {
        key: "pocahontas",
        characters: {
            Meeko: {
                key: "meeko",
                tokenRarities: [E, L],
                tokenName: "Raspberries"
            },
            Pocahontas: {
                key: "pocahontas",
                tokenRarities: [U, E],
                tokenName: "Necklace"
            },
            Percy: { key: "percy", tokenRarities: [C, U], tokenName: "Pillow" }
        },
        floatTokens: [
            { name: CHARACTERS.POCAHONTAS, tokenType: TOKEN },
            { name: CHARACTERS.POCAHONTAS, tokenType: EARS },
            { name: CHARACTERS.PERCY, tokenType: TOKEN },
            { name: CHARACTERS.PERCY, tokenType: EARS },
            { name: CHARACTERS.MEEKO, tokenType: EARS }
        ]
    },
    "Emperor's New Groove": {
        key: "eng",
        nickname: "ENG",
        characters: {
            Kuzco: {
                key: "kuzco",
                tokenRarities: [R, E],
                tokenName: "Crown"
            },
            Pacha: {
                key: "pacha",
                tokenRarities: [U, R],
                tokenName: "Poncho"
            },
            Kronk: {
                key: "kronk",
                tokenRarities: [R, R],
                tokenName: "Spinach Rolls"
            },
            Yzma: {
                key: "yzma",
                tokenRarities: [E, L],
                tokenName: "Llama Extract Potion"
            }
        },
        floatTokens: [
            { name: CHARACTERS.PACHA, tokenType: EARS },
            { name: CHARACTERS.KRONK, tokenType: EARS },
            { name: CHARACTERS.KUZCO, tokenType: TOKEN },
            { name: CHARACTERS.KUZCO, tokenType: EARS },
            { name: CHARACTERS.YZMA, tokenType: EARS }
        ]
    },
    Ratatouille: {
        key: "rat",
        characters: {
            Colette: {
                key: "colette",
                tokenRarities: [C, U],
                tokenName: "Dipstick"
            },
            Remy: {
                key: "remy",
                tokenRarities: [R, R],
                tokenName: "Wooden Spoon"
            },
            Linguini: {
                key: "linguini",
                tokenRarities: [E, E],
                tokenName: "Pot of Soup"
            }
        },
        floatTokens: [
            { name: GROUPS.RATATOUILLE, tokenType: COMMON },
            { name: CHARACTERS.REMY, tokenType: TOKEN },
            { name: CHARACTERS.REMY, tokenType: EARS },
            { name: CHARACTERS.LINGUINI, tokenType: TOKEN },
            { name: CHARACTERS.LINGUINI, tokenType: EARS }
        ]
    },
    [GROUPS.RESCUERS]: {
        key: "rescuers",
        characters: {
            [CHARACTERS.BERNARD]: {
                key: "bernard",
                tokenRarities: [C, C],
                tokenName: "Cap"
            },
            [CHARACTERS.ORVILLE]: {
                key: "orville",
                tokenRarities: [U, R],
                tokenName: "Aviator Hat"
            },
            [CHARACTERS.MISS_BIANCA]: {
                key: "missbianca",
                tokenRarities: [R, E],
                tokenName: "Perfume"
            },
            [CHARACTERS.PENNY_TR]: {
                key: "penny-tr",
                tokenRarities: [C, U],
                tokenName: "Teddy Bear"
            }
        },
        floatTokens: [
            { name: GROUPS.RESCUERS, tokenType: COMMON },
            { name: CHARACTERS.BERNARD, tokenType: TOKEN },
            { name: CHARACTERS.BERNARD, tokenType: EARS },
            { name: CHARACTERS.ORVILLE, tokenType: TOKEN },
            { name: CHARACTERS.ORVILLE, tokenType: EARS }
        ]
    },
    Incredibles: {
        key: "incredibles",
        characters: {
            Dash: { key: "dash", tokenRarities: [U, U], tokenName: "Trophy" },
            Elastigirl: {
                key: "elastigirl",
                tokenRarities: [U, U],
                tokenName: "Mask"
            },
            "Mr. Incredible": {
                key: "mr i",
                tokenRarities: [R, R],
                tokenName: "Mr. Incredible Poster"
            },
            Violet: {
                key: "violet",
                tokenRarities: [U, R],
                tokenName: "Headband"
            },
            "Jack-Jack": {
                key: "jackjack",
                tokenRarities: [E, L],
                tokenName: "Flash Cards"
            },
            Frozone: {
                key: "frozone",
                tokenRarities: [U, R],
                tokenName: "Skis"
            },
            Syndrome: {
                key: "syndrome",
                tokenRarities: [E, E],
                tokenName: "Bracer"
            }
        },
        floatTokens: [
            { name: CHARACTERS.MR_I, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.ELASTIGIRL, type: "character", tokenType: EARS },
            { name: CHARACTERS.VIOLET, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.DASH, type: "character", tokenType: EARS },
            { name: GROUPS.INCREDS, type: "common", tokenType: COMMON }
        ]
    },
    Nightmare: {
        key: "nbc",
        nickname: "NBC",
        characters: {
            Zero: {
                key: "zero",
                tokenRarities: [U, R],
                tokenName: "Tombstone"
            },
            "Jack Skellington": {
                key: "jack skellington",
                tokenRarities: [U, U],
                tokenName: "Bowtie"
            },
            Sally: {
                key: "sally",
                tokenRarities: [R, R],
                tokenName: "Jar of Deadly Nightshade"
            },
            "Oogie Boogie": {
                key: "oogie",
                tokenRarities: [E, E],
                tokenName: "Chance Dice"
            },
            "The Mayor": {
                key: "mayor",
                tokenRarities: [E, L],
                tokenName: "Badge"
            },
            Lock: {
                key: "lock",
                tokenRarities: [U, R],
                tokenName: "Mask"
            },
            Shock: {
                key: "shock",
                tokenRarities: [R, E],
                tokenName: null
            },
            Barrel: {
                key: "barrel",
                tokenRarities: [C, U],
                tokenName: null
            },
            [CHARACTERS.DR_FINKELSTEIN]: {
                key: "drfinkelstein",
                tokenRarities: [C, U],
                tokenName: "Brain Half"
            }
        },
        floatTokens: [
            { name: GROUPS.NBC, tokenType: COMMON },
            { name: CHARACTERS.ZERO, type: "character", tokenType: TOKEN },
            {
                name: CHARACTERS.JACK_SKELLINGTON,
                type: "character",
                tokenType: EARS
            },
            { name: CHARACTERS.SALLY, type: "character", tokenType: EARS },
            { name: CHARACTERS.OOGIE, type: "character", tokenType: EARS }
        ]
    },
    Frozen: {
        key: "frozen",
        characters: {
            Anna: {
                key: "anna",
                tokenRarities: [U, U],
                tokenName: "Arendelle Medallion"
            },
            Elsa: {
                key: "elsa",
                tokenRarities: [R, R],
                tokenName: "Queen Tiara"
            },
            Olaf: {
                key: "olaf",
                tokenRarities: [U, R],
                tokenName: "Carrot Nose"
            },
            Hans: {
                key: "hans",
                tokenRarities: [E, E],
                tokenName: "Short Sword"
            },
            Kristoff: {
                key: "kristoff",
                tokenRarities: [U, R],
                tokenName: "Lute"
            },
            Sven: {
                key: "sven",
                tokenRarities: [U, R],
                tokenName: "Medallion"
            },
            Ryder: {
                key: "ryder",
                tokenRarities: [U, U],
                tokenName: "Reindeer Rope"
            },
            Honeymaren: {
                key: "honeymaren",
                tokenRarities: [U, R],
                tokenName: "Staff"
            },
            "Fire Spirit": {
                key: "firespirit",
                tokenRarities: [U, R],
                tokenName: "Fire Symbol"
            }
        },
        floatTokens: [
            { name: CHARACTERS.ANNA, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.ELSA, type: "character", tokenType: EARS },
            { name: CHARACTERS.KRISTOFF, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.SVEN, type: "character", tokenType: EARS },
            { name: CHARACTERS.HANS, type: "character", tokenType: EARS }
        ]
    },
    Mulan: {
        key: "mulan",
        characters: {
            "Li Shang": {
                key: "li shang",
                tokenRarities: [U, U],
                tokenName: "Father's Helmet"
            },
            Mulan: {
                key: "mulan",
                tokenRarities: [R, R],
                tokenName: "Lotus Hairpiece"
            },
            Mushu: {
                key: "mushu",
                tokenRarities: [U, R],
                tokenName: "Great Stone Dragon"
            },
            "Cri-Kee": {
                key: "crikee",
                tokenRarities: [E, L],
                tokenName: "Lucky Cricket Cage"
            },
            "Shan Yu": {
                key: "shan yu",
                tokenRarities: [E, L],
                tokenName: "Sword"
            },
            Khan: {
                key: "khan",
                tokenRarities: [R, R],
                tokenName: "Hay"
            }
        },
        floatTokens: [
            { name: CHARACTERS.MULAN, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.MULAN, type: "character", tokenType: EARS },
            { name: CHARACTERS.LI_SHANG, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.LI_SHANG, type: "character", tokenType: EARS },
            { name: CHARACTERS.MUSHU, type: "character", tokenType: EARS }
        ]
    },
    Beauty: {
        key: "batb",
        nickname: "BATB",
        characters: {
            Belle: {
                key: "belle",
                tokenRarities: [R, R],
                tokenName: "Golden Gloves"
            },
            Beast: { key: "beast", tokenRarities: [C, U], tokenName: "Cravat" },
            Lumiere: {
                key: "lumiere",
                tokenRarities: [U, R],
                tokenName: "Matchsticks"
            },
            Cogsworth: {
                key: "cogsworth",
                tokenRarities: [U, U],
                tokenName: "Clock Winder"
            },
            "Mrs. Potts": {
                key: "mrspotts",
                tokenRarities: [U, R],
                tokenName: "Sugar Dish"
            },
            "Chip Potts": {
                key: "chippotts",
                tokenRarities: [U, R],
                tokenName: "Saucer"
            },
            Gaston: {
                key: "gaston",
                tokenRarities: [E, E],
                tokenName: "Quiver"
            },
            LeFou: {
                key: "lefou",
                tokenRarities: [R, E],
                tokenName: "Bow Tie"
            },
            [CHARACTERS.MAURICE]: {
                key: "maurice",
                tokenRarities: [R, E],
                tokenName: "Inventor Helmet"
            }
        },
        floatTokens: [
            { name: CHARACTERS.BELLE, type: "character", tokenType: EARS },
            { name: CHARACTERS.BEAST, type: "character", tokenType: EARS },
            { name: CHARACTERS.LUMIERE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.COGSWORTH, type: "character", tokenType: EARS },
            { name: CHARACTERS.GASTON, type: "character", tokenType: TOKEN }
        ]
    },
    "Lion King": {
        key: "lk",
        nickname: "LK",
        characters: {
            Zazu: { key: "zazu", tokenRarities: [U, R], tokenName: "Feather" },
            Nala: {
                key: "nala",
                tokenRarities: [U, U],
                tokenName: "Paw Print"
            },
            Simba: {
                key: "simba",
                tokenRarities: [R, R],
                tokenName: "Leafy Mane"
            },
            Rafiki: {
                key: "rafiki",
                tokenRarities: [U, R],
                tokenName: "Baobab Fruit"
            },
            Scar: { key: "scar", tokenRarities: [E, E], tokenName: "Mouse" },
            Timon: { key: "timon", tokenRarities: [U, U], tokenName: "Lei" },
            Pumbaa: {
                key: "pumbaa",
                tokenRarities: [C, C],
                tokenName: "Grubs"
            },
            Shenzi: { key: "shenzi", tokenRarities: [R, R], tokenName: "Bone" },
            Banzai: { key: "banzai", tokenRarities: [U, R], tokenName: "Bone" },
            Ed: { key: "ed", tokenRarities: [R, R], tokenName: "Bone" }
        },
        floatTokens: [
            { name: CHARACTERS.SIMBA, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.NALA, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.ZAZU, type: "character", tokenType: EARS },
            { name: CHARACTERS.TIMON, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.PUMBAA, type: "character", tokenType: TOKEN }
        ]
    },
    Aladdin: {
        key: "aladdin",
        characters: {
            Aladdin: {
                key: "aladdin",
                tokenRarities: [C, U],
                tokenName: "Saber"
            },
            Jasmine: {
                key: "jasmine",
                tokenRarities: [U, R],
                tokenName: "Tiara"
            },
            Abu: {
                key: "abu",
                tokenRarities: [U, U],
                tokenName: "Bitten Bread"
            },
            Carpet: {
                key: "carpet",
                tokenRarities: [U, R],
                tokenName: "Tassels"
            },
            Jafar: { key: "jafar", tokenRarities: [E, E], tokenName: "Staff" },
            Iago: { key: "iago", tokenRarities: [U, R], tokenName: "Feather" },
            Genie: {
                key: "genie",
                tokenRarities: [R, R],
                tokenName: "Gauntlets"
            },
            Rajah: {
                key: "rajah",
                tokenRarities: [R, E],
                tokenName: "Torn Garments"
            },
            Sultan: {
                key: "sultan",
                tokenRarities: [R, R],
                tokenName: "Animal Figurines"
            }
        },
        floatTokens: [
            { name: CHARACTERS.ALADDIN, type: "character", tokenType: EARS },
            { name: CHARACTERS.JASMINE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.ABU, type: "character", tokenType: EARS },
            { name: CHARACTERS.GENIE, type: "character", tokenType: EARS },
            { name: CHARACTERS.JAFAR, type: "character", tokenType: TOKEN }
        ]
    },
    Alice: {
        key: "aiw",
        nickname: "AIW",
        characters: {
            Alice: {
                key: "alice",
                tokenRarities: [R, R],
                tokenName: '"Drink Me" Potion'
            },
            "Mad Hatter": {
                key: "madhatter",
                tokenRarities: [C, U],
                tokenName: "Tasty Saucer"
            },
            "March Hare": {
                key: "marchhare",
                tokenRarities: [U, U],
                tokenName: "Wooden Hammer"
            },
            "White Rabbit": {
                key: "whiterabbit",
                tokenRarities: [U, R],
                tokenName: "Pocket Watch"
            },
            Caterpillar: {
                key: "caterpillar",
                tokenRarities: [R, R],
                tokenName: "Tiny Khussas"
            },
            "Queen of Hearts": {
                key: "queenofhearts",
                tokenRarities: [E, E],
                tokenName: "Heart Fan"
            },
            "Cheshire Cat": {
                key: "cheshire",
                tokenRarities: [U, R],
                tokenName: "Mischievous Crown"
            }
        },
        floatTokens: [
            { name: CHARACTERS.ALICE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.MAD_HATTER, type: "character", tokenType: EARS },
            { name: CHARACTERS.MARCH_HARE, type: "character", tokenType: EARS },
            {
                name: CHARACTERS.CATERPILLAR,
                type: "character",
                tokenType: TOKEN
            },
            {
                name: CHARACTERS.QUEEN_OF_HEARTS,
                type: "character",
                tokenType: TOKEN
            }
        ]
    },
    "Snow White": {
        key: "snow",
        characters: {
            Bashful: {
                key: "bashful",
                tokenRarities: [U, R],
                tokenName: "Concertina"
            },
            Doc: { key: "doc", tokenRarities: [C, U], tokenName: "Swanette" },
            Sneezy: { key: "sneezy", tokenRarities: [U, U], tokenName: "Lute" },
            Dopey: { key: "dopey", tokenRarities: [C, U], tokenName: "Cymbal" },
            Happy: { key: "happy", tokenRarities: [U, R], tokenName: "Drum" },
            "Snow White": {
                key: "snowwhite",
                tokenRarities: [R, R],
                tokenName: "Singing Bluebird"
            },
            "Snow Prince": {
                key: "snow prince",
                tokenRarities: [R, E],
                tokenName: "Feathered Hat"
            },
            "The Queen": {
                key: "thequeen",
                tokenRarities: [E, E],
                tokenName: "Heart Box"
            },
            Grumpy: {
                key: "grumpy",
                tokenRarities: [U, L],
                tokenName: "Musical Owl"
            },
            Sleepy: {
                key: "sleepy",
                tokenRarities: [U, R],
                tokenName: "Fish Clarinet"
            }
        },
        floatTokens: [
            {
                name: CHARACTERS.SNOW_WHITE,
                type: "character",
                tokenType: TOKEN
            },
            { name: CHARACTERS.DOC, type: "character", tokenType: EARS },
            { name: CHARACTERS.SNEEZY, type: "character", tokenType: EARS },
            { name: CHARACTERS.BASHFUL, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.THE_QUEEN, type: "character", tokenType: TOKEN }
        ]
    },
    Pooh: {
        key: "wtp",
        nickname: "WTP",
        characters: {
            "Christopher Robin": {
                key: "cr",
                tokenRarities: [E, L],
                tokenName: "Drum"
            },
            "Winnie the Pooh": {
                key: "pooh",
                tokenRarities: [R, E],
                tokenName: "Pot of Honey"
            },
            Eeyore: {
                key: "eeyore",
                tokenRarities: [U, R],
                tokenName: "Thistle Flower"
            },
            Tigger: {
                key: "tigger",
                tokenRarities: [U, R],
                tokenName: "Bouncy Spring"
            },
            Kanga: { key: "kanga", tokenRarities: [U, U], tokenName: "Apron" },
            Roo: {
                key: "roo",
                tokenRarities: [R, R],
                tokenName: "Family Picture"
            },
            Piglet: {
                key: "piglet",
                tokenRarities: [R, R],
                tokenName: "Scarf"
            },
            Rabbit: {
                key: "rabbit",
                tokenRarities: [C, U],
                tokenName: "Carrot Plant"
            },
            Owl: { key: "owl", tokenRarities: [null, null], tokenName: "Books" }
        },
        floatTokens: [
            { name: CHARACTERS.POOH, type: "character", tokenType: EARS },
            { name: CHARACTERS.KANGA, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.ROO, type: "character", tokenType: EARS },
            { name: CHARACTERS.PIGLET, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.RABBIT, type: "character", tokenType: EARS }
        ]
    },
    "Lilo and Stitch": {
        key: "l&s",
        nickname: "L&S",
        characters: {
            Nani: {
                key: "nani",
                tokenRarities: [C, U],
                tokenName: "Surfboard"
            },
            Lilo: { key: "lilo", tokenRarities: [R, R], tokenName: "Scrump" },
            Stitch: {
                key: "stitch",
                tokenRarities: [R, E],
                tokenName: "Blaster"
            },
            Angel: {
                key: "angel",
                tokenRarities: [U, R],
                tokenName: "Musical Notes"
            },
            Pleakley: {
                key: "pleakley",
                tokenRarities: [U, R],
                tokenName: "Communicator"
            },
            Jumba: {
                key: "jumba",
                tokenRarities: [U, R],
                tokenName: "Binoculars"
            },
            "Cobra Bubbles": {
                key: "cobrabubbles",
                tokenRarities: [U, U],
                tokenName: "Briefcase"
            }
        },
        floatTokens: [
            { name: CHARACTERS.STITCH, type: "character", tokenType: EARS },
            { name: CHARACTERS.LILO, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.NANI, type: "character", tokenType: EARS },
            { name: CHARACTERS.ANGEL, type: "character", tokenType: EARS },
            {
                name: CHARACTERS.COBRA_BUBBLES,
                type: "character",
                tokenType: TOKEN
            }
        ]
    },
    "Big Hero 6": {
        key: "bh6",
        nickname: "BH6",
        characters: {
            Hiro: { key: "hiro", tokenRarities: [C, U], tokenName: "Bot" },
            Baymax: {
                key: "baymax",
                tokenRarities: [E, E],
                tokenName: "Tadashi's Chip"
            },
            Yokai: {
                key: "yokai",
                tokenRarities: [U, R],
                tokenName: "Abigail's Photo"
            },
            "Go Go": {
                key: "gogo",
                tokenRarities: [U, R],
                tokenName: "Electro-magnetic Discs"
            },
            "Honey Lemon": {
                key: "honey",
                tokenRarities: [U, U],
                tokenName: "Mobile Lab Purse"
            },
            Fred: {
                key: "fred",
                tokenRarities: [U, R],
                tokenName: "San Fransokyo Board"
            },
            Wasabi: { key: "wasabi", tokenRarities: [R, R], tokenName: "Visor" }
        },
        floatTokens: [
            { name: CHARACTERS.HIRO, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.YOKAI, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.WASABI, type: "character", tokenType: TOKEN },
            {
                name: CHARACTERS.HONEY_LEMON,
                type: "character",
                tokenType: TOKEN
            },
            { name: GROUPS.BH6, type: "common", tokenType: COMMON }
        ]
    },
    "The Little Mermaid": {
        key: "tlm",
        nickname: "TLM",
        characters: {
            Sebastian: {
                key: "sebastian",
                tokenRarities: [C, C],
                tokenName: "Conductor's Book"
            },
            Scuttle: {
                key: "scuttle",
                tokenRarities: [U, U],
                tokenName: "Spyglass"
            },
            Ariel: { key: "ariel", tokenRarities: [E, E], tokenName: "Purse" },
            "Prince Eric": {
                key: "eric",
                tokenRarities: [U, R],
                tokenName: "Flute"
            },
            "King Triton": {
                key: "triton",
                tokenRarities: [R, R],
                tokenName: "Trident"
            },
            Flounder: {
                key: "flounder",
                tokenRarities: [U, R],
                tokenName: "Porthole"
            },
            Ursula: {
                key: "ursula",
                tokenRarities: [L, R],
                tokenName: "Shell Necklace"
            }
        },
        floatTokens: [
            { name: CHARACTERS.SEBASTIAN, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.SCUTTLE, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.TRITON, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.URSULA, type: "character", tokenType: TOKEN },
            { name: GROUPS.TLM, type: "common", tokenType: COMMON }
        ]
    },
    "Wreck-It Ralph": {
        key: "wir",
        nickname: "WIR",
        characters: {
            Ralph: {
                key: "ralph",
                tokenRarities: [C, C],
                tokenName: "Hero Medal, Left Side"
            },
            Vanellope: {
                key: "vanellope",
                tokenRarities: [E, E],
                tokenName: "Hero Medal, Right Side"
            },
            "Fix-It Felix Jr.": {
                key: "felix",
                tokenRarities: [U, R],
                tokenName: "Hammer"
            },
            Calhoun: {
                key: "calhoun",
                tokenRarities: [U, R],
                tokenName: "Pack"
            },
            Spamley: {
                key: "spamley",
                tokenRarities: [U, U],
                tokenName: "Loot Finder Ad"
            },
            Gord: {
                key: "gord",
                tokenRarities: [E, L],
                tokenName: "LootFindr Stack"
            },
            Yesss: {
                key: "yesss",
                tokenRarities: [R, R],
                tokenName: "Wristband"
            },
            Shank: { key: "shank", tokenRarities: [U, U], tokenName: "Gloves" }
        },
        floatTokens: [
            { name: CHARACTERS.RALPH, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.CALHOUN, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.SPAMLEY, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.YESSS, type: "character", tokenType: TOKEN }
        ]
    },
    "Princess and the Frog": {
        key: "patf",
        nickname: "PATF",
        characters: {
            "Prince Naveen": {
                key: "naveen",
                tokenRarities: [U, U],
                tokenName: "Swampy Ukulele"
            },
            Tiana: {
                key: "tiana",
                tokenRarities: [R, E],
                tokenName: "Beignets"
            },
            Eudora: {
                key: "eudora",
                tokenRarities: [C, C],
                tokenName: "Pin Cushion Band"
            },
            "Charlotte La Bouff": {
                key: "lottie",
                tokenRarities: [U, R],
                tokenName: "Face Powder Compact"
            },
            "Dr. Facilier": {
                key: "facilier",
                tokenRarities: [E, E],
                tokenName: "Pendant"
            },
            Louis: {
                key: "louis",
                tokenRarities: [U, R],
                tokenName: "Trumpet"
            },
            "Mama Odie": {
                key: "odie",
                tokenRarities: [R, R],
                tokenName: "Gourd Wand"
            }
        },
        floatTokens: [
            { name: CHARACTERS.EUDORA, type: "character", tokenType: EARS },
            { name: CHARACTERS.LOUIS, type: "character", tokenType: TOKEN },
            { name: CHARACTERS.TIANA, type: "character", tokenType: EARS },
            { name: CHARACTERS.FACILIER, type: "character", tokenType: TOKEN },
            { name: GROUPS.PATF, type: "common", tokenType: COMMON }
        ]
    },
    Moana: {
        key: "moana",
        characters: {
            Sina: {
                key: "sina",
                tokenRarities: [C, C],
                tokenName: "Woven Basket"
            },
            Moana: {
                key: "moana",
                tokenRarities: [U, R],
                tokenName: "Necklace"
            },
            Maui: {
                key: "maui",
                tokenRarities: [U, R],
                tokenName: "Fish Hook"
            },
            "Hei Hei": {
                key: "heihei",
                tokenRarities: [U, R],
                tokenName: "Trail Mix"
            },
            "Chief Tui": {
                key: "tui",
                tokenRarities: [U, U],
                tokenName: "Staff"
            },
            "Gramma Tala": {
                key: "tala",
                tokenRarities: [U, R],
                tokenName: "Stingray Tapestry"
            },
            Pua: {
                key: "pua",
                tokenRarities: [R, R],
                tokenName: "Pig Tapestry"
            }
        },
        floatTokens: [
            { name: CHARACTERS.SINA, type: "character", tokenType: EARS },
            {
                name: CHARACTERS.GRAMMA_TALA,
                type: "character",
                tokenType: TOKEN
            },
            { name: CHARACTERS.CHIEF_TUI, type: "character", tokenType: EARS },
            { name: CHARACTERS.MAUI, type: "character", tokenType: EARS },
            { name: GROUPS.MOANA, type: "common", tokenType: COMMON }
        ]
    },
    "Finding Nemo": {
        key: "fn",
        nickname: "FN",
        characters: {
            Nemo: {
                key: "nemo",
                tokenRarities: [C, C],
                tokenName: "Fish Tank Accessory"
            },
            Marlin: {
                key: "marlin",
                tokenRarities: [U, E],
                tokenName: "P. Sherman Mask"
            },
            Dory: {
                key: "dory",
                tokenRarities: [R, R],
                tokenName: "Shell Path"
            },
            Hank: {
                key: "hank",
                tokenRarities: [U, R],
                tokenName: "Coffee Pot"
            },
            Crush: {
                key: "crush",
                tokenRarities: [U, U],
                tokenName: "Dude Rock"
            },
            Squirt: {
                key: "squirt",
                tokenRarities: [U, R],
                tokenName: "Shell Pattern"
            },
            Bruce: {
                key: "bruce",
                tokenRarities: [U, R],
                tokenName: "Dangerous Balloon"
            },
            Destiny: {
                key: "destiny",
                tokenRarities: [U, R],
                tokenName: "Pipe"
            },
            Bailey: {
                key: "bailey",
                tokenRarities: [E, L],
                tokenName: "Echolocation Machine"
            }
        },
        floatTokens: [
            { name: CHARACTERS.BRUCE, type: "character", tokenType: EARS },
            { name: CHARACTERS.CRUSH, type: "character", tokenType: EARS },
            { name: CHARACTERS.SQUIRT, type: "character", tokenType: EARS },
            { name: CHARACTERS.DORY, type: "character", tokenType: EARS }
        ]
    },
    Coco: {
        key: "coco",
        characters: {
            Miguel: {
                key: "miguel",
                tokenRarities: [U, U],
                tokenName: "Family Guitar"
            },
            Abuelita: {
                key: "abuelita",
                tokenRarities: [R, R],
                tokenName: "Sandal"
            },
            Dante: { key: "dante", tokenRarities: [U, R], tokenName: "Snacks" },
            "Mama Coco": {
                key: "coco",
                tokenRarities: [U, R],
                tokenName: "Papa's Photo"
            },
            "Mama Imelda": {
                key: "imelda",
                tokenRarities: [U, R],
                tokenName: "Shoe"
            },
            Hector: {
                key: "hector",
                tokenRarities: [E, R],
                tokenName: "Journal"
            },
            Ernesto: {
                key: "ernesto",
                tokenRarities: [U, U],
                tokenName: "Ernesto de la Cruz Vinyl"
            }
        },
        floatTokens: [
            { name: CHARACTERS.DANTE, tokenType: TOKEN },
            { name: CHARACTERS.ERNESTO, tokenType: EARS },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: EARS },
            { name: CHARACTERS.MAMA_COCO, tokenType: TOKEN },
            { name: CHARACTERS.ABUELITA, tokenType: EARS }
        ]
    },
    "Haunted Mansion": {
        key: "haunted mansion",
        characters: {
            "Hatbox Ghost": {
                key: "hatbox ghost",
                tokenRarities: [R, E],
                tokenName: "Ghostly Hatbox"
            },
            "The Bride": {
                key: "bride",
                tokenRarities: [U, E],
                tokenName: "Hatchet"
            },
            Ezra: {
                key: "ezra",
                tokenRarities: [C, C],
                tokenName: "Top Hat"
            },
            Gus: {
                key: "gus",
                tokenRarities: [U, R],
                tokenName: "Ball and Chain"
            },
            Phineas: {
                key: "phineas",
                tokenRarities: [C, U],
                tokenName: "Carpet Bag"
            }
        }
    },
    "Star Wars": {
        key: "starwars",
        characters: {
            "BB-8": { key: "bb8", tokenRarities: [U, R], tokenName: "Torch" },
            Poe: {
                key: "poe",
                tokenRarities: [C, U],
                tokenName: "Pilot Helmet"
            },
            Finn: { key: "finn", tokenRarities: [C, C], tokenName: "Vest" },
            Rey: { key: "rey", tokenRarities: [U, R], tokenName: "Staff" },
            "First Order Stormtrooper": {
                key: "firstorderstormtrooper",
                tokenRarities: [U, R],
                tokenName: "FO Stormtrooper Helmet"
            },
            "Kylo Ren": {
                key: "kylo",
                tokenRarities: [R, R],
                tokenName: "Lightsaber"
            },
            "General Hux": {
                key: "hux",
                tokenRarities: [U, U],
                tokenName: "First Order Emblem"
            },
            "The Mandalorian": {
                key: "mando",
                nickname: "Mandalorian",
                tokenRarities: [C, C],
                tokenName: "Beskar Steel Ingot"
            },
            "The Child": {
                key: "child",
                nickname: "Child",
                tokenRarities: [E, E],
                tokenName: "Hover Pram"
            },
            Kuiil: {
                key: "kuiil",
                tokenRarities: [U, R],
                tokenName: "Kuiil Goggles"
            },
            "Cara Dune": {
                key: "cara dune",
                tokenRarities: [U, R],
                tokenName: "Chest Armor"
            },
            "Greef Karga": {
                key: "greef karga",
                tokenRarities: [C, U],
                tokenName: "Bounty Puck"
            },
            "Fennec Shand": {
                key: "fennec shand",
                tokenRarities: [C, U],
                tokenName: "Rifle"
            },
            "Ahsoka Tano": {
                key: "ahsoka",
                tokenRarities: [U, R],
                tokenName: "Lightsabers"
            },
            "Boba Fett": {
                key: "boba fett",
                tokenRarities: [R, E],
                tokenName: "Blaster"
            },
            "Luke Skywalker": {
                key: "luke",
                tokenRarities: [C, C],
                tokenName: ""
            },
            "Leia Organa": {
                key: "leia",
                tokenRarities: [C, U],
                tokenName: ""
            },
            "Han Solo": {
                key: "hansolo",
                tokenRarities: [U, R],
                tokenName: "Blaster"
            },
            Chewbacca: {
                key: "chewy",
                tokenRarities: [U, R],
                tokenName: "Bandolier"
            },
            "Darth Vader": {
                key: "darthvader",
                tokenRarities: [R, E],
                tokenName: "Lightsaber"
            },
            "TIE Fighter Pilot": {
                key: "tiefighterpilot",
                tokenRarities: [C, U],
                tokenName: ""
            },
            "R2-D2": {
                key: "r2d2",
                tokenRarities: [U, R],
                tokenName: "Data Card"
            },
            "C-3PO": {
                key: "c3po",
                tokenRarities: [C, U],
                tokenName: "Threepio Arm"
            },
            [CHARACTERS.IMPERIAL_STORMTROOPER]: {
                key: "imperialstormtrooper",
                tokenRarities: [null, null],
                tokenName: "Blaster"
            },
            [CHARACTERS.LANDO_CALRISSIAN]: {
                key: "lando",
                tokenRarities: [null, null],
                tokenName: "Cape"
            },
            [CHARACTERS.YODA]: {
                key: "yoda",
                tokenRarities: [null, null],
                tokenName: "Gimer Stick"
            }
        },
        floatTokens: [
            { name: CHARACTERS.FINN, tokenType: TOKEN },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: EARS },
            { name: CHARACTERS.POE, tokenType: EARS },
            { name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: TOKEN },
            { name: CHARACTERS.KUIIL, tokenType: EARS },
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS },
            { name: CHARACTERS.CARA_DUNE, tokenType: EARS },
            { name: CHARACTERS.THE_CHILD, tokenType: EARS, remove: true },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS },
            { name: CHARACTERS.LEIA_ORGANA, tokenType: TOKEN },
            { name: CHARACTERS.LEIA_ORGANA, tokenType: EARS },
            { name: CHARACTERS.CHEWBACCA, tokenType: TOKEN },
            { name: CHARACTERS.CHEWBACCA, tokenType: EARS },
            { name: CHARACTERS.LANDO_CALRISSIAN, tokenType: TOKEN },
            { name: CHARACTERS.LANDO_CALRISSIAN, tokenType: EARS },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: EARS }
        ]
    },
    Onward: {
        key: "onward",
        characters: {
            Dad: { key: "dad", tokenRarities: [U, R], tokenName: "Socks" },
            Barley: {
                key: "barley",
                tokenRarities: [C, C],
                tokenName: "Quests of Yore Card"
            },
            Ian: { key: "ian", tokenRarities: [R, R], tokenName: "Staff" },
            Laurel: {
                key: "laurel",
                tokenRarities: [U, U],
                tokenName: "Incoming Call"
            },
            Blazey: {
                key: "blazey",
                tokenRarities: [U, R],
                tokenName: "Spray Bottle"
            },
            "The Manticore": {
                key: "manticore",
                tokenRarities: [U, R],
                tokenName: "Sword"
            },
            Colt: {
                key: "colt",
                tokenRarities: [C, U],
                tokenName: "Officer Glasses"
            }
        },
        floatTokens: [
            { name: CHARACTERS.BLAZEY, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: EARS },
            { name: CHARACTERS.LAUREL, tokenType: EARS },
            { name: CHARACTERS.DAD, tokenType: EARS },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    Hercules: {
        key: "hercules",
        characters: {
            Phil: { key: "phil", tokenRarities: [C, C], tokenName: "" },
            Hercules: {
                key: "hercules",
                tokenRarities: [U, R],
                tokenName: "Belt"
            },
            Meg: {
                key: "meg",
                tokenRarities: [C, U],
                tokenName: "White Flower"
            },
            Pegasus: {
                key: "pegasus",
                tokenRarities: [U, R],
                tokenName: "Cloud Wings"
            },
            Pain: {
                key: "pain",
                tokenRarities: [U, R],
                tokenName: "Potion Vial"
            },
            Hades: {
                key: "hades",
                tokenRarities: [R, R],
                tokenName: "Sash Buckle"
            },
            Panic: {
                key: "panic",
                tokenRarities: [U, R],
                tokenName: "Potion Stopper"
            }
        },
        floatTokens: [{ name: CHARACTERS.PEGASUS, tokenType: EARS }]
    },
    Brave: {
        key: "brave",
        characters: {
            "Queen Elinor": {
                key: "elinor",
                nickname: "Elinor",
                tokenRarities: [C, C],
                tokenName: null
            },
            Merida: {
                key: "merida",
                tokenRarities: [R, E],
                tokenName: null
            },
            "King Fergus": {
                key: "fergus",
                nickName: "Fergus",
                tokenRarities: [U, R],
                tokenName: null
            },
            "Lord MacGuffin": {
                key: "macguffin",
                nickname: "MacGuffin",
                tokenRarities: [C, U],
                tokenName: null
            },
            "Lord Macintosh": {
                key: "macintosh",
                nickname: "Macintosh",
                tokenRarities: [U, R],
                tokenName: null
            },
            "Lord Dingwall": {
                key: "dingwall",
                nickname: "Dingwall",
                tokenRarities: [C, U],
                tokenName: null
            }
        },
        floatTokens: [
            { name: CHARACTERS.LORD_DINGWALL, tokenType: TOKEN },
            { name: CHARACTERS.LORD_DINGWALL, tokenType: EARS },
            { name: CHARACTERS.QUEEN_ELINOR, tokenType: TOKEN },
            { name: CHARACTERS.QUEEN_ELINOR, tokenType: EARS },
            { name: CHARACTERS.LORD_MACGUFFIN, tokenType: TOKEN }
        ]
    },
    "Raya and the Last Dragon": {
        key: "raya",
        nickname: "Raya",
        characters: {
            Raya: { key: "raya", tokenRarities: [R, E], tokenName: "Sword" },
            Sisu: { key: "sisu", tokenRarities: [U, R], tokenName: "Gift Box" },
            Namaari: {
                key: "namaari",
                tokenRarities: [C, U],
                tokenName: "Dragon Charm Necklace"
            },
            "Tuk Tuk": {
                key: "tuktuk",
                tokenRarities: [C, U],
                tokenName: "Saddle"
            },
            Boun: {
                key: "boun",
                tokenRarities: [C, C],
                tokenName: "Shrimp"
            }
        },
        floatTokens: [
            { name: CHARACTERS.NAMAARI, tokenType: TOKEN },
            { name: CHARACTERS.NAMAARI, tokenType: EARS },
            { name: CHARACTERS.TUK_TUK, tokenType: TOKEN },
            { name: CHARACTERS.TUK_TUK, tokenType: EARS },
            { name: CHARACTERS.SISU, tokenType: EARS }
        ]
    },
    Luca: {
        key: "luca",
        characters: {
            Luca: {
                key: "luca",
                tokenRarities: [C, U],
                tokenName: "Astronomy Book"
            },
            Alberto: {
                key: "alberto",
                tokenRarities: [U, U],
                tokenName: "Drawing"
            },
            Giulia: {
                key: "giulia",
                tokenRarities: [U, R],
                tokenName: "Telescope"
            },
            Ercole: {
                key: "ercole",
                tokenRarities: [R, E],
                tokenName: "Sandwich"
            },
            Machiavelli: {
                key: "machiavelli",
                tokenRarities: [C, C],
                tokenName: "Sardine"
            }
        },
        floatTokens: [
            { name: CHARACTERS.MACHIAVELLI, tokenType: EARS },
            { name: CHARACTERS.GIULIA, tokenType: TOKEN },
            { name: CHARACTERS.GIULIA, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: TOKEN },
            { name: CHARACTERS.ERCOLE, tokenType: EARS }
        ]
    },
    "101 Dalmatians": {
        key: "dalmatians",
        nickname: "101D",
        characters: {
            Perdita: {
                key: "perdita",
                tokenRarities: [R, R],
                tokenName: "Anita's Hat"
            },
            Rolly: {
                key: "rolly",
                tokenRarities: [U, R],
                tokenName: "Mortadella"
            },
            Pongo: {
                key: "pongo",
                tokenRarities: [C, C],
                tokenName: "Roger's Hat"
            },
            Cruella: {
                key: "cruella",
                tokenRarities: [R, E],
                tokenName: "De Vil Phone"
            },
            Lucky: {
                key: "lucky",
                tokenRarities: [C, U],
                tokenName: "Blanket"
            },
            Patch: {
                key: "patch",
                tokenRarities: [U, R],
                tokenName: "Thunderbolt Plushie"
            },
            Penny: { key: "penny", tokenRarities: [C, U], tokenName: "Plushie" }
        },
        floatTokens: [
            { name: CHARACTERS.PENNY, tokenType: TOKEN },
            { name: CHARACTERS.PONGO, tokenType: TOKEN },
            { name: CHARACTERS.PONGO, tokenType: EARS },
            { name: CHARACTERS.LUCKY, tokenType: TOKEN },
            { name: CHARACTERS.LUCKY, tokenType: EARS }
        ]
    },
    Pinocchio: {
        key: "pinocchio",
        nickname: "Pinocchio",
        characters: {
            [CHARACTERS.JIMINY_CRICKET]: {
                key: "jiminy cricket",
                tokenRarities: [C, C],
                tokenName: "Umbrella"
            },
            [CHARACTERS.PINOCCHIO]: {
                key: "pinocchio",
                tokenRarities: [E, R],
                tokenName: "School Supplies"
            },
            [CHARACTERS.GEPPETTO]: {
                key: "gepetto",
                tokenRarities: [C, U],
                tokenName: "Paintbrush"
            },
            [CHARACTERS.FIGARO]: {
                key: "figaro",
                tokenRarities: [C, U],
                tokenName: ""
            },
            [CHARACTERS.HONEST_JOHN]: {
                key: "honest john",
                tokenRarities: [U, R],
                tokenName: "Cane"
            },
            [CHARACTERS.STROMBOLI]: {
                key: "stromboli",
                tokenRarities: [R, R],
                tokenName: "Fake Coin"
            },
            [CHARACTERS.BLUE_FAIRY]: {
                key: "blue fairy",
                tokenRarities: [U, R],
                tokenName: "Wand"
            }
        },
        floatTokens: [
            { name: CHARACTERS.FIGARO, tokenType: TOKEN },
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: TOKEN },
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: EARS },
            { name: CHARACTERS.GEPPETTO, tokenType: TOKEN },
            { name: CHARACTERS.GEPPETTO, tokenType: EARS }
        ]
    },
    "Robin Hood": {
        key: "robinhood",
        nickname: "RH",
        characters: {
            [CHARACTERS.MAID_MARIAN]: {
                key: "maid marian",
                tokenRarities: [C, U],
                tokenName: "Brooch"
            },
            [CHARACTERS.ROBIN_HOOD]: {
                key: "robin hood",
                tokenRarities: [R, E],
                tokenName: "Bycocket"
            },
            [CHARACTERS.LITTLE_JOHN]: {
                key: "little john",
                tokenRarities: [C, C],
                tokenName: "Lute"
            },
            [CHARACTERS.SIR_HISS]: {
                key: "sir hiss",
                tokenRarities: [U, R],
                tokenName: "Bonnet"
            },
            [CHARACTERS.PRINCE_JOHN]: {
                key: "prince john",
                tokenRarities: [R, R],
                tokenName: "Crown"
            }
        },
        floatTokens: [
            { name: CHARACTERS.SIR_HISS, tokenType: TOKEN },
            { name: CHARACTERS.SIR_HISS, tokenType: EARS },
            { name: CHARACTERS.MAID_MARIAN, tokenType: TOKEN },
            { name: CHARACTERS.MAID_MARIAN, tokenType: EARS },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: TOKEN }
        ]
    },
    Up: {
        key: "up",
        characters: {
            [CHARACTERS.CHARLES_MUNTZ]: {
                key: "charles muntz",
                tokenRarities: [C, U],
                tokenName: "Cane"
            },
            [CHARACTERS.DUG]: {
                key: "dug",
                tokenRarities: [R, E],
                tokenName: "Translator Collar"
            },
            [CHARACTERS.CARL_FREDRICKSEN]: {
                key: "carlfrederickson",
                tokenRarities: [E, L],
                tokenName: "Glasses"
            },
            [CHARACTERS.RUSSELL]: {
                key: "russell",
                tokenRarities: [C, C],
                tokenName: "Wilderness Explorers Flag"
            },
            [CHARACTERS.KEVIN]: {
                key: "kevin",
                tokenRarities: [U, R],
                tokenName: "Chocolate Bar"
            }
        },
        floatTokens: [
            { name: GROUPS.UP, tokenType: COMMON },
            { name: CHARACTERS.DUG, tokenType: EARS },
            { name: CHARACTERS.CHARLES_MUNTZ, tokenType: TOKEN },
            { name: CHARACTERS.KEVIN, tokenType: TOKEN },
            { name: CHARACTERS.KEVIN, tokenType: EARS },
            { name: GROUPS.UP, tokenType: COMMON }
        ]
    },
    [GROUPS.TURNING_RED]: {
        key: "turningred",
        characters: {
            [CHARACTERS.MIRIAM]: {
                key: "miriam",
                tokenRarities: [null, null],
                tokenName: "Skateboard"
            },
            [CHARACTERS.PRIYA]: {
                key: "priya",
                tokenRarities: [C, U],
                tokenName: "Vampire-Romance Novel"
            },
            [CHARACTERS.MING_LEE]: {
                key: "minglee",
                tokenRarities: [null, null],
                tokenName: "Talisman"
            },
            [CHARACTERS.ABBY]: {
                key: "abby",
                tokenRarities: [R, E],
                tokenName: "Headband"
            },
            [CHARACTERS.MEILIN]: {
                key: "meilin",
                tokenRarities: [E, L],
                tokenName: "Flute"
            }
        },
        floatTokens: [
            { name: GROUPS.TURNING_RED, tokenType: COMMON },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN },
            { name: CHARACTERS.MIRIAM, tokenType: EARS },
            { name: CHARACTERS.MING_LEE, tokenType: EARS },
            { name: CHARACTERS.PRIYA, tokenType: EARS }
        ]
    },
    [GROUPS.HOCUS_POCUS]: {
        key: "hocuspocus",
        characters: {
            [CHARACTERS.WINIFRED_SANDERSON]: {
                key: "winifredsanderson",
                tokenRarities: [E, L],
                tokenName: "Broom"
            },
            [CHARACTERS.MARY_SANDERSON]: {
                key: "marysanderson",
                tokenRarities: [U, R],
                tokenName: "Cauldron"
            },
            [CHARACTERS.SARAH_SANDERSON]: {
                key: "sarahsanderson",
                tokenRarities: [C, C],
                tokenName: "Pretty Spider"
            }
        },
        floatTokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: TOKEN },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: EARS }
        ]
    }
};
//end

const formatMagicCosts = (costArr) => {
    let costs = {};
    for (let i = 0; i <= 9; i++) {
        if (costArr && costArr[i]) {
            costs[i] = costArr[i];
        } else {
            costs[i] = null;
        }
    }

    return costs;
};

let characters = [];
let groups = [];
let characterTokens = [];

let floatCharacterTokens = [];
let floatGroupTokens = [];
let floatSpecialTokens = [];

let charIndex = 0;
let charOrderNums = {};
for (let group of groupOrder) {
    const { characters } = characterData[group];
    for (let char of Object.keys(characters)) {
        charOrderNums[char] = charIndex;
        charIndex++;
    }
}

for (let group in characterData) {
    groups.push({
        name: group,
        key: characterData[group].key,
        nickname: characterData[group].nickname,
        order: _.indexOf(groupOrder, group)
    });

    // character info
    const charsInGroup = characterData[group].characters;
    for (let char in charsInGroup) {
        const name = char;
        const { key, nickname, tokenRarities, tokenName } = charsInGroup[char];
        charIndex++;
        characters.push({
            name,
            key,
            nickname,
            group,
            magic_costs: formatMagicCosts(magicCosts[name]),
            order: charOrderNums[name]
        });

        if (tokenRarities) {
            characterTokens.push({
                name,
                tokenType: "token",
                rarity: tokenRarities[0],
                tokenName
            });
            characterTokens.push({
                name,
                tokenType: "ears",
                rarity: tokenRarities[1],
                tokenName
            });
        }
    }

    // float token drop info
    const tokens = characterData[group].floatTokens;
    // { name: 'Dory', type: 'character', tokenType: 'ears' } ]
    for (let i in tokens) {
        const { name, type, tokenType, remove } = tokens[i];
        if (type === "character" || tokenType === TOKEN || tokenType === EARS) {
            floatCharacterTokens.push({
                group,
                token_key: `${name}-${tokenType}`,
                remove
            });
        } else if (tokenType === COMMON) {
            floatGroupTokens.push({
                group,
                token_group: name,
                remove
            });
        } else if (tokenType === "special") {
            floatSpecialTokens.push({ group, name, remove });
        }
    }
}

module.exports = {
    characters,
    groups,
    characterTokens,
    floatCharacterTokens,
    floatGroupTokens,
    floatSpecialTokens,
    formatMagicCosts
};
