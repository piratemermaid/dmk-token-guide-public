import { USERDATA } from "../types";
import fetchStates from "../fetchStates";

const DEFAULT_USERDATA = {
    status: null,
    characters: [],
    buildings: [],
    costumes: [],
    floats: [],
    updating: null,
    updatingMessage: null,
    userDataIsLoaded: false
};

const userData = (state = DEFAULT_USERDATA, action) => {
    switch (action.type) {
        case USERDATA.FETCH:
            return { ...state, status: fetchStates.fetching, updating: null };
        case USERDATA.FETCH_ERROR:
            return {
                ...state,
                message: action.message,
                status: fetchStates.error,
                updating: null,
                userDataIsLoaded: true
            };
        case USERDATA.FETCH_SUCCESS:
            if (action.payload) {
                return {
                    ...state,
                    ...action.payload,
                    status: fetchStates.success,
                    updating: null,
                    userDataIsLoaded: true
                };
            }
        case USERDATA.BATCH_UPDATE:
            return {
                ...state,
                status: fetchStates.fetching,
                updating: action.updating,
                updatingMessage: action.updatingMessage
            };
        case "updating":
            return { ...state, status: "updating", updating: action.updating };
        case USERDATA.UPDATE_CHARACTER:
            const updatedChar = action.payload;
            if (updatedChar.level >= 0) {
                // Update character's data if already in state
                if (_.find(state.characters, { name: updatedChar.name })) {
                    return {
                        ...state,
                        characters: state.characters.map((char) => {
                            if (char.name === updatedChar.name) {
                                return updatedChar;
                            } else {
                                return char;
                            }
                        }),
                        updating: null
                    };
                } else {
                    // Add character to state if previously unobtained
                    return {
                        ...state,
                        characters: [...state.characters, updatedChar],
                        updating: null
                    };
                }
            } else {
                // Remove character from state if level set to 0
                return {
                    ...state,
                    characters: _.compact(
                        state.characters.map((char) => {
                            if (char.name) {
                                if (char.name !== updatedChar.name) {
                                    return char;
                                }
                            }
                        })
                    ),
                    updating: null
                };
            }
        case USERDATA.UPDATE_TARGET_LEVEL:
            return {
                ...state,
                characters: state.characters.map((char) => {
                    if (char.name === action.payload.name) {
                        return {
                            ...char,
                            favorite: true,
                            target_level: action.payload.target_level
                        };
                    } else {
                        return char;
                    }
                }),
                updating: null
            };
        case USERDATA.UPDATE_ATTRACTION:
            const updatedAttr = action.payload;
            if (updatedAttr.level > -1) {
                // Update attraction data if already in state
                if (_.find(state.buildings, { name: updatedAttr.name })) {
                    return {
                        ...state,
                        buildings: state.buildings.map((building) => {
                            if (building.name === updatedAttr.name) {
                                return updatedAttr;
                            } else {
                                return building;
                            }
                        }),
                        updating: null
                    };
                } else {
                    // Add attraction to state if previously unobtained
                    return {
                        ...state,
                        buildings: [...state.buildings, updatedAttr],
                        updating: null
                    };
                }
            } else {
                return {
                    ...state,
                    buildings: _.compact(
                        state.buildings.map((building) => {
                            if (building.name !== updatedAttr.name) {
                                return building;
                            }
                        })
                    ),
                    updating: null
                };
            }
        case USERDATA.CLEAR_USERDATA:
            return {
                ...state,
                characters: [],
                buildings: [],
                costumes: [],
                floats: []
            };
        default:
            return state;
    }
};

export default userData;
