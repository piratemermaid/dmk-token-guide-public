const { bookshelf } = require("./config");
const TABLES = require("../data/tables");

//character
const Character = bookshelf.model("Character", {
    tableName: TABLES.CHARACTERS,
    group() {
        return this.belongsTo("CharacterGroup");
    },
    characterTokens() {
        return this.hasMany("CharacterToken");
    },
    tasks() {
        return this.belongsToMany("Task", TABLES.CHARACTERS_TO_TASKS);
    }
});

//task
const Task = bookshelf.model("Task", {
    tableName: TABLES.TASKS,
    characters() {
        return this.belongsToMany("Character", TABLES.CHARACTERS_TO_TASKS);
    },
    characterTokens() {
        return this.belongsToMany(
            "CharacterToken",
            TABLES.TASKS_TO_CHARACTER_TOKENS
        );
    },
    groupTokens() {
        return this.hasMany(
            "CharacterGroup",
            TABLES.TASKS_TO_GROUP_TOKENS,
            "group_id"
        );
    },
    fabricTokens() {
        return this.belongsToMany("FabricToken", TABLES.TASKS_TO_FABRIC_TOKENS);
    },
    specialTokens() {
        return this.belongsToMany(
            "SpecialToken",
            TABLES.TASKS_TO_SPECIAL_TOKENS
        );
    },
    buildingReqs() {
        return this.hasMany("BuildingReq");
    },
    costumeReqs() {
        return this.belongsToMany("Costume", TABLES.TASK_COSTUME_REQUIREMENTS);
    }
});

//buildingreq //taskbuilding
const BuildingReq = bookshelf.model("BuildingReq", {
    tableName: TABLES.TASK_BUILDING_REQUIREMENTS,
    building() {
        return this.belongsTo("Building");
    }
});

//costumereq //taskcostume
const CostumeReq = bookshelf.model("CostumeReq", {
    tableName: TABLES.TASK_COSTUME_REQUIREMENTS,
    costume() {
        return this.belongsTo("Costume");
    }
});

//building
const Building = bookshelf.model("Building", {
    tableName: TABLES.BUILDINGS,
    characterTokens() {
        return this.belongsToMany(
            "CharacterToken",
            TABLES.BUILDINGS_TO_CHARACTER_TOKENS
        );
    },
    groupTokens() {
        return this.belongsToMany(
            "CharacterGroup",
            TABLES.BUILDINGS_TO_GROUP_TOKENS,
            "building_id",
            "group_id"
        );
    },
    specialTokens() {
        return this.belongsToMany(
            "SpecialToken",
            TABLES.BUILDINGS_TO_SPECIAL_TOKENS,
            "building_id",
            "special_token_id"
        );
    },
    fabricTokens() {
        return this.belongsToMany(
            "FabricToken",
            TABLES.BUILDINGS_TO_FABRIC_TOKENS,
            "building_id",
            "fabric_token_id"
        );
    },
    tasks() {
        return this.belongsToMany("Task", TABLES.TASK_BUILDING_REQUIREMENTS);
    }
});

//charactertoken
const CharacterToken = bookshelf.model("CharacterToken", {
    tableName: TABLES.CHARACTER_TOKENS,
    rarity() {
        return this.belongsTo("TokenRarity");
    },
    type() {
        return this.belongsTo("TokenType");
    },
    tasks() {
        return this.belongsToMany("Task", TABLES.TASKS_TO_CHARACTER_TOKENS);
    },
    character() {
        return this.belongsTo("Character");
    },
    buildings() {
        return this.belongsToMany(
            "Building",
            TABLES.BUILDINGS_TO_CHARACTER_TOKENS
        );
    },
    floats() {
        return this.belongsToMany(
            "CharacterGroup",
            TABLES.FLOATS_TO_CHARACTER_TOKENS,
            "character_token_id",
            "group_id"
        );
    }
});

//tokenrarity //rarity
const TokenRarity = bookshelf.model("TokenRarity", {
    tableName: TABLES.TOKEN_RARITY,
    characterTokens() {
        return this.hasMany("CharacterToken");
    }
});

//tokentype
const TokenType = bookshelf.model("TokenType", {
    tableName: TABLES.TOKEN_TYPES
});

//charactergroup //group
const CharacterGroup = bookshelf.model("CharacterGroup", {
    tableName: TABLES.CHARACTER_GROUPS,
    tasks() {
        return this.belongsToMany(
            "Task",
            TABLES.TASKS_TO_GROUP_TOKENS,
            "group_id"
        );
    },
    buildings() {
        return this.belongsToMany(
            "Building",
            TABLES.BUILDINGS_TO_GROUP_TOKENS,
            "group_id",
            "building_id"
        );
    },
    floats() {
        return this.belongsToMany(
            "CharacterGroup",
            TABLES.FLOATS_TO_GROUP_TOKENS,
            "group_token_id",
            "group_id"
        );
    }
});

