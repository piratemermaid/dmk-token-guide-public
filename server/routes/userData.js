var express = require("express");
var router = express.Router();
const { knex } = require("../models/config");
const { User } = require("../models/character");
const { Session } = require("../models/account");
const TABLES = require("../data/tables");

router.get("/data", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({
                withRelated: [
                    "userCharacters.character",
                    "userBuildings.building",
                    "costumes.character",
                    "floats",
                    "concessions",
                    "userOptions.option"
                ]
            })
            .then((userData) => {
                const {
                    userCharacters,
                    userBuildings,
                    costumes,
                    floats,
                    concessions,
                    userOptions
                } = userData.toJSON();

                res.send({
                    characters: userCharacters.map(
                        ({
                            level,
                            ready,
                            favorite,
                            character,
                            target_level
                        }) => {
                            return {
                                level,
                                ready,
                                favorite,
                                name: character.name,
                                target_level
                            };
                        }
                    ),
                    buildings: userBuildings.map(({ level, building }) => {
                        return { level, name: building.name };
                    }),
                    floats: floats.map(({ name }) => {
                        return { name };
                    }),
                    costumes: costumes.map((costume) => {
                        return {
                            name: costume.name,
                            character: costume.character.name
                        };
                    }),
                    concessions: concessions.map(({ name }) => {
                        return { name };
                    }),
                    options: userOptions.map(({ value, option }) => {
                        return { value, type: option.type, name: option.name };
                    })
                });
            });
    }
});

router.get("/characters", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({
                withRelated: ["userCharacters.character"]
            })
            .then((userData) => {
                const { userCharacters } = userData.toJSON();

                res.send({
                    characters: userCharacters.map(
                        ({
                            level,
                            ready,
                            favorite,
                            character,
                            target_level
                        }) => {
                            return {
                                level,
                                ready,
                                favorite,
                                name: character.name,
                                target_level
                            };
                        }
                    )
                });
            });
    }
});

router.get("/attractions", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({
                withRelated: ["userBuildings.building"]
            })
            .then((userData) => {
                const { userBuildings } = userData.toJSON();

                res.send({
                    buildings: userBuildings.map(({ level, building }) => {
                        return { level, name: building.name };
                    })
                });
            });
    }
});

router.get("/costumes", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({
                withRelated: ["costumes.character"]
            })
            .then((userData) => {
                const { costumes } = userData.toJSON();

                res.send({
                    costumes: costumes.map((costume) => {
                        return {
                            name: costume.name,
                            character: costume.character.name
                        };
                    })
                });
            });
    }
});

router.get("/floats", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({
                withRelated: ["floats"]
            })
            .then((userData) => {
                const { floats } = userData.toJSON();

                res.send({
                    floats: floats.map(({ name }) => {
                        return { name };
                    })
                });
            });
    }
});

router.get("/concessions", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({
                withRelated: ["concessions"]
            })
            .then((userData) => {
                const { concessions } = userData.toJSON();

                res.send({
                    concessions: concessions.map(({ name }) => {
                        return { name };
                    })
                });
            });
    }
});

router.get("/options", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({
                withRelated: ["userOptions.option"]
            })
            .then((userData) => {
                const { userOptions } = userData.toJSON();

                res.send({
                    options: userOptions.map(({ value, option }) => {
                        return { value, type: option.type, name: option.name };
                    })
                });
            });
    }
});

router.get("/tc_planner", function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        User.forge({ username })
            .fetch({ withRelated: ["TCPlanner.character"] })
            .then((tcPlanner) => {
                const { TCPlanner } = tcPlanner.toJSON();
                res.send(
                    TCPlanner.map((char) => {
                        return {
                            name: char.character.name,
                            tired: char.tired
                        };
                    })
                );
            });
    }
});

router.post("/tc_planner_update_character", async function (req, res, next) {
    const { name } = req.query;

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const characterId = await knex(TABLES.CHARACTERS)
            .where({ name })
            .first()
            .then((character) => {
                return character.id;
            });

        const inTable = await knex(TABLES.TC_PLANNER).first().where({
            character_id: characterId,
            user_id: userId
        });

        if (!inTable) {
            await knex(TABLES.TC_PLANNER).insert({
                character_id: characterId,
                user_id: userId,
                tired: true
            });

            res.send(`checked ${name}`);
        } else {
            await knex(TABLES.TC_PLANNER)
                .where({
                    character_id: characterId,
                    user_id: userId
                })
                .del();

            res.send(`unchecked ${name}`);
        }
    }
});

