export const EVENT_CHARS = [];
export const EVENT_NAME = "";

export const miniEventTokens = {
    "Honey Bees": ["Honeycomb", "Honey Dipper"],
    "Battle Bots": ["Gaming Remote", "Gaming Visor"],
    Virus: ["Anti-Virus Chip", "Virus Tracker"],
    "Lose Your Lunch": ["Key", "Heart Lock"],
    "Frogs!": ["Critter Net", "Critter Container"],
    Coco: ["Sweet Treat", "Comfy Basket"]
};

export const OPTIONS = {
    USE_USER_DATA: "useUserData",
    USE_READY: "useReady",
    USE_LEVELING_DATA: "useLevelingData",
    SKIP_MAXED_IN_DROPDOWN: "skipMaxedInDropdown",
    SORT_CHARS_BY_GROUP: "sortCharsByGroup",
    LEVELING__SHOW_EVENT: "leveling__showEvent",
    LEVELING__SHOW_ALL_READY: "leveling__showAllReady",
    LEVELING__SHOW_CONFLICTS: "leveling__showConflicts",
    LEVELING__SHOW_MAGIC: "leveling__showMagic",
    LEVELING__SHOW_NOT_READY: "leveling__showNotReady"
};

export const OPTIONS_DEFAULT_VALUES = {
    [OPTIONS.USE_USER_DATA]: false,
    [OPTIONS.USE_READY]: true,
    [OPTIONS.USE_LEVELING_DATA]: true,
    [OPTIONS.SKIP_MAXED_IN_DROPDOWN]: false,
    [OPTIONS.SORT_CHARS_BY_GROUP]: true,
    [OPTIONS.LEVELING__SHOW_ALL_READY]: false,
    [OPTIONS.LEVELING__SHOW_CONFLICTS]: true,
    [OPTIONS.LEVELING__SHOW_EVENT]: true,
    [OPTIONS.LEVELING__SHOW_MAGIC]: true
};

export const LS = {
    WORK_MODE: "workMode",
    NIGHT_MODE: "nightMode",
    OPTIONS: "dmkOptions",
    COLLECTION: "dmkCharacters",
    LAST_UPDATE: "dmkLastUpdate",
    TC_PLANNER: "dmkTCPlanner"
};

export const coll = "coll";
export const tok = "token";
export const ears = "ears";
export const special = "special";

export const GROUP_STATUS = {
    ALL_MAXED: "maxed",
    ALL_READY: "all-ready",
    UNOBTAINED: "unob",
    NOT_ALL_READY: "not-all-ready",
    ALL_TOKENS_COLLECTED: "all-tokens-collected"
};

export const SHOW_TC_PLANNER = false;
export const TC_DATES = {
    1: { month: 10, day: 22 },
    2: { month: 10, day: 28 },
    3: { month: 11, day: 2 },
    4: { month: 11, day: 7 }
};

// Chapter 1: 22nd October - 28th October
// Chapter 2: 28th October - 2nd November
// Chapter 3: 2nd November - 7th November

export const PASSWORD_STRENGTH = 2;