//user
const User = bookshelf.model("User", {
    tableName: TABLES.USERS,
    characters() {
        return this.belongsToMany("Character", TABLES.USERS_TO_CHARACTERS);
    },
    userCharacters() {
        return this.hasMany("UserCharacter");
    },
    userBuildings() {
        return this.hasMany("UserBuilding");
    },
    buildings() {
        return this.belongsToMany("Building", TABLES.USERS_TO_BUILDINGS);
    },
    costumes() {
        return this.belongsToMany("Costume", TABLES.USERS_TO_COSTUMES);
    },
    floats() {
        return this.belongsToMany("CharacterGroup", TABLES.USERS_TO_FLOATS);
    },
    concessions() {
        return this.belongsToMany("Concession", TABLES.USERS_TO_CONCESSIONS);
    },
    userOptions() {
        return this.hasMany("UserOption");
    },
    TCPlanner() {
        return this.hasMany("TCPlanner");
    }
});

//usercharacter
const UserCharacter = bookshelf.model("UserCharacter", {
    tableName: TABLES.USERS_TO_CHARACTERS,
    character() {
        return this.belongsTo("Character");
    }
});

//userbuilding
const UserBuilding = bookshelf.model("UserBuilding", {
    tableName: TABLES.USERS_TO_BUILDINGS,
    building() {
        return this.belongsTo("Building");
    }
});

//costume
const Costume = bookshelf.model("Costume", {
    tableName: TABLES.COSTUMES,
    character() {
        return this.belongsTo("Character");
    },
    fabricTokens() {
        return this.belongsToMany(
            "FabricToken",
            TABLES.COSTUMES_TO_FABRIC_TOKENS,
            "costume_id",
            "fabric_token_id"
        );
    }
});

//fabrictoken
const FabricToken = bookshelf.model("FabricToken", {
    tableName: TABLES.FABRIC_TOKENS,
    costumes() {
        return this.belongsToMany(
            "Costume",
            TABLES.COSTUMES_TO_FABRIC_TOKENS,
            "fabric_token_id",
            "costume_id"
        );
    },
    rarity() {
        return this.belongsTo("TokenRarity");
    },
    tasks() {
        return this.belongsToMany("Task", TABLES.TASKS_TO_FABRIC_TOKENS);
    },
    buildings() {
        return this.belongsToMany(
            "Building",
            TABLES.BUILDINGS_TO_FABRIC_TOKENS
        );
    }
});

//special token
const SpecialToken = bookshelf.model("SpecialToken", {
    tableName: TABLES.SPECIAL_TOKENS,
    tasks() {
        return this.belongsToMany("Task", TABLES.TASKS_TO_SPECIAL_TOKENS);
    },
    rarity() {
        return this.belongsTo("TokenRarity");
    },
    buildings() {
        return this.belongsToMany(
            "Building",
            TABLES.BUILDINGS_TO_SPECIAL_TOKENS
        );
    },
    floats() {
        return this.belongsToMany(
            "CharacterGroup",
            TABLES.FLOATS_TO_SPECIAL_TOKENS,
            "special_token_id",
            "group_id"
        );
    }
});

//concession
const Concession = bookshelf.model("Concession", {
    tableName: TABLES.CONCESSIONS
});

//userconcession
const UserConcession = bookshelf.model("UserConcession", {
    tableName: TABLES.USERS_TO_CONCESSIONS,
    Concession() {
        return this.belongsTo("Concession");
    }
});

//user options
const UserOption = bookshelf.model("UserOption", {
    tableName: TABLES.USER_OPTIONS,
    option() {
        return this.belongsTo("Option");
    }
});

//options
const Option = bookshelf.model("Option", {
    tableName: TABLES.OPTIONS
});

//event
const Event = bookshelf.model("Event", {
    tableName: TABLES.EVENT,
    eventGroups() {
        return this.hasMany("EventGroup");
    },
    eventCharacters() {
        return this.hasMany("EventCharacter");
    },
    specialTokens() {
        return this.belongsToMany("SpecialToken", TABLES.EVENT_SPECIAL_TOKENS);
    }
});

//eventgroup
const EventGroup = bookshelf.model("EventGroup", {
    tableName: TABLES.EVENT_GROUPS,
    group() {
        return this.belongsTo("CharacterGroup");
    }
});

//eventcharacter
const EventCharacter = bookshelf.model("EventCharacter", {
    tableName: TABLES.EVENT_CHARACTERS,
    character() {
        return this.belongsTo("Character");
    }
});

//tcplanner
const TCPlanner = bookshelf.model("TCPlanner", {
    tableName: TABLES.TC_PLANNER,
    character() {
        return this.belongsTo("Character");
    }
});

