import _ from "lodash";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { OPTIONS } from "../utils/globals";
import { fetchEventData } from "../redux/actions/appData";
import {
    fetchUserDataType,
    updateUserCharacterData
} from "../redux/actions/userData";
import {
    getGroupStatus,
    sortConflicts,
    getCurrentTCChaps
} from "../utils/utils";
import Loading from "../components/states/Loading";
import Page from "../components/Page/Page";
import NoAuthCollection from "../components/collection/NoAuthCollection";
import OptionsList from "../components/OptionsList";
import CharRow from "../components/Leveling/CharRow";
import "../styles/leveling.scss";

const optionsList = [
    OPTIONS.LEVELING__SHOW_ALL_READY,
    OPTIONS.LEVELING__SHOW_CONFLICTS,
    OPTIONS.LEVELING__SHOW_MAGIC,
    OPTIONS.LEVELING__SHOW_NOT_READY
];

// TODO: add favorites not ready section

/**
 * Leveling page displays user's characters that are ready to level up
 * and can be filtered according to user's options & level time
 */
class Leveling extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: [],
            eventReady: [],
            favoritesReady: [],
            notReady: [],
            eventNotReady: [],
            conflicts: {}
        };

        this.levelUpChar = this.levelUpChar.bind(this);
        this.setCharReady = this.setCharReady.bind(this);
        this.lookupChar = this.lookupChar.bind(this);
    }

    getLevelTime(level) {
        switch (level) {
            case 1:
                return "36s";
            case 2:
                return "6m";
            case 3:
                return "35m";
            case 4:
                return "1h";
            case 5:
                return "2h";
            case 6:
                return "4h";
            case 7:
                return "8h";
            case 8:
                return "16h";
            case 9:
                return "24h";
            default:
                return "";
        }
    }

    renderTable({ characters, tableType }) {
        const event = tableType.includes("event");
        const not = tableType.includes("not");
        const favorites = tableType === "favorites";

        let titleStr = "";
        if (event) {
            titleStr += "Event";
        } else if (favorites) {
            titleStr = "Favorite";
        } else {
            titleStr += "All";
        }
        titleStr += " characters ";
        if (not) {
            titleStr += "NOT ";
        }
        titleStr += "ready to level up:";

        // Display message if none ready
        if (characters.length < 1) {
            return (
                <div className="row">
                    <h5 className="title stats-category">{titleStr}</h5>
                    <p>
                        No {event ? "event " : null} characters
                        {not ? " NOT" : null} ready...
                    </p>
                </div>
            );
        }

        return (
            <div className="row">
                <h5 className="title stats-category">{titleStr}</h5>
                <table className="leveling">
                    <tbody>
                        {this.renderReady({
                            ready: characters,
                            not,
                            favorites,
                            tableType
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * TODO: make a component for this
     * @param {ready} array: array of the characters to display
     * @param {tableType} string: table type
     * @returns
     */
    renderReady({ ready, tableType }) {
        const readyByLv = {
            0: _.filter(ready, { level: 0 }),
            1: _.filter(ready, { level: 1 }),
            2: _.filter(ready, { level: 2 }),
            3: _.filter(ready, { level: 3 }),
            4: _.filter(ready, { level: 4 }),
            5: _.filter(ready, { level: 5 }),
            6: _.filter(ready, { level: 6 }),
            7: _.filter(ready, { level: 7 }),
            8: _.filter(ready, { level: 8 }),
            9: _.filter(ready, { level: 9 })
        };

        let renderArr = [];

        Object.entries(readyByLv).map((entry) => {
            const level = parseInt(entry[0]);
            const chars = entry[1];

            if (chars && chars.length > 0) {
                renderArr.push(
                    <tr key={level}>
                        <th colSpan={7}>
                            {level === 0
                                ? "Ready to welcome"
                                : `Level ${level} -> ${
                                      level + 1
                                  } (${this.getLevelTime(level)})`}
                        </th>
                    </tr>
                );

                chars.map((char) => {
                    const { name, level, welcome_time, target_level } = char;

                    let charUpdating = false;
                    const { updating } = this.props.userData;
                    if (
                        updating &&
                        updating.name === name &&
                        updating.type === "character"
                    ) {
                        charUpdating = true;
                    }

                    const time =
                        level > 0 ? this.getLevelTime(level) : welcome_time;
                    let skip = false;
                    if (
                        tableType !== "not" &&
                        this.props.leveling__showAllReady
                    ) {
                        // Get character's collection
                        // const group = characterList[char.name];
                        const group = _.find(this.props.appData.characters, {
                            name: char.name
                        }).group;

                        // Then use getGroupStatus to determine
                        // whether to skip this character
                        const groupStatus = getGroupStatus(
                            group,
                            this.props.userData.characters,
                            this.props.appData.groups
                        );

                        if (!groupStatus) {
                            skip = true;
                        }
                    }
                    if (
                        this.props.levelFilters.length > 0 &&
                        !this.props.levelFilters.includes(level)
                    ) {
                        skip = true;
                    }

                    // If we have rarity filters,
                    // exclude characters with tokens
                    // whose rarities do not match
                    const { rarityFilters } = this.props;
                    const charTokens = _.find(this.props.appData.characters, {
                        name
                    }).tokens;
                    let charRarities;
                    if (charTokens[0] && charTokens[1]) {
                        charRarities = [
                            _.find(charTokens, { type: "token" }).rarity,
                            _.find(charTokens, { type: "ears" }).rarity
                        ];
                    }

                    if (rarityFilters.length > 0) {
                        if (
                            !(
                                rarityFilters.includes(charRarities[0]) ||
                                rarityFilters.includes(charRarities[1])
                            )
                        ) {
                            skip = true;
                        }
                    }

                    if (level > 9) {
                        skip = true;
                    }

                    if (!skip) {
                        renderArr.push(
                            // <LevelingChar
                            //     key={`${char.name}-${tableType}`}
                            //     charUserData={char}
                            //     time={time}
                            //     charRarities={charRarities}
                            //     charUpdating={charUpdating}
                            //     tableType={tableType}
                            //     charAppData={_.find(
                            //         this.props.appData.characters,
                            //         { name: char.name }
                            //     )}
                            //     favoriteCharacters={_.map(
                            //         this.props.userData.characters.filter(
                            //             (char) => char.favorite
                            //         ),
                            //         "name"
                            //     )}
                            //     showMagic={this.props.leveling__showMagic}
                            //     showConflicts={
                            //         this.props.leveling__showConflicts
                            //     }
                            //     lookupChar={this.lookupChar}
                            //     levelUpChar={this.levelUpChar}
                            //     setCharReady={this.setCharReady}
                            // />
                            <CharRow
                                char={char}
                                tableType={tableType}
                                charUpdating={charUpdating}
                                warning={this.shouldDisplayWarning(name)}
                                time={time}
                                charRarities={charRarities}
                                levelUpChar={this.levelUpChar}
                                setCharReady={this.setCharReady}
                                lookupChar={this.lookupChar}
                            />
                        );
                    }

                    return null;
                });
            } else {
                return (
                    <tr>
                        <td>None ready...</td>
                    </tr>
                );
            }
        });

        return renderArr;
    }

    renderFilters() {
        let filterArr = [];
        for (let i = 1; i < 10; i++) {
            filterArr.push(
                <div
                    className="col checkbox-wrapper"
                    onClick={() => this.props.updateLevelFilters(i)}
                    key={i}
                >
                    <input
                        type="checkbox"
                        checked={this.props.levelFilters.includes(i)}
                        onChange={() => this.props.updateLevelFilters(i)}
                    />
                    <span>{this.getLevelTime(i)}</span>
                </div>
            );
        }

        return filterArr;
    }

    renderRarities() {
        let rarities = ["common", "uncommon", "rare", "epic", "legendary"];
        let rarityArr = [];
        for (let i = 0; i < 5; i++) {
            rarityArr.push(
                <div
                    className="col checkbox-wrapper"
                    onClick={() => this.props.updateRarityFilters(rarities[i])}
                    key={rarities[i]}
                >
                    <input
                        type="checkbox"
                        checked={this.props.rarityFilters.includes(rarities[i])}
                        onChange={() =>
                            this.props.updateRarityFilters(rarities[i])
                        }
                    />
                    <span>
                        {rarities[i]}
                        <div
                            className={`rarity-circle ${rarities[i]}`}
                            style={{ float: "right", marginTop: "6px" }}
                        />
                    </span>
                </div>
            );
        }

        return rarityArr;
    }

    /**
     * Scroll to top of page, change page to TokenGuide,
     * and set selected character to this character
     * @param {string} name
     */
    lookupChar(name) {
        console.log(name);
        window.scrollTo(0, 0);
        this.props.history.push("/");
        this.props.updateSelectedToken({ name, type: "character" });
    }

    levelUpChar({ name, level }) {
        this.props.updateUserCharacterData({ name, level, ready: false });

        let { ready, eventReady, favoritesReady, notReady, eventNotReady } =
            this.state;

        // If in a ready array, add to not ready array and remove from ready array.
        // If in a not ready array, increase level by 1.
        if (_.find(ready, { name })) {
            const index = _.findIndex(ready, { name });
            notReady.push({
                ...ready[index],
                level: ready[index].level
            });
            ready.splice(index, 1);
        }
        if (_.find(eventReady, { name })) {
            const index = _.findIndex(eventReady, { name });
            eventNotReady.push({
                ...eventReady[index],
                level: eventReady[index].level
            });
            eventReady.splice(index, 1);
        }
        if (_.find(favoritesReady, { name })) {
            const index = _.findIndex(favoritesReady, { name });
            favoritesReady.splice(index, 1);
        }
        if (_.find(notReady, { name })) {
            const index = _.findIndex(notReady, { name });
            notReady[index].level++;
        }
        if (_.find(eventNotReady, { name })) {
            const index = _.findIndex(eventNotReady, { name });
            eventNotReady[index].level++;
        }

        this.setState({
            ready,
            eventReady,
            favoritesReady,
            notReady,
            eventNotReady
        });
    }

    setCharReady({ name, level }) {
        this.props.updateUserCharacterData({ name, level, ready: true });

        const userChar = _.find(this.props.userData.characters, { name });

        let { ready, eventReady, favoritesReady, notReady, eventNotReady } =
            this.state;

        // Remove from not ready array(s), add to proper ready array(s)
        if (_.find(notReady, { name })) {
            const index = _.findIndex(notReady, { name });
            ready.push({
                ...notReady[index],
                level: notReady[index].level
            });
            // TODO: remove this when I implement
            // favorites not ready section
            if (userChar.favorite) {
                favoritesReady.push({
                    ...notReady[index],
                    level: notReady[index].level
                });
            }
            notReady.splice(index, 1);
        }
        if (_.find(eventNotReady, { name })) {
            const index = _.findIndex(eventNotReady, { name });
            eventReady.push({
                ...eventNotReady[index],
                level: eventNotReady[index].level
            });
            eventNotReady.splice(index, 1);
        }

        // if (_.find(ready, { name })) {
        // const index = _.findIndex(ready, { name });
        // notReady.push({
        //     ...ready[index],
        //     level: ready[index].level + 1
        // });
        // ready.splice(index, 1);
        // }
        // if (_.find(eventReady, { name })) {
        //     const index = _.findIndex(eventReady, { name });
        //     eventNotReady.push({
        //         ...eventReady[index],
        //         level: eventReady[index].level + 1
        //     });
        //     eventReady.splice(index, 1);
        // }
        // if (_.find(favoritesReady, { name })) {
        //     const index = _.findIndex(favoritesReady, { name });
        //     favoritesReady.splice(index, 1);
        // }
        // if (_.find(notReady, { name })) {
        //     const index = _.findIndex(notReady, { name });
        //     notReady[index].level++;
        // }
        // if (_.find(eventNotReady, { name })) {
        //     const index = _.findIndex(eventNotReady, { name });
        //     eventNotReady[index].level++;
        // }

        this.setState({
            ready,
            eventReady,
            favoritesReady,
            notReady,
            eventNotReady
        });
    }

    /**
     * Format the conflicts array of objects into a string
     * In the future, this could display images
     * @param {array} orig
     */
    getConflictString(orig) {
        const arr = orig.map(({ name, tokenType }) => {
            return name;
        });
        return _.uniq(arr).toString(",");
    }

    /**
     * Determines whether to display a conflict warning
     * e.g. don't display if character is level 9,
     * and if so the type (event, favorite) and the conflicting characters
     * @param {string} name: character's name
     */
    shouldDisplayWarning(name) {
        // Don't display a warning if options set not to show conflicts
        if (!this.props.leveling__showConflicts) {
            return { bool: false };
        }

        // Skip level 9 because they won't conflict
        const userChar = _.find(this.props.userData.characters, { name });
        if (userChar && userChar.level === 9) {
            return { bool: false };
        }

        const conflicts = this.state.conflicts[name];

        if (!conflicts) {
            return {
                bool: true,
                type: "loading",
                text: `Loading conflicts...`
            };
        }

        const { eventConflicts, favoriteConflicts } = conflicts;

        if (eventConflicts.length > 0 && this.props.appData.event.name) {
            return {
                bool: true,
                type: "event",
                text: `Event conflict: ${this.getConflictString(
                    eventConflicts
                )}`
            };
        } else if (favoriteConflicts.length > 0) {
            return {
                bool: true,
                type: "favorite",
                text: `Favorite conflict: ${this.getConflictString(
                    favoriteConflicts
                )}`
            };
        } else {
            return { bool: false };
        }
    }

    /**
     * Toggle hide/show leveling filters
     * TODO: make a nice animation
     */
    toggleFilters(bool) {
        const showBtn = document.getElementById("show-filters");
        const hideBtn = document.getElementById("hide-filters");
        const filters = document.getElementById("leveling-filters");
        if (bool) {
            // show filters & switch icon to minus
            showBtn.classList.remove("show");
            showBtn.classList.add("hide");
            hideBtn.classList.remove("hide");
            hideBtn.classList.add("show");
            filters.classList.add("show");
            filters.classList.remove("hide");
        } else {
            // hide filters & switch icon to plus
            showBtn.classList.add("show");
            showBtn.classList.remove("hide");
            hideBtn.classList.remove("show");
            hideBtn.classList.add("hide");
            filters.classList.add("hide");
            filters.classList.remove("show");
        }
    }

    /**
     * Fetch conflicts for character,
     * set event and favorite conflicts in state
     * @param {string} name: character's name
     */
    async fetchConflictsForCharacter(name) {
        if (!this.mounted) {
            return;
        } else {
            return axios({
                method: "get",
                url: "/api/app/lookup_character_token",
                params: { name }
            }).then((res) => {
                const { conflicts } = res.data;
                //eslint-disable-next-line
                const eventConflicts = conflicts.filter((token) => {
                    if (
                        _.find(this.props.appData.event.characters, {
                            name: token.name
                        }) ||
                        this.props.appData.event.specialTokens.includes(
                            token.name
                        )
                    ) {
                        const userChar = _.find(
                            this.props.userData.characters,
                            {
                                name: token.name
                            }
                        );

                        // don't include maxed characters
                        // or event characters for non-regular event
                        // (we still want to see conflicts for characters
                        // we haven't welcomed during a regular event)
                        if (
                            token.tokenType === "special" ||
                            (userChar &&
                                (userChar.level < 9 ||
                                    (userChar.level === 9 && !userChar.ready)))
                        ) {
                            // If TC, check that chapter is not over
                            if (
                                this.props.appData.event.type ===
                                "Tower Challenge"
                            ) {
                                const charTCInfo = _.find(
                                    this.props.appData.event.characters,
                                    { name: token.name }
                                );
                                if (charTCInfo && charTCInfo.chapter) {
                                    if (
                                        charTCInfo.chapter >=
                                        getCurrentTCChaps()[0]
                                    ) {
                                        return token;
                                    }
                                } else {
                                    if (token.name === "Refresh Token") {
                                        return token;
                                    }
                                }
                            } else {
                                return token;
                            }
                        } else {
                            if (this.props.appData.event.type === "Regular") {
                                return token;
                            }
                        }
                    }
                });

                //eslint-disable-next-line
                const favoriteConflicts = conflicts.filter((char) => {
                    const userChar = _.find(this.props.userData.characters, {
                        name: char.name
                    });
                    if (userChar && userChar.favorite) {
                        return char;
                    }
                });

                return {
                    eventConflicts: sortConflicts(
                        eventConflicts,
                        this.props.tokenOrder
                    ),
                    favoriteConflicts: sortConflicts(
                        favoriteConflicts,
                        this.props.tokenOrder
                    )
                };
            });
        }
    }

    /**
     * Set ready characters in state and fetch conflicts
     */
    async setup() {
        if (
            this.state.ready.length < 1 &&
            this.state.eventReady.length < 1 &&
            this.props.userData.status === "success" &&
            this.props.appData.status === "success"
        ) {
            const { event } = this.props.appData;
            let readyChars = [];
            let notReady = [];
            let eventNotReady = [];
            let eventReady = [];
            let favoritesReady = [];
            for (let char of this.props.userData.characters) {
                const { name, level, ready, favorite, target_level } = char;
                const index = _.findIndex(this.props.appData.characters, {
                    name
                });
                if (ready && level < 10) {
                    if (_.find(event.characters, { name })) {
                        if (!_.find(eventReady, { name })) {
                            eventReady.push({ name, level, index });
                        }
                    }
                    let welcome_time = null;
                    if (level === 0) {
                        const res = await axios({
                            method: "get",
                            url: "/api/app/welcome_time",
                            params: { name }
                        });
                        welcome_time = res.data;
                    }
                    if (!_.find(readyChars, { name })) {
                        readyChars.push({ name, level, index, welcome_time });
                    }
                    if (favorite) {
                        if (!_.find(favoritesReady, { name })) {
                            favoritesReady.push({
                                name,
                                level,
                                index,
                                welcome_time,
                                target_level
                            });
                        }
                    }
                } else {
                    if (level > 0 && level < 10) {
                        if (_.find(event.characters, { name })) {
                            eventNotReady.push({ name, level, index });
                        }
                        notReady.push({ name, level, index });
                    }
                }
            }

            // Sort by lowest to highest level and storybook order
            readyChars.sort(function (a, b) {
                if (a.level === b.level) {
                    return a.index - b.index;
                } else {
                    return a.level - b.level;
                }
            });

            eventReady.sort(function (a, b) {
                if (a.level === "unob") {
                    return -1;
                }
                if (b.level === "unob") {
                    return 1;
                }
                return a.level - b.level;
            });

            favoritesReady.sort(function (a, b) {
                if (a.level === "unob") {
                    return -1;
                }
                if (b.level === "unob") {
                    return 1;
                }
                return a.level - b.level;
            });

            notReady.sort(function (a, b) {
                if (a.level === b.level) {
                    return a.index - b.index;
                } else {
                    return a.level - b.level;
                }
            });

            eventNotReady.sort(function (a, b) {
                if (a.level === "unob") {
                    return -1;
                }
                if (b.level === "unob") {
                    return 1;
                }
                return a.level - b.level;
            });

            this.setState({
                ready: readyChars,
                eventReady,
                favoritesReady,
                notReady,
                eventNotReady
            });

            // fetch favorite conflicts first
            for (let char of favoritesReady) {
                const charConflicts = await this.fetchConflictsForCharacter(
                    char.name
                );
                let conflicts = this.state.conflicts;
                conflicts[char.name] = charConflicts;
                this.setState({ conflicts });
            }

            for (let char of readyChars) {
                if (!this.state.conflicts[char.name]) {
                    const charConflicts = await this.fetchConflictsForCharacter(
                        char.name
                    );
                    let conflicts = this.state.conflicts;
                    conflicts[char.name] = charConflicts;
                    this.setState({ conflicts });
                }
            }

            for (let char of notReady) {
                if (!this.state.conflicts[char.name]) {
                    const charConflicts = await this.fetchConflictsForCharacter(
                        char.name
                    );
                    let conflicts = this.state.conflicts;
                    conflicts[char.name] = charConflicts;
                    this.setState({ conflicts });
                }
            }
        }
    }

    componentDidUpdate() {
        this.setup();
    }

    componentDidMount() {
        this.props.fetchEventData();

        this.props.fetchUserDataType("characters");
        this.props.fetchUserDataType("options");

        this.mounted = true;

        this.setup();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (!this.props.appState.authenticated) {
            return <NoAuthCollection type="Leveling" />;
        } else {
            if (
                !this.props.appData ||
                this.props.appData.status !== "success" ||
                !this.props.userData ||
                !this.props.userData.userDataIsLoaded ||
                !this.props.appData.appDataIsLoaded
            ) {
                return <Loading />;
            }
        }

        const {
            useReady,
            leveling__showAllReady,
            leveling__showMagic,
            leveling__showConflicts,
            leveling__showEvent,
            leveling__showNotReady
        } = this.props;

        const { ready, eventReady, favoritesReady, notReady, eventNotReady } =
            this.state;

        const { event } = this.props.appData;
        if (
            event.name &&
            event.type !== "Mini Event" &&
            !optionsList.includes(OPTIONS.LEVELING__SHOW_EVENT)
        ) {
            optionsList.unshift(OPTIONS.LEVELING__SHOW_EVENT);
        }

        if (!useReady) {
            return (
                <div className="container">
                    Not tracking ready-to-level characters. Visit{" "}
                    <Link to="/account">My Account</Link> to change this.
                </div>
            );
        }

        return (
            <Page
                id="leveling"
                header="Leveling"
                subheader="View all characters who are ready to level up"
            >
                <div className="row" style={{ marginBottom: "0" }}>
                    <div className="col s12">
                        <h5>
                            Filters{" "}
                            <i
                                id="show-filters"
                                className="material-icons hover show"
                                onClick={() => this.toggleFilters(true)}
                            >
                                add_circle_outline
                            </i>
                            <i
                                id="hide-filters"
                                className="material-icons hover hide"
                                onClick={() => this.toggleFilters(false)}
                            >
                                remove_circle_outline
                            </i>
                        </h5>
                    </div>
                    <div
                        id="leveling-filters"
                        className="col s12 hide card card-content"
                    >
                        <div className="row">
                            <OptionsList
                                optionsList={optionsList}
                                condense={true}
                                leveling__showAllReady={leveling__showAllReady}
                                leveling__showConflicts={
                                    leveling__showConflicts
                                }
                                leveling__showMagic={leveling__showMagic}
                                leveling__showEvent={leveling__showEvent}
                                leveling__showNotReady={leveling__showNotReady}
                                page="leveling"
                            />
                        </div>
                        <div className="row">
                            <div className="col s12">
                                Show only specific level times:
                                <div id="level-filters">
                                    {this.renderFilters()}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="col s12"
                                style={{ marginTop: "15px" }}
                            >
                                Include only specific token rarities:
                                <div id="level-filters">
                                    {this.renderRarities()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {event.characters.length > 0 &&
                leveling__showEvent &&
                event.type !== "Mini Event"
                    ? this.renderTable({
                          characters: eventReady,
                          tableType: "event"
                      })
                    : null}
                {this.renderTable({
                    characters: favoritesReady,
                    tableType: "favorites"
                })}
                {this.renderTable({ characters: ready, tableType: "all" })}
                <br />
                <br />
                {leveling__showNotReady ? <hr /> : null}
                <br />
                {leveling__showNotReady &&
                event.characters.length > 0 &&
                leveling__showEvent &&
                event.type !== "Mini Event"
                    ? this.renderTable({
                          characters: eventNotReady,
                          tableType: "event not"
                      })
                    : null}
                {leveling__showNotReady
                    ? this.renderTable({
                          characters: notReady,
                          tableType: "not"
                      })
                    : null}
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps, {
    updateUserCharacterData,
    fetchEventData,
    fetchUserDataType
})(withRouter(Leveling));
