import _ from "lodash";
import React from "react";

import { GROUP_STATUS, TC_DATES } from "./globals";

/**
 * When OPTIONS.USE_LEVELING_DATA is set,
 * return status of the specific group,
 * all unobtained, all maxed, or all ready,
 * to determine UI in Characters page
 * @param {string} group: name of group to look up e.g. "Toy Story"
 */
export function getGroupStatus(group, userCharacters, appGroups) {
    if (!userCharacters) {
        return null;
    }

    let charsInGroup;
    if (group === "Star Wars") {
        const swChars = _.find(appGroups, { name: "Star Wars" }).characters;
        charsInGroup = swChars.filter((char) => {
            return char !== "R2-D2" && char !== "C-3PO";
        });
    } else if (group === "Star Wars (permanent)") {
        charsInGroup = ["R2-D2", "C-3PO"];
    } else {
        charsInGroup = _.find(appGroups, { name: group }).characters;
    }

    const numChars = charsInGroup.length;
    let numReady = 0;
    let numUnob = 0;
    let numMaxed = 0;
    let numTokensCollected = 0;

    for (let i in charsInGroup) {
        const name = charsInGroup[i];
        const userChar = _.find(userCharacters, { name });
        // If character is unobtained or maxed, it shouldn't count
        // and we increase the numUnobOrMaxed count
        // to later check if they're all unobtained or maxed
        if (!userChar || userChar.level < 1) {
            numUnob++;
        } else if (userChar.level === 10) {
            numMaxed++;
        } else {
            if (userChar.ready) {
                numReady++;
                if (userChar.level === 9) {
                    numTokensCollected++;
                }
            }
        }
    }

    // If everyone in the collection is unobtained, return unobtained
    if (numUnob === numChars) {
        return GROUP_STATUS.UNOBTAINED;
    }

    // If all obtained characters in the collection are maxed, return maxed
    if (numMaxed === numChars - numUnob) {
        return GROUP_STATUS.ALL_MAXED;
    }

    // If all obtained characters are maxed or level 9 & ready,
    // return allTokensCollected
    if (numMaxed + numTokensCollected + numUnob === numChars) {
        return GROUP_STATUS.ALL_TOKENS_COLLECTED;
    }

    // If all obtained characters in the collection are ready to level up,
    // return allReady
    if (numReady === numChars - numUnob - numMaxed) {
        return GROUP_STATUS.ALL_READY;
    }

    // Default return false
    return false;
}

/**
 * Compare task requirements (character level, required buildings/costumes, etc)
 * to what user has, and return what the user needs if not meeting requirements
 * e.g. A task requires Cantina level 2, user does not have Cantina
 * Return "obtain Cantina and level up to 2"
 * @param {object} task: task info
 * @param {object} userData
 */
export const taskWarnings = (task, userData) => {
    const { characters, buildings, costumes } = userData;
    const { taskCharacters, required } = task;

    let warnings = [];

    for (let char of taskCharacters) {
        let warningText = "";

        const { name, level } = char;

        const userChar = _.find(characters, { name });

        if (!userChar || userChar.level < 1) {
            warningText = `obtain ${name}`;
            if (level > 1) {
                warningText += ` and level up to ${level}`;
            }
        } else {
            if (userChar.level < level) {
                warningText = `level up ${name} to ${level}`;
            }
        }

        if (warningText) {
            warnings.push(warningText);
        }
    }

    if (required.length > 0) {
        for (let req of required) {
            let warningText = "";
            if (req.type === "building") {
                const userBuilding = _.find(buildings, {
                    name: req.name
                });
                if (!userBuilding) {
                    warningText = `obtain ${req.name}`;
                    if (req.level && req.level > 0) {
                        warningText += ` and level up to level ${req.level}`;
                    }
                } else {
                    if (req.level && userBuilding.level < req.level) {
                        warningText = `level up ${req.name} to level ${req.level}`;
                    }
                }
            } else {
                if (!_.find(costumes, { name: req.name })) {
                    warningText = `obtain ${req.label}`;
                }
            }

            if (warningText) {
                warnings.push(warningText);
            }
        }
    }

    return warnings;
};