//taskcharactertoken
const TaskCharacterToken = bookshelf.model("TaskCharacterToken", {
    tableName: TABLES.TASKS_TO_CHARACTER_TOKENS,
    task() {
        return this.belongsTo("Task");
    },
    characterToken() {
        return this.belongsTo("CharacterToken");
    }
});
//taskgrouptoken
const TaskGroupToken = bookshelf.model("TaskGroupToken", {
    tableName: TABLES.TASKS_TO_GROUP_TOKENS,
    task() {
        return this.belongsTo("Task");
    },
    groupToken() {
        return this.belongsTo("GroupToken");
    }
});
//taskfabrictoken
const TaskFabricToken = bookshelf.model("TaskFabricToken", {
    tableName: TABLES.TASKS_TO_FABRIC_TOKENS,
    task() {
        return this.belongsTo("Task");
    },
    fabricToken() {
        return this.belongsTo("fabricToken");
    }
});
//taskspecialtoken
const TaskSpecialToken = bookshelf.model("TaskSpecialToken", {
    tableName: TABLES.TASKS_TO_SPECIAL_TOKENS,
    task() {
        return this.belongsTo("Task");
    },
    specialToken() {
        return this.belongsTo("SpecialToken");
    }
});

//taskcharacter
const TaskCharacter = bookshelf.model("TaskCharacter", {
    tableName: TABLES.CHARACTERS_TO_TASKS
});

//buildingcharactertoken
const BuildingCharacterToken = bookshelf.model("BuildingCharacterToken", {
    tableName: TABLES.BUILDINGS_TO_CHARACTER_TOKENS,
    building() {
        return this.belongsTo("Building");
    },
    characterToken() {
        return this.belongsTo("CharacterToken");
    }
});
//buildinggrouptoken
const BuildingGroupToken = bookshelf.model("BuildingGroupToken", {
    tableName: TABLES.BUILDINGS_TO_GROUP_TOKENS,
    building() {
        return this.belongsTo("Building");
    },
    groupToken() {
        return this.belongsTo("CharacterGroup");
    }
});
//buildingfabrictoken
const BuildingFabricToken = bookshelf.model("BuildingFabricToken", {
    tableName: TABLES.BUILDINGS_TO_FABRIC_TOKENS,
    building() {
        return this.belongsTo("Building");
    },
    fabricToken() {
        return this.belongsTo("FabricToken");
    }
});
//buildingspecialtoken
const BuildingSpecialToken = bookshelf.model("BuildingSpecialToken", {
    tableName: TABLES.BUILDINGS_TO_SPECIAL_TOKENS,
    building() {
        return this.belongsTo("Building");
    },
    specialToken() {
        return this.belongsTo("SpecialToken");
    }
});

//floatcharactertoken
const FloatCharacterToken = bookshelf.model("FloatCharacterToken", {
    tableName: TABLES.FLOATS_TO_CHARACTER_TOKENS,
    group() {
        return this.belongsTo("CharacterGroup");
    },
    characterToken() {
        return this.belongsTo("CharacterToken");
    }
});
//floatgrouptoken
const FloatGroupToken = bookshelf.model("FloatGroupToken", {
    tableName: TABLES.FLOATS_TO_GROUP_TOKENS,
    group() {
        return this.belongsTo("CharacterGroup", "group_id");
    },
    token_group() {
        return this.belongsTo("CharacterGroup", "group_token_id");
    }
});

//storyline //event storyline
const EventStoryline = bookshelf.model("EventStoryline", {
    tableName: TABLES.EVENT_STORYLINE,
    characters() {
        return this.belongsToMany(
            "Character",
            TABLES.EVENT_STORYLINE_CHARACTERS
        );
    },
    specialTokens() {
        return this.belongsToMany(
            "SpecialToken",
            TABLES.EVENT_STORYLINE_SPECIAL_TOKENS
        );
    }
});

//tc
const TC = bookshelf.model("TC", {
    tableName: TABLES.TC,
    characters() {
        return this.hasMany("TC_Character", "tc_id");
    },
    prizes() {
        return this.hasMany("TC_Prize", "tc_id");
    },
    refreshTokenTasks() {
        return this.hasMany("TC_RefreshTokenTask", "tc_id");
    }
});

//tc character
const TC_Character = bookshelf.model("TC_Character", {
    tableName: TABLES.TC_CHARACTERS,
    character() {
        return this.belongsTo("Character");
    }
});

//tc prize
const TC_Prize = bookshelf.model("TC_Prize", {
    tableName: TABLES.TC_PRIZES
});

//tc refresh token task
const TC_RefreshTokenTask = bookshelf.model("TC_RefreshTokenTask", {
    tableName: TABLES.TC_REFRESH_TOKEN_TASKS,
    task() {
        return this.belongsTo("Task");
    }
});

module.exports = {
    Character,
    CharacterGroup,
    Task,
    User,
    Building,
    Costume,
    SpecialToken,
    Concession,
    Event,
    TokenRarity,
    FabricToken,
    SpecialToken,
    TaskCharacterToken,
    TaskGroupToken,
    TaskFabricToken,
    TaskSpecialToken,
    CharacterToken,
    BuildingReq,
    CostumeReq,
    TaskCharacter,
    BuildingCharacterToken,
    BuildingGroupToken,
    BuildingFabricToken,
    BuildingSpecialToken,
    FloatCharacterToken,
    FloatGroupToken,
    EventStoryline,
    TC
};
