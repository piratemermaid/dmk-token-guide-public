const _ = require("lodash");
const models = require("../../models/character");
const {
    groups,
    characters,
    characterTokens,
    floatCharacterTokens,
    floatGroupTokens
} = require("../../data/characterData");
const {
    buildings,
    buildingCharacterTokens,
    buildingGroupTokens,
    buildingFabricTokens,
    buildingSpecialTokens
} = require("../../data/buildingData");
const { costumes, fabricTokens } = require("../../data/costumeData");
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
const addTaskCharacter = require("./updatedb/addTaskCharacter");
const newTaskChars = require("./updatedb/newTaskChars");
const updateEvent = require("./updatedb/updateEvent");
const updateMagicCosts = require("./updatedb/updateMagicCosts");
const updateCharacterTokens = require("./updatedb/updateCharacterTokens");
const updateTokenNames = require("./updatedb/updateTokenNames");

/**
 * Scenarios to test
 * [x] add new group
 * [x] add new character
 * [x] update group nickname
 * [x] update float token drops (character & group done)
 * [x] update character nickname
 * [~] update token rarities (script for character, working here for special tokens, fabric tokens todo)
 * [x] update character magic costs - different script
 * [x] add new building
 * [x] update building token drops
 * [x] add new costume
 * [ ] add new fabric token + connect to related costume
 * [x] add new special token
 * [x] add new task + connect to task character(s)
 * [x] update task info e.g. time
 * [x] update task character level
 * [x] add task joint character - addTaskCharacter script
 * [x] add task building req
 * [x] change task building req level
 * [x] update task costume req
 * [x] delete task token drop
 * [x] add task token drop
 * [x] add concession
 * [x] change concession info
 * [x] change/remove event info - updateEvent script
 * [ ] delete stuff
 */

const modelArr = [
    { name: "CharacterGroup", data: groups },
    {
        name: "Character",
        data: characters,
        relations: [
            {
                modelName: "CharacterGroup",
                relationName: "group",
                property: "group",
                idName: "character_group_id",
                relationKey: "name" // name of property in relation table
            }
        ]
    },
    { name: "Task", data: tasks },
    { name: "Building", data: buildings },
    {
        name: "Costume",
        data: costumes,
        relations: [
            {
                modelName: "Character",
                relationName: "character",
                property: "character",
                idName: "character_id",
                relationKey: "name"
            }
        ]
    },
    {
        name: "SpecialToken",
        data: specialTokens,
        relations: [
            {
                modelName: "TokenRarity",
                relationName: "rarity",
                property: "rarity",
                idName: "token_rarity_id",
                relationKey: "name"
            }
        ]
    },
    { name: "Concession", data: concessions }
];

// modelName: "",
// relationName: "",
// property: "",
// idName: "",
// relationKey: ""

async function checkModels(modelArr) {
    console.log("> checking models");
    for (let model of modelArr) {
        console.log("checking", model.name);
        const { name, data, relations = [] } = model;

        // load all the data for this model
        const result = await models[name].fetchAll({
            withRelated: relations.map(({ relationName }) => {
                return relationName;
            })
        });

        // keyBy the data by key/unique identifier
        const resultByKey = _.keyBy(result.models, "attributes.key");
        // console.log(resultByKey);

        // loop over data and get object of key
        for (let i in data) {
            const { key } = data[i];

            // console.log(key);
            // loop over properties and do bookshelf .set, save if changed
            let keyModel = resultByKey[key];

            if (!keyModel) {
                keyModel = models[name].forge();
            }

            // loop over properties in data and check relationships
            for (let objectKey of Object.entries(data[i])) {
                const [property, value] = objectKey;

                const relationship = _.find(relations, { property });
                if (relationship) {
                    const {
                        relationKey,
                        modelName,
                        relationName,
                        idName,
                        ignore = false
                    } = relationship;
                    if (!ignore) {
                        if (
                            keyModel.related(relationName).get(relationKey) !==
                            value
                        ) {
                            // if not value it's supposed to be, go get the id
                            // and update the value
                            const relationModel = await models[modelName]
                                .forge({ [relationKey]: value })
                                .fetch();
                            keyModel.set(idName, relationModel.id);
                        }
                    }
                } else {
                    if (value === undefined) {
                        keyModel.set(property, null);
                    } else {
                        keyModel.set(property, value);
                    }
                }
            }

            if (keyModel.hasChanged()) {
                console.log(keyModel.changed);
                await keyModel.save();
            }
        }
    }
}