export const buildingWarning = (name, level, buildings) => {
    let warning = null;

    const userBuilding = _.find(buildings, { name });

    if (!userBuilding) {
        warning = `obtain ${name}`;
        if (level > 0) {
            warning += ` and level up to ${level}`;
        }
    } else {
        if (userBuilding.level < level) {
            warning = `level up to ${level}`;
        }
    }

    return warning;
};

export const floatWarning = (name, floats) => {
    let warning = null;
    if (!_.find(floats, { name })) {
        warning = `obtain ${name} float`;
    }
    return warning;
};

/**
 * Convert strings with spaces to use underscores,
 * for images
 */
export function getImgName(str) {
    if (str) {
        return str.split(" ").join("_").replaceAll('"', "");
    }
}

/**
 * Get a token's name
 * @param {string} name: character name
 * @param {string} tokenType: token type e.g. "ears"
 * @param {object} characters: appData characters, use to find token name
 */
export function getTokenName({ name, tokenType, characters }) {
    if (tokenType === "token") {
        const charInfo = _.find(characters, { name });
        const tokenInfo = _.find(charInfo.tokens, { type: "token" });
        return tokenInfo.name || null;
    }

    return null;
}

export function validateEmail(email) {
    //eslint-disable-next-line
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Return what class to use to display a character or token
 * e.g. an unobtained character will be displayed grayed out in ConflictCard
 * Currently we are not displaying maxed characters/fabrics for obtained costumes
 * and therefore returning "skip" but could use a display
 * for this in the future
 * @param {string} name e.g. "Goofy"
 * @param {string} type e.g. "character"
 * @param {object} userData
 * @param {boolean} useUserData: return null if option is false
 */
export function userDataClass(name, type, userData, useUserData, appData) {
    if (!useUserData || type === "special") {
        return null;
    }

    if (type === "character") {
        const userChar = _.find(userData.characters, { name });
        if (userChar && userChar.level > 0) {
            const { level, ready } = userChar;
            if (level === 10 || (level === 9 && ready)) {
                return "skip";
            }
        } else {
            return "gray-out";
        }
    }

    // Skip fabric if all relevant costumes are obtained
    if (type === "fabric") {
        const fabricInfo = _.find(appData.fabricTokens, { name });

        let obtainedCostumeMatches = 0;
        for (let costume of fabricInfo.costumes) {
            if (
                _.find(userData.costumes, {
                    name: costume.name,
                    character: costume.character
                })
            ) {
                obtainedCostumeMatches++;
            }
        }
        if (fabricInfo.costumes.length === obtainedCostumeMatches) {
            return "skip";
        }
    }
}

/**
 * Sorts characters and tokens according to tokenOrder,
 * determined in App.js on load
 * @param {array} arr: array of characters & tokens to be sorted
 */
export function sortConflicts(arr, tokenOrder) {
    return arr.sort((a, b) => {
        const indexA = _.findIndex(tokenOrder, { name: a.name });
        const indexB = _.findIndex(tokenOrder, { name: b.name });

        return indexA > indexB ? 1 : -1;
    });
}

/**
 * Determines current TC chapter(s) based on today's date
 * and dates provided in globals.js
 */
export function getCurrentTCChaps() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;

    let currentChaps = [];
    if (
        (day >= TC_DATES[1].day || month > TC_DATES[1].month) &&
        (day <= TC_DATES[2].day || month < TC_DATES[2].month)
    ) {
        currentChaps.push(1);
    }
    if (day >= TC_DATES[2].day && day <= TC_DATES[3].day) {
        currentChaps.push(2);
    }
    if (
        day >= TC_DATES[3].day &&
        day <= TC_DATES[4].day &&
        month === TC_DATES[3].month
    ) {
        currentChaps.push(3);
    }

    return currentChaps;
}

export const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sortTasksByTime = (tasks) => {
    const taskTimes = ["6s", "6m", "1h", "2h", "4h", "6h", "8h", "12h", "24h"];

    return tasks.sort((a, b) => {
        return _.indexOf(taskTimes, a.time) - _.indexOf(taskTimes, b.time);
    });
};
