const {
    CHARACTERS: CHARS,
    GROUPS,
    SPECIAL_ITEMS
} = require("../data/constants");

const NO_EVENT = {
    NAME: "",
    TYPE: "",
    GROUPS: [],
    CHARACTERS: [],
    SPECIAL_TOKENS: []
};

/////////////////////////////////////////////////////////////
// regular event template
/////////////////////////////////////////////////////////////

const REGULAR = {
    NAME: GROUPS.HOCUS_POCUS,
    TYPE: "Regular",
    DATES: {
        1: "October 20",
        2: "October 22",
        3: "October 29"
    },
    GROUPS: [
        { name: GROUPS.HOCUS_POCUS, type: "featured" },
        { name: GROUPS.AIW, type: "helper" }
    ],
    CHARACTERS: [
        {
            name: CHARS.SARAH_SANDERSON,
            req_levels: { 1: null, 2: null, 3: null }
        },
        {
            name: CHARS.WINIFRED_SANDERSON,
            req_levels: { 1: null, 2: null, 3: null }
        },
        {
            name: CHARS.MARY_SANDERSON,
            premium: true
        }
    ],
    SPECIAL_TOKENS: []
    // past special tokens example:
    // SPECIAL_TOKENS: [SPECIAL_ITEMS.PUPPY_LEASH, SPECIAL_ITEMS.FEATHERDUSTER]
};

/////////////////////////////////////////////////////////////
// permanent content event template
/////////////////////////////////////////////////////////////

const PERM_CONTENT = {
    NAME: "Shock and Barrel",
    TYPE: "Regular",
    GROUPS: [{ name: "Nightmare", type: "featured" }],
    CHARACTERS: [],
    SPECIAL_TOKENS: [
        "Garden Shears",
        "Curse-Be-Gone",
        "Lantern",
        "Lotus Candle"
    ]
};

/////////////////////////////////////////////////////////////
// mini event template
/////////////////////////////////////////////////////////////

const MINI = {
    NAME: "Fly Free!",
    // NAME: "Cascading Tapper Event",
    TYPE: "Mini Event",
    GROUPS: [],
    CHARACTERS: [],
    SPECIAL_TOKENS: [SPECIAL_ITEMS.BAG, SPECIAL_ITEMS.STRING]
};

/////////////////////////////////////////////////////////////
// tower event template
/////////////////////////////////////////////////////////////

const TC = {
    NAME: "Tower Challenge 16: Bailey",
    TYPE: "Tower Challenge",
    DATES: {
        1: "June 2",
        2: "June 7",
        3: "June 12"
    },
    // featured groups and their chapters for ordering
    GROUPS: [
        { name: GROUPS.FN, chapter: 1 },
        { name: GROUPS.MOANA, chapter: 2 },
        { name: GROUPS.TLM, chapter: 3 }
    ],
    CHARACTERS: [
        //chap 1
        { name: CHARS.PLEAKLEY, chapter: 1, featured: true, row: 5 },
        { name: CHARS.MICKEY, chapter: 1, row: 1 },
        { name: CHARS.BO_PEEP, chapter: 1, row: 1 },
        { name: CHARS.LILO, chapter: 1, row: 1 },
        { name: CHARS.NANI, chapter: 1, row: 1 },
        { name: CHARS.PETE, chapter: 1, row: 1 },
        { name: CHARS.WOODY, chapter: 1, row: 2 },
        { name: CHARS.DUCKY, chapter: 1, row: 2 },
        { name: CHARS.ANGEL, chapter: 1, row: 2 },
        { name: CHARS.PLUTO, chapter: 1, row: 2 },
        { name: CHARS.SARGE, chapter: 1, row: 3 },
        { name: CHARS.MIKE, chapter: 1, row: 3 },
        { name: CHARS.COBRA_BUBBLES, chapter: 1, row: 3 },
        { name: CHARS.EVE, chapter: 1, row: 3 },
        { name: CHARS.HAMM, chapter: 1, row: 4 },
        { name: CHARS.CELIA, chapter: 1, row: 4 },
        { name: CHARS.STITCH, chapter: 1, row: 4 },
        { name: CHARS.JUMBA, chapter: 1, row: 4 },
        // chap 2
        { name: CHARS.GOGO, chapter: 2, featured: true, row: 5 },
        { name: CHARS.ROZ, chapter: 2, row: 1 },
        { name: CHARS.FLYNN, chapter: 2, row: 1 },
        { name: CHARS.BAYMAX, chapter: 2, row: 1 },
        { name: CHARS.HONEY_LEMON, chapter: 2, row: 1 },
        { name: CHARS.TINK, chapter: 2, row: 1 },
        { name: CHARS.TIA_DALMA, chapter: 2, row: 2 },
        { name: CHARS.HIRO, chapter: 2, row: 2 },
        { name: CHARS.YOKAI, chapter: 2, row: 2 },
        { name: CHARS.GOOFY, chapter: 2, row: 3 },
        { name: CHARS.WASABI, chapter: 2, row: 3 },
        { name: CHARS.MAXIMUS, chapter: 2, row: 3 },
        { name: CHARS.BARBOSSA, chapter: 2, row: 3 },
        { name: CHARS.CINDERELLA, chapter: 2, row: 4 },
        { name: CHARS.MERRYWEATHER, chapter: 2, row: 4 },
        { name: CHARS.FRED, chapter: 2, row: 4 },
        // chap 3
        { name: CHARS.WHITE_RABBIT, chapter: 3, featured: true, row: 5 },
        { name: CHARS.CHARMING, chapter: 3, row: 1 },
        { name: CHARS.ALICE, chapter: 3, row: 1 },
        { name: CHARS.CATERPILLAR, chapter: 3, row: 1 },
        { name: CHARS.RAPUNZEL, chapter: 3, row: 1 },
        { name: CHARS.WILL_TURNER, chapter: 3, row: 2 },
        { name: CHARS.MAD_HATTER, chapter: 3, row: 2 },
        { name: CHARS.QUEEN_OF_HEARTS, chapter: 3, row: 2 },
        { name: CHARS.SULLEY, chapter: 3, row: 2 },
        { name: CHARS.MARCH_HARE, chapter: 3, row: 3 },
        { name: CHARS.FORKY, chapter: 3, row: 3 },
        { name: CHARS.FAIRY_GODMOTHER, chapter: 3, row: 3 },
        { name: CHARS.CHESHIRE, chapter: 3, row: 4 },
        { name: CHARS.REMY, chapter: 3, row: 4 },
        { name: CHARS.ORVILLE, chapter: 3, row: 4 }
    ],
    SPECIAL_TOKENS: ["Refresh Token"]
};

/////////////////////////////////////////////////////////////
// cascading tapper event template
/////////////////////////////////////////////////////////////

const CASCADING = {
    NAME: "Cascading Tapper Event",
    TYPE: "Cascading Tapper Event",
    GROUPS: [],
    CHARACTERS: [],
    SPECIAL_TOKENS: [
        SPECIAL_ITEMS.ICE_SPIDER_EGG,
        SPECIAL_ITEMS.FLAMETHROWER,
        SPECIAL_ITEMS.DRUMSTICK,
        SPECIAL_ITEMS.BLASTER
    ]
};

// options: NO_EVENT, REGULAR, PERM_CONTENT, MINI, CASCADING, TC
module.exports = REGULAR;
