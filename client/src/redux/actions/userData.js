import _ from "lodash";
import axios from "axios";
import { USERDATA } from "../types";

export const fetchUserData = () => async (dispatch) => {
    dispatch({ type: USERDATA.FETCH });

    try {
        const res = await axios({
            method: "get",
            url: "/api/user/data"
        });
        dispatch({ type: USERDATA.FETCH_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: USERDATA.FETCH_ERROR, message: error.message });
    }
};

export const fetchUserDataType = (dataType) => async (dispatch) => {
    dispatch({ type: USERDATA.FETCH });

    try {
        const res = await axios({
            method: "get",
            url: `/api/user/${dataType}`
        });
        dispatch({ type: USERDATA.FETCH_SUCCESS, payload: res.data });
    } catch (err) {
        console.error(`error fetching user ${dataType}`, err);
    }
};

export const setDefaultData = () => {
    return async (dispatch) => {
        dispatch({
            type: USERDATA.BATCH_UPDATE,
            updatingMessage: "Beginning DB update"
        });

        const characters = await axios.get("/api/app/character_list");

        for (let char of characters.data) {
            dispatch({
                type: USERDATA.BATCH_UPDATE,
                updatingMessage: `Setting ${char.name} to level 1`
            });
            await axios({
                method: "post",
                url: "/api/user/update_character",
                params: {
                    name: char.name,
                    level: 1,
                    ready: false,
                    favorite: false
                }
            });
        }

        const buildings = await axios.get("/api/app/building_list");

        for (let building of buildings.data.buildings) {
            dispatch({
                type: USERDATA.BATCH_UPDATE,
                updatingMessage: `Setting ${building.name} to level 0`
            });
            await axios({
                method: "post",
                url: "/api/user/update_building",
                params: { name: building.name, level: 0 }
            });
        }

        dispatch(fetchUserData());
    };
};

export const batchUpdateUserData = async (userData, appData) => (dispatch) => {
    const { characters, goalChars, buildings, floats, costumes } = userData;
    dispatch({ type: USERDATA.BATCH_UPDATE, updating: "characters" });

    let charCount = 0;
    let buildingCount = 0;
    let floatCount = 0;
    let costumeCount = 0;

    return Promise.all(
        appData.characters.forEach(({ name }) => {
            const userChar = _.find(characters, { name });
            charCount++;
            if (userChar) {
                const { status, ready } = userChar;

                if (!isNaN(status)) {
                    return axios({
                        method: "post",
                        url: "/api/user/update_character",
                        params: {
                            name,
                            level: status,
                            ready,
                            favorite: goalChars.includes(name)
                        }
                    });
                }
            } else {
                // make sure unobtained are removed from table if there
                return axios({
                    method: "post",
                    url: "/api/user/update_character",
                    params: {
                        name,
                        level: 0,
                        ready: false,
                        favorite: goalChars.includes(name)
                    }
                });
            }
        })
    ).then(() => {
        if (charCount >= appData.characters.length) {
            dispatch({ type: USERDATA.BATCH_UPDATE, updating: "buildings" });
            return Promise.all(
                buildings.map(({ name, level }) => {
                    buildingCount++;
                    if (level > -1) {
                        return axios({
                            method: "post",
                            url: "/api/user/update_building",
                            params: { name, level }
                        });
                    } else {
                        return axios({
                            method: "post",
                            url: "/api/user/update_building",
                            params: { name, level: -1 }
                        });
                    }
                })
            )
                .then(() => {
                    dispatch({
                        type: USERDATA.BATCH_UPDATE,
                        updating: "floats"
                    });
                    if (buildingCount >= buildings.length) {
                        return Promise.all(
                            floats.map(({ name, have }) => {
                                floatCount++;
                                return axios({
                                    method: "post",
                                    url: "/api/user/update_float",
                                    params: { name, batchUpdate: true, have }
                                });
                            })
                        );
                    }
                })
                .then(() => {
                    dispatch({
                        type: USERDATA.BATCH_UPDATE,
                        updating: "costumes"
                    });
                    if (floatCount >= floats.length) {
                        return Promise.all(
                            costumes.map(({ name, character, have }) => {
                                costumeCount++;
                                return axios({
                                    method: "post",
                                    url: "/api/user/update_costume",
                                    params: {
                                        name,
                                        character,
                                        batchUpdate: true,
                                        have
                                    }
                                });
                            })
                        ).then(() => {
                            if (costumeCount >= costumes.length) {
                                dispatch(fetchUserData());
                            }
                        });
                    }
                });
        }
    });
};

export const updateUserCharacterData =
    ({ name, level, ready, favorite, target_level }) =>
    async (dispatch) => {
        if (level < 0 || level > 10) {
            return;
        }

        dispatch({ type: "updating", updating: { name, type: "character" } });

        try {
            await axios({
                method: "post",
                url: "/api/user/update_character",
                params: { name, level, ready, favorite, target_level }
            });
            dispatch({
                type: USERDATA.UPDATE_CHARACTER,
                payload: { name, level, ready, favorite, target_level }
            });
        } catch (err) {
            console.error("error updating character", err);
        }
    };

export const updateUserBuildingData =
    ({ name, level }) =>
    async (dispatch) => {
        dispatch({ type: "updating", updating: { name, type: "building" } });

        try {
            await axios({
                method: "post",
                url: "/api/user/update_building",
                params: { name, level }
            });
            dispatch({
                type: USERDATA.UPDATE_ATTRACTION,
                payload: { name, level }
            });
        } catch (err) {
            console.error("error updating attraction", name);
            console.error(err);
        }
    };

export const updateUserFloatData = (name) => (dispatch) => {
    dispatch({ type: "updating", updating: { name, type: "float" } });

    return axios({
        method: "post",
        url: "/api/user/update_float",
        params: { name }
    }).then(() => {
        dispatch(fetchUserData());
    });
};

export const updateUserCostumeData = (name, character) => (dispatch) => {
    dispatch({
        type: "updating",
        updating: { name, character, type: "costume" }
    });

    return axios({
        method: "post",
        url: "/api/user/update_costume",
        params: { name, character }
    }).then(() => {
        dispatch(fetchUserData());
    });
};

export const updateUserConcessionData = (name) => (dispatch) => {
    return axios({
        method: "post",
        url: "/api/user/update_concession",
        params: { name }
    }).then((res) => {
        dispatch({ type: "updating", updating: { name, type: "concession" } });

        dispatch(fetchUserData());
    });
};

export const updateUserOptionData = (name, value) => (dispatch) => {
    return axios({
        method: "post",
        url: "/api/user/update_option",
        params: { name, value }
    }).then((res) => {
        dispatch({ type: "updating", updating: { name, type: "option" } });

        dispatch(fetchUserData());
    });
};

export const setTargetLevel = (name, target_level) => async (dispatch) => {
    dispatch({ type: "updating", updating: { name, type: "character" } });

    try {
        await axios({
            method: "post",
            url: "/api/user/set_target_level",
            params: { name, target_level }
        });
        dispatch({
            type: USERDATA.UPDATE_TARGET_LEVEL,
            payload: { name, target_level }
        });
    } catch (err) {
        console.error("error setting target level", err);
    }
};

export const clearUserData = () => {
    return { type: USERDATA.CLEAR_USERDATA };
};
