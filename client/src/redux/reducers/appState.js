import { APPSTATE } from "../types";
import { LS } from "../../utils/globals";

const DEFAULT_APPSTATE = {
    authenticated: false,
    workMode: false,
    nightMode: false
};

const appState = (state = DEFAULT_APPSTATE, action) => {
    switch (action.type) {
        case APPSTATE.AUTH_USER:
            return { ...state, authenticated: action.authenticated };
        case APPSTATE.TOGGLE_WORK_MODE:
            localStorage.setItem(LS.WORK_MODE, !state.workMode);
            return { ...state, workMode: !state.workMode };
        case APPSTATE.TOGGLE_NIGHT_MODE:
            if (!state.nightMode) {
                document.getElementsByTagName("body")[0].style.background =
                    "rgb(49, 49, 49)";
            } else {
                document.getElementsByTagName("body")[0].style.background =
                    "white";
            }
            localStorage.setItem(LS.NIGHT_MODE, !state.nightMode);
            return { ...state, nightMode: !state.nightMode };
        default:
            return state;
    }
};

export default appState;
