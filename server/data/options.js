const options = [
    { name: "useUserData", type: "options", defaultValue: true },
    { name: "useReady", type: "options", defaultValue: true },
    { name: "useLevelingData", type: "options", defaultValue: true },
    { name: "skipMaxedInDropdown", type: "options", defaultValue: true },
    { name: "sortCharsByGroup", type: "collection", defaultValue: true },
    { name: "leveling__showAllReady", type: "leveling", defaultValue: false },
    { name: "leveling__showConflicts", type: "leveling", defaultValue: true },
    { name: "leveling__showEvent", type: "leveling", defaultValue: true },
    { name: "leveling__showMagic", type: "leveling", defaultValue: true },
    { name: "leveling__showNotReady", type: "leveling", defaultValue: false }
];

module.exports = options;
