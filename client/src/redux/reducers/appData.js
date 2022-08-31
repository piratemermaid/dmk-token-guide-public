import { APPDATA } from "../types";
import fetchStates from "../fetchStates";

const DEFAULT_APPDATA = {
    status: null,
    characters: [],
    buildings: [],
    costumes: [],
    groups: [],
    event: {},
    appDataIsLoaded: false
};

const appData = (state = DEFAULT_APPDATA, action) => {
    switch (action.type) {
        case APPDATA.FETCH:
            return { ...state, status: fetchStates.fetching };
        case APPDATA.FETCH_ERROR:
            return {
                ...state,
                message: action.message,
                status: fetchStates.error
            };
        case APPDATA.FETCH_SUCCESS:
            if (action.dataType) {
                let data = state.data;
                data[action.dataType] = action.data;
                return {
                    ...state,
                    data,
                    status: fetchStates.success
                };
            } else {
                return {
                    ...state,
                    ...action.data,
                    status: fetchStates.success,
                    appDataIsLoaded: true
                };
            }
        case APPDATA.FETCH_EVENT_DATA:
            return {
                ...state,
                event: action.payload
            };
        case APPDATA.FETCH_CHARACTER_GROUPS:
            return {
                ...state,
                groups: action.payload
            };
        case APPDATA.FETCH_ATTRACTION_ORDER:
            return {
                ...state,
                buildingGroupOrder: action.payload
            };
        default:
            return state;
    }
};

export default appData;
