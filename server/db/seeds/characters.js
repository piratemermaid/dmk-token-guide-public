const { keyBy } = require("lodash");
const faker = require("faker");
const bcrypt = require("bcrypt");
const HASH = require("../../secrets");
const { hash } = require("../../models/account");

const {
    groups,
    characters,
    characterTokens,
    floatCharacterTokens,
    floatGroupTokens,
    floatSpecialTokens
} = require("../../data/characterData");
const {
    buildings,
    buildingCharacterTokens,
    buildingGroupTokens,
    buildingFabricTokens,
    buildingSpecialTokens
} = require("../../data/buildingData");
const {
    costumes,
    costumeFabricTokens,
    fabricTokens
} = require("../../data/costumeData");
const {
    tasks,
    charactersTasks,
    taskCharacterTokens,
    taskGroupTokens,
    taskFabricTokens,
    taskSpecialTokens,
    taskBuildingRequirements,
    taskCostumeRequirements
} = require("../../data/taskData");
const specialTokens = require("../../data/specialTokenData");
const { tokenRarities, tokenTypes } = require("../../data/tokenData");
const concessions = require("../../data/concessionData");
const options = require("../../data/options");
const EVENT = require("../../data/eventData");
const TABLES = require("../../data/tables");
const testUserData = require("../../data/testUserData");

const hashData = (data) => {
    const salt = bcrypt.genSaltSync(HASH.saltRounds);
    const hash = bcrypt.hashSync(data, salt);
    return hash;
};

const tokenRarityIds = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5
};
const tokenTypeIds = {
    token: 1,
    ears: 2,
    common: 3,
    mini_event: 4,
    event: 5,
    fabric: 6
};

let groupsByName,
    charactersByName,
    buildingsByName,
    costumesByKey,
    tasksByKey,
    specialTokensByName,
    optionsByName;

