import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Select from "react-select";

import Loading from "../../components/states/Loading";
import Page from "../../components/Page/Page";
import { TokenImg } from "../../components/images";
import { taskWarnings, getTokenName } from "../../utils/utils";

// TODO: make list of landmark attractions & skip
// e.g. California Screamin', Space Mountain

/**
 * AttractionGuide: a page where users can look up attractions
 * and see what tokens they drop for their current collection
 * and what tokens they could drop in the future if they
 * acquire more characters/level characters up.
 * This allows the user to see whether they can put
 * attractions away permanently or temporarily.
 * Props:
 * @param {object} userData
 * @param {object} appData
 */
class AttractionGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {},
            tasksAt: null,
            tokenDrops: null,
            showCompare: false,
            attractionSelectList: []
        };

        this.handleSelectAttraction = this.handleSelectAttraction.bind(this);
        this.toggleShowCompare = this.toggleShowCompare.bind(this);
    }

    /**
     * Toggle compare with group view
     */
    toggleShowCompare() {
        this.setState({ showCompare: !this.state.showCompare });
    }

    /**
     * Look up selected attraction in API
     * and set state with info
     */
    handleSelectAttraction = async (selected) => {
        const buildingData = await this.lookupAttraction(selected.value);
        const buildingInfo = _.find(this.props.appData.buildings, {
            name: selected.value
        });
        const { tokens, enchantment_group, group } = buildingInfo;
        this.setState({
            selected,
            tasksAt: buildingData.tasks,
            tokenDrops: tokens,
            enchantable: enchantment_group ? true : false,
            group
        });
    };

    /**
     * Look up selected attraction in API and return res.data
     */
    lookupAttraction = (name) => {
        return axios({
            method: "get",
            url: "/api/app/lookup_building",
            params: { name }
        }).then((res) => {
            return res.data;
        });
    };

    /**
     * Display the tasks characters can do at this attraction
     */
    renderTasksAt() {
        if (this.state.tasksAt) {
            let i = 0;
            return (
                <table className="tasks-drop">
                    <tbody>
                        {this.state.tasksAt.map((task) => {
                            const {
                                name,
                                required,
                                taskCharacters,
                                time,
                                tokenConflicts
                                //, trophies
                            } = task;

                            i++;

                            let grayOut = false;

                            let reqWarnings = [];
                            if (this.props.useUserData) {
                                reqWarnings = taskWarnings(
                                    task,
                                    this.props.userData
                                );
                            }

                            if (reqWarnings.length > 0) {
                                grayOut = true;
                            }

                            const { level } = _.find(required, {
                                name: this.state.selected.value
                            });

                            return (
                                <tr
                                    key={i}
                                    className={grayOut ? `task-row-unob` : null}
                                >
                                    <td>
                                        {taskCharacters[0].name} (lv{" "}
                                        {taskCharacters[0].level})
                                        {taskCharacters[1]
                                            ? ` + ${taskCharacters[1].name} (lv ${taskCharacters[1].level})`
                                            : null}
                                        : {name} ({time})
                                        {level ? (
                                            <span>
                                                <br />* Enchantment level{" "}
                                                {level}
                                            </span>
                                        ) : null}
                                        {reqWarnings.length > 0 ? (
                                            <span>
                                                <br />
                                                Must {reqWarnings.join(", ")}
                                            </span>
                                        ) : null}
                                        <br />
                                        {this.renderTokens(tokenConflicts)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
    }

    renderTokenDrops() {
        const { tokenDrops, enchantable } = this.state;
        let arr = [];

        let grayOut = false;
        let userBuilding = null;
        if (this.props.authenticated) {
            userBuilding = _.find(this.props.userData.buildings, {
                name: this.state.selected.value
            });
            if (!userBuilding) {
                grayOut = true;
            }
        }

        if (!enchantable) {
            arr.push(
                <tr className={grayOut ? `task-row-unob` : null} key="0">
                    <td>0</td>
                    <td>{this.renderTokens(tokenDrops)}</td>
                </tr>
            );
        } else {
            const tokenDropsSorted = _.orderBy(tokenDrops, ["level"]);
            for (let token of tokenDropsSorted) {
                const { level, name, tokenType } = token;
                if (userBuilding && userBuilding.level < level) {
                    grayOut = true;
                }

                arr.push(
                    <tr
                        className={grayOut ? `task-row-unob` : null}
                        key={`${name} ${tokenType} ${level}`}
                    >
                        <td>{level}</td>
                        <td>{this.renderTokens([token])}</td>
                    </tr>
                );
            }
        }

        if (tokenDrops.length > 0) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Tokens</th>
                        </tr>
                    </thead>
                    <tbody>{arr}</tbody>
                </table>
            );
        } else {
            return "---";
        }
    }

    /**
     * Display the tokens this attraction drops
     */
    renderTokens(tokens) {
        const { workMode } = this.props.appState;

        return tokens.map(({ name, tokenType }) => {
            const tokenName = getTokenName({
                name,
                tokenType,
                characters: this.props.appData.characters
            });
            // TODO
            // gray out unobtained character tokens
            // let grayOut = false;
            // not collecting this token but still display it
            // e.g. maxed character, obtained costume of fabric
            // let notCollecting = false;

            if (workMode) {
                return (
                    <li key={`${name}-${tokenType}`}>
                        <TokenImg
                            name={name}
                            tokenName={tokenName}
                            type={tokenType}
                            imgClass="char-img img-link"
                        />
                    </li>
                );
            } else {
                return (
                    <div className="col flex" key={`${name}-${tokenType}`}>
                        <TokenImg
                            name={name}
                            tokenName={tokenName}
                            type={tokenType}
                            imgClass="char-img img-link"
                        />
                    </div>
                );
            }
        });
    }

    getAttractionSelectList() {
        const attractionSelectList = this.props.appData.buildings.map(
            ({ name, group, enchantment_group, order }) => {
                let label = name;
                if (group || enchantment_group) {
                    label += ` (${group || enchantment_group})`;
                }
                return { value: name, label, order };
            }
        );

        this.setState({
            attractionSelectList: _.sortBy(attractionSelectList, "order")
        });
    }

    componentDidMount() {
        if (this.props.appData.status === "success") {
            this.getAttractionSelectList();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.appData.status === "fetching" &&
            this.props.appData.status === "success"
        ) {
            this.getAttractionSelectList();
        }
    }

    render() {
        const { attractionSelectList, selected } = this.state;
        const { appData, userData, appState, useUserData } = this.props;
        const { workMode } = appState;

        if (
            !appData ||
            !appData.buildings ||
            !attractionSelectList.length > 0
        ) {
            return <Loading />;
        }

        let message = "";
        if (selected.value && useUserData) {
            //eslint-disable-next-line
            message = "You ";
            let haveLevel;
            const buildingInfo = _.find(userData.buildings, {
                name: selected.value
            });
            if (!buildingInfo) {
                haveLevel = -1;
            } else {
                haveLevel = parseInt(buildingInfo.level, 10);
            }
            if (haveLevel < 0) {
                message += "don't ";
            }
            message += "have this attraction";
            if (haveLevel > -1) {
                if (haveLevel === 0) {
                    message += " (no enchantments)";
                } else {
                    message += ` (enchantment level ${haveLevel})`;
                }
            }
        }

        return (
            <Page
                header="Attraction Guide"
                subheader="Look up an attraction's uses"
                id="attraction-guide"
            >
                <div className="row" style={{ marginTop: "20px" }}>
                    <div id="select-row-task-guide" className="col s12">
                        {/* {this.state.selected && this.state.group ? (
                            <button
                                className="btn right"
                                onClick={this.toggleShowCompare}
                            >
                                Compare
                            </button>
                        ) : null} */}
                        <Select
                            value={selected}
                            onChange={this.handleSelectAttraction}
                            options={attractionSelectList}
                            placeholder="Select attraction..."
                        />
                    </div>
                </div>
                {selected.value ? (
                    <div>
                        <div className="row">
                            <div className="col s12">{message}</div>
                        </div>
                        <div className="row">
                            <div className="col l6 s12">
                                <div
                                    className={
                                        workMode ? "card card-workMode" : "card"
                                    }
                                >
                                    <div className="card-content">
                                        <div className="card-title">
                                            Token Drops
                                        </div>
                                        {this.renderTokenDrops()}
                                    </div>
                                </div>
                            </div>
                            <div className="col l6 s12">
                                <div
                                    className={
                                        workMode ? "card card-workMode" : "card"
                                    }
                                >
                                    <div className="card-content">
                                        <div className="card-title">
                                            Tasks At Attraction
                                        </div>
                                        {this.renderTasksAt()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps)(AttractionGuide);