router.post("/tc_planner_global_refresh", async function (req, res, next) {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const user_id = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        await knex(TABLES.TC_PLANNER).where({ user_id }).del();

        res.send("global refresh complete");
    }
});

router.post("/update_character", async function (req, res, next) {
    const { name } = req.query;
    let level = null;
    let ready = null;
    let favorite = null;
    let target_level = null;

    if (req.query.level) {
        level = parseInt(req.query.level, 10);
    }
    if (req.query.ready) {
        ready = req.query.ready === "true";
    }
    if (req.query.favorite) {
        favorite = req.query.favorite === "true";
    }

    if (level !== null && (level < 0 || level > 10)) {
        return;
    }

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const characterId = await knex(TABLES.CHARACTERS)
            .where({ name })
            .first()
            .then((character) => {
                if (character && character.id) {
                    return character.id;
                } else {
                    console.log("no character id", name);
                }
            });

        await knex(TABLES.USERS_TO_CHARACTERS)
            .first()
            .where({
                character_id: characterId,
                user_id: userId
            })
            .then((character) => {
                // If character is not in table, add it.
                // If it is, update the info.
                if (!character) {
                    // don't add unobtained characters unless
                    // they are marked as favorite or ready
                    if (level > 0 || favorite || ready) {
                        return knex(TABLES.USERS_TO_CHARACTERS)
                            .insert({
                                user_id: userId,
                                character_id: characterId,
                                level,
                                ready,
                                favorite
                            })
                            .then(() => {
                                res.send(`added ${name}`);
                            });
                    }
                } else {
                    if (level === null) {
                        level = character.level;
                    }
                    if (ready === null) {
                        ready = character.ready;
                    }
                    if (favorite === null) {
                        favorite = character.favorite;
                    }
                    if (favorite && character.target_level) {
                        target_level = character.target_level;
                    }

                    if (level === 0 && !ready && !favorite) {
                        //Remove from table if unobtained
                        //unless ready or favorite
                        return knex(TABLES.USERS_TO_CHARACTERS)
                            .where({
                                character_id: characterId,
                                user_id: userId
                            })
                            .del()
                            .then(() => {
                                res.send(`deleted ${name}`);
                            });
                    } else {
                        // favorite false if character maxed
                        if (level === 10) {
                            favorite = false;
                        }

                        return knex(TABLES.USERS_TO_CHARACTERS)
                            .where({
                                character_id: characterId,
                                user_id: userId
                            })
                            .update({
                                user_id: userId,
                                character_id: characterId,
                                level,
                                ready,
                                favorite,
                                target_level
                            })
                            .then(() => {
                                res.send(`updated ${name} to ${level}`);
                            });
                    }
                }
            })
            .catch((error) => {
                //TODO: handle errors e.g. sending character name
                //that doesn't exist
                res.send({ message: error });
            });
    }
});

router.post("/update_building", async function (req, res, next) {
    const { name, level } = req.query;

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const buildingId = await knex(TABLES.BUILDINGS)
            .where({ name })
            .first()
            .then((building) => {
                return building.id;
            });

        await knex(TABLES.USERS_TO_BUILDINGS)
            .where({
                building_id: buildingId,
                user_id: userId
            })
            .first()
            .then((building) => {
                // If building is not in table, add it.
                // If it is, update the info.
                if (!building && parseInt(level, 10) > -1) {
                    return knex(TABLES.USERS_TO_BUILDINGS)
                        .insert({
                            user_id: userId,
                            building_id: buildingId,
                            level
                        })
                        .then(() => {
                            res.send(`added ${name}`);
                        });
                } else {
                    if (parseInt(level, 10) === -1) {
                        //Remove from table if unobtained
                        return knex(TABLES.USERS_TO_BUILDINGS)
                            .where({
                                building_id: buildingId,
                                user_id: userId
                            })
                            .del()
                            .then(() => {
                                res.send(`deleted ${name}`);
                            });
                    } else {
                        return knex(TABLES.USERS_TO_BUILDINGS)
                            .where({
                                building_id: buildingId,
                                user_id: userId
                            })
                            .update({
                                user_id: userId,
                                building_id: buildingId,
                                level
                            })
                            .then(() => {
                                res.send(`updated ${name} to ${level}`);
                            });
                    }
                }
            })
            .catch((error) => {
                //TODO: handle errors e.g. sending character name
                //that doesn't exist
                res.send("error");
            });
    }
});

