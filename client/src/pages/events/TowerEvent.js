import _ from "lodash";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import TCPlanner from "../../components/TC/TCPlanner";
import TCInfo from "../../components/TC/TCInfo";
import Loading from "../../components/states/Loading";
import Page from "../../components/Page/Page";
import { SHOW_TC_PLANNER } from "../../utils/globals";
import { getCurrentTCChaps } from "../../utils/utils";

class TowerEvent extends Component {
    constructor(props) {
        super(props);

        this.state = { planner: [], currentChaps: [], tcInfo: [] };

        this.checkPlannerChar = this.checkPlannerChar.bind(this);
        this.globalRefresh = this.globalRefresh.bind(this);
    }

    async getTCPlannerInfo() {
        const event = await this.fetchEventData();

        axios({
            method: "get",
            url: "/api/user/tc_planner"
        }).then((res) => {
            const userPlanner = res.data;

            let planner = { chapter1: {}, chapter2: {}, chapter3: {} };
            const { userData } = this.props;
            if (event && event.characters && event.type === "Tower Challenge") {
                for (let char of event.characters) {
                    const { name, featured, chapter, row } = char;
                    const userChar = _.find(userData.characters, { name });

                    let obtained = false;
                    let tired = false;
                    let level = null;
                    if (userChar) {
                        obtained = true;
                        tired = _.find(userPlanner, { name }) ? true : false;
                        level = userChar.level;
                    }

                    if (!planner[`chapter${chapter}`][`row${row}`]) {
                        planner[`chapter${chapter}`][`row${row}`] = [];
                    }
                    planner[`chapter${chapter}`][`row${row}`].push({
                        name,
                        chapter,
                        row,
                        obtained,
                        tired,
                        level,
                        featured
                    });
                }
            }

            this.setState({ planner });
        });
    }

    checkPlannerChar(name, tired) {
        axios({
            method: "post",
            url: "/api/user/tc_planner_update_character",
            params: { name, tired }
        }).then(() => {
            let { planner } = this.state;
            for (let chapter in planner) {
                for (let row in planner[chapter]) {
                    const char = _.find(planner[chapter][row], { name });
                    if (char) {
                        const charIndex = _.findIndex(planner[chapter][row], {
                            name
                        });
                        planner[chapter][row][charIndex] = {
                            ...char,
                            tired: !char.tired
                        };
                    }
                }
            }
            this.setState({ planner });
        });
    }

    async globalRefresh() {
        await axios({
            method: "post",
            url: "/api/user/tc_planner_global_refresh"
        });

        let { planner } = this.state;
        for (let chapter in planner) {
            for (let row in planner[chapter]) {
                for (let char of planner[chapter][row]) {
                    char.tired = false;
                }
            }
        }
        this.setState({ planner });
    }

    async fetchEventData() {
        const res = await axios({
            method: "get",
            url: "/api/app/event"
        });

        return res.data;
    }

    async fetchTCInfo() {
        const res = await axios({ method: "get", url: "/api/app/tc_info" });

        this.setState({ tcInfo: res.data.reverse() });
    }

    componentDidMount() {
        const currentChaps = !SHOW_TC_PLANNER ? [] : getCurrentTCChaps();
        this.setState({ currentChaps });
        this.fetchTCInfo();
    }

    render() {
        const { planner, currentChaps } = this.state;

        if (planner.length < 1) {
            this.getTCPlannerInfo();
        }

        const { appData } = this.props;
        if (!appData) {
            return <Loading />;
        }

        // Show TC Planner and db info only during TC
        let currentTC = appData.event.type === "Tower Challenge";
        let showTCPlanner = currentTC && currentChaps.length > 0 ? true : false;

        return (
            <Page header="Tower Events" id="tower-event">
                {showTCPlanner ? (
                    <div className="card">
                        <div className="card-content">
                            <div className="row">
                                <div className="col s12">
                                    <h4>Tower Event Tracker</h4>
                                    <div className="row col s12">
                                        {currentChaps.includes(1) ? (
                                            <TCPlanner
                                                collection={this.props.userData}
                                                chars={
                                                    this.state.planner[
                                                        "chapter1"
                                                    ]
                                                }
                                                chap={1}
                                                userData={this.props.userData}
                                                checkPlannerChar={
                                                    this.checkPlannerChar
                                                }
                                                globalRefresh={
                                                    this.globalRefresh
                                                }
                                            />
                                        ) : null}
                                        {currentChaps.includes(2) ? (
                                            <TCPlanner
                                                collection={this.props.userData}
                                                chars={
                                                    this.state.planner[
                                                        "chapter2"
                                                    ]
                                                }
                                                chap={2}
                                                userData={this.props.userData}
                                                checkPlannerChar={
                                                    this.checkPlannerChar
                                                }
                                                globalRefresh={
                                                    this.globalRefresh
                                                }
                                            />
                                        ) : null}
                                        {currentChaps.includes(3) ? (
                                            <TCPlanner
                                                collection={this.props.userData}
                                                chars={
                                                    this.state.planner[
                                                        "chapter3"
                                                    ]
                                                }
                                                chap={3}
                                                userData={this.props.userData}
                                                checkPlannerChar={
                                                    this.checkPlannerChar
                                                }
                                                globalRefresh={
                                                    this.globalRefresh
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {this.state.tcInfo.map((tc, index) => {
                    return (
                        <TCInfo
                            key={tc.number}
                            tc={tc}
                            showMyInfo={index === 0}
                        />
                    );
                })}

                {/* <div className="card">
                    <div className="card-content">
                        <h4>Stats</h4>
                        <h5># of times event collections used:</h5>
                        <table>
                            <tbody>
                                <tr>
                                    <td>0</td>
                                    <td>Moana</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        Mulan, LK, WtP, L&S, BH6, TLM, WiR, PatF
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Frozen, Aladdin, AiW, Snow White</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Incredibles, NBC, BatB</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps)(TowerEvent);
