const {
    BUILDINGS,
    BUILDING_CATEGORIES,
    CHARACTERS,
    GROUPS,
    TOKENS,
    SPECIAL_ITEMS
} = require("./constants");
const { COMMON, EARS, TOKEN, SPECIAL, FABRIC } = TOKENS;

const buildingList = [
    {
        name: BUILDINGS.SWORD_IN_STONE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        enchantment_group: false,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [{ level: 0, name: CHARACTERS.PHILLIP, tokenType: TOKEN }]
    },
    //mf //mickey and friends
    {
        name: BUILDINGS.MICKEY_FUN_WHEEL,
        trophies: true,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "1h",
        tokens: [
            { level: 0, name: GROUPS.MF, tokenType: COMMON },
            { level: 1, name: GROUPS.TS, tokenType: COMMON },
            { level: 2, name: GROUPS.CINDERELLA, tokenType: COMMON },
            { level: 3, name: GROUPS.PP, tokenType: COMMON },
            { level: 4, name: GROUPS.WALLE, tokenType: COMMON }
        ]
    },
    {
        name: BUILDINGS.MICKEY_HOUSE,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "2h",
        tokens: [
            { level: 0, name: CHARACTERS.MICKEY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.MICKEY, tokenType: EARS },
            { level: 2, name: CHARACTERS.TREMAINE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.PETE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ZAZU, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MICKEY_PHIL,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "2h",
        tokens: [
            { level: 0, name: CHARACTERS.TREMAINE, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.CHARMING, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.CHARMING, tokenType: EARS },
            { level: 3, name: CHARACTERS.DRIZELLA, tokenType: EARS },
            { level: 4, name: CHARACTERS.BUZZ, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.GOOFY_PLAYHOUSE,
        trophies: true,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "2h",
        tokens: [
            { level: 0, name: CHARACTERS.GOOFY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.GOOFY, tokenType: EARS },
            { level: 2, name: CHARACTERS.BUZZ, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.RAFIKI, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.DOC, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MINNIE_HOUSE,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.MAXIMUS, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.BULLSEYE, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.KING_LOUIE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.MINNIE, tokenType: EARS },
            { level: 4, name: CHARACTERS.JOHN, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.DAISY_DINER,
        trophies: true,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.DAISY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.DAISY, tokenType: EARS },
            { level: 2, name: CHARACTERS.MINNIE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.DEWEY, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.DONALD, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.DONALD_BOAT,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.SCROOGE, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.MOWGLI, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.DONALD, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.DONALD, tokenType: EARS },
            { level: 4, name: CHARACTERS.MICHAEL, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PLUTO_HOUSE,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "60 gems",
        time: "1h",
        tokens: [
            { level: 0, name: CHARACTERS.PLUTO, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.PLUTO, tokenType: EARS },
            { level: 2, name: CHARACTERS.FAIRY_GODMOTHER, tokenType: EARS },
            { level: 3, name: CHARACTERS.CHIP, tokenType: EARS },
            { level: 4, name: CHARACTERS.DALE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.CHIP_DALE_TREEHOUSE,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "200 gems",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.CHIP, tokenType: EARS },
            { level: 1, name: CHARACTERS.DALE, tokenType: EARS },
            { level: 2, name: CHARACTERS.CHIP, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.DALE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.GOTHEL, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.STEAMBOAT,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.MF, tokenType: COMMON },
            { level: 1, name: "Classic", tokenType: FABRIC },
            { level: 2, name: CHARACTERS.PETE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.PETE, tokenType: EARS },
            { level: 4, name: "Buttoned Classic", tokenType: FABRIC }
        ]
    },
    {
        name: BUILDINGS.FANTASMIC,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.MF,
        enchantment_group: GROUPS.MF,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "8h",
        tokens: [
            { level: 0, name: "Red Star", tokenType: FABRIC },
            { level: 1, name: "Blue Moon", tokenType: FABRIC },
            { level: 2, name: "Orange Pattern", tokenType: FABRIC },
            { level: 3, name: "White & Blue Pattern", tokenType: FABRIC },
            { level: 4, name: "Rope Material", tokenType: FABRIC }
        ]
    },
    //mf end //mickey and friends bottom
    //ducktales
    {
        name: BUILDINGS.MONEY_BIN,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        enchantment_group: GROUPS.DUCKTALES,
        group: GROUPS.DUCKTALES,
        unlock_type: BUILDING_CATEGORIES.LEADERBOARD,
        unlock_info: "Virus Mini Event",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.DUCKTALES, tokenType: COMMON },
            { level: 1, name: CHARACTERS.SCROOGE, tokenType: EARS },
            { level: 2, name: CHARACTERS.DEWEY, tokenType: EARS },
            { level: 3, name: CHARACTERS.LOUIE, tokenType: EARS },
            { level: 4, name: CHARACTERS.LOUIE, tokenType: TOKEN }
        ]
    },
    //ducktales end
    //ts //toy story
    {
        name: BUILDINGS.AL_TOY_BARN,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.REX, tokenType: EARS },
            { level: 1, name: CHARACTERS.SARGE, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.TINK, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.VIOLET, tokenType: EARS },
            { level: 4, name: CHARACTERS.ZURG, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.PIZZA_PLANET,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.WOODY, tokenType: EARS },
            { level: 1, name: CHARACTERS.SARGE, tokenType: EARS },
            { level: 2, name: CHARACTERS.WALLE, tokenType: EARS },
            { level: 3, name: CHARACTERS.LUMIERE, tokenType: EARS },
            { level: 4, name: CHARACTERS.ZURG, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.ASTRO_ORBITERS,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        enchantment_group: GROUPS.DISNEY_PARKS,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.WALLE, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.TIMOTHY, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.SIMBA, tokenType: EARS },
            { level: 3, name: CHARACTERS.ALIEN, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ALIEN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.JESSIE_SNACK_ROUNDUP,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.JESSIE, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.JESSIE, tokenType: EARS },
            { level: 2, name: CHARACTERS.HAMM, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.REX, tokenType: EARS },
            { level: 4, name: CHARACTERS.BULLSEYE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BUZZ_ASTRO_BLASTERS,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.CALENDAR,
        unlock_info: "Calendar day 25",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.BO_PEEP, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.MIKE, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.BOO, tokenType: EARS },
            { level: 3, name: CHARACTERS.WASABI, tokenType: EARS },
            { level: 4, name: CHARACTERS.ZURG, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.PARACHUTE_DROP,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "175 gems",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.WOODY, tokenType: EARS },
            { level: 1, name: CHARACTERS.SARGE, tokenType: EARS },
            { level: 2, name: CHARACTERS.CHARMING, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.CELIA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.JOHN, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.RC_RACERS,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "125 gems",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.REX, tokenType: EARS },
            { level: 1, name: CHARACTERS.TREMAINE, tokenType: EARS },
            { level: 2, name: CHARACTERS.CARPET, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.MERRYWEATHER, tokenType: EARS },
            { level: 4, name: CHARACTERS.AURORA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SLINKY,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "300 gems",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.BO_PEEP, tokenType: EARS },
            { level: 1, name: CHARACTERS.REX, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.FORKY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.DUCKY, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.BUNNY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.STAR_ADVENTURER,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "7,500 elixir",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.BO_PEEP, tokenType: EARS },
            { level: 1, name: CHARACTERS.FORKY, tokenType: EARS },
            { level: 2, name: CHARACTERS.BUNNY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.ZURG, tokenType: EARS },
            { level: 4, name: CHARACTERS.FAUNA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.TS_MANIA,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.TS,
        enchantment_group: GROUPS.TS,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "30k elixir",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.WOODY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.HAMM, tokenType: EARS },
            { level: 2, name: CHARACTERS.ABU, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.DUCKY, tokenType: EARS },
            { level: 4, name: CHARACTERS.RANDALL, tokenType: EARS }
        ]
    },
    //ts end //toy story end
    //cinderella
    {
        name: BUILDINGS.REGAL_CARROUSEL,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        enchantment_group: GROUPS.CINDERELLA,
        group: GROUPS.CINDERELLA,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.TREMAINE, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.FAIRY_GODMOTHER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.TREMAINE, tokenType: EARS },
            { level: 3, name: CHARACTERS.CINDERELLA, tokenType: EARS },
            { level: 4, name: CHARACTERS.CINDERELLA, tokenType: TOKEN }
        ]
    },
    //cinderella end
    //disney parks
    {
        name: BUILDINGS.FANTASY_FAIRE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        enchantment_group: "Disney Parks",
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.FAIRY_GODMOTHER, tokenType: EARS },
            { level: 1, name: CHARACTERS.DRIZELLA, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.ANASTASIA, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.CINDERELLA, tokenType: EARS },
            { level: 4, name: CHARACTERS.ANASTASIA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PRINCESS_FAIRYTALE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        enchantment_group: "Disney Parks",
        unlock_type: BUILDING_CATEGORIES.CALENDAR,
        time: "12h",
        unlock_info: "Calendar day 47",
        tokens: [
            { level: 0, name: CHARACTERS.CHARMING, tokenType: EARS },
            { level: 1, name: CHARACTERS.MERRYWEATHER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.FLORA, tokenType: EARS },
            { level: 3, name: CHARACTERS.FAUNA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.AURORA, tokenType: TOKEN }
        ]
    },
    //disney parks end
    //pp //peter pan
    {
        name: BUILDINGS.PIXIE_HOLLOW,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.PP,
        enchantment_group: GROUPS.PP,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.DAVY_JONES, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.TINK, tokenType: EARS },
            { level: 2, name: CHARACTERS.HOOK, tokenType: EARS },
            { level: 3, name: CHARACTERS.JOHN, tokenType: EARS },
            { level: 4, name: CHARACTERS.MICHAEL, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PETER_PAN_FLIGHT,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.PP,
        enchantment_group: GROUPS.PP,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "12h",
        tokens: [
            { level: 0, name: GROUPS.PP, tokenType: COMMON },
            { level: 1, name: CHARACTERS.FORKY, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.TREMAINE, tokenType: EARS },
            { level: 3, name: CHARACTERS.JOHN, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.PETER, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.LOST_BOYS,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.PP,
        enchantment_group: GROUPS.PP,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.PP, tokenType: COMMON },
            { level: 1, name: CHARACTERS.DAVY_JONES, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.KING_LOUIE, tokenType: EARS },
            { level: 3, name: CHARACTERS.WENDY, tokenType: EARS },
            { level: 4, name: CHARACTERS.MICHAEL, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.JOLLY_ROGER,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.PP,
        enchantment_group: GROUPS.PP,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "30k elixir",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.HOOK, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.FLYNN, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.DUCKY, tokenType: EARS },
            { level: 3, name: CHARACTERS.WENDY, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.PETER, tokenType: EARS }
        ]
    },
    //pp end //peter pan end
    //pirates
    {
        name: BUILDINGS.TORTUGA_TAVERN,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.PIRATES,
        enchantment_group: GROUPS.PIRATES,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.JACK_SPARROW, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.WILL_TURNER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.ELIZABETH, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.WILL_TURNER, tokenType: EARS },
            { level: 4, name: CHARACTERS.ELIZABETH, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PIRATES_OF_CARIBBEAN,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.PIRATES,
        enchantment_group: GROUPS.PIRATES,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.TIA_DALMA, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.TIA_DALMA, tokenType: EARS },
            { level: 2, name: CHARACTERS.BARBOSSA, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.BARBOSSA, tokenType: EARS },
            { level: 4, name: CHARACTERS.SCAR, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.KRAKEN,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.PIRATES,
        enchantment_group: GROUPS.PIRATES,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "150 gems",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.WILL_TURNER, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.WILL_TURNER, tokenType: EARS },
            { level: 2, name: CHARACTERS.ELIZABETH, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.ELIZABETH, tokenType: EARS },
            { level: 4, name: CHARACTERS.BARBOSSA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SEA_SERPENT,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.PIRATES,
        enchantment_group: GROUPS.PIRATES,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.JACK_SPARROW, tokenType: EARS },
            { level: 1, name: CHARACTERS.ELIZABETH, tokenType: EARS },
            { level: 2, name: CHARACTERS.HOOK, tokenType: EARS },
            { level: 3, name: CHARACTERS.PETER, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.JACKJACK, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.DAVY_ORGAN,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.PIRATES,
        enchantment_group: GROUPS.PIRATES,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "30k elixir",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.DAVY_JONES, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.DAVY_JONES, tokenType: EARS },
            { level: 2, name: CHARACTERS.TIA_DALMA, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.TIA_DALMA, tokenType: EARS },
            { level: 4, name: CHARACTERS.WENDY, tokenType: EARS }
        ]
    },
    //pirates end
    //monsters
    {
        name: BUILDINGS.CYCLOPS_SUSHI,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.MONSTERS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.SULLEY, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.BOO, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.JOHN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MONSTERS_LAUGH,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.MONSTERS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "16h",
        tokens: [{ level: 0, name: CHARACTERS.RANDALL, tokenType: TOKEN }]
    },
    {
        name: BUILDINGS.MIKE_SULLEY_RESCUE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.MONSTERS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "130 gems",
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.ROZ, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.RAPUNZEL, tokenType: EARS }
        ]
    },
    //monsters end
    //tangled
    {
        name: BUILDINGS.RAPUNZEL_TOWER,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.TANGLED,
        enchantment_group: GROUPS.TANGLED,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.FLYNN, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.MAXIMUS, tokenType: EARS },
            { level: 2, name: CHARACTERS.FLYNN, tokenType: EARS },
            { level: 3, name: CHARACTERS.RAPUNZEL, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.LOUIE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SNUGGLY_DUCKLING,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.TANGLED,
        enchantment_group: GROUPS.TANGLED,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "24h",
        tokens: [
            { level: 0, name: CHARACTERS.MAXIMUS, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.PASCAL, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.PASCAL, tokenType: EARS },
            { level: 3, name: CHARACTERS.GOTHEL, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.GOTHEL, tokenType: EARS }
        ]
    },
    //tangled end
    //sleeping beauty //sb
    {
        name: BUILDINGS.FAIRY_HUT,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.SB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "2h",
        tokens: []
    },
    {
        name: BUILDINGS.AURORA_SPINNING,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.SB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "65 gems",
        time: "1h",
        tokens: [
            { level: 0, name: GROUPS.TANGLED, tokenType: COMMON },
            { level: 0, name: GROUPS.SB, tokenType: COMMON },
            { level: 0, name: GROUPS.ZOOTOPIA, tokenType: COMMON }
        ]
    },
    //sleeping beauty end //sb end
    //zootopia
    {
        name: BUILDINGS.ZOOTOPIA_PD,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.ZOOTOPIA,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.NICK, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.FLASH, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.LITTLE_RODENTIA,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.ZOOTOPIA,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "24h",
        tokens: [{ level: 0, name: CHARACTERS.FLASH, tokenType: TOKEN }]
    },
    {
        name: BUILDINGS.ZOOTOPIA_RACE_TRACK,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: GROUPS.ZOOTOPIA,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.ZOOTOPIA, tokenType: COMMON },
            { level: 0, name: CHARACTERS.BOGO, tokenType: EARS }
        ]
    },
    //zootopia end
    //bambi
    {
        name: BUILDINGS.MEADOW,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.BAMBI,
        enchantment_group: GROUPS.BAMBI,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.BAMBI, tokenType: COMMON },
            { level: 1, name: CHARACTERS.THUMPER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.THUMPER, tokenType: EARS },
            { level: 3, name: CHARACTERS.BAMBI, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.BAMBI, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.FOREST_ICE_RINK,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.BAMBI,
        enchantment_group: GROUPS.BAMBI,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.BAMBI, tokenType: COMMON },
            { level: 1, name: CHARACTERS.FLOWER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.FLOWER, tokenType: EARS },
            { level: 3, name: CHARACTERS.BAMBI, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.BAMBI, tokenType: EARS }
        ]
    },
    //bambi end
    //jungle book //jb
    {
        name: BUILDINGS.JUNGLE_RIVER,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.JB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.BAGHEERA, tokenType: EARS },
            { level: 0, name: CHARACTERS.MOWGLI, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BALOO_OASIS,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.JB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "12h",
        tokens: [{ level: 0, name: CHARACTERS.BALOO, tokenType: TOKEN }]
    },
    {
        name: BUILDINGS.KAA_JUNGLE,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.JB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: []
    },
    //jungle book end //jb end
    //dumbo
    {
        name: BUILDINGS.DUMBO_FLYING,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.DUMBO,
        enchantment_group: GROUPS.DUMBO,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.TIMOTHY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.RINGMASTER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.TIMOTHY, tokenType: EARS },
            { level: 3, name: CHARACTERS.RINGMASTER, tokenType: EARS },
            { level: 4, name: CHARACTERS.DUMBO, tokenType: TOKEN }
        ]
    },
    //dumbo end
    //lady and the tramp //latt
    {
        name: BUILDINGS.LADY_AND_TRAMP_HOME,
        theme: null,
        group: GROUPS.LATT,
        enchantment_group: GROUPS.LATT,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.TRAMP, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.JOCK, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.TONY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.JOE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.LADY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.TONY_RESTAURANT,
        theme: null,
        group: GROUPS.LATT,
        enchantment_group: GROUPS.LATT,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.LATT, tokenType: COMMON },
            { level: 1, name: CHARACTERS.TRUSTY, tokenType: EARS },
            { level: 2, name: CHARACTERS.TRAMP, tokenType: EARS },
            { level: 3, name: CHARACTERS.TONY, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.LADY, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.BEAVER_DAM,
        theme: null,
        group: GROUPS.LATT,
        enchantment_group: GROUPS.LATT,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.TRUSTY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.TRAMP, tokenType: EARS },
            { level: 2, name: CHARACTERS.JOCK, tokenType: EARS },
            { level: 3, name: CHARACTERS.TONY, tokenType: EARS },
            { level: 4, name: CHARACTERS.JOE, tokenType: EARS }
        ]
    },
    //lady and the tramp end //latt end
    //walle
    {
        name: BUILDINGS.SPACE_TRADERS,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        enchantment_group: GROUPS.DISNEY_PARKS,
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        time: "1h",
        tokens: [
            { level: 0, name: GROUPS.PIRATES, tokenType: COMMON },
            { level: 1, name: GROUPS.MONSTERS, tokenType: COMMON },
            { level: 2, name: GROUPS.TANGLED, tokenType: COMMON },
            { level: 3, name: GROUPS.SB, tokenType: COMMON },
            { level: 4, name: GROUPS.ZOOTOPIA, tokenType: COMMON }
        ]
    },
    {
        name: BUILDINGS.WALLE_HOUSE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.WALLE,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "95 gems",
        time: "8h",
        tokens: [{ level: 0, name: CHARACTERS.WALLE, tokenType: EARS }]
    },
    //walle end
    //pocahontas
    {
        name: BUILDINGS.GRANDMOTHER_WILLOW,
        theme: null,
        group: GROUPS.POCAHONTAS,
        enchantment_group: GROUPS.POCAHONTAS,
        unlock_type: "storyline",
        unlock_info: "?",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.PERCY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.POCAHONTAS, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.POCAHONTAS, tokenType: EARS },
            { level: 3, name: CHARACTERS.MEEKO, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.MEEKO, tokenType: EARS }
        ]
    },
    //eng //emperor's new groove //groove
    {
        name: BUILDINGS.YZMA_LAIR,
        theme: null,
        group: GROUPS.ENG,
        enchantment_group: GROUPS.ENG,
        unlock_type: "storyline",
        unlock_info: "?",
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.PACHA, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.KUZCO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.KRONK, tokenType: EARS },
            { level: 3, name: CHARACTERS.YZMA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.GORD, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MUDKA_MEAT_HUT,
        theme: null,
        group: GROUPS.ENG,
        enchantment_group: GROUPS.ENG,
        unlock_type: "storyline",
        unlock_info: "?",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.ENG, tokenType: COMMON },
            { level: 1, name: CHARACTERS.PACHA, tokenType: EARS },
            { level: 2, name: CHARACTERS.KRONK, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.KUZCO, tokenType: EARS },
            { level: 4, name: CHARACTERS.YZMA, tokenType: EARS }
        ]
    },
    //eng end
    //rat //ratatouille
    {
        name: BUILDINGS.GUSTEAU_KITCHEN,
        theme: null,
        group: GROUPS.RATATOUILLE,
        enchantment_group: GROUPS.RATATOUILLE,
        unlock_type: "storyline",
        unlock_info: "?",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.RATATOUILLE, tokenType: COMMON },
            { level: 1, name: CHARACTERS.COLETTE, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.REMY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.REMY, tokenType: EARS },
            { level: 4, name: CHARACTERS.LINGUINI, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.REMY_ADVENTURE,
        theme: null,
        group: GROUPS.RATATOUILLE,
        enchantment_group: GROUPS.RATATOUILLE,
        unlock_type: "storyline",
        unlock_info: "?",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.COLETTE, tokenType: EARS },
            { level: 1, name: CHARACTERS.REMY, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.REMY, tokenType: EARS },
            { level: 3, name: CHARACTERS.LINGUINI, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.LINGUINI, tokenType: EARS }
        ]
    },
    //rat end //ratatouille end
    //rescuers
    {
        name: BUILDINGS.RESCUE_AID_SOCIETY,
        theme: null,
        group: GROUPS.RESCUERS,
        enchantment_group: GROUPS.RESCUERS,
        unlock_type: "storyline",
        unlock_info: "8h",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.BERNARD, tokenType: TOKEN },
            {
                level: 1,
                name: CHARACTERS.PENNY,
                tokenType: TOKEN,
                remove: true
            },
            { level: 1, name: CHARACTERS.PENNY_TR, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.ORVILLE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.MISS_BIANCA, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.MADAME_MEDUSA_RIVERBOAT,
        theme: null,
        group: GROUPS.RESCUERS,
        enchantment_group: GROUPS.RESCUERS,
        unlock_type: "storyline",
        unlock_info: "8h",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.BERNARD, tokenType: EARS },
            { level: 1, name: CHARACTERS.PENNY, tokenType: EARS, remove: true },
            { level: 1, name: CHARACTERS.PENNY_TR, tokenType: EARS },
            { level: 2, name: CHARACTERS.ORVILLE, tokenType: EARS },
            { level: 3, name: CHARACTERS.MISS_BIANCA, tokenType: EARS }
        ]
    },
    //rescuers end
    //up
    {
        name: BUILDINGS.PARADISE_FALLS,
        theme: null,
        group: GROUPS.UP,
        enchantment_group: GROUPS.UP,
        unlock_type: "event",
        unlock_info: null,
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.RUSSELL, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.CHARLES_MUNTZ, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.CARL_FREDRICKSEN, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.DUG, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.KEVIN, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.CARL_HOUSE,
        theme: null,
        group: GROUPS.UP,
        enchantment_group: GROUPS.UP,
        unlock_type: "event",
        unlock_info: null,
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.RUSSELL, tokenType: EARS },
            { level: 1, name: CHARACTERS.CHARLES_MUNTZ, tokenType: EARS },
            { level: 2, name: CHARACTERS.CARL_FREDRICKSEN, tokenType: EARS },
            { level: 3, name: CHARACTERS.DUG, tokenType: EARS },
            { level: 4, name: CHARACTERS.KEVIN, tokenType: EARS }
        ]
    },
    //up end
    //turning red
    {
        name: BUILDINGS.LEE_FAMILY_TEMPLE,
        theme: null,
        group: GROUPS.TURNING_RED,
        enchantment_group: GROUPS.TURNING_RED,
        unlock_type: "event",
        unlock_info: null,
        time: "8h",
        tokens: [
            {
                level: 4,
                name: CHARACTERS.MING_LEE,
                tokenType: TOKEN,
                remove: true
            },
            { level: 0, name: CHARACTERS.MIRIAM, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.PRIYA, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.MING_LEE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.ABBY, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.MEILIN, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.TYLER_EPIC_PARTY,
        theme: null,
        group: GROUPS.TURNING_RED,
        enchantment_group: GROUPS.TURNING_RED,
        unlock_type: "event",
        unlock_info: null,
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.MIRIAM, tokenType: EARS },
            { level: 1, name: CHARACTERS.PRIYA, tokenType: EARS },
            { level: 2, name: CHARACTERS.MING_LEE, tokenType: EARS },
            { level: 3, name: CHARACTERS.ABBY, tokenType: EARS },
            {
                level: 4,
                name: CHARACTERS.MEILIN,
                tokenType: EARS,
                remove: true
            },
            {
                level: 4,
                name: CHARACTERS.MING_LEE,
                tokenType: EARS,
                remove: true
            },
            { level: 4, name: CHARACTERS.MEILIN, tokenType: EARS }
        ]
    },
    //turning red end
    //hocus pocus
    {
        name: BUILDINGS.SANDERSON_HOUSE,
        theme: null,
        group: GROUPS.TURNING_RED,
        enchantment_group: GROUPS.TURNING_RED,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Hocus Pocus event",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.SARAH_SANDERSON, tokenType: EARS },
            { level: 2, name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.WINIFRED_SANDERSON, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SALEM_CIRCUIT,
        theme: null,
        group: GROUPS.TURNING_RED,
        enchantment_group: GROUPS.TURNING_RED,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Hocus Pocus event",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.SARAH_SANDERSON, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.MARY_SANDERSON, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.WINIFRED_SANDERSON, tokenType: TOKEN }
        ]
    },
    //hocus pocus end
    //incredibles
    {
        name: BUILDINGS.OMNIDROID_OBSTACLE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.INCREDS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Incredibles collection",
        time: "1h",
        tokens: [
            { level: 0, name: CHARACTERS.MR_I, tokenType: EARS },
            { level: 0, name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.DASH, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.OMNIDROID_CITY,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.INCREDS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Incredibles collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.SYNDROME, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.SYNDROME, tokenType: EARS },
            { level: 0, name: CHARACTERS.JACKJACK, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.INCREDS_HOUSE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.INCREDS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Incredibles collection",
        time: "2h",
        tokens: [
            { level: 0, name: CHARACTERS.VIOLET, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.FROZONE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.OLAF, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SYNDROME_ENERGY,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.INCREDS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Incredibles collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.JACKJACK, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.EUDORA, tokenType: TOKEN }
        ]
    },
    //incredibles end
    //nightmare //nbc
    {
        name: BUILDINGS.JACK_HOUSE,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        group: GROUPS.NBC,
        enchantment_group: GROUPS.NBC,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Nightmare collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.NBC, tokenType: COMMON },
            { level: 1, name: CHARACTERS.JACK_SKELLINGTON, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.JACK_SKELLINGTON, tokenType: EARS },
            { level: 3, name: CHARACTERS.OOGIE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.MAYOR, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.FINKELSTEIN_TOWER,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        group: GROUPS.NBC,
        enchantment_group: GROUPS.NBC,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Nightmare collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.BARREL, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.SALLY, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.SALLY, tokenType: EARS },
            { level: 3, name: CHARACTERS.OOGIE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.MAYOR, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.NIGHTMARE_CANDY,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        group: GROUPS.NBC,
        enchantment_group: GROUPS.NBC,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Nightmare collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.JACK_SKELLINGTON, tokenType: EARS },
            { level: 1, name: CHARACTERS.SALLY, tokenType: EARS },
            { level: 2, name: CHARACTERS.ZERO, tokenType: EARS },
            { level: 3, name: CHARACTERS.OOGIE, tokenType: EARS },
            { level: 4, name: CHARACTERS.MAYOR, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BROOMSTICK_GRAVEYARD,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        group: GROUPS.NBC,
        enchantment_group: GROUPS.NBC,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Nightmare collection",
        time: "12h",
        tokens: [
            { level: 0, name: GROUPS.NBC, tokenType: COMMON },
            { level: 1, name: CHARACTERS.ZERO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.SALLY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.OOGIE, tokenType: EARS },
            { level: 4, name: CHARACTERS.MAYOR, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.OOGIE_BOOGIE_SPIN,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        group: GROUPS.NBC,
        enchantment_group: GROUPS.NBC,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Nightmare collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.BARREL, tokenType: EARS },
            { level: 1, name: CHARACTERS.LOCK, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.LOCK, tokenType: EARS },
            { level: 3, name: CHARACTERS.SHOCK, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.SHOCK, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.HOLLYWOOD_TOWER_TERROR,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        group: null,
        enchantment_group: GROUPS.DISNEY_PARKS,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "1h",
        tokens: [
            { level: 0, name: GROUPS.JB, tokenType: COMMON },
            { level: 1, name: GROUPS.DUMBO, tokenType: COMMON },
            { level: 2, name: GROUPS.POCAHONTAS, tokenType: COMMON },
            { level: 3, name: GROUPS.ENG, tokenType: COMMON },
            { level: 4, name: GROUPS.RATATOUILLE, tokenType: COMMON }
        ]
    },
    //nightmare end //nbc end
    //frozen
    {
        name: BUILDINGS.ARENDELLE_COURTYARD,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.FROZEN,
        enchantment_group: GROUPS.FROZEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Frozen collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.ANNA, tokenType: EARS },
            { level: 1, name: CHARACTERS.KRISTOFF, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.OLAF, tokenType: EARS },
            { level: 3, name: CHARACTERS.SVEN, tokenType: EARS },
            { level: 4, name: CHARACTERS.HANS, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.ELSA_PALACE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.FROZEN,
        enchantment_group: GROUPS.FROZEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Frozen collection",
        time: "24h",
        tokens: [
            { level: 0, name: CHARACTERS.KRISTOFF, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.ANNA, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.SVEN, tokenType: EARS },
            { level: 3, name: CHARACTERS.HANS, tokenType: EARS },
            { level: 4, name: CHARACTERS.HANS, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.WANDERING_OAKEN,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.FROZEN,
        enchantment_group: GROUPS.FROZEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Frozen collection",
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.SVEN, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.RYDER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.KRISTOFF, tokenType: EARS },
            { level: 3, name: CHARACTERS.ELSA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.HANS, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.TROLL_KNOLL,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.FROZEN,
        enchantment_group: GROUPS.FROZEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Frozen collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.OLAF, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.ANNA, tokenType: EARS },
            { level: 2, name: CHARACTERS.SVEN, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.KRISTOFF, tokenType: EARS },
            { level: 4, name: CHARACTERS.HANS, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.STONE_GIANT_WATERFALL,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.FROZEN,
        enchantment_group: GROUPS.FROZEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Frozen collection",
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.OLAF, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.FIRE_SPIRIT, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.HONEYMAREN, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.RYDER, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ELSA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.ENCHANTED_FOREST,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.FROZEN,
        enchantment_group: GROUPS.FROZEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Frozen collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.ANNA, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.RYDER, tokenType: EARS },
            { level: 2, name: CHARACTERS.FIRE_SPIRIT, tokenType: EARS },
            { level: 3, name: CHARACTERS.OLAF, tokenType: EARS },
            { level: 4, name: CHARACTERS.HONEYMAREN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.WATER_SPIRIT_WAVE_RIDE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.FROZEN,
        enchantment_group: GROUPS.FROZEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Frozen collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.HONEYMAREN, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.RYDER, tokenType: EARS },
            { level: 2, name: CHARACTERS.FIRE_SPIRIT, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.HONEYMAREN, tokenType: EARS },
            { level: 4, name: CHARACTERS.HANS, tokenType: EARS }
        ]
    },
    //frozen end
    //mulan
    {
        name: BUILDINGS.LANTERN,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.MULAN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Mulan collection",
        time: "2h",
        tokens: [
            { level: 0, name: CHARACTERS.MULAN, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.MULAN, tokenType: EARS },
            { level: 0, name: CHARACTERS.LI_SHANG, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.CRIKEE, tokenType: EARS },
            { level: 0, name: CHARACTERS.SHAN_YU, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.ANCESTOR_SHRINE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.MULAN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Mulan collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.MULAN, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.LI_SHANG, tokenType: EARS },
            { level: 0, name: CHARACTERS.MUSHU, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.CRIKEE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.SHAN_YU, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.TRAINING_CAMP,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.MULAN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Mulan collection",
        time: "1h",
        tokens: [
            { level: 0, name: CHARACTERS.ELASTIGIRL, tokenType: TOKEN },
            { level: 0, name: GROUPS.MULAN, tokenType: COMMON },
            { level: 0, name: CHARACTERS.KHAN, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.KHAN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.REFLECTIONS_CHINA,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.MULAN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "8h",
        tokens: []
    },
    //mulan end
    //batb //beauty
    {
        name: BUILDINGS.BELLE_HOUSE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.BATB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "BatB collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.MR_I, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.BELLE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.GASTON_TAVERN,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.BATB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "BatB collection",
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.LEFOU, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.LEFOU, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BE_OUR_GUEST,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.BATB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "BatB collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.BATB, tokenType: COMMON },
            { level: 0, name: CHARACTERS.BELLE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.CHIP_POTTS, tokenType: EARS },
            { level: 0, name: CHARACTERS.LUMIERE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BEAST_CASTLE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.BATB,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "BatB collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.BATB, tokenType: COMMON },
            { level: 0, name: CHARACTERS.LUMIERE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.COGSWORTH, tokenType: EARS }
        ]
    },
    //batb end //beauty end
    //lk //lion king
    {
        name: BUILDINGS.FESTIVAL_LK,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.LK,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Lion King collection",
        time: "2h",
        tokens: [
            { level: 0, name: CHARACTERS.SIMBA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.TIMON, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.SHENZI, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.CIRCLE_OF_LIFE,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.LK,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Lion King collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.SIMBA, tokenType: EARS },
            { level: 0, name: CHARACTERS.ZAZU, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.RAFIKI, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.RAFIKI, tokenType: EARS },
            { level: 0, name: CHARACTERS.PUMBAA, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.TREE_OF_LIFE,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.LK,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Lion King collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.ED, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.BANZAI, tokenType: EARS }
        ]
    },
    //lk end //lion king end
    //aladdin
    {
        name: BUILDINGS.STREETS_OF_AGRABAH,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.ALADDIN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Aladdin collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.JASMINE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.ABU, tokenType: EARS },
            { level: 0, name: CHARACTERS.GENIE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.RAJAH, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.CAVE_OF_WONDERS,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.ALADDIN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Aladdin collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.GENIE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.IAGO, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.LOTUS_FOUNTAIN,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.ALADDIN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Aladdin collection",
        time: "8h",
        tokens: [{ level: 0, name: CHARACTERS.GENIE, tokenType: EARS }]
    },
    {
        name: BUILDINGS.GENIE_LAMP_SHOW,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.ALADDIN,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Aladdin collection",
        time: "12h",
        tokens: []
    },
    {
        name: BUILDINGS.MAGIC_LAMP_THEATER,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        enchantment_group: null,
        group: GROUPS.ALADDIN,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "7,500 elixir",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.JASMINE, tokenType: EARS },
            { level: 0, name: CHARACTERS.IAGO, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.MAGIC_CARPETS,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        enchantment_group: null,
        group: GROUPS.ALADDIN,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "7,500 elixir",
        time: "12h",
        tokens: [
            { level: 0, name: CHARACTERS.JAFAR, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.JAFAR, tokenType: EARS }
        ]
    },
    //aladdin end
    //aiw //alice
    {
        name: BUILDINGS.ALICE_IN_WONDERLAND,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.AIW,
        enchantment_group: GROUPS.AIW,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Alice in Wonderland collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.AIW, tokenType: COMMON },
            { level: 1, name: CHARACTERS.MAD_HATTER, tokenType: EARS },
            { level: 2, name: CHARACTERS.CHESHIRE, tokenType: EARS },
            { level: 3, name: CHARACTERS.ALICE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.CATERPILLAR, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.GOLDEN_AFTERNOON,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.AIW,
        enchantment_group: GROUPS.AIW,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Alice in Wonderland collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.AIW, tokenType: COMMON },
            { level: 1, name: CHARACTERS.MAD_HATTER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.CHESHIRE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.ALICE, tokenType: EARS },
            { level: 4, name: CHARACTERS.CATERPILLAR, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.WHITE_RABBIT_HOUSE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.AIW,
        enchantment_group: GROUPS.AIW,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Alice in Wonderland collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.AIW, tokenType: COMMON },
            { level: 1, name: CHARACTERS.WHITE_RABBIT, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.MARCH_HARE, tokenType: EARS },
            { level: 3, name: CHARACTERS.WHITE_RABBIT, tokenType: EARS },
            { level: 4, name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.TWEEDLE_WACKY,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.AIW,
        enchantment_group: GROUPS.AIW,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Alice in Wonderland collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.AIW, tokenType: COMMON },
            { level: 1, name: CHARACTERS.CHESHIRE, tokenType: EARS },
            { level: 2, name: CHARACTERS.CATERPILLAR, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.CATERPILLAR, tokenType: EARS },
            { level: 4, name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.MAD_TEA,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.AIW,
        enchantment_group: GROUPS.AIW,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "12h",
        tokens: [
            { level: 0, name: GROUPS.AIW, tokenType: COMMON },
            { level: 1, name: CHARACTERS.CHESHIRE, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.MARCH_HARE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.QUEEN_OF_HEARTS, tokenType: EARS }
        ]
    },
    //aiw end //alice end
    //snow white
    {
        name: BUILDINGS.SEVEN_DWARFS_MINE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.SNOW_WHITE,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Snow White collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.SNOW_WHITE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.SLEEPY, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.SNOW_WHITE_SCARY,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.SNOW_WHITE,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Snow White collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.SNOW_WHITE, tokenType: EARS },
            { level: 0, name: CHARACTERS.HAPPY, tokenType: EARS },
            { level: 0, name: CHARACTERS.CHIEF_TUI, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MAGIC_MIRROR,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.SNOW_WHITE,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Snow White collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.SNEEZY, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.DOPEY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SEVEN_DWARFS_COTTAGE,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.SNOW_WHITE,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Snow White collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.GRUMPY, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.SLEEPY, tokenType: EARS },
            { level: 0, name: CHARACTERS.BASHFUL, tokenType: EARS }
        ]
    },
    //snow white end
    //pooh
    {
        name: BUILDINGS.MANY_ADVENTURES,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.WTP,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Winnie the Pooh collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.EEYORE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.TIGGER, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.EEYORE_HOUSE,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.WTP,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Winnie the Pooh collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.EEYORE, tokenType: EARS },
            { level: 0, name: CHARACTERS.TIGGER, tokenType: EARS },
            { level: 0, name: CHARACTERS.KANGA, tokenType: EARS },
            { level: 0, name: CHARACTERS.ROO, tokenType: EARS },
            { level: 0, name: CHARACTERS.PIGLET, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.RABBIT_HOUSE,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.WTP,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Winnie the Pooh collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.ROO, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.RABBIT, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.POOH_HUNNY_HUNT,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.WTP,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Winnie the Pooh collection",
        time: "2h",
        tokens: [
            { level: 0, name: GROUPS.WTP, tokenType: COMMON },
            { level: 0, name: CHARACTERS.CHRISTOPHER_ROBIN, tokenType: EARS }
        ]
    },
    //pooh end
    //lilo and stitch //l&s
    {
        name: BUILDINGS.STITCH_GREAT_ESCAPE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.LS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Lilo & Stitch collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.LILO, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.ANGEL, tokenType: EARS },
            { level: 0, name: CHARACTERS.PLEAKLEY, tokenType: EARS },
            { level: 0, name: CHARACTERS.JUMBA, tokenType: EARS },
            { level: 0, name: CHARACTERS.COBRA_BUBBLES, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.LILO_HOUSE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.LS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Lilo & Stitch collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.NANI, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.ANGEL, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.SINA, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.LAHUI_BEACH,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.LS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Lilo & Stitch collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.PLEAKLEY, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.JUMBA, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.OHANA,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.LS,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Lilo & Stitch collection",
        time: "2h",
        tokens: [{ level: 0, name: GROUPS.LS, tokenType: COMMON }]
    },
    //lilo and stitch end //l&s end
    //bh6
    {
        name: BUILDINGS.ITO_ROBOT_LAB,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.BH6,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Big Hero 6 collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.BH6, tokenType: COMMON },
            { level: 0, name: CHARACTERS.BAYMAX, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.BAYMAX, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.FRED_GROUNDS,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.BH6,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Big Hero 6 collection",
        time: "12h",
        tokens: [{ level: 0, name: CHARACTERS.YOKAI, tokenType: TOKEN }]
    },
    {
        name: BUILDINGS.SAN_FRAN,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.BH6,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Big Hero 6 collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.YOKAI, tokenType: EARS },
            { level: 0, name: CHARACTERS.FRED, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.WASABI, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.GOGO, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.LUCKY_CAT,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.BH6,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Big Hero 6 collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.WASABI, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.HONEY_LEMON, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.HONEY_LEMON, tokenType: EARS }
        ]
    },
    //bh6 end
    //tlm
    {
        name: BUILDINGS.ARIEL_GROTTO,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.TLM,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "The Little Mermaid collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.SEBASTIAN, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.SCUTTLE, tokenType: EARS },
            { level: 0, name: CHARACTERS.ARIEL, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.ATLANTICA,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.TLM,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "The Little Mermaid collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.ERIC, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.TRITON, tokenType: EARS },
            { level: 0, name: CHARACTERS.FLOUNDER, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.URSULA, tokenType: EARS },
            { level: 0, name: CHARACTERS.NAVEEN, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.UNDER_SEA,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.TLM,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "The Little Mermaid collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.ERIC, tokenType: EARS },
            { level: 0, name: CHARACTERS.SCUTTLE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.TRITON, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.FLOUNDER, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.ARIEL, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.URSULA_LAIR,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        group: GROUPS.TLM,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "The Little Mermaid collection",
        time: "2h",
        tokens: [
            { level: 0, name: GROUPS.TLM, tokenType: COMMON },
            { level: 0, name: CHARACTERS.URSULA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.URSULA, tokenType: EARS }
        ]
    },
    //tlm end
    //wir //wreck it
    {
        name: BUILDINGS.NICELAND,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.WIR,
        enchantment_group: GROUPS.WIR,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Wreck-It Ralph collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.WIR, tokenType: COMMON },
            { level: 1, name: CHARACTERS.RALPH, tokenType: EARS },
            { level: 2, name: CHARACTERS.CALHOUN, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.FELIX, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.CALHOUN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.INTERNET,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.WIR,
        enchantment_group: GROUPS.WIR,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Wreck-It Ralph collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.WIR, tokenType: COMMON },
            { level: 1, name: CHARACTERS.RALPH, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.SPAMLEY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.SPAMLEY, tokenType: EARS },
            { level: 4, name: CHARACTERS.FELIX, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BUZZZTUBE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.WIR,
        enchantment_group: GROUPS.WIR,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Wreck-It Ralph collection",
        time: "12h",
        tokens: [
            { level: 0, name: GROUPS.WIR, tokenType: COMMON },
            { level: 1, name: CHARACTERS.YESSS, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.YESSS, tokenType: EARS },
            { level: 3, name: CHARACTERS.VANELLOPE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.VANELLOPE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SLAUGHTER_RACE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.WIR,
        enchantment_group: GROUPS.WIR,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Wreck-It Ralph collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.WIR, tokenType: COMMON },
            { level: 1, name: CHARACTERS.SHANK, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.SHANK, tokenType: EARS },
            { level: 3, name: CHARACTERS.YESSS, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.YESSS, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PRINCESS_DRESSING_ROOM,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.WIR,
        enchantment_group: GROUPS.WIR,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Wreck-It Ralph collection",
        time: "8h",
        tokens: [
            { level: 0, name: "Purple", tokenType: FABRIC },
            { level: 1, name: "Glitched Fabric", tokenType: SPECIAL },
            { level: 2, name: "Green Dot", tokenType: FABRIC },
            { level: 3, name: CHARACTERS.CINDERELLA, tokenType: TOKEN },
            { level: 4, name: "Orange Pattern", tokenType: FABRIC }
        ]
    },
    //wir end //wreck it end
    //patf
    {
        name: BUILDINGS.TIANA_PALACE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.PATF,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Princess and the Frog collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.NAVEEN, tokenType: EARS },
            { level: 0, name: CHARACTERS.MAMA_ODIE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.MAMA_ODIE, tokenType: EARS },
            { level: 0, name: CHARACTERS.TIANA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.FACILIER, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.VOODOO,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.PATF,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Princess and the Frog collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.PATF, tokenType: COMMON },
            { level: 0, name: CHARACTERS.EUDORA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.MAMA_ODIE, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.TIANA, tokenType: EARS },
            { level: 0, name: CHARACTERS.LOTTIE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BAYOU,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.PATF,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Princess and the Frog collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.PATF, tokenType: COMMON },
            { level: 0, name: CHARACTERS.LOUIS, tokenType: EARS },
            { level: 0, name: CHARACTERS.NAVEEN, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.TIANA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.ODIE_TREE,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        group: GROUPS.PATF,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Princess and the Frog collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.EUDORA, tokenType: EARS },
            { level: 0, name: CHARACTERS.LOUIS, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.LOTTIE, tokenType: TOKEN }
        ]
    },
    //patf end
    //moana
    {
        name: BUILDINGS.HOMECOMING,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.MOANA,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Moana collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.GRAMMA_TALA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.CHIEF_TUI, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.MOANA_BOAT,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.MOANA,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Moana collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.SINA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.GRAMMA_TALA, tokenType: EARS },
            { level: 0, name: CHARACTERS.PUA, tokenType: EARS },
            { level: 0, name: CHARACTERS.MOANA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.HEI_HEI, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.KAKAMORA_BOAT,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.MOANA,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Moana collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.MOANA, tokenType: COMMON },
            { level: 0, name: CHARACTERS.CHIEF_TUI, tokenType: EARS },
            { level: 0, name: CHARACTERS.MAUI, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.MOANA, tokenType: EARS },
            { level: 0, name: CHARACTERS.HEI_HEI, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.TAMATOA_LAIR,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.MOANA,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Moana collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.CHIEF_TUI, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.PUA, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.PUA, tokenType: EARS },
            { level: 0, name: CHARACTERS.MAUI, tokenType: EARS },
            { level: 0, name: CHARACTERS.MOANA, tokenType: TOKEN }
        ]
    },
    //moana end
    //fn //finding nemo
    {
        name: BUILDINGS.NEMO_SEAS,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.FN,
        enchantment_group: GROUPS.FN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Finding Nemo collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.FN, tokenType: COMMON },
            { level: 1, name: CHARACTERS.NEMO, tokenType: EARS },
            { level: 2, name: CHARACTERS.CRUSH, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.SQUIRT, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.MARLIN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.CRUSH_COASTER,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.FN,
        enchantment_group: GROUPS.FN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Finding Nemo collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.BRUCE, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.HANK, tokenType: EARS },
            { level: 2, name: CHARACTERS.BRUCE, tokenType: EARS },
            { level: 3, name: CHARACTERS.SQUIRT, tokenType: EARS },
            { level: 4, name: CHARACTERS.DORY, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.NEMO_SUBMARINE,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        group: GROUPS.FN,
        enchantment_group: GROUPS.FN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        unlock_info: "Finding Nemo collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.NEMO, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.HANK, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.CRUSH, tokenType: EARS },
            { level: 3, name: CHARACTERS.MARLIN, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.DORY, tokenType: EARS }
        ]
    },
    //fn end //finding nemo end
    //coco
    {
        name: BUILDINGS.LAND_OF_DEAD,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.COCO,
        enchantment_group: GROUPS.COCO,
        theme: null,
        unlock_info: "Coco collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.MIGUEL, tokenType: EARS },
            { level: 1, name: CHARACTERS.MAMA_COCO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.ERNESTO, tokenType: EARS },
            { level: 3, name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ABUELITA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SANTA_CECILIA_MARKET_SHOP,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.COCO,
        enchantment_group: GROUPS.COCO,
        theme: null,
        unlock_info: "Coco collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.COCO, tokenType: COMMON },
            { level: 1, name: CHARACTERS.MIGUEL, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.DANTE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.ERNESTO, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.MAMA_IMELDA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.RIVERA_FAMILIA_HOME,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.COCO,
        enchantment_group: GROUPS.COCO,
        theme: null,
        unlock_info: "Coco collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.MIGUEL, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.MAMA_IMELDA, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.DANTE, tokenType: EARS },
            { level: 3, name: CHARACTERS.ABUELITA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.HECTOR, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MUSICAL_CELEBRATION,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.COCO,
        enchantment_group: GROUPS.COCO,
        theme: null,
        unlock_info: "Coco collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.ERNESTO, tokenType: EARS },
            { level: 1, name: CHARACTERS.MAMA_COCO, tokenType: EARS },
            { level: 2, name: CHARACTERS.HECTOR, tokenType: EARS },
            { level: 3, name: CHARACTERS.ABUELITA, tokenType: EARS },
            { level: 4, name: CHARACTERS.HECTOR, tokenType: TOKEN }
        ]
    },
    //coco end
    //star wars
    {
        name: BUILDINGS.CANTINA,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.STAR_WARS, tokenType: COMMON },
            { level: 1, name: CHARACTERS.FINN, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.POE, tokenType: EARS },
            { level: 3, name: CHARACTERS.KYLO_REN, tokenType: EARS },
            {
                level: 4,
                name: CHARACTERS.FIRST_ORDER_STORMTROOPER,
                tokenType: EARS
            }
        ]
    },
    {
        name: BUILDINGS.TREADSPEEDER_BASE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.POE, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.GENERAL_HUX, tokenType: EARS },
            { level: 2, name: CHARACTERS.BB8, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.REY, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.KYLO_REN, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.RESISTANCE_SPEEDERS,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.FINN, tokenType: EARS },
            { level: 1, name: CHARACTERS.REY, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.GENERAL_HUX, tokenType: EARS },
            {
                level: 3,
                name: CHARACTERS.FIRST_ORDER_STORMTROOPER,
                tokenType: TOKEN
            },
            { level: 4, name: CHARACTERS.REY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.RESISTANCE_X_WING,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.GENERAL_HUX, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.GENERAL_HUX, tokenType: EARS },
            { level: 2, name: CHARACTERS.BB8, tokenType: EARS },
            { level: 3, name: CHARACTERS.REY, tokenType: EARS },
            { level: 4, name: CHARACTERS.KYLO_REN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.RAZOR_CREST,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.THE_MANDALORIAN, tokenType: EARS },
            { level: 1, name: CHARACTERS.KUIIL, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.CARA_DUNE, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.CARA_DUNE, tokenType: EARS },
            { level: 4, name: CHARACTERS.THE_CHILD, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.NEVARRO_CITY,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.GREEF_KARGA, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.C3PO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.THE_MANDALORIAN, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.GREEF_KARGA, tokenType: EARS },
            { level: 4, name: CHARACTERS.THE_CHILD, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.SANDCRAWLER,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "12h",
        tokens: [
            { level: 0, name: GROUPS.STAR_WARS, tokenType: COMMON },
            { level: 1, name: CHARACTERS.THE_MANDALORIAN, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.GREEF_KARGA, tokenType: EARS },
            { level: 3, name: CHARACTERS.R2D2, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.KUIIL, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MILLENIUM_FALCON,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.LUKE_SKYWALKER, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS },
            { level: 2, name: CHARACTERS.LEIA_ORGANA, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.LEIA_ORGANA, tokenType: EARS },
            { level: 4, name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.YAVIN4,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.STAR_WARS, tokenType: COMMON },
            { level: 1, name: CHARACTERS.LUKE_SKYWALKER, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.LUKE_SKYWALKER, tokenType: EARS },
            { level: 3, name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.LEIA_ORGANA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.LUKE_HOME,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.STAR_WARS, tokenType: COMMON },
            { level: 1, name: CHARACTERS.LEIA_ORGANA, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.CHEWBACCA, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.CHEWBACCA, tokenType: EARS },
            { level: 4, name: CHARACTERS.HAN_SOLO, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.GARBAGE_COMPACTOR,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.STAR_WARS, tokenType: COMMON },
            { level: 1, name: CHARACTERS.HAN_SOLO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.HAN_SOLO, tokenType: EARS },
            { level: 3, name: CHARACTERS.DARTH_VADER, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.DARTH_VADER, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MARAUDER_SHUTTLE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.TIE_FIGHTER_PILOT, tokenType: EARS },
            { level: 2, name: CHARACTERS.CHEWBACCA, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.CHEWBACCA, tokenType: EARS },
            { level: 4, name: CHARACTERS.DARTH_VADER, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.CLOUD_CITY,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.STAR_WARS, tokenType: COMMON },
            { level: 1, name: CHARACTERS.LANDO_CALRISSIAN, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.BOBA_FETT, tokenType: TOKEN },
            {
                level: 3,
                name: CHARACTERS.IMPERIAL_STORMTROOPER,
                tokenType: EARS
            },
            { level: 4, name: CHARACTERS.YODA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.DAGOBAH,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.STAR_WARS,
        enchantment_group: GROUPS.STAR_WARS,
        theme: "Star Wars Land",
        unlock_info: "Star Wars collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.STAR_WARS, tokenType: COMMON },
            { level: 1, name: CHARACTERS.LANDO_CALRISSIAN, tokenType: EARS },
            {
                level: 2,
                name: CHARACTERS.IMPERIAL_STORMTROOPER,
                tokenType: TOKEN
            },
            { level: 3, name: CHARACTERS.BOBA_FETT, tokenType: EARS },
            { level: 4, name: CHARACTERS.YODA, tokenType: TOKEN }
        ]
    },
    //star wars end
    //onward
    {
        name: BUILDINGS.GUINEVERE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.ONWARD,
        enchantment_group: GROUPS.ONWARD,
        theme: null,
        unlock_info: "Onward collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.ONWARD, tokenType: COMMON },
            { level: 1, name: CHARACTERS.COLT, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.BARLEY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.BLAZEY, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.LAUREL, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.LIGHTFOOT_HOUSE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.ONWARD,
        enchantment_group: GROUPS.ONWARD,
        theme: null,
        unlock_info: "Onward collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.BARLEY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.DAD, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.COLT, tokenType: EARS },
            { level: 3, name: CHARACTERS.LAUREL, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.MANTICORE, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.PATH_OF_RAVENS,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.ONWARD,
        enchantment_group: GROUPS.ONWARD,
        theme: null,
        unlock_info: "Onward collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.BARLEY, tokenType: EARS },
            { level: 1, name: CHARACTERS.MANTICORE, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.DAD, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.BLAZEY, tokenType: EARS },
            { level: 4, name: CHARACTERS.IAN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.MANTICORE_TAVERN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.ONWARD,
        enchantment_group: GROUPS.ONWARD,
        theme: null,
        unlock_info: "Onward collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.LAUREL, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.LAUREL, tokenType: EARS },
            { level: 2, name: CHARACTERS.MANTICORE, tokenType: EARS },
            { level: 3, name: CHARACTERS.DAD, tokenType: EARS },
            { level: 4, name: CHARACTERS.IAN, tokenType: TOKEN }
        ]
    },
    //onward end
    //hercules
    {
        name: BUILDINGS.TRAINING_GROUNDS,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.HERCULES,
        enchantment_group: GROUPS.HERCULES,
        theme: null,
        unlock_info: "Hercules collection",
        time: "12h",
        tokens: [
            { level: 0, name: GROUPS.HERCULES, tokenType: COMMON },
            { level: 1, name: CHARACTERS.PHIL, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.MEG, tokenType: EARS },
            { level: 3, name: CHARACTERS.PEGASUS, tokenType: EARS },
            { level: 4, name: CHARACTERS.HADES, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.STATUE_GARDEN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.HERCULES,
        enchantment_group: GROUPS.HERCULES,
        theme: null,
        unlock_info: "Hercules collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.MEG, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.PEGASUS, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.HERCULES, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.PANIC, tokenType: EARS },
            { level: 4, name: CHARACTERS.PAIN, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.ZEUS_TEMPLE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.HERCULES,
        enchantment_group: GROUPS.HERCULES,
        theme: null,
        unlock_info: "Hercules collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.PHIL, tokenType: EARS },
            { level: 1, name: CHARACTERS.PAIN, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.PANIC, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.HADES, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.HERCULES, tokenType: EARS }
        ]
    },
    //hercules end
    //brave
    {
        name: BUILDINGS.WITCH_COTTAGE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.BRAVE,
        enchantment_group: GROUPS.BRAVE,
        theme: null,
        unlock_info: "Brave collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.QUEEN_ELINOR, tokenType: EARS },
            { level: 1, name: CHARACTERS.QUEEN_ELINOR, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.LORD_DINGWALL, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.LORD_DINGWALL, tokenType: EARS },
            { level: 4, name: CHARACTERS.KING_FERGUS, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.CASTLE_DUNBROCH,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.BRAVE,
        enchantment_group: GROUPS.BRAVE,
        theme: null,
        unlock_info: "Brave collection",
        time: "6h",
        tokens: [
            { level: 0, name: GROUPS.BRAVE, tokenType: COMMON },
            { level: 1, name: CHARACTERS.LORD_MACGUFFIN, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.LORD_DINGWALL, tokenType: EARS },
            { level: 3, name: CHARACTERS.KING_FERGUS, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.KING_FERGUS, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.RUINS_ANCIENT_KINGDOM,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.BRAVE,
        enchantment_group: GROUPS.BRAVE,
        theme: null,
        unlock_info: "Brave collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.LORD_DINGWALL, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.QUEEN_ELINOR, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.LORD_MACGUFFIN, tokenType: EARS },
            { level: 3, name: CHARACTERS.LORD_MACINTOSH, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.LORD_MACINTOSH, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.RING_OF_STONES,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.BRAVE,
        enchantment_group: GROUPS.BRAVE,
        theme: null,
        unlock_info: "Brave collection",
        time: "4h",
        tokens: [
            { level: 0, name: GROUPS.BRAVE, tokenType: COMMON },
            { level: 1, name: CHARACTERS.MERIDA, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.MERIDA, tokenType: EARS },
            { level: 3, name: CHARACTERS.KING_FERGUS, tokenType: EARS },
            { level: 4, name: CHARACTERS.LORD_MACINTOSH, tokenType: EARS }
        ]
    },
    //brave end
    //raya
    {
        name: BUILDINGS.BOUN_SHRIMP_BOAT,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.RAYA,
        enchantment_group: GROUPS.RAYA,
        theme: null,
        unlock_info: "Raya and the Last Dragon collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.RAYA, tokenType: COMMON },
            { level: 1, name: CHARACTERS.NAMAARI, tokenType: EARS },
            { level: 2, name: CHARACTERS.TUK_TUK, tokenType: EARS },
            { level: 3, name: CHARACTERS.SISU, tokenType: EARS },
            { level: 4, name: CHARACTERS.RAYA, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.HEART_PALACE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.RAYA,
        enchantment_group: GROUPS.RAYA,
        theme: null,
        unlock_info: "Raya and the Last Dragon collection",
        time: "8h",
        tokens: [
            { level: 0, name: GROUPS.RAYA, tokenType: COMMON },
            { level: 1, name: CHARACTERS.NAMAARI, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.TUK_TUK, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.TUK_TUK, tokenType: EARS },
            { level: 4, name: CHARACTERS.RAYA, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.FANG_PALACE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.RAYA,
        enchantment_group: GROUPS.RAYA,
        theme: null,
        unlock_info: "Raya and the Last Dragon collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.BOUN, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.BOUN, tokenType: EARS },
            { level: 2, name: CHARACTERS.SISU, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.SISU, tokenType: EARS },
            { level: 4, name: CHARACTERS.RAYA, tokenType: EARS }
        ]
    },
    //raya end
    //luca
    {
        name: BUILDINGS.ALBERTO_HIDEOUT,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.LUCA,
        enchantment_group: GROUPS.LUCA,
        theme: null,
        unlock_info: "Luca collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.MACHIAVELLI, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.ALBERTO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.LUCA, tokenType: EARS },
            { level: 3, name: CHARACTERS.GIULIA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ERCOLE, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.PORTOROSSO_TOWER,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.LUCA,
        enchantment_group: GROUPS.LUCA,
        theme: null,
        unlock_info: "Luca collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.LUCA, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.MACHIAVELLI, tokenType: EARS },
            { level: 2, name: CHARACTERS.ALBERTO, tokenType: EARS },
            { level: 3, name: CHARACTERS.GIULIA, tokenType: EARS },
            { level: 4, name: CHARACTERS.ERCOLE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.JUNGLE_CRUISE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        enchantment_group: GROUPS.DISNEY_PARKS,
        theme: null,
        unlock_info: "Luca collection",
        time: "8h",
        tokens: []
    },
    //luca end
    //101 dalmatians  //dalmatians
    {
        name: BUILDINGS.RADCLIFFE_RESIDENCE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        trophies: true,
        group: GROUPS.DALMATIANS,
        enchantment_group: GROUPS.DALMATIANS,
        theme: null,
        unlock_info: "101 Dalmatians collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.PONGO, tokenType: EARS },
            { level: 1, name: CHARACTERS.PENNY, tokenType: EARS },
            { level: 2, name: CHARACTERS.PATCH, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.LUCKY, tokenType: EARS },
            { level: 4, name: CHARACTERS.PERDITA, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.THE_PARK,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        trophies: true,
        group: GROUPS.DALMATIANS,
        enchantment_group: GROUPS.DALMATIANS,
        theme: null,
        unlock_info: "101 Dalmatians collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.LUCKY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.PONGO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.PENNY, tokenType: EARS },
            { level: 3, name: CHARACTERS.PATCH, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ROLLY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.THE_DE_VIL_PLACE,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        trophies: true,
        group: GROUPS.DALMATIANS,
        enchantment_group: GROUPS.DALMATIANS,
        theme: null,
        unlock_info: "101 Dalmatians collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.PENNY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.LUCKY, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.LUCKY, tokenType: EARS },
            { level: 3, name: CHARACTERS.PERDITA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ROLLY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.CRUELLA_CAR,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        trophies: true,
        group: GROUPS.DALMATIANS,
        enchantment_group: GROUPS.DALMATIANS,
        theme: null,
        unlock_info: "101 Dalmatians collection",
        time: "2h",
        tokens: [
            { level: 0, name: CHARACTERS.ROLLY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.PATCH, tokenType: EARS },
            { level: 2, name: CHARACTERS.PERDITA, tokenType: EARS },
            { level: 3, name: CHARACTERS.CRUELLA, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.CRUELLA, tokenType: EARS }
        ]
    },
    //101 dalmatians end //dalmatians end
    //pinocchio
    {
        name: BUILDINGS.GEPPETTO_WORKSHOP,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.PINOCCHIO,
        enchantment_group: GROUPS.PINOCCHIO,
        theme: null,
        unlock_info: "Pinocchio collection",
        time: "6h",
        tokens: [
            { level: 0, name: CHARACTERS.JIMINY_CRICKET, tokenType: EARS },
            { level: 1, name: CHARACTERS.FIGARO, tokenType: EARS },
            { level: 2, name: CHARACTERS.HONEST_JOHN, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.GEPPETTO, tokenType: EARS },
            { level: 4, name: CHARACTERS.STROMBOLI, tokenType: TOKEN }
        ]
    },
    {
        name: BUILDINGS.STROMBOLI_CARAVAN,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.PINOCCHIO,
        enchantment_group: GROUPS.PINOCCHIO,
        theme: null,
        unlock_info: "Pinocchio collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.FIGARO, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.GEPPETTO, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.GEPPETTO, tokenType: EARS },
            { level: 3, name: CHARACTERS.STROMBOLI, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.BLUE_FAIRY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PINOCCHIO_DARING_JOURNEY,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.PINOCCHIO,
        enchantment_group: GROUPS.PINOCCHIO,
        theme: null,
        unlock_info: "Pinocchio collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.BLUE_FAIRY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.HONEST_JOHN, tokenType: EARS },
            { level: 2, name: CHARACTERS.STROMBOLI, tokenType: EARS },
            { level: 3, name: CHARACTERS.PINOCCHIO, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.PINOCCHIO, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PINOCCHIO_VILLAGE_HAUS,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.PINOCCHIO,
        enchantment_group: GROUPS.PINOCCHIO,
        theme: null,
        unlock_info: "Pinocchio collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.GEPPETTO, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.JIMINY_CRICKET, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.FIGARO, tokenType: EARS },
            { level: 3, name: CHARACTERS.HONEST_JOHN, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.BLUE_FAIRY, tokenType: EARS }
        ]
    },
    //pinocchio end
    //robinhood //rh
    {
        name: BUILDINGS.SHERWOOD_FOREST,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.ROBINHOOD,
        enchantment_group: GROUPS.ROBINHOOD,
        theme: null,
        unlock_info: "Robin Hood collection",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.LITTLE_JOHN, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.MAID_MARIAN, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.SIR_HISS, tokenType: EARS },
            { level: 3, name: CHARACTERS.PRINCE_JOHN, tokenType: EARS },
            { level: 4, name: CHARACTERS.ROBIN_HOOD, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.NOTTINGHAM,
        unlock_type: BUILDING_CATEGORIES.EVENT,
        group: GROUPS.ROBINHOOD,
        enchantment_group: GROUPS.ROBINHOOD,
        theme: null,
        unlock_info: "Robin Hood collection",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.LITTLE_JOHN, tokenType: EARS },
            { level: 1, name: CHARACTERS.MAID_MARIAN, tokenType: EARS },
            { level: 2, name: CHARACTERS.SIR_HISS, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.PRINCE_JOHN, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.ROBIN_HOOD, tokenType: TOKEN }
        ]
    },
    //robinhood end //rh end
    //misc
    {
        name: BUILDINGS.THE_HAUNTED_MANSION,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        group: GROUPS.HM,
        enchantment_group: GROUPS.HM,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "150 gems",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.EZRA, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.PHINEAS, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.GUS, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.HATBOX_GHOST, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.BRIDE, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.HAUNTED_MANSION,
        theme: null,
        group: GROUPS.HM,
        enchantment_group: GROUPS.HM,
        unlock_type: "chest",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.EZRA, tokenType: EARS },
            { level: 1, name: CHARACTERS.BRIDE, tokenType: TOKEN },
            { level: 2, name: CHARACTERS.PHINEAS, tokenType: EARS },
            { level: 3, name: CHARACTERS.GUS, tokenType: EARS },
            { level: 4, name: CHARACTERS.HATBOX_GHOST, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.ENCHANTED_TIKI_ROOM,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.PREMIUM,
        unlock_info: "125 gems",
        time: "6h",
        tokens: [{ level: 0, name: GROUPS.JB, tokenType: COMMON }]
    },
    {
        name: BUILDINGS.JET_PACKS,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "8h",
        tokens: [{ level: 0, name: CHARACTERS.MIKE, tokenType: EARS }]
    },
    {
        name: BUILDINGS.SPLASH_MOUNTAIN,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "6h",
        tokens: [{ level: 0, name: CHARACTERS.SCAR, tokenType: EARS }]
    },
    {
        name: BUILDINGS.FANTASIA,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "2h",
        tokens: []
    },
    {
        name: BUILDINGS.WESTERN_ARCADE,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.CHEST,
        unlock_info: "Chest",
        time: "8h",
        tokens: []
    },
    {
        name: BUILDINGS.JUMPIN_JELLYFISH,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "15k elixir",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.SCAR, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.MICHAEL, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.PRIMEVAL_WHIRL,
        theme: BUILDING_CATEGORIES.ADVENTURELAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "30k elixir",
        time: "4h",
        tokens: []
    },
    {
        name: BUILDINGS.GOLDEN_ZEPHYR,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "15k elixir",
        time: "24h",
        tokens: [{ level: 0, name: CHARACTERS.BAGHEERA, tokenType: TOKEN }]
    },
    {
        name: BUILDINGS.WALT_CAROUSEL,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        enchantment_group: GROUPS.DISNEY_PARKS,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "30k elixir",
        time: "8h",
        tokens: [
            { level: 0, name: CHARACTERS.HUEY, tokenType: TOKEN },
            { level: 1, name: CHARACTERS.HUEY, tokenType: EARS },
            { level: 2, name: CHARACTERS.DEWEY, tokenType: TOKEN },
            { level: 3, name: CHARACTERS.LOUIE, tokenType: TOKEN },
            { level: 4, name: CHARACTERS.DUMBO, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.BARNSTORMER,
        theme: BUILDING_CATEGORIES.TOONTOWN,
        enchantment_group: GROUPS.DISNEY_PARKS,
        unlock_type: BUILDING_CATEGORIES.LEADERBOARD,
        unlock_info: "Honey Bees Mini Event",
        time: "4h",
        tokens: [
            { level: 0, name: CHARACTERS.GOOFY, tokenType: TOKEN },
            { level: 0, name: CHARACTERS.GOOFY, tokenType: EARS }
        ]
    },
    {
        name: BUILDINGS.SPACESHIP_EARTH,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        enchantment_group: GROUPS.DISNEY_PARKS,
        unlock_type: null,
        unlock_info: null,
        time: "6h",
        tokens: []
    },
    {
        name: BUILDINGS.ANIMATION_ACADEMY,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        enchantment_group: null,
        unlock_type: BUILDING_CATEGORIES.MERLIN,
        unlock_info: "30000 elixir",
        time: "4h",
        tokens: []
    },
    //misc end
    //landmarks
    {
        name: "California Screamin'",
        unlock_type: "storyline",
        theme: "Toontown",
        landmark: true,
        time: "4h",
        tokens: []
    },
    {
        name: BUILDINGS.SPACE_MOUNTAIN,
        theme: BUILDING_CATEGORIES.TOMORROWLAND,
        time: "12h",
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        enchantment_group: null,
        landmark: true,
        tokens: []
    },
    {
        name: BUILDINGS.THUNDER_MOUNTAIN,
        theme: BUILDING_CATEGORIES.FRONTIERLAND,
        time: "2h",
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        enchantment_group: null,
        landmark: true,
        tokens: []
    },
    {
        name: BUILDINGS.SMALL_WORLD,
        theme: BUILDING_CATEGORIES.FANTASYLAND,
        time: "16h",
        unlock_type: BUILDING_CATEGORIES.STORYLINE,
        enchantment_group: null,
        landmark: true,
        tokens: []
    }
    // ,{
    //     name: BUILDINGS.   ,
    //     theme: BUILDING_CATEGORIES.   ,
    //     enchantment_group: GROUPS.   ,
    //     unlock_type: BUILDING_CATEGORIES.   ,
    //     time: "",
    //     tokens: [
    //         { level: 0, name: CHARACTERS.MICKE tokenType: TOKEN },
    //         { level: 1, name: CHARACTERS.MICKE tokenType: TOKEN },
    //         { level: 2, name: CHARACTERS.MICKE tokenType: TOKEN },
    //         { level: 3, name: CHARACTERS.MICKE tokenType: TOKEN },
    //         { level: 4, name: CHARACTERS.MICKE tokenType: TOKEN }
    //     ]
    // }
];

//

// let buildings = [];
// for (let building in buildingList) {
//     const buildingInfo = buildingList[building];

//     buildings.push({
//         name: buildingInfo.name,
//         type: buildingInfo.type,
//         theme: buildingInfo.theme,
//         enchantment_group: buildingInfo.enchantment_group || null,
//         time: buildingInfo.time,
//         unlock_info: buildingInfo.unlock || null,
//         unlock_info: buildingInfo.trophies || false,
//         tokens: { ...buildingInfo.tokens }
//     });
// }

let count = 0;
const buildings = buildingList.map(
    ({
        name,
        time,
        trophies,
        unlock_type,
        unlock_info,
        theme,
        group,
        enchantment_group
    }) => {
        count++;
        return {
            name,
            key: name,
            time,
            trophies: trophies || false,
            unlock_type: unlock_type || null,
            unlock_info: unlock_info || null,
            theme,
            group: group || null,
            enchantment_group: enchantment_group || null,
            order: count
        };
    }
);

let buildingCharacterTokens = [];
let buildingGroupTokens = [];
let buildingFabricTokens = [];
let buildingSpecialTokens = [];

// for (let task of taskList) {
//     for (let i in task.tokens) {
//         const { name, type, tokenType } = task.tokens[i];
//         // NOTE: might get rid of type later since for now
//         // only characters use TOKEN and EARS tokenTypes
//         if (type === "character" || tokenType === TOKEN || tokenType === EARS) {
//             task_character_tokens.push({
//                 task_key: getTaskKey(task.name, task.characters),
//                 token_key: `${name}-${tokenType}`
//             });
//         }
//         // else if(tokenType === COMMON) {
//         // group_task_tokens.push()
//         // }
//     }
// }

for (let building of buildingList) {
    const { name, tokens } = building;
    for (let i in tokens) {
        const { level, type, tokenType, remove } = tokens[i];
        if (type === "character" || tokenType === TOKEN || tokenType === EARS) {
            buildingCharacterTokens.push({
                level,
                building_name: name,
                key: name,
                token_key: `${tokens[i].name}-${tokenType}`,
                remove
            });
        } else if (tokenType === COMMON) {
            buildingGroupTokens.push({
                level,
                building_name: name,
                key: name,
                name: tokens[i].name,
                remove
            });
        } else if (tokenType === FABRIC) {
            buildingFabricTokens.push({
                level,
                building_name: name,
                key: name,
                name: tokens[i].name,
                remove
            });
        } else {
            buildingSpecialTokens.push({
                level,
                building_name: name,
                key: name,
                name: tokens[i].name,
                remove
            });
        }
    }
}

module.exports = {
    buildings,
    buildingCharacterTokens,
    buildingGroupTokens,
    buildingFabricTokens,
    buildingSpecialTokens
};
