import { combineReducers } from "redux";

import appData from "./appData";
import userData from "./userData";
import appState from "./appState";

export default combineReducers({ appData, userData, appState });