router.post("/update_float", async function (req, res, next) {
    const { name, batchUpdate, have } = req.query;

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const groupId = await knex(TABLES.CHARACTER_GROUPS)
            .where({ name })
            .first()
            .then((group) => {
                return group.id;
            });

        if (groupId) {
            await knex(TABLES.USERS_TO_FLOATS)
                .first()
                .where({
                    character_group_id: groupId,
                    user_id: userId
                })
                .then((float) => {
                    // Toggle float if not doing batch update:
                    // If float is not in table, add it.
                    // If it is, remove it.
                    // If doing batch update, check
                    // desired value.
                    if (batchUpdate !== "true") {
                        if (!float) {
                            return knex(TABLES.USERS_TO_FLOATS)
                                .insert({
                                    user_id: userId,
                                    character_group_id: groupId
                                })
                                .then(() => {
                                    res.send(`added ${name} float`);
                                });
                        } else {
                            //Remove from table if unobtained
                            return knex(TABLES.USERS_TO_FLOATS)
                                .where({
                                    character_group_id: groupId,
                                    user_id: userId
                                })
                                .del()
                                .then(() => {
                                    res.send(`deleted ${name} float`);
                                });
                        }
                    } else {
                        // Batch updates
                        // If we have float in table
                        // but not in updated data, remove it
                        // If we don't have float in table
                        // but should, add it
                        if (float) {
                            if (have !== "true") {
                                return knex(TABLES.USERS_TO_FLOATS)
                                    .where({
                                        character_group_id: groupId,
                                        user_id: userId
                                    })
                                    .del()
                                    .then(() => {
                                        res.send(`deleted ${name} float`);
                                    });
                            } else {
                                res.send(`kept ${name} float`);
                            }
                        } else {
                            if (have === "true") {
                                return knex(TABLES.USERS_TO_FLOATS)
                                    .insert({
                                        user_id: userId,
                                        character_group_id: groupId
                                    })
                                    .then(() => {
                                        res.send(`added ${name} float`);
                                    });
                            } else {
                                res.send(`kept ${name} float removed`);
                            }
                        }
                    }
                })
                .catch((error) => {
                    //TODO: handle errors e.g. sending character name
                    //that doesn't exist
                    res.send("error");
                });
        } else {
            console.log("no group id for", name);
        }
    }
});

router.post("/update_costume", async function (req, res, next) {
    const { name, character, batchUpdate, have } = req.query;

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const costumeInfo = await knex(TABLES.COSTUMES)
            .where({ key: `${name}-${character}` })
            .first()
            .then((costume) => {
                return costume;
            });

        if (costumeInfo && costumeInfo.id) {
            const costumeId = costumeInfo.id;
            await knex(TABLES.USERS_TO_COSTUMES)
                .where({
                    costume_id: costumeId,
                    user_id: userId
                })
                .first()
                .then((costume) => {
                    // Toggle costume
                    // If costume is not in table, add it.
                    // If it is, remove it.
                    if (!batchUpdate) {
                        if (!costume) {
                            return knex(TABLES.USERS_TO_COSTUMES)
                                .insert({
                                    user_id: userId,
                                    costume_id: costumeId
                                })
                                .then(() => {
                                    res.send(
                                        `added ${character} ${name} costume`
                                    );
                                });
                        } else {
                            //Remove from table if unobtained
                            return knex(TABLES.USERS_TO_COSTUMES)
                                .where({
                                    user_id: userId,
                                    costume_id: costumeId
                                })
                                .del()
                                .then(() => {
                                    res.send(
                                        `deleted ${character} ${name} costume`
                                    );
                                });
                        }
                    } else {
                        // Batch updates
                        // If we have float in table
                        // but not in updated data, remove it
                        // If we don't have float in table
                        // but should, add it
                        if (costume) {
                            if (have !== "true") {
                                return knex(TABLES.USERS_TO_COSTUMES)
                                    .where({
                                        costume_id: costumeId,
                                        user_id: userId
                                    })
                                    .del()
                                    .then(() => {
                                        res.send(`deleted ${name} costume`);
                                    });
                            } else {
                                res.send(`kept ${name} costume`);
                            }
                        } else {
                            if (have === "true") {
                                return knex(TABLES.USERS_TO_COSTUMES)
                                    .insert({
                                        user_id: userId,
                                        costume_id: costumeId
                                    })
                                    .then(() => {
                                        res.send(`added ${name} costume`);
                                    });
                            } else {
                                res.send(`kept ${name} costume removed`);
                            }
                        }
                    }
                })
                .catch((error) => {
                    //TODO: handle errors e.g. sending character name
                    //that doesn't exist
                    res.send("error");
                });
        } else {
            console.log(`no ${character} ${name} costume`);
            res.send("no costume");
        }
    }
});

