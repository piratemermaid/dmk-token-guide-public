import _ from "lodash";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./components/Router";
import SiteWarning from "./components/SiteWarning";

import "./styles/main.scss";
import "./styles/collection.scss";
import "./styles/event.scss";
import "./styles/lookup.scss";
import "./styles/options.scss";

import { fetchAppData } from "./redux/actions/appData";
import { fetchUserData } from "./redux/actions/userData";
import {
    checkIfAuthenticated,
    toggleWorkMode,
    toggleNightMode
} from "./redux/actions/appState";
import { LS } from "./utils/globals";

const CLIENT_VERSION = "2.6.5";

const App = () => {
    const [levelFilters, setLevelFilters] = useState([]);
    const [rarityFilters, setRarityFilters] = useState([]);
    const [selectedToken, setSelectedToken] = useState({});

    const {
        appState: { nightMode },
        appData
    } = useSelector((state) => state);

    const dispatch = useDispatch();

    /**
     * Update state for level filters on Leveling page
     * @param {integer} lv: selected level
     */
    const updateLevelFilters = (lv) => {
        let levelFilters = [];
        for (let i in levelFilters) {
            levelFilters.push(levelFilters[i]);
        }

        if (levelFilters.includes(lv)) {
            const index = levelFilters.indexOf(lv);
            levelFilters.splice(index, 1);
        } else {
            levelFilters.push(lv);
        }

        setLevelFilters(levelFilters);
    };

    /**
     * Update state for rarity filters on Leveling page
     * @param {string} rarity: selected rarity
     */
    const updateRarityFilters = (rarity) => {
        let rarityFilters = [];
        for (let i in rarityFilters) {
            rarityFilters.push(rarityFilters[i]);
        }

        if (rarityFilters.includes(rarity)) {
            const index = rarityFilters.indexOf(rarity);
            rarityFilters.splice(index, 1);
        } else {
            rarityFilters.push(rarity);
        }

        setRarityFilters(rarityFilters);
    };

    /**
     * Set the selected token from TokenGuide
     * so it's saved if user navigates back to the page later
     * @param {object} selectedToken with name and type
     * e.g. { name: "Mickey Mouse", type: "character" }
     */
    const updateSelectedToken = (selectedToken) => {
        setSelectedToken(selectedToken);
    };

    /**
     * Order characters/tokens by:
     * event special tokens -> event characters -> characters -> special tokens -> fabric tokens
     */
    const getTokenOrder = () => {
        if (appData.status === "success") {
            const { characters, specialTokens, fabricTokens, event } = appData;

            let tokenOrder = [];

            if (event.specialTokens) {
                for (let token of event.specialTokens) {
                    tokenOrder.push({ name: token, type: "special" });
                }
            }

            if (event.characters) {
                for (let char of event.characters) {
                    tokenOrder.push({ name: char, type: "character" });
                }
            }

            for (let char of characters) {
                if (!_.find(tokenOrder, { name: char.name })) {
                    tokenOrder.push({ name: char.name, type: "character" });
                }
            }

            for (let token of specialTokens) {
                if (!_.find(tokenOrder, { name: token.name })) {
                    if (token.mini_event) {
                        tokenOrder.push({
                            name: token.name,
                            type: "special",
                            mini_event: token.mini_event
                        });
                    } else {
                        tokenOrder.push({
                            name: token.name,
                            type: "special"
                        });
                    }
                }
            }

            for (let token of fabricTokens) {
                if (!_.find(tokenOrder, { name: token.name })) {
                    tokenOrder.push({ name: token.name, type: "fabric" });
                }
            }

            return tokenOrder;
        }
    };

    useEffect(() => {
        // Fetch app data
        dispatch(fetchAppData());

        // Check workMode and nightMode in localStorage
        // and toggle in redux if true (default false)
        const workMode = localStorage.getItem(LS.WORK_MODE);
        if (workMode === "true") {
            dispatch(toggleWorkMode());
        }
        const nightMode = localStorage.getItem(LS.NIGHT_MODE);
        if (nightMode === "true") {
            dispatch(toggleNightMode());
        }

        dispatch(checkIfAuthenticated());
        dispatch(fetchUserData());
    }, []);

    // Set dark background if night mode
    if (nightMode) {
        document.getElementsByTagName("body")[0].style.background =
            "rgb(49, 49, 49)";
    }

    return (
        <QueryClientProvider client={new QueryClient()}>
            <div id="app" className={nightMode ? "nightMode" : ""}>
                {/* <SiteWarning /> */}
                <Router
                    userVersion={CLIENT_VERSION}
                    levelFilters={levelFilters}
                    rarityFilters={rarityFilters}
                    selectedToken={selectedToken}
                    tokenOrder={getTokenOrder}
                    updateSelectedToken={updateSelectedToken}
                    updateLevelFilters={updateLevelFilters}
                    updateRarityFilters={updateRarityFilters}
                />
            </div>
        </QueryClientProvider>
    );
};

export default App;
