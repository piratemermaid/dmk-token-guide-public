import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
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

const CLIENT_VERSION = "2.6.3";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            levelFilters: [],
            rarityFilters: [],
            selectedToken: {}
        };

        this.updateLevelFilters = this.updateLevelFilters.bind(this);
        this.updateRarityFilters = this.updateRarityFilters.bind(this);
        this.updateSelectedToken = this.updateSelectedToken.bind(this);
    }

    /**
     * Update state for level filters on Leveling page
     * @param {integer} lv: selected level
     */
    updateLevelFilters(lv) {
        let levelFilters = [];
        for (let i in this.state.levelFilters) {
            levelFilters.push(this.state.levelFilters[i]);
        }

        if (this.state.levelFilters.includes(lv)) {
            const index = levelFilters.indexOf(lv);
            levelFilters.splice(index, 1);
        } else {
            levelFilters.push(lv);
        }

        this.setState({ levelFilters });
    }

    /**
     * Update state for rarity filters on Leveling page
     * @param {string} rarity: selected rarity
     */
    updateRarityFilters(rarity) {
        let rarityFilters = [];
        for (let i in this.state.rarityFilters) {
            rarityFilters.push(this.state.rarityFilters[i]);
        }

        if (this.state.rarityFilters.includes(rarity)) {
            const index = rarityFilters.indexOf(rarity);
            rarityFilters.splice(index, 1);
        } else {
            rarityFilters.push(rarity);
        }

        this.setState({ rarityFilters });
    }

    /**
     * Set the selected token from TokenGuide
     * so it's saved if user navigates back to the page later
     * @param {object} selectedToken with name and type
     * e.g. { name: "Mickey Mouse", type: "character" }
     */
    updateSelectedToken(selectedToken) {
        this.setState({ selectedToken });
    }

    /**
     * Order characters/tokens by:
     * event special tokens -> event characters -> characters -> special tokens -> fabric tokens
     */
    getTokenOrder() {
        if (this.props.appData.status === "success") {
            const { characters, specialTokens, fabricTokens, event } =
                this.props.appData;

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
    }

    componentDidMount() {
        // Fetch app data
        this.props.fetchAppData();

        // Check workMode and nightMode in localStorage
        // and toggle in redux if true (default false)
        const workMode = localStorage.getItem(LS.WORK_MODE);
        if (workMode === "true") {
            this.props.toggleWorkMode();
        }
        const nightMode = localStorage.getItem(LS.NIGHT_MODE);
        if (nightMode === "true") {
            this.props.toggleNightMode();
        }

        this.props.checkIfAuthenticated();
        this.props.fetchUserData();
    }

    render() {
        const { levelFilters, rarityFilters, selectedToken } = this.state;
        const {
            appState: { nightMode }
        } = this.props;

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
                        tokenOrder={this.getTokenOrder}
                        updateSelectedToken={this.updateSelectedToken}
                        updateLevelFilters={this.updateLevelFilters}
                        updateRarityFilters={this.updateRarityFilters}
                    />
                </div>
            </QueryClientProvider>
        );
    }
}

function mapStateToProps(state) {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
}

export default connect(mapStateToProps, {
    fetchAppData,
    fetchUserData,
    checkIfAuthenticated,
    toggleWorkMode,
    toggleNightMode
})(App);
