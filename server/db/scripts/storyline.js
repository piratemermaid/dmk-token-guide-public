const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");
const eventStoryline = require("../../data/eventStoryline");

async function updateEventStoryline() {
    await knex(TABLES.EVENT_STORYLINE).del();
    await knex(TABLES.EVENT_STORYLINE_CHARACTERS).del();
    await knex(TABLES.EVENT_STORYLINE_SPECIAL_TOKENS).del();
    await knex.raw(
        `ALTER SEQUENCE ${TABLES.EVENT_STORYLINE}_id_seq RESTART WITH 1`
    );
    await knex.raw(
        `ALTER SEQUENCE ${TABLES.EVENT_STORYLINE_CHARACTERS}_id_seq RESTART WITH 1`
    );
    await knex.raw(
        `ALTER SEQUENCE ${TABLES.EVENT_STORYLINE_SPECIAL_TOKENS}_id_seq RESTART WITH 1`
    );

    for (let item of eventStoryline) {
        const {
            type,
            date,
            name,
            time,
            EC,
            common,
            token,
            ears,
            characters,
            order,
            key,
            requirement,
            amount,
            specialTokens,
            subtask
        } = item;

        const exists = await knex(TABLES.EVENT_STORYLINE)
            .where({ key })
            .first()
            .then((result) => {
                return result;
            });

        if (!exists) {
            if (type === "welcome") {
                const character_id = await knex(TABLES.CHARACTERS)
                    .where({ name })
                    .first()
                    .then((char) => {
                        return char.id;
                    });

                const resultId = await knex(TABLES.EVENT_STORYLINE)
                    .insert({
                        key,
                        date,
                        order,
                        type,
                        time,
                        EC,
                        common,
                        token,
                        ears
                    })
                    .returning("id");
                const event_storyline_id = resultId[0];

                await knex(TABLES.EVENT_STORYLINE_CHARACTERS).insert({
                    character_id,
                    event_storyline_id,
                    level: null
                });

                console.log(`added welcome ${name}`);
            } else if (type === "quest") {
                const resultId = await knex(TABLES.EVENT_STORYLINE)
                    .insert({
                        key,
                        date,
                        order,
                        type,
                        time,
                        name,
                        subtask: subtask || false
                    })
                    .returning("id");
                const event_storyline_id = resultId[0];

                for (let char of characters) {
                    const { name, level } = char;

                    const character_id = await knex(TABLES.CHARACTERS)
                        .where({ name })
                        .first()
                        .then((char) => {
                            return char.id;
                        });

                    await knex(TABLES.EVENT_STORYLINE_CHARACTERS).insert({
                        character_id,
                        event_storyline_id,
                        level: level || null
                    });
                }

                console.log(`added quest ${name}`);
            } else if (type === "build") {
                await knex(TABLES.EVENT_STORYLINE)
                    .insert({
                        key,
                        date,
                        order,
                        type,
                        time,
                        name,
                        EC
                    })
                    .returning("id");

                console.log(`added build ${name}`);
            } else if (type === "collect") {
                const resultId = await knex(TABLES.EVENT_STORYLINE)
                    .insert({
                        key,
                        date,
                        order,
                        type,
                        time,
                        name,
                        requirement,
                        amount
                    })
                    .returning("id");
                const event_storyline_id = resultId[0];

                for (let char of characters) {
                    const { name, level } = char;

                    const character_id = await knex(TABLES.CHARACTERS)
                        .where({ name })
                        .first()
                        .then((char) => {
                            return char.id;
                        });

                    await knex(TABLES.EVENT_STORYLINE_CHARACTERS).insert({
                        character_id,
                        event_storyline_id,
                        level: level || null
                    });
                }

                console.log(`added collect ${name}`);
            } else if (type === "welcome") {
                const resultId = await knex(TABLES.EVENT_STORYLINE)
                    .insert({
                        key,
                        date,
                        order,
                        type,
                        time,
                        name,
                        requirement,
                        amount
                    })
                    .returning("id");
                const event_storyline_id = resultId[0];

                for (let char of characters) {
                    const { name, level } = char;

                    const character_id = await knex(TABLES.CHARACTERS)
                        .where({ name })
                        .first()
                        .then((char) => {
                            return char.id;
                        });

                    await knex(TABLES.EVENT_STORYLINE_CHARACTERS).insert({
                        character_id,
                        event_storyline_id,
                        level: level || null
                    });
                }

                for (let token of specialTokens) {
                    const { name, amount } = token;

                    const special_token_id = await knex(TABLES.SPECIAL_TOKENS)
                        .where({ name })
                        .first()
                        .then((tok) => {
                            return tok.id;
                        });

                    await knex(TABLES.EVENT_STORYLINE_SPECIAL_TOKENS).insert({
                        special_token_id,
                        event_storyline_id,
                        amount: amount || null
                    });
                }

                console.log(`added welcome ${name}`);
            } else if (type === "battle") {
                console.log({
                    type,
                    date,
                    name,
                    time,
                    characters,
                    order,
                    key,
                    requirement,
                    amount,
                    specialTokens
                });

                const resultId = await knex(TABLES.EVENT_STORYLINE)
                    .insert({
                        type,
                        date,
                        name,
                        time,
                        order,
                        key,
                        requirement,
                        amount
                    })
                    .returning("id");
                const event_storyline_id = resultId[0];

                for (let char of characters) {
                    const { name, level } = char;

                    const character_id = await knex(TABLES.CHARACTERS)
                        .where({ name })
                        .first()
                        .then((char) => {
                            return char.id;
                        });

                    await knex(TABLES.EVENT_STORYLINE_CHARACTERS).insert({
                        character_id,
                        event_storyline_id,
                        level: level || null
                    });
                }

                for (let token of specialTokens) {
                    const { name, amount } = token;

                    const special_token_id = await knex(TABLES.SPECIAL_TOKENS)
                        .where({ name })
                        .first()
                        .then((tok) => {
                            return tok.id;
                        });

                    await knex(TABLES.EVENT_STORYLINE_SPECIAL_TOKENS).insert({
                        special_token_id,
                        event_storyline_id,
                        amount: amount || null
                    });
                }

                console.log(`added battle $${name}`);
            } else {
                await knex(TABLES.EVENT_STORYLINE).insert({
                    type,
                    name,
                    key,
                    order,
                    date
                });
            }
        }
    }

    console.log("done");
    process.exit(0);
}

updateEventStoryline();
