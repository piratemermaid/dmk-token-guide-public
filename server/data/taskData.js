const { flatten } = require("lodash");
const {
    GROUPS,
    CHARACTERS,
    SPECIAL_ITEMS,
    BUILDINGS,
    COSTUMES,
    TOKENS,
    REQ_TYPES
} = require("./constants");
const { SPECIAL_TOKENS } = require("./eventData");
const { COMMON, EARS, TOKEN, SPECIAL, FABRIC } = TOKENS;

const taskData = [
    //mickey
    {
        name: "Build a Snowman",
        characters: [
            {
                name: CHARACTERS.MICKEY,
                level: 2
            }
        ],
        time: "8m",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.MICKEY,
                name: COSTUMES.HOLIDAY
            }
        ],
        tokens: [{ name: CHARACTERS.OLAF, tokenType: TOKEN }]
    },
    {
        name: "Research Magic",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MF, tokenType: COMMON },
            { name: CHARACTERS.MRS_POTTS, tokenType: EARS }
        ]
    },
    {
        name: "Hang Out at Home",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "2h",
        required: [{ type: REQ_TYPES.BUILDING, name: BUILDINGS.MICKEY_HOUSE }],
        tokens: [
            { name: CHARACTERS.PUMBAA, tokenType: EARS },
            { name: CHARACTERS.SNEEZY, tokenType: EARS },
            { name: CHARACTERS.HONEY_LEMON, tokenType: TOKEN }
        ]
    },
    {
        name: "Play the Trumpet",
        characters: [{ name: CHARACTERS.MICKEY, level: 3 }],
        time: "2h",
        tokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.GOOFY, tokenType: EARS },
            { name: CHARACTERS.HAMM, tokenType: TOKEN },
            { name: CHARACTERS.BEAST, tokenType: EARS, remove: true }
        ]
    },
    {
        name: "Sparkler",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "2h",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.MICKEY,
                name: COSTUMES.LUNAR
            }
        ],
        tokens: [
            { name: CHARACTERS.CHIP, tokenType: TOKEN },
            { name: CHARACTERS.DALE, tokenType: TOKEN },
            { name: CHARACTERS.LI_SHANG, tokenType: TOKEN },
            { name: CHARACTERS.MULAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Stock the Ship",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "2h",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.MICKEY,
                name: COSTUMES.CLASSIC
            },
            {
                type: REQ_TYPES.BUILDING,
                name: BUILDINGS.STEAMBOAT
            }
        ],
        tokens: [{ name: CHARACTERS.MINNIE, tokenType: TOKEN }]
    },
    {
        name: "Dance with Minnie",
        characters: [
            { name: CHARACTERS.MICKEY, level: 8 },
            { name: CHARACTERS.MINNIE, level: 8 }
        ],
        time: "2h"
    },
    {
        name: "High Five!",
        characters: [
            { name: CHARACTERS.MICKEY, level: 2 },
            { name: CHARACTERS.GOOFY, level: 1 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: TOKEN },
            { name: CHARACTERS.TINK, tokenType: TOKEN },
            { name: CHARACTERS.ALADDIN, tokenType: EARS }
        ]
    },
    {
        name: "Jamboree",
        characters: [
            { name: CHARACTERS.MICKEY, level: 2 },
            { name: CHARACTERS.GOOFY, level: 1 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.REX, tokenType: TOKEN },
            { name: CHARACTERS.MR_I, tokenType: EARS },
            { name: CHARACTERS.SYNDROME, tokenType: EARS },
            { name: CHARACTERS.DOC, tokenType: TOKEN },
            { name: CHARACTERS.HIRO, tokenType: EARS }
        ]
    },
    {
        name: "Mistletoe",
        characters: [
            { name: CHARACTERS.MICKEY, level: 2 },
            { name: CHARACTERS.MINNIE, level: 3 }
        ],
        time: "2h",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.MICKEY,
                name: COSTUMES.HOLIDAY
            }
        ],
        // TODO minnie holiday costume too?
        tokens: [{ name: CHARACTERS.HANS, tokenType: EARS }]
    },
    {
        name: "Musical Duet",
        characters: [
            { name: CHARACTERS.MICKEY, level: 9 },
            { name: CHARACTERS.MINNIE }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.RANDALL, tokenType: TOKEN },
            { name: CHARACTERS.DALE, tokenType: TOKEN }
        ]
    },
    {
        name: "Wheel of Fun",
        characters: [
            { name: CHARACTERS.MICKEY, level: 4 },
            { name: CHARACTERS.GOOFY, level: 4 }
        ],
        time: "2h",
        required: [
            { type: REQ_TYPES.BUILDING, name: BUILDINGS.MICKEY_FUN_WHEEL }
        ],
        tokens: [
            { name: CHARACTERS.BEAST, tokenType: TOKEN },
            { name: CHARACTERS.CHESHIRE, tokenType: TOKEN }
        ]
    },
    {
        name: "Dance a Jig",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "4h",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.MICKEY,
                name: COSTUMES.PIRATE
            }
        ],
        tokens: [
            { name: CHARACTERS.SARGE, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: TOKEN },
            { name: CHARACTERS.WHITE_RABBIT, tokenType: EARS },
            { name: "Green Dot", type: "fabric", tokenType: FABRIC },
            { name: "Blue", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Gift Ideas",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "4h",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.MICKEY,
                name: COSTUMES.HOLIDAY
            }
        ],
        tokens: [
            { name: CHARACTERS.ANNA, tokenType: EARS },
            { name: CHARACTERS.KRISTOFF, tokenType: TOKEN }
        ]
    },
    {
        name: "Trick or Treat",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "4h",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.MICKEY,
                name: COSTUMES.HALLOWEEN
            }
        ],
        tokens: [
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: EARS },
            { name: "Purple", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Visit Minnie's House",
        characters: [{ name: CHARACTERS.MICKEY, level: 7 }],
        time: "4h",
        required: [{ type: REQ_TYPES.BUILDING, name: BUILDINGS.MINNIE_HOUSE }],
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: TOKEN },
            { name: CHARACTERS.MAXIMUS, tokenType: TOKEN },
            { name: CHARACTERS.MAURICE, tokenType: TOKEN }
        ]
    },
    {
        name: "Food with a Friend",
        characters: [
            { name: CHARACTERS.MICKEY, level: 2 },
            { name: CHARACTERS.GOOFY, level: 5 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: EARS },
            { name: CHARACTERS.CELIA, tokenType: EARS },
            { name: CHARACTERS.SNOW_WHITE, tokenType: EARS },
            { name: CHARACTERS.DAD, tokenType: EARS },
            { name: CHARACTERS.QUEEN_ELINOR, tokenType: TOKEN }
        ]
    },
    {
        name: "Friend Coming Over",
        characters: [
            { name: CHARACTERS.MICKEY, level: 3 },
            { name: CHARACTERS.GOOFY, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TINK, tokenType: EARS },
            { name: CHARACTERS.COGSWORTH, tokenType: TOKEN },
            { name: CHARACTERS.MRS_POTTS, tokenType: TOKEN },
            { name: CHARACTERS.PRIYA, tokenType: EARS }
        ]
    },
    {
        name: "Hang Out at Goofy's Playhouse",
        characters: [
            { name: CHARACTERS.MICKEY, level: 5 },
            { name: CHARACTERS.GOOFY, level: 3 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.WILL_TURNER, tokenType: TOKEN },
            { name: CHARACTERS.RAPUNZEL, tokenType: TOKEN },
            { name: CHARACTERS.FROZONE, tokenType: EARS },
            { name: CHARACTERS.MIGUEL, tokenType: EARS },
            { name: CHARACTERS.POE, tokenType: TOKEN }
        ]
    },
    {
        name: "Musical Date",
        characters: [
            { name: CHARACTERS.MICKEY, level: 2 },
            { name: CHARACTERS.MINNIE, level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.MICKEY_PHIL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLYNN, tokenType: TOKEN },
            { name: CHARACTERS.DAD, tokenType: TOKEN },
            { name: CHARACTERS.DUG, tokenType: EARS },
            { name: CHARACTERS.MING_LEE, tokenType: EARS }
        ]
    },
    {
        name: "Visit the Fun Wheel",
        characters: [{ name: CHARACTERS.MICKEY, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.MICKEY_FUN_WHEEL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.PLUTO, tokenType: EARS },
            { name: CHARACTERS.CINDERELLA, tokenType: EARS, remove: true },
            { name: CHARACTERS.ELSA, tokenType: EARS, remove: true },
            { name: CHARACTERS.COLT, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.MACHIAVELLI, tokenType: EARS, remove: true },
            { name: CHARACTERS.RUSSELL, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Group Music Trip",
        characters: [
            { name: CHARACTERS.MICKEY, level: 4 },
            { name: CHARACTERS.GOOFY, level: 2 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.CHIP, tokenType: EARS },
            { name: CHARACTERS.DALE, tokenType: EARS },
            { name: CHARACTERS.BOO, tokenType: EARS },
            { name: CHARACTERS.JASMINE, tokenType: EARS }
        ]
    },
    {
        name: "Visit Goofy's Playhouse",
        trophies: true,
        characters: [{ name: CHARACTERS.MICKEY, level: 5 }],
        time: "8h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MIKE, tokenType: TOKEN },
            { name: CHARACTERS.SIMBA, tokenType: TOKEN },
            { name: CHARACTERS.MARCH_HARE, tokenType: EARS },
            { name: CHARACTERS.DAVY_JONES, tokenType: EARS },
            { name: CHARACTERS.R2D2, tokenType: EARS }
        ]
    },
    {
        name: "Halloween Dance",
        characters: [
            { name: CHARACTERS.MICKEY, level: 2 },
            { name: CHARACTERS.MINNIE, level: 3 }
        ],
        time: "8h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.MICKEY,
                type: REQ_TYPES.COSTUME
            },
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.MINNIE,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: "White & Blue Pattern", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Do Some Conducting",
        characters: [{ name: CHARACTERS.MICKEY, level: 3 }],
        time: "12h",
        required: [{ type: REQ_TYPES.BUILDING, name: BUILDINGS.MICKEY_PHIL }],
        tokens: [
            { name: CHARACTERS.OOGIE, tokenType: TOKEN },
            { name: CHARACTERS.GASTON, tokenType: EARS },
            { name: CHARACTERS.IAGO, tokenType: TOKEN },
            { name: CHARACTERS.DANTE, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit Daisy's Diner",
        characters: [{ name: CHARACTERS.MICKEY, level: 6 }],
        time: "12h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PHILLIP, tokenType: EARS },
            { name: CHARACTERS.LUCA, tokenType: EARS, remove: true },
            { name: CHARACTERS.ABBY, tokenType: EARS, remove: true },
            { name: CHARACTERS.MAURICE, tokenType: TOKEN },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Challenge Pete",
        characters: [
            { name: CHARACTERS.MICKEY, level: 10 },
            { name: CHARACTERS.PETE, level: 7 }
        ],
        time: "12h",
        tokens: [
            { name: CHARACTERS.DONALD, tokenType: TOKEN },
            { name: CHARACTERS.DONALD, tokenType: EARS }
        ]
    },
    {
        name: "Talk at the Diner",
        characters: [
            { name: CHARACTERS.MICKEY, level: 5 },
            { name: CHARACTERS.DAISY, level: 5 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LOUIE, tokenType: TOKEN },
            { name: CHARACTERS.ZURG, tokenType: EARS },
            { name: CHARACTERS.SQUIRT, tokenType: EARS }
        ]
    },
    {
        name: "Costume Judge",
        characters: [
            { name: CHARACTERS.MICKEY, level: 2 },
            { name: CHARACTERS.DAISY, level: 5 }
        ],
        time: "8h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.MICKEY,
                type: REQ_TYPES.COSTUME
            },
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.DAISY,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: CHARACTERS.BRIDE, tokenType: TOKEN },
            { name: "Orange Pattern", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Musical Performance",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "6h",
        required: [
            {
                name: COSTUMES.TUXEDO,
                character: CHARACTERS.MICKEY,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: "White & Blue Pattern", type: "fabric", tokenType: FABRIC },
            { name: "Red Striped", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Whistle to Work",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.CLASSIC,
                character: CHARACTERS.MICKEY,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: "Classic", type: "fabric", tokenType: FABRIC }]
    },
    {
        name: "A Round Trip",
        characters: [
            { name: CHARACTERS.MICKEY, level: 3 },
            { name: CHARACTERS.GOOFY, level: 3 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.CARPET, tokenType: TOKEN },
            { name: CHARACTERS.ABU, tokenType: TOKEN },
            { name: CHARACTERS.WHITE_RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.RYDER, tokenType: EARS },
            { name: CHARACTERS.HERCULES, tokenType: TOKEN }
        ]
    },
    {
        name: "Lunar Celebrations",
        characters: [{ name: CHARACTERS.MICKEY, level: 2 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG,
                character: CHARACTERS.MICKEY,
                type: "costume"
            },
            {
                name: BUILDINGS.MICKEY_HOUSE,
                type: "building"
            }
        ],
        tokens: []
    },
    {
        name: "Review Pete's Complaints",
        characters: [{ name: CHARACTERS.MICKEY, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: "building" }],
        tokens: [{ name: CHARACTERS.BO_PEEP, tokenType: EARS }]
    },
    {
        name: "Dancin' Fun",
        characters: [
            { name: CHARACTERS.MICKEY, level: 10 },
            { name: CHARACTERS.MINNIE, level: 9 }
        ],
        time: "2h",
        required: [
            {
                name: COSTUMES.CLASSIC,
                character: CHARACTERS.MICKEY,
                type: "costume"
            },
            {
                name: COSTUMES.CLASSIC,
                character: CHARACTERS.MINNIE,
                type: "costume"
            }
        ],
        tokens: [{ name: CHARACTERS.PETE, tokenType: EARS }]
    },
    //mickey end
    //pluto
    {
        name: "Chase Tail",
        characters: [{ name: CHARACTERS.PLUTO, level: 1 }],
        time: "5m",
        tokens: []
    },
    {
        name: "Stop and Sniff",
        characters: [{ name: CHARACTERS.PLUTO, level: 1 }],
        time: "1h",
        tokens: [
            { name: CHARACTERS.PLUTO, tokenType: TOKEN },
            { name: CHARACTERS.PLUTO, tokenType: EARS }
        ]
    },
    {
        name: "A Treat from Goofy",
        characters: [{ name: CHARACTERS.PLUTO, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.MICKEY, tokenType: TOKEN },
            { name: CHARACTERS.MICKEY, tokenType: EARS },
            { name: CHARACTERS.GOOFY, tokenType: TOKEN },
            { name: CHARACTERS.JESSIE, tokenType: EARS }
        ]
    },
    {
        name: "Take an Afternoon Nap",
        characters: [{ name: CHARACTERS.PLUTO, level: 2 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: TOKEN },
            { name: CHARACTERS.REX, tokenType: EARS }
        ]
    },
    {
        name: "Dig Up Bones",
        characters: [{ name: CHARACTERS.PLUTO, level: 3 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: EARS },
            { name: CHARACTERS.MINNIE, tokenType: EARS },
            { name: CHARACTERS.PENNY, tokenType: TOKEN }
        ]
    },
    {
        name: "Visiting Minnie's",
        characters: [{ name: CHARACTERS.PLUTO, level: 8 }],
        time: "8h",
        required: [{ name: BUILDINGS.MINNIE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DONALD, tokenType: TOKEN },
            { name: CHARACTERS.DONALD, tokenType: EARS }
        ]
    },
    {
        name: "Perform Guard Duty",
        characters: [{ name: CHARACTERS.PLUTO, level: 4 }],
        time: "12h",
        tokens: [{ name: CHARACTERS.CINDERELLA, tokenType: EARS }]
    },
    {
        name: "Find the Easter Eggs!",
        characters: [{ name: CHARACTERS.PLUTO, level: 1 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.SPRING,
                character: CHARACTERS.PLUTO,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: "Green Dot", type: "fabric", tokenType: FABRIC }]
    },
    //pluto end
    //minnie mouse
    {
        name: "Tidy the Garden",
        characters: [{ name: CHARACTERS.MINNIE, level: 1 }],
        time: "8m",
        tokens: [{ name: GROUPS.MF, tokenType: COMMON }]
    },
    {
        name: "Cheerful Singing",
        characters: [{ name: CHARACTERS.MINNIE, level: 3 }],
        time: "2h",
        required: [
            {
                name: COSTUMES.HOLIDAY,
                character: CHARACTERS.MINNIE,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: CHARACTERS.ELSA, tokenType: EARS }]
    },
    {
        name: "Festival Photos",
        characters: [{ name: CHARACTERS.MINNIE, level: 3 }],
        time: "2h",
        required: [
            {
                name: COSTUMES.LUNAR,
                character: CHARACTERS.MINNIE,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: CHARACTERS.MULAN, tokenType: EARS }]
    },
    {
        name: "Take Photos with Guests",
        characters: [{ name: CHARACTERS.MINNIE, level: 6 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.FORKY, tokenType: EARS },
            { name: CHARACTERS.THUMPER, tokenType: TOKEN },
            { name: CHARACTERS.BAMBI, tokenType: EARS }
        ]
    },
    {
        name: "Check on Mickey",
        characters: [{ name: CHARACTERS.MINNIE, level: 1 }],
        time: "6h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RAPUNZEL, tokenType: TOKEN },
            { name: CHARACTERS.MERRYWEATHER, tokenType: EARS },
            { name: CHARACTERS.PRIYA, tokenType: EARS },
            { name: CHARACTERS.MIRIAM, tokenType: EARS }
        ]
    },
    {
        name: "Trick or Treat",
        characters: [{ name: CHARACTERS.MINNIE, level: 3 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.MINNIE,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: CHARACTERS.NICK, tokenType: EARS },
            { name: CHARACTERS.ALICE, tokenType: EARS },
            { name: "Green Dot", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Visit Daisy's Diner",
        characters: [{ name: CHARACTERS.MINNIE, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DEWEY, tokenType: TOKEN },
            { name: CHARACTERS.FLORA, tokenType: TOKEN },
            { name: CHARACTERS.GIULIA, tokenType: TOKEN }
        ]
    },
    {
        name: "Hang Out at Home",
        characters: [{ name: CHARACTERS.MINNIE, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.MINNIE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: EARS },
            { name: CHARACTERS.MAXIMUS, tokenType: EARS }
        ]
    },
    {
        name: "Check on Goofy",
        characters: [{ name: CHARACTERS.MINNIE, level: 8 }],
        time: "12h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DONALD, tokenType: TOKEN },
            { name: CHARACTERS.BAGHEERA, tokenType: EARS }
        ]
    },
    {
        name: "Play Ukulele",
        trophies: true,
        characters: [{ name: CHARACTERS.MINNIE, level: 2 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: EARS },
            { name: CHARACTERS.PERDITA, tokenType: EARS },
            { name: CHARACTERS.FIGARO, tokenType: EARS }
        ]
    },
    {
        name: "Lunar Memories",
        characters: [{ name: CHARACTERS.MINNIE, level: 2 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG,
                character: CHARACTERS.MINNIE,
                type: "costume"
            },
            {
                name: BUILDINGS.MINNIE_HOUSE,
                type: "building"
            }
        ],
        tokens: []
    },
    {
        name: "Magical Performance",
        characters: [{ name: CHARACTERS.MINNIE, level: 2 }],
        time: "1h",
        required: [
            {
                name: COSTUMES.WDW_50,
                character: CHARACTERS.MINNIE,
                type: "costume"
            }
        ]
    },
    //minnie end
    //goofy
    {
        name: "Run in Panic",
        characters: [{ name: CHARACTERS.GOOFY, level: 1 }],
        time: "1m",
        tokens: [{ name: GROUPS.MF, tokenType: COMMON }]
    },
    {
        name: "A Special Event Sandwich",
        characters: [{ name: CHARACTERS.GOOFY, level: 1 }],
        time: "6m",
        tokens: []
    },
    {
        name: "Check the Fun Wheel",
        characters: [{ name: CHARACTERS.GOOFY, level: 1 }],
        time: "1h",
        required: [
            { name: BUILDINGS.MICKEY_FUN_WHEEL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: GROUPS.MONSTERS, tokenType: COMMON },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Visit Mickey's",
        characters: [{ name: CHARACTERS.GOOFY, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.MF, tokenType: COMMON },
            { name: CHARACTERS.MICKEY, tokenType: TOKEN },
            { name: GROUPS.STAR_WARS, tokenType: COMMON, remove: true },
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON }
        ]
    },
    {
        name: "Attend a Show",
        characters: [{ name: CHARACTERS.GOOFY, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.MICKEY_PHIL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: TOKEN },
            { name: CHARACTERS.HAMM, tokenType: TOKEN },
            { name: CHARACTERS.BO_PEEP, tokenType: TOKEN },
            { name: CHARACTERS.MAD_HATTER, tokenType: EARS },
            { name: CHARACTERS.DOC, tokenType: EARS },
            { name: CHARACTERS.SNEEZY, tokenType: TOKEN },
            { name: CHARACTERS.MING_LEE, tokenType: EARS, remove: true }
        ]
    },
    {
        name: "Change a Lightbulb",
        characters: [{ name: CHARACTERS.GOOFY, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BUZZ, tokenType: EARS },
            { name: CHARACTERS.CHARMING, tokenType: TOKEN },
            { name: CHARACTERS.LI_SHANG, tokenType: EARS },
            { name: CHARACTERS.RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.NANI, tokenType: TOKEN }
        ]
    },
    {
        name: "Play the Tuba",
        characters: [{ name: CHARACTERS.GOOFY, level: 3 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.SARGE, tokenType: EARS },
            { name: CHARACTERS.C3PO, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.LUKE_BESPIN_FABRIC,
                tokenType: "special",
                remove: true
            },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS, remove: true },
            { name: GROUPS.UP, tokenType: COMMON, remove: true },
            { name: CHARACTERS.ANNA, tokenType: TOKEN },
            { name: CHARACTERS.MAD_HATTER, tokenType: TOKEN },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Try to Scare",
        characters: [{ name: CHARACTERS.GOOFY, level: 3 }],
        time: "6h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.GOOFY,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: CHARACTERS.BRIDE, tokenType: EARS },
            { name: CHARACTERS.EZRA, tokenType: EARS },
            { name: "Red Striped", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Work as a Handyman",
        trophies: true,
        characters: [{ name: CHARACTERS.GOOFY, level: 3 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.DOPEY, tokenType: EARS },
            { name: CHARACTERS.CALHOUN, tokenType: TOKEN },
            { name: CHARACTERS.CHEWBACCA, tokenType: EARS },
            { name: CHARACTERS.ALBERTO, tokenType: TOKEN },
            { name: CHARACTERS.MIRIAM, tokenType: EARS, remove: true },
            { name: CHARACTERS.ABBY, tokenType: EARS, remove: true }
        ]
    },
    {
        name: "Grab a Bite",
        characters: [{ name: CHARACTERS.GOOFY, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DEWEY, tokenType: EARS },
            { name: CHARACTERS.ELASTIGIRL, tokenType: TOKEN },
            { name: CHARACTERS.BRUCE, tokenType: TOKEN },
            { name: CHARACTERS.HONEYMAREN, tokenType: TOKEN },
            { name: CHARACTERS.PONGO, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit Minnie's House",
        characters: [{ name: CHARACTERS.GOOFY, level: 7 }],
        time: "8h",
        required: [{ name: BUILDINGS.MINNIE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FAUNA, tokenType: TOKEN },
            { name: CHARACTERS.DANTE, tokenType: EARS }
        ]
    },
    {
        name: "Sandwich Eating",
        characters: [{ name: CHARACTERS.GOOFY, level: 3 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.DONALD, tokenType: EARS },
            { name: CHARACTERS.FLYNN, tokenType: TOKEN },
            { name: CHARACTERS.RANDALL, tokenType: EARS },
            { name: CHARACTERS.PERCY, tokenType: EARS },
            { name: CHARACTERS.IAGO, tokenType: EARS },
            { name: CHARACTERS.FINN, tokenType: EARS }
        ]
    },
    {
        name: "Swab the Deck",
        characters: [{ name: CHARACTERS.GOOFY, level: 3 }],
        time: "6h",
        required: [
            {
                name: COSTUMES.PIRATE,
                character: CHARACTERS.GOOFY,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: CHARACTERS.CINDERELLA, tokenType: EARS },
            { name: CHARACTERS.DAVY_JONES, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit a Friend's Boat",
        characters: [{ name: CHARACTERS.GOOFY, level: 9 }],
        time: "16h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SCROOGE, tokenType: TOKEN }]
    },
    {
        name: "Trick or Treat",
        characters: [{ name: CHARACTERS.GOOFY, level: 3 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.GOOFY,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: CHARACTERS.SALLY, tokenType: EARS }]
    },
    //goofy end
    //daisy
    {
        name: "A Special Diner Promotion!",
        characters: [{ name: CHARACTERS.DAISY, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.INCREDS, tokenType: COMMON }]
    },
    {
        name: "Look for Inspiration",
        characters: [{ name: CHARACTERS.DAISY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MF, tokenType: COMMON },
            { name: CHARACTERS.TINK, tokenType: TOKEN },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Talk Up Diner",
        characters: [{ name: CHARACTERS.DAISY, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CHIP, tokenType: TOKEN },
            { name: CHARACTERS.ERIC, tokenType: EARS },
            { name: CHARACTERS.FLOUNDER, tokenType: EARS }
        ]
    },
    {
        name: "Flip Some Flapjacks",
        trophies: true,
        characters: [{ name: CHARACTERS.DAISY, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MIKE, tokenType: TOKEN },
            { name: CHARACTERS.DRIZELLA, tokenType: EARS },
            { name: CHARACTERS.MAMA_ODIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Strut Your Stuff",
        characters: [{ name: CHARACTERS.DAISY, level: 6 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: TOKEN },
            { name: CHARACTERS.MAXIMUS, tokenType: EARS },
            {
                name: CHARACTERS.KING_LOUIE,

                tokenType: TOKEN
            },
            { name: CHARACTERS.FELIX, tokenType: EARS }
        ]
    },
    {
        name: "Relaxing Ride",
        characters: [{ name: CHARACTERS.DAISY, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.MICKEY_FUN_WHEEL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.PLUTO, tokenType: TOKEN },
            { name: CHARACTERS.CELIA, tokenType: TOKEN },
            { name: CHARACTERS.SULLEY, tokenType: EARS },
            { name: CHARACTERS.RAPUNZEL, tokenType: EARS }
        ]
    },
    {
        name: "Trick or Treat",
        characters: [{ name: CHARACTERS.DAISY, level: 5 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.DAISY,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: CHARACTERS.FLOWER, tokenType: TOKEN },
            { name: "Red Striped", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Visit Goofy's Playhouse",
        characters: [{ name: CHARACTERS.DAISY, level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BOO, tokenType: EARS },
            { name: CHARACTERS.FLORA, tokenType: TOKEN },
            { name: CHARACTERS.AURORA, tokenType: EARS },
            { name: CHARACTERS.PERDITA, tokenType: TOKEN }
        ]
    },
    {
        name: "Question Donald's Priorities",
        characters: [
            { name: CHARACTERS.DAISY, level: 9 },
            { name: CHARACTERS.DONALD, level: 2 }
        ],
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.NICK, tokenType: EARS },
            { name: CHARACTERS.BALOO, tokenType: TOKEN },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Musical Break",
        characters: [{ name: CHARACTERS.DAISY, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.MICKEY_PHIL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ROZ, tokenType: EARS },
            { name: CHARACTERS.WALLE, tokenType: EARS }
        ]
    },
    {
        name: "Spread Flowers",
        characters: [{ name: CHARACTERS.DAISY, level: 4 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: EARS },
            { name: CHARACTERS.PETE, tokenType: TOKEN },
            { name: CHARACTERS.LOUIE, tokenType: EARS },
            { name: CHARACTERS.CHIEF_TUI, tokenType: EARS }
        ]
    },
    {
        name: "Visit Mickey's House",
        characters: [{ name: CHARACTERS.DAISY, level: 1 }],
        time: "12h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLYNN, tokenType: TOKEN },
            { name: CHARACTERS.CHEWBACCA, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit Minnie's House",
        characters: [{ name: CHARACTERS.DAISY, level: 7 }],
        time: "12h",
        required: [{ name: BUILDINGS.MINNIE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DONALD, tokenType: TOKEN },
            { name: CHARACTERS.DONALD, tokenType: EARS },
            { name: CHARACTERS.DEWEY, tokenType: EARS }
        ]
    },
    {
        name: "Lunar Festivities",
        characters: [{ name: CHARACTERS.DAISY, level: 2 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG,
                character: CHARACTERS.DAISY,
                type: "costume"
            },
            {
                name: BUILDINGS.DAISY_DINER,
                type: "building"
            }
        ],
        tokens: []
    },
    {
        name: "Check on Donald",
        characters: [{ name: CHARACTERS.DAISY, level: 10 }],
        time: "12h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: "building" }],
        tokens: [
            { name: CHARACTERS.ABBY, tokenType: TOKEN },
            { name: CHARACTERS.PRIYA, tokenType: TOKEN },
            { name: CHARACTERS.MAURICE, tokenType: TOKEN }
        ]
    },
    //daisy end
    //donald
    {
        name: "Welcome Friends",
        characters: [{ name: CHARACTERS.DONALD, level: 1 }],
        time: "1h",
        tokens: [
            { name: "Mickey and Friends", tokenType: COMMON },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Stay at Goofy's Playhouse",
        characters: [{ name: CHARACTERS.DONALD, level: 1 }],
        time: "12h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.DEWEY, tokenType: TOKEN }]
    },
    {
        name: "Try Calming Music",
        characters: [{ name: CHARACTERS.DONALD, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.MICKEY_PHIL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: TOKEN },
            { name: GROUPS.DUCKTALES, tokenType: COMMON }
        ]
    },
    {
        name: "Visit Mickey's",
        characters: [{ name: CHARACTERS.DONALD, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: TOKEN },
            { name: CHARACTERS.SINA, tokenType: TOKEN },
            { name: CHARACTERS.CHIEF_TUI, tokenType: TOKEN }
        ]
    },
    {
        name: "Having Fun?",
        trophies: true,
        characters: [{ name: CHARACTERS.DONALD, level: 3 }],
        time: "6h",
        required: [{ name: "Mickey's Fun Wheel", type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DUMBO, tokenType: TOKEN },
            { name: CHARACTERS.DARTH_VADER, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: TOKEN },
            { name: CHARACTERS.LUCKY, tokenType: EARS }
        ]
    },
    {
        name: "Visit Minnie's House",
        characters: [{ name: CHARACTERS.DONALD, level: 1 }],
        time: "8h",
        required: [{ name: BUILDINGS.MINNIE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.ROZ, tokenType: EARS }]
    },
    {
        name: "Meet at Daisy's Diner",
        characters: [
            { name: CHARACTERS.DONALD, level: 1 },
            { name: CHARACTERS.DAISY, level: 3 }
        ],
        time: "24h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.HADES, tokenType: EARS }]
    },
    {
        name: "Spend Time at Daisy's Diner",
        characters: [{ name: CHARACTERS.DONALD, level: 2 }],
        time: "12h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: EARS },
            { name: CHARACTERS.HUEY, tokenType: EARS },
            { name: CHARACTERS.PRIYA, tokenType: TOKEN }
        ]
    },
    {
        name: "Trick or Treat",
        characters: [{ name: CHARACTERS.DONALD, level: 5 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.DONALD,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: "Purple", type: "fabric", tokenType: FABRIC }]
    },
    {
        name: "Lunar Reflections",
        characters: [{ name: CHARACTERS.DONALD, level: 2 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.LUNAR_NEW_YEAR_HONG_KONG,
                character: CHARACTERS.DONALD,
                type: "costume"
            },
            {
                name: BUILDINGS.DONALD_BOAT,
                type: "building"
            }
        ],
        tokens: []
    },
    {
        name: "Scare Time",
        characters: [{ name: CHARACTERS.DONALD, level: 5 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.HALLOWEEN,
                character: CHARACTERS.DONALD,
                type: "costume"
            }
        ],
        tokens: [{ name: "Blue", type: "fabric", tokenType: FABRIC }]
    },
    //donald end
    //pete
    {
        name: "Captain the Steamboat",
        characters: [{ name: CHARACTERS.PETE, level: 6 }],
        time: "1h",
        required: [
            {
                name: COSTUMES.CLASSIC,
                character: CHARACTERS.PETE,
                type: REQ_TYPES.COSTUME
            },
            { name: BUILDINGS.STEAMBOAT, type: REQ_TYPES.BUILDING }
        ]
    },
    {
        name: "Giving Ordders",
        characters: [{ name: CHARACTERS.PETE, level: 6 }],
        time: "2h",
        required: [
            {
                name: COSTUMES.CLASSIC,
                character: CHARACTERS.PETE,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: CHARACTERS.MINNIE, tokenType: TOKEN }]
    },
    {
        name: "Try to Have Fun",
        characters: [{ name: CHARACTERS.PETE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MF, tokenType: COMMON },
            { name: GROUPS.DALMATIANS, tokenType: COMMON }
        ]
    },
    {
        name: "Demand Diner Food",
        characters: [{ name: CHARACTERS.PETE, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.DAISY_DINER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: TOKEN },
            { name: CHARACTERS.THUMPER, tokenType: EARS },
            { name: CHARACTERS.SHAN_YU, tokenType: EARS }
        ]
    },
    {
        name: "Evil Laugh",
        characters: [{ name: CHARACTERS.PETE, level: 3 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.RANDALL, tokenType: TOKEN },
            { name: CHARACTERS.AURORA, tokenType: TOKEN },
            { name: CHARACTERS.FLASH, tokenType: EARS },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN }
        ]
    },
    {
        name: "Refined Music",
        characters: [{ name: CHARACTERS.PETE, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.MICKEY_PHIL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLYNN, tokenType: EARS },
            { name: CHARACTERS.DALE, tokenType: EARS },
            { name: CHARACTERS.BOUN, tokenType: TOKEN },
            { name: CHARACTERS.GUS, tokenType: EARS }
        ]
    },
    {
        name: "No More Noise!",
        characters: [{ name: CHARACTERS.PETE, level: 1 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.HUEY, tokenType: EARS },
            { name: CHARACTERS.RANDALL, tokenType: EARS },
            { name: CHARACTERS.PHILLIP, tokenType: TOKEN },
            { name: CHARACTERS.CHARLES_MUNTZ, tokenType: EARS }
        ]
    },
    {
        name: "Visit Mickey's House",
        characters: [{ name: CHARACTERS.PETE, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: TOKEN },
            { name: CHARACTERS.MOWGLI, tokenType: EARS },
            { name: CHARACTERS.JOCK, tokenType: TOKEN },
            { name: CHARACTERS.MAURICE, tokenType: TOKEN }
        ]
    },
    {
        name: "Go to Donald's Boat",
        characters: [{ name: CHARACTERS.PETE, level: 10 }],
        time: "12h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SHERE_KHAN, tokenType: TOKEN }]
    },
    {
        name: "Go to Goofy's Playhouse",
        characters: [{ name: CHARACTERS.PETE, level: 6 }],
        time: "12h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.GOTHEL, tokenType: TOKEN },
            { name: CHARACTERS.REY, tokenType: TOKEN },
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: EARS }
        ]
    },
    //pete end
    //chip
    {
        name: "Where's Dale?",
        characters: [{ name: CHARACTERS.CHIP, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MF, tokenType: COMMON },
            { name: CHARACTERS.DALE, tokenType: TOKEN }
        ]
    },
    {
        name: "Search for Nuts",
        characters: [{ name: CHARACTERS.CHIP, level: 5 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.KING_LOUIE, tokenType: EARS }]
    },
    {
        name: "Count the Acorns",
        characters: [{ name: CHARACTERS.CHIP, level: 2 }],
        required: [
            { name: BUILDINGS.CHIP_DALE_TREEHOUSE, type: REQ_TYPES.BUILDING }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.DALE, tokenType: EARS },
            { name: CHARACTERS.ROZ, tokenType: TOKEN }
        ]
    },
    {
        name: "Investigate Food Options",
        characters: [{ name: CHARACTERS.CHIP, level: 7 }],
        time: "6h",
        required: [
            { name: BUILDINGS.GOOFY_PLAYHOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.JUDY, tokenType: EARS },
            { name: CHARACTERS.DUMBO, tokenType: TOKEN },
            { name: CHARACTERS.GIULIA, tokenType: TOKEN },
            { name: CHARACTERS.MAURICE, tokenType: EARS }
        ]
    },
    {
        name: "Crack the Nut",
        characters: [
            { name: CHARACTERS.CHIP, level: 3 },
            { name: CHARACTERS.DALE, level: 2 }
        ],
        time: "8h",
        tokens: [
            { name: CHARACTERS.DONALD, tokenType: TOKEN },
            { name: CHARACTERS.DONALD, tokenType: EARS }
        ]
    },
    {
        name: "Explore a Boat",
        characters: [{ name: CHARACTERS.CHIP, level: 10 }],
        time: "12h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BOGO, tokenType: TOKEN }]
    },
    //chip end
    //dale
    {
        name: "Where's Chip?",
        characters: [{ name: CHARACTERS.DALE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MF, tokenType: COMMON },
            { name: CHARACTERS.CHIP, tokenType: TOKEN }
        ]
    },
    {
        name: "Cause Trouble",
        characters: [{ name: CHARACTERS.DALE, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.MICKEY_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JUDY, tokenType: TOKEN },
            { name: CHARACTERS.KING_LOUIE, tokenType: TOKEN },
            { name: CHARACTERS.ROZ, tokenType: EARS },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Home Sweet Home",
        characters: [{ name: CHARACTERS.DALE, level: 1 }],
        required: [
            { name: BUILDINGS.CHIP_DALE_TREEHOUSE, type: REQ_TYPES.BUILDING }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.CHIP, tokenType: EARS }]
    },
    {
        name: "Sailing for Acorns",
        characters: [{ name: CHARACTERS.DALE, level: 10 }],
        time: "12h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BOGO, tokenType: EARS }]
    },
    //scrooge
    {
        name: "Chasing Treasure",
        characters: [{ name: CHARACTERS.SCROOGE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUCKTALES, tokenType: COMMON }]
    },
    {
        name: "Judge the Boat",
        characters: [{ name: CHARACTERS.SCROOGE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.HUEY, tokenType: EARS },
            { name: CHARACTERS.DEWEY, tokenType: TOKEN },
            { name: CHARACTERS.LOUIE, tokenType: EARS }
        ]
    },
    {
        name: "Go For a Swim",
        characters: [{ name: CHARACTERS.SCROOGE, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.HUEY, tokenType: TOKEN },
            { name: CHARACTERS.DEWEY, tokenType: EARS }
        ]
    },
    {
        name: "Enjoy an Evening",
        characters: [{ name: CHARACTERS.SCROOGE, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.MICKEY_PHIL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DONALD, tokenType: TOKEN },
            { name: CHARACTERS.DONALD, tokenType: EARS }
        ]
    },
    {
        name: "Talk of Rules",
        characters: [
            { name: CHARACTERS.SCROOGE, level: 6 },
            { name: CHARACTERS.HUEY, level: 6 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MINNIE, tokenType: EARS }]
    },
    {
        name: "Work on Adventure Plans",
        characters: [
            { name: CHARACTERS.SCROOGE, level: 8 },
            { name: CHARACTERS.LOUIE, level: 8 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GOTHEL, tokenType: TOKEN }]
    },
    //scrooge end
    //huey
    {
        name: "Searching the Manual",
        characters: [{ name: CHARACTERS.HUEY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUCKTALES, tokenType: COMMON }]
    },
    {
        name: "Follow Treasure Hints",
        characters: [{ name: CHARACTERS.HUEY, level: 2 }],
        time: "2h",
        tokens: [{ name: GROUPS.RATATOUILLE, tokenType: COMMON }]
    },
    {
        name: "Searching the Manual",
        characters: [{ name: CHARACTERS.HUEY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUCKTALES, tokenType: COMMON }]
    },
    {
        name: "Read Jr. Woodchucks' Book",
        characters: [{ name: CHARACTERS.HUEY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: TOKEN },
            { name: CHARACTERS.DEWEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Grab Belongings",
        characters: [{ name: CHARACTERS.HUEY, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.DONALD_BOAT }],
        tokens: [
            { name: CHARACTERS.DEWEY, tokenType: EARS },
            { name: CHARACTERS.LOUIE, tokenType: EARS }
        ]
    },
    {
        name: "Play a Game Together",
        characters: [
            { name: CHARACTERS.HUEY, level: 5 },
            { name: CHARACTERS.DEWEY, level: 5 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CHIP, tokenType: TOKEN },
            { name: CHARACTERS.NALA, tokenType: EARS }
        ]
    },
    {
        name: "Set up a Game",
        characters: [
            { name: CHARACTERS.HUEY, level: 7 },
            { name: CHARACTERS.LOUIE, level: 7 }
        ],
        time: "24h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MINNIE, tokenType: TOKEN }]
    },
    {
        name: "Following the Clues",
        characters: [{ name: CHARACTERS.HUEY, level: 10 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.MEEKO, tokenType: EARS }]
    },
    //huey end
    //dewey
    {
        name: "Questioning the Clues",
        characters: [{ name: CHARACTERS.DEWEY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUCKTALES, tokenType: COMMON }]
    },
    {
        name: "Look for Uncle",
        characters: [{ name: CHARACTERS.DEWEY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.DONALD_BOAT }],
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: TOKEN },
            { name: CHARACTERS.HUEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Create Some Fun",
        characters: [{ name: CHARACTERS.DEWEY, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LOUIE, tokenType: EARS },
            { name: CHARACTERS.TIMON, tokenType: EARS }
        ]
    },
    {
        name: "Chores Time",
        characters: [
            { name: CHARACTERS.DEWEY, level: 6 },
            { name: CHARACTERS.DONALD, level: null }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.PERCY, tokenType: TOKEN }]
    },
    {
        name: "Discovering Solutions",
        characters: [{ name: CHARACTERS.DEWEY, level: 10 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.MEEKO, tokenType: TOKEN },
            { name: CHARACTERS.LINGUINI, tokenType: TOKEN }
        ]
    },
    {
        name: "Answer Musical Riddles",
        characters: [
            { name: CHARACTERS.DEWEY, level: 8 },
            { name: CHARACTERS.HUEY, level: 8 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.MICKEY_PHIL, type: "building" }],
        tokens: [{ name: CHARACTERS.PACHA, tokenType: TOKEN }]
    },
    //dewey end
    //louie
    {
        name: "Hunting for Hints",
        characters: [{ name: CHARACTERS.LOUIE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUCKTALES, tokenType: COMMON }]
    },
    {
        name: "Relax in the Mansion",
        characters: [{ name: CHARACTERS.LOUIE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.MONEY_BIN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.HUEY, tokenType: EARS }]
    },
    {
        name: "Wait for Uncle",
        characters: [{ name: CHARACTERS.LOUIE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.DONALD_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DEWEY, tokenType: EARS },
            { name: CHARACTERS.NALA, tokenType: TOKEN }
        ]
    },
    {
        name: "Follow Clues",
        characters: [{ name: CHARACTERS.LOUIE, level: 4 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: EARS },
            { name: CHARACTERS.PUMBAA, tokenType: TOKEN },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: EARS }
        ]
    },
    {
        name: "Trust a Map",
        characters: [{ name: CHARACTERS.LOUIE, level: 10 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.MEEKO, tokenType: EARS }]
    },
    //louie end
    //woody
    {
        name: "Pull String",
        characters: [{ name: CHARACTERS.WOODY, level: 1 }],
        time: "60s",
        tokens: []
    },
    {
        name: "Practice Lasso Skills",
        characters: [{ name: CHARACTERS.WOODY, level: 3 }],
        time: "2h",
        tokens: [
            { name: GROUPS.PP, tokenType: COMMON },
            { name: CHARACTERS.JESSIE, tokenType: TOKEN },
            { name: CHARACTERS.HAMM, tokenType: EARS },
            { name: CHARACTERS.RALPH, tokenType: EARS },
            { name: CHARACTERS.PEGASUS, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.STRING,
                type: "mini_event",
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Visit Friends",
        characters: [{ name: CHARACTERS.WOODY, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RALPH, tokenType: EARS },
            { name: CHARACTERS.PEGASUS, tokenType: TOKEN }
        ]
    },
    {
        name: "Go on Duty",
        characters: [{ name: CHARACTERS.WOODY, level: 2 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.CHARMING, tokenType: EARS },
            { name: CHARACTERS.CHIP_POTTS, tokenType: EARS, remove: true },
            { name: CHARACTERS.SCUTTLE, tokenType: EARS, remove: true },
            { name: CHARACTERS.SPAMLEY, tokenType: EARS, remove: true },
            { name: CHARACTERS.C3PO, tokenType: EARS, remove: true },
            { name: CHARACTERS.RUSSELL, tokenType: EARS, remove: true },
            { name: CHARACTERS.ABBY, tokenType: TOKEN, remove: true },
            { name: GROUPS.UP, tokenType: COMMON, remove: true },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Attend Toy Meeting",
        characters: [
            { name: CHARACTERS.WOODY, level: 2 },
            { name: CHARACTERS.JESSIE, level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BUZZ, tokenType: TOKEN },
            { name: CHARACTERS.BUZZ, tokenType: EARS },
            { name: CHARACTERS.TREMAINE, tokenType: EARS },
            { name: CHARACTERS.FIRE_SPIRIT, tokenType: TOKEN },
            { name: CHARACTERS.R2D2, tokenType: TOKEN }
        ]
    },
    {
        name: "Downtime with Pizza",
        characters: [
            { name: CHARACTERS.WOODY, level: 10 },
            { name: CHARACTERS.SARGE, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.WALLE, tokenType: TOKEN },
            { name: CHARACTERS.MING_LEE, tokenType: TOKEN },
            { name: CHARACTERS.PRIYA, tokenType: TOKEN }
        ]
    },
    {
        name: "Hang Out with Hamm",
        characters: [
            { name: CHARACTERS.WOODY, level: 2 },
            { name: CHARACTERS.HAMM, level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TINK, tokenType: EARS },
            { name: CHARACTERS.TIMON, tokenType: TOKEN },
            { name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN },
            { name: CHARACTERS.FINN, tokenType: TOKEN },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.MIRIAM, tokenType: EARS }
        ]
    },
    {
        name: "My Favorite Cowboy",
        characters: [
            { name: CHARACTERS.WOODY, level: 2 },
            { name: CHARACTERS.BO_PEEP, level: 2 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: EARS },
            { name: CHARACTERS.SVEN, tokenType: TOKEN },
            { name: CHARACTERS.KRISTOFF, tokenType: EARS },
            { name: CHARACTERS.BARLEY, tokenType: EARS },
            { name: CHARACTERS.MEG, tokenType: TOKEN }
        ]
    },
    {
        name: "Orbiting Some Space",
        characters: [{ name: CHARACTERS.WOODY, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.ASTRO_ORBITERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: EARS },
            { name: CHARACTERS.BRUCE, tokenType: EARS },
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN },
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: TOKEN },
            { name: CHARACTERS.PONGO, tokenType: EARS }
        ]
    },
    {
        name: "Rest Up at the Roundup",
        characters: [{ name: CHARACTERS.WOODY, level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SARGE, tokenType: TOKEN },
            { name: CHARACTERS.PERCY, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS, remove: true },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Barn Tour",
        characters: [
            { name: CHARACTERS.WOODY, level: 5 },
            { name: CHARACTERS.BO_PEEP, level: 5 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TREMAINE, tokenType: TOKEN },
            { name: CHARACTERS.RANDALL, tokenType: EARS },
            { name: CHARACTERS.PHILLIP, tokenType: TOKEN },
            { name: CHARACTERS.ERNESTO, tokenType: TOKEN },
            { name: CHARACTERS.CHARLES_MUNTZ, tokenType: TOKEN }
        ]
    },
    {
        name: "Friendly Space Trip",
        characters: [
            { name: CHARACTERS.WOODY, level: 3 },
            { name: CHARACTERS.BUZZ, level: 3 }
        ],
        time: "8h",
        required: [
            { name: BUILDINGS.ASTRO_ORBITERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: EARS },
            { name: CHARACTERS.ROZ, tokenType: TOKEN },
            { name: CHARACTERS.EVE, tokenType: TOKEN }
        ]
    },
    {
        name: "Looking at Space Toys",
        characters: [{ name: CHARACTERS.WOODY, level: 1 }],
        time: "12h",
        level: 1,
        required: [
            {
                name: BUILDINGS.BUZZ_ASTRO_BLASTERS,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.BO_PEEP, tokenType: EARS },
            { name: CHARACTERS.RAPUNZEL, tokenType: EARS, remove: true },
            { name: CHARACTERS.CRUSH, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.HONEYMAREN, tokenType: EARS, remove: true },
            { name: CHARACTERS.POE, tokenType: EARS, remove: true },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Perform Test Flight",
        characters: [
            { name: CHARACTERS.WOODY, level: 10 },
            { name: CHARACTERS.BUZZ, level: 10 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.BUNNY, tokenType: TOKEN }]
    },
    {
        name: "Play the Claw",
        characters: [{ name: CHARACTERS.WOODY, level: 7 }],
        time: "8h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DEWEY, tokenType: EARS },
            { name: CHARACTERS.FORKY, tokenType: TOKEN },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.LOCK, tokenType: EARS }
        ]
    },
    {
        name: "Ride Like the Wind",
        characters: [
            { name: CHARACTERS.WOODY, level: 9 },
            { name: CHARACTERS.BULLSEYE, level: 10 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.LOUIE, tokenType: EARS }]
    },
    //woody end
    //jessie
    {
        name: "Cheering for an Event!",
        characters: [{ name: CHARACTERS.JESSIE, level: 1 }],
        time: "6h",
        tokens: [{ name: GROUPS.INCREDS, tokenType: COMMON }]
    },
    {
        name: "Dance the Hey-Howdy-Hey",
        characters: [{ name: CHARACTERS.JESSIE, level: 1 }],
        time: "1h",
        tokens: [
            { name: CHARACTERS.TINK, tokenType: TOKEN },
            { name: GROUPS.TS, tokenType: COMMON },
            { name: CHARACTERS.MR_I, tokenType: TOKEN }
        ]
    },
    {
        name: "Memory Reset",
        characters: [
            { name: CHARACTERS.JESSIE, level: 7 },
            { name: CHARACTERS.BUZZ, level: 5 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: EARS },
            { name: CHARACTERS.LORD_DINGWALL, tokenType: EARS },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Racing Queen",
        characters: [{ name: CHARACTERS.JESSIE, level: 2 }],
        required: [{ name: BUILDINGS.RC_RACERS, type: REQ_TYPES.BUILDING }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.PETE, tokenType: EARS },
            { name: CHARACTERS.RAPUNZEL, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit the Snack Roundup",
        characters: [{ name: CHARACTERS.JESSIE, level: 1 }],
        time: "4h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BO_PEEP, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.VIOLET, tokenType: EARS, remove: true },
            { name: CHARACTERS.HONEY_LEMON, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: TOKEN },
            { name: CHARACTERS.ALADDIN, tokenType: TOKEN },
            { name: CHARACTERS.SCUTTLE, tokenType: EARS },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Visit Pizza Planet Aliens",
        characters: [{ name: CHARACTERS.JESSIE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: TOKEN },
            { name: CHARACTERS.BUNNY, tokenType: TOKEN },
            { name: CHARACTERS.MAXIMUS, tokenType: TOKEN },
            { name: CHARACTERS.EUDORA, tokenType: EARS },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN, remove: true }
        ]
    },
    {
        name: "Yodel",
        characters: [{ name: CHARACTERS.JESSIE, level: 3 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.SULLEY, tokenType: EARS, remove: true },
            { name: CHARACTERS.MERRYWEATHER, tokenType: EARS, remove: true },
            { name: CHARACTERS.POCAHONTAS, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.CATERPILLAR, tokenType: EARS, remove: true },
            { name: CHARACTERS.BASHFUL, tokenType: EARS, remove: true },
            { name: CHARACTERS.ALBERTO, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.RUSSELL, tokenType: EARS },
            { name: CHARACTERS.CARL_FREDRICKSEN, tokenType: EARS },
            { name: CHARACTERS.PRIYA, tokenType: EARS, remove: true },
            { name: CHARACTERS.ABBY, tokenType: EARS, remove: true },
            {
                name: SPECIAL_ITEMS.REFRESH_TOKEN,
                tokenType: SPECIAL,
                remove: true
            }
        ]
    },
    {
        name: "Girl's Night Out",
        characters: [
            { name: CHARACTERS.JESSIE, level: 5 },
            { name: CHARACTERS.BO_PEEP, level: 3 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MIKE, tokenType: TOKEN },
            { name: CHARACTERS.CELIA, tokenType: TOKEN },
            { name: CHARACTERS.TIMON, tokenType: EARS },
            { name: CHARACTERS.ALICE, tokenType: TOKEN },
            { name: CHARACTERS.ALICE, tokenType: EARS }
        ]
    },
    {
        name: "Hoedown at Al's Toy Barn",
        characters: [{ name: CHARACTERS.JESSIE, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING, level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.WOODY, tokenType: EARS },
            { name: CHARACTERS.SARGE, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.LUMIERE, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.MARCH_HARE, tokenType: EARS },
            { name: CHARACTERS.FINN, tokenType: EARS, remove: true },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS },
            {
                name: SPECIAL_ITEMS.REFRESH_TOKEN,
                tokenType: SPECIAL,
                remove: true
            }
        ]
    },
    {
        name: "Visit Buzz's Space",
        characters: [{ name: CHARACTERS.JESSIE, level: 4 }],
        time: "12h",
        required: [
            {
                name: BUILDINGS.BUZZ_ASTRO_BLASTERS,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: TOKEN },
            { name: CHARACTERS.FLYNN, tokenType: EARS },
            { name: CHARACTERS.PHILLIP, tokenType: EARS },
            { name: CHARACTERS.KUIIL, tokenType: TOKEN }
        ]
    },
    {
        name: "Play Date",
        characters: [
            { name: CHARACTERS.JESSIE, level: 10 },
            { name: CHARACTERS.BUZZ, level: 6 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: "building" }],
        tokens: [{ name: CHARACTERS.QUEEN_ELINOR, tokenType: EARS }]
    },
    //jessie end
    //buzz
    {
        name: "Contact Star Command",
        characters: [{ name: CHARACTERS.BUZZ, level: 1 }],
        time: "6m",
        tokens: [
            {
                name: CHARACTERS.REX,
                tokenType: EARS,
                name: CHARACTERS.MR_I,
                tokenType: EARS
            }
        ]
    },
    {
        name: "Scan Area with Laser",
        characters: [{ name: CHARACTERS.BUZZ, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TS, tokenType: COMMON }]
    },
    {
        name: "Lessons in Intimidation",
        characters: [
            { name: CHARACTERS.BUZZ, level: 3 },
            { name: CHARACTERS.REX, level: 4 }
        ],
        time: "1h"
    },
    {
        name: "Space Orbiting",
        characters: [{ name: CHARACTERS.BUZZ, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.ASTRO_ORBITERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.REX, tokenType: TOKEN },
            { name: CHARACTERS.ELIZABETH, tokenType: TOKEN },
            { name: CHARACTERS.MERRYWEATHER, tokenType: TOKEN },
            { name: CHARACTERS.DALE, tokenType: TOKEN },
            { name: CHARACTERS.KEVIN, tokenType: EARS }
        ]
    },
    {
        name: "Go to Buzz Lightyear's Astro Blasters",
        characters: [{ name: CHARACTERS.BUZZ, level: 4 }],
        time: "4h",
        required: [
            { name: BUILDINGS.BUZZ_ASTRO_BLASTERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.RANDALL, tokenType: TOKEN },
            { name: CHARACTERS.RAPUNZEL, tokenType: TOKEN },
            { name: CHARACTERS.FAUNA, tokenType: EARS },
            { name: CHARACTERS.PANIC, tokenType: TOKEN },
            { name: CHARACTERS.ABBY, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Space Battle",
        characters: [
            { name: CHARACTERS.BUZZ, level: 7 },
            { name: CHARACTERS.ZURG, level: 1 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.MOWGLI, tokenType: TOKEN }]
    },
    {
        name: "Pizza Party",
        characters: [{ name: CHARACTERS.BUZZ, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: EARS },
            { name: CHARACTERS.MIKE, tokenType: EARS },
            { name: CHARACTERS.SULLEY, tokenType: EARS },
            { name: CHARACTERS.GUS, tokenType: TOKEN },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN, remove: true },
            {
                name: SPECIAL_ITEMS.REFRESH_TOKEN,
                tokenType: SPECIAL,
                remove: true
            }
        ]
    },
    {
        name: "Go to Al's Toy Barn",
        characters: [{ name: CHARACTERS.BUZZ, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CELIA, tokenType: EARS },
            { name: CHARACTERS.FLORA, tokenType: EARS },
            { name: CHARACTERS.WILL_TURNER, tokenType: TOKEN },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Go to Space",
        characters: [{ name: CHARACTERS.BUZZ, level: 4 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.JOHN, tokenType: TOKEN },
            { name: CHARACTERS.BARREL, tokenType: EARS }
        ]
    },
    {
        name: "Travel with a Ranger",
        characters: [
            { name: CHARACTERS.BUZZ, level: 6 },
            { name: CHARACTERS.ALIEN, level: 3 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ALIEN, tokenType: EARS },
            { name: CHARACTERS.BAGHEERA, tokenType: EARS },
            { name: CHARACTERS.TIMOTHY, tokenType: TOKEN }
        ]
    },
    {
        name: "Test Limits with Hamm",
        characters: [
            { name: CHARACTERS.BUZZ, level: 4 },
            { name: CHARACTERS.HAMM, level: 4 }
        ],
        time: "12h",
        required: [
            { name: BUILDINGS.BUZZ_ASTRO_BLASTERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: TOKEN },
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: EARS }
        ]
    },
    {
        name: "Check Jessie's Place",
        characters: [{ name: CHARACTERS.BUZZ, level: 5 }],
        time: "12h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: TOKEN },
            { name: CHARACTERS.FORKY, tokenType: TOKEN },
            { name: CHARACTERS.FLYNN, tokenType: EARS },
            { name: CHARACTERS.MEG, tokenType: EARS }
        ]
    },
    {
        name: "Alpha to Eagle-Eye",
        characters: [
            { name: CHARACTERS.BUZZ, level: 10 },
            { name: CHARACTERS.SARGE, level: 10 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.EUDORA, tokenType: TOKEN },
            { name: CHARACTERS.MIGUEL, tokenType: TOKEN },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: TOKEN }
        ]
    },
    //buzz end
    //zurg
    {
        name: "Get the Lay of the Land",
        characters: [{ name: CHARACTERS.ZURG, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TS, tokenType: COMMON }]
    },
    {
        name: "Spread Cheer for an Event?",
        characters: [{ name: CHARACTERS.ZURG, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.GUS, tokenType: TOKEN },
            { name: CHARACTERS.HONEST_JOHN, tokenType: TOKEN }
        ]
    },
    {
        name: "Play a Game",
        characters: [{ name: CHARACTERS.ZURG, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.RINGMASTER, tokenType: EARS }]
    },
    {
        name: "Scare Children",
        characters: [{ name: CHARACTERS.ZURG, level: 7 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.BALOO, tokenType: EARS }]
    },
    {
        name: "Fly Through Space",
        characters: [{ name: CHARACTERS.ZURG, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.NICK, tokenType: TOKEN },
            { name: CHARACTERS.THUMPER, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.REFRESH_TOKEN,
                tokenType: SPECIAL,
                remove: true
            }
        ]
    },
    {
        name: "Do Some Lurking",
        characters: [{ name: CHARACTERS.ZURG, level: 1 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.BUZZ_ASTRO_BLASTERS,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.BUZZ, tokenType: EARS },
            { name: CHARACTERS.BO_PEEP, tokenType: TOKEN },
            { name: CHARACTERS.BULLSEYE, tokenType: EARS },
            { name: CHARACTERS.BUNNY, tokenType: TOKEN }
        ]
    },
    {
        name: "New Toys",
        characters: [{ name: CHARACTERS.ZURG, level: 4 }],
        time: "12h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GOTHEL, tokenType: TOKEN },
            { name: CHARACTERS.GOTHEL, tokenType: EARS },
            { name: CHARACTERS.LEIA_ORGANA, tokenType: TOKEN },
            { name: CHARACTERS.CHARLES_MUNTZ, tokenType: EARS }
        ]
    },
    {
        name: "Terrorize Traders",
        characters: [{ name: CHARACTERS.ZURG, level: 1 }],
        time: "12h",
        required: [{ name: BUILDINGS.SPACE_TRADERS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SHERE_KHAN, tokenType: EARS },
            { name: CHARACTERS.STROMBOLI, tokenType: TOKEN }
        ]
    },
    //zurg end
    //bo peep
    {
        name: "Sing-Along",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 1 }],
        time: "3m",
        tokens: []
    },
    {
        name: "A Day Off",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.AL_TOY_BARN }],
        tokens: [
            { name: GROUPS.TS, tokenType: COMMON },
            { name: CHARACTERS.MICKEY, tokenType: EARS },
            { name: CHARACTERS.WOODY, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.STRING,
                type: "mini_event",
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Visit Pizza Planet",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 7 }],
        time: "2h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.JACK_SPARROW, tokenType: TOKEN }]
    },
    {
        name: "Surprise Visit at Jessie's",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BUZZ, tokenType: TOKEN },
            { name: CHARACTERS.SULLEY, tokenType: TOKEN },
            { name: CHARACTERS.HAMM, tokenType: EARS }
        ]
    },
    {
        name: "Check Al's Toy Barn",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JESSIE, tokenType: EARS },
            { name: CHARACTERS.ELIZABETH, tokenType: EARS },
            { name: CHARACTERS.SALLY, tokenType: EARS, remove: true },
            { name: CHARACTERS.MUSHU, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.LORD_MACGUFFIN, tokenType: EARS, remove: true },
            { name: GROUPS.UP, tokenType: COMMON }
        ]
    },
    {
        name: "Tea Party with Rex",
        characters: [
            { name: CHARACTERS.BO_PEEP, level: 2 },
            { name: CHARACTERS.REX, level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SARGE, tokenType: EARS },
            { name: CHARACTERS.TINK, tokenType: EARS }
        ]
    },
    {
        name: "Lost Toy Lookout",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 1 }],
        time: "8h",
        required: [
            {
                name: COSTUMES.TS4,
                character: CHARACTERS.BO_PEEP,
                type: REQ_TYPES.COSTUME
            }
        ]
    },
    {
        name: "Keep a Lookout",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 1 }],
        time: "8h",
        required: [
            { name: BUILDINGS.STAR_ADVENTURER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BUNNY, tokenType: EARS },
            { name: CHARACTERS.DUCKY, tokenType: EARS },
            { name: CHARACTERS.FORKY, tokenType: TOKEN },
            { name: CHARACTERS.HAN_SOLO, tokenType: TOKEN },
            { name: CHARACTERS.LUCKY, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit Space Sheep",
        characters: [{ name: CHARACTERS.BO_PEEP, level: 4 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.BUZZ_ASTRO_BLASTERS,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.ROZ, tokenType: EARS },
            { name: CHARACTERS.NAVEEN, tokenType: TOKEN },
            { name: CHARACTERS.NEMO, tokenType: EARS },
            { name: CHARACTERS.SEBASTIAN, tokenType: EARS },
            { name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN }
        ]
    },
    {
        name: "Listen to Hamm's Jokes",
        characters: [
            { name: CHARACTERS.BO_PEEP, level: 5 },
            { name: CHARACTERS.HAMM, level: 7 }
        ],
        time: "12h",
        tokens: [
            { name: CHARACTERS.JAFAR, tokenType: TOKEN },
            { name: CHARACTERS.JAFAR, tokenType: EARS },
            { name: CHARACTERS.RYDER, tokenType: EARS }
        ]
    },
    {
        name: "Walk Around the Carnival",
        characters: [
            { name: CHARACTERS.BO_PEEP, level: 5 },
            { name: CHARACTERS.WOODY, level: 5 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.STAR_ADVENTURER, type: "building" }],
        tokens: [
            { name: CHARACTERS.POCAHONTAS, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: EARS }
        ]
    },
    {
        name: "Pizza Date",
        characters: [
            { name: CHARACTERS.BO_PEEP, level: 10 },
            { name: CHARACTERS.WOODY, level: 5 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: "building" }],
        tokens: [{ name: CHARACTERS.KUZCO, tokenType: EARS }]
    },
    //bo peep end
    //hamm
    {
        name: "Coin Collector",
        characters: [{ name: CHARACTERS.HAMM, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.TS, tokenType: COMMON, remove: true },
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.PUMBAA, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.CARPET, tokenType: EARS, remove: true },
            { name: CHARACTERS.DOPEY, tokenType: TOKEN, remove: true }
        ]
    },
    {
        name: "Pigs Can Fly!",
        characters: [{ name: CHARACTERS.HAMM, level: 2 }],
        time: "1h",
        required: [
            { name: BUILDINGS.PARACHUTE_DROP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.TINK, tokenType: TOKEN }]
    },
    {
        name: "Go for a Spin",
        characters: [{ name: CHARACTERS.HAMM, level: 1 }],
        required: [{ name: BUILDINGS.RC_RACERS, type: REQ_TYPES.BUILDING }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BUNNY, tokenType: TOKEN },
            { name: CHARACTERS.RANDALL, tokenType: TOKEN }
        ]
    },
    {
        name: "Rolling Ride",
        characters: [{ name: CHARACTERS.HAMM, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.REX, tokenType: EARS },
            { name: CHARACTERS.WILL_TURNER, tokenType: EARS, remove: true },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS, remove: true },
            { name: CHARACTERS.PRIYA, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Space Pig",
        characters: [{ name: CHARACTERS.HAMM, level: 5 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.BUZZ_ASTRO_BLASTERS,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: TOKEN },
            { name: CHARACTERS.SCROOGE, tokenType: EARS },
            { name: CHARACTERS.DUCKY, tokenType: TOKEN },
            { name: CHARACTERS.FLORA, tokenType: TOKEN },
            { name: CHARACTERS.KUIIL, tokenType: EARS }
        ]
    },
    {
        name: "Visit Jessie's Snack Roundup",
        characters: [{ name: CHARACTERS.HAMM, level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: EARS },
            { name: CHARACTERS.BUZZ, tokenType: EARS },
            { name: CHARACTERS.DRIZELLA, tokenType: EARS },
            { name: CHARACTERS.RAPUNZEL, tokenType: EARS },
            { name: CHARACTERS.PENNY, tokenType: EARS },
            { name: CHARACTERS.MIRIAM, tokenType: EARS, remove: true },
            { name: CHARACTERS.ABBY, tokenType: TOKEN, remove: true }
        ]
    },
    {
        name: "Getting a Toy Tour",
        characters: [{ name: CHARACTERS.HAMM, level: 1 }],
        time: "8h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SARGE, tokenType: TOKEN },
            { name: CHARACTERS.FLYNN, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.NALA, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.ABU, tokenType: EARS, remove: true },
            { name: CHARACTERS.PINOCCHIO, tokenType: EARS, remove: true },
            { name: CHARACTERS.CARL_FREDRICKSEN, tokenType: EARS }
        ]
    },
    {
        name: "Visit Pizza Planet",
        characters: [{ name: CHARACTERS.HAMM, level: 2 }],
        time: "12h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CINDERELLA, tokenType: EARS },
            { name: CHARACTERS.ROZ, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.CELIA, tokenType: EARS },
            { name: CHARACTERS.ERNESTO, tokenType: EARS, remove: true },
            { name: CHARACTERS.RUSSELL, tokenType: TOKEN }
        ]
    },
    {
        name: "Beat Jessie at the Claw",
        characters: [
            { name: CHARACTERS.HAMM, level: 6 },
            { name: CHARACTERS.JESSIE, level: 5 }
        ],
        time: "8h",
        tokens: [
            { name: CHARACTERS.LAUREL, tokenType: TOKEN },
            { name: CHARACTERS.LOCK, tokenType: TOKEN }
        ]
    },
    //hamm end
    //sarge
    {
        name: "Scouting",
        characters: [{ name: CHARACTERS.SARGE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.TS, tokenType: COMMON },
            { name: GROUPS.PP, tokenType: COMMON },
            { name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { name: CHARACTERS.SVEN, tokenType: EARS }
        ]
    },
    {
        name: "Visit Parachute Drop",
        characters: [{ name: CHARACTERS.SARGE, level: 2 }],
        required: [
            { name: BUILDINGS.PARACHUTE_DROP, type: REQ_TYPES.BUILDING }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.BUZZ, tokenType: EARS }]
    },
    {
        name: "Doing Laps with Rex",
        characters: [
            { name: CHARACTERS.SARGE, level: 1 },
            { name: CHARACTERS.REX, level: 1 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MIKE, tokenType: EARS }]
    },
    {
        name: "Meeting at Al's Toy Barn",
        characters: [{ name: CHARACTERS.SARGE, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.WOODY, tokenType: EARS },
            { name: CHARACTERS.RUSSELL, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: EARS },
            {
                name: SPECIAL_ITEMS.STRING,
                type: "mini_event",
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Visit Jessie's Snack Roundup",
        characters: [{ name: CHARACTERS.SARGE, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CELIA, tokenType: TOKEN },
            { name: CHARACTERS.BELLE, tokenType: EARS },
            { name: CHARACTERS.CATERPILLAR, tokenType: TOKEN },
            { name: CHARACTERS.EEYORE, tokenType: TOKEN },
            { name: CHARACTERS.JUMBA, tokenType: TOKEN },
            { name: CHARACTERS.ABBY, tokenType: TOKEN, remove: true }
        ]
    },
    {
        name: "Check Space Traders",
        characters: [{ name: CHARACTERS.SARGE, level: 10 }],
        time: "8h",
        required: [{ name: BUILDINGS.SPACE_TRADERS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: EARS },
            { name: CHARACTERS.BAGHEERA, tokenType: TOKEN },
            { name: "Green Dot", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Visit Pizza Planet",
        characters: [{ name: CHARACTERS.SARGE, level: 5 }],
        time: "12h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: TOKEN },
            { name: CHARACTERS.BUNNY, tokenType: EARS },
            { name: CHARACTERS.ROZ, tokenType: EARS },
            { name: CHARACTERS.FLYNN, tokenType: EARS },
            { name: CHARACTERS.PANIC, tokenType: EARS }
        ]
    },
    {
        name: "Watch for Danger",
        characters: [{ name: CHARACTERS.SARGE, level: 5 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BO_PEEP, tokenType: EARS },
            { name: CHARACTERS.PENNY, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.OLAF, tokenType: EARS },
            { name: CHARACTERS.COBRA_BUBBLES, tokenType: TOKEN },
            {
                name: CHARACTERS.CARL_FREDRICKSEN,
                tokenType: TOKEN,
                remove: true
            },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: TOKEN }
        ]
    },
    //sarge end
    //rex
    {
        name: "Dino Parachute Drop",
        characters: [{ name: CHARACTERS.REX, level: 1 }],
        time: "60s",
        required: [{ name: BUILDINGS.PARACHUTE_DROP, type: "building" }],
        tokens: []
    },
    {
        name: "Happy Dance",
        characters: [{ name: CHARACTERS.REX, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.TS, tokenType: COMMON },
            { name: CHARACTERS.JESSIE, tokenType: TOKEN },
            { name: CHARACTERS.JESSIE, tokenType: EARS }
        ]
    },
    {
        name: "Practice Being Brave",
        characters: [{ name: CHARACTERS.REX, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.BUZZ_ASTRO_BLASTERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: GROUPS.TS, tokenType: COMMON }]
    },
    {
        name: "Greet Guests",
        characters: [{ name: CHARACTERS.REX, level: 2 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: TOKEN },
            { name: CHARACTERS.ZURG, tokenType: TOKEN },
            { name: CHARACTERS.ZURG, tokenType: EARS },
            { name: CHARACTERS.FORKY, tokenType: EARS }
        ]
    },
    {
        name: "Make New Friends",
        characters: [{ name: CHARACTERS.REX, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.WOODY, tokenType: TOKEN },
            { name: CHARACTERS.BO_PEEP, tokenType: TOKEN },
            { name: CHARACTERS.HAMM, tokenType: TOKEN },
            { name: CHARACTERS.HAMM, tokenType: EARS }
        ]
    },
    //rex end
    //bullseye
    {
        name: "New Adventures",
        characters: [{ name: CHARACTERS.BULLSEYE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TS, tokenType: COMMON }]
    },
    {
        name: "Visit the Barn",
        characters: [{ name: CHARACTERS.BULLSEYE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SNOW_WHITE, tokenType: EARS }]
    },
    {
        name: "To the Watering Hole",
        characters: [{ name: CHARACTERS.BULLSEYE, level: 4 }],
        time: "4h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.FORKY, tokenType: TOKEN },
            { name: CHARACTERS.ERIC, tokenType: TOKEN },
            { name: CHARACTERS.FLOUNDER, tokenType: TOKEN },
            { name: CHARACTERS.FELIX, tokenType: TOKEN }
        ]
    },
    {
        name: "Watch Parachutes",
        characters: [{ name: CHARACTERS.BULLSEYE, level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.PARACHUTE_DROP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BUNNY, tokenType: TOKEN },
            { name: CHARACTERS.SIR_HISS, tokenType: EARS }
        ]
    },
    {
        name: "Run around the Planet",
        characters: [{ name: CHARACTERS.BULLSEYE, level: 8 }],
        time: "8h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MOWGLI, tokenType: TOKEN }]
    },
    //bullseye end
    //toy alien
    {
        name: "Oohs and Aahs",
        characters: [{ name: CHARACTERS.ALIEN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.JB, tokenType: COMMON }]
    },
    {
        name: "Meet Other Toys",
        characters: [{ name: CHARACTERS.ALIEN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BALOO, tokenType: EARS }]
    },
    {
        name: "Cowboy Alien",
        characters: [{ name: CHARACTERS.ALIEN, level: 4 }],
        time: "4h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: EARS },
            { name: CHARACTERS.THUMPER, tokenType: EARS },
            { name: CHARACTERS.DUG, tokenType: TOKEN }
        ]
    },
    {
        name: "Space Flight Attempt",
        characters: [{ name: CHARACTERS.ALIEN, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.PARACHUTE_DROP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.ALIEN, tokenType: TOKEN }]
    },
    {
        name: "The Claw",
        characters: [{ name: CHARACTERS.ALIEN, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.PIZZA_PLANET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: TOKEN },
            { name: CHARACTERS.WENDY, tokenType: TOKEN }
        ]
    },
    //toy alien end
    //ducky
    {
        name: "Take a Look Around",
        characters: [{ name: CHARACTERS.DUCKY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TS, tokenType: COMMON }]
    },
    {
        name: "Meeting Fellow Toys",
        characters: [{ name: CHARACTERS.DUCKY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.AL_TOY_BARN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.FORKY, tokenType: EARS }]
    },
    {
        name: "Make Suggestions",
        characters: [{ name: CHARACTERS.DUCKY, level: 6 }],
        time: "6h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.REX, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: TOKEN },
            { name: CHARACTERS.PATCH, tokenType: TOKEN },
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: TOKEN }
        ]
    },
    {
        name: "Hanging Out",
        characters: [{ name: CHARACTERS.DUCKY, level: 8 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.FLASH, tokenType: TOKEN },
            { name: CHARACTERS.PERCY, tokenType: TOKEN }
        ]
    },
    {
        name: "Discuss Ideas",
        characters: [
            { name: CHARACTERS.DUCKY, level: 9 },
            { name: CHARACTERS.WOODY, level: null }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: "building" }],
        tokens: [{ name: CHARACTERS.KUZCO, tokenType: EARS }]
    },
    {
        name: "Wait for a Kid",
        characters: [
            { name: CHARACTERS.DUCKY, level: 10 },
            { name: CHARACTERS.BUNNY, level: 10 }
        ],
        time: "24h",
        required: [{ name: BUILDINGS.STAR_ADVENTURER, type: "building" }],
        tokens: [{ name: CHARACTERS.IAN, tokenType: TOKEN }]
    },
    {
        name: "Go for a Ride",
        characters: [{ name: CHARACTERS.DUCKY, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.SLINKY, type: "building" }],
        tokens: [{ name: CHARACTERS.MERIDA, tokenType: EARS }]
    },
    //ducky end
    //forky
    {
        name: "Play with Others",
        characters: [{ name: CHARACTERS.FORKY, level: 2 }],
        time: "1h",
        tokens: [{ name: GROUPS.TS, tokenType: COMMON }]
    },
    {
        name: "What Am I?",
        characters: [{ name: CHARACTERS.FORKY, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: EARS },
            { name: CHARACTERS.BUNNY, tokenType: EARS },
            { name: CHARACTERS.FORKY, tokenType: EARS }
        ]
    },
    {
        name: "Find Trash Can",
        characters: [{ name: CHARACTERS.FORKY, level: 4 }],
        time: "2h",
        required: [
            { name: BUILDINGS.STAR_ADVENTURER, type: REQ_TYPES.BUILDING }
        ],
        tokens: []
    },
    {
        name: "Learn from Other Toys",
        characters: [{ name: CHARACTERS.FORKY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.SLINKY, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: TOKEN },
            { name: CHARACTERS.MOWGLI, tokenType: TOKEN }
        ]
    },
    {
        name: "Explore a Carnival",
        characters: [{ name: CHARACTERS.FORKY, level: 5 }],
        time: "8h"
    },
    //forky end
    //bunny
    {
        name: "Gather Some Gossip",
        characters: [{ name: CHARACTERS.BUNNY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TS, tokenType: COMMON }]
    },
    {
        name: "Chatting with Others",
        characters: [{ name: CHARACTERS.BUNNY, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.FORKY, tokenType: EARS }]
    },
    {
        name: "Provide Commentary",
        characters: [{ name: CHARACTERS.BUNNY, level: 3 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: EARS },
            { name: CHARACTERS.NICK, tokenType: EARS },
            { name: CHARACTERS.MERIDA, tokenType: EARS },
            { name: CHARACTERS.BLUE_FAIRY, tokenType: TOKEN }
        ]
    },
    {
        name: "Imitation Games",
        characters: [
            { name: CHARACTERS.BUNNY, level: 3 },
            { name: CHARACTERS.DUCKY, level: 3 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: TOKEN },
            { name: CHARACTERS.BUNNY, tokenType: EARS }
        ]
    },
    {
        name: "Hooked In",
        characters: [{ name: CHARACTERS.BUNNY, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.STAR_ADVENTURER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: EARS },
            { name: CHARACTERS.MOWGLI, tokenType: EARS },
            { name: CHARACTERS.PERCY, tokenType: EARS }
        ]
    },
    {
        name: "Imagine Ideas",
        characters: [
            { name: CHARACTERS.BUNNY, level: 8 },
            { name: CHARACTERS.WOODY, level: 8 }
        ],
        time: "12h",
        required: [
            { name: BUILDINGS.JESSIE_SNACK_ROUNDUP, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: EARS }]
    },
    //bunny end
    //cinderella
    {
        name: "Have a Royal Greeting",
        characters: [{ name: CHARACTERS.CINDERELLA, level: 1 }],
        time: "1h",
        level: 1,
        tokens: [
            { name: GROUPS.CINDERELLA, tokenType: COMMON },
            { name: CHARACTERS.DASH, tokenType: TOKEN }
        ]
    },
    {
        name: "Sing for the Guests",
        characters: [{ name: CHARACTERS.CINDERELLA, level: 1 }],
        time: "2h",
        level: 3,
        tokens: [
            { name: CHARACTERS.WILL_TURNER, tokenType: EARS },
            { name: CHARACTERS.COGSWORTH, tokenType: EARS },
            { name: CHARACTERS.PHIL, tokenType: EARS },
            { name: CHARACTERS.PHINEAS, tokenType: EARS }
        ]
    },
    {
        name: "Travel Together",
        characters: [
            { name: CHARACTERS.CINDERELLA, level: 1 },
            { name: CHARACTERS.CHARMING, level: 2 }
        ],
        time: "2h",
        level: 1,
        required: [
            { name: BUILDINGS.REGAL_CARROUSEL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: EARS },
            { name: CHARACTERS.BUZZ, tokenType: TOKEN },
            { name: CHARACTERS.MING_LEE, tokenType: TOKEN },
            { name: CHARACTERS.ABBY, tokenType: TOKEN }
        ]
    },
    {
        name: "Galloping Around",
        characters: [{ name: CHARACTERS.CINDERELLA, level: 1 }],
        time: "4h",
        level: 4,
        required: [
            { name: BUILDINGS.REGAL_CARROUSEL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CHARMING, tokenType: EARS },
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: TOKEN },
            { name: CHARACTERS.DRIZELLA, tokenType: TOKEN },
            { name: CHARACTERS.ELIZABETH, tokenType: TOKEN },
            { name: CHARACTERS.SYNDROME, tokenType: TOKEN }
        ]
    },
    {
        name: "Attend a Ball",
        characters: [
            { name: CHARACTERS.CINDERELLA, level: 7 },
            { name: CHARACTERS.CHARMING, level: 7 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.PRINCESS_FAIRYTALE }],
        tokens: [
            { name: CHARACTERS.NICK, tokenType: EARS },
            { name: CHARACTERS.MAMA_COCO, tokenType: EARS },
            { name: CHARACTERS.PAIN, tokenType: TOKEN },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN }
        ]
    },
    {
        name: "Explore the Fairgrounds",
        characters: [{ name: CHARACTERS.CINDERELLA, level: 1 }],
        time: "8h",
        level: 2,
        required: [{ name: BUILDINGS.FANTASY_FAIRE }],
        tokens: [
            { name: CHARACTERS.ANASTASIA, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.BB8, tokenType: TOKEN, remove: true },
            {
                name: CHARACTERS.JACK_SKELLINGTON,
                tokenType: EARS,
                remove: true
            },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Talk about Forgiveness",
        characters: [
            { name: CHARACTERS.CINDERELLA, level: 7 },
            { name: CHARACTERS.ANASTASIA, level: 7 }
        ],
        time: "8h",
        required: [
            { name: BUILDINGS.REGAL_CARROUSEL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HUEY, tokenType: TOKEN },
            { name: CHARACTERS.SQUIRT, tokenType: TOKEN }
        ]
    },
    {
        name: "Discuss the Past",
        characters: [
            { name: CHARACTERS.CINDERELLA, level: 8 },
            { name: CHARACTERS.DRIZELLA, level: 8 }
        ],
        time: "8h",
        required: [
            {
                name: BUILDINGS.REGAL_CARROUSEL,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.DEWEY, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN }
        ]
    },
    {
        name: "Talking of Dreams",
        characters: [
            { name: CHARACTERS.CINDERELLA, level: 6 },
            { name: CHARACTERS.FAIRY_GODMOTHER, level: 6 }
        ],
        time: "12h",
        required: [
            {
                name: BUILDINGS.REGAL_CARROUSEL,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.HOOK, tokenType: EARS },
            { name: CHARACTERS.KRONK, tokenType: EARS }
        ]
    },
    {
        name: "Give a Tour",
        characters: [{ name: CHARACTERS.CINDERELLA, level: 10 }],
        time: "12h",
        required: [
            {
                name: BUILDINGS.PRINCESS_FAIRYTALE,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.JOE, tokenType: EARS, remove: true },
            { name: CHARACTERS.GEPPETTO, tokenType: EARS, remove: true },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN }
        ]
    },
    //cinderella end
    //prince charming
    {
        name: "Greet Guests",
        characters: [{ name: CHARACTERS.CHARMING, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.CINDERELLA, tokenType: COMMON },
            { name: GROUPS.PIRATES, tokenType: COMMON },
            { name: CHARACTERS.DASH, tokenType: EARS }
        ]
    },
    {
        name: "Search for the Owner",
        characters: [{ name: CHARACTERS.CHARMING, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.CINDERELLA, tokenType: TOKEN },
            { name: CHARACTERS.ELIZABETH, tokenType: TOKEN },
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: TOKEN },
            { name: CHARACTERS.KANGA, tokenType: TOKEN },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Jousting Practice",
        characters: [{ name: CHARACTERS.CHARMING, level: 4 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.REGAL_CARROUSEL,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.DAISY, tokenType: TOKEN },
            { name: CHARACTERS.TREMAINE, tokenType: TOKEN },
            { name: CHARACTERS.DRIZELLA, tokenType: TOKEN },
            { name: CHARACTERS.JACK_SPARROW, tokenType: EARS },
            { name: CHARACTERS.KEVIN, tokenType: EARS },
            {
                name: SPECIAL_ITEMS.BOBA_FETT_BOUNTY_HUNTER_FABRIC,
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Accepting Visitors",
        characters: [{ name: CHARACTERS.CHARMING, level: 1 }],
        level: 3,
        time: "8h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TIMOTHY, tokenType: EARS, remove: true },
            { name: CHARACTERS.NEMO, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.BB8, tokenType: EARS, remove: true },
            {
                name: CHARACTERS.CARL_FREDRICKSEN,
                tokenType: TOKEN,
                remove: true
            },
            { name: CHARACTERS.PRIYA, tokenType: EARS, remove: true },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Tour Countryside",
        characters: [{ name: CHARACTERS.CHARMING, level: 1 }],
        time: "12h",
        level: 5,
        required: [{ name: BUILDINGS.FANTASY_FAIRE }],
        tokens: [
            { name: CHARACTERS.HANS, tokenType: EARS },
            { name: CHARACTERS.OOGIE, tokenType: EARS },
            { name: CHARACTERS.GASTON, tokenType: TOKEN },
            { name: CHARACTERS.NAVEEN, tokenType: TOKEN }
        ]
    },
    //prince charming end
    //fairy godmother
    {
        name: "Bibbidi Bobbidi Boo!",
        characters: [{ name: CHARACTERS.FAIRY_GODMOTHER, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.CINDERELLA, tokenType: COMMON },
            { name: GROUPS.PINOCCHIO, tokenType: COMMON }
        ]
    },
    {
        name: "Magical Tour",
        characters: [{ name: CHARACTERS.FAIRY_GODMOTHER, level: 1 }],
        time: "2h",
        required: [
            {
                name: BUILDINGS.REGAL_CARROUSEL,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.DRIZELLA, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.TREMAINE, tokenType: EARS, remove: true },
            { name: CHARACTERS.TIGGER, tokenType: EARS, remove: true },
            { name: CHARACTERS.GOGO, tokenType: EARS, remove: true },
            { name: CHARACTERS.BOUN, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.BLUE_FAIRY, tokenType: EARS, remove: true },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Helping Others",
        characters: [{ name: CHARACTERS.FAIRY_GODMOTHER, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.FANTASY_FAIRE, type: "building" }],
        tokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.CHARMING, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.GOGO, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.FRED, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.BARLEY, tokenType: TOKEN, remove: true },
            {
                name: CHARACTERS.THE_MANDALORIAN,
                tokenType: TOKEN,
                remove: true
            },
            { name: CHARACTERS.LUCA, tokenType: EARS, remove: true }
        ]
    },
    {
        name: "Offering Advice",
        characters: [{ name: CHARACTERS.FAIRY_GODMOTHER, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ANASTASIA, tokenType: EARS, remove: true },
            { name: CHARACTERS.EEYORE, tokenType: EARS, remove: true },
            { name: CHARACTERS.SYNDROME, tokenType: EARS },
            { name: CHARACTERS.KEVIN, tokenType: TOKEN },
            { name: CHARACTERS.KEVIN, tokenType: EARS }
        ]
    },
    {
        name: "Magical Touch-Up",
        characters: [
            { name: CHARACTERS.FAIRY_GODMOTHER, level: 5 },
            { name: CHARACTERS.CINDERELLA, level: 4 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.FIRE_SPIRIT, tokenType: EARS },
            { name: CHARACTERS.BLAZEY, tokenType: TOKEN }
        ]
    },
    //godmother end
    //anastasia
    {
        name: "Play the Flute",
        characters: [{ name: CHARACTERS.ANASTASIA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.CINDERELLA, tokenType: COMMON }]
    },
    {
        name: "An Invitation Argument",
        characters: [
            { name: CHARACTERS.ANASTASIA, level: 2 },
            { name: CHARACTERS.DRIZELLA, level: 2 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.AURORA, tokenType: TOKEN }]
    },
    {
        name: "Sleep in at Home",
        characters: [{ name: CHARACTERS.ANASTASIA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.REGAL_CARROUSEL, type: "building" }],
        tokens: [
            { name: CHARACTERS.LUCA, tokenType: TOKEN },
            { name: CHARACTERS.PERDITA, tokenType: TOKEN }
        ]
    },
    {
        name: "Shop for Dresses",
        characters: [{ name: CHARACTERS.ANASTASIA, level: 4 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.CINDERELLA, tokenType: TOKEN },
            { name: CHARACTERS.TREMAINE, tokenType: TOKEN }
        ]
    },
    //drizella
    {
        name: "Sing Sweetly",
        characters: [{ name: CHARACTERS.DRIZELLA, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.CINDERELLA, tokenType: COMMON },
            { name: GROUPS.ENG, tokenType: COMMON }
        ]
    },
    {
        name: "Follow Beauty Routine",
        characters: [{ name: CHARACTERS.DRIZELLA, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.CINDERELLA, tokenType: TOKEN },
            { name: CHARACTERS.ANASTASIA, tokenType: EARS },
            { name: CHARACTERS.TREMAINE, tokenType: EARS }
        ]
    },
    {
        name: "Seek Out Treats",
        characters: [{ name: CHARACTERS.DRIZELLA, level: 3 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.SINA, tokenType: EARS },
            { name: CHARACTERS.GIULIA, tokenType: TOKEN }
        ]
    },
    {
        name: "A Teasing Dance",
        characters: [
            { name: CHARACTERS.DRIZELLA, level: 4 },
            { name: CHARACTERS.ANASTASIA, level: 4 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BRIDE, tokenType: TOKEN },
            { name: CHARACTERS.BRIDE, tokenType: EARS }
        ]
    },
    //lady tremaine
    {
        name: "Follow Personal Interests",
        characters: [{ name: CHARACTERS.TREMAINE, level: 3 }],
        time: "1h",
        tokens: [
            { name: GROUPS.CINDERELLA, tokenType: COMMON },
            { name: CHARACTERS.CINDERELLA, tokenType: TOKEN }
        ]
    },
    {
        name: "Seek Out Prospects",
        characters: [{ name: CHARACTERS.TREMAINE, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.MAID_MARIAN, tokenType: TOKEN }]
    },
    {
        name: "Walk with Purpose",
        characters: [{ name: CHARACTERS.TREMAINE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.CINDERELLA, tokenType: COMMON },
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: TOKEN }
        ]
    },
    {
        name: "Walk with Authority",
        characters: [{ name: CHARACTERS.TREMAINE, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: EARS },
            { name: CHARACTERS.DRIZELLA, tokenType: EARS },
            { name: CHARACTERS.CHARMING, tokenType: TOKEN },
            { name: CHARACTERS.CHARMING, tokenType: EARS }
        ]
    },
    //peter pan
    {
        name: "A Teasing Nature",
        characters: [{ name: CHARACTERS.PETER, level: 1 }],
        time: "1h",
        tokens: [{ name: CHARACTERS.PETER, tokenType: COMMON }]
    },
    {
        name: "Visiting for Stories",
        characters: [{ name: CHARACTERS.PETER, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.PETER_PAN_FLIGHT }],
        tokens: [{ name: CHARACTERS.HOOK, tokenType: EARS }]
    },
    {
        name: "Planning Some Fun",
        characters: [{ name: CHARACTERS.PETER, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LOST_BOYS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TIA_DALMA, tokenType: TOKEN },
            { name: CHARACTERS.COLETTE, tokenType: TOKEN },
            { name: CHARACTERS.ROBIN_HOOD, tokenType: EARS }
        ]
    },
    {
        name: "Flying Around the City",
        characters: [
            { name: CHARACTERS.PETER, level: 7 },
            { name: CHARACTERS.WENDY, level: 7 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.PETER_PAN_FLIGHT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MICHAEL, tokenType: EARS }]
    },
    {
        name: "Challenging Pirates",
        characters: [{ name: CHARACTERS.PETER, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.JOLLY_ROGER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JOHN, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: TOKEN }
        ]
    },
    //tinkerbell
    {
        name: "Inspect the Castle",
        characters: [{ name: CHARACTERS.TINK, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.PP, tokenType: COMMON },
            { name: GROUPS.TANGLED, tokenType: COMMON },
            { name: GROUPS.BH6, tokenType: COMMON }
        ]
    },
    {
        name: "Find Lost Things",
        characters: [{ name: CHARACTERS.TINK, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.PIXIE_HOLLOW, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.KRISTOFF, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.BELLE, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.RABBIT, tokenType: EARS, remove: true },
            { name: CHARACTERS.NANI, tokenType: EARS, remove: true },
            {
                name: CHARACTERS.CARL_FREDRICKSEN,
                tokenType: TOKEN,
                remove: true
            },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Tinker with Things",
        characters: [{ name: CHARACTERS.TINK, level: 1 }],
        time: "4h",
        level: 7,
        required: [{ name: BUILDINGS.PIXIE_HOLLOW, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: EARS },
            { name: CHARACTERS.AURORA, tokenType: EARS },
            { name: CHARACTERS.ANNA, tokenType: EARS },
            { name: CHARACTERS.TIGGER, tokenType: TOKEN },
            { name: CHARACTERS.PLEAKLEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Take Stock of Lost Things",
        characters: [{ name: CHARACTERS.TINK, level: 1 }],
        time: "6h",
        level: 4,
        required: [{ name: BUILDINGS.PIXIE_HOLLOW, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MIKE, tokenType: EARS },
            { name: CHARACTERS.CELIA, tokenType: TOKEN },
            { name: CHARACTERS.JOCK, tokenType: EARS },
            { name: CHARACTERS.CHESHIRE, tokenType: EARS },
            { name: CHARACTERS.SARAH_SANDERSON, tokenType: EARS },
            {
                name: SPECIAL_ITEMS.REFRESH_TOKEN,
                tokenType: SPECIAL,
                remove: true
            }
        ]
    },
    {
        name: "Visit Princess Fairytale Hall",
        characters: [{ name: CHARACTERS.TINK, level: 8 }],
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        time: "8h",
        tokens: [
            { name: CHARACTERS.WENDY, tokenType: TOKEN },
            { name: CHARACTERS.PETER, tokenType: EARS },
            { name: CHARACTERS.CRUSH, tokenType: EARS },
            { name: CHARACTERS.TONY, tokenType: EARS }
        ]
    },
    {
        name: "Do Some Fixing-Up",
        characters: [{ name: CHARACTERS.TINK, level: 1 }],
        time: "12h",
        level: 10,
        required: [{ name: BUILDINGS.PIXIE_HOLLOW, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GOTHEL, tokenType: EARS },
            { name: CHARACTERS.BAGHEERA, tokenType: EARS },
            { name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { name: CHARACTERS.KRONK, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit Fantasy Faire",
        characters: [{ name: CHARACTERS.TINK, level: 1 }],
        time: "24h",
        level: 1,
        required: [{ name: BUILDINGS.FANTASY_FAIRE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: TOKEN },
            { name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: EARS },
            { name: CHARACTERS.MAMA_COCO, tokenType: TOKEN },
            { name: CHARACTERS.RYDER, tokenType: TOKEN }
        ]
    },
    //tinkerbell end
    //wendy
    {
        name: "Trying to Fly",
        characters: [{ name: CHARACTERS.WENDY, level: 1 }],
        time: "1h",
        tokens: [{ name: CHARACTERS.PETER, tokenType: COMMON }]
    },
    {
        name: "Visiting Mermaids",
        characters: [{ name: CHARACTERS.WENDY, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.PETER_PAN_FLIGHT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.HOOK, tokenType: TOKEN }]
    },
    {
        name: "Spying on Hook",
        characters: [{ name: CHARACTERS.WENDY, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.JOLLY_ROGER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SHAN_YU, tokenType: TOKEN }]
    },
    {
        name: "Discussing Stories",
        characters: [
            { name: CHARACTERS.WENDY, level: 6 },
            { name: CHARACTERS.JOHN, level: 6 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.PETER_PAN_FLIGHT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.TIA_DALMA, tokenType: TOKEN }]
    },
    {
        name: "Stories in the Hideout",
        characters: [{ name: CHARACTERS.WENDY, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.LOST_BOYS, type: REQ_TYPES.BUILDING }],
        tokens: [
            {
                name: CHARACTERS.JOHN,
                tokenType: TOKEN
            },
            { name: CHARACTERS.BARBOSSA, tokenType: EARS },
            { name: CHARACTERS.COLETTE, tokenType: TOKEN }
        ]
    },
    {
        name: "Revisiting Old Tales",
        characters: [
            { name: CHARACTERS.WENDY, level: 6 },
            { name: CHARACTERS.PETER, level: 5 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.LOST_BOYS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JOE, tokenType: TOKEN },
            { name: CHARACTERS.LADY, tokenType: EARS }
        ]
    },
    {
        name: "Bedtime Stories",
        characters: [
            { name: CHARACTERS.WENDY, level: 7 },
            { name: CHARACTERS.MICHAEL, level: 6 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.PETER_PAN_FLIGHT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.POCAHONTAS, tokenType: TOKEN },
            { name: CHARACTERS.KUZCO, tokenType: TOKEN }
        ]
    },
    {
        name: "A Telling of Tales",
        characters: [
            { name: CHARACTERS.PETER, level: 8 },
            { name: CHARACTERS.WENDY, level: 9 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.LOST_BOYS, type: REQ_TYPES.BUILDING, level: 2 }
        ],
        tokens: [{ name: CHARACTERS.LINGUINI, tokenType: EARS }]
    },
    //wendy end
    //michael
    {
        name: "Wandering with a Friend",
        characters: [{ name: CHARACTERS.MICHAEL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUMBO, tokenType: COMMON }]
    },
    {
        name: "Play with Lost Boys",
        characters: [{ name: CHARACTERS.MICHAEL, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LOST_BOYS, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.DUMBO, tokenType: EARS }]
    },
    {
        name: "Pretend Pirate",
        characters: [{ name: CHARACTERS.MICHAEL, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.JOLLY_ROGER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.REMY, tokenType: TOKEN }]
    },
    {
        name: "Looking after Each Other",
        characters: [
            { name: CHARACTERS.MICHAEL, level: 5 },
            { name: CHARACTERS.WENDY, level: 5 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.ORVILLE, tokenType: EARS }]
    },
    {
        name: "Play-Acting Together",
        characters: [
            { name: CHARACTERS.MICHAEL, level: 7 },
            { name: CHARACTERS.JOHN, level: 9 }
        ],
        time: "6h",
        required: [
            {
                name: BUILDINGS.PETER_PAN_FLIGHT,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [{ name: CHARACTERS.LINGUINI, tokenType: EARS }]
    },
    //michael end
    //john
    {
        name: "Being a Leader",
        characters: [{ name: CHARACTERS.JOHN, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.LOST_BOYS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MICHAEL, tokenType: TOKEN },
            { name: CHARACTERS.TONY, tokenType: EARS },
            { name: CHARACTERS.SHAN_YU, tokenType: TOKEN },
            { name: GROUPS.ROBINHOOD, tokenType: COMMON }
        ]
    },
    {
        name: "Asking Questions",
        characters: [
            { name: CHARACTERS.JOHN, level: 5 },
            { name: CHARACTERS.PETER, level: 5 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.TIMOTHY, tokenType: EARS }]
    },
    {
        name: "Dealing with Pirates",
        characters: [{ name: CHARACTERS.JOHN, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.JOLLY_ROGER, type: "building" }],
        tokens: [{ name: CHARACTERS.JOE, tokenType: EARS }]
    },
    {
        name: "Testing Flying",
        characters: [
            { name: CHARACTERS.JOHN, level: 7 },
            { name: CHARACTERS.PETER, level: 7 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.PETER_PAN_FLIGHT, type: "building" }],
        tokens: [{ name: CHARACTERS.KUZCO, tokenType: EARS }]
    },
    //captain hook
    {
        name: "Bellowing Orders",
        characters: [{ name: CHARACTERS.HOOK, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.JOLLY_ROGER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.PETER, tokenType: COMMON }]
    },
    {
        name: "Skulking Around",
        characters: [{ name: CHARACTERS.HOOK, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.WENDY, tokenType: EARS },
            { name: CHARACTERS.JOHN, tokenType: EARS },
            { name: CHARACTERS.HOOK, tokenType: TOKEN },
            { name: CHARACTERS.HOOK, tokenType: EARS }
        ]
    },
    {
        name: "Plotting Against Pan",
        characters: [{ name: CHARACTERS.HOOK, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.PETER_PAN_FLIGHT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.PETER, tokenType: TOKEN },
            { name: CHARACTERS.MICHAEL, tokenType: EARS }
        ]
    },
    //elizabeth swann
    {
        name: "Hoist the Colors",
        characters: [{ name: CHARACTERS.ELIZABETH, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PIRATES, tokenType: COMMON }]
    },
    {
        name: "Make Plans",
        characters: [
            { name: CHARACTERS.ELIZABETH, level: 2 },
            { name: CHARACTERS.WILL_TURNER, level: 3 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SULLEY, tokenType: TOKEN },
            { name: CHARACTERS.BARBOSSA, tokenType: TOKEN }
        ]
    },
    {
        name: "Pirate's Life for Me",
        characters: [
            { name: CHARACTERS.ELIZABETH, level: 4 },
            { name: CHARACTERS.JACK_SPARROW, level: 3 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.TIA_DALMA, tokenType: EARS }]
    },
    {
        name: "Swordplay",
        characters: [
            { name: CHARACTERS.ELIZABETH, level: 5 },
            { name: CHARACTERS.WILL_TURNER, level: 4 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.PETE, tokenType: TOKEN },
            { name: CHARACTERS.FLORA, tokenType: TOKEN },
            { name: CHARACTERS.FAUNA, tokenType: EARS }
        ]
    },
    {
        name: "Commission a Ship",
        characters: [{ name: CHARACTERS.ELIZABETH, level: 6 }],
        time: "6h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ANASTASIA, tokenType: TOKEN },
            { name: CHARACTERS.HOOK, tokenType: TOKEN },
            { name: CHARACTERS.DAVY_JONES, tokenType: TOKEN },
            ,
            { name: "Blue", type: "fabric", tokenType: FABRIC }
        ]
    },
    //will turner
    {
        name: "Stay in Shape",
        characters: [{ name: CHARACTERS.WILL_TURNER, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.PIRATES, tokenType: COMMON },
            { name: CHARACTERS.JACK_SPARROW, tokenType: TOKEN }
        ]
    },
    {
        name: "Practice Social Skills",
        characters: [{ name: CHARACTERS.WILL_TURNER, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ELIZABETH, tokenType: EARS },
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: TOKEN },
            { name: CHARACTERS.HOOK, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: TOKEN },
            { name: CHARACTERS.STROMBOLI, tokenType: EARS }
        ]
    },
    {
        name: "Bargaining",
        characters: [
            { name: CHARACTERS.WILL_TURNER, level: 7 },
            { name: CHARACTERS.BARBOSSA, level: 6 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TIA_DALMA, tokenType: EARS },
            { name: CHARACTERS.PETER, tokenType: EARS }
        ]
    },
    {
        name: "Testing the Blade",
        characters: [{ name: CHARACTERS.WILL_TURNER, level: 6 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.REX, tokenType: TOKEN },
            { name: CHARACTERS.DUCKY, tokenType: EARS },
            { name: CHARACTERS.DAVY_JONES, tokenType: EARS }
        ]
    },
    //jack sparrow
    {
        name: "Show Off Swordsmanship",
        characters: [{ name: CHARACTERS.JACK_SPARROW, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.PIRATES, tokenType: COMMON },
            { name: CHARACTERS.WILL_TURNER, tokenType: EARS }
        ]
    },
    {
        name: "Live the Pirate's Life",
        characters: [{ name: CHARACTERS.JACK_SPARROW, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ELIZABETH, tokenType: EARS },
            { name: CHARACTERS.KING_LOUIE, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: EARS },
            { name: CHARACTERS.HATBOX_GHOST, tokenType: EARS }
        ]
    },
    {
        name: "Hiding from Trouble",
        characters: [{ name: CHARACTERS.JACK_SPARROW, level: 5 }],
        time: "4h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HOOK, tokenType: EARS },
            { name: CHARACTERS.BARBOSSA, tokenType: TOKEN }
        ]
    },
    {
        name: "Really Bad Eggs",
        characters: [{ name: CHARACTERS.JACK_SPARROW, level: 6 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.DAVY_JONES, tokenType: EARS },
            { name: CHARACTERS.ROLLY, tokenType: TOKEN }
        ]
    },
    //barbossa //captain barbossa
    {
        name: "Searching the Skyline",
        characters: [{ name: CHARACTERS.BARBOSSA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PIRATES, tokenType: COMMON }]
    },
    {
        name: "Making Plans",
        characters: [
            { name: CHARACTERS.BARBOSSA, level: 8 },
            { name: CHARACTERS.TIA_DALMA, level: 7 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.PIRATES_OF_CARIBBEAN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DAVY_JONES, tokenType: TOKEN },
            { name: CHARACTERS.DAVY_JONES, tokenType: EARS }
        ]
    },
    {
        name: "Discussing Goals",
        characters: [
            { name: CHARACTERS.BARBOSSA, level: 7 },
            { name: CHARACTERS.TIA_DALMA, level: 6 }
        ],
        time: "8h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TIMOTHY, tokenType: TOKEN },
            { name: CHARACTERS.SHAN_YU, tokenType: EARS }
        ]
    },
    {
        name: "Searching for Treasure",
        characters: [{ name: CHARACTERS.BARBOSSA, level: 9 }],
        time: "12h",
        required: [{ name: BUILDINGS.DAVY_ORGAN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.REMY, tokenType: EARS }]
    },
    //barbossa end //captain barbossa end
    //davy jones
    {
        name: "Calling the Kraken",
        characters: [{ name: CHARACTERS.DAVY_JONES, level: 3 }],
        time: "1h",
        required: [{ name: BUILDINGS.KRAKEN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.PIRATES, tokenType: COMMON }]
    },
    {
        name: "Laughing Over Plans",
        characters: [{ name: CHARACTERS.DAVY_JONES, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.JACK_SPARROW, tokenType: TOKEN },
            { name: CHARACTERS.TIA_DALMA, tokenType: TOKEN },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: EARS }
        ]
    },
    {
        name: "Striking Fear in Pirates",
        characters: [{ name: CHARACTERS.DAVY_JONES, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.JACK_SPARROW, tokenType: EARS },
            { name: CHARACTERS.BARBOSSA, tokenType: EARS },
            { name: CHARACTERS.MICHAEL, tokenType: TOKEN },
            { name: "Pirate", tokenType: FABRIC }
        ]
    },
    {
        name: "Playing into the Night",
        characters: [{ name: CHARACTERS.DAVY_JONES, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.DAVY_ORGAN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PETE, tokenType: TOKEN },
            { name: CHARACTERS.PETE, tokenType: EARS }
        ]
    },
    //tia dalma
    {
        name: "Whirlpool Vortex",
        characters: [{ name: CHARACTERS.TIA_DALMA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PIRATES, tokenType: COMMON }]
    },
    {
        name: "Reading the Shells",
        characters: [{ name: CHARACTERS.TIA_DALMA, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.PIRATES_OF_CARIBBEAN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.DUMBO, tokenType: EARS }]
    },
    {
        name: "Discussing Fates",
        characters: [
            { name: CHARACTERS.TIA_DALMA, level: 5 },
            { name: CHARACTERS.WILL_TURNER, level: 9 }
        ],
        time: "12h",
        required: [
            { name: BUILDINGS.TORTUGA_TAVERN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { name: CHARACTERS.TRAMP, tokenType: EARS }
        ]
    },
    {
        name: "Reliving Memories",
        characters: [{ name: CHARACTERS.TIA_DALMA, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.DAVY_ORGAN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ERCOLE, tokenType: EARS },
            { name: CHARACTERS.MAID_MARIAN, tokenType: EARS }
        ]
    },
    //mike
    {
        name: "Cool Guy",
        characters: [{ name: CHARACTERS.MIKE, level: 1 }],
        time: "1h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: GROUPS.MONSTERS, tokenType: COMMON }]
    },
    {
        name: "Submit Files",
        characters: [{ name: CHARACTERS.MIKE, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.SULLEY, tokenType: TOKEN },
            { name: CHARACTERS.BOO, tokenType: TOKEN }
        ]
    },
    {
        name: "Send Love",
        characters: [
            { name: CHARACTERS.MIKE, level: 3 },
            { name: CHARACTERS.CELIA, level: 2 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: EARS },
            { name: CHARACTERS.EVE, tokenType: TOKEN },
            { name: CHARACTERS.WALLE, tokenType: TOKEN }
        ]
    },
    {
        name: "Check on the Doors",
        characters: [{ name: CHARACTERS.MIKE, level: 1 }],
        required: [
            { name: BUILDINGS.MIKE_SULLEY_RESCUE, type: REQ_TYPES.BUILDING }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.ROZ, tokenType: EARS },
            { name: CHARACTERS.ROBIN_HOOD, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.KEVIN, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.ABBY, tokenType: EARS, remove: true },
            { name: CHARACTERS.MING_LEE, tokenType: EARS, remove: true },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Check on the Laugh Floor",
        characters: [{ name: CHARACTERS.MIKE, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: EARS },
            { name: CHARACTERS.DRIZELLA, tokenType: EARS },
            { name: CHARACTERS.FAIRY_GODMOTHER, tokenType: EARS },
            { name: CHARACTERS.CATERPILLAR, tokenType: EARS }
        ]
    },
    {
        name: "Dinner Date with Celia Mae",
        characters: [
            { name: CHARACTERS.MIKE },
            { name: CHARACTERS.CELIA, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.PETE, tokenType: EARS }]
    },
    {
        name: "Group Laugh Floor Visit",
        characters: [
            { name: CHARACTERS.MIKE, level: 2 },
            { name: CHARACTERS.SULLEY, level: 1 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CELIA, tokenType: EARS },
            { name: CHARACTERS.CHIP, tokenType: EARS },
            { name: CHARACTERS.GUS, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Heckle the Performer",
        characters: [
            { name: CHARACTERS.MIKE, level: 4 },
            { name: CHARACTERS.RANDALL, level: 2 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.RAPUNZEL, tokenType: EARS },
            { name: CHARACTERS.PASCAL, tokenType: TOKEN },
            { name: CHARACTERS.PINOCCHIO, tokenType: TOKEN },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: EARS }
        ]
    },
    {
        name: "Perform Stand-Up",
        characters: [{ name: CHARACTERS.MIKE, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DRIZELLA, tokenType: TOKEN },
            { name: CHARACTERS.GENERAL_HUX, tokenType: EARS },
            { name: CHARACTERS.BOUN, tokenType: EARS },
            { name: CHARACTERS.LUCA, tokenType: TOKEN }
        ]
    },
    {
        name: "Get Scolded by Roz",
        characters: [
            { name: CHARACTERS.MIKE, level: 6 },
            { name: CHARACTERS.ROZ, level: 2 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.FLORA, tokenType: EARS },
            { name: CHARACTERS.MERRYWEATHER, tokenType: EARS },
            { name: CHARACTERS.LOUIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Rehearse Show",
        characters: [
            { name: CHARACTERS.MIKE, level: 5 },
            { name: CHARACTERS.SULLEY, level: 4 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.RANDALL, tokenType: EARS },
            { name: CHARACTERS.FAUNA, tokenType: TOKEN },
            { name: CHARACTERS.LAUREL, tokenType: EARS },
            { name: CHARACTERS.CARA_DUNE, tokenType: TOKEN }
        ]
    },
    {
        name: "Dealing with Trouble",
        characters: [
            { name: CHARACTERS.MIKE, level: 8 },
            { name: CHARACTERS.RANDALL, level: 7 }
        ],
        time: "8h",
        tokens: [
            { name: CHARACTERS.BAMBI, tokenType: TOKEN },
            { name: CHARACTERS.BAMBI, tokenType: EARS }
        ]
    },
    {
        name: "Grab Food with Sulley",
        characters: [
            { name: CHARACTERS.MIKE, level: 3 },
            { name: CHARACTERS.SULLEY, level: 5 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: EARS },
            { name: CHARACTERS.PAIN, tokenType: EARS }
        ]
    },
    {
        name: "Canister Juggling",
        characters: [{ name: CHARACTERS.MIKE, level: 10 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.COLETTE, tokenType: EARS },
            { name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: TOKEN },
            { name: "Orange Pattern", tokenType: FABRIC }
        ]
    },
    {
        name: "Comedy for an Event!",
        characters: [{ name: CHARACTERS.MIKE, level: 1 }],
        time: "8h",
        tokens: []
    },
    //mike end
    //sulley
    {
        name: "Practice Material",
        characters: [{ name: CHARACTERS.SULLEY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.WALLE, tokenType: COMMON },
            { name: GROUPS.MONSTERS, tokenType: COMMON }
        ]
    },
    {
        name: "Perform Stand-Up",
        characters: [{ name: CHARACTERS.SULLEY, level: 6 }],
        time: "2h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: GROUPS.WALLE, tokenType: EARS },
            { name: CHARACTERS.RAPUNZEL, tokenType: TOKEN },
            { name: CHARACTERS.CATERPILLAR, tokenType: TOKEN }
        ]
    },
    {
        name: "Laugh It Up",
        characters: [{ name: CHARACTERS.SULLEY, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: TOKEN },
            { name: CHARACTERS.BOO, tokenType: EARS },
            { name: CHARACTERS.DARTH_VADER, tokenType: TOKEN },
            { name: CHARACTERS.ALBERTO, tokenType: EARS }
        ]
    },
    {
        name: "Feeling Starved",
        characters: [{ name: CHARACTERS.SULLEY, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PETE, tokenType: TOKEN },
            { name: CHARACTERS.AURORA, tokenType: EARS },
            { name: CHARACTERS.BLAZEY, tokenType: EARS }
        ]
    },
    {
        name: "Compete with Randall",
        characters: [
            { name: CHARACTERS.SULLEY, level: 8 },
            { name: CHARACTERS.RANDALL, level: 1 }
        ],
        required: [
            { name: BUILDINGS.MIKE_SULLEY_RESCUE, type: REQ_TYPES.BUILDING }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.GOTHEL, tokenType: EARS }]
    },
    {
        name: "Get to Work",
        characters: [{ name: CHARACTERS.SULLEY }],
        time: "2h",
        required: [
            { name: BUILDINGS.MIKE_SULLEY_RESCUE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.SCROOGE, tokenType: EARS }]
    },
    {
        name: "Be the Life of the Party",
        characters: [{ name: CHARACTERS.SULLEY, level: 10 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.JOE, tokenType: TOKEN },
            { name: CHARACTERS.COLETTE, tokenType: EARS },
            { name: "White & Blue Pattern", tokenType: FABRIC }
        ]
    },
    //boo
    {
        name: "Make Some Friends",
        characters: [{ name: CHARACTERS.BOO, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MONSTERS, tokenType: COMMON },
            { name: CHARACTERS.SULLEY, tokenType: TOKEN },
            { name: CHARACTERS.BOO, tokenType: TOKEN }
        ]
    },
    {
        name: "Explore Some Doors",
        characters: [{ name: CHARACTERS.BOO, level: 1 }],
        time: "1h",
        required: [
            { name: BUILDINGS.MIKE_SULLEY_RESCUE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.ROZ, tokenType: TOKEN }]
    },
    {
        name: "Laugh Along",
        characters: [{ name: CHARACTERS.BOO, level: 1 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MIKE, tokenType: TOKEN },
            { name: CHARACTERS.SULLEY, tokenType: EARS },
            { name: CHARACTERS.RANDALL, tokenType: EARS }
        ]
    },
    {
        name: "Surprise Guests",
        characters: [{ name: CHARACTERS.BOO, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CELIA, tokenType: TOKEN },
            { name: CHARACTERS.BOUN, tokenType: EARS },
            { name: CHARACTERS.EZRA, tokenType: TOKEN }
        ]
    },
    //roz
    {
        name: "Party Monster",
        characters: [{ name: CHARACTERS.ROZ, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MONSTERS, tokenType: COMMON },
            { name: GROUPS.BAMBI, tokenType: COMMON }
        ]
    },
    {
        name: "Attend a Show",
        characters: [{ name: CHARACTERS.ROZ, level: 7 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BO_PEEP, tokenType: TOKEN },
            { name: CHARACTERS.HAMM, tokenType: TOKEN },
            { name: CHARACTERS.BAMBI, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.MAD_HATTER, tokenType: EARS },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Sushi Dinner",
        characters: [{ name: CHARACTERS.ROZ, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: TOKEN },
            { name: CHARACTERS.PETE, tokenType: EARS },
            { name: CHARACTERS.RAPUNZEL, tokenType: EARS },
            { name: CHARACTERS.ALBERTO, tokenType: TOKEN }
        ]
    },
    {
        name: "Inspect Sulley",
        characters: [
            { name: CHARACTERS.ROZ, level: 4 },
            { name: CHARACTERS.SULLEY, level: 8 }
        ],
        time: "12h",
        tokens: [
            { name: CHARACTERS.HUEY, tokenType: EARS },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: EARS },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    //celia mae
    {
        name: "Head Count",
        characters: [{ name: CHARACTERS.CELIA, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MONSTERS, tokenType: COMMON },
            { name: GROUPS.PP, tokenType: COMMON },
            { name: CHARACTERS.HATBOX_GHOST, tokenType: TOKEN }
        ]
    },
    {
        name: "Meet for Sushi",
        characters: [{ name: CHARACTERS.CELIA, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RANDALL, tokenType: TOKEN },
            { name: CHARACTERS.MERRYWEATHER, tokenType: TOKEN },
            { name: CHARACTERS.MAURICE, tokenType: EARS }
        ]
    },
    {
        name: "Attend a Show",
        characters: [{ name: CHARACTERS.CELIA, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ROZ, tokenType: TOKEN },
            { name: CHARACTERS.ROZ, tokenType: EARS },
            { name: CHARACTERS.FLORA, tokenType: TOKEN },
            { name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: EARS },
            { name: CHARACTERS.MACHIAVELLI, tokenType: TOKEN }
        ]
    },
    {
        name: "Manage Desk",
        characters: [{ name: CHARACTERS.CELIA, level: 5 }],
        time: "12h",
        required: [{ name: BUILDINGS.MIKE_SULLEY_RESCUE, type: "building" }],
        tokens: [{ name: CHARACTERS.LORD_MACINTOSH, tokenType: EARS }]
    },
    {
        name: "Sing in Harmony",
        characters: [{ name: CHARACTERS.CELIA, level: 10 }],
        time: "8h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BAGHEERA, tokenType: TOKEN },
            { name: "Red Striped", tokenType: FABRIC }
        ]
    },
    //celia end
    //randall
    {
        name: "Complain about Food",
        characters: [{ name: CHARACTERS.RANDALL, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.MONSTERS, tokenType: COMMON },
            { name: GROUPS.HM, tokenType: COMMON }
        ]
    },
    {
        name: "Go Scaring",
        characters: [{ name: CHARACTERS.RANDALL, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.CYCLOPS_SUSHI, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLYNN, tokenType: TOKEN },
            { name: CHARACTERS.FLYNN, tokenType: EARS },
            { name: CHARACTERS.FLASH, tokenType: TOKEN },
            { name: CHARACTERS.PHINEAS, tokenType: TOKEN }
        ]
    },
    {
        name: "Scare Guests for Fun",
        characters: [{ name: CHARACTERS.RANDALL, level: 1 }],
        time: "8h",
        tokens: [{ name: CHARACTERS.LINGUINI, tokenType: TOKEN }]
    },
    {
        name: "Throw Tomatoes",
        characters: [{ name: CHARACTERS.RANDALL, level: 1 }],
        time: "12h",
        required: [
            { name: BUILDINGS.MONSTERS_LAUGH, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.PHILLIP, tokenType: EARS },
            { name: CHARACTERS.SHERE_KHAN, tokenType: TOKEN },
            { name: CHARACTERS.ALBERTO, tokenType: EARS }
        ]
    },
    //wall-e
    {
        name: "Clean-Up Crew",
        characters: [{ name: CHARACTERS.WALLE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.WALLE, tokenType: COMMON },
            { name: CHARACTERS.EVE, tokenType: TOKEN }
        ]
    },
    {
        name: "Define Dancing",
        characters: [
            { name: CHARACTERS.WALLE, level: 1 },
            { name: CHARACTERS.EVE, level: 7 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.BULLSEYE, tokenType: EARS }]
    },
    {
        name: "Reach Astro Orbiters",
        characters: [{ name: CHARACTERS.WALLE, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ASTRO_ORBITERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.EVE, tokenType: EARS },
            { name: CHARACTERS.FLORA, tokenType: TOKEN },
            { name: CHARACTERS.KING_LOUIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Add to Collection",
        characters: [{ name: CHARACTERS.WALLE, level: 1 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.FLYNN, tokenType: EARS },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: TOKEN }
        ]
    },
    //eve
    {
        name: "Scan for Lifeforms",
        characters: [{ name: CHARACTERS.EVE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.WALLE, tokenType: COMMON },
            { name: GROUPS.LATT, tokenType: COMMON }
        ]
    },
    {
        name: "Ride on Astro Orbiters",
        characters: [{ name: CHARACTERS.EVE, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ASTRO_ORBITERS, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MINNIE, tokenType: TOKEN },
            { name: CHARACTERS.FAUNA, tokenType: EARS },
            { name: CHARACTERS.JUDY, tokenType: TOKEN }
        ]
    },
    {
        name: "Scout for a Plant",
        characters: [{ name: CHARACTERS.EVE, level: 1 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.PETE, tokenType: EARS },
            { name: CHARACTERS.PHILLIP, tokenType: TOKEN }
        ]
    },
    {
        name: "Scout on Space Mountain",
        characters: [{ name: CHARACTERS.EVE, level: 10 }],
        time: "6h",
        required: [
            { name: BUILDINGS.SPACE_MOUNTAIN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MERIDA, tokenType: TOKEN },
            { name: "Purple", tokenType: FABRIC }
        ]
    },
    //rapunzel
    {
        name: "Kingdom Dance",
        characters: [{ name: CHARACTERS.RAPUNZEL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.SB, tokenType: COMMON }]
    },
    {
        name: "My Flower",
        characters: [
            { name: CHARACTERS.RAPUNZEL, level: 1 },
            { name: CHARACTERS.GOTHEL, level: 10 }
        ],
        time: "1h",
        tokens: [{ name: CHARACTERS.RAPUNZEL, tokenType: TOKEN }]
    },
    {
        name: "Hazelnut Soup Dinner",
        characters: [
            { name: CHARACTERS.RAPUNZEL },
            { name: CHARACTERS.GOTHEL, level: 2 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.RAPUNZEL_TOWER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BULLSEYE, tokenType: TOKEN }]
    },
    {
        name: "Create Artwork",
        characters: [{ name: CHARACTERS.RAPUNZEL, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.FANTASY_FAIRE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.AURORA, tokenType: TOKEN },
            { name: CHARACTERS.THUMPER, tokenType: TOKEN },
            { name: CHARACTERS.ROLLY, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: EARS }
        ]
    },
    {
        name: "Dinner Date",
        characters: [
            { name: CHARACTERS.RAPUNZEL },
            { name: CHARACTERS.FLYNN, level: 3 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.SNUGGLY_DUCKLING, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.CHIP, tokenType: EARS }]
    },
    {
        name: "Meet Adoring Fans",
        characters: [{ name: CHARACTERS.RAPUNZEL, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.FANTASY_FAIRE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: TOKEN },
            { name: CHARACTERS.BARBOSSA, tokenType: EARS },
            { name: CHARACTERS.DUMBO, tokenType: TOKEN },
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: TOKEN },
            { name: CHARACTERS.MACHIAVELLI, tokenType: TOKEN }
        ]
    },
    {
        name: "Perform the Song of Healing",
        characters: [{ name: CHARACTERS.RAPUNZEL, level: 1 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.FLORA, tokenType: TOKEN },
            { name: CHARACTERS.FAUNA, tokenType: EARS },
            { name: CHARACTERS.JOHN, tokenType: EARS },
            { name: CHARACTERS.MAID_MARIAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Internal Struggle",
        characters: [
            { name: CHARACTERS.RAPUNZEL, level: 4 },
            { name: CHARACTERS.FLYNN, level: 4 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.JUDY, tokenType: EARS },
            { name: CHARACTERS.BALOO, tokenType: TOKEN },
            { name: CHARACTERS.PACHA, tokenType: EARS },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: EARS }
        ]
    },
    {
        name: "Exhibit Paintings",
        characters: [{ name: CHARACTERS.RAPUNZEL, level: 8 }],
        time: "8h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MOWGLI, tokenType: EARS },
            { name: CHARACTERS.PASCAL, tokenType: EARS }
        ]
    },
    {
        name: "Sing for a Live Audience",
        characters: [{ name: CHARACTERS.RAPUNZEL, level: 5 }],
        time: "12h",
        required: [
            { name: BUILDINGS.SNUGGLY_DUCKLING, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.GOTHEL, tokenType: TOKEN }]
    },
    {
        name: "Trying a Bean Bag Chair",
        characters: [{ name: CHARACTERS.RAPUNZEL }],
        time: "4h",
        required: [
            {
                name: COSTUMES.COMFY,
                character: CHARACTERS.RAPUNZEL,
                type: REQ_TYPES.COSTUME
            },
            {
                name: BUILDINGS.PRINCESS_DRESSING_ROOM,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.PASCAL, tokenType: EARS }]
    },
    {
        name: "Painting in Gallery",
        characters: [{ name: CHARACTERS.RAPUNZEL, level: 2 }],
        time: "24h",
        required: [
            {
                name: BUILDINGS.RAPUNZEL_TOWER,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.REY, tokenType: EARS },
            { name: CHARACTERS.THE_CHILD, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit Strange Kingdom",
        characters: [
            { name: CHARACTERS.RAPUNZEL, level: 5 },
            { name: CHARACTERS.FLYNN, level: 7 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.TONY, tokenType: TOKEN }]
    },
    //rapunzel end
    //flynn
    {
        name: "Looking for Treasure",
        characters: [{ name: CHARACTERS.FLYNN, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.SCROOGE, tokenType: TOKEN },
            { name: GROUPS.TANGLED, tokenType: COMMON },
            { name: CHARACTERS.RAPUNZEL, tokenType: TOKEN }
        ]
    },
    {
        name: "Rooftop Mission",
        characters: [{ name: CHARACTERS.FLYNN, level: 1 }],
        time: "6h",
        required: [{ name: BUILDINGS.FANTASY_FAIRE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: EARS },
            { name: CHARACTERS.MACHIAVELLI, tokenType: EARS },
            { name: CHARACTERS.FIGARO, tokenType: TOKEN },
            { name: CHARACTERS.MING_LEE, tokenType: TOKEN }
        ]
    },
    {
        name: "My Nose Isn't Right!",
        characters: [{ name: CHARACTERS.FLYNN, level: 2 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.HUEY, tokenType: TOKEN },
            { name: CHARACTERS.FLORA, tokenType: EARS },
            { name: CHARACTERS.FAUNA, tokenType: TOKEN }
        ]
    },
    {
        name: "Lunch Stop",
        characters: [{ name: CHARACTERS.FLYNN, level: 3 }],
        time: "12h",
        required: [
            { name: BUILDINGS.SNUGGLY_DUCKLING, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BAGHEERA, tokenType: EARS }]
    },
    {
        name: "Search for Missing Jewels",
        characters: [{ name: CHARACTERS.FLYNN, level: 2 }],
        time: "12h",
        required: [
            { name: BUILDINGS.RAPUNZEL_TOWER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.PHILLIP, tokenType: EARS },
            { name: CHARACTERS.GOTHEL, tokenType: TOKEN }
        ]
    },
    {
        name: "Closer Look at the Crown",
        characters: [{ name: CHARACTERS.FLYNN, level: 5 }],
        time: "12h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.PASCAL, tokenType: TOKEN },
            { name: CHARACTERS.PASCAL, tokenType: EARS },
            { name: "White & Blue Pattern", tokenType: FABRIC }
        ]
    },
    //mother gothel //gothel
    {
        name: "The Vain Life",
        characters: [{ name: CHARACTERS.GOTHEL, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.TANGLED, tokenType: COMMON },
            { name: CHARACTERS.BARBOSSA, tokenType: TOKEN }
        ]
    },
    {
        name: "Recruit Help for Plans",
        characters: [{ name: CHARACTERS.GOTHEL, level: 7 }],
        time: "8h",
        required: [
            { name: BUILDINGS.SNUGGLY_DUCKLING, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.FLYNN, tokenType: EARS },
            { name: CHARACTERS.BAGHEERA, tokenType: TOKEN }
        ]
    },
    {
        name: "Keeping House",
        characters: [{ name: CHARACTERS.GOTHEL, level: 4 }],
        time: "12h",
        required: [
            { name: BUILDINGS.RAPUNZEL_TOWER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SHERE_KHAN, tokenType: EARS },
            { name: "Orange Pattern", tokenType: FABRIC }
        ]
    },
    {
        name: "Spy on Royalty",
        characters: [{ name: CHARACTERS.GOTHEL, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HUEY, tokenType: TOKEN },
            { name: CHARACTERS.LOUIE, tokenType: TOKEN },
            { name: CHARACTERS.SHAN_YU, tokenType: EARS }
        ]
    },
    //maximus
    {
        name: "Meet-and-Greet",
        characters: [{ name: CHARACTERS.MAXIMUS, level: 1 }],
        time: "1h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: GROUPS.TANGLED, tokenType: COMMON }]
    },
    {
        name: "Find a Way up the Tower",
        characters: [{ name: CHARACTERS.MAXIMUS, level: 1 }],
        time: "6h",
        required: [
            { name: BUILDINGS.RAPUNZEL_TOWER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.RAPUNZEL, tokenType: TOKEN },
            { name: CHARACTERS.RAPUNZEL, tokenType: EARS }
        ]
    },
    {
        name: "Look Out for Suspicious Behavior",
        characters: [{ name: CHARACTERS.MAXIMUS, level: 8 }],
        time: "4h",
        required: [
            { name: BUILDINGS.SNUGGLY_DUCKLING, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.GOTHEL, tokenType: TOKEN },
            { name: CHARACTERS.PASCAL, tokenType: TOKEN },
            { name: CHARACTERS.KHAN, tokenType: EARS }
        ]
    },
    {
        name: "Patrol the Kingdom",
        characters: [{ name: CHARACTERS.MAXIMUS, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.FLYNN, tokenType: TOKEN },
            { name: CHARACTERS.PASCAL, tokenType: EARS },
            { name: CHARACTERS.FLORA, tokenType: EARS }
        ]
    },
    //pascal
    {
        name: "Enjoying Grapes",
        characters: [{ name: CHARACTERS.PASCAL, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.TANGLED, tokenType: COMMON },
            { name: GROUPS.LATT, tokenType: COMMON }
        ]
    },
    {
        name: "Trying on Costumes",
        characters: [
            { name: CHARACTERS.PASCAL, level: 5 },
            { name: CHARACTERS.RAPUNZEL, level: 5 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.RAPUNZEL_TOWER, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.BRIDE, tokenType: TOKEN },
            { name: CHARACTERS.BRIDE, tokenType: EARS }
        ]
    },
    {
        name: "Steering Clear of Ruffians",
        characters: [{ name: CHARACTERS.PASCAL, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.SNUGGLY_DUCKLING, type: "building" }],
        tokens: [
            { name: CHARACTERS.GOTHEL, tokenType: EARS },
            { name: CHARACTERS.ERCOLE, tokenType: EARS }
        ]
    },
    ///aurora
    {
        name: "Go on a Flight of Fancy",
        characters: [{ name: CHARACTERS.AURORA, level: 1 }],
        time: "2h",
        tokens: [
            { name: GROUPS.SB, tokenType: COMMON },
            { name: GROUPS.ZOOTOPIA, tokenType: COMMON }
        ]
    },
    {
        name: "Check In",
        characters: [
            { name: CHARACTERS.AURORA, level: 1 },
            { name: CHARACTERS.FLORA, level: 7 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.FAIRY_HUT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: TOKEN },
            { name: CHARACTERS.NICK, tokenType: TOKEN },
            { name: CHARACTERS.MAID_MARIAN, tokenType: EARS }
        ]
    },
    {
        name: "Read Fairy Tales",
        characters: [{ name: CHARACTERS.AURORA, level: 1 }],
        time: "4h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.JUDY, tokenType: TOKEN },
            { name: CHARACTERS.FLOWER, tokenType: EARS }
        ]
    },
    {
        name: "Once Upon a Dream",
        characters: [
            { name: CHARACTERS.AURORA, level: 7 },
            { name: CHARACTERS.PHILLIP, level: 2 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.BOGO, tokenType: TOKEN },
            { name: CHARACTERS.SIR_HISS, tokenType: TOKEN }
        ]
    },
    {
        name: "Daydream for a Spell",
        characters: [{ name: CHARACTERS.AURORA, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.FAIRY_HUT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PHILLIP, tokenType: TOKEN },
            { name: CHARACTERS.BAGHEERA, tokenType: TOKEN }
        ]
    },
    {
        name: "Hold a Banquet",
        characters: [{ name: CHARACTERS.AURORA, level: 4 }],
        time: "12h",
        required: [{ name: BUILDINGS.FANTASY_FAIRE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: EARS },
            { name: CHARACTERS.GIULIA, tokenType: EARS }
        ]
    },
    {
        name: "Tour of the Lands",
        characters: [
            { name: CHARACTERS.AURORA, level: 10 },
            { name: CHARACTERS.PHILLIP, level: 10 }
        ],
        time: "12h",
        tokens: [
            { name: CHARACTERS.KUZCO, tokenType: TOKEN },
            { name: CHARACTERS.ABBY, tokenType: TOKEN }
        ]
    },
    //aurora end
    //prince phillip
    {
        name: "Wield the Sword",
        characters: [{ name: CHARACTERS.PHILLIP, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.SB, tokenType: COMMON }]
    },
    {
        name: "Check for Maleficent",
        characters: [{ name: CHARACTERS.PHILLIP, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.AURORA_SPINNING }],
        tokens: [{ name: CHARACTERS.DR_FINKELSTEIN, tokenType: EARS }]
    },
    {
        name: "Visit the Fairies",
        characters: [{ name: CHARACTERS.PHILLIP, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.FAIRY_HUT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GOTHEL, tokenType: EARS }]
    },
    //flora
    {
        name: "Spreading Pink Cheer",
        characters: [{ name: CHARACTERS.FLORA, level: 1 }],
        time: "8h",
        tokens: [{ name: CHARACTERS.TRUSTY, tokenType: EARS }]
    },
    {
        name: "Sewing at Home",
        characters: [{ name: CHARACTERS.FLORA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.FAIRY_HUT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.SB, tokenType: COMMON },
            { name: CHARACTERS.MERRYWEATHER, tokenType: TOKEN },
            { name: CHARACTERS.CHIP, tokenType: TOKEN },
            { name: CHARACTERS.AURORA, tokenType: EARS }
        ]
    },
    {
        name: "Magical Medley",
        characters: [
            { name: CHARACTERS.FLORA, level: 4 },
            { name: CHARACTERS.FAUNA, level: 1 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.PHILLIP, tokenType: TOKEN },
            { name: CHARACTERS.BALOO, tokenType: TOKEN }
        ]
    },
    {
        name: "Working Together",
        characters: [
            { name: CHARACTERS.FLORA, level: 1 },
            { name: CHARACTERS.FAUNA, level: 1 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.FAIRY_HUT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JUDY, tokenType: EARS },
            { name: CHARACTERS.MING_LEE, tokenType: EARS },
            { name: CHARACTERS.ABBY, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: EARS }
        ]
    },
    //fauna
    {
        name: "Bake a Cake",
        characters: [{ name: CHARACTERS.FAUNA, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.FAIRY_HUT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.SB, tokenType: COMMON },
            { name: CHARACTERS.MERRYWEATHER, tokenType: TOKEN },
            { name: CHARACTERS.AURORA, tokenType: TOKEN }
        ]
    },
    {
        name: "Spreading Green Cheer",
        characters: [{ name: CHARACTERS.FAUNA, level: 2 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.ZURG, tokenType: TOKEN },
            { name: CHARACTERS.TRUSTY, tokenType: TOKEN }
        ]
    },
    //merryweather
    {
        name: "Spreading Blue Cheer",
        characters: [{ name: CHARACTERS.MERRYWEATHER, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.SB, tokenType: COMMON },
            { name: CHARACTERS.AURORA, tokenType: TOKEN }
        ]
    },
    {
        name: "Research Evil Magic",
        characters: [{ name: CHARACTERS.MERRYWEATHER, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.AURORA_SPINNING, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BULLSEYE, tokenType: TOKEN },
            { name: CHARACTERS.GIULIA, tokenType: EARS }
        ]
    },
    {
        name: "Clean the Hut",
        characters: [{ name: CHARACTERS.MERRYWEATHER, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.FAIRY_HUT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FAUNA, tokenType: TOKEN },
            { name: CHARACTERS.FAUNA, tokenType: EARS }
        ]
    },
    {
        name: "Grant Blessing of Joy",
        characters: [{ name: CHARACTERS.MERRYWEATHER, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.PRINCESS_FAIRYTALE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.PHILLIP, tokenType: TOKEN }]
    },
    //judy
    {
        name: "Make a Report",
        characters: [{ name: CHARACTERS.JUDY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ZOOTOPIA, tokenType: COMMON }]
    },
    {
        name: "Track Down a Perp",
        characters: [{ name: CHARACTERS.JUDY, level: 3 }],
        time: "2h",
        required: [
            { name: BUILDINGS.ZOOTOPIA_RACE_TRACK, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.NICK, tokenType: TOKEN }]
    },
    {
        name: "File Papers",
        characters: [{ name: CHARACTERS.JUDY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.ZOOTOPIA_PD, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLASH, tokenType: EARS },
            { name: CHARACTERS.NICK, tokenType: TOKEN },
            { name: CHARACTERS.THUMPER, tokenType: EARS }
        ]
    },
    {
        name: "Watch the Jam Cams",
        characters: [
            { name: CHARACTERS.JUDY, level: 3 },
            { name: CHARACTERS.NICK, level: 4 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.ZOOTOPIA_PD, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MOWGLI, tokenType: TOKEN },
            { name: CHARACTERS.YZMA, tokenType: TOKEN }
        ]
    },
    {
        name: "Investigate Donut Shop",
        characters: [{ name: CHARACTERS.JUDY, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.LITTLE_RODENTIA, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HOOK, tokenType: TOKEN },
            { name: CHARACTERS.RINGMASTER, tokenType: TOKEN },
            { name: CHARACTERS.LUCA, tokenType: TOKEN },
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: EARS }
        ]
    },
    {
        name: "Grab a Small Snack",
        characters: [
            { name: CHARACTERS.JUDY, level: 6 },
            { name: CHARACTERS.NICK, level: 5 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.LITTLE_RODENTIA, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BOGO, tokenType: EARS },
            { name: CHARACTERS.MERIDA, tokenType: TOKEN }
        ]
    },
    {
        name: "Search for Clues",
        characters: [
            { name: CHARACTERS.JUDY, level: null },
            { name: CHARACTERS.NICK, level: 4 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.LINGUINI, tokenType: EARS }]
    },
    //judy end
    //nick
    {
        name: "Scope the Scene",
        characters: [{ name: CHARACTERS.NICK, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.ZOOTOPIA, tokenType: COMMON },
            { name: GROUPS.JB, tokenType: COMMON }
        ]
    },
    {
        name: "Sell Pawpsicles",
        characters: [{ name: CHARACTERS.NICK, level: 3 }],
        time: "2h",
        required: [
            { name: BUILDINGS.LITTLE_RODENTIA, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.KING_LOUIE, tokenType: EARS }]
    },
    {
        name: "Try On the Uniform",
        characters: [{ name: CHARACTERS.NICK, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.ZOOTOPIA_PD, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLASH, tokenType: TOKEN },
            { name: CHARACTERS.HOOK, tokenType: EARS },
            { name: CHARACTERS.THUMPER, tokenType: TOKEN }
        ]
    },
    //chief bogo //bogo
    {
        name: "Morning Meeting",
        characters: [{ name: CHARACTERS.BOGO, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.ZOOTOPIA_PD, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.ZOOTOPIA, tokenType: COMMON }]
    },
    {
        name: "Get Donuts for the Team",
        characters: [{ name: CHARACTERS.BOGO, level: 3 }],
        time: "2h",
        required: [
            { name: BUILDINGS.LITTLE_RODENTIA, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BALOO, tokenType: EARS }]
    },
    {
        name: "Track Down Suspect",
        characters: [{ name: CHARACTERS.BOGO, level: 1 }],
        time: "6h",
        required: [
            { name: BUILDINGS.ZOOTOPIA_RACE_TRACK, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.FLASH, tokenType: TOKEN }]
    },
    {
        name: "Gazelle Dance",
        characters: [{ name: CHARACTERS.BOGO, level: 10 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.YZMA, tokenType: EARS },
            { name: CHARACTERS.LINGUINI, tokenType: EARS }
        ]
    },
    //flash
    {
        name: "Coffee Break",
        characters: [{ name: CHARACTERS.FLASH, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.ZOOTOPIA, tokenType: COMMON },
            { name: CHARACTERS.JUDY, tokenType: TOKEN },
            { name: GROUPS.JB, tokenType: COMMON }
        ]
    },
    {
        name: "Visit a Small Shop",
        characters: [{ name: CHARACTERS.FLASH, level: 2 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.JUDY, tokenType: EARS },
            { name: CHARACTERS.NICK, tokenType: EARS },
            { name: CHARACTERS.BOGO, tokenType: TOKEN }
        ]
    },
    {
        name: "Get to the Car",
        characters: [{ name: CHARACTERS.FLASH, level: 6 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.BOGO, tokenType: EARS },
            { name: CHARACTERS.MOWGLI, tokenType: TOKEN }
        ]
    },
    //bambi
    {
        name: "Bird!",
        characters: [{ name: CHARACTERS.BAMBI, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.BAMBI, tokenType: COMMON },
            { name: GROUPS.LATT, tokenType: COMMON }
        ]
    },
    {
        name: "Trying to Skate",
        characters: [{ name: CHARACTERS.BAMBI, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.FOREST_ICE_RINK, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.FLOWER, tokenType: EARS },
            { name: CHARACTERS.THUMPER, tokenType: TOKEN }
        ]
    },
    {
        name: "Exploring the Meadow",
        characters: [
            { name: CHARACTERS.BAMBI, level: 4 },
            { name: CHARACTERS.FLOWER }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.MEADOW, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.TIA_DALMA, tokenType: EARS }]
    },
    {
        name: "Foraging Together",
        characters: [
            { name: CHARACTERS.BAMBI, level: 5 },
            { name: CHARACTERS.THUMPER, level: 5 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.MEADOW, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.COLETTE, tokenType: EARS }]
    },
    {
        name: "Watching Gophers",
        characters: [
            { name: CHARACTERS.BAMBI, level: 6 },
            { name: CHARACTERS.THUMPER, level: 6 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.MEADOW, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLOWER, tokenType: TOKEN },
            { name: CHARACTERS.POCAHONTAS, tokenType: EARS }
        ]
    },
    {
        name: "Instructions on Skating",
        characters: [
            { name: CHARACTERS.BAMBI, level: 7 },
            { name: CHARACTERS.THUMPER, level: 7 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.FOREST_ICE_RINK, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.LINGUINI, tokenType: EARS }]
    },
    //bambi end
    //thumper
    {
        name: "Thumpin",
        characters: [{ name: CHARACTERS.THUMPER, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BAMBI, tokenType: COMMON }]
    },
    {
        name: "Playing on the Ice",
        characters: [{ name: CHARACTERS.THUMPER, level: 4 }],
        time: "2h",
        required: [
            { name: BUILDINGS.FOREST_ICE_RINK, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BAMBI, tokenType: EARS }]
    },
    {
        name: "Snacking on Clovers",
        characters: [{ name: CHARACTERS.THUMPER, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MEADOW, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLOWER, tokenType: EARS },
            { name: CHARACTERS.BAMBI, tokenType: TOKEN }
        ]
    },
    //flower
    {
        name: "Hibernation Preparation",
        characters: [{ name: CHARACTERS.FLOWER, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BAMBI, tokenType: COMMON }]
    },
    {
        name: "Looking for Food",
        characters: [{ name: CHARACTERS.FLOWER, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.MEADOW, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.THUMPER, tokenType: EARS },
            { name: CHARACTERS.BAMBI, tokenType: EARS }
        ]
    },
    //bagheera
    {
        name: "A Calm Stroll",
        characters: [{ name: CHARACTERS.BAGHEERA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.JB, tokenType: COMMON }]
    },
    {
        name: "Afternoon Nap",
        characters: [{ name: CHARACTERS.BAGHEERA, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.KING_LOUIE, tokenType: EARS }]
    },
    {
        name: "Avoid the Water",
        characters: [{ name: CHARACTERS.BAGHEERA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.JUNGLE_RIVER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BALOO, tokenType: TOKEN },
            { name: CHARACTERS.TRAMP, tokenType: EARS }
        ]
    },
    {
        name: "A Branch to Nap On",
        characters: [{ name: CHARACTERS.BAGHEERA, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.BALOO_OASIS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.WENDY, tokenType: EARS },
            { name: CHARACTERS.TONY, tokenType: EARS },
            { name: CHARACTERS.HERCULES, tokenType: TOKEN }
        ]
    },
    {
        name: "A Casual Conversation",
        characters: [
            { name: CHARACTERS.BAGHEERA, level: 6 },
            { name: CHARACTERS.BALOO, level: 5 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.BALOO_OASIS, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SHERE_KHAN, tokenType: TOKEN }]
    },
    {
        name: "Keep an Eye Out",
        characters: [
            { name: CHARACTERS.BAGHEERA, level: 8 },
            { name: CHARACTERS.MOWGLI, level: 7 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.IAN, tokenType: EARS }]
    },
    {
        name: "Avoid Hypnosis",
        characters: [{ name: CHARACTERS.BAGHEERA, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.REMY, tokenType: EARS },
            { name: CHARACTERS.LINGUINI, tokenType: TOKEN },
            { name: CHARACTERS.ORVILLE, tokenType: EARS }
        ]
    },
    //bagheera end
    //mowgli
    {
        name: "Call of the Wild",
        characters: [{ name: CHARACTERS.MOWGLI, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.JB, tokenType: COMMON },
            { name: GROUPS.ENG, tokenType: COMMON }
        ]
    },
    {
        name: "Exploring the Land",
        characters: [{ name: CHARACTERS.MOWGLI, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.BALOO, tokenType: EARS }]
    },
    {
        name: "Picking Prickly Pears",
        characters: [{ name: CHARACTERS.MOWGLI, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.BALOO_OASIS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PETER, tokenType: EARS },
            { name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { name: CHARACTERS.MEEKO, tokenType: EARS },
            { name: CHARACTERS.PENNY_TR, tokenType: EARS }
        ]
    },
    {
        name: "Keeping Out of Trouble",
        characters: [
            { name: CHARACTERS.MOWGLI, level: 6 },
            { name: CHARACTERS.BALOO, level: 5 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PETER, tokenType: TOKEN },
            { name: CHARACTERS.KHAN, tokenType: TOKEN },
            { name: CHARACTERS.ORVILLE, tokenType: EARS }
        ]
    },
    {
        name: "Lost in a Look",
        characters: [{ name: CHARACTERS.MOWGLI, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.WENDY, tokenType: TOKEN },
            { name: CHARACTERS.TIA_DALMA, tokenType: EARS },
            { name: CHARACTERS.TONY, tokenType: TOKEN }
        ]
    },
    {
        name: "Walk Like You",
        characters: [
            { name: CHARACTERS.MOWGLI, level: 3 },
            { name: CHARACTERS.KING_LOUIE, level: 6 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.JUNGLE_RIVER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SHERE_KHAN, tokenType: EARS }]
    },
    {
        name: "Relaxing on the River",
        characters: [{ name: CHARACTERS.MOWGLI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.JUNGLE_RIVER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.KING_LOUIE, tokenType: TOKEN }]
    },
    {
        name: "Forget About Worries",
        characters: [
            { name: CHARACTERS.MOWGLI, level: 6 },
            { name: CHARACTERS.BALOO, level: 6 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.BALOO_OASIS, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.JOE, tokenType: EARS }]
    },
    {
        name: "Dangerous Sleeping Spot",
        characters: [
            { name: CHARACTERS.MOWGLI, level: 5 },
            { name: CHARACTERS.BAGHEERA, level: 7 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MERIDA, tokenType: TOKEN }]
    },
    //mowgli end
    //baloo
    {
        name: "Bear Necessities",
        characters: [{ name: CHARACTERS.BALOO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.JB, tokenType: COMMON }]
    },
    {
        name: "Avoid Snakes",
        characters: [{ name: CHARACTERS.BALOO, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.WENDY, tokenType: EARS },
            { name: CHARACTERS.PETER, tokenType: EARS },
            { name: CHARACTERS.TRAMP, tokenType: EARS }
        ]
    },
    {
        name: "Cool It",
        characters: [
            { name: CHARACTERS.BALOO, level: 3 },
            { name: CHARACTERS.MOWGLI }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.TIMOTHY, tokenType: TOKEN }]
    },
    {
        name: "Relax in My Backyard",
        characters: [{ name: CHARACTERS.BALOO, level: 3 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.KING_LOUIE, tokenType: TOKEN },
            { name: CHARACTERS.LITTLE_JOHN, tokenType: TOKEN }
        ]
    },
    {
        name: "Get with the Beat",
        characters: [
            { name: CHARACTERS.BALOO, level: 2 },
            { name: CHARACTERS.BAGHEERA, level: 4 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.KRONK, tokenType: TOKEN },
            { name: CHARACTERS.FIGARO, tokenType: TOKEN }
        ]
    },
    //baloo end
    //shere khan
    {
        name: "Stalking Around",
        characters: [{ name: CHARACTERS.SHERE_KHAN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.JB, tokenType: COMMON }]
    },
    {
        name: "Interrogating the Snake",
        characters: [{ name: CHARACTERS.SHERE_KHAN, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PETER, tokenType: TOKEN },
            { name: CHARACTERS.LADY, tokenType: TOKEN },
            { name: CHARACTERS.LITTLE_JOHN, tokenType: TOKEN }
        ]
    },
    {
        name: "Listening In",
        characters: [{ name: CHARACTERS.SHERE_KHAN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.JUNGLE_RIVER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.KING_LOUIE, tokenType: EARS }]
    },
    {
        name: "Trying to Attack",
        characters: [
            { name: CHARACTERS.SHERE_KHAN, level: 7 },
            { name: CHARACTERS.BALOO, level: 10 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.BALOO_OASIS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MEEKO, tokenType: TOKEN },
            { name: CHARACTERS.MERIDA, tokenType: TOKEN }
        ]
    },
    {
        name: "Searching for the Man-cub",
        characters: [
            { name: CHARACTERS.SHERE_KHAN, level: 8 },
            { name: CHARACTERS.MOWGLI, level: 9 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.KRONK, tokenType: EARS }]
    },
    //shere khan end
    //king louie
    {
        name: "The Jungle VIP",
        characters: [{ name: CHARACTERS.KING_LOUIE, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.JUNGLE_RIVER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BALOO, tokenType: EARS }]
    },
    {
        name: "I Wanna Be Like You",
        characters: [{ name: CHARACTERS.KING_LOUIE, level: 1 }],
        time: "2h",
        tokens: [
            { name: GROUPS.JB, tokenType: COMMON },
            { name: CHARACTERS.BAGHEERA, tokenType: TOKEN },
            { name: CHARACTERS.BALOO, tokenType: TOKEN }
        ]
    },
    {
        name: "Hopping Around",
        characters: [{ name: CHARACTERS.KING_LOUIE, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.MOWGLI, tokenType: TOKEN },
            { name: CHARACTERS.MOWGLI, tokenType: EARS },
            { name: CHARACTERS.BAGHEERA, tokenType: EARS }
        ]
    },
    {
        name: "Looking for that Bear",
        characters: [{ name: CHARACTERS.KING_LOUIE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.BALOO_OASIS, type: "building" }],
        tokens: [
            { name: CHARACTERS.COLETTE, tokenType: TOKEN },
            { name: CHARACTERS.LITTLE_JOHN, tokenType: EARS }
        ]
    },
    {
        name: "Monkeying Around",
        characters: [{ name: CHARACTERS.KING_LOUIE, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.KAA_JUNGLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SHERE_KHAN, tokenType: EARS },
            { name: CHARACTERS.KING_FERGUS, tokenType: EARS },
            { name: CHARACTERS.ORVILLE, tokenType: TOKEN }
        ]
    },
    //dumbo
    {
        name: "A Flying Elephant",
        characters: [{ name: CHARACTERS.DUMBO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUMBO, tokenType: COMMON }]
    },
    {
        name: "Eat Peanuts",
        characters: [{ name: CHARACTERS.DUMBO, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: "building" }],
        tokens: [
            { name: GROUPS.DUMBO, tokenType: COMMON },
            { name: GROUPS.POCAHONTAS, tokenType: COMMON },
            { name: GROUPS.RATATOUILLE, tokenType: COMMON }
        ]
    },
    {
        name: "Practice for the Show",
        characters: [{ name: CHARACTERS.DUMBO, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: "building" }],
        tokens: [{ name: CHARACTERS.BERNARD, tokenType: TOKEN }]
    },
    {
        name: "Spend Time with Mom",
        characters: [{ name: CHARACTERS.DUMBO, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RINGMASTER, tokenType: TOKEN },
            { name: CHARACTERS.PACHA, tokenType: TOKEN },
            { name: CHARACTERS.COLETTE, tokenType: EARS }
        ]
    },
    //timothy
    {
        name: "Snacking on Peanuts",
        characters: [{ name: CHARACTERS.TIMOTHY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DUMBO, tokenType: COMMON }]
    },
    {
        name: "Keep an Ear out for News",
        characters: [{ name: CHARACTERS.TIMOTHY, level: 1 }],
        time: "8h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RINGMASTER, tokenType: EARS },
            { name: CHARACTERS.DUMBO, tokenType: TOKEN },
            { name: CHARACTERS.PACHA, tokenType: EARS }
        ]
    },
    {
        name: "Whisper Ideas",
        characters: [
            { name: CHARACTERS.TIMOTHY },
            { name: CHARACTERS.RINGMASTER }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.DUMBO, tokenType: TOKEN }]
    },
    {
        name: "Listen in on Gossip",
        characters: [{ name: CHARACTERS.TIMOTHY, level: 4 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.DUMBO, tokenType: EARS },
            { name: CHARACTERS.ORVILLE, tokenType: TOKEN }
        ]
    },
    {
        name: "Talk Over Peanuts",
        characters: [
            { name: CHARACTERS.TIMOTHY, level: 8 },
            { name: CHARACTERS.DUMBO, level: 7 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: "building" }],
        tokens: [{ name: CHARACTERS.POCAHONTAS, tokenType: TOKEN }]
    },
    {
        name: "Keep Each Other Company",
        characters: [
            { name: CHARACTERS.TIMOTHY, level: 7 },
            { name: CHARACTERS.DUMBO, level: 8 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: "building" }],
        tokens: [{ name: CHARACTERS.MEEKO, tokenType: TOKEN }]
    },
    //timothy end
    //the ringmaster //ringmaster
    {
        name: "Thinking of Ideas",
        characters: [{ name: CHARACTERS.RINGMASTER, level: 1 }],
        time: "2h",
        tokens: [
            { name: GROUPS.DUMBO, tokenType: COMMON },
            { name: CHARACTERS.TIMOTHY, tokenType: EARS }
        ]
    },
    {
        name: "Talk with Acrobats",
        characters: [{ name: CHARACTERS.RINGMASTER, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DUMBO, tokenType: EARS },
            { name: CHARACTERS.COLETTE, tokenType: EARS }
        ]
    },
    {
        name: "Organize Circus Acts",
        characters: [{ name: CHARACTERS.RINGMASTER, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SHERE_KHAN, tokenType: TOKEN }]
    },
    {
        name: "Check on the Animals",
        characters: [{ name: CHARACTERS.RINGMASTER, level: 7 }],
        time: "6h",
        required: [{ name: BUILDINGS.DUMBO_FLYING, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BERNARD, tokenType: EARS }]
    },
    //ringmaster end
    //pocahontas
    {
        name: "Knowledge is Strength",
        characters: [{ name: CHARACTERS.POCAHONTAS, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.POCAHONTAS, tokenType: COMMON }]
    },
    {
        name: "Accepting Advice",
        characters: [{ name: CHARACTERS.POCAHONTAS, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.GRANDMOTHER_WILLOW, type: "building" }],
        tokens: [{ name: CHARACTERS.PERCY, tokenType: EARS }]
    },
    {
        name: "Introspection",
        characters: [{ name: CHARACTERS.POCAHONTAS, level: 3 }],
        required: [
            {
                name: BUILDINGS.PRINCESS_DRESSING_ROOM,
                type: "building",
                level: 1
            },
            {
                name: COSTUMES.COMFY,
                character: CHARACTERS.POCAHONTAS,
                type: "costume"
            }
        ],
        time: "2h"
    },
    {
        name: "Respectful Conversation",
        characters: [
            { name: CHARACTERS.POCAHONTAS, level: 3 },
            { name: CHARACTERS.MEEKO, level: 3 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.HADES, tokenType: TOKEN }]
    },
    {
        name: "Refining Friendships",
        characters: [
            { name: CHARACTERS.POCAHONTAS, level: 4 },
            { name: CHARACTERS.PERCY, level: 1 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.GRANDMOTHER_WILLOW, type: "building" }],
        tokens: [
            { name: CHARACTERS.MEEKO, tokenType: TOKEN },
            { name: CHARACTERS.MEEKO, tokenType: EARS }
        ]
    },
    {
        name: "Gain Wisdom",
        characters: [{ name: CHARACTERS.POCAHONTAS, level: 5 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.MEEKO, tokenType: TOKEN },
            { name: CHARACTERS.PACHA, tokenType: EARS },
            { name: CHARACTERS.BERNARD, tokenType: EARS }
        ]
    },
    {
        name: "A Different Perspective",
        characters: [{ name: CHARACTERS.POCAHONTAS, level: 6 }],
        time: "4h",
        required: [{ name: BUILDINGS.GRANDMOTHER_WILLOW, type: "building" }],
        tokens: [{ name: CHARACTERS.REMY, tokenType: TOKEN }]
    },
    {
        name: "Family",
        characters: [
            { name: CHARACTERS.POCAHONTAS, level: 10 },
            { name: CHARACTERS.MEEKO, level: 10 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.PENNY_TR, tokenType: TOKEN }]
    },
    //pocahontas end
    //meeko
    {
        name: "Foraging",
        characters: [{ name: CHARACTERS.MEEKO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.POCAHONTAS, tokenType: COMMON }]
    },
    {
        name: "Visit Grandmother Willow",
        characters: [{ name: CHARACTERS.MEEKO, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.COLETTE, tokenType: EARS }]
    },
    {
        name: "Nap in Safety",
        characters: [{ name: CHARACTERS.MEEKO, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.GRANDMOTHER_WILLOW }],
        tokens: [{ name: CHARACTERS.SIR_HISS, tokenType: EARS }]
    },
    {
        name: "Mediate Differences",
        characters: [
            { name: CHARACTERS.MEEKO, level: 6 },
            { name: CHARACTERS.PERCY, level: 6 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.GRANDMOTHER_WILLOW, level: 1 }],
        tokens: [{ name: CHARACTERS.BERNARD, tokenType: EARS }]
    },
    //meeko end
    //percy
    {
        name: "Patience Training",
        characters: [{ name: CHARACTERS.PERCY, level: 3 }],
        time: "1h",
        required: [{ name: BUILDINGS.GRANDMOTHER_WILLOW, type: "building" }],
        tokens: [{ name: GROUPS.POCAHONTAS, tokenType: COMMON }]
    },
    {
        name: "Top Dog",
        characters: [{ name: CHARACTERS.PERCY, level: 1 }],
        time: "1h",
        tokens: [{ name: CHARACTERS.SIR_HISS, tokenType: TOKEN }]
    },
    //percy end
    //kuzco
    {
        name: "No Problem",
        characters: [{ name: CHARACTERS.KUZCO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ENG, tokenType: COMMON }]
    },
    {
        name: "Ask about Dessert",
        characters: [{ name: CHARACTERS.KUZCO, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.MUDKA_MEAT_HUT, type: "building" }],
        tokens: [
            { name: CHARACTERS.KUZCO, tokenType: EARS },
            { name: CHARACTERS.YZMA, tokenType: TOKEN },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: TOKEN }
        ]
    },
    {
        name: "Deep-Fried Doorstop",
        characters: [{ name: CHARACTERS.KUZCO, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.MUDKA_MEAT_HUT, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.YZMA, tokenType: EARS },
            { name: CHARACTERS.ROBIN_HOOD, tokenType: TOKEN },
            { name: CHARACTERS.BERNARD, tokenType: TOKEN }
        ]
    },
    {
        name: "Near Misses",
        characters: [
            { name: CHARACTERS.KUZCO, level: 2 },
            { name: CHARACTERS.YZMA, level: 2 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.MUDKA_MEAT_HUT, type: "building" }],
        tokens: [{ name: CHARACTERS.KRONK, tokenType: TOKEN }]
    },
    {
        name: "A Word with the Chef",
        characters: [
            { name: CHARACTERS.KUZCO, level: 3 },
            { name: CHARACTERS.KRONK, level: 3 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.MUDKA_MEAT_HUT, type: "building" }],
        tokens: [{ name: CHARACTERS.KRONK, tokenType: EARS }]
    },
    {
        name: "Check for Flea Potions",
        characters: [{ name: CHARACTERS.KUZCO, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.YZMA_LAIR, type: "building" }],
        tokens: [
            { name: CHARACTERS.KUZCO, tokenType: TOKEN },
            { name: CHARACTERS.REMY, tokenType: EARS }
        ]
    },
    //kuzco end
    //pacha
    {
        name: "Tend the Herd",
        characters: [{ name: CHARACTERS.PACHA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ENG, tokenType: COMMON }]
    },
    {
        name: "Order the Special",
        characters: [{ name: CHARACTERS.PACHA, level: 2 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.KUZCO, tokenType: TOKEN },
            { name: CHARACTERS.KUZCO, tokenType: EARS }
        ]
    },
    {
        name: "Happy Happy Birthday",
        characters: [{ name: CHARACTERS.PACHA, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.MUDKA_MEAT_HUT, type: "building" }],
        tokens: [
            { name: CHARACTERS.KRONK, tokenType: TOKEN },
            { name: CHARACTERS.KRONK, tokenType: EARS }
        ]
    },
    {
        name: "Don't Get Thrown Out",
        characters: [
            { name: CHARACTERS.PACHA, level: 3 },
            { name: CHARACTERS.KUZCO, level: 3 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.MUDKA_MEAT_HUT, type: "building" }],
        tokens: [
            { name: CHARACTERS.PACHA, tokenType: TOKEN },
            { name: CHARACTERS.PACHA, tokenType: EARS },
            { name: CHARACTERS.YZMA, tokenType: EARS }
        ]
    },
    {
        name: "Just Take Them All",
        characters: [{ name: CHARACTERS.PACHA, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.YZMA_LAIR, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.YZMA, tokenType: EARS },
            { name: CHARACTERS.BERNARD, tokenType: TOKEN }
        ]
    },
    {
        name: "Start a Fire",
        characters: [
            { name: CHARACTERS.PACHA, level: 4 },
            { name: CHARACTERS.KUZCO, level: 4 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.YZMA, tokenType: TOKEN }]
    },
    {
        name: "The Potion",
        characters: [
            { name: CHARACTERS.PACHA, level: null },
            { name: CHARACTERS.YZMA, level: 4 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.YZMA_LAIR, type: "building" }],
        tokens: [{ name: CHARACTERS.REMY, tokenType: EARS }]
    },
    //pacha end
    //kronk
    {
        name: "Think It Over",
        characters: [{ name: CHARACTERS.KRONK, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.ENG, tokenType: COMMON },
            { name: CHARACTERS.PACHA, tokenType: TOKEN },
            { name: CHARACTERS.PACHA, tokenType: EARS },
            { name: CHARACTERS.KRONK, tokenType: TOKEN },
            { name: CHARACTERS.KRONK, tokenType: EARS }
        ]
    },
    {
        name: "Order Up",
        characters: [{ name: CHARACTERS.KRONK, level: 2 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.KUZCO, tokenType: TOKEN },
            { name: CHARACTERS.YZMA, tokenType: EARS }
        ]
    },
    {
        name: "Short Order Chef",
        characters: [{ name: CHARACTERS.KRONK, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.MUDKA_MEAT_HUT, type: "building" }],
        tokens: [{ name: GROUPS.ENG, tokenType: COMMON }]
    },
    {
        name: "Where's the Other Guy?",
        characters: [{ name: CHARACTERS.KRONK, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.YZMA_LAIR, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.KUZCO, tokenType: EARS },
            { name: CHARACTERS.YZMA, tokenType: TOKEN }
        ]
    },
    {
        name: "Don't I Know You?",
        characters: [
            { name: CHARACTERS.KRONK, level: 5 },
            { name: CHARACTERS.PACHA, level: 5 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.MUDKA_MEAT_HUT, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.YZMA, tokenType: TOKEN },
            { name: CHARACTERS.YZMA, tokenType: EARS }
        ]
    },
    {
        name: "The Road That Rocks",
        characters: [{ name: CHARACTERS.KRONK, level: 7 }],
        time: "8h",
        required: [{ name: BUILDINGS.YZMA_LAIR }],
        tokens: [{ name: CHARACTERS.BERNARD, tokenType: EARS }]
    },
    //kronk end
    //yzma
    {
        name: "Mild Aggravation",
        characters: [{ name: CHARACTERS.YZMA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ENG, tokenType: COMMON }]
    },
    {
        name: "Potato Salad",
        characters: [{ name: CHARACTERS.YZMA, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.MUDKA_MEAT_HUT, type: "building" }],
        tokens: [
            { name: CHARACTERS.PACHA, tokenType: TOKEN },
            { name: CHARACTERS.KRONK, tokenType: TOKEN },
            { name: CHARACTERS.KUZCO, tokenType: TOKEN }
        ]
    },
    {
        name: "Find a Hammer",
        characters: [{ name: CHARACTERS.YZMA, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.YZMA_LAIR, type: "building", level: 2 }],
        tokens: [
            { name: CHARACTERS.YZMA, tokenType: TOKEN },
            { name: CHARACTERS.YZMA, tokenType: EARS }
        ]
    },
    {
        name: "Find a Box",
        characters: [{ name: CHARACTERS.YZMA, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.YZMA_LAIR, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.LINGUINI, tokenType: EARS },
            { name: CHARACTERS.LINGUINI, tokenType: TOKEN }
        ]
    },
    //yzma end
    //remy
    {
        name: "Delicious Smells",
        characters: [{ name: CHARACTERS.REMY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.RATATOUILLE, tokenType: COMMON },
            { name: GROUPS.RESCUERS, tokenType: COMMON }
        ]
    },
    {
        name: "Figment of Imagination",
        characters: [{ name: CHARACTERS.REMY, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.LINGUINI, tokenType: TOKEN },
            { name: CHARACTERS.PENNY_TR, tokenType: TOKEN },
            { name: CHARACTERS.MISS_BIANCA, tokenType: TOKEN }
        ]
    },
    {
        name: "Unique Flavors",
        characters: [{ name: CHARACTERS.REMY, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.COLETTE, tokenType: TOKEN },
            { name: CHARACTERS.ORVILLE, tokenType: TOKEN }
        ]
    },
    //remy end
    //linguini
    {
        name: "No Scampering, Little Chef",
        characters: [{ name: CHARACTERS.LINGUINI, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.RATATOUILLE, tokenType: COMMON }]
    },
    {
        name: "Getting Corn Dogs",
        characters: [{ name: CHARACTERS.LINGUINI, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.ORVILLE, tokenType: TOKEN }]
    },
    {
        name: "Clean the Kitchen",
        characters: [{ name: CHARACTERS.LINGUINI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.GUSTEAU_KITCHEN, type: "building" }],
        tokens: [
            { name: CHARACTERS.COLETTE, tokenType: TOKEN },
            { name: CHARACTERS.MISS_BIANCA, tokenType: EARS }
        ]
    },
    {
        name: "Talking to a Rat",
        characters: [
            { name: CHARACTERS.LINGUINI, level: 5 },
            { name: CHARACTERS.REMY, level: 5 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BERNARD, tokenType: TOKEN },
            { name: CHARACTERS.BERNARD, tokenType: EARS }
        ]
    },
    {
        name: "Familiarizing with Vegetables",
        characters: [{ name: CHARACTERS.LINGUINI, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.GUSTEAU_KITCHEN, level: 1 }],
        tokens: [{ name: CHARACTERS.PENNY_TR, tokenType: EARS }]
    },
    //linguini end
    //colette
    {
        name: "Kitchen Tricks",
        characters: [{ name: CHARACTERS.COLETTE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.RATATOUILLE, tokenType: COMMON }]
    },
    {
        name: "Messy Apron",
        characters: [{ name: CHARACTERS.COLETTE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.GUSTEAU_KITCHEN, type: "building" }],
        tokens: [
            { name: CHARACTERS.REMY, tokenType: TOKEN },
            { name: CHARACTERS.REMY, tokenType: EARS },
            { name: CHARACTERS.ORVILLE, tokenType: EARS }
        ]
    },
    {
        name: "Only Woman",
        characters: [{ name: CHARACTERS.COLETTE, level: 5 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.LINGUINI, tokenType: TOKEN },
            { name: CHARACTERS.LINGUINI, tokenType: EARS },
            { name: CHARACTERS.BERNARD, tokenType: EARS }
        ]
    },
    {
        name: "Symphony of Crackle",
        characters: [{ name: CHARACTERS.COLETTE, level: 8 }],
        time: "6h",
        required: [
            { name: BUILDINGS.REMY_ADVENTURE, level: 2, type: "building" }
        ],
        tokens: [{ name: CHARACTERS.MISS_BIANCA, tokenType: TOKEN }]
    },
    //colette end
    //bernard
    {
        name: "Find Directions",
        trophies: true,
        characters: [{ name: CHARACTERS.BERNARD, level: 1 }],
        time: "1h",
        happiness: true,
        tokens: [{ name: GROUPS.RESCUERS, tokenType: COMMON }]
    },
    {
        name: "Attend Summit Meeting",
        characters: [{ name: CHARACTERS.BERNARD, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RESCUE_AID_SOCIETY }],
        tokens: [{ name: CHARACTERS.ORVILLE, tokenType: EARS }]
    },
    {
        name: "Try to Ignore Superstitions",
        characters: [{ name: CHARACTERS.BERNARD, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.MADAME_MEDUSA_RIVERBOAT }],
        tokens: [{ name: CHARACTERS.PENNY_TR, tokenType: TOKEN }]
    },
    {
        name: "Represent the USA",
        characters: [{ name: "Bernard", level: 5 }],
        time: "8h",
        required: [
            { name: "The Rescue Aid Society", level: 2, type: "building" }
        ],
        tokens: [{ name: CHARACTERS.MISS_BIANCA, tokenType: TOKEN }]
    },
    //bernard end
    //orville
    {
        name: "If at First You Don't Succeed...",
        trophies: true,
        characters: [{ name: CHARACTERS.ORVILLE, level: 1 }],
        time: "1h",
        happiness: true,
        tokens: [{ name: GROUPS.RESCUERS, tokenType: COMMON }]
    },
    {
        name: "Relay a Message",
        characters: [{ name: CHARACTERS.ORVILLE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RESCUE_AID_SOCIETY }],
        tokens: [{ name: CHARACTERS.BERNARD, tokenType: TOKEN }]
    },
    {
        name: "Scout from Above",
        characters: [{ name: CHARACTERS.ORVILLE, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.MADAME_MEDUSA_RIVERBOAT }],
        tokens: [
            { name: CHARACTERS.PENNY_TR, tokenType: EARS },
            { name: CHARACTERS.MISS_BIANCA, tokenType: EARS }
        ]
    },
    //orville end
    //miss bianca //bianca
    {
        name: "Pamper with Powdery",
        characters: [{ name: CHARACTERS.MISS_BIANCA, level: 1 }],
        time: "1h",
        tokens: [{ name: "The Rescuers", tokenType: "collection" }]
    },
    //miss bianca end //bianca end
    //penny-tr
    {
        name: "Playtime with Teddy",
        characters: [{ name: "Penny-TR", level: 1 }],
        time: "1h",
        tokens: [{ name: "The Rescuers", tokenType: "collection" }]
    },
    {
        name: "Try to be Brave",
        characters: [{ name: "Penny-TR", level: 5 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.MISS_BIANCA, tokenType: EARS }]
    },
    //penny-tr end
    //lady
    {
        name: "Solo Constitutional",
        characters: [{ name: CHARACTERS.LADY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LATT, tokenType: COMMON }]
    },
    {
        name: "Reminisce",
        characters: [{ name: CHARACTERS.LADY, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.TONY_RESTAURANT, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.TRUSTY, tokenType: EARS },
            { name: CHARACTERS.JOE, tokenType: EARS }
        ]
    },
    {
        name: "Family Matters",
        characters: [
            { name: CHARACTERS.LADY, level: 3 },
            { name: CHARACTERS.TRAMP, level: 3 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { name: CHARACTERS.TRAMP, tokenType: EARS }
        ]
    },
    {
        name: "Dunk Some Donuts",
        characters: [{ name: CHARACTERS.LADY, level: 3 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.LADY_AND_TRAMP_HOME,
                type: "building",
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.TONY, tokenType: EARS },
            { name: CHARACTERS.LADY, tokenType: EARS }
        ]
    },
    {
        name: "Check on Beaver",
        characters: [{ name: CHARACTERS.LADY, level: 4 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.BEAVER_DAM,
                type: "building",
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.JOE, tokenType: TOKEN },
            { name: CHARACTERS.REMY, tokenType: TOKEN },
            { name: CHARACTERS.LITTLE_JOHN, tokenType: EARS }
        ]
    },
    {
        name: "Garnish Some Attention",
        characters: [
            { name: CHARACTERS.LADY, level: 5 },
            { name: CHARACTERS.JOE, level: 5 }
        ],
        time: "8h",
        required: [
            {
                name: BUILDINGS.TONY_RESTAURANT,
                type: "building",
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.JOCK, tokenType: TOKEN },
            { name: CHARACTERS.JOCK, tokenType: EARS }
        ]
    },
    //tramp
    {
        name: "Find Dining",
        characters: [{ name: CHARACTERS.TRAMP, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LATT, tokenType: COMMON }]
    },
    {
        name: "Private Entrance",
        characters: [{ name: CHARACTERS.TRAMP, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.TONY_RESTAURANT, type: "building" }],
        tokens: [
            { name: CHARACTERS.TRUSTY, tokenType: TOKEN },
            { name: CHARACTERS.TONY, tokenType: TOKEN },
            { name: CHARACTERS.JOE, tokenType: TOKEN }
        ]
    },
    {
        name: "Log Puller Maintenance",
        characters: [{ name: CHARACTERS.TRAMP, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.BEAVER_DAM, type: "building", level: 2 }],
        tokens: [
            { name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { name: CHARACTERS.LADY, tokenType: EARS }
        ]
    },
    {
        name: "Sniff Out a Rat",
        characters: [{ name: CHARACTERS.TRAMP, level: 4 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.JOCK, tokenType: TOKEN },
            { name: CHARACTERS.LADY, tokenType: TOKEN }
        ]
    },
    //jock
    {
        name: "Neighborhood Watch",
        characters: [{ name: CHARACTERS.JOCK, level: 1 }],
        time: "6h",
        tokens: [
            { name: GROUPS.LATT, tokenType: COMMON },
            { name: CHARACTERS.JOE, tokenType: EARS },
            { name: CHARACTERS.JOCK, tokenType: TOKEN },
            { name: CHARACTERS.JOCK, tokenType: EARS },
            { name: CHARACTERS.LADY, tokenType: TOKEN }
        ]
    },
    {
        name: "Heart of the Village",
        characters: [{ name: CHARACTERS.JOCK, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.TONY_RESTAURANT, type: "building" }],
        tokens: [
            { name: CHARACTERS.TRUSTY, tokenType: TOKEN },
            { name: CHARACTERS.JOE, tokenType: TOKEN },
            { name: CHARACTERS.ROBIN_HOOD, tokenType: EARS }
        ]
    },
    {
        name: "Strange Relations",
        characters: [{ name: CHARACTERS.JOCK, level: 3 }],
        time: "1h",
        required: [{ name: BUILDINGS.BEAVER_DAM, type: "building" }],
        tokens: [{ name: GROUPS.LATT, tokenType: COMMON }]
    },
    {
        name: "Aye, M' Dear",
        characters: [{ name: CHARACTERS.JOCK, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.LADY_AND_TRAMP_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.TRUSTY, tokenType: EARS },
            { name: CHARACTERS.LADY, tokenType: EARS }
        ]
    },
    {
        name: "Check for the Others",
        characters: [
            { name: CHARACTERS.JOCK, level: 7 },
            { name: CHARACTERS.TRUSTY, level: 7 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.TONY_RESTAURANT, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.LADY, tokenType: TOKEN },
            { name: CHARACTERS.LADY, tokenType: EARS }
        ]
    },
    //trusty
    {
        name: "Working Sniffer",
        characters: [{ name: CHARACTERS.TRUSTY, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.LATT, tokenType: COMMON },
            { name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { name: CHARACTERS.TRAMP, tokenType: EARS },
            { name: CHARACTERS.TONY, tokenType: TOKEN }
        ]
    },
    {
        name: "Sensational Smells",
        characters: [{ name: CHARACTERS.TRUSTY, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.TONY_RESTAURANT, type: "building" }],
        tokens: [{ name: GROUPS.LATT, tokenType: COMMON }]
    },
    {
        name: "Treated by a Friend",
        characters: [
            { name: CHARACTERS.TRUSTY, level: 2 },
            { name: CHARACTERS.TRAMP, level: 2 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.TONY, tokenType: EARS }]
    },
    {
        name: "Perimeter Check",
        characters: [{ name: CHARACTERS.TRUSTY, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.LADY_AND_TRAMP_HOME, type: "building" }],
        tokens: [{ name: CHARACTERS.JOCK, tokenType: EARS }]
    },
    {
        name: "You Don't Say",
        characters: [{ name: CHARACTERS.TRUSTY, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.BEAVER_DAM, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.TRUSTY, tokenType: TOKEN },
            { name: CHARACTERS.TRUSTY, tokenType: EARS }
        ]
    },
    //tony
    {
        name: "Italian Inspiration",
        characters: [{ name: CHARACTERS.TONY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LATT, tokenType: COMMON }]
    },
    {
        name: "Entertain Customers",
        characters: [{ name: CHARACTERS.TONY, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.TONY_RESTAURANT }],
        tokens: [
            { name: CHARACTERS.TRUSTY, tokenType: EARS },
            { name: CHARACTERS.JOE, tokenType: EARS },
            { name: CHARACTERS.JOCK, tokenType: TOKEN }
        ]
    },
    {
        name: "Cook Up a Feast",
        characters: [{ name: CHARACTERS.TONY, level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.TONY_RESTAURANT, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { name: CHARACTERS.TONY, tokenType: TOKEN },
            { name: CHARACTERS.LADY, tokenType: TOKEN }
        ]
    },
    {
        name: "Where's Butch?",
        characters: [{ name: CHARACTERS.TONY, level: 5 }],
        time: "12h",
        required: [{ name: BUILDINGS.LADY_AND_TRAMP_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.LADY, tokenType: TOKEN },
            { name: CHARACTERS.LINGUINI, tokenType: TOKEN }
        ]
    },
    {
        name: "Walk a Lady Home",
        characters: [
            { name: CHARACTERS.TONY, level: 7 },
            { name: CHARACTERS.LADY, level: 7 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.LADY_AND_TRAMP_HOME, type: "building" }],
        tokens: [{ name: CHARACTERS.HERCULES, tokenType: EARS }]
    },
    //joe
    {
        name: "Take a Break",
        characters: [{ name: CHARACTERS.JOE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LATT, tokenType: COMMON }]
    },
    {
        name: "Full Serenade",
        characters: [
            { name: CHARACTERS.JOE, level: 2 },
            { name: CHARACTERS.TONY, level: 2 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.TRUSTY, tokenType: EARS }]
    },
    {
        name: "A Day's Work",
        characters: [{ name: CHARACTERS.JOE, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.TONY_RESTAURANT, type: "building" }],
        tokens: [
            { name: CHARACTERS.JOCK, tokenType: EARS },
            { name: CHARACTERS.LADY, tokenType: EARS }
        ]
    },
    {
        name: "Deliver Bones",
        characters: [{ name: CHARACTERS.JOE, level: 3 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.LADY_AND_TRAMP_HOME,
                type: "building",
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.JOE, tokenType: TOKEN },
            { name: CHARACTERS.JOE, tokenType: EARS }
        ]
    },
    {
        name: "Food Prep",
        characters: [{ name: CHARACTERS.JOE, level: 3 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.TONY_RESTAURANT,
                type: "building",
                level: 1
            }
        ],
        tokens: [{ name: CHARACTERS.LADY, tokenType: EARS }]
    },
    {
        name: "Play for Visitors",
        characters: [{ name: CHARACTERS.JOE, level: 4 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.TRAMP, tokenType: EARS },
            { name: CHARACTERS.TONY, tokenType: TOKEN }
        ]
    },
    {
        name: "Bella Notte Night",
        characters: [
            { name: CHARACTERS.JOE, level: 8 },
            { name: CHARACTERS.TONY, level: 8 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.POCAHONTAS, tokenType: EARS }]
    },
    {
        name: "Home Delivery",
        characters: [
            { name: CHARACTERS.JOE, level: 7 },
            { name: CHARACTERS.TONY, level: 7 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.LADY_AND_TRAMP_HOME, type: "building" }],
        tokens: [{ name: CHARACTERS.LINGUINI, tokenType: EARS }]
    },
    //joe end
    //mr. incredible
    {
        name: "Strike a Pose",
        characters: [{ name: CHARACTERS.MR_I, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.INCREDS, tokenType: COMMON }]
    },
    {
        name: "Find the Computer",
        characters: [{ name: CHARACTERS.MR_I }],
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.ELASTIGIRL, tokenType: EARS },
            { name: CHARACTERS.VIOLET, tokenType: TOKEN }
        ]
    },
    {
        name: "Battle Syndrome",
        characters: [
            { name: CHARACTERS.MR_I, level: 4 },
            { name: CHARACTERS.SYNDROME, level: 3 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.OMNIDROID_CITY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MR_I, tokenType: TOKEN },
            { name: CHARACTERS.MR_I, tokenType: EARS },
            { name: CHARACTERS.SYNDROME, tokenType: EARS },
            { name: GROUPS.UP, tokenType: COMMON }
        ]
    },
    {
        name: "A Quick Nap",
        characters: [{ name: CHARACTERS.MR_I, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FROZONE, tokenType: TOKEN },
            { name: CHARACTERS.DASH, tokenType: EARS },
            { name: CHARACTERS.JACKJACK, tokenType: EARS },
            { name: CHARACTERS.RUSSELL, tokenType: TOKEN }
        ]
    },
    {
        name: "Dinner Date",
        characters: [
            { name: CHARACTERS.MR_I, level: 5 },
            { name: CHARACTERS.ELASTIGIRL, level: 7 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.COGSWORTH, tokenType: TOKEN }]
    },
    //elastigirl:
    {
        name: "Looking Up",
        characters: [{ name: CHARACTERS.ELASTIGIRL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.INCREDS, tokenType: COMMON }]
    },
    {
        name: "Investigate for Clues",
        characters: [{ name: CHARACTERS.ELASTIGIRL, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DASH, tokenType: EARS },
            { name: CHARACTERS.VIOLET, tokenType: EARS }
        ]
    },
    {
        name: "Time for Hugs",
        characters: [
            { name: CHARACTERS.ELASTIGIRL, level: 3 },
            { name: CHARACTERS.JACKJACK, level: 1 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.JACKJACK, tokenType: EARS },
            { name: GROUPS.UP, tokenType: COMMON }
        ]
    },
    {
        name: "Training More",
        characters: [{ name: CHARACTERS.ELASTIGIRL, level: 4 }],
        time: "4h",
        required: [
            { name: BUILDINGS.OMNIDROID_OBSTACLE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { name: CHARACTERS.FROZONE, tokenType: TOKEN },
            { name: CHARACTERS.SYNDROME, tokenType: TOKEN },
            { name: CHARACTERS.KEVIN, tokenType: EARS }
        ]
    },
    {
        name: "Keeping Up Appearances",
        characters: [{ name: CHARACTERS.ELASTIGIRL, level: 5 }],
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.ELASTIGIRL, tokenType: TOKEN },
            { name: CHARACTERS.ELASTIGIRL, tokenType: EARS },
            { name: CHARACTERS.JASMINE, tokenType: TOKEN },
            { name: CHARACTERS.CRIKEE, tokenType: TOKEN }
        ]
    },
    //violet
    {
        name: "Bubble Barrier",
        characters: [{ name: CHARACTERS.VIOLET, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.INCREDS, tokenType: COMMON }]
    },
    {
        name: "Exploring the Lair",
        characters: [{ name: CHARACTERS.VIOLET }],
        time: "2h",
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ELASTIGIRL, tokenType: EARS },
            { name: CHARACTERS.MR_I, tokenType: TOKEN },
            { name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { name: CHARACTERS.SYNDROME, tokenType: EARS }
        ]
    },
    {
        name: "Attempt to Be Sneaky",
        characters: [
            { name: CHARACTERS.VIOLET, level: 4 },
            { name: CHARACTERS.DASH, level: 4 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BEAST, tokenType: EARS }]
    },
    {
        name: "Listening to Music",
        characters: [{ name: CHARACTERS.VIOLET }],
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.DASH, tokenType: TOKEN },
            { name: CHARACTERS.FROZONE, tokenType: EARS },
            { name: CHARACTERS.JACKJACK, tokenType: TOKEN }
        ]
    },
    {
        name: "Try and Get Along",
        characters: [
            { name: CHARACTERS.VIOLET, level: 5 },
            { name: CHARACTERS.DASH, level: 6 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ABU, tokenType: TOKEN },
            { name: GROUPS.UP, tokenType: COMMON }
        ]
    },
    {
        name: "Battle Practice",
        characters: [{ name: CHARACTERS.VIOLET }],
        time: "6h",
        required: [
            { name: BUILDINGS.OMNIDROID_OBSTACLE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.VIOLET, tokenType: EARS }]
    },
    {
        name: "Sibling Team Work",
        characters: [
            { name: CHARACTERS.VIOLET, level: 3 },
            { name: CHARACTERS.DASH, level: 4 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: TOKEN },
            { name: CHARACTERS.LUMIERE, tokenType: EARS }
        ]
    },
    //dash:
    {
        name: "Run Around",
        characters: [{ name: CHARACTERS.DASH, level: 1 }],
        time: "2h",
        tokens: [
            { name: GROUPS.INCREDS, tokenType: COMMON },
            { name: CHARACTERS.DASH, tokenType: TOKEN },
            { name: CHARACTERS.ELASTIGIRL, tokenType: TOKEN }
        ]
    },
    {
        name: "Spy on Lair",
        characters: [{ name: CHARACTERS.DASH, level: 1 }],
        time: "1h",
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MR_I, tokenType: TOKEN }]
    },
    {
        name: "Racing Course",
        characters: [{ name: CHARACTERS.DASH, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.OMNIDROID_OBSTACLE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { name: CHARACTERS.ELASTIGIRL, tokenType: EARS }
        ]
    },
    {
        name: "Room Cleaning",
        characters: [{ name: CHARACTERS.DASH }],
        time: "6h",
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DASH, tokenType: EARS },
            { name: CHARACTERS.SYNDROME, tokenType: TOKEN },
            { name: CHARACTERS.JACKJACK, tokenType: TOKEN },
            { name: CHARACTERS.JACKJACK, tokenType: EARS }
        ]
    },
    //frozone
    {
        name: "Stay Hydrated",
        characters: [{ name: CHARACTERS.FROZONE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.INCREDS, tokenType: COMMON },
            { name: CHARACTERS.DASH, tokenType: EARS }
        ]
    },
    {
        name: "Avoid the Fire",
        characters: [{ name: CHARACTERS.FROZONE, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ELASTIGIRL, tokenType: TOKEN },
            { name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { name: CHARACTERS.MR_I, tokenType: EARS },
            { name: CHARACTERS.SYNDROME, tokenType: EARS }
        ]
    },
    {
        name: "Go with the Flow",
        characters: [{ name: CHARACTERS.FROZONE }],
        time: "4h",
        required: [
            { name: BUILDINGS.OMNIDROID_OBSTACLE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.FROZONE, tokenType: TOKEN },
            { name: CHARACTERS.FROZONE, tokenType: EARS },
            { name: CHARACTERS.VIOLET, tokenType: EARS }
        ]
    },
    {
        name: "Visiting Friends",
        characters: [{ name: CHARACTERS.FROZONE }],
        time: "6h",
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JACKJACK, tokenType: TOKEN },
            { name: CHARACTERS.JACKJACK, tokenType: EARS },
            { name: CHARACTERS.CARL_FREDRICKSEN, tokenType: TOKEN }
        ]
    },
    {
        name: "Day Job",
        characters: [{ name: CHARACTERS.FROZONE, level: 1 }],
        time: "8h",
        required: [
            { name: BUILDINGS.OMNIDROID_CITY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BEAST, tokenType: TOKEN }]
    },
    //syndrome
    {
        name: "Super Scout",
        characters: [{ name: CHARACTERS.SYNDROME, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.INCREDS, tokenType: COMMON }]
    },
    {
        name: "Checking the Lair",
        characters: [{ name: CHARACTERS.SYNDROME, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ELASTIGIRL, tokenType: EARS },
            { name: CHARACTERS.DASH, tokenType: TOKEN },
            { name: CHARACTERS.VIOLET, tokenType: EARS },
            { name: CHARACTERS.KEVIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Finding Leverage",
        characters: [{ name: CHARACTERS.SYNDROME, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SYNDROME, tokenType: TOKEN },
            { name: CHARACTERS.FROZONE, tokenType: EARS }
        ]
    },
    {
        name: "Appear a Hero",
        characters: [{ name: CHARACTERS.SYNDROME, level: 1 }],
        time: "6h",
        required: [
            { name: BUILDINGS.OMNIDROID_OBSTACLE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.JACKJACK, tokenType: TOKEN },
            { name: CHARACTERS.JACKJACK, tokenType: EARS }
        ]
    },
    //jack-jack
    {
        name: "Testing Powers",
        characters: [{ name: CHARACTERS.JACKJACK, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.INCREDS, tokenType: COMMON }]
    },
    {
        name: "Crawling Along",
        characters: [{ name: CHARACTERS.JACKJACK, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.SYNDROME_ENERGY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.JACKJACK, tokenType: TOKEN },
            { name: CHARACTERS.CARL_FREDRICKSEN, tokenType: EARS }
        ]
    },
    {
        name: "Taking a Nap",
        characters: [{ name: CHARACTERS.JACKJACK, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.INCREDS_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RINGMASTER, tokenType: EARS },
            { name: CHARACTERS.CRIKEE, tokenType: EARS }
        ]
    },
    //zero
    {
        name: "Sniffing for Pumpkins",
        characters: [{ name: CHARACTERS.ZERO, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.NBC, tokenType: COMMON },
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: TOKEN },
            { name: CHARACTERS.ZERO, tokenType: TOKEN }
        ]
    },
    {
        name: "Checking Out the Lab",
        characters: [{ name: CHARACTERS.ZERO, level: 6 }],
        time: "2h",
        required: [
            { name: BUILDINGS.FINKELSTEIN_TOWER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SALLY, tokenType: TOKEN },
            { name: CHARACTERS.OOGIE, tokenType: EARS }
        ]
    },
    {
        name: "Sniffing About",
        characters: [{ name: CHARACTERS.ZERO, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: EARS },
            { name: CHARACTERS.OOGIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Beg for a Treat",
        characters: [{ name: CHARACTERS.ZERO, level: 5 }],
        time: "4h",
        required: [
            { name: BUILDINGS.NIGHTMARE_CANDY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ZERO, tokenType: EARS },
            { name: CHARACTERS.SALLY, tokenType: EARS },
            { name: CHARACTERS.MAYOR, tokenType: EARS },
            { name: CHARACTERS.BARREL, tokenType: TOKEN },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: EARS }
        ]
    },
    {
        name: "A Ghostly Rest",
        characters: [{ name: CHARACTERS.ZERO, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.JACK_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.ALICE, tokenType: TOKEN }]
    },
    {
        name: "Hounding",
        characters: [
            { name: CHARACTERS.ZERO, level: 7 },
            { name: CHARACTERS.OOGIE, level: 6 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.TIMON, tokenType: EARS }]
    },
    //sally
    {
        name: "Premonition",
        characters: [{ name: CHARACTERS.SALLY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.NBC, tokenType: COMMON },
            { name: CHARACTERS.ZERO, tokenType: TOKEN }
        ]
    },
    {
        name: "Crafting Sweets",
        characters: [{ name: CHARACTERS.SALLY, level: 5 }],
        time: "2h",
        required: [
            { name: BUILDINGS.NIGHTMARE_CANDY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ZERO, tokenType: EARS },
            { name: CHARACTERS.DALE, tokenType: TOKEN },
            { name: CHARACTERS.OOGIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Make Soup",
        characters: [{ name: CHARACTERS.SALLY, level: 6 }],
        time: "4h",
        required: [
            { name: BUILDINGS.FINKELSTEIN_TOWER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.OOGIE, tokenType: EARS },
            { name: CHARACTERS.MAYOR, tokenType: EARS }
        ]
    },
    {
        name: "A Moonlight Walk",
        characters: [{ name: CHARACTERS.SALLY, level: 8 }],
        time: "6h",
        required: [
            { name: BUILDINGS.BROOMSTICK_GRAVEYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: TOKEN },
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: EARS },
            { name: CHARACTERS.LOCK, tokenType: EARS }
        ]
    },
    {
        name: "Checking On A Friend",
        characters: [{ name: CHARACTERS.SALLY, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.JACK_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MARCH_HARE, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.SHOCK, tokenType: TOKEN },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Costume Making",
        characters: [
            { name: CHARACTERS.SALLY, level: 3 },
            { name: CHARACTERS.JACK_SKELLINGTON, level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.JACK_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BELLE, tokenType: EARS },
            { name: CHARACTERS.ALICE, tokenType: EARS }
        ]
    },
    {
        name: "Keep an Eye on Jack",
        characters: [
            { name: CHARACTERS.SALLY, level: 4 },
            { name: CHARACTERS.JACK_SKELLINGTON, level: 6 }
        ],
        time: "8h",
        tokens: [
            { name: CHARACTERS.BOGO, tokenType: EARS },
            { name: CHARACTERS.TIMON, tokenType: TOKEN }
        ]
    },
    //jack skellington
    {
        name: "What's This?",
        characters: [{ name: CHARACTERS.JACK_SKELLINGTON, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.NBC, tokenType: COMMON },
            { name: CHARACTERS.SALLY, tokenType: TOKEN }
        ]
    },
    {
        name: "Try Spooky Treat",
        characters: [{ name: CHARACTERS.JACK_SKELLINGTON, level: 5 }],
        time: "2h",
        required: [
            { name: BUILDINGS.NIGHTMARE_CANDY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ZERO, tokenType: TOKEN },
            { name: CHARACTERS.SALLY, tokenType: EARS },
            { name: CHARACTERS.OOGIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Thinking Time",
        characters: [{ name: CHARACTERS.JACK_SKELLINGTON, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.JACK_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ZERO, tokenType: EARS },
            { name: CHARACTERS.OOGIE, tokenType: EARS },
            { name: CHARACTERS.HOOK, tokenType: EARS, remove: true },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Halloween Experiments",
        characters: [{ name: CHARACTERS.JACK_SKELLINGTON, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.FINKELSTEIN_TOWER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HOOK, tokenType: EARS },
            { name: CHARACTERS.LI_SHANG, tokenType: TOKEN },
            { name: CHARACTERS.MARCH_HARE, tokenType: EARS },
            { name: CHARACTERS.WHITE_RABBIT, tokenType: EARS },
            { name: CHARACTERS.LOCK, tokenType: TOKEN }
        ]
    },
    {
        name: "Serenade the Moon",
        characters: [{ name: CHARACTERS.JACK_SKELLINGTON, level: 7 }],
        time: "8h",
        required: [
            { name: BUILDINGS.BROOMSTICK_GRAVEYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MAYOR, tokenType: TOKEN },
            { name: CHARACTERS.BARREL, tokenType: EARS }
        ]
    },
    //oogie boogie
    {
        name: "Bug Out",
        characters: [{ name: CHARACTERS.OOGIE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.NBC, tokenType: COMMON }]
    },
    {
        name: "Buggy Treats",
        characters: [{ name: CHARACTERS.OOGIE, level: 4 }],
        time: "2h",
        required: [
            { name: BUILDINGS.NIGHTMARE_CANDY, type: REQ_TYPES.BUILDING }
        ],
        tokens: []
    },
    {
        name: "Explore the Grave",
        characters: [{ name: CHARACTERS.OOGIE, level: 8 }],
        time: "6h",
        required: [
            { name: BUILDINGS.BROOMSTICK_GRAVEYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.LUMIERE, tokenType: TOKEN },
            { name: CHARACTERS.LOCK, tokenType: TOKEN }
        ]
    },
    {
        name: "Check the Competition",
        characters: [{ name: CHARACTERS.OOGIE, level: 2 }],
        required: [{ name: BUILDINGS.JACK_HOUSE, type: REQ_TYPES.BUILDING }],
        time: "8h",
        tokens: [{ name: CHARACTERS.MAYOR, tokenType: TOKEN }]
    },
    {
        name: "Good Fun",
        characters: [{ name: CHARACTERS.OOGIE, level: 3 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.OOGIE_BOOGIE_SPIN,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [{ name: CHARACTERS.BARREL, tokenType: TOKEN }]
    },
    {
        name: "Plans for Scares",
        characters: [{ name: CHARACTERS.OOGIE, level: 7 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.FINKELSTEIN_TOWER,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.SHOCK, tokenType: TOKEN }]
    },
    //oogie end //oogie boogie end
    //mayor //the mayor
    {
        name: "Reading Citizen Concerns",
        characters: [{ name: CHARACTERS.MAYOR, level: 1 }],
        time: "1h",
        tokens: [{ name: CHARACTERS.SALLY, tokenType: TOKEN }]
    },
    {
        name: "Check on Jack",
        characters: [{ name: CHARACTERS.MAYOR, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.JACK_HOUSE, type: "building" }],
        tokens: [{ name: CHARACTERS.JACK_SKELLINGTON, tokenType: TOKEN }]
    },
    {
        name: "Explore New Holiday Ideas",
        characters: [{ name: CHARACTERS.MAYOR, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.FINKELSTEIN_TOWER, type: "building" }],
        tokens: [
            { name: CHARACTERS.ZERO, tokenType: TOKEN },
            { name: CHARACTERS.OOGIE, tokenType: TOKEN },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: EARS }
        ]
    },
    {
        name: "Enjoy a Graveyard Walk",
        characters: [{ name: CHARACTERS.MAYOR, level: 6 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.RINGMASTER, tokenType: TOKEN },
            { name: CHARACTERS.MAYOR, tokenType: TOKEN },
            { name: CHARACTERS.LOCK, tokenType: EARS }
        ]
    },
    {
        name: "Oversee Preparations",
        characters: [{ name: CHARACTERS.MAYOR, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.NIGHTMARE_CANDY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MAYOR, tokenType: EARS },
            { name: CHARACTERS.CRIKEE, tokenType: TOKEN },
            { name: CHARACTERS.SHOCK, tokenType: EARS }
        ]
    },
    {
        name: "Work on Holiday Ideas",
        characters: [
            { name: CHARACTERS.MAYOR, level: 8 },
            { name: CHARACTERS.SALLY, level: null }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.NIGHTMARE_CANDY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BARREL, tokenType: EARS }]
    },
    //mayor end
    //lock
    {
        name: "Exploring",
        characters: [{ name: CHARACTERS.LOCK, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.NBC, tokenType: COMMON }]
    },
    {
        name: "Asked For",
        characters: [{ name: CHARACTERS.LOCK, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.JACK_HOUSE }],
        tokens: []
    },
    {
        name: "Sneak About",
        characters: [{ name: CHARACTERS.LOCK, level: 3 }],
        required: [{ name: BUILDINGS.FINKELSTEIN_TOWER, type: "building" }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.SHOCK, tokenType: EARS },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Knock Three Times",
        characters: [{ name: CHARACTERS.LOCK, level: 6 }],
        time: "6h",
        required: [
            { name: BUILDINGS.FINKELSTEIN_TOWER, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.EZRA, tokenType: EARS }]
    },
    //lock end
    //shock
    {
        name: "Gift Giving",
        characters: [{ name: CHARACTERS.SHOCK, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.NBC, tokenType: COMMON }]
    },
    {
        name: "A Sackful",
        characters: [{ name: CHARACTERS.SHOCK, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.NIGHTMARE_CANDY }],
        tokens: []
    },
    {
        name: "Pile of Dust!",
        characters: [{ name: CHARACTERS.SHOCK, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.JACK_HOUSE }],
        tokens: [{ name: CHARACTERS.DR_FINKELSTEIN, tokenType: EARS }]
    },
    {
        name: "Frightful Fun",
        characters: [{ name: CHARACTERS.SHOCK, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.BROOMSTICK_GRAVEYARD }],
        tokens: [{ name: CHARACTERS.PHINEAS, tokenType: TOKEN }]
    },
    //shock end
    //barrel
    {
        name: "Watch for Trouble",
        characters: [{ name: CHARACTERS.BARREL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.NBC, tokenType: COMMON }]
    },
    {
        name: "Got It",
        characters: [{ name: CHARACTERS.BARREL, level: 2 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.LOCK, tokenType: TOKEN },
            { name: CHARACTERS.SHOCK, tokenType: TOKEN },
            { name: CHARACTERS.DR_FINKELSTEIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Sweet Tooth",
        characters: [{ name: CHARACTERS.BARREL, level: 6 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.SHOCK, tokenType: EARS }]
    },
    //barrel end
    //anna
    {
        name: "Enjoying the Day",
        characters: [{ name: CHARACTERS.ANNA, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.FROZEN, tokenType: COMMON },
            { name: CHARACTERS.OLAF, tokenType: TOKEN }
        ]
    },
    {
        name: "Exploring",
        characters: [
            { name: CHARACTERS.ANNA, level: 4 },
            { name: CHARACTERS.KRISTOFF, level: 4 }
        ],
        time: "1h",
        tokens: [
            { name: CHARACTERS.ELSA, tokenType: TOKEN },
            { name: CHARACTERS.PUMBAA, tokenType: TOKEN }
        ]
    },
    {
        name: "Wandering the Halls",
        characters: [{ name: CHARACTERS.ANNA, level: 2 }],
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.KRISTOFF, tokenType: TOKEN },
            { name: CHARACTERS.CALHOUN, tokenType: EARS }
        ]
    },
    {
        name: "Spending Time Together",
        characters: [
            { name: CHARACTERS.ANNA, level: 7 },
            { name: CHARACTERS.ELSA, level: 3 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.HANS, tokenType: EARS }]
    },
    {
        name: "Talk with Oaken",
        characters: [{ name: CHARACTERS.ANNA, level: 6 }],
        time: "4h",
        required: [
            { name: BUILDINGS.WANDERING_OAKEN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SVEN, tokenType: TOKEN },
            { name: CHARACTERS.ELSA, tokenType: EARS },
            { name: CHARACTERS.HANS, tokenType: TOKEN }
        ]
    },
    {
        name: "Investigate Trolls",
        characters: [{ name: CHARACTERS.ANNA, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.TROLL_KNOLL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.KRISTOFF, tokenType: EARS },
            { name: CHARACTERS.COGSWORTH, tokenType: EARS },
            { name: CHARACTERS.ABU, tokenType: EARS }
        ]
    },
    {
        name: "Visit Marshmallow",
        characters: [{ name: CHARACTERS.ANNA, level: 9 }],
        time: "8h",
        required: [{ name: BUILDINGS.ELSA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MICHAEL, tokenType: TOKEN }]
    },
    {
        name: "A Party Please!",
        characters: [
            { name: CHARACTERS.ANNA, level: 5 },
            { name: CHARACTERS.ELSA, level: 7 }
        ],
        time: "8h",
        required: [
            {
                name: COSTUMES.HOLIDAY,
                character: CHARACTERS.ANNA,
                type: REQ_TYPES.COSTUME
            },
            {
                name: COSTUMES.HOLIDAY,
                character: CHARACTERS.ELSA,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: CHARACTERS.SNEEZY, tokenType: EARS },
            { name: CHARACTERS.DUG, tokenType: TOKEN }
        ]
    },
    {
        name: "Concerned",
        characters: [{ name: CHARACTERS.ANNA, level: 2 }],
        time: "6h",
        required: [
            {
                name: "Travel",
                character: CHARACTERS.ANNA,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [
            { name: CHARACTERS.FIRE_SPIRIT, tokenType: TOKEN },
            { name: CHARACTERS.RYDER, tokenType: TOKEN }
        ]
    },
    {
        name: "Believe In Me",
        characters: [
            { name: CHARACTERS.ANNA, level: 7 },
            { name: CHARACTERS.ELSA, level: 7 }
        ],
        time: "12h",
        required: [
            {
                name: "Travel",
                character: CHARACTERS.ANNA,
                type: REQ_TYPES.COSTUME
            },
            {
                name: "Travel",
                character: CHARACTERS.ELSA,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: CHARACTERS.FIRE_SPIRIT, tokenType: TOKEN }]
    },
    {
        name: "Explore the Forest",
        characters: [{ name: CHARACTERS.ANNA, level: 3 }],
        time: "12h",
        required: [
            { name: BUILDINGS.ENCHANTED_FOREST, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HONEYMAREN, tokenType: TOKEN },
            { name: CHARACTERS.HONEYMAREN, tokenType: EARS }
        ]
    },
    {
        name: "Seek Out Elsa",
        characters: [{ name: CHARACTERS.ANNA, level: 3 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.WATER_SPIRIT_WAVE_RIDE,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.HONEYMAREN, tokenType: TOKEN },
            { name: CHARACTERS.HONEYMAREN, tokenType: EARS },
            { name: CHARACTERS.ELSA, tokenType: EARS }
        ]
    },
    {
        name: "Holding Back Flames",
        characters: [
            { name: CHARACTERS.ANNA, level: 3 },
            { name: CHARACTERS.FIRE_SPIRIT, level: 3 }
        ],
        time: "8h",
        required: [
            { name: BUILDINGS.ENCHANTED_FOREST, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.HONEYMAREN, tokenType: EARS }]
    },
    {
        name: "Row by Giants",
        characters: [{ name: CHARACTERS.ANNA, level: 5 }],
        time: "12h",
        required: [
            { name: BUILDINGS.STONE_GIANT_WATERFALL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.ELSA, tokenType: EARS }]
    },
    {
        name: "Convince Others",
        characters: [
            { name: CHARACTERS.ANNA, level: 8 },
            { name: CHARACTERS.HANS, level: 6 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.FIRE_SPIRIT, tokenType: EARS }]
    },
    //anna end
    //elsa
    {
        name: "Make It Snow",
        characters: [{ name: CHARACTERS.ELSA, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.FROZEN, tokenType: COMMON },
            { name: CHARACTERS.OLAF, tokenType: TOKEN }
        ]
    },
    {
        name: "Let It Go",
        characters: [{ name: CHARACTERS.ELSA, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.SVEN, tokenType: EARS },
            { name: CHARACTERS.KRISTOFF, tokenType: TOKEN }
        ]
    },
    {
        name: "Open the Gates",
        characters: [{ name: CHARACTERS.ELSA, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CHIP, tokenType: TOKEN },
            { name: CHARACTERS.HANS, tokenType: TOKEN }
        ]
    },
    {
        name: "Talk with the Trolls",
        characters: [{ name: CHARACTERS.ELSA, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.TROLL_KNOLL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MULAN, tokenType: EARS },
            { name: CHARACTERS.SPAMLEY, tokenType: EARS }
        ]
    },
    {
        name: "Visiting the Ice Palace",
        characters: [{ name: CHARACTERS.ELSA, level: 6 }],
        required: [{ name: BUILDINGS.ELSA_PALACE, type: REQ_TYPES.BUILDING }],
        time: "12h",
        tokens: [{ name: CHARACTERS.NALA, tokenType: EARS }]
    },
    {
        name: "Reason with the Queen",
        characters: [
            { name: CHARACTERS.ELSA, level: 9 },
            { name: CHARACTERS.HANS, level: 10 }
        ],
        time: "12h",
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.GASTON, tokenType: TOKEN },
            { name: CHARACTERS.GASTON, tokenType: EARS }
        ]
    },
    {
        name: "Part the Mist",
        characters: [{ name: CHARACTERS.ELSA, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.ENCHANTED_FOREST, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.RYDER, tokenType: TOKEN }]
    },
    {
        name: "Follow the Call",
        characters: [{ name: CHARACTERS.ELSA, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.STONE_GIANT_WATERFALL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.HONEYMAREN, tokenType: TOKEN }]
    },
    //olaf
    {
        name: "Summer Walk",
        characters: [{ name: CHARACTERS.OLAF, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FROZEN, tokenType: COMMON }]
    },
    {
        name: "Got Your Nose",
        characters: [
            { name: CHARACTERS.OLAF, level: 6 },
            { name: CHARACTERS.SVEN, level: 4 }
        ],
        time: "1h",
        tokens: [
            { name: CHARACTERS.HANS, tokenType: TOKEN },
            { name: CHARACTERS.HANS, tokenType: EARS }
        ]
    },
    {
        name: "Look In on Arendelle",
        characters: [{ name: CHARACTERS.OLAF, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DASH, tokenType: EARS },
            { name: CHARACTERS.ANNA, tokenType: EARS },
            { name: CHARACTERS.KRISTOFF, tokenType: EARS }
        ]
    },
    {
        name: "Trolls Are Friends",
        characters: [{ name: CHARACTERS.OLAF, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TROLL_KNOLL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.OLAF, tokenType: EARS },
            { name: CHARACTERS.SVEN, tokenType: TOKEN },
            { name: CHARACTERS.ELSA, tokenType: TOKEN },
            { name: CHARACTERS.FELIX, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit the Trading Post",
        characters: [{ name: CHARACTERS.OLAF, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.WANDERING_OAKEN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.WHITE_RABBIT, tokenType: TOKEN }]
    },
    {
        name: "Run Away from Giants!",
        characters: [{ name: CHARACTERS.OLAF }],
        time: "8h",
        required: [
            { name: BUILDINGS.STONE_GIANT_WATERFALL, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ANNA, tokenType: TOKEN },
            { name: CHARACTERS.ELSA, tokenType: TOKEN },
            { name: CHARACTERS.ELSA, tokenType: EARS },
            { name: CHARACTERS.FIRE_SPIRIT, tokenType: EARS }
        ]
    },
    {
        name: "Looking in Awe",
        characters: [{ name: CHARACTERS.OLAF, level: 2 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.ENCHANTED_FOREST,
                level: 2,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.HONEYMAREN, tokenType: EARS }]
    },
    {
        name: "Visit the Water",
        characters: [{ name: CHARACTERS.OLAF, level: 2 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.WATER_SPIRIT_WAVE_RIDE,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.ELSA, tokenType: TOKEN },
            { name: CHARACTERS.ELSA, tokenType: EARS }
        ]
    },
    {
        name: "Check On the Ice Palace",
        characters: [{ name: CHARACTERS.OLAF, level: 8 }],
        time: "8h",
        required: [{ name: BUILDINGS.ELSA_PALACE }],
        tokens: [{ name: CHARACTERS.DUG, tokenType: EARS }]
    },
    //olaf end
    //kristoff
    {
        name: "Singing a Song",
        characters: [{ name: CHARACTERS.KRISTOFF, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FROZEN, tokenType: COMMON }]
    },
    {
        name: "Time for a Family Visit",
        characters: [{ name: CHARACTERS.KRISTOFF, level: 3 }],
        required: [{ name: BUILDINGS.TROLL_KNOLL, type: REQ_TYPES.BUILDING }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.OLAF, tokenType: EARS },
            { name: CHARACTERS.SVEN, tokenType: EARS },
            { name: CHARACTERS.BELLE, tokenType: TOKEN },
            { name: CHARACTERS.FELIX, tokenType: EARS }
        ]
    },
    {
        name: "Ice Delivery",
        characters: [{ name: CHARACTERS.KRISTOFF, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ELSA, tokenType: EARS },
            { name: CHARACTERS.KRISTOFF, tokenType: TOKEN },
            { name: CHARACTERS.HANS, tokenType: TOKEN }
        ]
    },
    {
        name: "Make a Trade",
        characters: [{ name: CHARACTERS.KRISTOFF, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.WANDERING_OAKEN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DALE, tokenType: EARS },
            { name: CHARACTERS.JACK_SKELLINGTON, tokenType: EARS },
            { name: CHARACTERS.HANS, tokenType: EARS },
            { name: CHARACTERS.FIRE_SPIRIT, tokenType: TOKEN }
        ]
    },
    {
        name: "A Reindeer Conversation",
        characters: [
            { name: CHARACTERS.KRISTOFF, level: 4 },
            { name: CHARACTERS.RYDER, level: 4 }
        ],
        time: "12h",
        required: [
            { name: BUILDINGS.ENCHANTED_FOREST, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.KRISTOFF, tokenType: EARS }]
    },
    {
        name: "Admire the Ice",
        characters: [{ name: CHARACTERS.KRISTOFF, level: 7 }],
        time: "12h",
        required: [{ name: BUILDINGS.ELSA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.HONEYMAREN, tokenType: TOKEN }]
    },
    {
        name: "Serenade a Friend",
        characters: [
            { name: CHARACTERS.KRISTOFF, level: 4 },
            { name: CHARACTERS.SVEN, level: 6 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.ELSA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.RYDER, tokenType: TOKEN }]
    },
    {
        name: "Ice Carving",
        characters: [{ name: CHARACTERS.KRISTOFF, level: 2 }],
        time: "24h",
        tokens: [{ name: CHARACTERS.MULAN, tokenType: TOKEN }]
    },
    //sven
    {
        name: "Follow the Carrots",
        characters: [{ name: CHARACTERS.SVEN, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.FROZEN, tokenType: COMMON },
            { name: CHARACTERS.OLAF, tokenType: TOKEN }
        ]
    },
    {
        name: "A Visit to Arendelle",
        characters: [{ name: CHARACTERS.SVEN, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.KRISTOFF, tokenType: TOKEN },
            { name: CHARACTERS.ELSA, tokenType: EARS }
        ]
    },
    {
        name: "Parade Through Town",
        characters: [
            { name: CHARACTERS.SVEN, level: 3 },
            { name: CHARACTERS.ANNA, level: 5 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.HONEYMAREN, tokenType: EARS }]
    },
    {
        name: "Visit Home",
        characters: [{ name: CHARACTERS.SVEN, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TROLL_KNOLL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.OLAF, tokenType: EARS },
            { name: CHARACTERS.KRISTOFF, tokenType: EARS },
            { name: CHARACTERS.HANS, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit Oaken's for Carrots",
        characters: [{ name: CHARACTERS.SVEN, level: 8 }],
        time: "6h",
        required: [
            { name: BUILDINGS.WANDERING_OAKEN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CALHOUN, tokenType: TOKEN },
            { name: CHARACTERS.SPAMLEY, tokenType: TOKEN },
            { name: CHARACTERS.FIRE_SPIRIT, tokenType: EARS }
        ]
    },
    //hans
    {
        name: "Looking Good",
        characters: [{ name: CHARACTERS.HANS, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FROZEN, tokenType: COMMON }]
    },
    {
        name: "Make a Good Impression",
        characters: [{ name: CHARACTERS.HANS, level: 1 }],
        required: [
            { name: BUILDINGS.ARENDELLE_COURTYARD, type: REQ_TYPES.BUILDING }
        ],
        time: "2h",
        level: 1,
        tokens: [
            { name: CHARACTERS.OLAF, tokenType: EARS },
            { name: CHARACTERS.SVEN, tokenType: TOKEN },
            { name: CHARACTERS.ELSA, tokenType: TOKEN }
        ]
    },
    {
        name: "Spy on Trolls",
        characters: [{ name: CHARACTERS.HANS, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TROLL_KNOLL, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ANNA, tokenType: EARS },
            { name: CHARACTERS.KRISTOFF, tokenType: EARS }
        ]
    },
    {
        name: "Talk to Merchants",
        characters: [{ name: CHARACTERS.HANS, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.WANDERING_OAKEN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SYNDROME, tokenType: TOKEN },
            { name: CHARACTERS.HONEYMAREN, tokenType: TOKEN }
        ]
    },
    {
        name: "Investigate Elsa's Palace",
        characters: [{ name: CHARACTERS.HANS, level: 8 }],
        time: "8h",
        required: [{ name: BUILDINGS.ELSA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.RYDER, tokenType: TOKEN }]
    },
    //fire spirit //bruni
    {
        name: "Wandering Around",
        characters: [{ name: CHARACTERS.FIRE_SPIRIT, level: 1 }],
        time: "1h",
        required: [
            { name: BUILDINGS.ENCHANTED_FOREST, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: GROUPS.FROZEN, tokenType: COMMON }]
    },
    {
        name: "Exploring",
        characters: [{ name: CHARACTERS.FIRE_SPIRIT, level: 1 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.ANNA, tokenType: TOKEN }]
    },
    {
        name: "Creating Flames",
        characters: [{ name: CHARACTERS.FIRE_SPIRIT, level: 2 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.ENCHANTED_FOREST,
                level: 1,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.HONEYMAREN, tokenType: EARS }]
    },
    // {
    //     name: "Stay Cool",
    //     characters: [{ name: CHARACTERS.FIRE_SPIRIT, level: 4 }],
    //     time: "6h",
    //     required: [
    //         { name: BUILDINGS.STONE_GIANT_WATERFALL, type: REQ_TYPES.BUILDING }
    //     ],
    //     tokens: [{ name: CHARACTERS.FIRE_SPIRIT, tokenType: EARS }]
    // },
    {
        name: "Find Some Ice",
        characters: [{ name: CHARACTERS.FIRE_SPIRIT, level: 5 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.WATER_SPIRIT_WAVE_RIDE,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.ELSA, tokenType: EARS },
            { name: CHARACTERS.HANS, tokenType: EARS }
        ]
    },
    //fire spirit end
    //honeymaren
    {
        name: "Scouting the Land",
        characters: [{ name: CHARACTERS.HONEYMAREN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FROZEN, tokenType: COMMON }]
    },
    {
        name: "Keep an Eye Out",
        characters: [{ name: CHARACTERS.HONEYMAREN, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.ENCHANTED_FOREST, type: "building" }],
        tokens: [
            { name: CHARACTERS.ELSA, tokenType: TOKEN },
            { name: CHARACTERS.RYDER, tokenType: TOKEN }
        ]
    },
    {
        name: "Pay Respects",
        characters: [{ name: CHARACTERS.HONEYMAREN, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.WATER_SPIRIT_WAVE_RIDE, type: "building" }
        ],
        tokens: [{ name: "Fire Spirit", tokenType: EARS }]
    },
    {
        name: "Wander Together",
        characters: [
            { name: CHARACTERS.HONEYMAREN, level: 3 },
            { name: CHARACTERS.RYDER, level: 3 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.STONE_GIANT_WATERFALL, type: "building" }],
        tokens: [{ name: CHARACTERS.RYDER, tokenType: EARS }]
    },
    {
        name: "Watch for Giants",
        characters: [{ name: CHARACTERS.HONEYMAREN, level: 4 }],
        time: "6h",
        required: [
            { name: "Stone Giant Waterfall", type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.ELSA, tokenType: TOKEN },
            { name: CHARACTERS.HONEYMAREN, tokenType: EARS }
        ]
    },
    //ryder
    {
        name: "Getting Excited",
        characters: [{ name: CHARACTERS.RYDER, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FROZEN, tokenType: COMMON }]
    },
    {
        name: "Tending to the Reindeer",
        characters: [{ name: CHARACTERS.RYDER, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.ENCHANTED_FOREST, type: "building" }],
        tokens: [
            { name: CHARACTERS.ANNA, tokenType: TOKEN },
            { name: CHARACTERS.FIRE_SPIRIT, tokenType: TOKEN },
            { name: CHARACTERS.HONEYMAREN, tokenType: EARS }
        ]
    },
    {
        name: "Meet the Reindeer",
        characters: [{ name: CHARACTERS.RYDER, level: 2 }],
        time: "12h",
        required: [{ name: BUILDINGS.ENCHANTED_FOREST, type: "building" }],
        tokens: [{ name: CHARACTERS.RYDER, tokenType: EARS }]
    },
    {
        name: "Travel to the Sea",
        characters: [{ name: CHARACTERS.RYDER, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.WATER_SPIRIT_WAVE_RIDE, type: "building" }
        ],
        tokens: [
            { name: CHARACTERS.ELSA, tokenType: EARS },
            { name: CHARACTERS.HONEYMAREN, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit the Lichen Meadows",
        characters: [{ name: CHARACTERS.RYDER, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.STONE_GIANT_WATERFALL, type: "building" }],
        tokens: [{ name: CHARACTERS.ELSA, tokenType: TOKEN }]
    },
    {
        name: "Looking around in Wonder",
        characters: [
            { name: CHARACTERS.RYDER, level: 10 },
            { name: CHARACTERS.HONEYMAREN, level: 10 }
        ],
        time: "24h",
        tokens: [{ name: CHARACTERS.HANS, tokenType: TOKEN }]
    },
    //mulan
    {
        name: "Target Practice",
        characters: [{ name: CHARACTERS.MULAN, level: 1 }],
        time: "6m",
        tokens: [
            { name: GROUPS.MULAN, tokenType: COMMON },
            { name: CHARACTERS.KHAN, tokenType: TOKEN },
            { name: CHARACTERS.SHAN_YU, tokenType: EARS }
        ]
    },
    {
        name: "Fan Fight",
        characters: [{ name: CHARACTERS.MULAN, level: 2 }],
        time: "1h",
        tokens: [
            { name: CHARACTERS.MUSHU, tokenType: EARS },
            { name: CHARACTERS.MULAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Reach the Arrow",
        characters: [{ name: CHARACTERS.MULAN, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.TRAINING_CAMP, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LI_SHANG, tokenType: TOKEN },
            { name: CHARACTERS.MULAN, tokenType: EARS },
            { name: CHARACTERS.MAD_HATTER, tokenType: EARS }
        ]
    },
    {
        name: "Ask for Guidance",
        characters: [{ name: CHARACTERS.MULAN, level: 8 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ANCESTOR_SHRINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.LI_SHANG, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: EARS },
            { name: CHARACTERS.TIA_DALMA, tokenType: TOKEN }
        ]
    },
    {
        name: "Coaching",
        characters: [
            { name: CHARACTERS.MULAN, level: 5 },
            { name: CHARACTERS.MUSHU, level: 6 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.FROZONE, tokenType: EARS },
            { name: CHARACTERS.SVEN, tokenType: TOKEN },
            { name: CHARACTERS.MUSHU, tokenType: TOKEN }
        ]
    },
    {
        name: "Family Introduction",
        characters: [
            { name: CHARACTERS.MULAN, level: 6 },
            { name: CHARACTERS.LI_SHANG, level: 8 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.ANCESTOR_SHRINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.NICK, tokenType: TOKEN },
            { name: CHARACTERS.SIMBA, tokenType: TOKEN }
        ]
    },
    {
        name: "Keep in Shape",
        characters: [{ name: CHARACTERS.MULAN, level: 7 }],
        time: "6h",
        required: [{ name: BUILDINGS.TRAINING_CAMP, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.CRIKEE, tokenType: TOKEN }]
    },
    //mushu:
    {
        name: "Archery Prep",
        characters: [{ name: CHARACTERS.MUSHU, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.MULAN, tokenType: COMMON },
            { name: CHARACTERS.MUSHU, tokenType: EARS },
            { name: CHARACTERS.LI_SHANG, tokenType: EARS }
        ]
    },
    {
        name: "Scout the Training Camp",
        characters: [{ name: CHARACTERS.MUSHU, level: 2 }],
        required: [{ name: BUILDINGS.TRAINING_CAMP, type: REQ_TYPES.BUILDING }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.MULAN, tokenType: TOKEN },
            { name: CHARACTERS.PUMBAA, tokenType: EARS }
        ]
    },
    {
        name: "Best Guardian",
        characters: [{ name: CHARACTERS.MUSHU, level: 8 }],
        required: [
            { name: BUILDINGS.ANCESTOR_SHRINE, type: REQ_TYPES.BUILDING }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.MULAN, tokenType: EARS },
            { name: CHARACTERS.CRIKEE, tokenType: EARS },
            { name: CHARACTERS.SHAN_YU, tokenType: TOKEN }
        ]
    },
    {
        name: "Prep Fireworks",
        characters: [{ name: CHARACTERS.MUSHU, level: 4 }],
        required: [{ name: "Lantern Attraction" }],
        time: "12h",
        tokens: [{ name: CHARACTERS.BASHFUL, tokenType: TOKEN }]
    },
    //li shang
    {
        name: "Bo-Staff Fighting",
        characters: [{ name: CHARACTERS.LI_SHANG, level: 1 }],
        time: "6m",
        tokens: [{ name: GROUPS.MULAN, tokenType: COMMON }]
    },
    {
        name: "Run with Rice",
        characters: [{ name: CHARACTERS.LI_SHANG, level: 2 }],
        time: "1h",
        tokens: [
            { name: CHARACTERS.DASH, tokenType: TOKEN },
            { name: CHARACTERS.MUSHU, tokenType: EARS }
        ]
    },
    {
        name: "Check Training Camp",
        characters: [{ name: CHARACTERS.LI_SHANG, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.TRAINING_CAMP, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LI_SHANG, tokenType: TOKEN },
            { name: CHARACTERS.MULAN, tokenType: TOKEN },
            { name: CHARACTERS.MULAN, tokenType: EARS }
        ]
    },
    {
        name: "Report to the Emperor",
        characters: [{ name: CHARACTERS.LI_SHANG, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.LANTERN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ELASTIGIRL, tokenType: EARS },
            { name: CHARACTERS.SHAN_YU, tokenType: TOKEN }
        ]
    },
    {
        name: "Fa Family Visit",
        characters: [{ name: CHARACTERS.LI_SHANG, level: 6 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ANCESTOR_SHRINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MUSHU, tokenType: TOKEN },
            { name: CHARACTERS.LI_SHANG, tokenType: EARS },
            { name: CHARACTERS.KHAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Reading Reports",
        characters: [{ name: CHARACTERS.LI_SHANG, level: 10 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.BASHFUL, tokenType: EARS },
            { name: CHARACTERS.CRIKEE, tokenType: TOKEN },
            { name: CHARACTERS.CRIKEE, tokenType: EARS }
        ]
    },
    //crikee //cri-kee
    {
        name: "Lucky Hopping",
        characters: [{ name: CHARACTERS.CRIKEE, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.MULAN, tokenType: COMMON },
            { name: CHARACTERS.CRIKEE, tokenType: TOKEN },
            { name: CHARACTERS.CRIKEE, tokenType: EARS },
            ,
        ]
    },
    {
        name: "Hitting the Gong",
        characters: [{ name: CHARACTERS.CRIKEE, level: 3 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.MUSHU, tokenType: EARS },
            { name: CHARACTERS.SHAN_YU, tokenType: EARS }
        ]
    },
    {
        name: "Relaxing in Some Tea",
        characters: [{ name: CHARACTERS.CRIKEE, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.LANTERN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TREMAINE, tokenType: EARS },
            { name: CHARACTERS.MULAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Make a Note",
        characters: [
            { name: CHARACTERS.CRIKEE, level: 5 },
            { name: CHARACTERS.MUSHU, level: 5 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.KHAN, tokenType: EARS }]
    },
    {
        name: "Writing Messages",
        characters: [
            { name: CHARACTERS.MUSHU, level: 6 },
            { name: CHARACTERS.CRIKEE, level: 6 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.TRAINING_CAMP, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.LI_SHANG, tokenType: TOKEN }]
    },
    //crikee //cri-kee end
    //shan yu
    {
        name: "Cast Off",
        characters: [{ name: CHARACTERS.SHAN_YU, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.MULAN, tokenType: COMMON }]
    },
    {
        name: "Infiltrate the Palace",
        characters: [{ name: CHARACTERS.SHAN_YU, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LANTERN }],
        tokens: [{ name: CHARACTERS.KHAN, tokenType: EARS }]
    },
    //shan yu end
    //khan
    {
        name: "Enjoy Some Hay",
        characters: [{ name: CHARACTERS.KHAN, level: 1 }],
        time: "1h",
        tokens: [
            {
                name: SPECIAL_ITEMS.REFRESH_TOKEN,
                tokenType: SPECIAL,
                remove: true
            }
        ]
    },
    {
        name: "Keep an Eye Out",
        characters: [{ name: CHARACTERS.KHAN, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LANTERN, type: "building" }],
        tokens: [{ name: CHARACTERS.SHAN_YU, tokenType: EARS }]
    },
    //khan end
    //belle
    {
        name: "Marketplace Wander",
        characters: [{ name: CHARACTERS.BELLE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BATB, tokenType: COMMON }]
    },
    {
        name: "Tour of Beast's Castle",
        characters: [
            { name: CHARACTERS.BELLE, level: 2 },
            { name: CHARACTERS.COGSWORTH, level: 4 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GASTON, tokenType: TOKEN }]
    },
    {
        name: "Talk to Enchanting Friends",
        characters: [{ name: CHARACTERS.BELLE, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MRS_POTTS, tokenType: TOKEN },
            { name: CHARACTERS.BEAST, tokenType: TOKEN },
            { name: CHARACTERS.COGSWORTH, tokenType: EARS },
            { name: CHARACTERS.LILO, tokenType: EARS }
        ]
    },
    {
        name: "Storytime",
        characters: [
            { name: CHARACTERS.BELLE, level: 3 },
            { name: CHARACTERS.CHIP_POTTS, level: 4 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.VIOLET, tokenType: EARS },
            { name: CHARACTERS.GASTON, tokenType: EARS }
        ]
    },
    {
        name: "Talk with Beast",
        characters: [
            { name: CHARACTERS.BELLE, level: 4 },
            { name: CHARACTERS.BEAST, level: 3 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.LI_SHANG, tokenType: EARS },
            { name: CHARACTERS.MR_I, tokenType: EARS },
            { name: CHARACTERS.LEFOU, tokenType: TOKEN },
            { name: CHARACTERS.LEFOU, tokenType: EARS }
        ]
    },
    {
        name: "Visit Home",
        characters: [{ name: CHARACTERS.BELLE, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LUMIERE, tokenType: TOKEN },
            { name: CHARACTERS.CHIP_POTTS, tokenType: TOKEN },
            { name: CHARACTERS.CHIP_POTTS, tokenType: EARS },
            { name: CHARACTERS.MAURICE, tokenType: EARS }
        ]
    },
    {
        name: "Dinner and the Show",
        characters: [
            { name: CHARACTERS.BELLE, level: 5 },
            { name: CHARACTERS.LUMIERE, level: 6 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SLEEPY, tokenType: EARS }]
    },
    {
        name: "Visiting Belle's House",
        characters: [
            { name: CHARACTERS.BELLE, level: 9 },
            { name: CHARACTERS.BEAST, level: 6 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BOGO, tokenType: TOKEN }]
    },
    {
        name: "Tale as Old as Time",
        characters: [
            { name: CHARACTERS.BELLE, level: 7 },
            { name: CHARACTERS.BEAST, level: 6 }
        ],
        time: "12h",
        required: [
            {
                name: COSTUMES.FORMAL_DRESS,
                character: CHARACTERS.BELLE,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: CHARACTERS.SCAR, tokenType: EARS }]
    },
    {
        name: "Woo Belle",
        characters: [
            { name: CHARACTERS.BELLE, level: 8 },
            { name: CHARACTERS.GASTON, level: 8 }
        ],
        time: "12h",
        tokens: [
            { name: CHARACTERS.JAFAR, tokenType: TOKEN },
            { name: CHARACTERS.JAFAR, tokenType: EARS }
        ]
    },
    {
        name: "Sort the Library",
        characters: [{ name: CHARACTERS.BELLE, level: 1 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.COMFY,
                character: CHARACTERS.BELLE,
                type: REQ_TYPES.COSTUME
            },
            {
                name: BUILDINGS.PRINCESS_DRESSING_ROOM,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.JASMINE, tokenType: EARS },
            { name: CHARACTERS.ARIEL, tokenType: TOKEN }
        ]
    },
    {
        name: "Relaxing with a Book",
        characters: [{ name: CHARACTERS.BELLE, level: 7 }],
        time: "6h",
        required: [
            {
                name: COSTUMES.COMFY,
                character: CHARACTERS.BELLE,
                type: REQ_TYPES.COSTUME
            },
            {
                name: BUILDINGS.PRINCESS_DRESSING_ROOM,
                type: REQ_TYPES.BUILDING
            }
        ]
    },
    //beast
    {
        name: "Attempt to Read",
        characters: [{ name: CHARACTERS.BEAST, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.BATB, tokenType: COMMON },
            { name: CHARACTERS.MRS_POTTS, tokenType: EARS }
        ]
    },
    {
        name: "Check on the Staff",
        characters: [{ name: CHARACTERS.BEAST, level: 1 }],
        time: "1h",
        tokens: []
    },
    {
        name: "To the West Wing",
        characters: [{ name: CHARACTERS.BEAST, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.COGSWORTH, tokenType: EARS },
            { name: CHARACTERS.LUMIERE, tokenType: EARS }
        ]
    },
    {
        name: "A Visit to Belle's House",
        characters: [{ name: CHARACTERS.BEAST, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BELLE, tokenType: EARS },
            { name: CHARACTERS.GASTON, tokenType: TOKEN },
            { name: CHARACTERS.GASTON, tokenType: EARS },
            { name: CHARACTERS.MAURICE, tokenType: TOKEN }
        ]
    },
    {
        name: "Update the Master",
        characters: [
            { name: CHARACTERS.BEAST, level: 1 },
            { name: CHARACTERS.COGSWORTH, level: 3 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.CHIP_POTTS, tokenType: TOKEN },
            { name: CHARACTERS.CHIP_POTTS, tokenType: EARS },
            { name: CHARACTERS.COBRA_BUBBLES, tokenType: TOKEN }
        ]
    },
    {
        name: "The Enchanted Rose",
        characters: [{ name: CHARACTERS.BEAST, level: 8 }],
        time: "8h",
        required: [{ name: BUILDINGS.BE_OUR_GUEST, type: "building" }],
        tokens: [{ name: CHARACTERS.COBRA_BUBBLES, tokenType: EARS }]
    },
    //lumiere
    {
        name: "Light Tricks",
        characters: [{ name: CHARACTERS.LUMIERE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BATB, tokenType: COMMON }]
    },
    {
        name: "Preparing a Party",
        characters: [{ name: CHARACTERS.LUMIERE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BEAST, tokenType: EARS },
            { name: CHARACTERS.BELLE, tokenType: TOKEN }
        ]
    },
    {
        name: "Prepare for Dinner",
        characters: [
            { name: CHARACTERS.LUMIERE, level: 2 },
            { name: CHARACTERS.MRS_POTTS, level: 4 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { name: CHARACTERS.GASTON, tokenType: TOKEN }
        ]
    },
    {
        name: "Work Together",
        characters: [
            { name: CHARACTERS.LUMIERE, level: 1 },
            { name: CHARACTERS.COGSWORTH, level: 2 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: []
    },
    {
        name: "Be Our Guest",
        characters: [{ name: CHARACTERS.LUMIERE, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FROZONE, tokenType: TOKEN },
            { name: CHARACTERS.COGSWORTH, tokenType: TOKEN },
            { name: CHARACTERS.MRS_POTTS, tokenType: TOKEN },
            { name: CHARACTERS.MAURICE, tokenType: TOKEN }
        ]
    },
    {
        name: "Dance with Cogsworth",
        characters: [
            { name: CHARACTERS.LUMIERE, level: 3 },
            { name: CHARACTERS.COGSWORTH, level: 4 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.GASTON, tokenType: EARS },
            { name: CHARACTERS.MICHAEL, tokenType: TOKEN },
            { name: CHARACTERS.LEFOU, tokenType: TOKEN },
            { name: CHARACTERS.LEFOU, tokenType: EARS }
        ]
    },
    {
        name: "Visiting a Friend",
        characters: [{ name: CHARACTERS.LUMIERE, level: 3 }],
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.ANNA, tokenType: EARS },
            { name: CHARACTERS.NALA, tokenType: TOKEN },
            { name: CHARACTERS.LILO, tokenType: TOKEN }
        ]
    },
    {
        name: "Debate on Fun",
        characters: [
            { name: CHARACTERS.LUMIERE, level: 4 },
            { name: CHARACTERS.COGSWORTH, level: 6 }
        ],
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        time: "6h",
        tokens: [{ name: CHARACTERS.JASMINE, tokenType: EARS }]
    },
    //cogsworth
    {
        name: "Check with the Dishes",
        characters: [{ name: CHARACTERS.COGSWORTH, level: 1 }],
        time: "3m",
        required: [{ name: BUILDINGS.BE_OUR_GUEST, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.BATB, tokenType: COMMON }]
    },
    {
        name: "Panicked Planning",
        characters: [{ name: CHARACTERS.COGSWORTH, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.BATB, tokenType: COMMON },
            { name: CHARACTERS.MUSHU, tokenType: EARS }
        ]
    },
    {
        name: "Inspect Beast's Castle",
        characters: [{ name: CHARACTERS.COGSWORTH, level: 2 }],
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.BEAST, tokenType: EARS },
            { name: CHARACTERS.MRS_POTTS, tokenType: EARS },
            { name: CHARACTERS.LUMIERE, tokenType: EARS }
        ]
    },
    {
        name: "Visit Belle's House",
        characters: [{ name: CHARACTERS.COGSWORTH, level: 3 }],
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BELLE, tokenType: EARS },
            { name: CHARACTERS.SIMBA, tokenType: EARS },
            { name: CHARACTERS.MAURICE, tokenType: EARS }
        ]
    },
    {
        name: "History Lessons",
        characters: [
            { name: CHARACTERS.COGSWORTH, level: 5 },
            { name: CHARACTERS.CHIP_POTTS, level: 3 }
        ],
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        time: "8h",
        tokens: [{ name: CHARACTERS.SLEEPY, tokenType: TOKEN }]
    },
    //mrs. potts
    {
        name: "Serve Tea",
        characters: [{ name: CHARACTERS.MRS_POTTS, level: 1 }],
        time: "3m",
        required: [{ name: BUILDINGS.BE_OUR_GUEST, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.BATB, tokenType: COMMON }]
    },
    {
        name: "Sing an Old Tale",
        characters: [{ name: CHARACTERS.MRS_POTTS, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.BATB, tokenType: COMMON },
            { name: CHARACTERS.MRS_POTTS, tokenType: EARS },
            { name: CHARACTERS.BEAST, tokenType: EARS },
            { name: CHARACTERS.COGSWORTH, tokenType: TOKEN }
        ]
    },
    {
        name: "Check on Cupboard",
        characters: [{ name: CHARACTERS.MRS_POTTS, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.COGSWORTH, tokenType: EARS },
            { name: CHARACTERS.CHIP_POTTS, tokenType: TOKEN },
            { name: "Mushu", tokenType: TOKEN },
            { name: CHARACTERS.PLEAKLEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Go to Belle's House",
        characters: [{ name: CHARACTERS.MRS_POTTS, level: 7 }],
        time: "4h",
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SVEN, tokenType: EARS },
            { name: CHARACTERS.BELLE, tokenType: TOKEN },
            { name: CHARACTERS.LUMIERE, tokenType: TOKEN },
            { name: CHARACTERS.PLEAKLEY, tokenType: EARS },
            { name: CHARACTERS.MAURICE, tokenType: TOKEN }
        ]
    },
    {
        name: "Settle In for Bedtime",
        characters: [
            { name: CHARACTERS.MRS_POTTS, level: 5 },
            { name: CHARACTERS.CHIP_POTTS, level: 5 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }]
    },
    {
        name: "Compare Kitchens",
        characters: [{ name: CHARACTERS.MRS_POTTS, level: 8 }],
        time: "6h",
        required: [{ name: BUILDINGS.GASTON_TAVERN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.LEFOU, tokenType: TOKEN }]
    },
    //chip potts
    {
        name: "Help with the Show!",
        characters: [{ name: CHARACTERS.CHIP_POTTS, level: 1 }],
        time: "3m",
        required: [{ name: BUILDINGS.BE_OUR_GUEST, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.BATB, tokenType: COMMON },
            { name: CHARACTERS.GASTON, tokenType: TOKEN }
        ]
    },
    {
        name: "Excited Wander",
        characters: [{ name: CHARACTERS.CHIP_POTTS, level: 1 }],
        time: "2h",
        tokens: [
            { name: GROUPS.BATB, tokenType: COMMON },
            { name: CHARACTERS.BELLE, tokenType: EARS },
            { name: CHARACTERS.COGSWORTH, tokenType: TOKEN },
            { name: CHARACTERS.BEAST, tokenType: TOKEN }
        ]
    },
    {
        name: "Exploring for Fun!",
        characters: [{ name: CHARACTERS.CHIP_POTTS, level: 1 }],
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.LUMIERE, tokenType: TOKEN },
            { name: CHARACTERS.CHIP_POTTS, tokenType: TOKEN }
        ]
    },
    {
        name: "Check Out Belle's House",
        characters: [{ name: CHARACTERS.CHIP_POTTS, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JUMBA, tokenType: TOKEN },
            { name: CHARACTERS.JUMBA, tokenType: EARS },
            { name: CHARACTERS.LEFOU, tokenType: EARS },
            { name: CHARACTERS.MAURICE, tokenType: EARS }
        ]
    },
    //gaston
    {
        name: "Look Horrified",
        characters: [{ name: CHARACTERS.GASTON, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.BE_OUR_GUEST, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.BATB, tokenType: COMMON }]
    },
    {
        name: "Demand Attention",
        characters: [{ name: CHARACTERS.GASTON, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BELLE, tokenType: TOKEN },
            { name: CHARACTERS.LUMIERE, tokenType: EARS },
            { name: CHARACTERS.MRS_POTTS, tokenType: EARS }
        ]
    },
    {
        name: "Admire Me",
        characters: [{ name: CHARACTERS.GASTON, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BEAST, tokenType: TOKEN },
            { name: CHARACTERS.COGSWORTH, tokenType: EARS },
            { name: CHARACTERS.MAURICE, tokenType: EARS }
        ]
    },
    {
        name: "Stalk the Beast",
        characters: [{ name: CHARACTERS.GASTON, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.BEAST_CASTLE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SYNDROME, tokenType: EARS },
            { name: CHARACTERS.CHIP_POTTS, tokenType: TOKEN }
        ]
    },
    {
        name: "Talk About Myself",
        characters: [{ name: CHARACTERS.GASTON, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.BELLE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: []
    },
    {
        name: "Sing about Myself",
        characters: [{ name: CHARACTERS.GASTON, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.GASTON_TAVERN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LEFOU, tokenType: TOKEN },
            { name: CHARACTERS.LEFOU, tokenType: EARS }
        ]
    },
    {
        name: "Showing Off",
        characters: [{ name: CHARACTERS.GASTON, level: 9 }],
        time: "12h",
        required: [{ name: BUILDINGS.GASTON_TAVERN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SCAR, tokenType: TOKEN },
            { name: CHARACTERS.THE_QUEEN, tokenType: TOKEN }
        ]
    },
    //lefou
    {
        name: "Spying for Gaston",
        characters: [{ name: CHARACTERS.LEFOU, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.BATB, tokenType: COMMON },
            { name: CHARACTERS.MRS_POTTS, tokenType: TOKEN },
            { name: CHARACTERS.LEFOU, tokenType: TOKEN },
            { name: CHARACTERS.LEFOU, tokenType: EARS }
        ]
    },
    {
        name: "Song and Dance",
        characters: [{ name: CHARACTERS.LEFOU, level: 4 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.CHIP_POTTS, tokenType: EARS },
            { name: CHARACTERS.MAURICE, tokenType: EARS }
        ]
    },
    {
        name: "Create Mischief",
        characters: [{ name: CHARACTERS.LEFOU, level: 5 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.GASTON, tokenType: TOKEN },
            { name: CHARACTERS.GASTON, tokenType: EARS }
        ]
    },
    //simba
    {
        name: "Roar",
        characters: [{ name: CHARACTERS.SIMBA, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.PUMBAA, tokenType: TOKEN },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Time for a Break",
        characters: [{ name: CHARACTERS.SIMBA, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.CIRCLE_OF_LIFE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.ZAZU, tokenType: EARS }]
    },
    {
        name: "Lessons for a King",
        characters: [
            { name: CHARACTERS.SIMBA, level: 2 },
            { name: CHARACTERS.RAFIKI, level: 1 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.SCAR, tokenType: TOKEN }]
    },
    {
        name: "Watch the Sunrise",
        characters: [{ name: CHARACTERS.SIMBA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.FESTIVAL_LK, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TIMON, tokenType: EARS },
            { name: CHARACTERS.CATERPILLAR, tokenType: TOKEN },
            { name: CHARACTERS.BANZAI, tokenType: TOKEN }
        ]
    },
    {
        name: "Getting All the Updates",
        characters: [
            { name: CHARACTERS.SIMBA, level: 2 },
            { name: CHARACTERS.ZAZU, level: 1 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.SCAR, tokenType: EARS }]
    },
    {
        name: "Learning of Past Kings",
        characters: [{ name: CHARACTERS.SIMBA, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.YOKAI, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: TOKEN }
        ]
    },
    {
        name: "Avoid Trouble",
        characters: [
            { name: CHARACTERS.SIMBA, level: 6 },
            { name: CHARACTERS.RAFIKI, level: 5 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BANZAI, tokenType: EARS }]
    },
    {
        name: "Grabbing a Snack",
        characters: [
            { name: CHARACTERS.SIMBA, level: 7 },
            { name: CHARACTERS.TIMON, level: 8 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.CIRCLE_OF_LIFE }],
        tokens: [{ name: CHARACTERS.SHENZI, tokenType: EARS }]
    },
    //nala
    {
        name: "Going Hunting",
        characters: [{ name: CHARACTERS.NALA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LK, tokenType: COMMON }]
    },
    {
        name: "Checking on Home",
        characters: [{ name: CHARACTERS.NALA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.FESTIVAL_LK, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ZAZU, tokenType: TOKEN },
            { name: CHARACTERS.PUMBAA, tokenType: EARS }
        ]
    },
    {
        name: "Idle Chat",
        characters: [
            { name: CHARACTERS.NALA, level: 3 },
            { name: CHARACTERS.ZAZU, level: 1 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.SCAR, tokenType: TOKEN }]
    },
    {
        name: "Taking a Break",
        characters: [{ name: CHARACTERS.NALA, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.CIRCLE_OF_LIFE }],
        tokens: [
            { name: CHARACTERS.TIMON, tokenType: TOKEN },
            { name: CHARACTERS.SIMBA, tokenType: EARS }
        ]
    },
    {
        name: "A Meeting of Friends",
        characters: [
            { name: CHARACTERS.NALA, level: 1 },
            { name: CHARACTERS.RAFIKI, level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.FESTIVAL_LK, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SCAR, tokenType: EARS }]
    },
    {
        name: "Seeking Advice",
        characters: [{ name: CHARACTERS.NALA, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GENIE, tokenType: TOKEN },
            { name: CHARACTERS.YOKAI, tokenType: EARS },
            { name: CHARACTERS.BANZAI, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: TOKEN }
        ]
    },
    {
        name: "Understanding Grubs",
        characters: [
            { name: CHARACTERS.NALA, level: 4 },
            { name: CHARACTERS.PUMBAA }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.SHENZI, tokenType: TOKEN }]
    },
    //zazu
    {
        name: "Keeping an Eye Out",
        characters: [{ name: CHARACTERS.ZAZU, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.PUMBAA, tokenType: EARS }
        ]
    },
    {
        name: "A Well-Needed Break",
        characters: [{ name: CHARACTERS.ZAZU, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.CIRCLE_OF_LIFE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ZAZU, tokenType: TOKEN },
            { name: CHARACTERS.TIMON, tokenType: TOKEN },
            { name: CHARACTERS.RAFIKI, tokenType: TOKEN }
        ]
    },
    {
        name: "Checking Up",
        characters: [{ name: CHARACTERS.ZAZU, level: 2 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.FRED, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: EARS }
        ]
    },
    {
        name: "Speak of Advice",
        characters: [
            { name: CHARACTERS.ZAZU, level: 8 },
            { name: CHARACTERS.RAFIKI, level: 8 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SHENZI, tokenType: EARS }]
    },
    //rafiki
    {
        name: "Wandering the Pridelands",
        characters: [{ name: CHARACTERS.RAFIKI, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.SIMBA, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.STRING,
                type: "mini_event",
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Observing the Land",
        characters: [{ name: CHARACTERS.RAFIKI, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.CIRCLE_OF_LIFE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.NALA, tokenType: EARS },
            { name: CHARACTERS.SIMBA, tokenType: EARS },
            { name: CHARACTERS.ED, tokenType: EARS }
        ]
    },
    {
        name: "Visiting a King",
        characters: [{ name: CHARACTERS.RAFIKI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.FESTIVAL_LK, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NALA, tokenType: TOKEN },
            { name: CHARACTERS.RAFIKI, tokenType: TOKEN },
            { name: CHARACTERS.ZAZU, tokenType: TOKEN },
            { name: CHARACTERS.GOGO, tokenType: TOKEN }
        ]
    },
    //timon
    {
        name: "Cream-Filled Kind",
        characters: [{ name: CHARACTERS.TIMON, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.PUMBAA, tokenType: TOKEN },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Afternoon Nap",
        characters: [{ name: CHARACTERS.TIMON, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.CIRCLE_OF_LIFE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ZAZU, tokenType: EARS },
            { name: CHARACTERS.RAFIKI, tokenType: EARS }
        ]
    },
    {
        name: "Explore the Tree",
        characters: [{ name: CHARACTERS.TIMON, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SIMBA, tokenType: EARS },
            { name: CHARACTERS.HONEY_LEMON, tokenType: TOKEN }
        ]
    },
    {
        name: "Serenade",
        characters: [
            { name: CHARACTERS.TIMON, level: 4 },
            { name: CHARACTERS.PUMBAA, level: 4 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.SCAR, tokenType: TOKEN },
            { name: CHARACTERS.SCAR, tokenType: EARS },
            { name: CHARACTERS.ALADDIN, tokenType: TOKEN },
            { name: CHARACTERS.ALADDIN, tokenType: EARS }
        ]
    },
    {
        name: "Visit Simba's Home",
        characters: [{ name: CHARACTERS.TIMON, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.FESTIVAL_LK, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NALA, tokenType: TOKEN },
            { name: CHARACTERS.BANZAI, tokenType: TOKEN }
        ]
    },
    {
        name: "Gossip with the Pride",
        characters: [
            { name: CHARACTERS.TIMON, level: 6 },
            { name: CHARACTERS.PUMBAA, level: 6 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.ED, tokenType: TOKEN }]
    },
    //pumbaa
    {
        name: "Slimy Yet Satisfying",
        characters: [{ name: CHARACTERS.PUMBAA, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.ZAZU, tokenType: EARS },
            {
                name: SPECIAL_ITEMS.STRING,
                type: "mini_event",
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Try New Grubs",
        characters: [{ name: CHARACTERS.PUMBAA, level: 5 }],
        time: "2h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SIMBA, tokenType: TOKEN }]
    },
    {
        name: "Favorite Grub Spot",
        characters: [{ name: CHARACTERS.PUMBAA, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.CIRCLE_OF_LIFE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TIMON, tokenType: EARS },
            { name: CHARACTERS.NALA, tokenType: EARS },
            { name: CHARACTERS.RAFIKI, tokenType: TOKEN },
            { name: CHARACTERS.BANZAI, tokenType: TOKEN }
        ]
    },
    //scar
    {
        name: "Play with Food",
        characters: [{ name: CHARACTERS.SCAR, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.PUMBAA, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.STRING,
                type: "mini_event",
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Meeting with Friends",
        characters: [{ name: CHARACTERS.SCAR, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.CIRCLE_OF_LIFE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ZAZU, tokenType: EARS },
            { name: CHARACTERS.RAFIKI, tokenType: EARS }
        ]
    },
    {
        name: "Plotting a Takeover",
        characters: [{ name: CHARACTERS.SCAR, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.FESTIVAL_LK, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NALA, tokenType: EARS },
            { name: CHARACTERS.SIMBA, tokenType: EARS },
            { name: CHARACTERS.ED, tokenType: TOKEN }
        ]
    },
    {
        name: "Avoid Trouble",
        characters: [
            { name: CHARACTERS.SCAR, level: 5 },
            { name: CHARACTERS.ZAZU, level: 5 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.BANZAI, tokenType: EARS }]
    },
    {
        name: "Spy on the Advisor",
        characters: [{ name: CHARACTERS.SCAR, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TIMON, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: EARS },
            { name: CHARACTERS.SHENZI, tokenType: TOKEN }
        ]
    },
    //shenzi
    {
        name: "Locate Lions",
        characters: [{ name: CHARACTERS.SHENZI, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.SHENZI, tokenType: TOKEN },
            { name: CHARACTERS.SHENZI, tokenType: EARS },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Find the Pack",
        characters: [{ name: CHARACTERS.SHENZI, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.CIRCLE_OF_LIFE, type: "building" }],
        tokens: [
            { name: CHARACTERS.SIMBA, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: TOKEN }
        ]
    },
    {
        name: "Catch a Tingle",
        characters: [{ name: CHARACTERS.SHENZI, level: 4 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.BANZAI, tokenType: EARS }]
    },
    {
        name: "Friends?",
        characters: [{ name: CHARACTERS.SHENZI, level: 10 }],
        time: "24h",
        tokens: [
            { name: CHARACTERS.SCAR, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: TOKEN }
        ]
    },
    //banzai
    {
        name: "Find Food",
        characters: [{ name: CHARACTERS.BANZAI, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.BANZAI, tokenType: TOKEN },
            { name: CHARACTERS.BANZAI, tokenType: EARS },
            {
                name: SPECIAL_ITEMS.STRING,
                type: "mini_event",
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Scout for Danglers",
        characters: [{ name: CHARACTERS.BANZAI, level: 3 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.SCAR, tokenType: TOKEN }]
    },
    {
        name: "Say It Again",
        characters: [
            { name: CHARACTERS.BANZAI, level: 3 },
            { name: CHARACTERS.SHENZI, level: 3 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.PUMBAA, tokenType: TOKEN }]
    },
    {
        name: "Watch for Lions",
        characters: [{ name: CHARACTERS.BANZAI, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SIMBA, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: EARS }
        ]
    },
    {
        name: "Locate Some Hairies",
        characters: [
            { name: CHARACTERS.BANZAI, level: 8 },
            { name: CHARACTERS.SHENZI, level: 8 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.ZAZU, tokenType: TOKEN }]
    },
    {
        name: "Here Kitty, Kitty, Kitty...",
        characters: [
            { name: CHARACTERS.BANZAI, level: 7 },
            { name: CHARACTERS.NALA, level: 7 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.SHENZI, tokenType: EARS }]
    },
    {
        name: "Decide What's Funny",
        characters: [
            { name: CHARACTERS.BANZAI, level: 1 },
            { name: CHARACTERS.ED, level: 8 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.NALA, tokenType: TOKEN }]
    },
    //ed
    {
        name: "Sniff Around",
        characters: [{ name: CHARACTERS.ED, level: 1 }],
        time: "6h",
        tokens: [
            { name: GROUPS.LK, tokenType: COMMON },
            { name: CHARACTERS.BANZAI, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: TOKEN },
            { name: CHARACTERS.ED, tokenType: EARS },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Practice Your Retention",
        characters: [{ name: CHARACTERS.ED, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.CIRCLE_OF_LIFE }],
        tokens: [
            { name: CHARACTERS.SIMBA, tokenType: EARS },
            { name: CHARACTERS.TIMON, tokenType: EARS }
        ]
    },
    {
        name: "Hehehehehehe!",
        characters: [{ name: CHARACTERS.ED, level: 3 }],
        time: "1h",
        required: [{ name: BUILDINGS.TREE_OF_LIFE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.ZAZU, tokenType: EARS }]
    },
    {
        name: "Find a Bad Place to Nap",
        characters: [{ name: CHARACTERS.ED, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.FESTIVAL_LK, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PUMBAA, tokenType: EARS },
            { name: CHARACTERS.BANZAI, tokenType: EARS },
            { name: CHARACTERS.SHENZI, tokenType: TOKEN }
        ]
    },
    {
        name: "Take a Break",
        characters: [
            { name: CHARACTERS.ED, level: 5 },
            { name: CHARACTERS.SCAR, level: 5 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.RAFIKI, tokenType: EARS }]
    },
    {
        name: "Catch a Sniff",
        characters: [
            { name: CHARACTERS.ED, level: 6 },
            { name: CHARACTERS.SHENZI, level: 6 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.TIMON, tokenType: TOKEN }]
    },
    //aladdin
    {
        name: "Wandering the Streets",
        characters: [{ name: CHARACTERS.ALADDIN, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.ALADDIN, tokenType: COMMON },
            { name: CHARACTERS.CARPET, tokenType: EARS }
        ]
    },
    {
        name: "Afternoon Snack",
        characters: [{ name: CHARACTERS.ALADDIN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
        tokens: [
            { name: CHARACTERS.ABU, tokenType: TOKEN },
            { name: CHARACTERS.JASMINE, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: EARS }
        ]
    },
    {
        name: "Thinking of Date Ideas",
        characters: [{ name: CHARACTERS.ALADDIN, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [
            { name: CHARACTERS.JAFAR, tokenType: TOKEN },
            { name: CHARACTERS.JAFAR, tokenType: EARS },
            { name: CHARACTERS.RAJAH, tokenType: TOKEN },
            { name: CHARACTERS.CHARLES_MUNTZ, tokenType: TOKEN }
        ]
    },
    {
        name: "Breakfast",
        characters: [
            { name: CHARACTERS.ALADDIN, level: 4 },
            { name: CHARACTERS.ABU, level: 4 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.IAGO, tokenType: TOKEN },
            { name: CHARACTERS.IAGO, tokenType: EARS },
            { name: CHARACTERS.KANGA, tokenType: TOKEN }
        ]
    },
    // {
    //     name: "Spend Time with Genie",
    //     characters: [
    //         { name: CHARACTERS.ALADDIN, level: 7 },
    //         { name: CHARACTERS.GENIE, level: 7 }
    //     ],
    //     time: "6h",
    //     required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
    //     tokens: [
    //         { name: CHARACTERS.CHESHIRE, tokenType: TOKEN },
    //         { name: CHARACTERS.CHESHIRE, tokenType: EARS }
    //     ]
    // },
    {
        name: "Diamond in the Rough",
        characters: [{ name: CHARACTERS.ALADDIN, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.CAVE_OF_WONDERS, type: "building" }],
        tokens: [{ name: CHARACTERS.KANGA, tokenType: EARS }]
    },
    {
        name: "Friend Like Me",
        characters: [
            { name: CHARACTERS.ALADDIN },
            { name: CHARACTERS.GENIE, level: 5 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.SULTAN, tokenType: TOKEN }]
    },
    //jasmine
    {
        name: "Exploring the Market",
        characters: [{ name: CHARACTERS.JASMINE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ALADDIN, tokenType: COMMON }]
    },
    {
        name: "Visiting the Market",
        characters: [{ name: CHARACTERS.JASMINE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
        tokens: [
            { name: CHARACTERS.ALADDIN, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Listening In",
        characters: [
            { name: CHARACTERS.JASMINE, level: 5 },
            { name: CHARACTERS.IAGO, level: 1 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [{ name: CHARACTERS.JAFAR, tokenType: TOKEN }]
    },
    {
        name: "Relaxing by the Water",
        characters: [{ name: CHARACTERS.JASMINE, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [
            { name: CHARACTERS.CATERPILLAR, tokenType: EARS },
            { name: CHARACTERS.ABU, tokenType: TOKEN },
            { name: CHARACTERS.CARPET, tokenType: TOKEN }
        ]
    },
    {
        name: "An Apple for Me",
        characters: [
            { name: CHARACTERS.JASMINE, level: 3 },
            { name: CHARACTERS.ABU, level: 3 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.CHARLES_MUNTZ, tokenType: EARS }]
    },
    {
        name: "Offer an Escape",
        characters: [
            { name: CHARACTERS.JASMINE, level: 4 },
            { name: CHARACTERS.CARPET, level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [{ name: CHARACTERS.JAFAR, tokenType: EARS }]
    },
    {
        name: "Dreaming of More",
        characters: [{ name: CHARACTERS.JASMINE, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [{ name: CHARACTERS.PIGLET, tokenType: TOKEN }]
    },
    {
        name: "Preparing for a Quiz",
        characters: [{ name: CHARACTERS.JASMINE, level: 1 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.COMFY,
                character: CHARACTERS.JASMINE,
                type: REQ_TYPES.COSTUME
            },
            {
                name: BUILDINGS.PRINCESS_DRESSING_ROOM,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.ARIEL, tokenType: EARS }]
    },
    {
        name: "Dancing to the Music",
        characters: [{ name: CHARACTERS.JASMINE, level: 7 }],
        time: "8h",
        required: [
            { name: BUILDINGS.GENIE_LAMP_SHOW, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SULTAN, tokenType: EARS },
            { name: CHARACTERS.RAJAH, tokenType: EARS }
        ]
    },
    //abu
    {
        name: "Pretender Rasoul",
        characters: [{ name: CHARACTERS.ABU, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ALADDIN, tokenType: COMMON }]
    },
    {
        name: "Searching for Apples",
        characters: [{ name: CHARACTERS.ABU, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
        tokens: [
            { name: CHARACTERS.ALADDIN, tokenType: EARS },
            { name: CHARACTERS.CARPET, tokenType: EARS },
            { name: CHARACTERS.JASMINE, tokenType: EARS }
        ]
    },
    {
        name: "Sneak Around",
        characters: [{ name: CHARACTERS.ABU, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [{ name: CHARACTERS.GENIE, tokenType: EARS }]
    },
    {
        name: "Touch Nothing",
        characters: [{ name: CHARACTERS.ABU, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.CAVE_OF_WONDERS, type: "building" }],
        tokens: [
            { name: CHARACTERS.JAFAR, tokenType: TOKEN },
            { name: CHARACTERS.SULTAN, tokenType: EARS }
        ]
    },
    {
        name: "Being a Pest",
        characters: [
            { name: CHARACTERS.ABU, level: 9 },
            { name: CHARACTERS.IAGO, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
        tokens: [{ name: CHARACTERS.JAFAR, tokenType: EARS }]
    },
    {
        name: "Trip through the Cave",
        characters: [
            { name: CHARACTERS.ABU, level: 7 },
            { name: CHARACTERS.CARPET, level: 7 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.CAVE_OF_WONDERS, type: "building" }],
        tokens: [{ name: CHARACTERS.RAJAH, tokenType: EARS }]
    },
    //carpet
    {
        name: "Fly About",
        characters: [{ name: CHARACTERS.CARPET, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.ALADDIN, tokenType: COMMON },
            { name: CHARACTERS.ALADDIN, tokenType: EARS },
            { name: CHARACTERS.ABU, tokenType: TOKEN }
        ]
    },
    {
        name: "Drift about the Stalls",
        characters: [{ name: CHARACTERS.CARPET, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
        tokens: [
            { name: CHARACTERS.JASMINE, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: TOKEN },
            { name: CHARACTERS.TIGGER, tokenType: EARS }
        ]
    },
    {
        name: "Enjoy Some Chess",
        characters: [
            { name: CHARACTERS.CARPET, level: 2 },
            { name: CHARACTERS.GENIE, level: 4 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [{ name: CHARACTERS.JAFAR, tokenType: TOKEN }]
    },
    {
        name: "Relax at the Palace",
        characters: [{ name: CHARACTERS.CARPET, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: TOKEN },
            { name: CHARACTERS.SULTAN, tokenType: TOKEN }
        ]
    },
    //genie
    {
        name: "Dancing Around",
        characters: [{ name: CHARACTERS.GENIE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ALADDIN, tokenType: COMMON }]
    },
    {
        name: "Creating a Spectacle",
        characters: [{ name: CHARACTERS.GENIE, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.GENIE_LAMP_SHOW, type: "building" }],
        tokens: []
    },
    {
        name: "Generate Some Excitement",
        characters: [{ name: CHARACTERS.GENIE, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
        tokens: [
            { name: CHARACTERS.ALADDIN, tokenType: TOKEN },
            { name: CHARACTERS.CARPET, tokenType: TOKEN },
            { name: CHARACTERS.ABU, tokenType: EARS }
        ]
    },
    {
        name: "Visiting the Cave",
        characters: [{ name: CHARACTERS.GENIE, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.CAVE_OF_WONDERS, type: "building" }],
        tokens: [
            { name: CHARACTERS.JAFAR, tokenType: EARS },
            { name: CHARACTERS.RAJAH, tokenType: TOKEN },
            { name: CHARACTERS.PIGLET, tokenType: EARS }
        ]
    },
    {
        name: "Visiting the Palace",
        characters: [{ name: CHARACTERS.GENIE, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [
            { name: CHARACTERS.JASMINE, tokenType: TOKEN },
            { name: CHARACTERS.IAGO, tokenType: TOKEN },
            { name: CHARACTERS.IAGO, tokenType: EARS }
        ]
    },
    //jafar
    {
        name: "Seeking a Treasure",
        characters: [{ name: CHARACTERS.JAFAR, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.CAVE_OF_WONDERS, type: "building" }],
        tokens: [{ name: GROUPS.ALADDIN, tokenType: COMMON }]
    },
    {
        name: "Imagining Power",
        characters: [{ name: CHARACTERS.JAFAR, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [
            { name: CHARACTERS.CARPET, tokenType: EARS },
            { name: CHARACTERS.JASMINE, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Keep a Careful Watch",
        characters: [{ name: CHARACTERS.JAFAR, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.CARPET, tokenType: TOKEN },
            { name: CHARACTERS.ALADDIN, tokenType: TOKEN },
            { name: CHARACTERS.ABU, tokenType: EARS }
        ]
    },
    {
        name: "Talk to the Guards",
        characters: [{ name: CHARACTERS.JAFAR, level: 5 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.IAGO, tokenType: TOKEN },
            { name: CHARACTERS.IAGO, tokenType: EARS }
        ]
    },
    {
        name: "Seeking Access",
        characters: [
            { name: CHARACTERS.JAFAR, level: 8 },
            { name: CHARACTERS.IAGO, level: 8 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.CAVE_OF_WONDERS, type: "building" }],
        tokens: [{ name: CHARACTERS.SULTAN, tokenType: EARS }]
    },
    {
        name: "Scheming",
        characters: [
            { name: CHARACTERS.JAFAR, level: 9 },
            { name: CHARACTERS.IAGO, level: 10 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.RAJAH, tokenType: TOKEN }]
    },
    //iago
    {
        name: "Watching the Entrance",
        characters: [{ name: CHARACTERS.IAGO, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.CAVE_OF_WONDERS, type: "building" }],
        tokens: [
            { name: GROUPS.ALADDIN, tokenType: COMMON },
            { name: CHARACTERS.GENIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Search for Jafar",
        characters: [{ name: CHARACTERS.IAGO, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.ALADDIN, tokenType: TOKEN },
            { name: CHARACTERS.ABU, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: EARS }
        ]
    },
    {
        name: "Playing Spy",
        characters: [{ name: CHARACTERS.IAGO, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.JASMINE, tokenType: TOKEN },
            { name: CHARACTERS.IAGO, tokenType: TOKEN },
            { name: CHARACTERS.IAGO, tokenType: EARS }
        ]
    },
    {
        name: "Mimic Voices",
        characters: [{ name: CHARACTERS.IAGO, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.LOTUS_FOUNTAIN, type: "building" }],
        tokens: [
            { name: CHARACTERS.EEYORE, tokenType: TOKEN },
            { name: CHARACTERS.EEYORE, tokenType: EARS }
        ]
    },
    //sultan
    {
        name: "I Am Sultan",
        characters: [{ name: CHARACTERS.SULTAN, level: 1 }],
        time: "6h",
        tokens: [
            { name: GROUPS.ALADDIN, tokenType: COMMON },
            { name: CHARACTERS.SULTAN, tokenType: TOKEN },
            { name: CHARACTERS.SULTAN, tokenType: EARS }
        ]
    },
    {
        name: "Absolutely Marvelous!",
        characters: [{ name: CHARACTERS.SULTAN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.STREETS_OF_AGRABAH, type: "building" }],
        tokens: [
            { name: CHARACTERS.ALADDIN, tokenType: EARS },
            { name: CHARACTERS.JASMINE, tokenType: EARS }
        ]
    },
    {
        name: "What Is That Music?",
        characters: [{ name: CHARACTERS.SULTAN, level: 5 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.GENIE, tokenType: EARS },
            { name: CHARACTERS.CARPET, tokenType: TOKEN }
        ]
    },
    {
        name: "Ride Remarkable Devices",
        characters: [{ name: CHARACTERS.SULTAN, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.MAGIC_CARPETS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DUCKY, tokenType: TOKEN },
            { name: CHARACTERS.ABU, tokenType: EARS },
            { name: CHARACTERS.IAGO, tokenType: TOKEN },
            { name: CHARACTERS.JAFAR, tokenType: TOKEN }
        ]
    },
    //rajah
    {
        name: "Safe and Sound",
        characters: [{ name: CHARACTERS.RAJAH, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.ALADDIN, tokenType: COMMON },
            { name: CHARACTERS.CARPET, tokenType: EARS },
            { name: CHARACTERS.RAJAH, tokenType: TOKEN },
            { name: CHARACTERS.RAJAH, tokenType: EARS }
        ]
    },
    {
        name: "Take a Nap",
        characters: [{ name: CHARACTERS.RAJAH, level: 3 }],
        time: "2h",
        required: [
            { name: BUILDINGS.LOTUS_FOUNTAIN, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.JAFAR, tokenType: EARS }]
    },
    {
        name: "Patrol the Market",
        characters: [{ name: CHARACTERS.RAJAH, level: 2 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.FORKY, tokenType: EARS },
            { name: CHARACTERS.ABU, tokenType: TOKEN },
            { name: CHARACTERS.ALADDIN, tokenType: TOKEN },
            { name: CHARACTERS.IAGO, tokenType: EARS }
        ]
    },
    {
        name: "Investigate Trouble",
        characters: [{ name: CHARACTERS.RAJAH, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.MAGIC_LAMP_THEATER, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BUNNY, tokenType: EARS },
            { name: CHARACTERS.GENIE, tokenType: TOKEN },
            { name: CHARACTERS.JASMINE, tokenType: TOKEN },
            { name: CHARACTERS.SULTAN, tokenType: EARS }
        ]
    },
    //alice
    {
        name: "Curiouser and Curiouser",
        characters: [{ name: CHARACTERS.ALICE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.AIW, tokenType: COMMON },
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON }
        ]
    },
    {
        name: "Sing with the Flowers",
        characters: [{ name: CHARACTERS.ALICE, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MAD_HATTER, tokenType: EARS },
            { name: CHARACTERS.CHESHIRE, tokenType: TOKEN },
            { name: CHARACTERS.CATERPILLAR, tokenType: TOKEN }
        ]
    },
    {
        name: "Directions",
        characters: [
            { name: CHARACTERS.ALICE, level: 2 },
            { name: CHARACTERS.CHESHIRE, level: 1 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: EARS }]
    },
    {
        name: "Exploring for Fun!",
        characters: [
            { name: CHARACTERS.ALICE, level: 3 },
            { name: CHARACTERS.MARCH_HARE, level: 5 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.WHITE_RABBIT_HOUSE }],
        tokens: [{ name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: TOKEN }]
    },
    {
        name: "Trying Cookies",
        characters: [{ name: CHARACTERS.ALICE, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.WHITE_RABBIT_HOUSE }],
        tokens: [{ name: CHARACTERS.MARCH_HARE, tokenType: EARS }]
    },
    {
        name: "A Moral within the Story",
        characters: [{ name: CHARACTERS.ALICE, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.TWEEDLE_WACKY, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.WHITE_RABBIT, tokenType: EARS }]
    },
    {
        name: "Attempted Tea Party",
        characters: [
            { name: CHARACTERS.ALICE, level: 6 },
            { name: CHARACTERS.MAD_HATTER, level: 7 }
        ],
        time: "8h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MICHAEL, tokenType: EARS }]
    },
    //mad hatter
    {
        name: "Tea Hat",
        characters: [{ name: CHARACTERS.MAD_HATTER, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.AIW, tokenType: COMMON }]
    },
    {
        name: "Enjoy the Singing",
        characters: [{ name: CHARACTERS.MAD_HATTER, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.WHITE_RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.MARCH_HARE, tokenType: TOKEN }
        ]
    },
    {
        name: "Mad Fun!",
        characters: [
            { name: CHARACTERS.MAD_HATTER, level: 2 },
            { name: CHARACTERS.WHITE_RABBIT, level: 1 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.TWEEDLE_WACKY, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: EARS }]
    },
    {
        name: "Drinking Tea",
        characters: [{ name: CHARACTERS.MAD_HATTER, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.WHITE_RABBIT_HOUSE }],
        tokens: [
            { name: CHARACTERS.CHESHIRE, tokenType: EARS },
            { name: CHARACTERS.CATERPILLAR, tokenType: EARS }
        ]
    },
    {
        name: "Must Have Tea",
        characters: [{ name: CHARACTERS.MAD_HATTER, level: 5 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ALICE_IN_WONDERLAND, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: TOKEN }]
    },
    {
        name: "Swapping Stories",
        characters: [{ name: CHARACTERS.MAD_HATTER, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.TWEEDLE_WACKY, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.ALICE, tokenType: EARS }]
    },
    {
        name: "Very Merry Unbirthday",
        characters: [
            { name: CHARACTERS.MAD_HATTER, level: 6 },
            { name: CHARACTERS.MARCH_HARE, level: 8 }
        ],
        time: "6h",
        tokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN }
        ]
    },
    //white rabbit
    {
        name: "Checking the Time",
        characters: [{ name: CHARACTERS.WHITE_RABBIT, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.AIW, tokenType: COMMON },
            { name: CHARACTERS.MAD_HATTER, tokenType: TOKEN },
            { name: "Blue", type: "fabric", tokenType: FABRIC }
        ]
    },
    {
        name: "Goodbye, I'm Late!",
        characters: [{ name: CHARACTERS.WHITE_RABBIT, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.WHITE_RABBIT, tokenType: EARS },
            { name: CHARACTERS.CHESHIRE, tokenType: EARS },
            { name: CHARACTERS.MARY_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "A Small Meeting",
        characters: [
            { name: CHARACTERS.WHITE_RABBIT, level: 1 },
            { name: CHARACTERS.CATERPILLAR, level: 4 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.WHITE_RABBIT_HOUSE }],
        tokens: [{ name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: TOKEN }]
    },
    {
        name: "Searching for Mary Ann",
        characters: [{ name: CHARACTERS.WHITE_RABBIT, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.WHITE_RABBIT_HOUSE }],
        tokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.MARCH_HARE, tokenType: EARS },
            { name: CHARACTERS.CATERPILLAR, tokenType: TOKEN }
        ]
    },
    {
        name: "Oh Me, Oh My!",
        characters: [{ name: CHARACTERS.WHITE_RABBIT, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.TWEEDLE_WACKY, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.ALICE, tokenType: TOKEN }]
    },
    //march hare
    {
        name: "Half a Cup",
        characters: [{ name: CHARACTERS.MARCH_HARE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.AIW, tokenType: COMMON }]
    },
    {
        name: "Tea for Flowers",
        characters: [{ name: CHARACTERS.MARCH_HARE, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CATERPILLAR, tokenType: TOKEN },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Nothing Whatever!",
        characters: [{ name: CHARACTERS.MARCH_HARE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.WHITE_RABBIT_HOUSE }],
        tokens: [
            { name: CHARACTERS.WHITE_RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.MAD_HATTER, tokenType: TOKEN },
            { name: CHARACTERS.ALICE, tokenType: TOKEN }
        ]
    },
    {
        name: "A Wacky Time",
        characters: [{ name: CHARACTERS.MARCH_HARE, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.TWEEDLE_WACKY, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: EARS }]
    },
    {
        name: "Celebrating with Tea",
        characters: [{ name: CHARACTERS.MARCH_HARE, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.ALICE_IN_WONDERLAND, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CHESHIRE, tokenType: TOKEN },
            { name: CHARACTERS.CHESHIRE, tokenType: EARS },
            { name: CHARACTERS.ERNESTO, tokenType: TOKEN }
        ]
    },
    //caterpillar
    {
        name: "Lounging Around",
        characters: [{ name: CHARACTERS.CATERPILLAR, level: 1 }],
        time: "1h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: GROUPS.AIW, tokenType: COMMON }]
    },
    {
        name: "Reciting",
        characters: [{ name: CHARACTERS.CATERPILLAR, level: 3 }],
        time: "2h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.MAD_HATTER, tokenType: EARS },
            { name: CHARACTERS.MARCH_HARE, tokenType: TOKEN },
            { name: CHARACTERS.CHESHIRE, tokenType: TOKEN },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Sitting on a Mushroom",
        characters: [{ name: CHARACTERS.CATERPILLAR, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.ALICE_IN_WONDERLAND, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.WHITE_RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.ALICE, tokenType: TOKEN },
            { name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: EARS }
        ]
    },
    //cheshire
    {
        name: "I'm Looking Around",
        characters: [{ name: CHARACTERS.CHESHIRE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.AIW, tokenType: COMMON },
            { name: CHARACTERS.MARCH_HARE, tokenType: TOKEN },
            { name: CHARACTERS.MAD_HATTER, tokenType: EARS }
        ]
    },
    {
        name: "Go This Way",
        characters: [{ name: CHARACTERS.CHESHIRE, level: 1 }],
        time: "2h",
        required: [
            { name: BUILDINGS.WHITE_RABBIT_HOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CATERPILLAR, tokenType: TOKEN },
            { name: CHARACTERS.ALICE, tokenType: EARS }
        ]
    },
    {
        name: "A Shortcut",
        characters: [{ name: CHARACTERS.CHESHIRE, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TWEEDLE_WACKY, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.WHITE_RABBIT, tokenType: EARS },
            { name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: TOKEN },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: "Join the Chorus",
        characters: [{ name: CHARACTERS.CHESHIRE, level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MIGUEL, tokenType: TOKEN }]
    },
    //queen of hearts
    {
        name: "My Way!",
        characters: [{ name: CHARACTERS.QUEEN_OF_HEARTS, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.AIW, tokenType: COMMON }]
    },
    {
        name: "Enjoying My Flowers",
        characters: [{ name: CHARACTERS.QUEEN_OF_HEARTS, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.GOLDEN_AFTERNOON, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: GROUPS.HOCUS_POCUS, tokenType: COMMON },
            { name: CHARACTERS.CATERPILLAR, tokenType: EARS },
            { name: CHARACTERS.CHESHIRE, tokenType: TOKEN }
        ]
    },
    {
        name: "Commanding Subjects",
        characters: [{ name: CHARACTERS.QUEEN_OF_HEARTS, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.WHITE_RABBIT_HOUSE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MAD_HATTER, tokenType: TOKEN },
            { name: CHARACTERS.MARCH_HARE, tokenType: EARS },
            { name: CHARACTERS.ALICE, tokenType: TOKEN }
        ]
    },
    {
        name: "Playing My Game",
        characters: [{ name: CHARACTERS.QUEEN_OF_HEARTS, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.TWEEDLE_WACKY, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.WHITE_RABBIT, tokenType: TOKEN }]
    },
    {
        name: "My Unbirthday Party",
        characters: [{ name: CHARACTERS.QUEEN_OF_HEARTS, level: 8 }],
        time: "12h",
        required: [{ name: BUILDINGS.MAD_TEA, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: EARS }]
    },
    //snow white
    {
        name: "Gathering Flowers",
        characters: [{ name: CHARACTERS.SNOW_WHITE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.SNOW_WHITE, tokenType: COMMON },
            { name: CHARACTERS.DOPEY, tokenType: TOKEN },
            { name: CHARACTERS.DOC, tokenType: TOKEN }
        ]
    },
    {
        name: "Bringing Over Lunch",
        characters: [{ name: CHARACTERS.SNOW_WHITE, level: 2 }],
        time: "2h",
        required: [
            {
                name: BUILDINGS.SEVEN_DWARFS_MINE,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.SNOW_PRINCE, tokenType: TOKEN }]
    },
    {
        name: "Hiding from the Queen",
        characters: [{ name: CHARACTERS.SNOW_WHITE, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SNEEZY, tokenType: EARS }]
    },
    {
        name: "Tidying Up",
        characters: [{ name: CHARACTERS.SNOW_WHITE, level: 1 }],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HAPPY, tokenType: EARS },
            { name: CHARACTERS.SLEEPY, tokenType: TOKEN }
        ]
    },
    {
        name: "Too Busy Napping",
        characters: [
            { name: CHARACTERS.SNOW_WHITE, level: 2 },
            { name: CHARACTERS.SLEEPY, level: 2 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: TOKEN }]
    },
    {
        name: "Whistling While Working",
        characters: [
            { name: CHARACTERS.SNOW_WHITE, level: 1 },
            { name: CHARACTERS.DOPEY, level: 1 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: EARS }]
    },
    {
        name: "Forest Walk",
        characters: [{ name: CHARACTERS.SNOW_WHITE, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.SNOW_WHITE_SCARY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BASHFUL, tokenType: TOKEN },
            { name: CHARACTERS.GRUMPY, tokenType: EARS }
        ]
    },
    //snow white end
    //snow prince
    {
        name: "Visit the Dwarfs",
        characters: [{ name: CHARACTERS.SNOW_PRINCE, level: 4 }],
        time: "2h",
        required: [
            {
                name: BUILDINGS.SEVEN_DWARFS_MINE,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.DOC, tokenType: EARS }]
    },
    {
        name: "One Love",
        characters: [{ name: CHARACTERS.SNOW_PRINCE, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.SNOW_PRINCE, tokenType: TOKEN },
            { name: CHARACTERS.SNOW_PRINCE, tokenType: EARS },
            { name: GROUPS.SNOW_WHITE, tokenType: COMMON }
        ]
    },
    {
        name: "Travel the Woods",
        characters: [{ name: CHARACTERS.SNOW_PRINCE, level: 5 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.SNOW_WHITE_SCARY,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.DOPEY, tokenType: EARS },
            { name: CHARACTERS.SLEEPY, tokenType: EARS }
        ]
    },
    {
        name: "Spy on the Castle",
        characters: [{ name: CHARACTERS.SNOW_PRINCE, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SNOW_WHITE, tokenType: TOKEN }]
    },
    {
        name: "Watch for Trouble",
        characters: [
            { name: CHARACTERS.SNOW_PRINCE, level: 7 },
            { name: CHARACTERS.THE_QUEEN, level: 7 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: "building" }],
        tokens: [{ name: CHARACTERS.GRUMPY, tokenType: EARS }]
    },
    {
        name: "True Love's Kiss",
        characters: [
            { name: CHARACTERS.SNOW_PRINCE, level: 10 },
            { name: CHARACTERS.SNOW_WHITE, level: 10 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.SNEEZY, tokenType: TOKEN }]
    },
    {
        name: "Speak of Snow White",
        characters: [
            { name: CHARACTERS.SNOW_PRINCE, level: 8 },
            { name: CHARACTERS.DOC, level: 8 }
        ],
        time: "24h",
        required: [
            {
                name: BUILDINGS.SNOW_WHITE_SCARY,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.BASHFUL, tokenType: TOKEN }]
    },
    //bashful
    {
        name: "Washing Up with Bashful",
        characters: [{ name: CHARACTERS.BASHFUL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.SNOW_WHITE, tokenType: COMMON }]
    },
    {
        name: "Play the Accordion",
        characters: [{ name: CHARACTERS.BASHFUL, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DOPEY, tokenType: EARS },
            { name: CHARACTERS.SNOW_WHITE, tokenType: EARS }
        ]
    },
    {
        name: "Evade the Queen",
        characters: [{ name: CHARACTERS.BASHFUL, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DOC, tokenType: TOKEN },
            { name: CHARACTERS.SLEEPY, tokenType: EARS }
        ]
    },
    {
        name: "Mining, Marching, Singing",
        characters: [
            { name: CHARACTERS.BASHFUL, level: 4 },
            { name: CHARACTERS.HAPPY, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.SEVEN_DWARFS_MINE }],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: EARS }]
    },
    {
        name: "Search for Snow White",
        characters: [{ name: CHARACTERS.BASHFUL, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.SNOW_WHITE_SCARY }],
        tokens: [{ name: CHARACTERS.SNOW_PRINCE, tokenType: TOKEN }]
    },
    {
        name: "Dig Till Night",
        characters: [{ name: CHARACTERS.BASHFUL, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.SEVEN_DWARFS_MINE }],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: TOKEN }]
    },
    {
        name: "Attempt to Speak",
        characters: [{ name: CHARACTERS.BASHFUL, level: 10 }],
        time: "24h",
        tokens: [
            { name: CHARACTERS.GRUMPY, tokenType: TOKEN },
            { name: CHARACTERS.GRUMPY, tokenType: EARS }
        ]
    },
    //doc
    {
        name: "Washing Up with Doc",
        characters: [{ name: CHARACTERS.DOC, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.SNOW_WHITE, tokenType: COMMON },
            { name: CHARACTERS.SNEEZY, tokenType: TOKEN }
        ]
    },
    {
        name: "Stay Clear of the Queen",
        characters: [{ name: CHARACTERS.DOC, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.HAPPY, tokenType: TOKEN }]
    },
    {
        name: "Dig the Whole Day Through",
        characters: [{ name: CHARACTERS.DOC, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.SEVEN_DWARFS_MINE }],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: EARS }]
    },
    {
        name: "Play the Bass",
        characters: [{ name: CHARACTERS.DOC, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DOPEY, tokenType: EARS },
            { name: CHARACTERS.SLEEPY, tokenType: TOKEN }
        ]
    },
    {
        name: "Discussing Mining",
        characters: [{ name: CHARACTERS.DOC }, { name: CHARACTERS.SNEEZY }],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BASHFUL, tokenType: EARS }]
    },
    {
        name: 'Sweeping "Dud"-monds Away!',
        characters: [
            { name: CHARACTERS.DOC, level: 2 },
            { name: CHARACTERS.DOPEY, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.SEVEN_DWARFS_MINE }],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: TOKEN }]
    },
    {
        name: "Keep Watch for Trouble",
        characters: [{ name: CHARACTERS.DOC, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.SNOW_WHITE_SCARY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SNOW_WHITE, tokenType: TOKEN },
            { name: CHARACTERS.SNOW_PRINCE, tokenType: EARS }
        ]
    },
    {
        name: "Wandering with Purpose",
        characters: [{ name: CHARACTERS.DOC, level: 10 }],
        time: "24h",
        tokens: [
            { name: CHARACTERS.GRUMPY, tokenType: TOKEN },
            { name: CHARACTERS.GRUMPY, tokenType: EARS }
        ]
    },
    //sneezy
    {
        name: "Washing Up with Sneezy",
        characters: [{ name: CHARACTERS.SNEEZY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.SNOW_WHITE, tokenType: COMMON },
            { name: CHARACTERS.DOPEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Play the Banjo",
        characters: [{ name: CHARACTERS.SNEEZY, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HAPPY, tokenType: TOKEN },
            { name: CHARACTERS.SNOW_WHITE, tokenType: EARS }
        ]
    },
    {
        name: "Try Not to Sneeze",
        characters: [{ name: CHARACTERS.SNEEZY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DOC, tokenType: TOKEN },
            { name: CHARACTERS.SLEEPY, tokenType: EARS }
        ]
    },
    {
        name: "Search for Hidden Dishes",
        characters: [
            { name: CHARACTERS.SNEEZY, level: 3 },
            { name: CHARACTERS.HAPPY, level: 3 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ]
    },
    {
        name: "Taking a Break",
        characters: [
            { name: CHARACTERS.SNEEZY, level: 4 },
            { name: CHARACTERS.SLEEPY, level: 3 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.THE_QUEEN, tokenType: EARS }]
    },
    {
        name: "Dig Everything in Sight",
        characters: [{ name: CHARACTERS.SNEEZY, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.SEVEN_DWARFS_MINE }],
        tokens: [
            { name: CHARACTERS.GRUMPY, tokenType: EARS },
            { name: CHARACTERS.SNOW_PRINCE, tokenType: TOKEN }
        ]
    },
    //dopey
    {
        name: "Washing Up with Dopey",
        characters: [{ name: CHARACTERS.DOPEY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.SNOW_WHITE, tokenType: COMMON },
            { name: CHARACTERS.DOC, tokenType: TOKEN },
            { name: CHARACTERS.SNEEZY, tokenType: EARS }
        ]
    },
    {
        name: "Play the Cymbals",
        characters: [{ name: CHARACTERS.DOPEY, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BASHFUL, tokenType: TOKEN }]
    },
    {
        name: "Chasing Monsters Down",
        characters: [{ name: CHARACTERS.DOPEY, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.HAPPY, tokenType: EARS }]
    },
    {
        name: "Expressive Impressions",
        characters: [{ name: CHARACTERS.DOPEY, level: 3 }],
        time: "12h",
        tokens: [{ name: CHARACTERS.GRUMPY, tokenType: EARS }]
    },
    //happy
    {
        name: "Washing Up with Happy",
        characters: [{ name: CHARACTERS.HAPPY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.SNOW_WHITE, tokenType: COMMON },
            { name: CHARACTERS.SNOW_WHITE, tokenType: EARS },
            { name: CHARACTERS.DOC, tokenType: TOKEN }
        ]
    },
    {
        name: "Play the Drums",
        characters: [{ name: CHARACTERS.HAPPY, level: 4 }],
        time: "2h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.SNEEZY, tokenType: TOKEN },
            { name: CHARACTERS.SLEEPY, tokenType: EARS }
        ]
    },
    {
        name: "Sneaking Up on Monsters",
        characters: [{ name: CHARACTERS.HAPPY, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SNOW_WHITE, tokenType: TOKEN }]
    },
    {
        name: "Thinking of Stolen Kisses",
        characters: [{ name: CHARACTERS.HAPPY, level: 8 }],
        time: "6h",
        required: [
            { name: BUILDINGS.SNOW_WHITE_SCARY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DOPEY, tokenType: TOKEN },
            { name: CHARACTERS.DOPEY, tokenType: EARS }
        ]
    },
    {
        name: "Brighten Up the Day",
        characters: [{ name: CHARACTERS.HAPPY, level: 1 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.GRUMPY, tokenType: TOKEN },
            { name: CHARACTERS.SNOW_PRINCE, tokenType: EARS }
        ]
    },
    //grumpy
    {
        name: "Washing Up with Grumpy",
        characters: [{ name: CHARACTERS.GRUMPY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.SNOW_WHITE, tokenType: COMMON },
            { name: CHARACTERS.DOPEY, tokenType: TOKEN },
            { name: CHARACTERS.DOPEY, tokenType: EARS },
            { name: CHARACTERS.DOC, tokenType: EARS },
            { name: CHARACTERS.SNEEZY, tokenType: TOKEN }
        ]
    },
    {
        name: "Look Out for the Queen",
        characters: [{ name: CHARACTERS.GRUMPY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SNOW_WHITE, tokenType: TOKEN },
            { name: CHARACTERS.SNOW_WHITE, tokenType: EARS }
        ]
    },
    {
        name: "Play the Organ",
        characters: [{ name: CHARACTERS.GRUMPY, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BASHFUL, tokenType: TOKEN },
            { name: CHARACTERS.BASHFUL, tokenType: EARS },
            { name: CHARACTERS.SLEEPY, tokenType: TOKEN },
            { name: CHARACTERS.SLEEPY, tokenType: EARS }
        ]
    },
    {
        name: "March On",
        characters: [{ name: CHARACTERS.GRUMPY, level: 8 }],
        time: "6h",
        required: [
            { name: BUILDINGS.SNOW_WHITE_SCARY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.HAPPY, tokenType: TOKEN },
            { name: CHARACTERS.HAPPY, tokenType: EARS },
            { name: CHARACTERS.PETER, tokenType: TOKEN }
        ]
    },
    {
        name: "Keep Working",
        characters: [
            { name: CHARACTERS.GRUMPY, level: 6 },
            { name: CHARACTERS.DOPEY, level: 7 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_MINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.SNOW_PRINCE, tokenType: EARS }]
    },
    {
        name: "A Serious Walk",
        characters: [{ name: CHARACTERS.GRUMPY, level: 2 }],
        time: "12h",
        tokens: [
            { name: CHARACTERS.GRUMPY, tokenType: TOKEN },
            { name: CHARACTERS.GRUMPY, tokenType: EARS }
        ]
    },
    {
        name: "Dig with a Shovel",
        characters: [{ name: CHARACTERS.GRUMPY, level: 5 }],
        time: "8h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_MINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.TIMOTHY, tokenType: TOKEN }]
    },
    //sleepy
    {
        name: "Washing Up with Sleepy",
        characters: [{ name: CHARACTERS.SLEEPY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.SNOW_WHITE, tokenType: COMMON }]
    },
    {
        name: "Play the Flute",
        characters: [{ name: CHARACTERS.SLEEPY, level: 4 }],
        time: "4h",
        required: [
            { name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DOC, tokenType: EARS },
            { name: CHARACTERS.HAPPY, tokenType: TOKEN }
        ]
    },
    {
        name: "Nap on the Stairs",
        characters: [{ name: CHARACTERS.SLEEPY, level: 6 }],
        time: "4h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DOPEY, tokenType: EARS },
            { name: CHARACTERS.SNEEZY, tokenType: TOKEN },
            { name: CHARACTERS.SNOW_PRINCE, tokenType: EARS }
        ]
    },
    {
        name: "Nap in the Woods",
        characters: [{ name: CHARACTERS.SLEEPY, level: 8 }],
        time: "6h",
        required: [
            { name: BUILDINGS.SNOW_WHITE_SCARY, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.BASHFUL, tokenType: TOKEN }]
    },
    {
        name: "Dig with a Pick",
        characters: [{ name: CHARACTERS.SLEEPY, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.SEVEN_DWARFS_MINE }],
        tokens: [{ name: CHARACTERS.GRUMPY, tokenType: TOKEN }]
    },
    //the queen
    {
        name: "Potion Crafting",
        characters: [{ name: CHARACTERS.THE_QUEEN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.SNOW_WHITE, tokenType: COMMON }]
    },
    {
        name: "Selling Apples",
        characters: [{ name: CHARACTERS.THE_QUEEN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.SEVEN_DWARFS_COTTAGE, type: "building" }]
    },
    {
        name: "Studying Potions",
        characters: [{ name: CHARACTERS.THE_QUEEN, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.MAGIC_MIRROR, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GRUMPY, tokenType: TOKEN },
            { name: CHARACTERS.GRUMPY, tokenType: EARS }
        ]
    },
    {
        name: "Questions for the Mirror",
        characters: [{ name: CHARACTERS.THE_QUEEN, level: 10 }],
        time: "24h",
        tokens: [{ name: CHARACTERS.SNOW_PRINCE, tokenType: TOKEN }]
    },
    //pooh //winnie the pooh
    {
        name: "Afternoon Snack",
        characters: [{ name: CHARACTERS.POOH, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.WTP, tokenType: COMMON },
            { name: CHARACTERS.TIGGER, tokenType: EARS }
        ]
    },
    {
        name: "Looking for Rabbit",
        characters: [{ name: CHARACTERS.POOH, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RABBIT, tokenType: EARS },
            { name: CHARACTERS.KANGA, tokenType: TOKEN },
            { name: CHARACTERS.ROO, tokenType: EARS }
        ]
    },
    {
        name: "Looking for a Snack",
        characters: [{ name: CHARACTERS.POOH, level: 4 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MANY_ADVENTURES, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.TIGGER, tokenType: TOKEN },
            { name: CHARACTERS.PIGLET, tokenType: EARS }
        ]
    },
    {
        name: "Gathering Honey",
        characters: [{ name: CHARACTERS.POOH, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.POOH_HUNNY_HUNT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.EEYORE, tokenType: TOKEN },
            { name: CHARACTERS.EEYORE, tokenType: EARS },
            { name: CHARACTERS.PIGLET, tokenType: TOKEN }
        ]
    },
    {
        name: "Looking for Eeyore",
        characters: [{ name: CHARACTERS.POOH, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.EEYORE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: TOKEN },
            { name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: EARS }
        ]
    },
    {
        name: "Everything is Honey!",
        characters: [{ name: CHARACTERS.POOH }],
        time: "4h",
        required: [
            {
                type: REQ_TYPES.COSTUME,
                character: CHARACTERS.POOH,
                name: "Honey Day"
            }
        ],
        tokens: []
    },
    {
        name: "Stuck at Rabbit's",
        characters: [
            { name: CHARACTERS.POOH, level: 6 },
            { name: CHARACTERS.PIGLET, level: 6 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: "building" }],
        tokens: []
    },
    //pooh end
    //eeyore
    {
        name: "Enjoying the Weather",
        characters: [{ name: CHARACTERS.EEYORE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.WTP, tokenType: COMMON },
            { name: CHARACTERS.ROO, tokenType: EARS }
        ]
    },
    {
        name: "Eat Some Thistle",
        characters: [{ name: CHARACTERS.EEYORE, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.EEYORE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RABBIT, tokenType: EARS },
            { name: CHARACTERS.ROO, tokenType: TOKEN }
        ]
    },
    {
        name: "Say Hello to Rabbit",
        characters: [{ name: CHARACTERS.EEYORE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: EARS },
            { name: CHARACTERS.PIGLET, tokenType: EARS }
        ]
    },
    {
        name: "Wander to Pooh's House",
        characters: [{ name: CHARACTERS.EEYORE, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MANY_ADVENTURES, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: TOKEN },
            { name: CHARACTERS.KANGA, tokenType: TOKEN },
            { name: CHARACTERS.POOH, tokenType: EARS }
        ]
    },
    {
        name: "Look for the Tail",
        characters: [{ name: CHARACTERS.EEYORE, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.POOH_HUNNY_HUNT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: TOKEN },
            { name: CHARACTERS.OWL, tokenType: EARS }
        ]
    },
    //tigger
    {
        name: "Showing Off the Bounce",
        characters: [{ name: CHARACTERS.TIGGER, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.WTP, tokenType: COMMON },
            { name: CHARACTERS.RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.RABBIT, tokenType: EARS },
            { name: CHARACTERS.KANGA, tokenType: EARS }
        ]
    },
    {
        name: "Visiting Rabbit's Home",
        characters: [{ name: CHARACTERS.TIGGER, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PIGLET, tokenType: TOKEN },
            { name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: EARS }
        ]
    },
    {
        name: "Investigating Pooh's House",
        characters: [{ name: CHARACTERS.TIGGER, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MANY_ADVENTURES, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.EEYORE, tokenType: TOKEN },
            { name: CHARACTERS.EEYORE, tokenType: EARS },
            { name: CHARACTERS.POOH, tokenType: TOKEN }
        ]
    },
    {
        name: "Bouncing Around Eeyore's",
        characters: [{ name: CHARACTERS.TIGGER, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.EEYORE_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.OWL, tokenType: EARS }]
    },
    //kanga
    {
        name: "Knitting Scarves",
        characters: [{ name: CHARACTERS.KANGA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WTP, tokenType: COMMON }]
    },
    {
        name: "Visiting Pooh's Home",
        characters: [{ name: CHARACTERS.KANGA, level: 3 }],
        time: "2h",
        required: [
            { name: BUILDINGS.MANY_ADVENTURES, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: EARS },
            { name: CHARACTERS.RABBIT, tokenType: EARS },
            { name: CHARACTERS.EEYORE, tokenType: EARS },
            { name: CHARACTERS.PIGLET, tokenType: EARS }
        ]
    },
    {
        name: "Collecting Honey",
        characters: [{ name: CHARACTERS.KANGA, level: 6 }],
        time: "4h",
        required: [
            { name: BUILDINGS.POOH_HUNNY_HUNT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.POOH, tokenType: TOKEN }]
    },
    {
        name: "Discussing Plans",
        characters: [
            { name: CHARACTERS.KANGA, level: 3 },
            { name: CHARACTERS.RABBIT, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: TOKEN }]
    },
    {
        name: "Checking On Rabbit",
        characters: [{ name: CHARACTERS.KANGA, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ROO, tokenType: TOKEN },
            { name: CHARACTERS.OWL, tokenType: TOKEN }
        ]
    },
    {
        name: "Family Visit",
        characters: [
            { name: CHARACTERS.KANGA, level: 4 },
            { name: CHARACTERS.ROO, level: 4 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.MANY_ADVENTURES, type: REQ_TYPES.BUILDING }
        ],
        tokens: []
    },
    //roo
    {
        name: "Drawing Pictures",
        characters: [{ name: CHARACTERS.ROO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WTP, tokenType: COMMON }]
    },
    {
        name: "Helping Out",
        characters: [{ name: CHARACTERS.ROO, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: EARS },
            { name: CHARACTERS.PIGLET, tokenType: EARS }
        ]
    },
    {
        name: "Drawing Pictures for Pooh",
        characters: [{ name: CHARACTERS.ROO, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MANY_ADVENTURES, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.KANGA, tokenType: EARS },
            { name: CHARACTERS.EEYORE, tokenType: TOKEN }
        ]
    },
    {
        name: "Playing with Honey Pots",
        characters: [{ name: CHARACTERS.ROO, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.POOH_HUNNY_HUNT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.POOH, tokenType: EARS },
            { name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Adding Support",
        characters: [{ name: CHARACTERS.ROO, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.EEYORE_HOUSE, type: "building" }],
        tokens: [{ name: CHARACTERS.OWL, tokenType: TOKEN }]
    },
    //piglet
    {
        name: "Oh Dear!",
        characters: [{ name: CHARACTERS.PIGLET, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WTP, tokenType: COMMON }]
    },
    {
        name: "Visiting a Friend",
        characters: [{ name: CHARACTERS.PIGLET, level: 3 }],
        time: "2h",
        required: [
            { name: BUILDINGS.MANY_ADVENTURES, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.KANGA, tokenType: TOKEN },
            { name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: EARS }
        ]
    },
    {
        name: "Admiring the Garden",
        characters: [{ name: CHARACTERS.PIGLET, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: TOKEN },
            { name: CHARACTERS.RABBIT, tokenType: TOKEN },
            { name: CHARACTERS.EEYORE, tokenType: TOKEN }
        ]
    },
    {
        name: "Helping Hunt for Honey",
        characters: [{ name: CHARACTERS.PIGLET, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.POOH_HUNNY_HUNT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ROO, tokenType: TOKEN },
            { name: CHARACTERS.POOH, tokenType: TOKEN }
        ]
    },
    //rabbit
    {
        name: "Relaxing Afternoon",
        characters: [{ name: CHARACTERS.RABBIT, level: 3 }],
        time: "1h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.WTP, tokenType: COMMON }]
    },
    {
        name: "Everything in Place!",
        characters: [{ name: CHARACTERS.RABBIT, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.KANGA, tokenType: TOKEN },
            { name: CHARACTERS.ROO, tokenType: EARS },
            { name: CHARACTERS.EEYORE, tokenType: EARS }
        ]
    },
    {
        name: "Gardening in Peace",
        characters: [{ name: CHARACTERS.RABBIT, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: TOKEN },
            { name: CHARACTERS.PIGLET, tokenType: TOKEN },
            { name: CHARACTERS.POOH, tokenType: EARS },
            { name: CHARACTERS.OWL, tokenType: TOKEN }
        ]
    },
    {
        name: "Help Catalog",
        characters: [
            { name: CHARACTERS.RABBIT, level: 4 },
            { name: CHARACTERS.OWL, level: 4 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: EARS }]
    },
    //cr //christopher robin
    {
        name: "The Expedition",
        characters: [{ name: CHARACTERS.CHRISTOPHER_ROBIN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WTP, tokenType: COMMON }]
    },
    {
        name: "Helping at Rabbit's",
        characters: [{ name: CHARACTERS.CHRISTOPHER_ROBIN, level: 2 }],
        time: "2h",
        required: [{ name: "Rabbit's House", type: "building" }],
        tokens: [
            { name: CHARACTERS.RABBIT, tokenType: EARS },
            { name: CHARACTERS.TIGGER, tokenType: EARS }
        ]
    },
    {
        name: "Looking for Pooh Bear",
        characters: [{ name: CHARACTERS.CHRISTOPHER_ROBIN, level: 3 }],
        time: "4h",
        required: [
            {
                name: "The Many Adventures of Winnie the Pooh",
                type: "building"
            }
        ],
        tokens: [
            { name: CHARACTERS.EEYORE, tokenType: TOKEN },
            { name: CHARACTERS.PIGLET, tokenType: TOKEN },
            { name: CHARACTERS.KANGA, tokenType: EARS }
        ]
    },
    {
        name: "Repairing a Home",
        characters: [{ name: CHARACTERS.CHRISTOPHER_ROBIN, level: 4 }],
        time: "6h",
        required: [{ name: "Eeyore's House", type: "building" }],
        tokens: [
            { name: CHARACTERS.POOH, tokenType: TOKEN },
            { name: CHARACTERS.POOH, tokenType: EARS },
            { name: CHARACTERS.ROO, tokenType: TOKEN }
        ]
    },
    {
        name: "Collecting Snacks",
        characters: [{ name: CHARACTERS.CHRISTOPHER_ROBIN, level: 5 }],
        time: "8h",
        required: [
            { name: BUILDINGS.POOH_HUNNY_HUNT, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.TIA_DALMA, tokenType: EARS },
            { name: CHARACTERS.OWL, tokenType: TOKEN },
            { name: CHARACTERS.OWL, tokenType: EARS }
        ]
    },
    {
        name: "Helping with a Tail",
        characters: [
            { name: CHARACTERS.CHRISTOPHER_ROBIN, level: 8 },
            { name: CHARACTERS.EEYORE, level: 9 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.PETER, tokenType: TOKEN }]
    },
    //christopher robin end //cr end
    //owl
    {
        name: "Evaluate",
        characters: [{ name: "Owl", level: 1 }],
        time: "8h",
        tokens: [
            { name: GROUPS.WTP, tokenType: COMMON },
            { name: CHARACTERS.OWL, tokenType: TOKEN },
            { name: CHARACTERS.OWL, tokenType: EARS }
        ]
    },
    {
        name: "Something Borrowed",
        characters: [{ name: "Owl", level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.RABBIT_HOUSE, type: "building" }],
        tokens: [{ name: GROUPS.WTP, tokenType: COMMON }]
    },
    {
        name: "Gain Knowledge",
        characters: [{ name: "Owl", level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MANY_ADVENTURES, type: "building" }],
        tokens: [{ name: CHARACTERS.TIGGER, tokenType: TOKEN }]
    },
    {
        name: "Tea with Honey",
        characters: [{ name: "Owl", level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.POOH_HUNNY_HUNT, type: "building" }],
        tokens: [{ name: CHARACTERS.PIGLET, tokenType: TOKEN }]
    },
    {
        name: "Educate",
        characters: [
            { name: "Owl", level: 5 },
            { name: CHARACTERS.POOH, level: 5 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.MANY_ADVENTURES, type: "building" }],
        tokens: [
            { name: CHARACTERS.PIGLET, tokenType: EARS },
            { name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Study Structure",
        characters: [{ name: "Owl", level: 7 }],
        time: "8h",
        required: [{ name: BUILDINGS.EEYORE_HOUSE, type: "building" }],
        tokens: [
            { name: CHARACTERS.TIGGER, tokenType: EARS },
            { name: CHARACTERS.ROO, tokenType: TOKEN }
        ]
    },
    {
        name: "Explore Everything",
        characters: [
            { name: "Owl", level: 7 },
            { name: "Roo", level: 7 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.MANY_ADVENTURES, type: "building" }],
        tokens: [{ name: CHARACTERS.EEYORE, tokenType: EARS }]
    },
    {
        name: "Sticky and Springy",
        characters: [
            { name: "Owl", level: 8 },
            { name: "Tigger", level: 8 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.POOH_HUNNY_HUNT, type: "building" }],
        tokens: [
            { name: CHARACTERS.POOH, tokenType: TOKEN },
            { name: CHARACTERS.ROO, tokenType: EARS }
        ]
    },
    {
        name: "Calm Counseling",
        characters: [
            { name: "Owl", level: 10 },
            { name: "Eeyore", level: 10 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.EEYORE_HOUSE, type: "building" }],
        tokens: [{ name: CHARACTERS.POOH, tokenType: EARS }]
    },
    //owl end
    //lilo
    {
        name: "Playing with Scrump",
        characters: [{ name: CHARACTERS.LILO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LS, tokenType: COMMON }]
    },
    {
        name: "Taking Photos",
        characters: [{ name: CHARACTERS.LILO, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.LAHUI_BEACH, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.COBRA_BUBBLES, tokenType: TOKEN }]
    },
    {
        name: "Listening to Records",
        characters: [{ name: CHARACTERS.LILO, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.LILO_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NANI, tokenType: TOKEN },
            { name: CHARACTERS.JUMBA, tokenType: TOKEN },
            { name: CHARACTERS.PLEAKLEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Dance Practice",
        characters: [{ name: CHARACTERS.LILO, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.OHANA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ANGEL, tokenType: TOKEN },
            { name: CHARACTERS.STITCH, tokenType: TOKEN },
            { name: CHARACTERS.URSULA, tokenType: EARS }
        ]
    },
    //stitch
    {
        name: "Monster Act",
        characters: [{ name: CHARACTERS.STITCH, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LS, tokenType: COMMON },
            { name: CHARACTERS.PLEAKLEY, tokenType: EARS }
        ]
    },
    {
        name: "Raiding the Fridge",
        characters: [{ name: CHARACTERS.STITCH, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LILO_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NANI, tokenType: EARS },
            { name: CHARACTERS.COBRA_BUBBLES, tokenType: TOKEN },
            { name: CHARACTERS.ANGEL, tokenType: EARS }
        ]
    },
    {
        name: "Go to the Beach",
        characters: [{ name: CHARACTERS.STITCH, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LAHUI_BEACH, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NANI, tokenType: TOKEN },
            { name: CHARACTERS.LILO, tokenType: EARS },
            { name: CHARACTERS.PLEAKLEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Practicing Music",
        characters: [{ name: CHARACTERS.STITCH, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.OHANA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JUMBA, tokenType: TOKEN },
            { name: CHARACTERS.JUMBA, tokenType: EARS },
            { name: CHARACTERS.LILO, tokenType: TOKEN }
        ]
    },
    //nani
    {
        name: "Talking on the Phone",
        characters: [{ name: CHARACTERS.NANI, level: 3 }],
        time: "1h",
        required: [{ name: BUILDINGS.LILO_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.LS, tokenType: COMMON }]
    },
    {
        name: "Looking for Lilo",
        characters: [{ name: CHARACTERS.NANI, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.COBRA_BUBBLES, tokenType: TOKEN },
            { name: CHARACTERS.JUMBA, tokenType: EARS },
            { name: CHARACTERS.ANGEL, tokenType: EARS }
        ]
    },
    {
        name: "Surfing",
        characters: [{ name: CHARACTERS.NANI, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.LAHUI_BEACH, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PLEAKLEY, tokenType: TOKEN },
            { name: CHARACTERS.LILO, tokenType: TOKEN },
            { name: CHARACTERS.STITCH, tokenType: EARS }
        ]
    },
    {
        name: "Relax with Some Music",
        characters: [{ name: CHARACTERS.NANI, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.OHANA, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SCUTTLE, tokenType: EARS }]
    },
    //angel
    {
        name: "Singing",
        characters: [{ name: CHARACTERS.ANGEL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LS, tokenType: COMMON }]
    },
    {
        name: "Practice Song",
        characters: [{ name: CHARACTERS.ANGEL, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LILO_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PLEAKLEY, tokenType: EARS },
            { name: CHARACTERS.LILO, tokenType: EARS }
        ]
    },
    {
        name: "Enjoy the Sun",
        characters: [{ name: CHARACTERS.ANGEL, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LAHUI_BEACH, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NANI, tokenType: TOKEN },
            { name: CHARACTERS.COBRA_BUBBLES, tokenType: EARS },
            { name: CHARACTERS.JUMBA, tokenType: TOKEN }
        ]
    },
    {
        name: "Dance to the Music",
        characters: [{ name: CHARACTERS.ANGEL, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.OHANA, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.STITCH, tokenType: EARS }]
    },
    {
        name: "Shopping Together",
        characters: [
            { name: CHARACTERS.ANGEL, level: 6 },
            { name: CHARACTERS.PLEAKLEY, level: 5 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.URSULA, tokenType: TOKEN }]
    },
    //pleakley
    {
        name: "New Look",
        characters: [{ name: CHARACTERS.PLEAKLEY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LS, tokenType: COMMON },
            { name: CHARACTERS.NANI, tokenType: TOKEN },
            { name: CHARACTERS.NANI, tokenType: EARS },
            { name: CHARACTERS.COBRA_BUBBLES, tokenType: EARS }
        ]
    },
    {
        name: "Organize Papers",
        characters: [{ name: CHARACTERS.PLEAKLEY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LILO_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LILO, tokenType: TOKEN },
            { name: CHARACTERS.FLOUNDER, tokenType: EARS }
        ]
    },
    {
        name: "Relax on the Beach",
        characters: [{ name: CHARACTERS.PLEAKLEY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LAHUI_BEACH, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.JUMBA, tokenType: TOKEN },
            { name: CHARACTERS.JUMBA, tokenType: EARS },
            { name: CHARACTERS.STITCH, tokenType: TOKEN },
            { name: CHARACTERS.ERIC, tokenType: TOKEN }
        ]
    },
    //jumba
    {
        name: "Evil Genius",
        characters: [{ name: CHARACTERS.JUMBA, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.LS, tokenType: COMMON },
            { name: CHARACTERS.ANGEL, tokenType: EARS }
        ]
    },
    {
        name: "Tinker with Systems",
        characters: [{ name: CHARACTERS.JUMBA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LILO_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PLEAKLEY, tokenType: EARS },
            { name: CHARACTERS.LILO, tokenType: EARS },
            { name: CHARACTERS.ERIC, tokenType: EARS }
        ]
    },
    {
        name: "Work on Ideas",
        characters: [{ name: CHARACTERS.JUMBA, level: 1 }],
        time: "2h",
        required: [{ name: "Stitch's Great Escape" }],
        tokens: [
            { name: CHARACTERS.NANI, tokenType: EARS },
            { name: CHARACTERS.ANGEL, tokenType: TOKEN }
        ]
    },
    {
        name: "Dream Up New Experiments",
        characters: [{ name: CHARACTERS.JUMBA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LAHUI_BEACH, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.PLEAKLEY, tokenType: TOKEN },
            { name: CHARACTERS.COBRA_BUBBLES, tokenType: TOKEN },
            { name: CHARACTERS.STITCH, tokenType: EARS },
            { name: CHARACTERS.FLOUNDER, tokenType: TOKEN }
        ]
    },
    //cobra bubbles
    {
        name: "Investigating",
        characters: [{ name: CHARACTERS.COBRA_BUBBLES, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.LS, tokenType: COMMON }]
    },
    {
        name: "Waiting for a Call",
        characters: [{ name: CHARACTERS.COBRA_BUBBLES, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.LAHUI_BEACH, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NANI, tokenType: EARS },
            { name: CHARACTERS.JUMBA, tokenType: EARS },
            { name: CHARACTERS.LILO, tokenType: EARS },
            { name: CHARACTERS.PLEAKLEY, tokenType: EARS }
        ]
    },
    {
        name: "Keeping an Eye Out",
        characters: [{ name: CHARACTERS.COBRA_BUBBLES, level: 6 }],
        time: "4h",
        required: [{ name: BUILDINGS.OHANA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.STITCH, tokenType: TOKEN },
            { name: SPECIAL_ITEMS.BAG, type: "mini_event", tokenType: SPECIAL }
        ]
    },
    {
        name: "Visiting",
        characters: [{ name: CHARACTERS.COBRA_BUBBLES, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.LILO_HOUSE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ANGEL, tokenType: TOKEN },
            { name: CHARACTERS.SCUTTLE, tokenType: TOKEN }
        ]
    },
    //hiro
    {
        name: "Talk with Aunt Cass",
        characters: [{ name: CHARACTERS.HIRO, level: 4 }],
        time: "1h",
        required: [{ name: BUILDINGS.LUCKY_CAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.BH6, tokenType: COMMON }]
    },
    {
        name: "Looking for Ideas",
        characters: [{ name: CHARACTERS.HIRO, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.GOGO, tokenType: EARS },
            { name: CHARACTERS.HONEY_LEMON, tokenType: TOKEN }
        ]
    },
    {
        name: "Low Battery",
        characters: [
            { name: CHARACTERS.HIRO },
            { name: CHARACTERS.BAYMAX, level: 2 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.BAYMAX, tokenType: TOKEN }]
    },
    {
        name: "Create Training Courses",
        characters: [{ name: CHARACTERS.HIRO, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.FRED_GROUNDS, type: "building" }],
        tokens: [
            { name: CHARACTERS.FRED, tokenType: TOKEN },
            { name: CHARACTERS.YOKAI, tokenType: EARS }
        ]
    },
    {
        name: "Evening Flight",
        characters: [
            { name: CHARACTERS.HIRO, level: 3 },
            { name: CHARACTERS.BAYMAX, level: 3 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.SAN_FRAN, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BARBOSSA, tokenType: EARS }]
    },
    {
        name: "Selfie!",
        characters: [
            { name: CHARACTERS.HIRO, level: 3 },
            { name: CHARACTERS.HONEY_LEMON, level: 3 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.HIRO, tokenType: TOKEN },
            { name: CHARACTERS.HIRO, tokenType: EARS },
            { name: CHARACTERS.WASABI, tokenType: EARS }
        ]
    },
    //honey lemon
    {
        name: "Chemical Reaction!",
        characters: [{ name: CHARACTERS.HONEY_LEMON, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BH6, tokenType: COMMON }]
    },
    {
        name: "Relaxing at the Café",
        characters: [{ name: CHARACTERS.HONEY_LEMON, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LUCKY_CAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GOGO, tokenType: EARS },
            { name: CHARACTERS.FRED, tokenType: EARS }
        ]
    },
    {
        name: "Testing Theories",
        characters: [{ name: CHARACTERS.HONEY_LEMON, level: 6 }],
        time: "4h",
        required: [{ name: BUILDINGS.ITO_ROBOT_LAB, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BAYMAX, tokenType: EARS }]
    },
    {
        name: "Testing Equipment",
        characters: [{ name: CHARACTERS.HONEY_LEMON, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.FRED_GROUNDS }],
        tokens: [{ name: CHARACTERS.YOKAI, tokenType: TOKEN }]
    },
    {
        name: "Internal Attack",
        characters: [
            { name: CHARACTERS.HONEY_LEMON, level: 8 },
            { name: CHARACTERS.YOKAI, level: 8 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.FRED_GROUNDS }],
        tokens: [{ name: CHARACTERS.BARBOSSA, tokenType: TOKEN }]
    },
    //go go
    {
        name: "Testing Movements",
        characters: [{ name: CHARACTERS.GOGO, level: 1 }],
        time: "1h",
        tokens: [
            { name: "Big Hero 6", tokenType: COMMON },
            { name: CHARACTERS.HIRO, tokenType: TOKEN },
            { name: CHARACTERS.HIRO, tokenType: EARS }
        ]
    },
    {
        name: "Grabbing a Tea",
        characters: [{ name: CHARACTERS.GOGO, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.LUCKY_CAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GOGO, tokenType: TOKEN },
            { name: CHARACTERS.WASABI, tokenType: TOKEN }
        ]
    },
    {
        name: "Stroll through the City",
        characters: [{ name: CHARACTERS.GOGO, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.SAN_FRAN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.YOKAI, tokenType: TOKEN },
            { name: CHARACTERS.BAYMAX, tokenType: EARS }
        ]
    },
    {
        name: "Test New Wheels",
        characters: [{ name: CHARACTERS.GOGO, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.FRED_GROUNDS }],
        tokens: [
            { name: CHARACTERS.HONEY_LEMON, tokenType: EARS },
            { name: CHARACTERS.FRED, tokenType: EARS }
        ]
    },
    //fred
    {
        name: "Grabbing a Bite",
        characters: [{ name: CHARACTERS.FRED, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.LUCKY_CAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.BH6, tokenType: COMMON }]
    },
    {
        name: "Board Flipping",
        characters: [{ name: CHARACTERS.FRED, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.HONEY_LEMON, tokenType: TOKEN },
            { name: CHARACTERS.WASABI, tokenType: EARS }
        ]
    },
    {
        name: "Organizing Collections",
        characters: [{ name: CHARACTERS.FRED, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.FRED_GROUNDS }],
        tokens: [
            { name: CHARACTERS.YOKAI, tokenType: EARS },
            { name: CHARACTERS.BAYMAX, tokenType: TOKEN }
        ]
    },
    {
        name: "Super Jump!",
        characters: [{ name: CHARACTERS.FRED, level: 4 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.GOGO, tokenType: TOKEN }]
    },
    //wasabi
    {
        name: "Quick Practice",
        characters: [{ name: CHARACTERS.WASABI, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BH6, tokenType: COMMON }]
    },
    {
        name: "Driving Carefully Downtown",
        characters: [{ name: CHARACTERS.WASABI, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.SAN_FRAN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GOGO, tokenType: EARS },
            { name: CHARACTERS.HONEY_LEMON, tokenType: EARS }
        ]
    },
    {
        name: "Relaxing with Tea",
        characters: [{ name: CHARACTERS.WASABI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LUCKY_CAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.HIRO, tokenType: TOKEN },
            { name: CHARACTERS.FRED, tokenType: TOKEN },
            { name: CHARACTERS.YOKAI, tokenType: EARS }
        ]
    },
    {
        name: "Test Plasma Blades",
        characters: [{ name: CHARACTERS.WASABI, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.FRED_GROUNDS }],
        tokens: [{ name: CHARACTERS.BAYMAX, tokenType: EARS }]
    },
    //yokai: [
    {
        name: "Testing Microbots",
        characters: [{ name: CHARACTERS.YOKAI, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BH6, tokenType: COMMON }]
    },
    {
        name: "Monitoring for Intel",
        characters: [{ name: CHARACTERS.YOKAI, level: 5 }],
        time: "2h",
        required: [{ name: BUILDINGS.FRED_GROUNDS }],
        tokens: [
            { name: CHARACTERS.HONEY_LEMON, tokenType: EARS },
            { name: CHARACTERS.FRED, tokenType: EARS }
        ]
    },
    {
        name: "Undercover Scouting",
        characters: [{ name: CHARACTERS.YOKAI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LUCKY_CAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.HIRO, tokenType: TOKEN },
            { name: CHARACTERS.WASABI, tokenType: EARS },
            { name: CHARACTERS.BAYMAX, tokenType: TOKEN }
        ]
    },
    {
        name: "Setting Up a New Base",
        characters: [{ name: CHARACTERS.YOKAI, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.SAN_FRAN, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GOGO, tokenType: TOKEN },
            { name: CHARACTERS.GOGO, tokenType: EARS }
        ]
    },
    //baymax: [
    {
        name: "Hello, I Am Baymax",
        characters: [{ name: CHARACTERS.BAYMAX, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BH6, tokenType: COMMON }]
    },
    {
        name: "Pet Mochi",
        characters: [{ name: CHARACTERS.BAYMAX, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LUCKY_CAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.HIRO, tokenType: EARS },
            { name: CHARACTERS.HONEY_LEMON, tokenType: TOKEN }
        ]
    },
    {
        name: "Catch a Butterfly",
        characters: [{ name: CHARACTERS.BAYMAX, level: 6 }],
        time: "4h",
        required: [
            { name: "Armor", character: CHARACTERS.BAYMAX, type: "costume" }
        ],
        tokens: [
            { name: CHARACTERS.GOGO, tokenType: TOKEN },
            { name: CHARACTERS.FRED, tokenType: TOKEN }
        ]
    },
    {
        name: "Enjoy the Gardens",
        characters: [{ name: CHARACTERS.BAYMAX, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.FRED_GROUNDS }],
        tokens: [{ name: CHARACTERS.WASABI, tokenType: TOKEN }]
    },
    {
        name: "Charge Battery",
        characters: [{ name: CHARACTERS.BAYMAX, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.ITO_ROBOT_LAB, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.YOKAI, tokenType: TOKEN }]
    },
    //sebastian
    {
        name: "Composing a Masterpiece",
        characters: [{ name: CHARACTERS.SEBASTIAN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TLM, tokenType: COMMON }]
    },
    {
        name: "Thinking of Solutions",
        characters: [{ name: CHARACTERS.SEBASTIAN, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.ERIC, tokenType: TOKEN },
            { name: CHARACTERS.SCUTTLE, tokenType: TOKEN },
            { name: CHARACTERS.TRITON, tokenType: EARS },
            { name: CHARACTERS.ARIEL, tokenType: TOKEN },
            { name: CHARACTERS.NAVEEN, tokenType: TOKEN }
        ]
    },
    {
        name: "Investigate for the King",
        characters: [{ name: CHARACTERS.SEBASTIAN, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.FLOUNDER, tokenType: EARS }]
    },
    //eric
    {
        name: "Dreaming of a Voice",
        characters: [{ name: CHARACTERS.ERIC, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.TLM, tokenType: COMMON },
            { name: CHARACTERS.SEBASTIAN, tokenType: TOKEN },
            { name: CHARACTERS.SEBASTIAN, tokenType: EARS },
            { name: CHARACTERS.SCUTTLE, tokenType: EARS }
        ]
    },
    {
        name: "Speak with a King",
        characters: [{ name: CHARACTERS.ERIC, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.ATLANTICA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLOUNDER, tokenType: TOKEN },
            { name: CHARACTERS.ARIEL, tokenType: EARS }
        ]
    },
    {
        name: "Listen to the Sea",
        characters: [{ name: CHARACTERS.ERIC, level: 1 }],
        time: "1h",
        level: 1,
        tokens: [{ name: CHARACTERS.URSULA, tokenType: TOKEN }]
    },
    {
        name: "Walk Along the Beach",
        characters: [{ name: CHARACTERS.ERIC, level: 1 }],
        time: "2h",
        level: 2,
        required: [{ name: BUILDINGS.ARIEL_GROTTO, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.TRITON, tokenType: TOKEN }]
    },
    //scuttle
    {
        name: "Setting the Mood",
        characters: [{ name: CHARACTERS.SCUTTLE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TLM, tokenType: COMMON }]
    },
    {
        name: "Inspecting Items",
        characters: [{ name: CHARACTERS.SCUTTLE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ARIEL_GROTTO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ERIC, tokenType: EARS },
            { name: CHARACTERS.SEBASTIAN, tokenType: EARS },
            { name: CHARACTERS.TRITON, tokenType: TOKEN }
        ]
    },
    {
        name: "Toying with a Spyglass",
        characters: [{ name: CHARACTERS.SCUTTLE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.ATLANTICA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FLOUNDER, tokenType: TOKEN },
            { name: CHARACTERS.ARIEL, tokenType: EARS }
        ]
    },
    {
        name: "Speaking of Snarblatts",
        characters: [
            { name: CHARACTERS.SCUTTLE, level: 3 },
            { name: CHARACTERS.SEBASTIAN, level: 3 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.URSULA, tokenType: TOKEN }]
    },
    //flounder
    {
        name: "Scouting for News",
        characters: [{ name: CHARACTERS.FLOUNDER, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TLM, tokenType: COMMON }]
    },
    {
        name: "Hide Gifts for Ariel",
        characters: [{ name: CHARACTERS.FLOUNDER, level: 1 }],
        required: [{ name: BUILDINGS.ARIEL_GROTTO, type: REQ_TYPES.BUILDING }],
        time: "2h",
        level: 2,
        tokens: [
            { name: CHARACTERS.SEBASTIAN, tokenType: EARS },
            { name: CHARACTERS.TRITON, tokenType: EARS }
        ]
    },
    {
        name: "Swim Around the City",
        characters: [{ name: CHARACTERS.FLOUNDER, level: 1 }],
        required: [{ name: BUILDINGS.ATLANTICA, type: REQ_TYPES.BUILDING }],
        time: "4h",
        level: 4,
        tokens: [
            { name: CHARACTERS.ERIC, tokenType: TOKEN },
            { name: CHARACTERS.ARIEL, tokenType: TOKEN },
            { name: CHARACTERS.SCUTTLE, tokenType: TOKEN }
        ]
    },
    {
        name: "Search for Treasure",
        characters: [{ name: CHARACTERS.FLOUNDER, level: 1 }],
        time: "1h",
        level: 3,
        tokens: [{ name: CHARACTERS.URSULA, tokenType: TOKEN }]
    },
    //triton //king triton
    {
        name: "Enjoying the Kingdom",
        characters: [{ name: CHARACTERS.TRITON, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TLM, tokenType: COMMON }]
    },
    {
        name: "Visiting Ariel",
        characters: [{ name: CHARACTERS.TRITON, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ARIEL_GROTTO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SEBASTIAN, tokenType: TOKEN },
            { name: CHARACTERS.ERIC, tokenType: EARS },
            { name: CHARACTERS.FLOUNDER, tokenType: EARS }
        ]
    },
    {
        name: "Speak with Citizens",
        characters: [{ name: CHARACTERS.TRITON, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.ATLANTICA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SCUTTLE, tokenType: TOKEN },
            { name: CHARACTERS.URSULA, tokenType: EARS },
            { name: CHARACTERS.ARIEL, tokenType: TOKEN }
        ]
    },
    //ursula
    {
        name: "Bemoaning Current Life",
        characters: [{ name: CHARACTERS.URSULA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TLM, tokenType: COMMON }]
    },
    {
        name: "Spy on the Princess",
        characters: [{ name: CHARACTERS.URSULA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ARIEL_GROTTO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SEBASTIAN, tokenType: EARS },
            { name: CHARACTERS.TRITON, tokenType: TOKEN },
            { name: CHARACTERS.FLOUNDER, tokenType: EARS }
        ]
    },
    {
        name: "Explore New Deals",
        characters: [{ name: CHARACTERS.URSULA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.ATLANTICA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ERIC, tokenType: TOKEN },
            { name: CHARACTERS.SCUTTLE, tokenType: EARS },
            { name: CHARACTERS.ARIEL, tokenType: EARS }
        ]
    },
    //ariel
    {
        name: "Trying New Things",
        characters: [{ name: CHARACTERS.ARIEL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TLM, tokenType: COMMON }]
    },
    {
        name: "Add to Collection",
        characters: [{ name: CHARACTERS.ARIEL, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.ARIEL_GROTTO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.ERIC, tokenType: EARS },
            { name: CHARACTERS.SEBASTIAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Something is Starting",
        characters: [{ name: CHARACTERS.ARIEL, level: 1 }],
        time: "4h",
        required: [
            {
                name: COSTUMES.MERMAID,
                character: CHARACTERS.ARIEL,
                type: REQ_TYPES.COSTUME
            }
        ],
        tokens: [{ name: CHARACTERS.SCUTTLE, tokenType: TOKEN }]
    },
    {
        name: "Visit Sisters",
        characters: [{ name: CHARACTERS.ARIEL, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.ATLANTICA, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.TRITON, tokenType: EARS },
            { name: CHARACTERS.FLOUNDER, tokenType: TOKEN }
        ]
    },
    {
        name: "Part of Your World",
        characters: [
            { name: CHARACTERS.ARIEL, level: 7 },
            { name: CHARACTERS.ERIC, level: 7 }
        ],
        time: "6h",
        required: [
            {
                name: COSTUMES.MERMAID,
                character: CHARACTERS.ARIEL,
                type: REQ_TYPES.COSTUME
            },
            { name: BUILDINGS.ARIEL_GROTTO, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.CRIKEE, tokenType: EARS }]
    },
    {
        name: "Share Hair Accessory Tips",
        characters: [{ name: CHARACTERS.ARIEL, level: 1 }],
        time: "2h",
        required: [
            {
                name: COSTUMES.COMFY,
                character: CHARACTERS.ARIEL,
                type: REQ_TYPES.COSTUME
            },
            {
                name: BUILDINGS.PRINCESS_DRESSING_ROOM,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.BELLE, tokenType: TOKEN }]
    },
    {
        name: "The Dinglehopper's Value",
        characters: [{ name: CHARACTERS.ARIEL, level: 10 }],
        time: "6h",
        required: [
            {
                name: COSTUMES.COMFY,
                character: CHARACTERS.ARIEL,
                type: REQ_TYPES.COSTUME
            },
            {
                name: BUILDINGS.PRINCESS_DRESSING_ROOM,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.BELLE, tokenType: EARS }]
    },
    //ralph
    {
        name: "Explore the Sites",
        characters: [{ name: CHARACTERS.RALPH, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.INTERNET, type: "building" }],
        tokens: [{ name: GROUPS.WIR, tokenType: COMMON }]
    },
    {
        name: "A Quick Snack",
        characters: [{ name: CHARACTERS.RALPH, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.CALHOUN, tokenType: TOKEN },
            { name: CHARACTERS.SPAMLEY, tokenType: TOKEN },
            { name: CHARACTERS.VANELLOPE, tokenType: TOKEN },
            { name: CHARACTERS.YESSS, tokenType: EARS },
            { name: CHARACTERS.SHANK, tokenType: TOKEN }
        ]
    },
    {
        name: "Create Videos",
        characters: [{ name: CHARACTERS.RALPH, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.BUZZZTUBE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.FELIX, tokenType: EARS }]
    },
    {
        name: "Watch a Race",
        characters: [{ name: CHARACTERS.RALPH, level: 4 }],
        time: "6h",
        required: [
            { name: BUILDINGS.SLAUGHTER_RACE, type: REQ_TYPES.BUILDING }
        ],
        tokens: []
    },
    {
        name: "Clean Up the Dump",
        characters: [{ name: CHARACTERS.RALPH, level: 4 }],
        time: "8h",
        tokens: [{ name: CHARACTERS.GORD, tokenType: TOKEN }]
    },
    //vanellope
    {
        name: "Using the Glitch",
        characters: [{ name: CHARACTERS.VANELLOPE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WIR, tokenType: COMMON }]
    },
    {
        name: "Check Out the Sites",
        characters: [{ name: CHARACTERS.VANELLOPE, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.INTERNET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RALPH, tokenType: TOKEN },
            { name: CHARACTERS.CALHOUN, tokenType: EARS }
        ]
    },
    {
        name: "Relax with Friends",
        characters: [{ name: CHARACTERS.VANELLOPE, level: 1 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.SPAMLEY, tokenType: TOKEN }]
    },
    {
        name: "Comment on Videos",
        characters: [{ name: CHARACTERS.VANELLOPE, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.BUZZZTUBE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.YESSS, tokenType: EARS },
            { name: CHARACTERS.SHANK, tokenType: EARS }
        ]
    },
    {
        name: "Visiting Others",
        characters: [{ name: CHARACTERS.VANELLOPE, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.NICELAND, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GORD, tokenType: EARS }]
    },
    //felix
    {
        name: "I Can Fix It!",
        characters: [{ name: CHARACTERS.FELIX, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WIR, tokenType: COMMON }]
    },
    {
        name: "Checking the New Connection",
        characters: [{ name: CHARACTERS.FELIX, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.INTERNET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RALPH, tokenType: EARS },
            { name: CHARACTERS.SHANK, tokenType: TOKEN },
            { name: CHARACTERS.SHANK, tokenType: EARS }
        ]
    },
    {
        name: "Visiting the Nicelanders",
        characters: [{ name: CHARACTERS.FELIX, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.NICELAND, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SPAMLEY, tokenType: TOKEN },
            { name: CHARACTERS.VANELLOPE, tokenType: TOKEN }
        ]
    },
    //calhoun
    {
        name: "Follow the Readings",
        characters: [{ name: CHARACTERS.CALHOUN, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.WIR, tokenType: COMMON },
            { name: CHARACTERS.RALPH, tokenType: TOKEN },
            { name: CHARACTERS.RALPH, tokenType: EARS },
            { name: CHARACTERS.SPAMLEY, tokenType: EARS }
        ]
    },
    {
        name: "Check for Trouble",
        characters: [{ name: CHARACTERS.CALHOUN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.INTERNET, type: "building" }],
        tokens: [{ name: CHARACTERS.GORD, tokenType: TOKEN }]
    },
    {
        name: "Heading Home",
        characters: [{ name: CHARACTERS.CALHOUN, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.NICELAND, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.VANELLOPE, tokenType: EARS },
            { name: CHARACTERS.FELIX, tokenType: TOKEN },
            { name: CHARACTERS.SHANK, tokenType: TOKEN }
        ]
    },
    //spamley
    {
        name: "Clickbait",
        characters: [{ name: CHARACTERS.SPAMLEY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WIR, tokenType: COMMON }]
    },
    {
        name: "Pop Around",
        characters: [{ name: CHARACTERS.SPAMLEY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.INTERNET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CALHOUN, tokenType: EARS },
            { name: CHARACTERS.YESSS, tokenType: TOKEN }
        ]
    },
    {
        name: "Collect New Ads",
        characters: [{ name: CHARACTERS.SPAMLEY, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.NICELAND, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.VANELLOPE, tokenType: EARS },
            { name: CHARACTERS.FELIX, tokenType: TOKEN },
            { name: CHARACTERS.SHANK, tokenType: TOKEN }
        ]
    },
    {
        name: "Show Off Ad Options",
        characters: [
            { name: CHARACTERS.SPAMLEY, level: 8 },
            { name: CHARACTERS.YESSS, level: 8 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.INTERNET, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GORD, tokenType: EARS }]
    },
    //yesss
    {
        name: "The Latest Trends",
        characters: [{ name: CHARACTERS.YESSS, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WIR, tokenType: COMMON }]
    },
    {
        name: "Curating Videos",
        characters: [{ name: CHARACTERS.YESSS, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.INTERNET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RALPH, tokenType: TOKEN },
            { name: CHARACTERS.VANELLOPE, tokenType: EARS },
            { name: CHARACTERS.FELIX, tokenType: EARS }
        ]
    },
    {
        name: "Counting the Hearts",
        characters: [{ name: CHARACTERS.YESSS, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.BUZZZTUBE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CALHOUN, tokenType: TOKEN },
            { name: CHARACTERS.SPAMLEY, tokenType: TOKEN },
            { name: CHARACTERS.SHANK, tokenType: EARS }
        ]
    },
    //shank
    {
        name: "Strolling Around",
        characters: [{ name: CHARACTERS.SHANK, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.WIR, tokenType: COMMON }]
    },
    {
        name: "Gathering Game Info",
        characters: [{ name: CHARACTERS.SHANK, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.INTERNET, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.RALPH, tokenType: EARS },
            { name: CHARACTERS.CALHOUN, tokenType: EARS },
            { name: CHARACTERS.YESSS, tokenType: TOKEN }
        ]
    },
    {
        name: "Checking Out BuzzzTube",
        characters: [{ name: CHARACTERS.SHANK, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.BUZZZTUBE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.FELIX, tokenType: EARS },
            { name: CHARACTERS.VANELLOPE, tokenType: TOKEN },
            { name: CHARACTERS.SPAMLEY, tokenType: EARS }
        ]
    },
    {
        name: "Helpful Suggestions",
        characters: [
            { name: CHARACTERS.SHANK, level: 6 },
            { name: CHARACTERS.RALPH, level: 6 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.INTERNET, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GORD, tokenType: EARS }]
    },
    //gord
    {
        name: "Go on Call",
        characters: [{ name: CHARACTERS.GORD, level: 1 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.GORD, tokenType: TOKEN },
            { name: CHARACTERS.GORD, tokenType: EARS }
        ]
    },
    {
        name: "Pop Purchases",
        characters: [{ name: CHARACTERS.GORD, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.BUZZZTUBE, type: "building" }],
        tokens: [{ name: CHARACTERS.RALPH, tokenType: TOKEN }]
    },
    {
        name: "1337",
        characters: [{ name: CHARACTERS.GORD, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.INTERNET, type: "building" }],
        tokens: [
            { name: CHARACTERS.RALPH, tokenType: EARS },
            { name: CHARACTERS.CALHOUN, tokenType: TOKEN }
        ]
    },
    {
        name: "Research Hot Items",
        characters: [{ name: CHARACTERS.GORD, level: 6 }],
        time: "4h",
        required: [{ name: BUILDINGS.BUZZZTUBE, type: "building" }],
        tokens: [{ name: CHARACTERS.VANELLOPE, tokenType: EARS }]
    },
    {
        name: "Phat Loot",
        characters: [{ name: CHARACTERS.GORD, level: 7 }],
        time: "6h",
        required: [{ name: BUILDINGS.SLAUGHTER_RACE, type: "building" }],
        tokens: [
            { name: CHARACTERS.FELIX, tokenType: EARS },
            { name: CHARACTERS.SHANK, tokenType: EARS }
        ]
    },
    {
        name: "Retro Niche",
        characters: [{ name: CHARACTERS.GORD, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.NICELAND, type: "building" }],
        tokens: [
            { name: CHARACTERS.SPAMLEY, tokenType: TOKEN },
            { name: CHARACTERS.YESSS, tokenType: EARS }
        ]
    },
    //gord end
    //naveen
    {
        name: "Watching for Shadows",
        characters: [
            { name: CHARACTERS.NAVEEN, level: 2 },
            { name: CHARACTERS.EUDORA, level: 2 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.EUDORA, tokenType: TOKEN },
            { name: CHARACTERS.EUDORA, tokenType: EARS }
        ]
    },
    {
        name: "Playing Some Jazz",
        characters: [{ name: CHARACTERS.NAVEEN, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.LOUIS, tokenType: EARS },
            { name: CHARACTERS.FACILIER, tokenType: TOKEN }
        ]
    },
    {
        name: "Finding New Sounds",
        characters: [{ name: CHARACTERS.NAVEEN, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.PATF, tokenType: COMMON }]
    },
    {
        name: "Mincing the Veggies",
        characters: [{ name: CHARACTERS.NAVEEN, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.TIANA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MAMA_ODIE, tokenType: EARS }]
    },
    {
        name: "Listening to Jazz Music",
        characters: [{ name: CHARACTERS.NAVEEN, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MAMA_ODIE, tokenType: EARS },
            { name: CHARACTERS.TIANA, tokenType: TOKEN },
            { name: CHARACTERS.LOTTIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Discuss Other Princes",
        characters: [
            { name: CHARACTERS.NAVEEN, level: 4 },
            { name: CHARACTERS.LOTTIE, level: 1 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.TIANA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NAVEEN, tokenType: TOKEN },
            { name: CHARACTERS.TIANA, tokenType: TOKEN },
            { name: CHARACTERS.TIANA, tokenType: EARS },
            { name: CHARACTERS.EUDORA, tokenType: EARS }
        ]
    },
    //tiana
    {
        name: "Creating New Recipes",
        characters: [{ name: CHARACTERS.TIANA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PATF, tokenType: COMMON }]
    },
    {
        name: "Searching Inside",
        characters: [{ name: CHARACTERS.TIANA, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.ODIE_TREE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.EUDORA, tokenType: TOKEN },
            { name: CHARACTERS.LOTTIE, tokenType: EARS }
        ]
    },
    {
        name: "Picking Up Supplies",
        characters: [{ name: CHARACTERS.TIANA, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LOUIS, tokenType: EARS },
            { name: CHARACTERS.MAMA_ODIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Teasing Nature",
        characters: [
            { name: CHARACTERS.TIANA, level: 2 },
            { name: CHARACTERS.NAVEEN, level: 2 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.NAVEEN, tokenType: TOKEN }]
    },
    {
        name: "Finding New Flavors",
        characters: [{ name: CHARACTERS.TIANA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.FACILIER, tokenType: EARS }]
    },
    //eudora
    {
        name: "An Afternoon Stroll",
        characters: [{ name: CHARACTERS.EUDORA, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.LOUIS, tokenType: TOKEN },
            { name: CHARACTERS.NAVEEN, tokenType: EARS },
            { name: CHARACTERS.MAMA_ODIE, tokenType: EARS },
            { name: CHARACTERS.FACILIER, tokenType: TOKEN }
        ]
    },
    {
        name: "Stroll Through the City",
        characters: [{ name: CHARACTERS.EUDORA, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.PATF, tokenType: COMMON },
            { name: CHARACTERS.LOUIS, tokenType: EARS },
            { name: CHARACTERS.LOTTIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Enjoy Firefly Lights",
        characters: [{ name: CHARACTERS.EUDORA, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.TIANA, tokenType: TOKEN }]
    },
    {
        name: "Feeling Proud of Tiana",
        characters: [{ name: CHARACTERS.EUDORA, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.TIANA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.FACILIER, tokenType: TOKEN }]
    },
    {
        name: "Relax at Home",
        characters: [{ name: CHARACTERS.EUDORA, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MAMA_ODIE, tokenType: TOKEN }]
    },
    //charlotte //lottie
    {
        name: "Enjoy Some Beignets",
        characters: [{ name: CHARACTERS.LOTTIE, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.TIANA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LOUIS, tokenType: TOKEN },
            { name: CHARACTERS.FACILIER, tokenType: EARS }
        ]
    },
    {
        name: "Try on Dresses",
        characters: [{ name: CHARACTERS.LOTTIE, level: 1 }],
        time: "8h",
        tokens: [{ name: CHARACTERS.MAMA_ODIE, tokenType: TOKEN }]
    },
    {
        name: "Exciting News",
        characters: [{ name: CHARACTERS.LOTTIE, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.TIANA, tokenType: TOKEN },
            { name: CHARACTERS.TIANA, tokenType: EARS }
        ]
    },
    {
        name: "Talk with Big Daddy",
        characters: [{ name: CHARACTERS.LOTTIE, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.FACILIER, tokenType: EARS }]
    },
    {
        name: "Avoid Swamp Water",
        characters: [{ name: CHARACTERS.LOTTIE, level: 3 }],
        time: "1h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.PATF, tokenType: COMMON }]
    },
    //facilier
    {
        name: "I've Got Friends",
        characters: [{ name: CHARACTERS.FACILIER, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PATF, tokenType: COMMON }]
    },
    {
        name: "Look for Magic Ingredients",
        characters: [{ name: CHARACTERS.FACILIER, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.EUDORA, tokenType: EARS },
            { name: CHARACTERS.LOTTIE, tokenType: TOKEN }
        ]
    },
    {
        name: "Avoid Detection",
        characters: [{ name: CHARACTERS.FACILIER, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.ODIE_TREE, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LOUIS, tokenType: TOKEN },
            { name: CHARACTERS.TIANA, tokenType: EARS }
        ]
    },
    {
        name: "Face Off",
        characters: [
            { name: CHARACTERS.FACILIER, level: 5 },
            { name: CHARACTERS.MAMA_ODIE, level: 5 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.NAVEEN, tokenType: TOKEN }]
    },
    {
        name: "Speak with Friends",
        characters: [{ name: CHARACTERS.FACILIER, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MAMA_ODIE, tokenType: EARS },
            { name: CHARACTERS.NAVEEN, tokenType: EARS }
        ]
    },
    //louis
    {
        name: "Jazz Tunes",
        characters: [{ name: CHARACTERS.LOUIS, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.EUDORA, tokenType: TOKEN },
            { name: CHARACTERS.EUDORA, tokenType: EARS },
            { name: CHARACTERS.NAVEEN, tokenType: TOKEN },
            { name: CHARACTERS.NAVEEN, tokenType: EARS }
        ]
    },
    {
        name: "Play Tunes on the River",
        characters: [{ name: CHARACTERS.LOUIS, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.TIANA, tokenType: EARS }]
    },
    {
        name: "Sing Along",
        characters: [{ name: CHARACTERS.LOUIS, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.ODIE_TREE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MAMA_ODIE, tokenType: EARS }]
    },
    {
        name: "Pretend to Be in Costume",
        characters: [{ name: CHARACTERS.LOUIS, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: GROUPS.PATF, tokenType: COMMON },
            { name: CHARACTERS.LOTTIE, tokenType: TOKEN }
        ]
    },
    //odie //mama odie
    {
        name: "Fighting Shadows",
        characters: [{ name: CHARACTERS.MAMA_ODIE, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.VOODOO, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.EUDORA, tokenType: TOKEN },
            { name: CHARACTERS.TIANA, tokenType: EARS }
        ]
    },
    {
        name: "Walk Through the Bayou",
        characters: [{ name: CHARACTERS.MAMA_ODIE, level: 6 }],
        time: "8h",
        required: [{ name: BUILDINGS.BAYOU, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.LOUIS, tokenType: TOKEN },
            { name: CHARACTERS.FACILIER, tokenType: EARS }
        ]
    },
    {
        name: "Enjoying Great Food",
        characters: [{ name: CHARACTERS.MAMA_ODIE, level: 7 }],
        time: "2h",
        required: [{ name: BUILDINGS.TIANA_PALACE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.NAVEEN, tokenType: TOKEN }]
    },
    {
        name: "Discuss Wishes",
        characters: [
            { name: CHARACTERS.MAMA_ODIE, level: 4 },
            { name: CHARACTERS.LOUIS, level: 3 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.ODIE_TREE, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.FACILIER, tokenType: EARS }]
    },
    {
        name: "Dancing Magic",
        characters: [{ name: CHARACTERS.MAMA_ODIE, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.PATF, tokenType: COMMON },
            { name: CHARACTERS.LOTTIE, tokenType: EARS }
        ]
    },
    //sina
    {
        name: "Collecting the Coconuts",
        characters: [{ name: CHARACTERS.SINA, level: 1 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.GRAMMA_TALA, tokenType: EARS },
            { name: CHARACTERS.CHIEF_TUI, tokenType: EARS },
            { name: CHARACTERS.MOANA, tokenType: COMMON }
        ]
    },
    {
        name: "Study Legends",
        characters: [{ name: CHARACTERS.SINA, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.TAMATOA_LAIR, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.PUA, tokenType: TOKEN }]
    },
    {
        name: "Prepare Coconuts",
        characters: [{ name: CHARACTERS.SINA, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.HOMECOMING, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.PUA, tokenType: TOKEN }]
    },
    {
        name: "Check for Moana",
        characters: [{ name: CHARACTERS.SINA, level: 5 }],
        time: "4h",
        required: [{ name: BUILDINGS.MOANA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MAUI, tokenType: EARS },
            { name: CHARACTERS.HEI_HEI, tokenType: EARS }
        ]
    },
    {
        name: "Loving Support",
        characters: [
            { name: CHARACTERS.SINA, level: 5 },
            { name: "Moana", level: 1 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.MOANA, tokenType: EARS },
            { name: CHARACTERS.SINA, tokenType: TOKEN }
        ]
    },
    {
        name: "Investigate Disturbance",
        characters: [{ name: CHARACTERS.SINA, level: 8 }],
        time: "1h",
        required: [{ name: BUILDINGS.KAKAMORA_BOAT }],
        tokens: []
    },
    //moana
    {
        name: "Ready to Sail",
        characters: [{ name: CHARACTERS.MOANA, level: 1 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.MOANA, tokenType: COMMON }]
    },
    {
        name: "A Master Wayfinder",
        characters: [{ name: CHARACTERS.MOANA, level: 3 }],
        time: "8h",
        tokens: [{ name: CHARACTERS.HEI_HEI, tokenType: EARS }]
    },
    {
        name: "Battle the Kakamora",
        characters: [{ name: CHARACTERS.MOANA, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.KAKAMORA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.PUA, tokenType: TOKEN }]
    },
    {
        name: "Checking the Sails",
        characters: [{ name: CHARACTERS.MOANA, level: 5 }],
        time: "1h",
        required: [{ name: BUILDINGS.MOANA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: []
    },
    {
        name: "Travel the Ocean",
        characters: [
            { name: CHARACTERS.MOANA, level: 8 },
            { name: "Maui", level: 8 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.MOANA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GRAMMA_TALA, tokenType: EARS }]
    },
    {
        name: "Tales of Past Chiefs",
        characters: [
            { name: CHARACTERS.MOANA, level: 9 },
            { name: CHARACTERS.CHIEF_TUI, level: 9 }
        ],
        time: "24h",
        required: [{ name: BUILDINGS.HOMECOMING, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GRAMMA_TALA, tokenType: EARS }]
    },
    //maui
    {
        name: "It's Maui Time!",
        characters: [{ name: CHARACTERS.MAUI, level: 1 }],
        time: "1h",
        tokens: [{ name: CHARACTERS.MOANA, tokenType: COMMON }]
    },
    {
        name: "Tell Tales of Myself",
        characters: [{ name: CHARACTERS.MAUI, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.HOMECOMING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SINA, tokenType: EARS },
            { name: CHARACTERS.MOANA, tokenType: TOKEN }
        ]
    },
    {
        name: "Seek New Adventures",
        characters: [{ name: CHARACTERS.MAUI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MOANA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CHIEF_TUI, tokenType: TOKEN },
            { name: CHARACTERS.PUA, tokenType: EARS }
        ]
    },
    {
        name: "Avoid the Kakamora",
        characters: [{ name: CHARACTERS.MAUI, level: 4 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.HEI_HEI, tokenType: EARS }]
    },
    //hei hei
    {
        name: "Staying Put",
        characters: [{ name: CHARACTERS.HEI_HEI, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.MOANA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GRAMMA_TALA, tokenType: TOKEN },
            { name: CHARACTERS.MOANA, tokenType: EARS }
        ]
    },
    {
        name: "Walking Along",
        characters: [{ name: CHARACTERS.HEI_HEI, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.HOMECOMING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CHIEF_TUI, tokenType: EARS },
            { name: CHARACTERS.MAUI, tokenType: TOKEN },
            { name: CHARACTERS.MAUI, tokenType: EARS }
        ]
    },
    {
        name: "Wandering in the Deep",
        characters: [{ name: CHARACTERS.HEI_HEI, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.TAMATOA_LAIR, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: GROUPS.MOANA, tokenType: COMMON }]
    },
    {
        name: "Carried Away",
        characters: [{ name: CHARACTERS.HEI_HEI, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.KAKAMORA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.SINA, tokenType: EARS }]
    },
    {
        name: "Coconut Wandering",
        characters: [{ name: CHARACTERS.HEI_HEI, level: 1 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.PUA, tokenType: TOKEN },
            { name: CHARACTERS.CRUSH, tokenType: TOKEN }
        ]
    },
    //tui
    {
        name: "Surveying the Land",
        characters: [{ name: CHARACTERS.CHIEF_TUI, level: 1 }],
        time: "1h",
        tokens: [
            { name: CHARACTERS.GRAMMA_TALA, tokenType: TOKEN },
            { name: CHARACTERS.MOANA, tokenType: COMMON },
            { name: CHARACTERS.CHIEF_TUI, tokenType: TOKEN }
        ]
    },
    {
        name: "Oversee the Island",
        characters: [{ name: CHARACTERS.CHIEF_TUI, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.HOMECOMING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SINA, tokenType: EARS },
            { name: CHARACTERS.PUA, tokenType: EARS }
        ]
    },
    {
        name: "Check Fish Traps",
        characters: [{ name: CHARACTERS.CHIEF_TUI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MOANA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MOANA, tokenType: TOKEN },
            { name: CHARACTERS.MAUI, tokenType: TOKEN }
        ]
    },
    {
        name: "Stay Prepared for Trouble",
        characters: [{ name: CHARACTERS.CHIEF_TUI, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.KAKAMORA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.HEI_HEI, tokenType: TOKEN }]
    },
    //gramma tala
    {
        name: "Weaving a Tale",
        characters: [{ name: CHARACTERS.GRAMMA_TALA, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.SINA, tokenType: TOKEN },
            { name: CHARACTERS.SINA, tokenType: EARS },
            { name: CHARACTERS.CHIEF_TUI, tokenType: EARS }
        ]
    },
    {
        name: "Creating New Tapestries",
        characters: [{ name: CHARACTERS.GRAMMA_TALA, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.HOMECOMING, type: "building" }],
        tokens: [{ name: GROUPS.MOANA, tokenType: COMMON }]
    },
    {
        name: "Telling a Story",
        characters: [{ name: CHARACTERS.GRAMMA_TALA, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.HOMECOMING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.GRAMMA_TALA, tokenType: EARS },
            { name: CHARACTERS.PUA, tokenType: EARS },
            { name: CHARACTERS.HEI_HEI, tokenType: TOKEN }
        ]
    },
    {
        name: "Beings of Legend",
        characters: [{ name: CHARACTERS.GRAMMA_TALA, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.KAKAMORA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.MOANA, tokenType: EARS }]
    },
    {
        name: "Teaching Legends",
        characters: [
            { name: CHARACTERS.GRAMMA_TALA, level: 8 },
            { name: "Moana", level: 8 }
        ],
        time: "24h",
        tokens: [{ name: CHARACTERS.MAUI, tokenType: TOKEN }]
    },
    {
        name: "I'm Always With You",
        characters: [
            { name: CHARACTERS.GRAMMA_TALA, level: 1 },
            { name: "Moana", level: 1 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.CHIEF_TUI, tokenType: TOKEN }]
    },
    //pua
    {
        name: "Helping Out",
        characters: [{ name: CHARACTERS.PUA, level: 1 }],
        time: "1h",
        tokens: [{ name: CHARACTERS.MOANA, tokenType: COMMON }]
    },
    {
        name: "Wander About",
        characters: [{ name: CHARACTERS.PUA, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.HOMECOMING, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SINA, tokenType: TOKEN },
            { name: CHARACTERS.MAUI, tokenType: EARS },
            { name: CHARACTERS.MOANA, tokenType: TOKEN },
            { name: CHARACTERS.NEMO, tokenType: EARS }
        ]
    },
    {
        name: "Stay Clear of Water",
        characters: [{ name: CHARACTERS.PUA, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.MOANA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.CHIEF_TUI, tokenType: EARS },
            { name: CHARACTERS.MOANA, tokenType: EARS },
            { name: CHARACTERS.HEI_HEI, tokenType: TOKEN }
        ]
    },
    {
        name: "Watch for Moana",
        characters: [{ name: CHARACTERS.PUA, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.KAKAMORA_BOAT, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.GRAMMA_TALA, tokenType: TOKEN }]
    },
    //nemo
    {
        name: "Swimming Tricks",
        characters: [{ name: CHARACTERS.NEMO, level: 1 }],
        time: "6h",
        tokens: [
            { name: GROUPS.FN, tokenType: COMMON },
            { name: CHARACTERS.BRUCE, tokenType: TOKEN },
            { name: CHARACTERS.BRUCE, tokenType: EARS },
            { name: CHARACTERS.CRUSH, tokenType: TOKEN },
            { name: CHARACTERS.SQUIRT, tokenType: TOKEN }
        ]
    },
    {
        name: "Showing Off Moves",
        characters: [
            { name: CHARACTERS.NEMO, level: 2 },
            { name: CHARACTERS.CRUSH, level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NEMO, tokenType: TOKEN },
            { name: CHARACTERS.DORY, tokenType: TOKEN },
            { name: CHARACTERS.HANK, tokenType: EARS }
        ]
    },
    {
        name: "Exploring the Reef",
        characters: [{ name: CHARACTERS.NEMO, level: 3 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.NEMO_SEAS,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.SQUIRT, tokenType: TOKEN },
            { name: CHARACTERS.SQUIRT, tokenType: EARS }
        ]
    },
    {
        name: "Enjoying the Currents",
        characters: [
            { name: CHARACTERS.NEMO, level: 3 },
            { name: CHARACTERS.CRUSH, level: 3 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NEMO, tokenType: TOKEN },
            { name: CHARACTERS.NEMO, tokenType: EARS },
            { name: CHARACTERS.SQUIRT, tokenType: EARS },
            { name: CHARACTERS.CRUSH, tokenType: TOKEN },
            { name: CHARACTERS.DORY, tokenType: EARS }
        ]
    },
    {
        name: "Father-Son Bond",
        characters: [
            { name: CHARACTERS.NEMO, level: 3 },
            { name: CHARACTERS.MARLIN, level: 3 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.BAILEY, tokenType: TOKEN }]
    },
    {
        name: "Discovering New Places",
        characters: [{ name: CHARACTERS.NEMO, level: 4 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.CRUSH_COASTER,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.DORY, tokenType: TOKEN },
            { name: CHARACTERS.DESTINY, tokenType: TOKEN }
        ]
    },
    {
        name: "Escaping Traps",
        characters: [{ name: CHARACTERS.NEMO, level: 6 }],
        time: "8h",
        required: [
            { name: BUILDINGS.NEMO_SUBMARINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MARLIN, tokenType: TOKEN }]
    },
    {
        name: "Home in the Anemone",
        characters: [
            { name: CHARACTERS.NEMO, level: 6 },
            { name: CHARACTERS.DORY, level: 6 }
        ],
        time: "24h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BAILEY, tokenType: EARS }]
    },
    {
        name: "Family Hug",
        characters: [
            { name: CHARACTERS.NEMO, level: 10 },
            { name: CHARACTERS.MARLIN, level: 10 }
        ],
        time: "24h",
        tokens: [
            { name: CHARACTERS.DESTINY, tokenType: EARS },
            { name: CHARACTERS.BAILEY, tokenType: EARS }
        ]
    },
    //nemo end
    //marlin
    {
        name: "Frantic Searching",
        characters: [{ name: CHARACTERS.MARLIN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FN, tokenType: COMMON }]
    },
    {
        name: "Swimming Around",
        characters: [{ name: CHARACTERS.MARLIN, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.NEMO_SUBMARINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.NEMO, tokenType: TOKEN },
            { name: CHARACTERS.DORY, tokenType: EARS }
        ]
    },
    {
        name: "Revisiting Places",
        characters: [{ name: CHARACTERS.MARLIN, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.CRUSH, tokenType: EARS }]
    },
    {
        name: "Enjoying the Ocean View",
        characters: [{ name: CHARACTERS.MARLIN, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.DESTINY, tokenType: EARS }]
    },
    {
        name: "Family Trip",
        characters: [
            { name: CHARACTERS.MARLIN, level: 5 },
            { name: CHARACTERS.NEMO, level: 5 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BAILEY, tokenType: EARS }]
    },
    //marlin end
    //dory
    {
        name: "Just Keep Swimming",
        characters: [{ name: CHARACTERS.DORY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FN, tokenType: COMMON }]
    },
    {
        name: "Finding Adventures",
        characters: [{ name: CHARACTERS.DORY, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NEMO, tokenType: EARS },
            { name: CHARACTERS.CRUSH, tokenType: TOKEN }
        ]
    },
    {
        name: "Playing Games",
        characters: [
            { name: CHARACTERS.DORY, level: 4 },
            { name: CHARACTERS.SQUIRT, level: 4 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.DESTINY, tokenType: TOKEN }]
    },
    {
        name: "Going on a Trip",
        characters: [
            { name: CHARACTERS.DORY, level: 3 },
            { name: CHARACTERS.MARLIN, level: 3 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [{ name: CHARACTERS.BRUCE, tokenType: EARS }]
    },
    {
        name: "Staying Relaxed",
        characters: [
            { name: CHARACTERS.DORY, level: 8 },
            { name: CHARACTERS.MARLIN, level: 8 }
        ],
        time: "8h",
        tokens: [
            { name: CHARACTERS.SQUIRT, tokenType: TOKEN },
            { name: CHARACTERS.HANK, tokenType: EARS }
        ]
    },
    {
        name: "Looking for Shells",
        characters: [{ name: CHARACTERS.DORY, level: 3 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.NEMO_SUBMARINE,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.MARLIN, tokenType: TOKEN },
            { name: CHARACTERS.MARLIN, tokenType: EARS }
        ]
    },
    {
        name: "Making Friends",
        characters: [{ name: CHARACTERS.DORY, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MARLIN, tokenType: TOKEN },
            { name: CHARACTERS.DESTINY, tokenType: TOKEN },
            { name: CHARACTERS.BAILEY, tokenType: TOKEN }
        ]
    },
    //hank
    {
        name: "Staying Hidden",
        characters: [{ name: CHARACTERS.HANK, level: 1 }],
        time: "6h",
        tokens: [
            { name: GROUPS.FN, tokenType: COMMON },
            { name: CHARACTERS.BRUCE, tokenType: TOKEN },
            { name: CHARACTERS.CRUSH, tokenType: EARS },
            { name: CHARACTERS.SQUIRT, tokenType: TOKEN },
            { name: CHARACTERS.DORY, tokenType: TOKEN }
        ]
    },
    {
        name: "Scouting for Destiny",
        characters: [{ name: CHARACTERS.HANK, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.NEMO_SUBMARINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.NEMO, tokenType: EARS }]
    },
    {
        name: "Substituting as Teacher",
        characters: [{ name: CHARACTERS.HANK, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.BRUCE, tokenType: EARS },
            { name: CHARACTERS.DORY, tokenType: EARS }
        ]
    },
    {
        name: "Avoiding Trouble",
        characters: [{ name: CHARACTERS.HANK, level: 2 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.CRUSH_COASTER,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.DORY, tokenType: TOKEN },
            { name: CHARACTERS.DORY, tokenType: EARS },
            { name: CHARACTERS.BAILEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Staying Clear of Humans",
        characters: [{ name: CHARACTERS.HANK, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.NEMO_SUBMARINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MARLIN, tokenType: TOKEN },
            { name: CHARACTERS.MARLIN, tokenType: EARS },
            { name: CHARACTERS.DESTINY, tokenType: TOKEN }
        ]
    },
    //crush
    {
        name: "Wow, Dude",
        characters: [{ name: CHARACTERS.CRUSH, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FN, tokenType: COMMON }]
    },
    {
        name: "Chilling in the Reef",
        characters: [{ name: CHARACTERS.CRUSH, level: 4 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.NEMO_SEAS,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.BRUCE, tokenType: EARS },
            { name: CHARACTERS.SQUIRT, tokenType: TOKEN },
            { name: CHARACTERS.SQUIRT, tokenType: EARS }
        ]
    },
    {
        name: "Enjoying the Sights",
        characters: [{ name: CHARACTERS.CRUSH, level: 5 }],
        time: "6h",
        required: [
            { name: BUILDINGS.NEMO_SUBMARINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MARLIN, tokenType: EARS }]
    },
    {
        name: "Surfing the EAC",
        characters: [{ name: CHARACTERS.CRUSH, level: 4 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.CRUSH_COASTER,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.DORY, tokenType: EARS },
            { name: CHARACTERS.MARLIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Trying Out New Moves",
        characters: [
            { name: CHARACTERS.CRUSH, level: 3 },
            { name: CHARACTERS.SQUIRT, level: 3 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.HANK, tokenType: TOKEN },
            { name: CHARACTERS.DESTINY, tokenType: TOKEN },
            { name: CHARACTERS.BAILEY, tokenType: TOKEN }
        ]
    },
    //squirt
    {
        name: "Drifting",
        characters: [{ name: CHARACTERS.SQUIRT, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FN, tokenType: COMMON }]
    },
    {
        name: "Going to Class",
        characters: [{ name: CHARACTERS.SQUIRT, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.NEMO, tokenType: EARS },
            { name: CHARACTERS.CRUSH, tokenType: EARS },
            { name: CHARACTERS.HANK, tokenType: TOKEN },
            { name: CHARACTERS.DESTINY, tokenType: TOKEN }
        ]
    },
    {
        name: "Having Fun",
        characters: [{ name: CHARACTERS.SQUIRT, level: 4 }],
        time: "2h",
        required: [
            { name: BUILDINGS.NEMO_SUBMARINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.BRUCE, tokenType: TOKEN },
            { name: CHARACTERS.BAILEY, tokenType: TOKEN },
            { name: CHARACTERS.ERCOLE, tokenType: TOKEN }
        ]
    },
    {
        name: "Talking to Friends",
        characters: [{ name: CHARACTERS.SQUIRT, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.DORY, tokenType: EARS },
            { name: CHARACTERS.MARLIN, tokenType: EARS },
            { name: CHARACTERS.HANK, tokenType: EARS }
        ]
    },
    {
        name: "Ocean Lessons",
        characters: [
            { name: CHARACTERS.SQUIRT, level: 5 },
            { name: CHARACTERS.HANK, level: 5 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: "building" }],
        tokens: [{ name: CHARACTERS.DESTINY, tokenType: EARS }]
    },
    {
        name: "Hide 'n' Seek",
        characters: [
            { name: CHARACTERS.SQUIRT, level: 6 },
            { name: CHARACTERS.DORY, level: 6 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.DESTINY, tokenType: EARS }]
    },
    //squirt end
    //bruce
    {
        name: "Party Planning",
        characters: [{ name: CHARACTERS.BRUCE, level: 1 }],
        time: "2h",
        tokens: [
            { name: GROUPS.FN, tokenType: COMMON },
            { name: CHARACTERS.NEMO, tokenType: TOKEN },
            { name: CHARACTERS.NEMO, tokenType: EARS },
            { name: CHARACTERS.CRUSH, tokenType: TOKEN },
            { name: CHARACTERS.CRUSH, tokenType: EARS }
        ]
    },
    {
        name: "Recruit New Members",
        characters: [{ name: CHARACTERS.BRUCE, level: 3 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.NEMO_SEAS,
                type: REQ_TYPES.BUILDING,
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.SQUIRT, tokenType: EARS },
            { name: CHARACTERS.MARLIN, tokenType: TOKEN },
            { name: CHARACTERS.HANK, tokenType: EARS }
        ]
    },
    {
        name: "Talking About Experiences",
        characters: [
            { name: CHARACTERS.BRUCE, level: 2 },
            { name: CHARACTERS.NEMO, level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MARLIN, tokenType: EARS },
            { name: CHARACTERS.HANK, tokenType: TOKEN },
            { name: CHARACTERS.HANK, tokenType: EARS },
            { name: CHARACTERS.BAILEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Meet with Anchor and Chum",
        characters: [{ name: CHARACTERS.BRUCE, level: 4 }],
        time: "12h",
        required: [{ name: BUILDINGS.CRUSH_COASTER, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.SQUIRT, tokenType: EARS },
            { name: CHARACTERS.DORY, tokenType: TOKEN },
            { name: CHARACTERS.HANK, tokenType: TOKEN }
        ]
    },
    {
        name: "Try to Make Fish Friends",
        characters: [{ name: CHARACTERS.BRUCE, level: 5 }],
        time: "1h",
        required: [
            { name: BUILDINGS.NEMO_SUBMARINE, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DESTINY, tokenType: EARS },
            { name: CHARACTERS.BAILEY, tokenType: EARS }
        ]
    },
    //bruce end
    //destiny
    {
        name: "Navigate Carefully",
        characters: [{ name: CHARACTERS.DESTINY, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.FN, tokenType: COMMON },
            {
                name: SPECIAL_ITEMS.REFRESH_TOKEN,
                tokenType: SPECIAL,
                remove: true
            }
        ]
    },
    {
        name: "No Walls in the Ocean",
        characters: [{ name: CHARACTERS.DESTINY, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.DESTINY, tokenType: TOKEN },
            { name: CHARACTERS.BAILEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Blue Blob",
        characters: [
            { name: CHARACTERS.DESTINY, level: 10 },
            { name: CHARACTERS.DORY, level: 10 }
        ],
        time: "24h",
        tokens: [{ name: CHARACTERS.BAILEY, tokenType: EARS }]
    },
    //destiny end
    //bailey
    {
        name: 'Trying the "Ooh" Thing',
        characters: [{ name: CHARACTERS.BAILEY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.FN, tokenType: COMMON }]
    },
    {
        name: "My Life's a Rainbow",
        characters: [{ name: CHARACTERS.BAILEY, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.DESTINY, tokenType: TOKEN },
            { name: CHARACTERS.BAILEY, tokenType: TOKEN }
        ]
    },
    {
        name: "My Beautiful Gift",
        characters: [{ name: CHARACTERS.BAILEY, level: 4 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.DESTINY, tokenType: EARS }]
    },
    {
        name: "On My Mark",
        characters: [
            { name: CHARACTERS.BAILEY, level: 5 },
            { name: CHARACTERS.DESTINY, level: 5 }
        ],
        time: "2h",
        tokens: [{ name: GROUPS.FN, tokenType: COMMON }]
    },
    {
        name: "Rescue, Rehabilitation and Release",
        characters: [
            { name: CHARACTERS.BAILEY, level: 8 },
            { name: CHARACTERS.HANK, level: 8 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.NEMO_SEAS, type: "building" }],
        tokens: [{ name: CHARACTERS.BAILEY, tokenType: EARS }]
    },
    //bailey end
    //miguel
    {
        name: "Head to Mariachi Plaza",
        characters: [{ name: CHARACTERS.MIGUEL, level: 3 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.MIGUEL, tokenType: EARS },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: EARS },
            { name: CHARACTERS.ABUELITA, tokenType: EARS }
        ]
    },
    {
        name: "I'm a Musician!",
        characters: [{ name: CHARACTERS.MIGUEL, level: 1 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.DANTE, tokenType: TOKEN },
            { name: CHARACTERS.ERNESTO, tokenType: EARS },
            { name: CHARACTERS.HECTOR, tokenType: TOKEN },
            { name: GROUPS.COCO, tokenType: COMMON }
        ]
    },
    {
        name: "Duel Guitars",
        characters: [
            { name: CHARACTERS.MIGUEL, level: 1 },
            { name: CHARACTERS.HECTOR, level: 1 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.HECTOR, tokenType: TOKEN },
            { name: CHARACTERS.HECTOR, tokenType: EARS }
        ]
    },
    {
        name: "Playful Bonding",
        characters: [
            { name: CHARACTERS.MIGUEL, level: null },
            { name: CHARACTERS.DANTE, level: 2 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.ERNESTO, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_COCO, tokenType: TOKEN }
        ]
    },
    {
        name: "Concert Performance",
        characters: [{ name: CHARACTERS.MIGUEL, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.MUSICAL_CELEBRATION, type: "building" }],
        tokens: [{ name: CHARACTERS.MAMA_COCO, tokenType: EARS }]
    },
    {
        name: "Pay Respects to the Family",
        characters: [{ name: CHARACTERS.MIGUEL, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.LAND_OF_DEAD, type: "building" }],
        tokens: [
            { name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_COCO, tokenType: TOKEN },
            { name: CHARACTERS.DANTE, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: EARS }
        ]
    },
    {
        name: "Play New Songs",
        characters: [{ name: CHARACTERS.MIGUEL, level: 5 }],
        time: "4h",
        required: [
            { name: BUILDINGS.MUSICAL_CELEBRATION, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ABUELITA, tokenType: TOKEN },
            { name: CHARACTERS.ABUELITA, tokenType: EARS }
        ]
    },
    {
        name: "Love from Abuelita",
        characters: [
            { name: CHARACTERS.MIGUEL, level: 7 },
            { name: CHARACTERS.ABUELITA, level: 7 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.MAMA_COCO, tokenType: EARS }]
    },
    {
        name: "Putting on a Performance",
        characters: [
            { name: CHARACTERS.MIGUEL, level: 10 },
            { name: CHARACTERS.HECTOR, level: 10 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.MAMA_COCO, tokenType: EARS }]
    },
    //abuelita
    {
        name: "Charging Through",
        characters: [{ name: CHARACTERS.ABUELITA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.COCO, tokenType: COMMON }]
    },
    {
        name: "Prepare Offerings",
        characters: [{ name: CHARACTERS.ABUELITA, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.LAND_OF_DEAD, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MIGUEL, tokenType: TOKEN },
            { name: CHARACTERS.ERNESTO, tokenType: TOKEN }
        ]
    },
    {
        name: "Sweep Up",
        characters: [{ name: CHARACTERS.ABUELITA, level: 4 }],
        time: "8h",
        required: [
            { name: BUILDINGS.RIVERA_FAMILIA_HOME, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.DANTE, tokenType: EARS },
            { name: CHARACTERS.HECTOR, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit the Market",
        characters: [{ name: CHARACTERS.ABUELITA, level: 3 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN },
            { name: CHARACTERS.ABUELITA, tokenType: EARS }
        ]
    },
    //dante
    {
        name: "Hunting for Treats",
        characters: [{ name: CHARACTERS.DANTE, level: 1 }],
        level: 1,
        time: "2h",
        tokens: [
            { name: CHARACTERS.MIGUEL, tokenType: TOKEN },
            { name: CHARACTERS.MIGUEL, tokenType: EARS },
            { name: CHARACTERS.ERNESTO, tokenType: EARS },
            { name: GROUPS.COCO, tokenType: COMMON }
        ]
    },
    {
        name: "Bark to the Music",
        characters: [{ name: CHARACTERS.DANTE, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.MUSICAL_CELEBRATION, type: "building" }],
        tokens: []
    },
    {
        name: "Practicing Flight",
        characters: [{ name: CHARACTERS.DANTE, level: 4 }],
        time: "12h",
        required: [
            { name: BUILDINGS.LAND_OF_DEAD, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.DANTE, tokenType: TOKEN },
            { name: CHARACTERS.ABUELITA, tokenType: TOKEN }
        ]
    },
    {
        name: "Sniffing Around",
        characters: [{ name: CHARACTERS.DANTE, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP, type: "building" }
        ],
        tokens: [
            { name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_COCO, tokenType: EARS },
            { name: CHARACTERS.HECTOR, tokenType: TOKEN }
        ]
    },
    //coco //mama coco
    {
        name: "Supporting Music",
        characters: [
            { name: CHARACTERS.MAMA_COCO, level: 1 },
            { name: CHARACTERS.MIGUEL, level: 1 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.MUSICAL_CELEBRATION, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.MIGUEL, tokenType: TOKEN },
            {
                name: CHARACTERS.ERNESTO,
                tokenType: EARS
            }
        ]
    },
    {
        name: "A Wondrous Place",
        characters: [{ name: CHARACTERS.MAMA_COCO, level: 1 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.DANTE, tokenType: EARS },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: EARS },
            { name: CHARACTERS.ABUELITA, tokenType: TOKEN },
            { name: GROUPS.COCO, tokenType: COMMON }
        ]
    },
    {
        name: "Spending Time with Family",
        characters: [{ name: CHARACTERS.MAMA_COCO, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.LAND_OF_DEAD, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.DANTE, tokenType: TOKEN },
            { name: CHARACTERS.ABUELITA, tokenType: EARS },
            { name: CHARACTERS.HECTOR, tokenType: EARS }
        ]
    },
    {
        name: "Following the Path Home",
        characters: [{ name: CHARACTERS.MAMA_COCO, level: 1 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP,
                type: "building",
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: EARS }
        ]
    },
    {
        name: "Enjoying Performances",
        characters: [{ name: CHARACTERS.MAMA_COCO, level: 1 }],
        time: "6h",
        required: [{ name: BUILDINGS.MUSICAL_CELEBRATION, type: "building" }],
        tokens: [
            { name: CHARACTERS.ABUELITA, tokenType: TOKEN },
            { name: CHARACTERS.ABUELITA, tokenType: EARS }
        ]
    },
    //imelda //mama imelda
    {
        name: "Expecting Information",
        characters: [{ name: CHARACTERS.MAMA_IMELDA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.COCO, tokenType: COMMON }]
    },
    {
        name: "Spending Time with Pepita",
        characters: [{ name: CHARACTERS.MAMA_IMELDA, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.LAND_OF_DEAD, type: REQ_TYPES.BUILDING }],
        tokens: [
            { name: CHARACTERS.MIGUEL, tokenType: EARS },
            { name: CHARACTERS.ABUELITA, tokenType: TOKEN }
        ]
    },
    {
        name: "Traveling Together",
        characters: [
            { name: CHARACTERS.MAMA_IMELDA, level: 8 },
            { name: CHARACTERS.MAMA_COCO, level: 8 }
        ],
        time: "2h",
        required: [
            {
                name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.DANTE, tokenType: TOKEN },
            { name: CHARACTERS.DANTE, tokenType: EARS }
        ]
    },
    {
        name: "Traveling By",
        characters: [{ name: CHARACTERS.MAMA_IMELDA, level: 3 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP,
                type: "building",
                level: 1
            }
        ],
        tokens: [
            { name: CHARACTERS.ERNESTO, tokenType: TOKEN },
            { name: CHARACTERS.ERNESTO, tokenType: EARS }
        ]
    },
    {
        name: "Being Open to Music",
        characters: [{ name: CHARACTERS.MAMA_IMELDA, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.MUSICAL_CELEBRATION, type: "building" }],
        tokens: [
            { name: CHARACTERS.MAMA_COCO, tokenType: TOKEN },
            { name: CHARACTERS.HECTOR, tokenType: TOKEN }
        ]
    },
    {
        name: "Visiting Home",
        characters: [{ name: CHARACTERS.MAMA_IMELDA, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.RIVERA_FAMILIA_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.MAMA_COCO, tokenType: TOKEN },
            { name: CHARACTERS.HECTOR, tokenType: EARS },
            { name: CHARACTERS.BRIDE, tokenType: TOKEN }
        ]
    },
    //hector
    {
        name: "Writing Songs",
        characters: [{ name: CHARACTERS.HECTOR, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.COCO, tokenType: COMMON }]
    },
    {
        name: "Visiting the Family",
        characters: [{ name: CHARACTERS.HECTOR, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.RIVERA_FAMILIA_HOME, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MIGUEL, tokenType: TOKEN }]
    },
    {
        name: "Passing Through",
        characters: [{ name: CHARACTERS.HECTOR, level: 4 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [{ name: CHARACTERS.DANTE, tokenType: EARS }]
    },
    {
        name: "Guitar Performance",
        characters: [{ name: CHARACTERS.HECTOR, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.MUSICAL_CELEBRATION, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ERNESTO, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_COCO, tokenType: EARS },
            { name: CHARACTERS.ABUELITA, tokenType: EARS }
        ]
    },
    {
        name: "Creating Music",
        characters: [{ name: CHARACTERS.HECTOR, level: 4 }],
        time: "12h",
        required: [
            { name: BUILDINGS.RIVERA_FAMILIA_HOME, type: REQ_TYPES.BUILDING }
        ],
        tokens: [{ name: CHARACTERS.MAMA_IMELDA, tokenType: EARS }]
    },
    //ernesto
    {
        name: "Look Dashing",
        characters: [{ name: CHARACTERS.ERNESTO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.COCO, tokenType: COMMON }]
    },
    {
        name: "Visit Statue of Me",
        characters: [{ name: CHARACTERS.ERNESTO, level: 2 }],
        time: "4h",
        required: [
            {
                name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP,
                type: REQ_TYPES.BUILDING
            }
        ],
        tokens: [
            { name: CHARACTERS.MIGUEL, tokenType: TOKEN },
            { name: CHARACTERS.DANTE, tokenType: TOKEN },
            { name: CHARACTERS.MAMA_IMELDA, tokenType: EARS }
        ]
    },
    {
        name: "Perform for Others",
        characters: [{ name: CHARACTERS.ERNESTO, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.MUSICAL_CELEBRATION, type: REQ_TYPES.BUILDING }
        ],
        tokens: [
            { name: CHARACTERS.ERNESTO, tokenType: EARS },
            { name: CHARACTERS.MAMA_COCO, tokenType: TOKEN },
            { name: CHARACTERS.ABUELITA, tokenType: TOKEN }
        ]
    },
    {
        name: "Talk of Success",
        characters: [{ name: CHARACTERS.ERNESTO, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.LAND_OF_DEAD, type: "building" }],
        tokens: [
            { name: CHARACTERS.ABUELITA, tokenType: EARS },
            { name: CHARACTERS.BRIDE, tokenType: EARS }
        ]
    },
    {
        name: "Reciting the Classics",
        characters: [{ name: CHARACTERS.ERNESTO, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.MUSICAL_CELEBRATION, type: "building" }],
        tokens: [
            { name: CHARACTERS.HECTOR, tokenType: TOKEN },
            { name: CHARACTERS.HECTOR, tokenType: EARS },
            { name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN }
        ]
    },
    {
        name: "Still the Best",
        characters: [{ name: CHARACTERS.ERNESTO, level: 4 }],
        time: "8h",
        tokens: []
    },
    //the bride //bride
    {
        name: "Till Death Do Us Part",
        characters: [{ name: CHARACTERS.BRIDE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.HM, tokenType: COMMON }]
    },
    {
        name: "Here Comes the Bride",
        characters: [{ name: CHARACTERS.BRIDE, level: 5 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.REY, tokenType: EARS }]
    },
    {
        name: "Peruse Wedding Gifts",
        characters: [{ name: CHARACTERS.BRIDE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.HAUNTED_MANSION }],
        tokens: [
            { name: CHARACTERS.PHINEAS, tokenType: EARS },
            { name: CHARACTERS.HATBOX_GHOST, tokenType: EARS }
        ]
    },
    {
        name: "Floating About",
        characters: [{ name: CHARACTERS.BRIDE, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.GUS, tokenType: EARS }]
    },
    //ezra
    {
        name: "Dearly Departed Ezra",
        characters: [{ name: CHARACTERS.EZRA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.HM, tokenType: COMMON }]
    },
    {
        name: "Prank Guests",
        characters: [{ name: CHARACTERS.EZRA, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.GUS, tokenType: TOKEN }]
    },
    {
        name: "Inspect Doom Buggy",
        characters: [{ name: CHARACTERS.EZRA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.PHINEAS, tokenType: TOKEN }]
    },
    {
        name: "Put on a Show",
        characters: [{ name: CHARACTERS.EZRA, level: 5 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.BRIDE, tokenType: TOKEN },
            { name: CHARACTERS.HATBOX_GHOST, tokenType: EARS }
        ]
    },
    //ezra end
    //phineas
    {
        name: "Rest in Peace, Professor",
        characters: [{ name: CHARACTERS.PHINEAS, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.HM, tokenType: COMMON }]
    },
    {
        name: "Hitchhike",
        characters: [{ name: CHARACTERS.PHINEAS, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.GUS, tokenType: EARS }]
    },
    {
        name: "Lurk in the Shadows",
        characters: [
            { name: CHARACTERS.PHINEAS, level: 4 },
            { name: CHARACTERS.BRIDE, level: 4 }
        ],
        time: "1h",
        required: [{ name: BUILDINGS.THE_HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.EZRA, tokenType: TOKEN }]
    },
    {
        name: "Make Floors Creak",
        characters: [
            { name: CHARACTERS.PHINEAS, level: 7 },
            { name: CHARACTERS.GUS, level: 7 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.THE_HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.HATBOX_GHOST, tokenType: TOKEN }]
    },
    //phineas end
    //gus
    {
        name: "Here Lies Gus",
        characters: [{ name: CHARACTERS.GUS, level: 1 }],
        time: "1",
        tokens: [{ name: GROUPS.HM, tokenType: COMMON }]
    },
    {
        name: "Sing in Graveyard",
        characters: [{ name: CHARACTERS.GUS, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.PHINEAS, tokenType: TOKEN }]
    },
    {
        name: "Pick Up a Ride",
        characters: [{ name: CHARACTERS.GUS, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_HAUNTED_MANSION }],
        tokens: [
            { name: CHARACTERS.BRIDE, tokenType: TOKEN },
            { name: CHARACTERS.EZRA, tokenType: EARS }
        ]
    },
    //gus end
    //hatbox ghost
    {
        name: "What's In the Hatbox?",
        characters: [{ name: CHARACTERS.HATBOX_GHOST, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.HM, tokenType: COMMON }]
    },
    {
        name: "Haunt the Attic",
        characters: [{ name: CHARACTERS.HATBOX_GHOST, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.EZRA, tokenType: EARS }]
    },
    {
        name: "Perform Hat Trick",
        characters: [{ name: CHARACTERS.HATBOX_GHOST, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.GUS, tokenType: TOKEN }]
    },
    {
        name: "Disappearing Act",
        characters: [{ name: CHARACTERS.HATBOX_GHOST, level: 5 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.PHINEAS, tokenType: EARS }]
    },
    {
        name: "Compare Hats",
        characters: [
            { name: CHARACTERS.HATBOX_GHOST, level: 6 },
            { name: CHARACTERS.PHINEAS, level: 6 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.HAUNTED_MANSION }],
        tokens: [{ name: CHARACTERS.BRIDE, tokenType: EARS }]
    },
    //hatbox ghost end
    //r2d2
    {
        name: "Seek Help",
        characters: [{ name: CHARACTERS.R2D2, level: 1 }],
        time: "2h",
        tokens: [
            { name: GROUPS.STAR_WARS, tokenType: COMMON },
            { name: CHARACTERS.C3PO, tokenType: TOKEN },
            { name: CHARACTERS.C3PO, tokenType: EARS }
        ]
    },
    {
        name: "Interface with Friends",
        characters: [{ name: CHARACTERS.R2D2, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: EARS },
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: TOKEN },
            { name: CHARACTERS.BOBA_FETT, tokenType: EARS }
        ]
    },
    {
        name: "Get Up to Speed",
        characters: [
            { name: CHARACTERS.R2D2, level: 2 },
            { name: CHARACTERS.FINN, level: 2 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }],
        tokens: [{ name: CHARACTERS.FENNEC_SHAND, tokenType: TOKEN }]
    },
    {
        name: "Collaborative Help",
        characters: [
            { name: CHARACTERS.R2D2, level: 3 },
            { name: CHARACTERS.BB8, level: 3 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }],
        tokens: [{ name: CHARACTERS.R2D2, tokenType: EARS }]
    },
    {
        name: "Dreadful Data",
        characters: [
            { name: CHARACTERS.R2D2, level: 4 },
            { name: CHARACTERS.C3PO, level: 4 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BB8, tokenType: EARS },
            { name: CHARACTERS.KYLO_REN, tokenType: TOKEN }
        ]
    },
    {
        name: "Offer Information",
        characters: [{ name: CHARACTERS.R2D2, level: 6 }],
        time: "8h",
        tokens: [
            { name: CHARACTERS.FINN, tokenType: EARS },
            { name: CHARACTERS.POE, tokenType: EARS }
        ]
    },
    {
        name: "Salvage Data",
        characters: [{ name: CHARACTERS.R2D2, level: 7 }],
        time: "24h",
        tokens: [
            { name: CHARACTERS.GENERAL_HUX, tokenType: EARS },
            { name: CHARACTERS.REY, tokenType: TOKEN }
        ]
    },
    {
        name: "Friendly Repairs",
        characters: [
            { name: CHARACTERS.R2D2, level: 5 },
            { name: CHARACTERS.C3PO, level: 3 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.HAN_SOLO, tokenType: EARS }]
    },
    {
        name: "Complete the Map",
        characters: [
            { name: CHARACTERS.R2D2, level: 4 },
            { name: CHARACTERS.BB8, level: 4 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.KUIIL, tokenType: TOKEN }]
    },
    {
        name: "Casual Concerns",
        characters: [
            { name: CHARACTERS.R2D2, level: 8 },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 8 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: TOKEN }]
    },
    {
        name: "Test Compatibility",
        characters: [
            { name: CHARACTERS.R2D2, level: 6 },
            { name: CHARACTERS.C3PO, level: 6 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [{ name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN }]
    },
    //r2d2 end
    //c3po
    {
        name: "Where Did I Leave That?",
        characters: [{ name: CHARACTERS.C3PO, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.STAR_WARS, tokenType: COMMON },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: TOKEN },
            { name: CHARACTERS.LEIA_ORGANA, tokenType: EARS }
        ]
    },
    {
        name: "Find the Others",
        characters: [{ name: CHARACTERS.C3PO, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [
            { name: CHARACTERS.R2D2, tokenType: TOKEN },
            { name: CHARACTERS.FINN, tokenType: TOKEN }
        ]
    },
    {
        name: "Offer Expertise",
        characters: [{ name: CHARACTERS.C3PO, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [
            { name: CHARACTERS.R2D2, tokenType: EARS },
            { name: CHARACTERS.KUIIL, tokenType: TOKEN },
            { name: CHARACTERS.FENNEC_SHAND, tokenType: EARS }
        ]
    },
    {
        name: "Check for Old Droids",
        characters: [{ name: CHARACTERS.C3PO, level: 7 }],
        time: "12h",
        tokens: [{ name: CHARACTERS.POE, tokenType: TOKEN }]
    },
    {
        name: "File a Complaint",
        characters: [{ name: CHARACTERS.C3PO, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [
            { name: CHARACTERS.CARA_DUNE, tokenType: EARS },
            { name: CHARACTERS.THE_CHILD, tokenType: TOKEN }
        ]
    },
    {
        name: "Status Quo",
        characters: [
            { name: CHARACTERS.C3PO, level: 4 },
            { name: CHARACTERS.POE, level: 4 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: TOKEN },
            { name: CHARACTERS.BOBA_FETT, tokenType: TOKEN }
        ]
    },
    //c3po end
    //rey
    {
        name: "Understanding",
        characters: [{ name: CHARACTERS.REY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Discover the Past",
        characters: [
            { name: CHARACTERS.REY, level: 1 },
            { name: CHARACTERS.R2D2, level: null }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [{ name: CHARACTERS.CARA_DUNE, tokenType: TOKEN }]
    },
    {
        name: "Co-pilot a Plan",
        characters: [{ name: CHARACTERS.REY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [
            { name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: EARS }
        ]
    },
    {
        name: "What the Hux",
        characters: [
            { name: CHARACTERS.REY, level: 2 },
            { name: CHARACTERS.GENERAL_HUX, level: 2 }
        ],
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        time: "4h"
    },
    {
        name: "Casual Catch-Up",
        characters: [
            { name: CHARACTERS.REY, level: 3 },
            { name: CHARACTERS.FINN, level: 3 }
        ],
        time: "4h",
        required: [
            {
                name: BUILDINGS.RESISTANCE_SPEEDERS,
                level: 1,
                type: "building"
            }
        ],
        tokens: [{ name: CHARACTERS.KYLO_REN, tokenType: EARS }]
    },
    {
        name: "Relax",
        characters: [{ name: CHARACTERS.REY, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: EARS },
            { name: CHARACTERS.AHSOKA, tokenType: TOKEN }
        ]
    },
    {
        name: "Seek Answers",
        characters: [{ name: CHARACTERS.REY, level: 3 }],
        time: "8h",
        required: [
            { name: BUILDINGS.TREADSPEEDER_BASE, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.R2D2, tokenType: TOKEN }]
    },
    {
        name: "Stock Up on Rations",
        characters: [{ name: CHARACTERS.REY, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }],
        tokens: [
            { name: CHARACTERS.FINN, tokenType: TOKEN },
            { name: CHARACTERS.POE, tokenType: EARS },
            { name: CHARACTERS.FENNEC_SHAND, tokenType: EARS }
        ]
    },
    {
        name: "Unexpected Visions",
        characters: [
            { name: CHARACTERS.REY, level: 3 },
            { name: CHARACTERS.KYLO_REN, level: 3 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.C3PO, tokenType: EARS },
            { name: CHARACTERS.BB8, tokenType: TOKEN },
            { name: CHARACTERS.KUIIL, tokenType: EARS }
        ]
    },
    {
        name: "Supply Information",
        characters: [
            { name: CHARACTERS.REY, level: 8 },
            { name: CHARACTERS.C3PO, level: 8 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.REY, tokenType: TOKEN }
        ]
    },
    //rey end
    //finn
    {
        name: "Stand Up, Stand Out",
        characters: [{ name: CHARACTERS.FINN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Make Connections",
        characters: [{ name: CHARACTERS.FINN, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [
            { name: CHARACTERS.C3PO, tokenType: EARS },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.POE, tokenType: EARS },
            { name: CHARACTERS.REY, tokenType: EARS }
        ]
    },
    {
        name: "Explore Uncertainties",
        characters: [{ name: CHARACTERS.FINN, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [
            { name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN },
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Flight Support",
        characters: [{ name: CHARACTERS.FINN, level: 3 }],
        time: "6h",
        required: [
            {
                name: BUILDINGS.RESISTANCE_X_WING,
                level: 1,
                type: "building"
            }
        ],
        tokens: [{ name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN }]
    },
    {
        name: "Greater Understanding",
        characters: [
            { name: CHARACTERS.FINN, level: 5 },
            { name: CHARACTERS.REY, level: 5 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.KYLO_REN, tokenType: EARS },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS }
        ]
    },
    {
        name: "Stand Out",
        characters: [
            { name: CHARACTERS.FINN, level: 7 },
            { name: CHARACTERS.POE, level: 7 }
        ],
        time: "2h",
        required: [
            {
                name: BUILDINGS.RESISTANCE_SPEEDERS,
                level: 1,
                type: "building"
            }
        ],
        tokens: [
            { name: CHARACTERS.FINN, tokenType: TOKEN },
            { name: CHARACTERS.FINN, tokenType: EARS },
            { name: CHARACTERS.POE, tokenType: TOKEN },
            { name: CHARACTERS.POE, tokenType: EARS }
        ]
    },
    {
        name: "Debrief",
        characters: [
            { name: CHARACTERS.FINN, level: 2 },
            { name: CHARACTERS.POE, level: 2 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.FINN, tokenType: EARS },
            { name: CHARACTERS.POE, tokenType: TOKEN }
        ]
    },
    {
        name: "Enjoying Freedom",
        characters: [{ name: CHARACTERS.FINN, level: 6 }],
        time: "4h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }]
    },
    {
        name: "Help Out",
        characters: [
            { name: CHARACTERS.FINN, level: 9 },
            { name: CHARACTERS.REY, level: 9 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: TOKEN }]
    },
    //finn end
    //bb8
    {
        name: "Offer Maintenance",
        characters: [{ name: CHARACTERS.BB8, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }],
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Search for a Ship",
        characters: [{ name: CHARACTERS.BB8, level: 1 }],
        level: 1,
        time: "6h",
        tokens: [
            { name: CHARACTERS.C3PO, tokenType: EARS },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: EARS },
            { name: CHARACTERS.REY, tokenType: TOKEN },
            { name: CHARACTERS.REY, tokenType: EARS },
            { name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN }
        ]
    },
    {
        name: "Check for the Others",
        characters: [{ name: CHARACTERS.BB8, level: 1 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.KYLO_REN, tokenType: TOKEN },
            { name: CHARACTERS.KYLO_REN, tokenType: EARS },
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Acquire Data",
        characters: [{ name: CHARACTERS.BB8, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [
            { name: CHARACTERS.FINN, tokenType: EARS },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: TOKEN }
        ]
    },
    {
        name: "Co-pilot",
        characters: [{ name: CHARACTERS.BB8, level: 2 }],
        time: "4h",
        required: [
            { name: BUILDINGS.RESISTANCE_X_WING, level: 2, type: "building" }
        ],
        tokens: [
            { name: CHARACTERS.KYLO_REN, tokenType: TOKEN },
            { name: CHARACTERS.KYLO_REN, tokenType: EARS }
        ]
    },
    {
        name: "Maintaining Friendships",
        characters: [
            { name: CHARACTERS.BB8, level: 3 },
            { name: CHARACTERS.FINN, level: 3 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.POE, tokenType: TOKEN },
            { name: CHARACTERS.GENERAL_HUX, tokenType: EARS }
        ]
    },
    {
        name: "That's Not Finn",
        characters: [
            { name: CHARACTERS.BB8, level: 7 },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 7 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [{ name: CHARACTERS.CARA_DUNE, tokenType: TOKEN }]
    },
    //bb8 end
    //poe
    {
        name: "Report Movement",
        characters: [{ name: CHARACTERS.POE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Escort the Other Kind",
        characters: [
            { name: CHARACTERS.POE, level: 1 },
            { name: CHARACTERS.C3PO, level: 1 }
        ],
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [{ name: CHARACTERS.C3PO, tokenType: TOKEN }]
    },
    {
        name: "Get Out of the Cockpit",
        characters: [{ name: CHARACTERS.POE, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [
            { name: CHARACTERS.FINN, tokenType: TOKEN },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: EARS },
            { name: CHARACTERS.GENERAL_HUX, tokenType: EARS }
        ]
    },
    {
        name: "Recon First Order",
        characters: [
            { name: CHARACTERS.POE, level: 2 },
            { name: CHARACTERS.GENERAL_HUX, level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [
            { name: CHARACTERS.KYLO_REN, tokenType: TOKEN },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS }
        ]
    },
    {
        name: "Source Some Parts",
        characters: [{ name: CHARACTERS.POE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [{ name: CHARACTERS.REY, tokenType: TOKEN }]
    },
    {
        name: "Offer Training",
        characters: [
            { name: CHARACTERS.POE, level: 4 },
            { name: CHARACTERS.FINN, level: 4 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BB8, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: EARS },
            { name: CHARACTERS.CARA_DUNE, tokenType: TOKEN }
        ]
    },
    {
        name: "Play Your Strengths",
        characters: [{ name: CHARACTERS.POE, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [
            { name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN },
            { name: CHARACTERS.GENERAL_HUX, tokenType: EARS },
            { name: CHARACTERS.FENNEC_SHAND, tokenType: EARS }
        ]
    },
    {
        name: "Plan Ahead",
        characters: [
            { name: CHARACTERS.POE, level: 4 },
            { name: CHARACTERS.FINN, level: 4 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.R2D2, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: EARS },
            { name: CHARACTERS.KUIIL, tokenType: EARS }
        ]
    },
    {
        name: "Be the Spark",
        characters: [{ name: CHARACTERS.POE, level: 6 }],
        time: "4h",
        required: [
            { name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building", level: 1 }
        ]
    },
    {
        name: "Fine Tuning",
        characters: [
            { name: CHARACTERS.POE, level: 10 },
            { name: CHARACTERS.BB8, level: 10 }
        ],
        time: "24h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: EARS }]
    },
    //poe end
    //kylo ren
    {
        name: "Find Answers",
        characters: [{ name: CHARACTERS.KYLO_REN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Remnants of the Past",
        characters: [{ name: CHARACTERS.KYLO_REN, level: 1 }],
        time: "2h",
        required: [{ name: BUILDINGS.CANTINA, level: 1, type: "building" }],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: EARS },
            { name: CHARACTERS.KYLO_REN, tokenType: TOKEN }
        ]
    },
    {
        name: "Question Everything",
        characters: [{ name: CHARACTERS.KYLO_REN, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [
            { name: CHARACTERS.C3PO, tokenType: TOKEN },
            { name: CHARACTERS.FINN, tokenType: EARS },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: EARS },
            { name: CHARACTERS.POE, tokenType: EARS }
        ]
    },
    {
        name: "Know Thy Enemy",
        characters: [{ name: CHARACTERS.KYLO_REN, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }],
        tokens: [
            { name: CHARACTERS.LEIA_ORGANA, tokenType: EARS },
            { name: CHARACTERS.HAN_SOLO, tokenType: EARS },
            { name: CHARACTERS.AHSOKA, tokenType: EARS }
        ]
    },
    {
        name: "Oversee Operations",
        characters: [
            { name: CHARACTERS.KYLO_REN, level: 6 },
            { name: CHARACTERS.GENERAL_HUX, level: 6 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [{ name: CHARACTERS.GENERAL_HUX, tokenType: EARS }]
    },
    {
        name: "Show of Force",
        characters: [
            { name: CHARACTERS.KYLO_REN, level: 8 },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 8 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.CANTINA, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.R2D2, tokenType: TOKEN }]
    },
    {
        name: "Battle Over Balance",
        characters: [
            { name: CHARACTERS.KYLO_REN, level: 7 },
            { name: CHARACTERS.REY, level: 7 }
        ],
        time: "12h",
        tokens: [
            { name: CHARACTERS.REY, tokenType: EARS },
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS }
        ]
    },
    //general hux //hux
    {
        name: "Ensure Order",
        characters: [{ name: CHARACTERS.GENERAL_HUX, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Code Enforcement",
        characters: [{ name: CHARACTERS.GENERAL_HUX, level: 1 }],
        time: "8h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [
            { name: CHARACTERS.R2D2, tokenType: EARS },
            { name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN },
            { name: CHARACTERS.REY, tokenType: TOKEN },
            { name: CHARACTERS.REY, tokenType: EARS }
        ]
    },
    {
        name: "Confront Enemies",
        characters: [{ name: CHARACTERS.GENERAL_HUX, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [
            { name: CHARACTERS.FINN, tokenType: TOKEN },
            { name: CHARACTERS.POE, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: TOKEN }
        ]
    },
    {
        name: "Revoke Flight Clearance",
        characters: [{ name: CHARACTERS.GENERAL_HUX, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [
            { name: CHARACTERS.REY, tokenType: TOKEN },
            { name: CHARACTERS.REY, tokenType: EARS }
        ]
    },
    {
        name: "Make Yourself Known",
        characters: [{ name: CHARACTERS.GENERAL_HUX, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.RESISTANCE_SPEEDERS, type: "building" }],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN }
        ]
    },
    {
        name: "Enact Code Enforcements",
        characters: [
            { name: CHARACTERS.GENERAL_HUX, level: 2 },
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 2 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.CANTINA, type: "building" }],
        tokens: [
            { name: CHARACTERS.KUIIL, tokenType: EARS },
            { name: CHARACTERS.BOBA_FETT, tokenType: TOKEN }
        ]
    },
    {
        name: "Optimize Process",
        characters: [
            { name: CHARACTERS.GENERAL_HUX, level: 9 },
            { name: CHARACTERS.KYLO_REN, level: 9 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: EARS }]
    },
    {
        name: "Discuss Tactics",
        characters: [
            { name: CHARACTERS.GENERAL_HUX, level: 7 },
            { name: CHARACTERS.KYLO_REN, level: 7 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [{ name: CHARACTERS.CARA_DUNE, tokenType: EARS }]
    },
    //general hux end //hux end
    //first order stormtrooper //stormtrooper
    {
        name: "Patrol the Area",
        characters: [{ name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.STAR_WARS, tokenType: COMMON },
            { name: CHARACTERS.FINN, tokenType: TOKEN },
            { name: CHARACTERS.FINN, tokenType: EARS },
            { name: CHARACTERS.POE, tokenType: TOKEN },
            { name: CHARACTERS.POE, tokenType: EARS }
        ]
    },
    {
        name: "Ascertain Numbers",
        characters: [{ name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Report for Duty",
        characters: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 1 },
            { name: CHARACTERS.GENERAL_HUX, level: 1 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.C3PO, tokenType: TOKEN },
            { name: CHARACTERS.AHSOKA, tokenType: EARS }
        ]
    },
    {
        name: "Enforce Standards",
        characters: [{ name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 2 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.BB8, tokenType: TOKEN },
            { name: CHARACTERS.BB8, tokenType: EARS },
            { name: CHARACTERS.DARTH_VADER, tokenType: EARS }
        ]
    },
    {
        name: "Demand Quality",
        characters: [{ name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 3 }],
        time: "8h",
        required: [
            {
                name: BUILDINGS.TREADSPEEDER_BASE,
                level: 1,
                type: "building"
            }
        ],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.GENERAL_HUX, tokenType: EARS },
            { name: CHARACTERS.KYLO_REN, tokenType: EARS }
        ]
    },
    {
        name: "Search for Spies",
        characters: [{ name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 4 }],
        time: "12h",
        required: [
            {
                name: BUILDINGS.RESISTANCE_SPEEDERS,
                level: 1,
                type: "building"
            }
        ],
        tokens: [
            { name: CHARACTERS.REY, tokenType: TOKEN },
            { name: CHARACTERS.REY, tokenType: EARS }
        ]
    },
    {
        name: "Organize Scouting Parties",
        characters: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 4 },
            { name: CHARACTERS.KYLO_REN, level: 4 }
        ],
        time: "24h",
        required: [{ name: BUILDINGS.TREADSPEEDER_BASE, type: "building" }],
        tokens: [{ name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN }]
    },
    {
        name: "Check for Illegal Cargo",
        characters: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, level: 3 },
            { name: CHARACTERS.GENERAL_HUX, level: 3 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.RESISTANCE_X_WING, type: "building" }],
        tokens: [{ name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS }]
    },
    //first order stormtrooper end //stormtrooper end
    //mandalorian //mando
    {
        name: "Plan the Next Mission",
        characters: [{ name: CHARACTERS.THE_MANDALORIAN, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.RAZOR_CREST }],
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Look for Bounty",
        characters: [{ name: CHARACTERS.THE_MANDALORIAN, level: 1 }],
        time: "6h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS },
            { name: CHARACTERS.CHEWBACCA, tokenType: TOKEN }
        ]
    },
    {
        name: "Reclaim Ship Parts",
        characters: [{ name: CHARACTERS.THE_MANDALORIAN, level: 2 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN }]
    },
    {
        name: "Negotiate Together",
        characters: [
            { name: CHARACTERS.THE_MANDALORIAN, level: 3 },
            { name: CHARACTERS.KUIIL, level: 3 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building" }],
        tokens: [{ name: CHARACTERS.KUIIL, tokenType: TOKEN }]
    },
    {
        name: "Return Bounty",
        characters: [{ name: CHARACTERS.THE_MANDALORIAN, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.NEVARRO_CITY, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.AHSOKA, tokenType: EARS },
            { name: CHARACTERS.BOBA_FETT, tokenType: TOKEN }
        ]
    },
    {
        name: "Look Over Bounties",
        characters: [
            { name: CHARACTERS.THE_MANDALORIAN, level: 4 },
            { name: CHARACTERS.GREEF_KARGA, level: 4 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.NEVARRO_CITY, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.THE_CHILD, tokenType: TOKEN },
            { name: CHARACTERS.FENNEC_SHAND, tokenType: TOKEN }
        ]
    },
    {
        name: "Discuss the Guild",
        characters: [
            { name: CHARACTERS.THE_MANDALORIAN, level: 4 },
            { name: CHARACTERS.GREEF_KARGA, level: 4 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.NEVARRO_CITY, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: TOKEN }]
    },
    {
        name: "Retrieving Bounties",
        characters: [
            { name: CHARACTERS.THE_MANDALORIAN, level: 3 },
            { name: CHARACTERS.GREEF_KARGA, level: 3 }
        ],
        time: "8h",
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: TOKEN }]
    },
    //mandalorian end //mando end
    //the child //child
    {
        name: "Eating",
        characters: [{ name: CHARACTERS.THE_CHILD, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Wait for Mando",
        characters: [{ name: CHARACTERS.THE_CHILD, level: 1 }],
        time: "6h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.CARA_DUNE, tokenType: TOKEN },
            { name: CHARACTERS.THE_CHILD, tokenType: TOKEN }
        ]
    },
    {
        name: "Hide Away",
        characters: [{ name: CHARACTERS.THE_CHILD, level: 2 }],
        time: "2h",
        required: [
            { name: BUILDINGS.NEVARRO_CITY, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS },
            { name: CHARACTERS.AHSOKA, tokenType: TOKEN },
            { name: CHARACTERS.BOBA_FETT, tokenType: TOKEN }
        ]
    },
    {
        name: "Explore the Ship",
        characters: [{ name: CHARACTERS.THE_CHILD, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building" }],
        tokens: [
            { name: CHARACTERS.KUIIL, tokenType: TOKEN },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS }
        ]
    },
    {
        name: "Touch Buttons",
        characters: [{ name: CHARACTERS.THE_CHILD, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS }]
    },
    {
        name: "Wait in the Desert",
        characters: [
            { name: CHARACTERS.THE_CHILD, level: 5 },
            { name: CHARACTERS.CARA_DUNE, level: 5 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building" }],
        tokens: [
            { name: CHARACTERS.CARA_DUNE, tokenType: EARS },
            { name: CHARACTERS.FENNEC_SHAND, tokenType: EARS }
        ]
    },
    {
        name: "Touch Buttons",
        characters: [{ name: CHARACTERS.THE_CHILD, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS }]
    },
    //the child end //child end
    //kuiil
    {
        name: "Negotiate",
        characters: [{ name: CHARACTERS.KUIIL, level: 1 }],
        time: "6h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building" }],
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Looking for Blurrg",
        characters: [{ name: CHARACTERS.KUIIL, level: 1 }],
        time: "6h",
        tokens: [
            { name: GROUPS.STAR_WARS, tokenType: COMMON },
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: TOKEN },
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS },
            { name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS }
        ]
    },
    {
        name: "Patiently Waiting",
        characters: [
            { name: CHARACTERS.KUIIL, level: 6 },
            { name: CHARACTERS.THE_CHILD, level: 6 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.KUIIL, tokenType: TOKEN }]
    },
    {
        name: "I Have Spoken",
        characters: [
            { name: CHARACTERS.KUIIL, level: 2 },
            { name: CHARACTERS.THE_MANDALORIAN, level: 2 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.KUIIL, tokenType: EARS }]
    },
    {
        name: "Await Instructions",
        characters: [{ name: CHARACTERS.KUIIL, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.NEVARRO_CITY, type: "building" }],
        tokens: [
            { name: CHARACTERS.THE_CHILD, tokenType: TOKEN },
            { name: CHARACTERS.THE_CHILD, tokenType: EARS }
        ]
    },
    {
        name: "Check on Blurrgs",
        characters: [{ name: CHARACTERS.KUIIL, level: 4 }],
        time: "12h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building" }],
        tokens: [{ name: CHARACTERS.CARA_DUNE, tokenType: TOKEN }]
    },
    {
        name: "Craft a Crib",
        characters: [{ name: CHARACTERS.KUIIL, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building" }],
        tokens: [
            { name: CHARACTERS.THE_CHILD, tokenType: TOKEN },
            { name: CHARACTERS.THE_CHILD, tokenType: EARS }
        ]
    },
    {
        name: "Explain the Mission",
        characters: [
            { name: CHARACTERS.KUIIL, level: 7 },
            { name: CHARACTERS.THE_MANDALORIAN, level: 7 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building" }],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN }
        ]
    },
    //kuiil end
    //cara dune
    {
        name: "Preparing for a Fight",
        characters: [{ name: CHARACTERS.CARA_DUNE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Look Out for a Fight",
        characters: [{ name: CHARACTERS.CARA_DUNE, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.NEVARRO_CITY, type: "building" }],
        tokens: [
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS },
            { name: CHARACTERS.THE_CHILD, tokenType: EARS }
        ]
    },
    {
        name: "Scout the City",
        characters: [{ name: CHARACTERS.CARA_DUNE, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.NEVARRO_CITY, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.KUIIL, tokenType: EARS },
            { name: CHARACTERS.CARA_DUNE, tokenType: TOKEN }
        ]
    },
    {
        name: "Sort Out Details",
        characters: [
            { name: CHARACTERS.CARA_DUNE, level: 5 },
            { name: CHARACTERS.THE_MANDALORIAN, level: 5 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.KUIIL, tokenType: EARS },
            { name: CHARACTERS.GREEF_KARGA, tokenType: EARS }
        ]
    },
    {
        name: "Look for Mando",
        characters: [{ name: CHARACTERS.CARA_DUNE, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building" }],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: EARS }]
    },
    {
        name: "Explore the Area",
        characters: [{ name: CHARACTERS.CARA_DUNE, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.THE_CHILD, tokenType: EARS }]
    },
    {
        name: "Protect the Kid",
        characters: [
            { name: CHARACTERS.CARA_DUNE, level: 9 },
            { name: CHARACTERS.THE_CHILD, level: 9 }
        ],
        time: "12h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN }
        ]
    },
    //cara dune end
    //greef karga
    {
        name: "Prepare Bounty Pucks",
        characters: [{ name: CHARACTERS.GREEF_KARGA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Hand Out Bounties",
        characters: [{ name: CHARACTERS.GREEF_KARGA, level: 1 }],
        time: "6h",
        required: [
            { name: BUILDINGS.NEVARRO_CITY, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.FIRST_ORDER_STORMTROOPER, tokenType: TOKEN },
            { name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN }
        ]
    },
    {
        name: "Gather Information",
        characters: [{ name: CHARACTERS.GREEF_KARGA, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building" }],
        tokens: [
            { name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS },
            { name: CHARACTERS.CHEWBACCA, tokenType: EARS }
        ]
    },
    {
        name: "Talk about an Old Mission",
        characters: [
            { name: CHARACTERS.GREEF_KARGA, level: 2 },
            { name: CHARACTERS.CARA_DUNE, level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.SANDCRAWLER, type: "building" }],
        tokens: [{ name: CHARACTERS.CARA_DUNE, tokenType: EARS }]
    },
    {
        name: "Meet with Mando",
        characters: [{ name: CHARACTERS.GREEF_KARGA, level: 3 }],
        time: "2h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building" }],
        tokens: [{ name: CHARACTERS.BB8, tokenType: TOKEN }]
    },
    {
        name: "A Meeting",
        characters: [
            { name: CHARACTERS.GREEF_KARGA, level: 3 },
            { name: CHARACTERS.CARA_DUNE, level: 3 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building" }],
        tokens: [{ name: CHARACTERS.KUIIL, tokenType: EARS }]
    },
    {
        name: "Liberation Plans",
        characters: [
            { name: CHARACTERS.GREEF_KARGA, level: 5 },
            { name: CHARACTERS.CARA_DUNE, level: 5 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.RAZOR_CREST, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.CARA_DUNE, tokenType: EARS }]
    },
    //greef karga end
    //ahsoka tano
    {
        name: "Swift Pursuit",
        characters: [{ name: CHARACTERS.AHSOKA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Provide Counsel",
        characters: [{ name: CHARACTERS.AHSOKA, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.FENNEC_SHAND, tokenType: TOKEN },
            { name: CHARACTERS.BOBA_FETT, tokenType: EARS }
        ]
    },
    {
        name: "Search for Clues",
        characters: [{ name: CHARACTERS.AHSOKA, level: 3 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.AHSOKA, tokenType: EARS }]
    },
    //ahsoka tano end //ahsoka end
    //boba fett
    {
        name: "Blast Off",
        characters: [{ name: CHARACTERS.BOBA_FETT, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.STAR_WARS, tokenType: COMMON },
            {
                name: SPECIAL_ITEMS.BOBA_FETT_BOUNTY_HUNTER_FABRIC,
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Watch For Trouble",
        characters: [{ name: CHARACTERS.BOBA_FETT, level: 1 }],
        time: "2h",
        required: [
            {
                name: "Bounty Hunter",
                character: CHARACTERS.BOBA_FETT,
                type: "costume"
            }
        ],
        tokens: [
            { name: CHARACTERS.YODA, tokenType: EARS },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: TOKEN }
        ]
    },
    {
        name: "Reclaim Armor",
        characters: [{ name: CHARACTERS.BOBA_FETT, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.AHSOKA, tokenType: TOKEN },
            { name: CHARACTERS.FENNEC_SHAND, tokenType: EARS }
        ]
    },
    {
        name: "Search Through Wares",
        characters: [{ name: CHARACTERS.BOBA_FETT, level: 3 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.BOBA_FETT, tokenType: EARS }]
    },
    //boba fett end
    //fennec shand
    {
        name: "Size Things Up",
        characters: [{ name: CHARACTERS.FENNEC_SHAND, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Like a Ghost",
        characters: [{ name: CHARACTERS.FENNEC_SHAND, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RAZOR_CREST }],
        tokens: [
            { name: CHARACTERS.AHSOKA, tokenType: EARS },
            { name: CHARACTERS.BOBA_FETT, tokenType: TOKEN }
        ]
    },
    {
        name: "Seek Bounty",
        characters: [{ name: CHARACTERS.FENNEC_SHAND, level: 3 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.FENNEC_SHAND, tokenType: TOKEN }]
    },
    //fennec shand end //fennec end
    //barley
    {
        name: "The Right Path",
        characters: [{ name: CHARACTERS.BARLEY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ONWARD, tokenType: COMMON }]
    },
    {
        name: "Equestrian Care",
        characters: [{ name: CHARACTERS.BARLEY, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.GUINEVERE, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.BARLEY, tokenType: TOKEN },
            { name: CHARACTERS.LAUREL, tokenType: TOKEN }
        ]
    },
    {
        name: "Trusty Steed",
        characters: [{ name: CHARACTERS.BARLEY, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.GUINEVERE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BARLEY, tokenType: TOKEN },
            { name: CHARACTERS.LAUREL, tokenType: TOKEN },
            { name: CHARACTERS.LAUREL, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: EARS }
        ]
    },
    {
        name: "Three Memories",
        characters: [
            { name: CHARACTERS.BARLEY, level: 3 },
            { name: CHARACTERS.DAD, level: 3 }
        ],
        time: "6h",
        tokens: [
            { name: CHARACTERS.DAD, tokenType: TOKEN },
            { name: CHARACTERS.DAD, tokenType: EARS }
        ]
    },
    {
        name: "Request a Quest",
        characters: [{ name: CHARACTERS.BARLEY, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.MANTICORE_TAVERN, type: "building" }],
        tokens: [
            { name: CHARACTERS.BARLEY, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN },
            { name: CHARACTERS.DAD, tokenType: TOKEN }
        ]
    },
    {
        name: "Quests of Yore",
        characters: [{ name: CHARACTERS.BARLEY, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building" }],
        tokens: [{ name: CHARACTERS.MANTICORE, tokenType: EARS }]
    },
    {
        name: "Barley!",
        characters: [
            { name: CHARACTERS.BARLEY, level: 1 },
            { name: CHARACTERS.DAD, level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.GUINEVERE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BARLEY, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: TOKEN }
        ]
    },
    {
        name: "Gut Instinct",
        characters: [{ name: CHARACTERS.BARLEY, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.ONWARD, tokenType: COMMON },
            { name: CHARACTERS.COLT, tokenType: TOKEN }
        ]
    },
    {
        name: "Preserving History",
        characters: [
            { name: CHARACTERS.BARLEY, level: 7 },
            { name: CHARACTERS.COLT, level: 7 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.PATH_OF_RAVENS, type: "building" }],
        tokens: [{ name: CHARACTERS.IAN, tokenType: TOKEN }]
    },
    //blazey
    {
        name: "Sniff Around",
        characters: [{ name: CHARACTERS.BLAZEY, level: 2 }],
        required: [{ name: BUILDINGS.GUINEVERE, type: "building" }],
        time: "1h",
        tokens: [{ name: GROUPS.ONWARD, tokenType: COMMON }]
    },
    {
        name: "Draggo Walk",
        characters: [{ name: CHARACTERS.BLAZEY, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.ONWARD, tokenType: COMMON },
            { name: CHARACTERS.BARLEY, tokenType: TOKEN },
            { name: CHARACTERS.BARLEY, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: TOKEN },
            { name: CHARACTERS.COLT, tokenType: EARS }
        ]
    },
    {
        name: "Snacks",
        characters: [
            { name: CHARACTERS.BLAZEY, level: 2 },
            { name: CHARACTERS.BARLEY, level: 2 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.BLAZEY, tokenType: TOKEN },
            { name: CHARACTERS.BLAZEY, tokenType: EARS }
        ]
    },
    {
        name: "Fiery Foraging",
        characters: [{ name: CHARACTERS.BLAZEY, level: 3 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.DAD, tokenType: TOKEN },
            { name: CHARACTERS.DAD, tokenType: EARS }
        ]
    },
    {
        name: "Food?",
        characters: [{ name: CHARACTERS.BLAZEY, level: 4 }],
        time: "12h",
        required: [
            { name: BUILDINGS.MANTICORE_TAVERN, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.IAN, tokenType: TOKEN }]
    },
    {
        name: "A Quick Walk",
        characters: [{ name: CHARACTERS.BLAZEY, level: 5 }],
        time: "8h",
        required: [
            { name: BUILDINGS.PATH_OF_RAVENS, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.BLAZEY, tokenType: TOKEN },
            { name: CHARACTERS.BLAZEY, tokenType: EARS },
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN }
        ]
    },
    //ian
    {
        name: "Personal Time",
        characters: [{ name: CHARACTERS.IAN, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building" }],
        tokens: [
            { name: CHARACTERS.IAN, tokenType: TOKEN },
            { name: CHARACTERS.IAN, tokenType: EARS }
        ]
    },
    {
        name: "Invite Friends",
        characters: [{ name: CHARACTERS.IAN, level: 1 }],
        time: "8h",
        tokens: [
            { name: GROUPS.ONWARD, tokenType: COMMON },
            { name: CHARACTERS.IAN, tokenType: TOKEN },
            { name: CHARACTERS.IAN, tokenType: EARS }
        ]
    },
    {
        name: "Relax",
        characters: [{ name: CHARACTERS.IAN, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.PATH_OF_RAVENS, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.BARLEY, tokenType: TOKEN },
            { name: CHARACTERS.DAD, tokenType: EARS },
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    {
        name: "Solo Snacking",
        characters: [{ name: CHARACTERS.IAN, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.MANTICORE_TAVERN, type: "building" }],
        tokens: [
            { name: CHARACTERS.COLT, tokenType: TOKEN },
            { name: CHARACTERS.BLAZEY, tokenType: TOKEN }
        ]
    },
    {
        name: "Treat Mom",
        characters: [
            { name: CHARACTERS.IAN, level: 3 },
            { name: CHARACTERS.LAUREL, level: 3 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.MANTICORE_TAVERN, type: "building", level: 2 }
        ],
        tokens: [{ name: CHARACTERS.LAUREL, tokenType: EARS }]
    },
    {
        name: "Casual Friendships",
        characters: [
            { name: CHARACTERS.IAN, level: 4 },
            { name: CHARACTERS.MANTICORE, level: 4 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.PATH_OF_RAVENS, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.COLT, tokenType: EARS }]
    },
    //laurel
    {
        name: "Mighty Warrior",
        characters: [{ name: CHARACTERS.LAUREL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ONWARD, tokenType: COMMON }]
    },
    {
        name: "Enjoy the Silence",
        characters: [{ name: CHARACTERS.LAUREL, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BARLEY, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    {
        name: "Kingdom Cleanup",
        characters: [{ name: CHARACTERS.LAUREL, level: 2 }],
        time: "6h",
        required: [
            { name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.LAUREL, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    {
        name: "Zero Obligations",
        characters: [{ name: CHARACTERS.LAUREL, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MANTICORE_TAVERN, type: "building" }],
        tokens: [{ name: CHARACTERS.MANTICORE, tokenType: TOKEN }]
    },
    {
        name: "Quick Cleaning",
        characters: [{ name: CHARACTERS.LAUREL, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.GUINEVERE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BLAZEY, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN }
        ]
    },
    {
        name: "Girls Night",
        characters: [
            { name: CHARACTERS.LAUREL, level: 4 },
            { name: CHARACTERS.MANTICORE, level: 4 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.MANTICORE_TAVERN, type: "building", level: 2 }
        ],
        tokens: [{ name: CHARACTERS.IAN, tokenType: EARS }]
    },
    //manticore //the manticore
    {
        name: "The Manticore",
        characters: [{ name: CHARACTERS.MANTICORE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ONWARD, tokenType: COMMON }]
    },
    {
        name: "Stretch Those Legs",
        characters: [{ name: CHARACTERS.MANTICORE, level: 2 }],
        time: "8h",
        required: [
            { name: BUILDINGS.PATH_OF_RAVENS, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.BLAZEY, tokenType: EARS },
            { name: CHARACTERS.LAUREL, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN }
        ]
    },
    {
        name: "Quest Delivery",
        characters: [{ name: CHARACTERS.MANTICORE, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.GUINEVERE, type: "building" }],
        tokens: [
            { name: CHARACTERS.COLT, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    {
        name: "Keeping Fit",
        characters: [
            { name: CHARACTERS.MANTICORE, level: 2 },
            { name: CHARACTERS.LAUREL, level: 2 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.COLT, tokenType: TOKEN },
            { name: CHARACTERS.COLT, tokenType: EARS },
            { name: CHARACTERS.DAD, tokenType: TOKEN }
        ]
    },
    {
        name: "Exercise Those Wings",
        characters: [
            { name: CHARACTERS.MANTICORE, level: 6 },
            { name: CHARACTERS.LAUREL, level: 6 }
        ],
        time: "12h",
        tokens: [{ name: CHARACTERS.IAN, tokenType: EARS }]
    },
    {
        name: "Suburban Safety",
        characters: [{ name: CHARACTERS.MANTICORE, level: 6 }],
        time: "12h",
        required: [
            { name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.BARLEY, tokenType: EARS }]
    },
    //colt
    {
        name: "Stepping Up",
        characters: [{ name: CHARACTERS.COLT, level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building" }],
        tokens: [{ name: GROUPS.ONWARD, tokenType: COMMON }]
    },
    {
        name: "Police Business",
        characters: [{ name: CHARACTERS.COLT, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.ONWARD, tokenType: COMMON },
            { name: CHARACTERS.BLAZEY, tokenType: EARS },
            { name: CHARACTERS.DAD, tokenType: EARS }
        ]
    },
    {
        name: "Conversation Concerns",
        characters: [
            { name: CHARACTERS.COLT, level: 2 },
            { name: CHARACTERS.BARLEY, level: 2 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.BARLEY, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: TOKEN },
            { name: CHARACTERS.COLT, tokenType: EARS }
        ]
    },
    {
        name: "Hardly Working",
        characters: [{ name: CHARACTERS.COLT, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.MANTICORE_TAVERN, type: "building" }],
        tokens: [
            { name: CHARACTERS.LAUREL, tokenType: TOKEN },
            { name: CHARACTERS.LAUREL, tokenType: EARS },
            { name: CHARACTERS.COLT, tokenType: EARS }
        ]
    },
    {
        name: "Welfare Check",
        characters: [{ name: CHARACTERS.COLT, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building" }],
        tokens: [{ name: CHARACTERS.MANTICORE, tokenType: TOKEN }]
    },
    {
        name: "Take a Statement",
        characters: [
            { name: CHARACTERS.COLT, level: 3 },
            { name: CHARACTERS.MANTICORE, level: 3 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.MANTICORE_TAVERN, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.BARLEY, tokenType: EARS }]
    },
    {
        name: "Confirm Legalities",
        characters: [{ name: CHARACTERS.COLT, level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.GUINEVERE, type: "building" }],
        tokens: [{ name: CHARACTERS.LAUREL, tokenType: TOKEN }]
    },
    {
        name: "Family Matters",
        characters: [
            { name: CHARACTERS.COLT, level: 6 },
            { name: CHARACTERS.LAUREL, level: 6 }
        ],
        time: "4h",
        required: [
            { name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.COLT, tokenType: EARS },
            { name: CHARACTERS.LAUREL, tokenType: EARS }
        ]
    },
    {
        name: "Discuss Infractions",
        characters: [
            { name: CHARACTERS.COLT, level: 6 },
            { name: CHARACTERS.BARLEY, level: 6 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.GUINEVERE, type: "building", level: 2 }],
        tokens: [{ name: CHARACTERS.IAN, tokenType: TOKEN }]
    },
    //dad
    {
        name: "Barley?",
        characters: [{ name: CHARACTERS.DAD, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ONWARD, tokenType: COMMON }]
    },
    {
        name: "Lost Laundry",
        characters: [{ name: CHARACTERS.DAD, level: 1 }],
        time: "4h",
        tokens: [
            { name: GROUPS.ONWARD, tokenType: COMMON },
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    {
        name: "Feeling Free",
        characters: [{ name: CHARACTERS.DAD, level: 1 }],
        time: "4h",
        required: [
            { name: BUILDINGS.PATH_OF_RAVENS, type: "building", level: 2 }
        ],
        tokens: [
            { name: CHARACTERS.BLAZEY, tokenType: TOKEN },
            { name: CHARACTERS.BLAZEY, tokenType: EARS },
            { name: CHARACTERS.LAUREL, tokenType: TOKEN }
        ]
    },
    {
        name: "Navigational Error",
        characters: [{ name: CHARACTERS.DAD, level: 1 }],
        time: "6h",
        required: [
            { name: BUILDINGS.MANTICORE_TAVERN, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.MANTICORE, tokenType: TOKEN },
            { name: CHARACTERS.MANTICORE, tokenType: EARS }
        ]
    },
    {
        name: "Feeling Out Floors",
        characters: [{ name: CHARACTERS.DAD, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.LIGHTFOOT_HOUSE, type: "building" }],
        tokens: [
            { name: CHARACTERS.IAN, tokenType: TOKEN },
            { name: CHARACTERS.IAN, tokenType: EARS }
        ]
    },
    //phil
    {
        name: "Keep Your Toga On",
        characters: [{ name: "Phil", level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [{ name: "Hercules", tokenType: COMMON }]
    },
    {
        name: "Scouting for Talent",
        characters: [{ name: CHARACTERS.PHIL, level: 1 }],
        time: "2h",
        tokens: [
            { name: "Hercules", tokenType: COMMON },
            { name: CHARACTERS.PEGASUS, tokenType: TOKEN },
            { name: CHARACTERS.PANIC, tokenType: TOKEN }
        ]
    },
    {
        name: "Philoctetes",
        characters: [{ name: CHARACTERS.PHIL, level: 1 }],
        time: "4h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [{ name: CHARACTERS.MEG, tokenType: EARS }]
    },
    {
        name: "Two Words",
        characters: [{ name: CHARACTERS.PHIL, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.STATUE_GARDEN }],
        tokens: [{ name: CHARACTERS.PAIN, tokenType: EARS }]
    },
    {
        name: "Trainer of Heroes",
        characters: [{ name: CHARACTERS.PHIL, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.HADES, tokenType: TOKEN }]
    },
    {
        name: "Dream Again",
        characters: [{ name: CHARACTERS.PHIL, level: 5 }],
        time: "8h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS }],
        tokens: [
            { name: CHARACTERS.HERCULES, tokenType: EARS },
            { name: CHARACTERS.HADES, tokenType: TOKEN }
        ]
    },
    //phil end
    //hercules
    {
        name: "Hero's Welcome",
        characters: [{ name: "Hercules", level: 1 }],
        time: "1h",
        tokens: [{ name: "Hercules", tokenType: COMMON }]
    },
    {
        name: "Check for Trouble",
        characters: [{ name: "Hercules", level: 1 }],
        time: "6h",
        required: [
            { name: BUILDINGS.STATUE_GARDEN, type: "building", level: 1 }
        ],
        tokens: []
    },
    {
        name: "Farm Boy Routine",
        characters: [{ name: "Hercules", level: 1 }],
        time: "8h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [{ name: CHARACTERS.HADES, tokenType: TOKEN }]
    },
    {
        name: "Most Anywhere",
        characters: [{ name: CHARACTERS.HERCULES, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [{ name: CHARACTERS.PAIN, tokenType: TOKEN }]
    },
    {
        name: "The Extra Guy",
        characters: [{ name: CHARACTERS.HERCULES, level: 2 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.MEG, tokenType: EARS },
            { name: CHARACTERS.HERCULES, tokenType: TOKEN }
        ]
    },
    {
        name: "Never Let Down",
        characters: [{ name: CHARACTERS.HERCULES, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.PAIN, tokenType: TOKEN }]
    },
    {
        name: "Maintenance",
        characters: [
            { name: CHARACTERS.HERCULES, level: 2 },
            { name: "Phil", level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [{ name: CHARACTERS.PHIL, tokenType: EARS }]
    },
    {
        name: "Play Hooky",
        characters: [
            { name: CHARACTERS.HERCULES, level: 2 },
            { name: "Meg", level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [{ name: CHARACTERS.MEG, tokenType: EARS }]
    },
    {
        name: "Keep It Up",
        characters: [
            { name: CHARACTERS.HERCULES, level: 2 },
            { name: CHARACTERS.PEGASUS, level: 2 }
        ],
        time: "6h",
        tokens: [{ name: CHARACTERS.HADES, tokenType: TOKEN }]
    },
    {
        name: "Use Your Head",
        characters: [{ name: CHARACTERS.HERCULES, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.TRAINING_GROUNDS, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.PEGASUS, tokenType: EARS },
            { name: CHARACTERS.PANIC, tokenType: EARS }
        ]
    },
    {
        name: "Strength of Heart",
        characters: [
            { name: CHARACTERS.HERCULES, level: 3 },
            { name: CHARACTERS.PEGASUS, level: 3 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.HADES, tokenType: TOKEN }]
    },
    //hercules end
    //meg
    {
        name: "Second Chances",
        characters: [{ name: "Meg", level: 1 }],
        time: "1h",
        tokens: [{ name: "Hercules", tokenType: COMMON }]
    },
    {
        name: "Each to Their Own",
        characters: [{ name: CHARACTERS.MEG, level: 1 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.MEG, tokenType: TOKEN },
            { name: CHARACTERS.PAIN, tokenType: EARS },
            { name: CHARACTERS.HADES, tokenType: EARS }
        ]
    },
    {
        name: "I'm a Damsel",
        characters: [{ name: CHARACTERS.MEG, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [{ name: CHARACTERS.PHIL, tokenType: EARS }]
    },
    {
        name: "I'm in Distress",
        characters: [
            { name: CHARACTERS.MEG, level: 1 },
            { name: CHARACTERS.PHIL, level: 1 }
        ],
        time: "8h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [
            { name: CHARACTERS.PHIL, tokenType: EARS },
            { name: CHARACTERS.MEG, tokenType: TOKEN },
            { name: CHARACTERS.MEG, tokenType: EARS }
        ]
    },
    {
        name: "Personal Space",
        characters: [{ name: CHARACTERS.MEG, level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.STATUE_GARDEN, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.MEG, tokenType: EARS },
            { name: CHARACTERS.HADES, tokenType: EARS }
        ]
    },
    {
        name: "Straight Talk",
        characters: [{ name: CHARACTERS.MEG, level: 5 }],
        time: "6h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [{ name: CHARACTERS.HERCULES, tokenType: TOKEN }]
    },
    {
        name: "Enjoy the Day Off",
        characters: [{ name: CHARACTERS.MEG, level: 6 }],
        time: "4h",
        required: [
            { name: BUILDINGS.STATUE_GARDEN, type: "building", level: 2 }
        ],
        tokens: [{ name: CHARACTERS.HADES, tokenType: EARS }]
    },
    //meg end
    //pegasus
    {
        name: "Participate",
        characters: [{ name: "Pegasus", level: 1 }],
        time: "1h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [{ name: "Hercules", tokenType: COMMON }]
    },
    {
        name: "Call of Duty",
        characters: [{ name: CHARACTERS.PEGASUS, level: 1 }],
        time: "6h",
        tokens: [
            { name: "Hercules", tokenType: COMMON },
            { name: CHARACTERS.PHIL, tokenType: EARS }
        ]
    },
    {
        name: "Tranquility",
        characters: [{ name: CHARACTERS.PEGASUS, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [{ name: CHARACTERS.MEG, tokenType: TOKEN }]
    },
    {
        name: "Spectate",
        characters: [{ name: CHARACTERS.PEGASUS, level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [
            { name: CHARACTERS.PANIC, tokenType: TOKEN },
            { name: CHARACTERS.PANIC, tokenType: EARS }
        ]
    },
    {
        name: "Look for Meg",
        characters: [{ name: CHARACTERS.PEGASUS, level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [
            { name: CHARACTERS.PEGASUS, tokenType: TOKEN },
            { name: CHARACTERS.PEGASUS, tokenType: EARS }
        ]
    },
    {
        name: "Check for Orders",
        characters: [{ name: CHARACTERS.PEGASUS, level: 3 }],
        time: "8h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [
            { name: CHARACTERS.HERCULES, tokenType: TOKEN },
            { name: CHARACTERS.HERCULES, tokenType: EARS }
        ]
    },
    {
        name: "Visit the Big Guy",
        characters: [{ name: CHARACTERS.PEGASUS, level: 3 }],
        time: "6h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.HERCULES, tokenType: TOKEN },
            { name: CHARACTERS.HERCULES, tokenType: EARS }
        ]
    },
    {
        name: "Differences",
        characters: [
            { name: CHARACTERS.PEGASUS, level: 4 },
            { name: "Meg", level: 4 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.PAIN, tokenType: EARS }]
    },
    {
        name: "Relax a Moment",
        characters: [{ name: CHARACTERS.PEGASUS, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building", level: 2 }],
        tokens: [
            { name: CHARACTERS.HERCULES, tokenType: TOKEN },
            { name: CHARACTERS.HERCULES, tokenType: EARS }
        ]
    },
    {
        name: "Make Amends",
        characters: [
            { name: CHARACTERS.PEGASUS, level: 8 },
            { name: "Meg", level: 8 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [{ name: CHARACTERS.MEG, tokenType: TOKEN }]
    },
    //pegasus end
    //hades
    {
        name: "I'm Cool",
        characters: [{ name: "Hades", level: 1 }],
        time: "1h",
        tokens: [{ name: "Hercules", tokenType: COMMON }]
    },
    {
        name: "Tripped Up",
        characters: [{ name: "Hades", level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [
            { name: CHARACTERS.PHIL, tokenType: EARS },
            { name: CHARACTERS.MEG, tokenType: EARS }
        ]
    },
    {
        name: "A Real Bargain",
        characters: [{ name: "Hades", level: 2 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.HADES, tokenType: TOKEN }]
    },
    {
        name: "It's a Small Underworld",
        characters: [{ name: "Hades", level: 4 }],
        time: "8h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [
            { name: CHARACTERS.PAIN, tokenType: EARS },
            { name: CHARACTERS.PANIC, tokenType: TOKEN }
        ]
    },
    {
        name: "So Close",
        characters: [
            { name: "Hades", level: 5 },
            { name: "Panic", level: 5 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [{ name: CHARACTERS.PEGASUS, tokenType: EARS }]
    },
    {
        name: "Cosmos Arrangement",
        characters: [{ name: "Hades", level: 5 }],
        time: "12h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [{ name: CHARACTERS.HERCULES, tokenType: TOKEN }]
    },
    //hades end
    //pain
    {
        name: "Duties",
        characters: [{ name: "Pain", level: 1 }],
        time: "1h",
        tokens: [{ name: "Hercules", tokenType: COMMON }]
    },
    {
        name: "Run for It!",
        characters: [{ name: "Pain", level: 2 }],
        time: "4h",
        tokens: [
            { name: CHARACTERS.PAIN, tokenType: TOKEN },
            { name: CHARACTERS.HERCULES, tokenType: EARS }
        ]
    },
    {
        name: "Go for Innocence",
        characters: [{ name: "Pain", level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [
            { name: CHARACTERS.PHIL, tokenType: EARS },
            { name: CHARACTERS.MEG, tokenType: TOKEN },
            { name: CHARACTERS.MEG, tokenType: EARS }
        ]
    },
    {
        name: "Look Dashing",
        characters: [{ name: "Pain", level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building", level: 1 }],
        tokens: [
            { name: CHARACTERS.MEG, tokenType: TOKEN },
            { name: CHARACTERS.MEG, tokenType: EARS }
        ]
    },
    {
        name: "I Do Not... Know",
        characters: [{ name: "Pain", level: 3 }],
        time: "6h",
        required: [
            { name: BUILDINGS.STATUE_GARDEN, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.PHIL, tokenType: EARS }]
    },
    {
        name: "Take Care of Her",
        characters: [
            { name: "Pain", level: 2 },
            { name: "Meg", level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [
            { name: CHARACTERS.PEGASUS, tokenType: TOKEN },
            { name: CHARACTERS.PEGASUS, tokenType: EARS },
            { name: CHARACTERS.PANIC, tokenType: TOKEN },
            { name: CHARACTERS.PANIC, tokenType: EARS }
        ]
    },
    {
        name: "Call IX-I-I",
        characters: [{ name: "Pain", level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [
            ,
            { name: CHARACTERS.HADES, tokenType: TOKEN },
            { name: CHARACTERS.HADES, tokenType: EARS }
        ]
    },
    //pain end
    //panic
    {
        name: "Intercept Orders",
        characters: [{ name: "Panic", level: 1 }],
        time: "1h",
        tokens: [{ name: "Hercules", tokenType: COMMON }]
    },
    {
        name: "Anxieties",
        characters: [{ name: "Panic", level: 1 }],
        time: "6h",
        tokens: [
            { name: "Hercules", tokenType: COMMON },
            { name: CHARACTERS.PAIN, tokenType: TOKEN },
            { name: CHARACTERS.PAIN, tokenType: EARS }
        ]
    },
    {
        name: "Anxiety Attack",
        characters: [{ name: "Panic", level: 1 }],
        time: "8h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [
            { name: CHARACTERS.MEG, tokenType: TOKEN },
            { name: CHARACTERS.HERCULES, tokenType: TOKEN }
        ]
    },
    {
        name: "Nanny Goat Watch",
        characters: [
            { name: "Panic", level: 1 },
            { name: "Phil", level: 1 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.TRAINING_GROUNDS, type: "building" }],
        tokens: [{ name: CHARACTERS.PHIL, tokenType: EARS }]
    },
    {
        name: "If Is Good",
        characters: [{ name: "Panic", level: 2 }],
        time: "8h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [
            { name: CHARACTERS.PANIC, tokenType: TOKEN },
            { name: CHARACTERS.PANIC, tokenType: EARS }
        ]
    },
    {
        name: "Don't Sweat It",
        characters: [{ name: "Panic", level: 2 }],
        time: "6h",
        required: [{ name: BUILDINGS.STATUE_GARDEN, type: "building" }],
        tokens: [
            { name: CHARACTERS.HADES, tokenType: TOKEN },
            { name: CHARACTERS.HADES, tokenType: EARS }
        ]
    },
    {
        name: "Follow Orders",
        characters: [
            { name: "Panic", level: 2 },
            { name: "Meg", level: 2 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.ZEUS_TEMPLE, type: "building" }],
        tokens: [
            { name: CHARACTERS.MEG, tokenType: TOKEN },
            { name: CHARACTERS.MEG, tokenType: EARS }
        ]
    },
    {
        name: "Just Relax",
        characters: [{ name: "Panic", level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.STATUE_GARDEN, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.HADES, tokenType: TOKEN },
            { name: CHARACTERS.HADES, tokenType: EARS }
        ]
    },
    {
        name: "Take Care of Him",
        characters: [
            { name: "Panic", level: 4 },
            { name: "Hercules", level: 4 }
        ],
        time: "4h",
        tokens: [
            { name: CHARACTERS.PANIC, tokenType: TOKEN },
            { name: CHARACTERS.PANIC, tokenType: EARS }
        ]
    },
    //panic end
    //merida
    {
        name: "Strive for Perfection",
        characters: [{ name: CHARACTERS.MERIDA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BRAVE, tokenType: COMMON }]
    },
    {
        name: "Duties, Responsibilities, Expectations!",
        characters: [{ name: CHARACTERS.MERIDA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CASTLE_DUNBROCH, type: "building" }],
        tokens: [{ name: CHARACTERS.LORD_MACGUFFIN, tokenType: EARS }]
    },
    {
        name: "Follow the Wisps",
        characters: [{ name: CHARACTERS.MERIDA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RING_OF_STONES, type: "building" }],
        tokens: []
    },
    //merida end
    //queen elinor //elinor
    {
        name: "Queenly Confidence",
        characters: [{ name: CHARACTERS.QUEEN_ELINOR, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BRAVE, tokenType: COMMON }]
    },
    {
        name: "Dreadful Collywobbles",
        characters: [{ name: CHARACTERS.QUEEN_ELINOR, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.WITCH_COTTAGE, type: "building" }],
        tokens: [
            { name: CHARACTERS.LORD_DINGWALL, tokenType: TOKEN },
            { name: CHARACTERS.LORD_MACGUFFIN, tokenType: TOKEN }
        ]
    },
    {
        name: "Buy It All",
        characters: [{ name: CHARACTERS.QUEEN_ELINOR, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.WITCH_COTTAGE, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.LORD_MACGUFFIN, tokenType: EARS },
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: EARS }
        ]
    },
    {
        name: "Project and Enunciate",
        characters: [{ name: CHARACTERS.QUEEN_ELINOR, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.CASTLE_DUNBROCH, type: "building" }],
        tokens: [
            { name: CHARACTERS.LORD_DINGWALL, tokenType: EARS },
            { name: CHARACTERS.KING_FERGUS, tokenType: TOKEN }
        ]
    },
    {
        name: "Clan Gathering",
        characters: [
            { name: CHARACTERS.QUEEN_ELINOR, level: 5 },
            { name: CHARACTERS.KING_FERGUS, level: 5 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.CASTLE_DUNBROCH, type: "building" }],
        tokens: [{ name: CHARACTERS.MERIDA, tokenType: EARS }]
    },
    //queen elinor end //elinor end
    //king fergus //fergus
    {
        name: "One Dead Eye",
        characters: [{ name: CHARACTERS.KING_FERGUS, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BRAVE, tokenType: COMMON }]
    },
    {
        name: "Mor'du, Mor'du",
        characters: [{ name: CHARACTERS.KING_FERGUS, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CASTLE_DUNBROCH, type: "building" }],
        tokens: [{ name: CHARACTERS.LORD_DINGWALL, tokenType: TOKEN }]
    },
    //king fergus end //fergus end
    {
        name: "Purchase Delivery",
        characters: [{ name: CHARACTERS.KING_FERGUS, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.WITCH_COTTAGE, type: "building" }],
        tokens: [
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: TOKEN },
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: EARS }
        ]
    },
    //lord macintosh //macintosh
    {
        name: "Jiggery Pokery",
        characters: [{ name: CHARACTERS.LORD_MACINTOSH, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BRAVE, tokenType: COMMON }]
    },
    {
        name: "Averting Eyes",
        characters: [{ name: CHARACTERS.LORD_MACINTOSH, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.RING_OF_STONES, type: "building" }],
        tokens: [{ name: CHARACTERS.LORD_MACGUFFIN, tokenType: TOKEN }]
    },
    {
        name: "Home of Carvings",
        characters: [{ name: CHARACTERS.LORD_MACINTOSH, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.WITCH_COTTAGE, type: "building" }],
        tokens: [{ name: CHARACTERS.KING_FERGUS, tokenType: TOKEN }]
    },
    {
        name: "Macintosh!",
        characters: [{ name: CHARACTERS.LORD_MACINTOSH, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CASTLE_DUNBROCH, type: "building" }],
        tokens: [{ name: CHARACTERS.MERIDA, tokenType: EARS }]
    },
    //lord macintosh end //macintosh end
    //lord macguffin //macguffin
    {
        name: "All Our Teeth",
        characters: [{ name: CHARACTERS.LORD_MACGUFFIN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BRAVE, tokenType: COMMON }]
    },
    {
        name: "Cleared Out",
        characters: [{ name: CHARACTERS.LORD_MACGUFFIN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.WITCH_COTTAGE, type: "building" }],
        tokens: [{ name: CHARACTERS.QUEEN_ELINOR, tokenType: EARS }]
    },
    {
        name: "MacGuffin!",
        characters: [{ name: CHARACTERS.LORD_MACGUFFIN, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.CASTLE_DUNBROCH, type: "building", level: 1 }
        ],
        tokens: [
            { name: CHARACTERS.LORD_MACINTOSH, tokenType: TOKEN },
            { name: CHARACTERS.KING_FERGUS, tokenType: EARS }
        ]
    },
    {
        name: "With His Bare Hands",
        characters: [{ name: CHARACTERS.LORD_MACGUFFIN, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.CASTLE_DUNBROCH, type: "building" }],
        tokens: []
    },
    {
        name: "Fighting Is Essential",
        characters: [
            { name: CHARACTERS.LORD_MACGUFFIN, level: 5 },
            { name: CHARACTERS.LORD_DINGWALL, level: 5 }
        ],
        time: "4h",
        tokens: [{ name: CHARACTERS.MERIDA, tokenType: TOKEN }]
    },
    //lord macguffin end //macguffin end
    //lord dingwall //dingwall
    {
        name: "Standing Tall",
        characters: [{ name: CHARACTERS.LORD_DINGWALL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.BRAVE, tokenType: COMMON }]
    },
    {
        name: "Back in Spring",
        characters: [{ name: CHARACTERS.LORD_DINGWALL, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.QUEEN_ELINOR, tokenType: TOKEN },
            { name: CHARACTERS.LORD_MACGUFFIN, tokenType: TOKEN },
            { name: CHARACTERS.LORD_MACGUFFIN, tokenType: EARS }
        ]
    },
    {
        name: "Dingwall!",
        characters: [{ name: CHARACTERS.LORD_DINGWALL, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CASTLE_DUNBROCH, type: "building" }],
        tokens: [{ name: CHARACTERS.KING_FERGUS, tokenType: EARS }]
    },
    //lord dingwall end //dingwall end
    //raya
    {
        name: "Trust Issues",
        characters: [{ name: CHARACTERS.RAYA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.RAYA, tokenType: COMMON }]
    },
    {
        name: "Where's the Captain",
        characters: [{ name: CHARACTERS.RAYA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.BOUN_SHRIMP_BOAT, type: "building" }],
        tokens: [{ name: CHARACTERS.BOUN, tokenType: EARS }]
    },
    {
        name: "Protect the Gem",
        characters: [{ name: CHARACTERS.RAYA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.HEART_PALACE, type: "building" }],
        tokens: [{ name: CHARACTERS.TUK_TUK, tokenType: TOKEN }]
    },
    {
        name: "The Fiercest Enemy",
        characters: [{ name: CHARACTERS.RAYA, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.FANG_PALACE, type: "building" }],
        tokens: [
            { name: CHARACTERS.TUK_TUK, tokenType: EARS },
            { name: CHARACTERS.SISU, tokenType: TOKEN },
            { name: CHARACTERS.SISU, tokenType: EARS }
        ]
    },
    //raya end
    //sisu
    {
        name: "I Am People!",
        characters: [{ name: CHARACTERS.SISU, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.RAYA, tokenType: COMMON }]
    },
    {
        name: "Wicked in the Liquid",
        characters: [{ name: CHARACTERS.SISU, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.BOUN_SHRIMP_BOAT, type: "building" }],
        tokens: [{ name: CHARACTERS.BOUN, tokenType: TOKEN }]
    },
    {
        name: "Offer Something Nice",
        characters: [{ name: CHARACTERS.SISU, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.FANG_PALACE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BOUN, tokenType: EARS },
            { name: CHARACTERS.RAYA, tokenType: TOKEN },
            { name: CHARACTERS.RAYA, tokenType: EARS }
        ]
    },
    {
        name: "Have Faith",
        characters: [{ name: CHARACTERS.SISU, level: 8 }],
        time: "6h",
        required: [{ name: BUILDINGS.HEART_PALACE, type: "building" }],
        tokens: [
            { name: CHARACTERS.TUK_TUK, tokenType: TOKEN },
            { name: CHARACTERS.NAMAARI, tokenType: TOKEN },
            { name: CHARACTERS.NAMAARI, tokenType: EARS }
        ]
    },
    //sisu end
    //tuk tuk
    {
        name: "Big Fur Bug",
        characters: [{ name: CHARACTERS.TUK_TUK, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.RAYA, tokenType: COMMON }]
    },
    {
        name: "Hide and Seek",
        characters: [{ name: CHARACTERS.TUK_TUK, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.BOUN_SHRIMP_BOAT, type: "building" }],
        tokens: [
            { name: CHARACTERS.SISU, tokenType: TOKEN },
            { name: CHARACTERS.SISU, tokenType: EARS }
        ]
    },
    {
        name: "Focus",
        characters: [{ name: CHARACTERS.TUK_TUK, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.HEART_PALACE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BOUN, tokenType: TOKEN },
            { name: CHARACTERS.NAMAARI, tokenType: TOKEN },
            { name: CHARACTERS.NAMAARI, tokenType: EARS }
        ]
    },
    {
        name: "Enjoy a Meal",
        characters: [{ name: CHARACTERS.TUK_TUK, level: 5 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.RAYA, tokenType: EARS }]
    },
    //tuk tuk end
    //namaari
    {
        name: "What's Right for Fang",
        characters: [{ name: CHARACTERS.NAMAARI, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.RAYA, tokenType: COMMON }]
    },
    {
        name: "At River's End",
        characters: [{ name: CHARACTERS.NAMAARI, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.BOUN_SHRIMP_BOAT, type: "building" }],
        tokens: [
            { name: CHARACTERS.TUK_TUK, tokenType: TOKEN },
            { name: CHARACTERS.TUK_TUK, tokenType: EARS },
            { name: CHARACTERS.SISU, tokenType: TOKEN },
            { name: CHARACTERS.RAYA, tokenType: EARS }
        ]
    },
    {
        name: "Get the Gem",
        characters: [{ name: CHARACTERS.NAMAARI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.HEART_PALACE, type: "building" }],
        tokens: [
            { name: CHARACTERS.BOUN, tokenType: TOKEN },
            { name: CHARACTERS.BOUN, tokenType: EARS }
        ]
    },
    {
        name: "It's About Trust",
        characters: [
            { name: CHARACTERS.NAMAARI, level: 4 },
            { name: CHARACTERS.TUK_TUK, level: 4 }
        ],
        time: "1h",
        required: [{ name: BUILDINGS.HEART_PALACE, type: "building" }],
        tokens: [{ name: CHARACTERS.RAYA, tokenType: TOKEN }]
    },
    {
        name: "For Fang",
        characters: [{ name: CHARACTERS.NAMAARI, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.FANG_PALACE, type: "building" }],
        tokens: [{ name: CHARACTERS.SISU, tokenType: EARS }]
    },
    //namaari end
    //boun
    {
        name: "Clasp Onto Your Congee",
        characters: [{ name: CHARACTERS.BOUN, level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.RAYA, tokenType: COMMON },
            { name: CHARACTERS.NAMAARI, tokenType: TOKEN }
        ]
    },
    {
        name: "Shrimp-orium CFO",
        characters: [{ name: CHARACTERS.BOUN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.BOUN_SHRIMP_BOAT, type: "building" }],
        tokens: [
            { name: CHARACTERS.TUK_TUK, tokenType: TOKEN },
            { name: CHARACTERS.TUK_TUK, tokenType: EARS },
            { name: CHARACTERS.NAMAARI, tokenType: EARS }
        ]
    },
    {
        name: "Try Some Congee",
        characters: [{ name: CHARACTERS.BOUN, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.HEART_PALACE, type: "building" }],
        tokens: [{ name: CHARACTERS.SISU, tokenType: EARS }]
    },
    {
        name: "Shrimp Congee, Anyone?",
        characters: [{ name: CHARACTERS.BOUN, level: 5 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.RAYA, tokenType: TOKEN },
            { name: CHARACTERS.RAYA, tokenType: EARS },
            { name: CHARACTERS.SISU, tokenType: TOKEN }
        ]
    },
    //boun end
    //luke
    {
        name: "Use the Force",
        characters: [{ name: "Luke Skywalker", level: 1 }],
        time: "1h",
        tokens: [
            { name: GROUPS.STAR_WARS, tokenType: COMMON },
            {
                name: SPECIAL_ITEMS.LUKE_BESPIN_FABRIC,
                tokenType: "special",
                remove: true
            }
        ]
    },
    {
        name: "Cautiously Eat Stew",
        characters: [{ name: "Luke Skywalker", level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.LANDO_CALRISSIAN, tokenType: TOKEN },
            { name: CHARACTERS.YODA, tokenType: EARS }
        ]
    },
    {
        name: "Piece of Junk",
        characters: [{ name: CHARACTERS.LUKE_SKYWALKER, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.MILLENIUM_FALCON }],
        tokens: [
            { name: CHARACTERS.LEIA_ORGANA, tokenType: TOKEN },
            { name: CHARACTERS.HAN_SOLO, tokenType: TOKEN },
            { name: CHARACTERS.DARTH_VADER, tokenType: TOKEN }
        ]
    },
    {
        name: "Look Over the Plans",
        characters: [{ name: CHARACTERS.LUKE_SKYWALKER, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.YAVIN4 }],
        tokens: [
            { name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: TOKEN },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: EARS }
        ]
    },
    {
        name: "Looking to the Horizon",
        characters: [{ name: CHARACTERS.LUKE_SKYWALKER, level: 5 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.CHEWBACCA, tokenType: EARS },
            { name: CHARACTERS.FENNEC_SHAND, tokenType: TOKEN }
        ]
    },
    //luke end
    //leia
    {
        name: "Watch for Stormtroopers",
        characters: [{ name: CHARACTERS.LEIA_ORGANA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Arrive at the Base",
        characters: [{ name: CHARACTERS.LEIA_ORGANA, level: 2 }],
        time: "4h"
    },
    {
        name: "My Only Hope",
        characters: [{ name: CHARACTERS.LEIA_ORGANA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LUKE_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.HAN_SOLO, tokenType: TOKEN },
            { name: CHARACTERS.LANDO_CALRISSIAN, tokenType: EARS }
        ]
    },
    {
        name: "Down the Garbage Chute",
        characters: [{ name: CHARACTERS.LEIA_ORGANA, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.GARBAGE_COMPACTOR, type: "building" }],
        tokens: [
            { name: CHARACTERS.CHEWBACCA, tokenType: TOKEN },
            { name: CHARACTERS.DARTH_VADER, tokenType: TOKEN },
            { name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: EARS },
            { name: CHARACTERS.YODA, tokenType: TOKEN }
        ]
    },
    {
        name: "In That Thing?",
        characters: [
            { name: CHARACTERS.LEIA_ORGANA, level: 8 },
            { name: CHARACTERS.HAN_SOLO, level: 8 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.MILLENIUM_FALCON, type: "building" }],
        tokens: [{ name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: TOKEN }]
    },
    //leia end
    //han solo
    {
        name: "Got It Where It Counts",
        characters: [{ name: CHARACTERS.HAN_SOLO, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.MILLENIUM_FALCON, type: "building" }],
        tokens: [
            { name: CHARACTERS.CHEWBACCA, tokenType: EARS },
            { name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: EARS },
            { name: CHARACTERS.BOBA_FETT, tokenType: EARS }
        ]
    },
    {
        name: "Get Reward",
        characters: [{ name: CHARACTERS.HAN_SOLO, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.YAVIN4, type: "building" }],
        tokens: [
            { name: CHARACTERS.LEIA_ORGANA, tokenType: EARS },
            { name: CHARACTERS.DARTH_VADER, tokenType: EARS }
        ]
    },
    {
        name: "Meet at Docking Bay 94",
        characters: [{ name: CHARACTERS.HAN_SOLO, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.LUKE_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.YODA, tokenType: EARS },
            { name: CHARACTERS.LANDO_CALRISSIAN, tokenType: TOKEN }
        ]
    },
    //han solo end
    //chewie //chewbacca
    {
        name: "Looking for Han",
        characters: [{ name: CHARACTERS.CHEWBACCA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Standing By",
        characters: [{ name: CHARACTERS.CHEWBACCA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.YAVIN4 }],
        tokens: [
            { name: CHARACTERS.HAN_SOLO, tokenType: EARS },
            { name: CHARACTERS.DARTH_VADER, tokenType: TOKEN }
        ]
    },
    {
        name: "Negotiate",
        characters: [{ name: CHARACTERS.CHEWBACCA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LUKE_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: TOKEN },
            { name: CHARACTERS.YODA, tokenType: EARS },
            { name: CHARACTERS.LANDO_CALRISSIAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Something Smells",
        characters: [{ name: CHARACTERS.CHEWBACCA, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.GARBAGE_COMPACTOR, type: "building" }],
        tokens: [
            { name: CHARACTERS.LEIA_ORGANA, tokenType: TOKEN },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: EARS }
        ]
    },
    //chewie end //chewbacca end
    //darth vader
    {
        name: "Disturbing Lack of Faith",
        characters: [{ name: CHARACTERS.DARTH_VADER, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Tremor in the Force",
        characters: [{ name: CHARACTERS.DARTH_VADER, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LUKE_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: TOKEN },
            { name: CHARACTERS.AHSOKA, tokenType: TOKEN },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.LUKE_BESPIN_FABRIC,
                tokenType: "special",
                remove: true
            },
            {
                name: SPECIAL_ITEMS.BOBA_FETT_BOUNTY_HUNTER_FABRIC,
                tokenType: SPECIAL
            }
        ]
    },
    {
        name: "Launch an Attack",
        characters: [{ name: CHARACTERS.TIE_FIGHTER_PILOT, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.YAVIN4, type: "building" }],
        tokens: [
            { name: CHARACTERS.HAN_SOLO, tokenType: TOKEN },
            { name: CHARACTERS.CHEWBACCA, tokenType: TOKEN },
            { name: CHARACTERS.DARTH_VADER, tokenType: EARS }
        ]
    },
    {
        name: "Inspect the Ship",
        characters: [{ name: CHARACTERS.DARTH_VADER, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.MILLENIUM_FALCON, type: "building" }],
        tokens: [{ name: CHARACTERS.LANDO_CALRISSIAN, tokenType: TOKEN }]
    },
    {
        name: "Inspect the Detention Level",
        characters: [{ name: CHARACTERS.DARTH_VADER, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.GARBAGE_COMPACTOR, type: "building" }],
        tokens: [
            { name: CHARACTERS.LEIA_ORGANA, tokenType: TOKEN },
            { name: CHARACTERS.CHEWBACCA, tokenType: TOKEN },
            { name: CHARACTERS.HAN_SOLO, tokenType: EARS }
        ]
    },
    {
        name: "Show of Force",
        characters: [
            { name: CHARACTERS.DARTH_VADER, level: 8 },
            { name: CHARACTERS.TIE_FIGHTER_PILOT, level: 8 }
        ],
        time: "4h",
        required: [{ name: BUILDINGS.YAVIN4, type: "building", level: 1 }],
        tokens: [{ name: CHARACTERS.YODA, tokenType: TOKEN }]
    },
    {
        name: "Sense a Presence",
        characters: [
            { name: CHARACTERS.DARTH_VADER, level: 9 },
            { name: CHARACTERS.LUKE_SKYWALKER, level: 9 }
        ],
        time: "6h",
        required: [{ name: BUILDINGS.GARBAGE_COMPACTOR, type: "building" }],
        tokens: [{ name: CHARACTERS.BOBA_FETT, tokenType: EARS }]
    },
    //darth vader end
    //tie fighter pilot
    {
        name: "Patrol the Surface",
        characters: [{ name: CHARACTERS.TIE_FIGHTER_PILOT, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Observe Air Space",
        characters: [{ name: CHARACTERS.TIE_FIGHTER_PILOT, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.LUKE_HOME, type: "building" }],
        tokens: [
            { name: CHARACTERS.LEIA_ORGANA, tokenType: EARS },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: TOKEN }
        ]
    },
    {
        name: "Man the Stations",
        characters: [{ name: CHARACTERS.TIE_FIGHTER_PILOT, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.GARBAGE_COMPACTOR, type: "building" }],
        tokens: [{ name: CHARACTERS.LANDO_CALRISSIAN, tokenType: EARS }]
    },
    //tie fighter pilot end
    //yoda
    {
        name: "Feel the Force",
        characters: [{ name: CHARACTERS.YODA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Pick Rootleaf",
        characters: [{ name: CHARACTERS.YODA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.DAGOBAH }],
        tokens: [{ name: CHARACTERS.LANDO_CALRISSIAN, tokenType: EARS }]
    },
    {
        name: "See Visions of the Future",
        characters: [{ name: CHARACTERS.YODA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.CLOUD_CITY }],
        tokens: [
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: EARS }
        ]
    },
    //yoda end
    //lando calrissian
    {
        name: "Call Backup",
        characters: [{ name: CHARACTERS.LANDO_CALRISSIAN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.STAR_WARS, tokenType: COMMON }]
    },
    {
        name: "Feel Something Watching",
        characters: [{ name: CHARACTERS.LANDO_CALRISSIAN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.DAGOBAH }],
        tokens: [
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS },
            { name: CHARACTERS.IMPERIAL_STORMTROOPER, tokenType: EARS }
        ]
    },
    {
        name: "Make a Deal",
        characters: [{ name: CHARACTERS.LANDO_CALRISSIAN, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.CLOUD_CITY, level: 1 }],
        tokens: [{ name: CHARACTERS.YODA, tokenType: TOKEN }]
    },
    //lando calrissian end //lando end
    //imperial stormtrooper
    {
        name: "Run for Cover",
        characters: [{ name: CHARACTERS.IMPERIAL_STORMTROOPER, level: null }],
        time: "1h",
        tokens: [
            { name: GROUPS.STAR_WARS, tokenType: COMMON },
            { name: CHARACTERS.LUKE_SKYWALKER, tokenType: TOKEN }
        ]
    },
    {
        name: "Wade Through Fog",
        characters: [{ name: CHARACTERS.IMPERIAL_STORMTROOPER, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.DAGOBAH }],
        tokens: [
            { name: CHARACTERS.LANDO_CALRISSIAN, tokenType: EARS },
            { name: CHARACTERS.YODA, tokenType: TOKEN },
            {
                name: SPECIAL_ITEMS.BOBA_FETT_BOUNTY_HUNTER_FABRIC,
                tokenType: SPECIAL
            }
        ]
    },
    //imperial stormtrooper end
    //luca
    {
        name: "Learn About the Stars",
        characters: [{ name: CHARACTERS.LUCA, level: 1 }],
        time: "1h",
        tokens: []
    },
    {
        name: "All the Parts",
        characters: [{ name: CHARACTERS.LUCA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ALBERTO_HIDEOUT, type: "building" }],
        tokens: [{ name: CHARACTERS.ALBERTO, tokenType: EARS }]
    },
    {
        name: "Bicycle Practice",
        characters: [{ name: CHARACTERS.LUCA, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.PORTOROSSO_TOWER, type: "building" }],
        tokens: [
            { name: CHARACTERS.GIULIA, tokenType: EARS },
            { name: CHARACTERS.MACHIAVELLI, tokenType: TOKEN }
        ]
    },
    {
        name: "Silenzio, Bruno",
        characters: [
            { name: CHARACTERS.LUCA, level: 5 },
            { name: CHARACTERS.ALBERTO, level: 5 }
        ],
        time: "2h"
    },
    //luca end
    //alberto
    {
        name: "Counting Down the Days",
        characters: [{ name: CHARACTERS.ALBERTO, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ALBERTO_HIDEOUT, type: "building" }],
        tokens: [
            { name: CHARACTERS.LUCA, tokenType: TOKEN },
            { name: CHARACTERS.GIULIA, tokenType: TOKEN }
        ]
    },
    {
        name: "Pasta Training",
        characters: [{ name: CHARACTERS.ALBERTO, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PORTOROSSO_TOWER, type: "building" }],
        tokens: [{ name: CHARACTERS.MACHIAVELLI, tokenType: EARS }]
    },
    {
        name: '"Star" Gazing',
        characters: [
            { name: CHARACTERS.ALBERTO, level: 7 },
            { name: CHARACTERS.LUCA, level: 7 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.ALBERTO_HIDEOUT, type: "building", level: 2 }
        ],
        tokens: [{ name: CHARACTERS.ERCOLE, tokenType: EARS }]
    },
    //alberto end
    //giulia
    {
        name: "Find the Boys",
        characters: [{ name: CHARACTERS.GIULIA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ALBERTO_HIDEOUT, type: "building" }],
        tokens: [{ name: CHARACTERS.LUCA, tokenType: EARS }]
    },
    {
        name: "Join the Portorosso Cup",
        characters: [{ name: CHARACTERS.GIULIA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PORTOROSSO_TOWER, type: "building" }],
        tokens: [
            { name: CHARACTERS.ERCOLE, tokenType: EARS },
            { name: CHARACTERS.ALBERTO, tokenType: TOKEN }
        ]
    },
    {
        name: "Feed Fish",
        characters: [
            { name: CHARACTERS.GIULIA, level: 7 },
            { name: CHARACTERS.MACHIAVELLI, level: 7 }
        ],
        time: "6h",
        required: [
            { name: BUILDINGS.PORTOROSSO_TOWER, type: "building", level: 2 }
        ],
        tokens: [{ name: CHARACTERS.MACHIAVELLI, tokenType: TOKEN }]
    },
    //giulia end
    //ercole
    {
        name: "Practice Harpooning",
        characters: [{ name: CHARACTERS.ERCOLE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ALBERTO_HIDEOUT, type: "building" }],
        tokens: [
            { name: CHARACTERS.MACHIAVELLI, tokenType: EARS },
            { name: CHARACTERS.GIULIA, tokenType: EARS }
        ]
    },
    {
        name: "Five-Time Winner",
        characters: [{ name: CHARACTERS.ERCOLE, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PORTOROSSO_TOWER, type: "building" }],
        tokens: [
            { name: CHARACTERS.LUCA, tokenType: EARS },
            { name: CHARACTERS.ALBERTO, tokenType: EARS }
        ]
    },
    //ercole end
    //machiavelli
    {
        name: "Sniff Out Sea Monsters",
        characters: [{ name: CHARACTERS.MACHIAVELLI, level: 1 }],
        time: "1h",
        tokens: []
    },
    {
        name: "Sniff Around",
        characters: [{ name: CHARACTERS.MACHIAVELLI, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.ALBERTO_HIDEOUT, type: "building" }],
        tokens: [
            { name: CHARACTERS.ALBERTO, tokenType: TOKEN },
            { name: CHARACTERS.ERCOLE, tokenType: TOKEN }
        ]
    },
    {
        name: "Lay About",
        characters: [{ name: CHARACTERS.MACHIAVELLI, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.PORTOROSSO_TOWER, type: "building" }],
        tokens: [
            { name: CHARACTERS.LUCA, tokenType: TOKEN },
            { name: CHARACTERS.GIULIA, tokenType: TOKEN }
        ]
    },
    //machiavelli end
    //pongo
    {
        name: "Slow Down, Pongo",
        characters: [{ name: CHARACTERS.PONGO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DALMATIANS, tokenType: COMMON }]
    },
    {
        name: "Listen to Music",
        characters: [{ name: CHARACTERS.PONGO, level: 2 }],
        time: "1h",
        required: [{ name: BUILDINGS.RADCLIFFE_RESIDENCE }],
        tokens: []
    },
    {
        name: "Time for a Walk",
        trophies: true,
        characters: [{ name: CHARACTERS.PONGO, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_PARK }],
        tokens: [
            { name: CHARACTERS.PATCH, tokenType: EARS },
            { name: CHARACTERS.LUCKY, tokenType: EARS },
            { name: CHARACTERS.PENNY, tokenType: EARS }
        ]
    },
    {
        name: "You Little Rascal",
        characters: [
            { name: CHARACTERS.PONGO, level: 4 },
            { name: CHARACTERS.LUCKY, level: 4 }
        ],
        time: "1h",
        required: [{ name: BUILDINGS.THE_PARK, level: 1 }]
    },
    {
        name: "Isn't There Any Hope?",
        characters: [
            { name: CHARACTERS.PONGO, level: 5 },
            { name: CHARACTERS.PERDITA, level: 5 }
        ],
        time: "2h",
        tokens: [{ name: CHARACTERS.ROLLY, tokenType: EARS }]
    },
    {
        name: "Cruella's Lair",
        characters: [{ name: CHARACTERS.PONGO, level: 7 }],
        time: "6h",
        required: [{ name: BUILDINGS.THE_DE_VIL_PLACE, level: 1 }],
        tokens: [
            { name: CHARACTERS.PERDITA, tokenType: EARS },
            { name: CHARACTERS.CRUELLA, tokenType: EARS }
        ]
    },
    //pongo end
    //lucky
    {
        name: "Feeling Lucky",
        characters: [{ name: CHARACTERS.LUCKY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DALMATIANS, tokenType: COMMON }]
    },
    {
        name: "Watch TV",
        characters: [{ name: CHARACTERS.LUCKY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RADCLIFFE_RESIDENCE }],
        tokens: [{ name: CHARACTERS.PONGO, tokenType: TOKEN }]
    },
    {
        name: "Go for a Walk",
        trophies: true,
        characters: [{ name: CHARACTERS.LUCKY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_PARK }],
        tokens: [
            { name: CHARACTERS.PATCH, tokenType: TOKEN },
            { name: CHARACTERS.PERDITA, tokenType: TOKEN },
            { name: CHARACTERS.CRUELLA, tokenType: TOKEN }
        ]
    },
    {
        name: "Patching Up",
        characters: [
            { name: CHARACTERS.LUCKY, level: 5 },
            { name: CHARACTERS.PATCH, level: 5 }
        ],
        time: "2h",
        tokens: [
            { name: CHARACTERS.ROLLY, tokenType: TOKEN },
            { name: CHARACTERS.PENNY, tokenType: TOKEN }
        ]
    },
    //lucky end
    //patch
    {
        name: "Bark at Everything",
        characters: [{ name: CHARACTERS.PATCH, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DALMATIANS, tokenType: COMMON }]
    },
    {
        name: "Imitate Thunderbolt",
        characters: [{ name: CHARACTERS.PATCH, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.LUCKY, tokenType: TOKEN }]
    },
    {
        name: "Play Pretend",
        trophies: true,
        characters: [{ name: CHARACTERS.PATCH, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_PARK }],
        tokens: [
            { name: CHARACTERS.PONGO, tokenType: TOKEN },
            { name: CHARACTERS.PERDITA, tokenType: TOKEN },
            { name: CHARACTERS.CRUELLA, tokenType: TOKEN }
        ]
    },
    //patch end
    //perdita
    {
        name: "Most Beautiful Creature",
        characters: [{ name: CHARACTERS.PERDITA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DALMATIANS, tokenType: COMMON }]
    },
    {
        name: "Worry About Puppies",
        characters: [{ name: CHARACTERS.PERDITA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RADCLIFFE_RESIDENCE }],
        tokens: [
            { name: CHARACTERS.PENNY, tokenType: TOKEN },
            { name: CHARACTERS.PONGO, tokenType: EARS }
        ]
    },
    {
        name: "Enjoy Fresh Air",
        trophies: true,
        characters: [{ name: CHARACTERS.PERDITA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_PARK }],
        tokens: [
            { name: CHARACTERS.LUCKY, tokenType: TOKEN },
            { name: CHARACTERS.PATCH, tokenType: TOKEN },
            { name: CHARACTERS.CRUELLA, tokenType: EARS }
        ]
    },
    {
        name: "Just Had Your Dinner",
        characters: [
            { name: CHARACTERS.PERDITA, level: 4 },
            { name: CHARACTERS.ROLLY, level: 4 }
        ],
        time: "1h",
        required: [{ name: BUILDINGS.RADCLIFFE_RESIDENCE, level: 1 }]
    },
    //perdita end
    //cruella
    {
        name: "She's a Devil",
        characters: [{ name: CHARACTERS.CRUELLA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DALMATIANS, tokenType: COMMON }]
    },
    {
        name: "Miserable as Usual",
        trophies: true,
        characters: [{ name: CHARACTERS.CRUELLA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RADCLIFFE_RESIDENCE }],
        tokens: [{ name: CHARACTERS.PENNY, tokenType: EARS }]
    },
    {
        name: "Worship Furs",
        characters: [{ name: CHARACTERS.CRUELLA, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_PARK }],
        tokens: [
            { name: CHARACTERS.PONGO, tokenType: EARS },
            { name: CHARACTERS.LUCKY, tokenType: EARS },
            { name: CHARACTERS.PATCH, tokenType: EARS }
        ]
    },
    {
        name: "Blare Horn",
        characters: [{ name: CHARACTERS.CRUELLA, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.CRUELLA_CAR }],
        tokens: [
            { name: CHARACTERS.ROLLY, tokenType: EARS },
            { name: CHARACTERS.PERDITA, tokenType: EARS }
        ]
    },
    //cruella end
    //penny
    {
        name: "Penny for Your Thoughts",
        trophies: true,
        characters: [{ name: CHARACTERS.PENNY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DALMATIANS, tokenType: COMMON }]
    },
    {
        name: "Snuggle",
        characters: [{ name: CHARACTERS.PENNY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RADCLIFFE_RESIDENCE }],
        tokens: [{ name: CHARACTERS.PONGO, tokenType: TOKEN }]
    },
    {
        name: "Sniff Around",
        characters: [{ name: CHARACTERS.PENNY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_PARK }],
        tokens: [
            { name: CHARACTERS.PERDITA, tokenType: TOKEN },
            { name: CHARACTERS.ROLLY, tokenType: EARS },
            { name: CHARACTERS.LUCKY, tokenType: TOKEN }
        ]
    },
    {
        name: "Hide",
        characters: [{ name: CHARACTERS.PENNY, level: 6 }],
        time: "6h",
        required: [{ name: BUILDINGS.THE_DE_VIL_PLACE }],
        tokens: [
            { name: CHARACTERS.CRUELLA, tokenType: TOKEN },
            { name: CHARACTERS.PATCH, tokenType: EARS }
        ]
    },
    //penny end
    //rolly
    {
        name: "Rolling Around the Kingdom",
        trophies: true,
        characters: [{ name: CHARACTERS.ROLLY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.DALMATIANS, tokenType: COMMON }]
    },
    {
        name: "Sneak Scraps",
        characters: [{ name: CHARACTERS.ROLLY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.RADCLIFFE_RESIDENCE }],
        tokens: [
            { name: CHARACTERS.LUCKY, tokenType: EARS },
            { name: CHARACTERS.PATCH, tokenType: TOKEN },
            { name: CHARACTERS.PONGO, tokenType: EARS }
        ]
    },
    {
        name: "Forage for Food",
        characters: [{ name: CHARACTERS.ROLLY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.THE_PARK }],
        tokens: [
            { name: CHARACTERS.PENNY, tokenType: EARS },
            { name: CHARACTERS.PERDITA, tokenType: EARS },
            { name: CHARACTERS.CRUELLA, tokenType: EARS }
        ]
    },
    //rolly end
    //jiminy cricket //jiminy
    {
        name: "Wander Crooked Streets",
        characters: [{ name: CHARACTERS.JIMINY_CRICKET, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PINOCCHIO, tokenType: COMMON }]
    },
    {
        name: "Sing by the Fireplace",
        characters: [{ name: CHARACTERS.JIMINY_CRICKET, level: 1 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.FIGARO, tokenType: EARS },
            { name: CHARACTERS.BLUE_FAIRY, tokenType: EARS }
        ]
    },
    {
        name: "Ride a Seahorse",
        characters: [{ name: CHARACTERS.JIMINY_CRICKET, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PINOCCHIO_DARING_JOURNEY }],
        tokens: [
            { name: CHARACTERS.GEPPETTO, tokenType: EARS },
            { name: CHARACTERS.STROMBOLI, tokenType: TOKEN }
        ]
    },
    {
        name: "Keep Out of Trouble",
        characters: [{ name: CHARACTERS.JIMINY_CRICKET, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS }],
        tokens: [
            { name: CHARACTERS.PINOCCHIO, tokenType: EARS },
            { name: CHARACTERS.PINOCCHIO, tokenType: TOKEN },
            { name: CHARACTERS.HONEST_JOHN, tokenType: TOKEN }
        ]
    },
    //jiminy cricket  end //jiminy end
    //pinocchio
    {
        name: "Make New Friends",
        characters: [{ name: CHARACTERS.PINOCCHIO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PINOCCHIO, tokenType: COMMON }]
    },
    {
        name: "Play with Toys",
        characters: [{ name: CHARACTERS.PINOCCHIO, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.GEPPETTO, tokenType: TOKEN }]
    },
    {
        name: "Marvel at Surroundings",
        characters: [{ name: CHARACTERS.PINOCCHIO, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS }],
        tokens: [
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: TOKEN },
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: EARS },
            { name: CHARACTERS.BLUE_FAIRY, tokenType: EARS }
        ]
    },
    {
        name: "An Actor's Life",
        characters: [{ name: CHARACTERS.PINOCCHIO, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.STROMBOLI_CARAVAN }],
        tokens: [
            { name: CHARACTERS.HONEST_JOHN, tokenType: EARS },
            { name: CHARACTERS.STROMBOLI, tokenType: EARS }
        ]
    },
    {
        name: "Receive Standing Ovation",
        characters: [
            { name: CHARACTERS.PINOCCHIO, level: 6 },
            { name: CHARACTERS.STROMBOLI, level: 6 }
        ],
        time: "2h",
        required: [
            { name: BUILDINGS.STROMBOLI_CARAVAN, type: "building", level: 1 }
        ],
        tokens: [{ name: CHARACTERS.FIGARO, tokenType: TOKEN }]
    },
    //pinocchio end
    //geppetto
    {
        name: "Search by Lamplight",
        characters: [{ name: CHARACTERS.GEPPETTO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PINOCCHIO, tokenType: COMMON }]
    },
    {
        name: "In the Belly of the Beast",
        characters: [{ name: CHARACTERS.GEPPETTO, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.PINOCCHIO_DARING_JOURNEY }],
        tokens: [
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: TOKEN },
            { name: CHARACTERS.HONEST_JOHN, tokenType: TOKEN },
            { name: CHARACTERS.FIGARO, tokenType: TOKEN }
        ]
    },
    {
        name: "Sweep Up Woodchips",
        characters: [{ name: CHARACTERS.GEPPETTO, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.GEPPETTO_WORKSHOP }],
        tokens: [
            { name: CHARACTERS.PINOCCHIO, tokenType: TOKEN },
            { name: CHARACTERS.BLUE_FAIRY, tokenType: TOKEN }
        ]
    },
    {
        name: "Take in the Sights",
        characters: [{ name: CHARACTERS.GEPPETTO, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS }],
        tokens: [{ name: CHARACTERS.STROMBOLI, tokenType: TOKEN }]
    },
    //geppetto end
    //figaro
    {
        name: "Search for Scratches",
        characters: [{ name: CHARACTERS.FIGARO, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PINOCCHIO, tokenType: COMMON }]
    },
    {
        name: "Snuggle Up at Home",
        characters: [{ name: CHARACTERS.FIGARO, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.GEPPETTO_WORKSHOP }],
        tokens: [
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: TOKEN },
            { name: CHARACTERS.STROMBOLI, tokenType: EARS },
            { name: CHARACTERS.HONEST_JOHN, tokenType: EARS }
        ]
    },
    {
        name: "Prance Across Cobblestones",
        characters: [{ name: CHARACTERS.FIGARO, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS }],
        tokens: [
            { name: CHARACTERS.PINOCCHIO, tokenType: TOKEN },
            { name: CHARACTERS.GEPPETTO, tokenType: TOKEN }
        ]
    },
    {
        name: "Spend Time with Cleo",
        characters: [{ name: CHARACTERS.FIGARO, level: 5 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.BLUE_FAIRY, tokenType: EARS }]
    },
    //figaro end
    //honest john
    {
        name: "Lurk About",
        characters: [{ name: CHARACTERS.HONEST_JOHN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PINOCCHIO, tokenType: COMMON }]
    },
    {
        name: "Take the Easy Road",
        characters: [{ name: CHARACTERS.HONEST_JOHN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.PINOCCHIO_DARING_JOURNEY }],
        tokens: [{ name: CHARACTERS.JIMINY_CRICKET, tokenType: EARS }]
    },
    {
        name: "Pull a Gambit",
        characters: [{ name: CHARACTERS.HONEST_JOHN, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS }],
        tokens: [
            { name: CHARACTERS.PINOCCHIO, tokenType: TOKEN },
            { name: CHARACTERS.FIGARO, tokenType: EARS },
            { name: CHARACTERS.STROMBOLI, tokenType: EARS }
        ]
    },
    {
        name: "Hunt Around Town",
        characters: [
            { name: CHARACTERS.HONEST_JOHN, level: 4 },
            { name: CHARACTERS.FIGARO, level: 4 }
        ],
        time: "1h",
        required: [{ name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS, level: 1 }]
    },
    {
        name: "Dance in the Streets",
        characters: [{ name: CHARACTERS.HONEST_JOHN, level: 5 }],
        time: "6h",
        tokens: [
            { name: CHARACTERS.GEPPETTO, tokenType: TOKEN },
            { name: CHARACTERS.GEPPETTO, tokenType: EARS },
            { name: CHARACTERS.BLUE_FAIRY, tokenType: TOKEN }
        ]
    },
    //honest john end
    //stromboli
    {
        name: "Search for Coins",
        characters: [{ name: CHARACTERS.STROMBOLI, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PINOCCHIO, tokenType: COMMON }]
    },
    {
        name: "Just Passing By",
        characters: [{ name: CHARACTERS.STROMBOLI, level: 2 }],
        time: "2h",
        tokens: [
            { name: CHARACTERS.GEPPETTO, tokenType: EARS },
            { name: CHARACTERS.BLUE_FAIRY, tokenType: TOKEN }
        ]
    },
    {
        name: "Curse at Misfortune",
        characters: [{ name: CHARACTERS.STROMBOLI, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.PINOCCHIO_DARING_JOURNEY }],
        tokens: [
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: EARS },
            { name: CHARACTERS.PINOCCHIO, tokenType: EARS }
        ]
    },
    {
        name: "Count Up Profits",
        characters: [{ name: CHARACTERS.STROMBOLI, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.STROMBOLI_CARAVAN }],
        tokens: [{ name: CHARACTERS.HONEST_JOHN, tokenType: TOKEN }]
    },
    //stromboli end
    //blue fairy
    {
        name: "Fly Like Starlight",
        characters: [{ name: CHARACTERS.BLUE_FAIRY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.PINOCCHIO, tokenType: COMMON }]
    },
    {
        name: "Deliver Magical Message",
        characters: [{ name: CHARACTERS.BLUE_FAIRY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.GEPPETTO_WORKSHOP }],
        tokens: [
            { name: CHARACTERS.HONEST_JOHN, tokenType: EARS },
            { name: CHARACTERS.STROMBOLI, tokenType: TOKEN }
        ]
    },
    {
        name: "Provide Hope",
        characters: [{ name: CHARACTERS.BLUE_FAIRY, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.STROMBOLI_CARAVAN }],
        tokens: [
            { name: CHARACTERS.FIGARO, tokenType: EARS },
            { name: CHARACTERS.PINOCCHIO, tokenType: EARS }
        ]
    },
    {
        name: "Watch the Village",
        characters: [{ name: CHARACTERS.BLUE_FAIRY, level: 4 }],
        time: "6h",
        required: [{ name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS }],
        tokens: [
            { name: CHARACTERS.JIMINY_CRICKET, tokenType: EARS },
            { name: CHARACTERS.GEPPETTO, tokenType: TOKEN }
        ]
    },
    //blue fairy end
    //little john
    {
        name: "Scratch like a Scoundrel",
        characters: [{ name: CHARACTERS.LITTLE_JOHN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ROBINHOOD, tokenType: COMMON }]
    },
    {
        name: "Rest Up at Camp",
        characters: [{ name: CHARACTERS.LITTLE_JOHN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.SHERWOOD_FOREST }],
        tokens: [{ name: CHARACTERS.SIR_HISS, tokenType: TOKEN }]
    },
    {
        name: "Sneak into Town",
        characters: [{ name: "Little John", level: 4 }],
        time: "4h",
        required: [{ name: "Nottingham", type: "building" }],
        tokens: [{ name: "Maid Marian", tokenType: TOKEN }]
    },
    {
        name: "Cool Off in the River",
        characters: [{ name: CHARACTERS.LITTLE_JOHN, level: 6 }],
        time: "2h",
        required: [{ name: BUILDINGS.SHERWOOD_FOREST, level: 2 }],
        tokens: [
            { name: CHARACTERS.ROBIN_HOOD, tokenType: EARS },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: EARS }
        ]
    },
    //little john end
    //sir hiss
    {
        name: "Hissing Hypnosis",
        characters: [{ name: "Sir Hiss", level: 1 }],
        time: "1h",
        tokens: [{ name: "Robin Hood", tokenType: "collection" }]
    },
    {
        name: "Avoid Puddles",
        characters: [{ name: CHARACTERS.SIR_HISS, level: 2 }],
        time: "4h",
        required: [{ name: BUILDINGS.SHERWOOD_FOREST }],
        tokens: [{ name: CHARACTERS.MAID_MARIAN, tokenType: EARS }]
    },
    {
        name: "Count Up Profits",
        characters: [{ name: CHARACTERS.SIR_HISS, level: 4 }],
        time: "2h",
        required: [{ name: BUILDINGS.NOTTINGHAM }],
        tokens: [
            { name: CHARACTERS.PRINCE_JOHN, tokenType: TOKEN },
            { name: CHARACTERS.ROBIN_HOOD, tokenType: TOKEN },
            { name: CHARACTERS.LITTLE_JOHN, tokenType: TOKEN }
        ]
    },
    //sir hiss end
    //robin hood
    {
        name: "Put On a Great Performance",
        characters: [{ name: "Robin Hood", level: 1 }],
        time: "1h",
        tokens: [{ name: "Robin Hood", tokenType: "collection" }]
    },
    {
        name: "Dream and Scheme",
        characters: [{ name: CHARACTERS.ROBIN_HOOD, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.SHERWOOD_FOREST }],
        tokens: [
            { name: CHARACTERS.SIR_HISS, tokenType: EARS },
            { name: CHARACTERS.LITTLE_JOHN, tokenType: TOKEN },
            { name: CHARACTERS.MAID_MARIAN, tokenType: TOKEN }
        ]
    },
    {
        name: "Steal from the Rich",
        characters: [{ name: CHARACTERS.ROBIN_HOOD, level: 3 }],
        time: "4h",
        required: [{ name: BUILDINGS.NOTTINGHAM }],
        tokens: [
            { name: CHARACTERS.ROBIN_HOOD, tokenType: TOKEN },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: TOKEN }
        ]
    },
    //robin hood end
    //maid marian
    {
        name: "Sway Happily",
        characters: [{ name: CHARACTERS.MAID_MARIAN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ROBINHOOD, tokenType: COMMON }]
    },
    {
        name: "Wait for Uncle to Return",
        characters: [{ name: CHARACTERS.MAID_MARIAN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.NOTTINGHAM }],
        tokens: [{ name: CHARACTERS.LITTLE_JOHN, tokenType: EARS }]
    },
    {
        name: "Have Mercy",
        characters: [
            { name: CHARACTERS.MAID_MARIAN, level: 3 },
            { name: CHARACTERS.PRINCE_JOHN, level: 3 }
        ],
        time: "2h",
        required: [{ name: BUILDINGS.NOTTINGHAM, level: 1 }],
        tokens: [{ name: CHARACTERS.ROBIN_HOOD, tokenType: EARS }]
    },
    {
        name: "Wander Beneath the Trees",
        characters: [{ name: CHARACTERS.MAID_MARIAN, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.SHERWOOD_FOREST }],
        tokens: [
            { name: CHARACTERS.SIR_HISS, tokenType: TOKEN },
            { name: CHARACTERS.PRINCE_JOHN, tokenType: EARS }
        ]
    },
    //maid marian end
    //prince john
    {
        name: "Project Power",
        characters: [{ name: CHARACTERS.PRINCE_JOHN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.ROBINHOOD, tokenType: COMMON }]
    },
    {
        name: "Double the Taxes",
        characters: [{ name: CHARACTERS.PRINCE_JOHN, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.NOTTINGHAM }],
        tokens: [{ name: CHARACTERS.SIR_HISS, tokenType: EARS }]
    },
    {
        name: "Avoid Bandits",
        characters: [{ name: CHARACTERS.PRINCE_JOHN, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.SHERWOOD_FOREST }],
        tokens: [
            { name: CHARACTERS.LITTLE_JOHN, tokenType: EARS },
            { name: CHARACTERS.MAID_MARIAN, tokenType: EARS }
        ]
    },
    //prince john end
    //charles muntz
    {
        name: "Ponder the Past",
        characters: [{ name: "Charles Muntz", level: 1 }],
        time: "1h",
        tokens: [
            {
                name: "Look at Ellie's Photograph",
                characters: [{ name: CHARACTERS.CARL_FREDRICKSEN, level: 1 }],
                time: "1h",
                tokens: [{ name: GROUPS.UP, tokenType: COMMON }]
            }
        ]
    },
    {
        name: "Ponder the Past",
        characters: [{ name: "Charles Muntz", level: 1 }],
        time: "1h",
        tokens: [
            {
                name: "Look at Ellie's Photograph",
                characters: [{ name: CHARACTERS.CARL_FREDRICKSEN, level: 1 }],
                time: "1h",
                tokens: [{ name: GROUPS.UP, tokenType: COMMON }]
            }
        ]
    },
    {
        name: "Hunt for Rare Creatures",
        characters: [{ name: "Charles Muntz", level: 4 }],
        time: "4h",
        required: [{ name: "Paradise Falls", type: "building" }],
        tokens: [{ name: "Dug", tokenType: TOKEN }]
    },
    {
        name: "Seek Obsessively",
        characters: [{ name: "Charles Muntz", level: 5 }],
        time: "6h",
        required: [{ name: "Paradise Falls", type: "building" }],
        tokens: [{ name: CHARACTERS.DUG, tokenType: EARS }]
    },
    //charles muntz end
    //dug
    {
        name: "Play with Ball",
        characters: [{ name: "Dug", level: 1 }],
        time: "1h",
        tokens: [{ name: "Up", tokenType: "collection" }]
    },
    {
        name: "Wait for Orders",
        characters: [{ name: "Dug", level: 4 }],
        time: "6h",
        required: [{ name: "Paradise Falls", type: "building" }],
        tokens: [{ name: "Charles Muntz", tokenType: TOKEN }]
    },
    {
        name: "Point!",
        characters: [{ name: "Dug", level: 5 }],
        time: "8h",
        tokens: [{ name: CHARACTERS.CHARLES_MUNTZ, tokenType: EARS }]
    },
    //dug end
    //carl
    {
        name: "Look at Ellie's Photograph",
        characters: [{ name: CHARACTERS.CARL_FREDRICKSEN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.UP, tokenType: COMMON }]
    },
    //carl end
    //russell
    {
        name: "Count Explorer Badges",
        characters: [{ name: CHARACTERS.RUSSELL, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.UP, tokenType: COMMON }]
    },
    {
        name: "See Who's Home",
        characters: [{ name: CHARACTERS.KEVIN, level: 4 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.CARL_FREDRICKSEN, tokenType: EARS }]
    },
    {
        name: "Search for Help",
        characters: [{ name: CHARACTERS.KEVIN, level: 5 }],
        time: "6h",
        tokens: [{ name: CHARACTERS.KEVIN, tokenType: EARS }]
    },
    //russell end
    //kevin
    {
        name: "Watch Over the Babies",
        characters: [{ name: CHARACTERS.KEVIN, level: 1 }],
        time: "1h",
        tokens: [
            { name: CHARACTERS.RUSSELL, tokenType: EARS },
            { name: CHARACTERS.CARL_FREDRICKSEN, tokenType: TOKEN }
        ]
    },
    {
        name: "Mistake Balloons for Food",
        characters: [{ name: CHARACTERS.KEVIN, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.CARL_HOUSE }],
        tokens: [{ name: GROUPS.UP, tokenType: COMMON }]
    },
    //kevin end
    //miriam
    {
        name: "Practice Beatboxing",
        characters: [{ name: CHARACTERS.MIRIAM, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TURNING_RED, tokenType: COMMON }]
    },
    {
        name: "Read Pamphlets",
        characters: [{ name: "Miriam", level: 2 }],
        time: "2h",
        required: [{ name: "Lee Family Temple", level: 0, type: "building" }],
        tokens: [
            { name: CHARACTERS.MING_LEE, tokenType: TOKEN },
            { name: CHARACTERS.PRIYA, tokenType: TOKEN }
        ]
    },
    {
        name: "Encourage Others to Dance",
        characters: [{ name: "Miriam", level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.TYLER_EPIC_PARTY, type: "building" }],
        tokens: [
            { name: CHARACTERS.ABBY, tokenType: EARS, remove: true },
            { name: CHARACTERS.MEILIN, tokenType: TOKEN },
            { name: CHARACTERS.ABBY, tokenType: TOKEN }
        ]
    },
    //miriam end
    //priya
    {
        name: "Read Vampire Romance Novel",
        characters: [{ name: CHARACTERS.PRIYA, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TURNING_RED, tokenType: COMMON }]
    },
    {
        name: "Come Up with New Dance Moves",
        characters: [{ name: CHARACTERS.PRIYA, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.TYLER_EPIC_PARTY }],
        tokens: [
            { name: CHARACTERS.ABBY, tokenType: TOKEN },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN }
        ]
    },
    {
        name: "Watch the Koi Fish",
        characters: [{ name: CHARACTERS.PRIYA, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.LEE_FAMILY_TEMPLE }],
        tokens: [
            { name: CHARACTERS.ABBY, tokenType: TOKEN, remove: true },
            { name: CHARACTERS.MEILIN, tokenType: TOKEN }
        ]
    },
    //priya end
    //ming lee
    {
        name: "Keep an Eye Out",
        characters: [{ name: CHARACTERS.MING_LEE, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TURNING_RED, tokenType: COMMON }]
    },
    {
        name: "Thank the Ancestors",
        characters: [{ name: CHARACTERS.MING_LEE, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.LEE_FAMILY_TEMPLE }],
        tokens: [
            { name: CHARACTERS.MIRIAM, tokenType: EARS },
            { name: CHARACTERS.PRIYA, tokenType: EARS }
        ]
    },
    {
        name: "Question Music Choice",
        characters: [{ name: CHARACTERS.MING_LEE, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.TYLER_EPIC_PARTY }],
        tokens: [
            { name: CHARACTERS.ABBY, tokenType: EARS },
            { name: CHARACTERS.MEILIN, tokenType: EARS }
        ]
    },
    //ming lee end
    //abby
    {
        name: "Drink Bubble Tea",
        characters: [{ name: CHARACTERS.ABBY, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TURNING_RED, tokenType: COMMON }]
    },
    {
        name: "Dance on the Couch",
        characters: [{ name: CHARACTERS.ABBY, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.TYLER_EPIC_PARTY }],
        tokens: [
            { name: CHARACTERS.PRIYA, tokenType: TOKEN },
            { name: CHARACTERS.MIRIAM, tokenType: TOKEN }
        ]
    },
    {
        name: "Visit on the Way to the Salon",
        characters: [{ name: CHARACTERS.ABBY, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.LEE_FAMILY_TEMPLE }],
        tokens: [{ name: CHARACTERS.MEILIN, tokenType: EARS }]
    },
    //abby end
    //meilin
    {
        name: "Admire 4*Town CD",
        characters: [{ name: CHARACTERS.MEILIN, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.TURNING_RED, tokenType: COMMON }]
    },
    {
        name: "Don't Act Like a Dork-Narc",
        characters: [{ name: CHARACTERS.MEILIN, level: 3 }],
        time: "4h",
        required: [
            { name: BUILDINGS.TYLER_EPIC_PARTY, level: 1, type: "building" }
        ],
        tokens: [
            { name: CHARACTERS.PRIYA, tokenType: EARS },
            { name: CHARACTERS.MIRIAM, tokenType: EARS }
        ]
    },
    {
        name: "Scrub the Statues",
        characters: [{ name: CHARACTERS.MEILIN, level: 2 }],
        time: "2h",
        required: [{ name: "Lee Family Temple", level: 0, type: "building" }],
        tokens: [
            { name: CHARACTERS.MING_LEE, tokenType: EARS },
            { name: CHARACTERS.ABBY, tokenType: EARS }
        ]
    },
    //meilin end
    //mary sanderson
    {
        name: "Smell for Children",
        characters: [{ name: CHARACTERS.MARY_SANDERSON, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.HOCUS_POCUS, tokenType: COMMON }]
    },
    {
        name: "Be Confused by Surroundings",
        characters: [{ name: CHARACTERS.MARY_SANDERSON, level: 2 }],
        time: "2h",
        required: [{ name: BUILDINGS.SALEM_CIRCUIT }],
        tokens: [{ name: CHARACTERS.SARAH_SANDERSON, tokenType: EARS }]
    },
    {
        name: "Hide from Witch Hunters",
        characters: [{ name: CHARACTERS.MARY_SANDERSON, level: 4 }],
        time: "4h",
        tokens: [{ name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS }]
    },
    //mary sanderson end
    //sarah sanderson
    {
        name: "Cruel Celebration",
        characters: [{ name: CHARACTERS.MARY_SANDERSON, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.HOCUS_POCUS, tokenType: COMMON }]
    },
    {
        name: "Eat a Pretty Spider",
        characters: [{ name: CHARACTERS.MARY_SANDERSON, level: 2 }],
        time: "2h",
        tokens: [{ name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN }]
    },
    {
        name: 'Hide from "Burning Rain"',
        characters: [{ name: CHARACTERS.MARY_SANDERSON, level: 4 }],
        time: "4h",
        required: [{ name: BUILDINGS.SANDERSON_HOUSE }],
        tokens: [{ name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN }]
    },
    //sarah sanderson end
    //winnifred sanderson
    {
        name: "Practice Spellcasting",
        characters: [{ name: CHARACTERS.MARY_SANDERSON, level: 1 }],
        time: "1h",
        tokens: [{ name: GROUPS.HOCUS_POCUS, tokenType: COMMON }]
    }
    //winnifred sanderson end
];
//endtasks

const getTaskKey = (name, characters) => {
    if (characters.length === 1) {
        return `${name}-${characters[0].name}`;
    } else {
        return `${name}-${characters[0].name}-${characters[1].name}`;
    }
};

let tasks = taskData.map(({ name, time, trophies, characters }) => {
    if (!trophies) {
        trophies = false;
    }
    return { name, key: getTaskKey(name, characters), time, trophies };
});

let charactersTasks = flatten(
    taskData.map(({ name, characters }) => {
        return characters.map(({ name: character_name, level }) => {
            return {
                name,
                character_name,
                key: getTaskKey(name, characters),
                level: level || null
            };
        });
    })
);

let taskCharacterTokens = [];
let taskGroupTokens = [];
let taskFabricTokens = [];
let taskSpecialTokens = [];

let taskBuildingRequirements = [];
let taskCostumeRequirements = [];

for (let task of taskData) {
    const { required, characters } = task;
    if (required) {
        for (let i in required) {
            if (!required[i].type || required[i].type === REQ_TYPES.BUILDING) {
                taskBuildingRequirements.push({
                    level: required[i].level || null,
                    building_name: required[i].name,
                    task_key: getTaskKey(task.name, characters)
                });
            }
            if (required[i].type === REQ_TYPES.COSTUME) {
                taskCostumeRequirements.push({
                    costume_key: `${required[i].name}-${required[i].character}`,
                    task_key: getTaskKey(task.name, characters)
                });
            }
        }
    }

    for (let i in task.tokens) {
        const { name: tokenName, tokenType, remove } = task.tokens[i];
        const task_key = getTaskKey(task.name, task.characters);
        switch (tokenType) {
            case TOKEN:
                taskCharacterTokens.push({
                    task_key,
                    token_key: `${tokenName}-${tokenType}`,
                    remove
                });
                break;
            case EARS:
                taskCharacterTokens.push({
                    task_key,
                    token_key: `${tokenName}-${tokenType}`,
                    remove
                });
                break;
            case COMMON:
                taskGroupTokens.push({ task_key, name: tokenName, remove });
                break;
            case FABRIC:
                taskFabricTokens.push({ task_key, name: tokenName, remove });
                break;
            case SPECIAL:
                taskSpecialTokens.push({ task_key, name: tokenName, remove });
                break;
            default:
                break;
        }
    }
}

module.exports = {
    tasks,
    charactersTasks,
    taskCharacterTokens,
    taskGroupTokens,
    taskFabricTokens,
    taskSpecialTokens,
    taskBuildingRequirements,
    taskCostumeRequirements
};

// select characters.name, tasks.name,level from characters_to_tasks left outer join characters on characters_to_tasks.character_id = characters.id left outer join tasks on characters_to_tasks.task_id = tasks.id order by characters.name,level,tasks.name;
