const _ = require("lodash");

/**
 *
 * @param {array} tasks: array of the tasks from bookshelf
 * //TODO: lookupToken just a string?
 * @param {object} lookupToken: object with name of the searched character
 *  e.g. { name: "Mickey Mouse" } or { name: "Refresh Token" }
 */
const formatTasks = (tasks, lookupToken) => {
    if (!tasks) {
        return null;
    }

    const tasksFormatted = tasks.map((task) => {
        const {
            name,
            time,
            characters,
            trophies,
            buildingReqs,
            costumeReqs
        } = task;

        let tokenConflicts = [];

        const tokenListTypes = [
            "characterTokens",
            "groupTokens",
            "fabricTokens",
            "specialTokens"
        ];

        for (let tokenList of tokenListTypes) {
            if (task[tokenList] && task[tokenList].length > 0) {
                task[tokenList].map((token) => {
                    let conflictName;
                    if (token.character) {
                        conflictName = token.character.name;
                    } else {
                        conflictName = token.name;
                    }

                    let tokenType;
                    if (token.type) {
                        tokenType = token.type.name;
                    } else {
                        if (tokenList === "fabricTokens") {
                            tokenType = "fabric";
                        }
                        if (tokenList === "specialTokens") {
                            tokenType = "special";
                        }
                    }

                    if (!lookupToken || conflictName !== lookupToken.name) {
                        tokenConflicts.push({
                            name: conflictName,
                            tokenType
                        });
                    } else {
                        return;
                    }
                });
            }
        }

        const taskCharacters = characters.map((char) => {
            const { name, level, order } = char;
            return { name, level, order };
        });

        return {
            name,
            taskCharacters,
            time,
            trophies,
            tokenConflicts: _.compact(tokenConflicts),
            required: formatRequirements(buildingReqs, costumeReqs)
        };
    });

    return _.sortBy(tasksFormatted, "taskCharacters[0].order");
};

// TODO: return conflicts
const formatBuildingTokenDrops = (buildings, lookupToken) => {
    return buildings.map(({ name, level, time }) => {
        return { name, level, time };
    });
};

/**
 * Go through all of character's token info to compile
 * all token conflicts for character
 * @param {object} tokens: token info with { token: {}, ears: {}, common: {} }
 */
const getAllConflicts = (tokens) => {
    let conflicts = [];

    for (let i in tokens) {
        const { tasks } = tokens[i];
        for (let j in tasks) {
            const { tokenConflicts } = tasks[j];
            for (let k in tokenConflicts) {
                const { name, tokenType } = tokenConflicts[k];
                if (
                    !_.find(conflicts, { name, tokenType }) &&
                    tokens[i].name !== tokenConflicts[k].name
                ) {
                    conflicts.push(tokenConflicts[k]);
                }
            }
        }
    }

    return conflicts;
};

/**
 * Format required buildings
 * @param {array} reqBuildings: array of objects with buildings to format
 */
const formatRequirements = (buildingReqs, costumeReqs) => {
    let reqs = [];

    buildingReqs.map(({ level, building }) => {
        const {
            name,
            time,
            trophies,
            unlock_type,
            unlock_info,
            theme,
            enchantment_group
        } = building;
        reqs.push({
            name,
            level,
            time,
            trophies,
            unlock_type,
            unlock_info,
            theme,
            enchantment_group,
            type: "building"
        });
    });

    costumeReqs.map(({ name, character }) => {
        reqs.push({
            name,
            character: character.name,
            label: `${character.name}'s ${name} Costume`,
            type: "costume"
        });
    });

    return reqs;
};

const formatEventStorylineItem = (item) => {
    const {
        type,
        order,
        time,
        EC,
        common,
        token,
        ears,
        name,
        characters,
        specialTokens,
        amount,
        requirement,
        subtask
    } = item;
    switch (type) {
        case "welcome":
            return {
                type,
                name: characters[0].name,
                order,
                time,
                EC,
                common,
                token,
                ears
            };
        case "quest":
            return {
                type,
                name,
                time,
                order,
                characters: characters.map(({ name, level }) => {
                    return { name, level };
                }),
                subtask
            };
        case "build":
            return { type, name, time, EC, order };
        case "battle":
            return {
                type,
                order,
                time,
                name,
                characters,
                specialTokens,
                amount,
                requirement
            };
        case "collect":
            return {
                type,
                name,
                time,
                order,
                characters: characters.map(({ name, level }) => {
                    return { name, level };
                }),
                requirement,
                amount
            };
        default:
            return item;
    }
};

module.exports = {
    formatTasks,
    formatBuildingTokenDrops,
    getAllConflicts,
    formatRequirements,
    formatEventStorylineItem
};
