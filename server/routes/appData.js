const _ = require("lodash");
var express = require("express");
var router = express.Router();
const { knex } = require("../models/config");
const {
    Character,
    CharacterGroup,
    Building,
    Costume,
    SpecialToken,
    Concession,
    Event,
    Task,
    FabricToken,
    EventStoryline,
    TC
} = require("../models/character");
const {
    formatTasks,
    formatBuildingTokenDrops,
    getAllConflicts,
    formatEventStorylineItem
} = require("../models/helpers");
const TABLES = require("../data/tables");

// Returns all characters with their name and group
router.get("/character_list", function (req, res, next) {
    Character.fetchAll({
        withRelated: ["group", "characterTokens.type", "characterTokens.rarity"]
    }).then((characters) => {
        const characterList = characters
            .toJSON()
            .map(
                ({
                    name,
                    nickname,
                    group,
                    magic_costs,
                    characterTokens,
                    order
                }) => {
                    return {
                        name,
                        nickname,
                        group: group.name,
                        groupOrder: group.order,
                        magic_costs,
                        tokens: characterTokens.map((token) => {
                            const { type } = token;
                            const rarity = token.rarity
                                ? token.rarity.name
                                : null;
                            return {
                                type: type.name || null,
                                rarity,
                                name: token.name || null
                            };
                        }),
                        order
                    };
                }
            );

        // sort in order by group then by character
        const sortedCharacterList = characterList.sort(function (a, b) {
            const orderA = a.order;
            const groupOrderA = a.groupOrder;
            const orderB = b.order;
            const groupOrderB = b.groupOrder;

            if (groupOrderA < groupOrderB) {
                return -1;
            } else if (groupOrderA > groupOrderB) {
                return 1;
            } else {
                if (orderA < orderB) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });

        res.send(sortedCharacterList);
    });
});

// Returns array of strings of character names
router.get("/character_names", async function (req, res) {
    const result = await knex.select(["name", "order"]).from(TABLES.CHARACTERS);
    const sorted = _.sortBy(result, "order");
    res.send(sorted.map(({ name }) => name));
});

// Returns all groups with their characters
router.get("/character_group_list", function (req, res, next) {
    Character.fetchAll({ withRelated: ["group"] }).then((characters) => {
        let groupList = [];
        characters.toJSON().map(({ name, group, order }) => {
            if (!_.find(groupList, { name: group.name })) {
                groupList.push({
                    name: group.name,
                    characters: [],
                    nickname: group.nickname,
                    order: group.order
                });
            }
            const groupIndex = _.findIndex(groupList, { name: group.name });
            groupList[groupIndex].characters.push({ name, order });
        });

        for (let group of groupList) {
            const charsSorted = _.sortBy(group.characters, "order");
            group.characters = charsSorted.map(({ name }) => {
                return name;
            });
        }

        res.send(_.sortBy(groupList, "order"));
    });
});

// Returns list of character groups as strings
router.get("/character_group_list_strings", async function (req, res) {
    const result = await knex(TABLES.CHARACTER_GROUPS);
    const formatted = _.sortBy(
        result.map(({ name, order }) => {
            return { name, order };
        }),
        "order"
    );
    res.send(formatted.map(({ name }) => name));
});

// Returns order for TokenGuide dropdown
// Order: event tokens if applicable -> characters -> costumes ->
// mini events -> special tokens
router.get("/dropdown_order", async function (req, res, next) {
    // First, check if current event
    const eventResult = await Event.fetchAll({
        withRelated: ["eventCharacters.character", "specialTokens"]
    });
    const event = eventResult.toJSON()[0];
    // Tokens to go first, if applicable
    let eventTokens = [];

    const charResult = await Character.fetchAll();
    const charsInOrder = _.sortBy(charResult.toJSON(), "order");
    let characters = [];
    if (event && event.eventCharacters.length > 0) {
        for (let char of event.eventCharacters) {
            const { name } = char.character;
            characters.push({
                label: name,
                value: { name, type: "character" }
            });
        }
    }
    for (let char of charsInOrder) {
        const { name } = char;
        if (!_.find(characters, { label: name })) {
            characters.push({
                label: name,
                value: { name, type: "character" }
            });
        }
    }

    const costumeResult = await Costume.fetchAll({
        withRelated: ["character", "fabricTokens"]
    });
    const costumesInOrder = _.sortBy(costumeResult.toJSON(), "order");
    const costumes = _.compact(
        costumesInOrder.map(({ name, character, fabricTokens }) => {
            const characterName = character.name;
            // Skip costumes with no collectible tokens
            if (fabricTokens.length > 0) {
                return {
                    label: `${characterName} ${name} Costume`,
                    value: {
                        character: characterName,
                        name,
                        fabricTokens: fabricTokens.map(({ name }) => {
                            return { name, tokenType: "fabric" };
                        }),
                        type: "costume"
                    }
                };
            }
        })
    );

    const specialResult = await SpecialToken.fetchAll();
    const specialResultJSON = specialResult.toJSON();

    let miniEvents = [];
    let specialTokens = [];

    if (event) {
        if (event.type === "Mini Event") {
            eventTokens.push({
                label: `${event.name} Mini Event`,
                value: {
                    name: event.name,
                    type: "mini event",
                    tokens: event.specialTokens.map(({ name }) => {
                        return name;
                    })
                }
            });
        } else {
            if (event.specialTokens.length > 0) {
                for (let token of event.specialTokens) {
                    eventTokens.push({
                        label: token.name,
                        value: { name: token.name, type: "special" }
                    });
                }
            }
        }
    }

    for (let token of specialResultJSON) {
        const { name, mini_event } = token;
        if (!mini_event) {
            if (!_.find(eventTokens, { label: name })) {
                specialTokens.push({
                    label: name,
                    value: { name, type: "special" }
                });
            }
        } else {
            const label = `${mini_event} Mini Event`;
            if (!_.find(eventTokens, { label })) {
                if (!_.find(miniEvents, { label })) {
                    miniEvents.push({
                        label,
                        value: {
                            name: mini_event,
                            type: "mini event",
                            tokens: [token.name]
                        }
                    });
                } else {
                    const index = _.findIndex(miniEvents, { label });
                    miniEvents[index].value.tokens.push(token.name);
                }
            }
        }
    }

    res.send(
        _.concat(eventTokens, characters, costumes, miniEvents, specialTokens)
    );
});

/**
 * Used in TaskGuide lookup (& will be used in other stuff)
 * Takes character name
 * Returns character's group, token rarities, magic costs, & task info
 */
// TODO: update comments when implemented elsewhere
router.get("/lookup_character", function (req, res, next) {
    // const { name } = req.body; //use with postman
    const { name } = req.query; //use with react

    Character.forge({ name })
        .fetch({
            withRelated: [
                "tasks.characterTokens.character",
                "tasks.characterTokens.type",
                {
                    "tasks.characters"(qb) {
                        qb.column("name", "level", "order");
                    }
                },
                "tasks.buildingReqs.building",
                "tasks.costumeReqs.character",
                "characterTokens.rarity",
                "characterTokens.type",
                "group",
                "tasks.fabricTokens",
                "tasks.specialTokens"
            ]
        })
        .then((character) => {
            const { name, magic_costs, group, characterTokens, tasks } =
                character.toJSON();

            res.send({
                name,
                magic_costs,
                group: group.name,
                tasks: formatTasks(tasks, character.toJSON()),
                characterTokens: [
                    {
                        type: characterTokens[0].type
                            ? characterTokens[0].type.name
                            : null,
                        rarity: characterTokens[0].rarity
                            ? characterTokens[0].rarity.name
                            : null,
                        name: characterTokens[0].name
                            ? characterTokens[0].name
                            : null
                    },
                    {
                        type: characterTokens[1].type
                            ? characterTokens[1].type.name
                            : null,
                        rarity: characterTokens[1].rarity
                            ? characterTokens[1].rarity.name
                            : null,
                        name: characterTokens[1].name
                            ? characterTokens[1].name
                            : null
                    }
                ]
            });
        });
});

/**
 * Get welcome time for individual characters
 * (used on Leveling page)
 */
router.get("/welcome_time", function (req, res) {
    const { name } = req.query;

    Character.forge({ name })
        .fetch()
        .then((character) => {
            const { welcome_time } = character.toJSON();

            res.send(welcome_time);
        });
});

/**
 * Used in TokenGuide lookup
 * Takes a character's name
 * Returns info for each token (e.g. token, ears, common)
 * tasks that drop tokens & conflicting tokens
 */
// TODO: add buildings & floats that drop tokens, plus conflicts
router.get("/lookup_character_token", function (req, res, next) {
    const { name } = req.query;

    Character.forge({ name })
        .fetch({
            withRelated: [
                "characterTokens.type",
                "characterTokens.rarity",
                "characterTokens.character",
                "characterTokens.tasks.characterTokens.character",
                {
                    "characterTokens.tasks.characters"(qb) {
                        qb.column("name", "level", "order");
                    },
                    "group.tasks.characters"(qb) {
                        qb.column("name", "level", "order");
                    },
                    "group.tasks.characterTokens.character"(qb) {
                        qb.column("name", "id", "order");
                    }
                },
                "characterTokens.tasks.characterTokens.type",
                "characterTokens.tasks.fabricTokens",
                "characterTokens.tasks.specialTokens",
                "characterTokens.tasks.buildingReqs.building",
                "characterTokens.tasks.costumeReqs.character",
                "group.tasks.buildingReqs.building",
                "group.tasks.costumeReqs.character",
                "group.tasks.characterTokens.type",
                "group.tasks.fabricTokens",
                "group.tasks.specialTokens",
                {
                    "characterTokens.buildings"(qb) {
                        qb.column("name", "level", "time");
                    }
                },
                "characterTokens.floats",
                {
                    "group.buildings"(qb) {
                        qb.column("name", "level", "time");
                    }
                },
                "group.floats"
            ]
        })
        .then((character) => {
            let tokens = [];

            // Note: each token has its own list of conflicts (property tokenConflicts),
            // and there is also a list of all the conflicts for the character (conflicts)

            const { characterTokens, group } = character.toJSON();

            for (let token of characterTokens) {
                let rarityName = null;
                if (token.rarity && token.rarity.name) {
                    rarityName = token.rarity.name;
                }
                tokens.push({
                    name: token.character.name,
                    tokenName: token.name || null,
                    rarity: rarityName,
                    tasks: formatTasks(token.tasks, character.toJSON()),
                    buildings: formatBuildingTokenDrops(
                        token.buildings,
                        character.toJSON().name
                    ),
                    floats: token.floats.map(({ name }) => {
                        return { name };
                    })
                });
            }

            const groupToken = {
                tasks: formatTasks(group.tasks, character.toJSON()),
                buildings: group.buildings,
                floats: group.floats
            };

            // const formattedTokens = {
            //     token: tokens[0],
            //     ears: tokens[1],
            //     common: { tasks: groupTokenTasks, group: group.name }
            // };
            const formattedTokens = [
                { ...tokens[0], type: "token", name },
                { ...tokens[1], type: "ears", name },
                {
                    type: "common",
                    rarity: "common",
                    name: group.name,
                    tasks: groupToken.tasks,
                    buildings: groupToken.buildings,
                    floats: groupToken.floats
                }
            ];

            const conflicts = getAllConflicts(formattedTokens);

            res.send({
                tokens: formattedTokens,
                conflicts: _.compact(conflicts)
            });
        });
});

// Returns all buildings
router.get("/building_list", async function (req, res, next) {
    const buildings = await Building.fetchAll({
        withRelated: [
            {
                characterTokens: function (qb) {
                    qb.column("level", "key");
                }
            },
            {
                groupTokens: function (qb) {
                    qb.column("level", "name");
                }
            },
            {
                specialTokens: function (qb) {
                    qb.column("level", "name");
                }
            },
            {
                fabricTokens: function (qb) {
                    qb.column("level", "name");
                }
            }
        ]
    }).then((buildings) => {
        const formattedBuildings = buildings
            .toJSON()
            .map(
                ({
                    name,
                    time,
                    trophies,
                    unlock_type,
                    unlock_info,
                    theme,
                    group,
                    enchantment_group,
                    characterTokens,
                    groupTokens,
                    fabricTokens,
                    specialTokens,
                    order
                }) => {
                    const characterTokensFormatted = characterTokens.map(
                        ({ level, key }) => {
                            const keySplitIndex = key.lastIndexOf("-");
                            const name = key.substring(0, keySplitIndex);
                            const tokenType = key.substring(keySplitIndex + 1);
                            return {
                                level,
                                name,
                                tokenType,
                                type: "character"
                            };
                        }
                    );

                    const groupTokensFormatted = groupTokens.map(
                        ({ name, level }) => {
                            return {
                                level,
                                name,
                                tokenType: "common"
                            };
                        }
                    );

                    const fabricTokensFormatted = fabricTokens.map(
                        ({ name, level }) => {
                            return {
                                level,
                                name,
                                tokenType: "fabric"
                            };
                        }
                    );

                    const specialTokensFormatted = specialTokens.map(
                        ({ name, level }) => {
                            return {
                                level,
                                name,
                                tokenType: "special"
                            };
                        }
                    );

                    return {
                        name,
                        time,
                        trophies,
                        unlock_type,
                        unlock_info,
                        theme,
                        group,
                        enchantment_group,
                        tokens: _.compact(
                            characterTokensFormatted.concat(
                                groupTokensFormatted,
                                fabricTokensFormatted,
                                specialTokensFormatted
                            )
                        ),
                        order
                    };
                }
            );

        return formattedBuildings;
    });

    const buildingGroupOrder = await CharacterGroup.fetchAll().then(
        (groups) => {
            const groupsSorted = _.sortBy(groups.toJSON(), "order");
            return groupsSorted.map(({ name }) => {
                let enchantable = false;
                if (_.find(buildings, { enchantment_group: name })) {
                    enchantable = true;
                }
                return { name, enchantable };
            });
        }
    );

    res.send({
        buildings,
        buildingGroupOrder
    });
});

// Returns array of strings of character names
router.get("/building_names", async function (req, res) {
    const result = await knex.select(["name", "order"]).from(TABLES.BUILDINGS);
    const sorted = _.sortBy(result, "order");
    res.send(sorted.map(({ name }) => name));
});

router.get("/lookup_building", function (req, res, next) {
    const { name } = req.query;

    Building.forge({ name })
        .fetch({
            withRelated: [
                "characterTokens.type",
                "characterTokens.character",
                "groupTokens",
                "tasks.characterTokens.character",
                "tasks.characterTokens.type",
                "tasks.groupTokens",
                "tasks.fabricTokens",
                "tasks.specialTokens",
                "tasks.buildingReqs.building",
                "tasks.costumeReqs.character",
                {
                    "tasks.characters"(qb) {
                        qb.column("name", "level", "order");
                    }
                }
            ]
        })
        .then((building) => {
            const {
                name,
                time,
                trophies,
                unlock_type,
                unlock_info,
                theme,
                enchantment_group,
                characterTokens,
                groupTokens,
                fabricTokens,
                specialTokens,
                tasks
            } = building.toJSON();

            res.send({
                name,
                time,
                trophies,
                unlock_type,
                unlock_info,
                theme,
                enchantment_group,
                tokens: _.compact(
                    characterTokens.concat(
                        groupTokens,
                        fabricTokens,
                        specialTokens
                    )
                ),
                tasks: formatTasks(tasks)
            });
        });
});

// Returns all costumes
router.get("/costume_list", async function (req, res, next) {
    const costumes = await Costume.fetchAll({
        withRelated: ["character", "fabricTokens"]
    }).then((costumes) => {
        const costumesFormatted = costumes
            .toJSON()
            .map(({ name, character, fabricTokens, order }) => {
                return {
                    name,
                    character: character.name,
                    order,
                    fabricTokens: fabricTokens.map(({ name }) => {
                        return { name, tokenType: "fabric" };
                    })
                };
            });

        return _.sortBy(costumesFormatted, "order");
    });

    const fabricTokens = await FabricToken.fetchAll({
        withRelated: ["costumes.character"]
    }).then((fabricTokens) => {
        return fabricTokens.toJSON().map(({ name, costumes }) => {
            return {
                name,
                costumes: costumes.map(({ name, character }) => {
                    return { name, character: character.name };
                })
            };
        });
    });

    res.send({ costumes, fabricTokens });
});

router.get("/lookup_costume", function (req, res, next) {
    const { name, character } = req.query;

    const key = `${name}-${character}`;

    Costume.forge({ key })
        .fetch({
            withRelated: [
                "fabricTokens.rarity",
                {
                    "fabricTokens.tasks.characters"(qb) {
                        qb.column("name", "level", "order");
                    }
                },
                "fabricTokens.tasks.characterTokens.character",
                "fabricTokens.tasks.characterTokens.type",
                "fabricTokens.tasks.fabricTokens",
                "fabricTokens.tasks.specialTokens",
                "fabricTokens.tasks.buildingReqs.building",
                "fabricTokens.tasks.costumeReqs.character",
                {
                    "fabricTokens.buildings"(qb) {
                        qb.column("name", "level", "time");
                    }
                }
            ]
        })
        .then((costume) => {
            const { fabricTokens } = costume.toJSON();

            const tokens = fabricTokens.map((token) => {
                const { name, rarity, tasks, buildings } = token;
                return {
                    name,
                    rarity: rarity.name,
                    tasks: formatTasks(tasks, { name, character }),
                    type: "fabric",
                    buildings: buildings.map(({ name, level, time }) => {
                        return { name, level, time };
                    })
                };
            });

            res.send({
                tokens,
                conflicts: _.compact(getAllConflicts(tokens))
            });
        });
});

router.get("/special_token_list", function (req, res, next) {
    SpecialToken.fetchAll({ withRelated: ["rarity"] }).then((specialTokens) => {
        res.send(
            specialTokens.toJSON().map(({ name, mini_event, rarity }) => {
                return { name, mini_event, rarity: rarity.name };
            })
        );
    });
});

router.get("/special_token_list_strings", async function (req, res) {
    const result = await knex(TABLES.SPECIAL_TOKENS);
    res.send(_.uniqBy(result.map(({ name }) => name)));
});

router.get("/lookup_special_token", async function (req, res, next) {
    // const name = "Refresh Token";
    const { name } = req.query;
    if (!name) {
        res.status(500).send("No name provided.");
        return;
    }

    SpecialToken.forge({ name })
        .fetch({
            withRelated: [
                "rarity",
                "tasks.specialTokens",
                "tasks.buildingReqs.building",
                "tasks.costumeReqs.character",
                "tasks.characterTokens.type",
                {
                    "tasks.characterTokens.character"(qb) {
                        qb.column("name", "id", "order");
                    },
                    "tasks.characters"(qb) {
                        qb.column("name", "level", "order");
                    }
                },
                // TODO
                // ,"tasks.groupTokens",
                // "tasks.fabricTokens"
                {
                    buildings(qb) {
                        qb.column("name", "level", "time");
                    }
                },
                "floats"
            ]
        })
        .then((specialToken) => {
            const { name, rarity, tasks, buildings, floats } =
                specialToken.toJSON();

            let conflicts = [];

            tasks.map((task) => {
                const { characterTokens } = task;
                characterTokens.map(({ character, type }) => {
                    let tokenType;
                    if (!type) {
                        // TODO: figure out why type isn't returning correctly
                        // (only in special token lookup)
                        const tokenType = task.key.split("-")[1];
                    } else {
                        tokenType = type.name;
                    }
                    conflicts.push({
                        name: character.name,
                        tokenType
                    });
                });
            });

            res.send({
                name,
                rarity: rarity.name,
                type: "special",
                tasks: formatTasks(tasks, { name }),
                conflicts: _.compact(conflicts),
                buildings: buildings.map(({ name, level, time }) => {
                    return { name, level, time };
                }),
                floats: floats.map(({ name }) => {
                    return { name };
                })
            });
        });
});

router.get("/concession_list", function (req, res, next) {
    Concession.fetchAll().then((result) => {
        const concessions = result.toJSON();

        const sorted = _.sortBy(concessions, "order");

        res.send(
            sorted.map(
                ({ name, time, magic, category, obtain, group, rarity }) => {
                    return {
                        name,
                        time,
                        magic,
                        category,
                        obtain,
                        group,
                        rarity
                    };
                }
            )
        );
    });
});

router.get("/event", function (req, res, next) {
    Event.fetchAll({
        withRelated: [
            "eventGroups.group",
            "eventCharacters.character",
            "specialTokens"
        ]
    }).then((event) => {
        const { name, type, eventGroups, eventCharacters, specialTokens } =
            event.toJSON()[0];

        const eventCharactersSorted = _.sortBy(eventCharacters, "id");

        res.send({
            name,
            type,
            groups: eventGroups.map(({ group, type, chapter }) => {
                return { name: group.name, type, chapter };
            }),
            characters: eventCharactersSorted.map(
                ({ character, premium, req_level, chapter, row, featured }) => {
                    return {
                        name: character.name,
                        premium,
                        req_level,
                        chapter,
                        row,
                        featured
                    };
                }
            ),
            specialTokens: specialTokens.map(({ name }) => {
                return name;
            })
        });
    });
});

router.get("/event_new", async function (req, res, next) {
    const result = await Event.fetchAll({
        withRelated: [
            "eventGroups.group",
            "eventCharacters.character",
            "specialTokens"
        ]
    });
    const event = result.toJSON()[0];

    res.send({
        name: event.name,
        type: event.type,
        groups: event.eventGroups.map(({ group, type, chapter }) => {
            return { name: group.name, type, chapter };
        }),
        characters: _.sortBy(
            event.eventCharacters.map(
                ({ character, premium, chapter, row, featured }) => {
                    return {
                        name: character.name,
                        premium,
                        chapter,
                        row,
                        featured
                    };
                }
            ),
            "id"
        ),
        specialTokens: event.specialTokens.map(({ name }) => name)
    });
});

router.get("/default_options", async function (req, res, next) {
    const options = await knex(TABLES.OPTIONS)
        .select("*")
        .then((options) => {
            return options;
        });

    res.send(
        options.map(({ name, type, defaultValue }) => {
            return { name, type, value: defaultValue };
        })
    );
});

router.get("/gold_trophy_drops", async function (req, res, next) {
    const trophyTasks = await Task.fetchAll({
        withRelated: [
            {
                characters(qb) {
                    qb.column("name", "level");
                }
            },
            "buildingReqs.building",
            "costumeReqs.character"
        ]
    }).then((tasks) => {
        return tasks.toJSON().filter((task) => {
            return task.trophies;
        });
    });

    const trophyBuildings = await Building.fetchAll().then((buildings) => {
        return buildings.toJSON().filter((building) => {
            return building.trophies;
        });
    });

    const trophyTasksSorted = _.sortBy(trophyTasks, "id");
    const trophyBuildingsSorted = _.sortBy(trophyBuildings, "id");

    res.send({
        trophyTasks: trophyTasksSorted.map(
            ({ name, time, characters, buildingReqs, costumeReqs }) => {
                const buildingReq = buildingReqs[0];
                const costumeReq = costumeReqs[0];
                return {
                    name,
                    time,
                    characters: characters.map(({ name, level }) => {
                        return { name, level };
                    }),
                    buildingReq: buildingReq
                        ? { name: buildingReq.building.name }
                        : null,
                    costumeReq: costumeReq
                        ? {
                              name: costumeReq.name,
                              character: costumeReq.character.name
                          }
                        : null
                };
            }
        ),
        trophyBuildings: trophyBuildingsSorted.map(
            ({ name, time, unlock_info }) => {
                return { name, time, unlock_info };
            }
        )
    });
});

router.get("/dev_notes", async function (req, res, next) {
    const devNotes = await knex(TABLES.DEV_NOTES).then((devNotes) => {
        return devNotes;
    });

    let doneItems = [];
    let fix = [];
    let feature = [];
    let UI = [];

    for (let item of devNotes) {
        const { type, desc, done, inProgress, order, date } = item;
        if (done) {
            doneItems.push({ type, desc, order, date });
        } else {
            if (type === "fix") {
                fix.push({ desc, inProgress, order });
            }
            if (type === "feature") {
                feature.push({ desc, inProgress, order });
            }
            if (type === "UI") {
                UI.push({ desc, inProgress, order });
            }
        }
    }

    res.send({
        done: _.sortBy(doneItems, "order"),
        fix: _.sortBy(fix, "order"),
        feature: _.sortBy(feature, "order"),
        UI: _.sortBy(UI, "order")
    });
});

router.get("/event_storyline", async function (req, res, next) {
    const storyline = await EventStoryline.fetchAll({
        withRelated: [
            {
                characters(qb) {
                    qb.column("name", "level");
                }
            },
            {
                specialTokens(qb) {
                    qb.column("name", "amount");
                }
            }
        ]
    }).then((storyline) => {
        return storyline.toJSON();
    });

    let itemsByDate = {};

    for (let item of storyline) {
        const { date } = item;
        const formatted = formatEventStorylineItem(item);
        if (!itemsByDate[date]) {
            itemsByDate[date] = [formatted];
        } else {
            itemsByDate[date].push(formatted);
        }
    }

    for (let date in itemsByDate) {
        itemsByDate[date] = _.sortBy(itemsByDate[date], "order");
    }

    res.send(itemsByDate);
});

router.get("/tc_info", async function (req, res, next) {
    // TABLES.TC, TABLES.TC_CHARACTERS, TABLES.TC_PRIZES, TABLES.TC_REFRESH_TOKEN_TASKS

    const tcInfo = await TC.fetchAll({
        withRelated: [
            "characters.character",
            "prizes",
            {
                "refreshTokenTasks.task.characters"(qb) {
                    qb.column("name", "level");
                }
            }
        ]
    });

    const tcInfoFormatted = tcInfo
        .toJSON()
        .map(
            ({
                number,
                dateSpan,
                grand_prize,
                characters,
                prizes,
                refreshTokenTasks
            }) => {
                return {
                    number,
                    dateSpan,
                    grand_prize,
                    characters: characters.map(
                        ({ character, chapter, row, featured }) => {
                            return {
                                name: character.name,
                                chapter,
                                row,
                                featured
                            };
                        }
                    ),
                    prizes: prizes.map(({ name, cost, currency }) => {
                        return { name, cost, currency };
                    }),
                    refreshTokenTasks: refreshTokenTasks.map(({ task }) => {
                        return {
                            name: task.name,
                            time: task.time,
                            characters: task.characters.map(
                                ({ name, level }) => {
                                    return { name, level };
                                }
                            )
                        };
                    })
                };
            }
        );

    res.send(tcInfoFormatted);
});

router.get("/building_group_order", async function (req, res, next) {
    const buildings = await Building.fetchAll();

    const characterGroups = await CharacterGroup.fetchAll();
    const groupsSorted = _.sortBy(characterGroups.toJSON(), "order");
    const buildingGroupOrder = groupsSorted.map(({ name }) => {
        let enchantable = false;
        if (_.find(buildings, { enchantment_group: name })) {
            enchantable = true;
        }
        return { name, enchantable };
    });

    res.send(buildingGroupOrder);
});

router.get("/event/dates", async function (req, res) {
    const dates = await knex(TABLES.EVENT_DATES);
    res.send(dates);
});

router.get("/event/req_levels", async function (req, res) {
    const reqLevels = await knex(TABLES.EVENT_REQ_LEVELS);
    const formatted = _.map(
        reqLevels,
        ({ character_name, levels_by_date_id }) => {
            return {
                name: character_name,
                levels: _.map(levels_by_date_id, (lv) => lv)
            };
        }
    );
    res.send(formatted);
});

router.get("/latest_version", async function (req, res, next) {
    const version = await knex(TABLES.DEV_NOTES)
        .where({ type: "version" })
        .first()
        .then((result) => {
            return result.desc;
        });

    res.send({ version });
});

module.exports = router;
