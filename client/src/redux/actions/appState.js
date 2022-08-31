import axios from "axios";
import { APPSTATE } from "../types";
import { fetchUserData, clearUserData } from "./userData";

export const signIn = () => {
    return { type: APPSTATE.AUTH_USER, authenticated: true };
};

export const signOut = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get("/api/account/logout");
            if ((res.message = "success")) {
                clearUserData();
                dispatch({ type: APPSTATE.AUTH_USER, authenticated: false });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

// Check if user is authenticated (when app is refreshed,
// or loads and user is still signed in)
export const checkIfAuthenticated = () => {
    return async (dispatch) => {
        const res = await axios.get("/api/account/authenticated");
        const { authenticated } = res.data;
        dispatch({ type: APPSTATE.AUTH_USER, authenticated });
    };
};

// Set user as authenticated after they
// successfully verify their email
export const authenticateAfterEmailVerif = () => {
    return { type: APPSTATE.AUTH_USER, authenticated: true };
};

export const toggleWorkMode = () => {
    return { type: APPSTATE.TOGGLE_WORK_MODE };
};

export const toggleNightMode = () => {
    return { type: APPSTATE.TOGGLE_NIGHT_MODE };
};