router.post("/update_concession", async function (req, res, next) {
    const { name } = req.query;

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const concessionId = await knex(TABLES.CONCESSIONS)
            .where({ name })
            .first()
            .then((concession) => {
                return concession.id;
            });

        await knex(TABLES.USERS_TO_CONCESSIONS)
            .where({
                concession_id: concessionId,
                user_id: userId
            })
            .first()
            .then((concession) => {
                // Toggle concession
                // If concession is not in table, add it.
                // If it is, remove it.
                if (!concession) {
                    return knex(TABLES.USERS_TO_CONCESSIONS)
                        .insert({
                            user_id: userId,
                            concession_id: concessionId
                        })
                        .then(() => {
                            res.send(`added ${name} concession`);
                        });
                } else {
                    //Remove from table if unobtained
                    return knex(TABLES.USERS_TO_CONCESSIONS)
                        .where({
                            user_id: userId,
                            concession_id: concessionId
                        })
                        .del()
                        .then(() => {
                            res.send(`deleted ${character} ${name} concession`);
                        });
                }
            })
            .catch((error) => {
                //TODO: handle errors e.g. sending character name
                //that doesn't exist
                res.send("error");
            });
    }
});

router.post("/update_option", async function (req, res, next) {
    const { name, value } = req.query;

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const optionId = await knex(TABLES.OPTIONS)
            .where({ name })
            .first()
            .then((option) => {
                if (!option) {
                    console.log(name);
                }
                return option.id;
            });

        await knex(TABLES.USER_OPTIONS)
            .where({ option_id: optionId, user_id: userId })
            .first()
            .then((option) => {
                if (!option) {
                    // If option not in table, it is a new option, add it
                    return knex(TABLES.USER_OPTIONS)
                        .insert({
                            user_id: userId,
                            option_id: optionId,
                            value
                        })
                        .then(() => {
                            res.send(`added option ${name} as ${value}`);
                        });
                } else {
                    return knex(TABLES.USER_OPTIONS)
                        .where({
                            user_id: userId,
                            option_id: optionId
                        })
                        .update({
                            user_id: userId,
                            option_id: optionId,
                            value
                        })
                        .then(() => {
                            res.send(`updated ${name} to ${value}`);
                        });
                }
            })
            .catch((error) => {
                res.send("error");
            });
    }
});

router.post("/set_target_level", async function (req, res, next) {
    const { name } = req.query;
    const target_level = parseInt(req.query.target_level, 10);

    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error("Invalid session");

        error.status = 400;

        return next(error);
    } else {
        const { username } = Session.parse(sessionString);

        const userId = await knex(TABLES.USERS)
            .where({ username })
            .first()
            .then((user) => {
                return user.id;
            });

        const characterId = await knex(TABLES.CHARACTERS)
            .where({ name })
            .first()
            .then((character) => {
                if (character && character.id) {
                    return character.id;
                } else {
                    console.log("no character id", name);
                }
            });

        const character = await knex(TABLES.USERS_TO_CHARACTERS).first().where({
            character_id: characterId,
            user_id: userId
        });

        // If no character entry, it's unobtained
        // and we need to add it
        if (!character) {
            await knex(TABLES.USERS_TO_CHARACTERS)
                .insert({
                    character_id: characterId,
                    user_id: userId,
                    level: 0,
                    target_level,
                    favorite: true
                })
                .then(() => {
                    res.send("success");
                });
        } else {
            if (character.level < target_level) {
                await knex(TABLES.USERS_TO_CHARACTERS)
                    .where({
                        character_id: characterId,
                        user_id: userId
                    })
                    .update({ target_level, favorite: true })
                    .then(() => {
                        res.send("success");
                    });
            } else {
                await knex(TABLES.USERS_TO_CHARACTERS)
                    .where({
                        character_id: characterId,
                        user_id: userId
                    })
                    .update({ target_level: null })
                    .then(() => {
                        res.send("success");
                    });
            }
        }
    }
});

module.exports = router;