exports.seed = async function (knex) {
    for (let table in TABLES) {
        await resetTable(knex, TABLES[table]);
    }

    groupsByName = keyBy(
        await knex(TABLES.CHARACTER_GROUPS).insert(groups).returning("*"),
        "name"
    );

    tokenRaritiesByName = keyBy(
        await knex(TABLES.TOKEN_RARITY)
            .insert(
                tokenRarities.map((rarity) => {
                    return { name: rarity };
                })
            )
            .returning("*"),
        "name"
    );

    tokenTypesByName = keyBy(
        await knex(TABLES.TOKEN_TYPES)
            .insert(
                tokenTypes.map(({ name, type }) => {
                    return { name, type };
                })
            )
            .returning("*"),
        "name"
    );

    charactersByName = keyBy(
        await knex(TABLES.CHARACTERS)
            .insert(
                characters.map(
                    ({ name, key, nickname, magic_costs, group, order }) => {
                        return {
                            name,
                            key,
                            nickname,
                            magic_costs,
                            character_group_id: groupsByName[group].id,
                            order
                        };
                    }
                )
            )
            .returning("*"),
        "name"
    );

    let formattedCharacterTokens = [];
    for (let token of characterTokens) {
        const { name, tokenName, tokenType, rarity } = token;
        formattedCharacterTokens.push({
            key: `${name}-${tokenType}`,
            character_id: charactersByName[name].id,
            name: tokenType === "token" ? tokenName : `${name} Ears`,
            token_type_id: tokenTypeIds[tokenType],
            token_rarity_id: tokenRarityIds[rarity]
        });
    }
    const characterTokensByKey = keyBy(
        await knex(TABLES.CHARACTER_TOKENS)
            .insert(formattedCharacterTokens)
            .returning("*"),
        "key"
    );

    costumesByKey = keyBy(
        await knex(TABLES.COSTUMES)
            .insert(
                costumes.map(({ name, character, key, order }) => {
                    return {
                        name,
                        character_id: charactersByName[character].id,
                        key,
                        order
                    };
                })
            )
            .returning("*"),
        "key"
    );

    const fabricTokensByName = keyBy(
        await knex(TABLES.FABRIC_TOKENS)
            .insert(
                fabricTokens.map(({ name, rarity }) => {
                    return {
                        name,
                        token_rarity_id: tokenRaritiesByName[rarity].id
                    };
                })
            )
            .returning("*"),
        "name"
    );

    await knex(TABLES.COSTUMES_TO_FABRIC_TOKENS).insert(
        costumeFabricTokens.map(({ name, costumeKey }) => {
            return {
                costume_id: costumesByKey[costumeKey].id,
                fabric_token_id: fabricTokensByName[name].id
            };
        })
    );

    specialTokensByName = keyBy(
        await knex(TABLES.SPECIAL_TOKENS)
            .insert(
                specialTokens.map(({ name, key, mini_event, rarity }) => {
                    return {
                        name,
                        key,
                        mini_event,
                        token_rarity_id: tokenRaritiesByName[rarity].id
                    };
                })
            )
            .returning("*"),
        "name"
    );

    buildingsByName = keyBy(
        await knex(TABLES.BUILDINGS).insert(buildings).returning("*"),
        "name"
    );

    tasksByKey = keyBy(
        await knex(TABLES.TASKS).insert(tasks).returning("*"),
        "key"
    );

    await knex(TABLES.CHARACTERS_TO_TASKS).insert(
        charactersTasks.map(({ character_name, key, level }) => {
            // catch typos/missing info in development
            if (!charactersByName[character_name]) {
                console.log("missing:", key);
            }
            return {
                character_id: charactersByName[character_name].id,
                task_id: tasksByKey[key].id,
                level
            };
        })
    );

    await knex(TABLES.TASKS_TO_CHARACTER_TOKENS).insert(
        taskCharacterTokens.map(({ task_key, token_key }) => {
            return {
                task_id: tasksByKey[task_key].id,
                character_token_id: characterTokensByKey[token_key].id
            };
        })
    );

    await knex(TABLES.BUILDINGS_TO_CHARACTER_TOKENS).insert(
        // { level: 0,
        //     building_name: 'Pixie Hollow',
        //     token_key: 'Nala-ears' }
        buildingCharacterTokens.map(({ level, building_name, token_key }) => {
            return {
                level,
                building_id: buildingsByName[building_name].id,
                character_token_id: null
            };
        })
    );

    await knex(TABLES.BUILDINGS_TO_FABRIC_TOKENS).insert(
        buildingFabricTokens.map(({ level, building_name, name }) => {
            if (!fabricTokensByName[name]) {
                console.log(`don't have fabric token ${name} in db`);
            }
            return {
                level,
                building_id: buildingsByName[building_name].id,
                fabric_token_id: fabricTokensByName[name].id
            };
        })
    );

    await knex(TABLES.BUILDINGS_TO_SPECIAL_TOKENS).insert(
        buildingSpecialTokens.map(({ level, building_name, name }) => {
            if (!specialTokensByName[name]) {
                console.log(`don't have special token ${name} in db`);
            }
            return {
                level,
                building_id: buildingsByName[building_name].id,
                special_token_id: specialTokensByName[name].id
            };
        })
    );

    await knex(TABLES.BUILDINGS_TO_GROUP_TOKENS).insert(
        buildingGroupTokens.map(({ level, name, building_name }) => {
            return {
                level,
                building_id: buildingsByName[building_name].id,
                group_id: groupsByName[name].id
            };
        })
    );

    await knex(TABLES.FLOATS_TO_CHARACTER_TOKENS).insert(
        floatCharacterTokens.map(({ group, token_key }) => {
            return {
                group_id: groupsByName[group].id,
                character_token_id: null
            };
        })
    );

    await knex(TABLES.FLOATS_TO_GROUP_TOKENS).insert(
        floatGroupTokens.map(({ group, token_group }) => {
            return {
                group_id: groupsByName[group].id,
                group_token_id: groupsByName[token_group].id
            };
        })
    );

    await knex(TABLES.FLOATS_TO_SPECIAL_TOKENS).insert(
        floatSpecialTokens.map(({ group, name }) => {
            return {
                group_id: groupsByName[group].id,
                special_token_id: specialTokensByName[name].id
            };
        })
    );

    await knex(TABLES.TASKS_TO_GROUP_TOKENS).insert(
        taskGroupTokens.map(({ task_key, name }) => {
            return {
                task_id: tasksByKey[task_key].id,
                group_id: groupsByName[name].id
            };
        })
    );

    await knex(TABLES.TASKS_TO_FABRIC_TOKENS).insert(
        taskFabricTokens.map(({ name, task_key }) => {
            return {
                task_id: tasksByKey[task_key].id,
                fabric_token_id: fabricTokensByName[name].id
            };
        })
    );

    await knex(TABLES.TASKS_TO_SPECIAL_TOKENS).insert(
        taskSpecialTokens.map(({ task_key, name }) => {
            if (!specialTokensByName[name]) {
                console.log("add special token:", name);
            }
            return {
                task_id: tasksByKey[task_key].id,
                special_token_id: specialTokensByName[name].id
            };
        })
    );

    await knex(TABLES.TASK_BUILDING_REQUIREMENTS).insert(
        taskBuildingRequirements.map(({ level, building_name, task_key }) => {
            return {
                level,
                building_id: buildingsByName[building_name].id,
                task_id: tasksByKey[task_key].id
            };
        })
    );

    await knex(TABLES.TASK_COSTUME_REQUIREMENTS).insert(
        taskCostumeRequirements.map(({ costume_key, task_key }) => {
            if (!costumesByKey[costume_key]) {
                console.log("add costume:", costume_key);
            }
            if (!tasksByKey[task_key]) {
                console.log("add task:", task_key);
            }
            return {
                costume_id: costumesByKey[costume_key].id,
                task_id: tasksByKey[task_key].id
            };
        })
    );

    optionsByName = keyBy(
        await knex(TABLES.OPTIONS)
            .insert(
                options.map(({ name, type, defaultValue }) => {
                    return { name, type, defaultValue };
                })
            )
            .returning("*"),
        "name"
    );

    await knex(TABLES.EVENT).insert({ name: EVENT.NAME, type: EVENT.TYPE });

    if (EVENT.NAME) {
        await knex(TABLES.EVENT_GROUPS).insert(
            EVENT.GROUPS.map(({ name, chapter, type }) => {
                return {
                    character_group_id: groupsByName[name].id,
                    event_id: 1,
                    chapter,
                    type
                };
            })
        );

        await knex(TABLES.EVENT_CHARACTERS).insert(
            EVENT.CHARACTERS.map(
                ({ name, premium, req_level, chapter, row, featured }) => {
                    return {
                        character_id: charactersByName[name].id,
                        event_id: 1,
                        premium,
                        req_level,
                        chapter,
                        row,
                        featured
                    };
                }
            )
        );

        await knex(TABLES.EVENT_SPECIAL_TOKENS).insert(
            EVENT.SPECIAL_TOKENS.map((name) => {
                return {
                    special_token_id: specialTokensByName[name].id,
                    event_id: 1
                };
            })
        );
    }

    await knex(TABLES.CONCESSIONS).insert(
        concessions.map(
            ({
                name,
                key,
                time,
                magic,
                category,
                obtain,
                group,
                rarity,
                order
            }) => {
                return {
                    name,
                    key,
                    time,
                    magic,
                    category,
                    obtain,
                    group,
                    rarity,
                    order
                };
            }
        )
    );

    // seed user data for easy testing
    await knex(TABLES.USERS).insert({
        username: "userfoo",
        password: hash("userpass"),
        email: "dmktokenguide@gmail.com",
        verified: true
    });

    await knex(TABLES.USERS_TO_CHARACTERS).insert(
        testUserData.characters.map(({ name, level, ready, favorite }) => {
            return {
                user_id: 1,
                character_id: charactersByName[name].id,
                level,
                ready,
                favorite
            };
        })
    );

    await knex(TABLES.USERS_TO_BUILDINGS).insert(
        testUserData.buildings.map(({ name, level }) => {
            return {
                user_id: 1,
                building_id: buildingsByName[name].id,
                level
            };
        })
    );

    await knex(TABLES.USERS_TO_COSTUMES).insert(
        testUserData.costumes.map(({ costumeKey }) => {
            return {
                user_id: 1,
                costume_id: costumesByKey[costumeKey].id
            };
        })
    );

    await knex(TABLES.USERS_TO_FLOATS).insert(
        testUserData.floats.map(({ name }) => {
            return {
                user_id: 1,
                character_group_id: groupsByName[name].id
            };
        })
    );

    await knex(TABLES.USER_OPTIONS).insert(
        options.map(({ name, defaultValue }) => {
            return {
                option_id: optionsByName[name].id,
                user_id: 1,
                value: defaultValue
            };
        })
    );
};

// delete table and reset to start at id 1
const resetTable = async (knex, tableName) => {
    await knex(tableName).del();
    await knex.raw(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`);
};
