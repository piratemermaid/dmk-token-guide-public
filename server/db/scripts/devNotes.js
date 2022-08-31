const TABLES = require("../../data/tables");
const { knex } = require("../../models/config");
const devNotes = require("../../data/devNotes");

async function updateTable() {
    await knex(TABLES.DEV_NOTES).del();
    await knex.raw(`ALTER SEQUENCE ${TABLES.DEV_NOTES}_id_seq RESTART WITH 1`);

    for (let type in devNotes) {
        if (type === "version") {
            await knex(TABLES.DEV_NOTES)
                .insert({ type: "version", desc: devNotes[type] })
                .then(() => {
                    console.log("version", devNotes[type]);
                });
        } else {
            let i = 0;
            for (let item of devNotes[type]) {
                i++;
                const { desc, inProgress, date } = item;

                await knex(TABLES.DEV_NOTES)
                    .insert({
                        type: type === "done" ? item.type : type,
                        desc,
                        done: type === "done" ? true : false,
                        inProgress: inProgress || null,
                        order: i,
                        date
                    })
                    .then(() => {
                        console.log(`added ${type} - ${desc} (${date})`);
                    });
            }
        }
    }

    console.log("done");
    process.exit(0);
}

updateTable();
