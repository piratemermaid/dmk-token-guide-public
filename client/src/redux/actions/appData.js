import axios from "axios";
import { APPDATA } from "../types";

export const fetchAppData = () => (dispatch) => {
    dispatch({ type: APPDATA.FETCH });

    let data = {};

    axios({
        method: "get",
        url: "/api/app/character_group_list"
    })
        .then((res) => {
            if (res.type === "error") {
                dispatch({ type: APPDATA.FETCH_ERROR, message: res.message });
            } else {
                data.groups = res.data;
            }
        })
        .then(() => {
            axios({
                method: "get",
                url: "/api/app/character_list"
            }).then((res) => {
                data.characters = res.data;
            });
        })
        .then(() => {
            axios({
                method: "get",
                url: "/api/app/building_list"
            })
                .then((res) => {
                    if (res.type === "error") {
                        dispatch({
                            type: APPDATA.FETCH_ERROR,
                            message: res.message
                        });
                    } else {
                        const { buildings, buildingGroupOrder } = res.data;
                        data.buildings = buildings;
                        data.buildingGroupOrder = buildingGroupOrder;
                    }
                })
                .then(() => {
                    axios({
                        method: "get",
                        url: "/api/app/costume_list"
                    })
                        .then((res) => {
                            if (res.type === "error") {
                                dispatch({
                                    type: APPDATA.FETCH_ERROR,
                                    message: res.message
                                });
                            } else {
                                data.costumes = res.data.costumes;
                                data.fabricTokens = res.data.fabricTokens;
                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: APPDATA.FETCH_ERROR,
                                message: error.message
                            });
                        });
                })
                .then(() => {
                    axios({
                        method: "get",
                        url: "/api/app/special_token_list"
                    })
                        .then((res) => {
                            if (res.type === "error") {
                                dispatch({
                                    type: APPDATA.FETCH_ERROR,
                                    message: res.message
                                });
                            } else {
                                data.specialTokens = res.data;
                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: APPDATA.FETCH_ERROR,
                                message: error.message
                            });
                        });
                })
                .then(() => {
                    axios({
                        method: "get",
                        url: "/api/app/concession_list"
                    })
                        .then((res) => {
                            if (res.type === "error") {
                                dispatch({
                                    type: APPDATA.FETCH_ERROR,
                                    message: res.message
                                });
                            } else {
                                data.concessions = res.data;
                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: APPDATA.FETCH_ERROR,
                                message: error.message
                            });
                        });
                })
                .then(() => {
                    axios({
                        method: "get",
                        url: "/api/app/event"
                    })
                        .then((res) => {
                            if (res.type === "error") {
                                dispatch({
                                    type: APPDATA.FETCH_ERROR,
                                    message: res.message
                                });
                            } else {
                                data.event = res.data;
                            }
                        })
                        .then(() => {
                            axios({
                                method: "get",
                                url: "/api/app/default_options"
                            })
                                .then((res) => {
                                    if (res.type === "error") {
                                        dispatch({
                                            type: APPDATA.FETCH_ERROR,
                                            message: res.message
                                        });
                                    } else {
                                        data.defaultOptions = res.data;
                                    }
                                })
                                .then(() => {
                                    axios({
                                        method: "get",
                                        url: "/api/app/gold_trophy_drops"
                                    }).then((res) => {
                                        if (res.type === "error") {
                                            dispatch({
                                                type: APPDATA.FETCH_ERROR,
                                                message: res.message
                                            });
                                        } else {
                                            data.goldTrophyDrops = res.data;
                                            dispatch({
                                                type: APPDATA.FETCH_SUCCESS,
                                                data
                                            });
                                        }
                                    });
                                });
                        });
                });
        })
        .catch((error) => {
            dispatch({ type: APPDATA.FETCH_ERROR, message: error.message });
        });
};

export const fetchEventData = () => (dispatch) => {
    axios({
        method: "get",
        url: "/api/app/event"
    }).then((res) => {
        dispatch({
            type: APPDATA.FETCH_EVENT_DATA,
            payload: res.data
        });
    });
};

export const fetchCharacterGroups = () => (dispatch) => {
    axios({
        method: "get",
        url: "/api/app/character_group_list"
    }).then((res) => {
        dispatch({
            type: APPDATA.FETCH_CHARACTER_GROUPS,
            payload: res.data
        });
    });
};

export const fetchAttractionGroupOrder = () => (dispatch) => {
    axios({
        method: "get",
        url: "/api/app/building_group_order"
    }).then((res) => {
        dispatch({
            type: APPDATA.FETCH_ATTRACTION_ORDER,
            payload: res.data
        });
    });
};