const mappingTables = [
    {
        name: "TaskCharacterToken",
        data: taskCharacterTokens,
        table1: {
            modelName: "Task",
            property: "task_key",
            idName: "task_id",
            relationKey: "key"
        },
        table2: {
            modelName: "CharacterToken",
            property: "token_key", //property in taskCharacterTokens (my data)
            idName: "character_token_id",
            relationKey: "key"
        }
    },
    {
        name: "TaskGroupToken",
        data: taskGroupTokens,
        table1: {
            modelName: "Task",
            property: "task_key",
            idName: "task_id",
            relationKey: "key"
        },
        table2: {
            modelName: "CharacterGroup",
            property: "name",
            idName: "group_id",
            relationKey: "name"
        }
    },
    {
        name: "TaskFabricToken",
        data: taskFabricTokens,
        table1: {
            modelName: "Task",
            property: "task_key",
            idName: "task_id",
            relationKey: "key"
        },
        table2: {
            modelName: "FabricToken",
            property: "name",
            idName: "fabric_token_id",
            relationKey: "name"
        }
    },
    {
        name: "TaskSpecialToken",
        data: taskSpecialTokens,
        table1: {
            modelName: "Task",
            property: "task_key",
            idName: "task_id",
            relationKey: "key"
        },
        table2: {
            modelName: "SpecialToken",
            property: "name",
            idName: "special_token_id",
            relationKey: "key"
        }
    },
    {
        name: "BuildingReq",
        data: taskBuildingRequirements,
        attributes: ["level"],
        table1: {
            modelName: "Task",
            property: "task_key",
            idName: "task_id",
            relationKey: "key"
        },
        table2: {
            modelName: "Building",
            property: "building_name",
            idName: "building_id",
            relationKey: "key"
        }
    },
    {
        name: "CostumeReq",
        data: taskCostumeRequirements,
        table1: {
            modelName: "Task",
            property: "task_key",
            idName: "task_id",
            relationKey: "key"
        },
        table2: {
            modelName: "Costume",
            property: "costume_key",
            idName: "costume_id",
            relationKey: "key"
        }
    },
    {
        name: "BuildingCharacterToken",
        data: buildingCharacterTokens,
        attributes: ["level"],
        table1: {
            modelName: "Building",
            property: "building_name",
            idName: "building_id",
            relationKey: "key"
        },
        table2: {
            modelName: "CharacterToken",
            property: "token_key",
            idName: "character_token_id",
            relationKey: "key"
        }
    },
    {
        name: "BuildingGroupToken",
        data: buildingGroupTokens,
        attributes: ["level"],
        table1: {
            modelName: "Building",
            property: "building_name",
            idName: "building_id",
            relationKey: "key"
        },
        table2: {
            modelName: "CharacterGroup",
            property: "name",
            idName: "group_id",
            relationKey: "name"
        }
    },
    {
        name: "BuildingFabricToken",
        data: buildingFabricTokens,
        attributes: ["level"],
        table1: {
            modelName: "Building",
            property: "building_name",
            idName: "building_id",
            relationKey: "key"
        },
        table2: {
            modelName: "FabricToken",
            property: "name",
            idName: "fabric_token_id",
            relationKey: "name"
        }
    },
    {
        name: "BuildingSpecialToken",
        data: buildingSpecialTokens,
        attributes: ["level"],
        table1: {
            modelName: "Building",
            property: "building_name",
            idName: "building_id",
            relationKey: "key"
        },
        table2: {
            modelName: "SpecialToken",
            property: "name",
            idName: "special_token_id",
            relationKey: "key"
        }
    },
    {
        name: "FloatCharacterToken",
        data: floatCharacterTokens,
        table1: {
            modelName: "CharacterGroup",
            property: "group",
            idName: "group_id",
            relationKey: "name"
        },
        table2: {
            modelName: "CharacterToken",
            property: "token_key",
            idName: "character_token_id",
            relationKey: "key"
        }
    },
    {
        name: "FloatGroupToken",
        data: floatGroupTokens,
        table1: {
            modelName: "CharacterGroup",
            property: "group",
            idName: "group_id",
            relationKey: "name"
        },
        table2: {
            modelName: "CharacterGroup",
            property: "token_group",
            idName: "group_token_id",
            relationKey: "name"
        }
    }
];

async function checkMappingTables(mappingTables) {
    for (let mappingTable of mappingTables) {
        console.log("checking", mappingTable.name, "...");
        const { name, data, attributes, table1, table2 } = mappingTable;

        for (let item of data) {
            const table1Model = await models[table1.modelName]
                .forge({ [table1.relationKey]: item[table1.property] })
                .fetch();

            if (!table1Model) {
                throw new Error(`didn't find ${item[table1.property]}`);
            }

            const table2Model = await models[table2.modelName]
                .forge({ [table2.relationKey]: item[table2.property] })
                .fetch()
                .catch((err) => {
                    console.log("item", item);
                    console.log("table2", table2);
                    console.log(err);
                });
            if (!table2Model) {
                throw new Error(`didn't find ${item[table2.property]}`);
            }

            let newModel = await models[name]
                .forge({
                    [table1.idName]: table1Model.id,
                    [table2.idName]: table2Model.id
                })
                .fetch({ require: false });

            if (item.remove) {
                if (newModel) {
                    console.log("remove");
                    await newModel.destroy();
                }
            } else {
                if (!newModel) {
                    newModel = models[name].forge({
                        [table1.idName]: table1Model.id,
                        [table2.idName]: table2Model.id
                    });
                }

                if (attributes) {
                    for (let attribute of attributes) {
                        newModel.set(attribute, item[attribute]);
                    }
                }

                if (newModel.hasChanged()) {
                    console.log(newModel.changed);
                    await newModel.save();
                }
            }
        }
    }
}

checkModels(modelArr)
    .then(() => {
        console.log("> checking mapping tables");
        return checkMappingTables(mappingTables);
    })
    .then(() => {
        console.log("> checking add task character");
        return addTaskCharacter();
    })
    .then(() => {
        console.log("> checking new task characters");
        return newTaskChars();
    })
    .then(() => {
        console.log("> checking event");
        return updateEvent();
    })
    .then(() => {
        console.log("> checking character token names");
        return updateTokenNames();
    })
    .then(() => {
        console.log("> checking character tokens");
        return updateCharacterTokens();
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        console.log(">> UPDATE DB FINISHED <<");
    })
    .then(() => {
        process.exit(0);
    });
