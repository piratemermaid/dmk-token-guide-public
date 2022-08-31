import _ from "lodash";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import moment from "moment";

import { fetchUserData } from "../../redux/actions/userData";
import { getImgName } from "../../utils/utils";
import CollectionPage from "../../components/Page/CollectionPage";
import "../../styles/stats.scss";

const Stats = (props) => {
    const { appData, userData, appState } = props;
    const { workMode } = appState;

    // TODO: handle loading more elegantly
    if (
        !appData.appDataIsLoaded ||
        !userData.userDataIsLoaded ||
        !appState.authenticated
    ) {
        return <CollectionPage activePage="Stats" />;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchUserData());
        }
        fetchData();
    }, []);

    const totalChars = appData.characters.length;
    const totalGroups = appData.groups.length;
    const totalAttractions = appData.buildings.length;
    const totalCostumes = appData.costumes.length;
    const totalFloats = appData.groups.length - 1;
    const totalConcessions = appData.concessions.length;

    function getCharacterStats() {
        let unobtainedChars = [];
        let maxedChars = [];
        let readyForMaxChars = [];
        let completeGroups = [];
        let maxedGroups = [];
        let totalLevel = 0;

        let obtainedInGroup = 0;
        let maxedInGroup = 0;

        let groupAverages = [];

        for (let group of appData.groups) {
            obtainedInGroup = 0;
            maxedInGroup = 0;
            let groupTotalLevel = 0;
            let groupAvgLevel;
            for (let i in group.characters) {
                const name = group.characters[i];
                const charInfo = _.find(userData.characters, { name });
                if (charInfo && charInfo.level > 0) {
                    obtainedInGroup++;
                    groupTotalLevel += charInfo.level;
                    totalLevel += charInfo.level;
                    if (charInfo.level === 10) {
                        maxedChars.push(name);
                        maxedInGroup++;
                    }
                    if (charInfo.level === 9 && charInfo.ready) {
                        readyForMaxChars.push(name);
                    }
                } else {
                    unobtainedChars.push(name);
                }
            }

            if (obtainedInGroup === group.characters.length) {
                completeGroups.push(group.name);
            }

            if (maxedInGroup === obtainedInGroup && obtainedInGroup > 0) {
                maxedGroups.push(group.name);
            }

            // Get collection averages
            groupAvgLevel = (groupTotalLevel / obtainedInGroup).toFixed(2);

            if (groupAvgLevel < 10) {
                groupAverages.push({ group: group.name, avg: groupAvgLevel });
            }
        }

        const obtainedChars = totalChars - unobtainedChars.length;
        const avgLevel = (totalLevel / obtainedChars).toFixed(2);

        groupAverages.sort(function (a, b) {
            const avgA = parseFloat(a.avg);
            const avgB = parseFloat(b.avg);
            if (avgA < avgB) {
                return -1;
            }
            if (avgA > avgB) {
                return 1;
            }
            return 0;
        });

        return {
            unobtainedChars,
            maxedChars,
            readyForMaxChars,
            completeGroups,
            maxedGroups,
            avgLevel,
            groupAverages,
            numAttractionsHave
        };
    }

    function displayList(arr, type) {
        if (workMode) {
            return arr.join(", ");
        } else {
            return arr.map((item) => {
                return (
                    <img
                        key={item}
                        src={`/img/${type}/${getImgName(item)}.png`}
                        title={item}
                        alt={item}
                        className="stats-img"
                    />
                );
            });
        }
    }

    function displayGroupAverages(avgs) {
        return avgs.map(({ group, avg }) => {
            return (
                <tr key={group}>
                    <td>{avg}</td>
                    <th>{group}</th>
                </tr>
            );
        });
    }

    function getOtherStats() {
        const numAttractionsHave = userData.buildings.length;
        const numCostumesHave = userData.costumes.length;
        const numFloatsHave = userData.floats.length;
        const numConcessionsHave = userData.concessions.length;

        return {
            numAttractionsHave,
            numCostumesHave,
            numFloatsHave,
            numConcessionsHave
        };
    }

    function calcLevelingTime(level) {
        let time = 0;

        const levelTime = {
            0: 0,
            1: 0,
            2: 0.1,
            3: 0.5,
            4: 1,
            5: 2,
            6: 4,
            7: 8,
            8: 16,
            9: 24
        };

        for (let i = 9; i >= level; i--) {
            time += levelTime[i];
        }

        return time;
    }

    function getLevelingTimeStat() {
        let levelingTime = 0;

        for (let char of userData.characters) {
            const { level } = char;
            if (level < 10 && level > 1) {
                levelingTime += calcLevelingTime(level);
            }
        }

        return { levelingTime: Math.round(levelingTime) };
    }

    function getPercentage(a, b) {
        return Math.round((a / b) * 100);
    }

    const {
        unobtainedChars,
        maxedChars,
        readyForMaxChars,
        completeGroups,
        maxedGroups,
        avgLevel,
        groupAverages
    } = getCharacterStats();

    const {
        numAttractionsHave,
        numCostumesHave,
        numFloatsHave,
        numConcessionsHave
    } = getOtherStats();

    const { levelingTime } = getLevelingTimeStat();

    const numObtained = totalChars - unobtainedChars.length;
    const numMaxed = maxedChars.length;
    const numcompleteGroups = completeGroups.length;
    const nummaxedGroups = maxedGroups.length;

    return (
        <CollectionPage activePage="Stats">
            {unobtainedChars.length < 1 &&
            completeGroups.length === totalGroups &&
            avgLevel === "1.00" ? (
                <div className="row">
                    <div className="col s12 data-check">
                        ...Psst, hey, did you{" "}
                        <a className="color-link" href="/collection">
                            enter your data?
                        </a>
                    </div>
                </div>
            ) : null}
            <div className="row">
                <div className="col s12">
                    <table>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    <h5>
                                        <span className="stats-number">
                                            {numObtained}/{totalChars}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            characters (
                                            {getPercentage(
                                                numObtained,
                                                totalChars
                                            )}
                                            %)
                                        </span>
                                    </h5>
                                    {unobtainedChars.length > 0 ? (
                                        <div>
                                            <span className="stats-text">
                                                Missing:
                                            </span>
                                            <br />
                                            {displayList(
                                                unobtainedChars,
                                                "characters"
                                            )}
                                        </div>
                                    ) : null}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {numMaxed}/{numObtained}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            maxed out characters (
                                            {getPercentage(
                                                numMaxed,
                                                numObtained
                                            )}
                                            %)
                                        </span>
                                    </h5>
                                    {maxedChars.length > 0
                                        ? displayList(maxedChars, "characters")
                                        : null}
                                    {readyForMaxChars.length > 0 ? (
                                        <div>
                                            <br />
                                            <br />
                                            <h5>
                                                <span className="stats-number">
                                                    {readyForMaxChars.length}/
                                                    {numObtained - numMaxed}
                                                </span>
                                                <br />
                                                <span className="stats-category">
                                                    ready for level 10 (
                                                    {getPercentage(
                                                        readyForMaxChars.length,
                                                        numObtained - numMaxed
                                                    )}
                                                    %)
                                                </span>
                                                <br />
                                                <span className="stats-text">
                                                    of the remaining, un-maxed
                                                    characters
                                                </span>
                                            </h5>
                                            {displayList(
                                                readyForMaxChars,
                                                "characters"
                                            )}
                                        </div>
                                    ) : null}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {numcompleteGroups}/{totalGroups}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            complete character groups
                                        </span>
                                    </h5>
                                    {displayList(completeGroups, "collections")}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {nummaxedGroups}/{totalGroups}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            maxed out character groups
                                        </span>
                                    </h5>
                                    {displayList(maxedGroups, "collections")}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {avgLevel}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            Total average level
                                        </span>
                                    </h5>
                                    <h5 className="stats-text">
                                        Group averages (unmaxed, lowest to
                                        highest):
                                    </h5>
                                    <table className="coll-avgs">
                                        <tbody>
                                            {displayGroupAverages(
                                                groupAverages
                                            )}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {levelingTime}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            Leveling hours
                                        </span>
                                        <br />
                                        <span className="stats-text">
                                            to get all obtained characters to
                                            max level
                                        </span>
                                    </h5>
                                    <p className="stats-text">
                                        The soonest you can max out all your
                                        obtained characters is{" "}
                                        {moment()
                                            .add(levelingTime, "hour")
                                            .format("LL")}
                                        .
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {numAttractionsHave}/
                                            {totalAttractions}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            attractions (
                                            {getPercentage(
                                                numAttractionsHave,
                                                totalAttractions
                                            )}
                                            %)
                                        </span>
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {numCostumesHave}/{totalCostumes}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            costumes (
                                            {getPercentage(
                                                numCostumesHave,
                                                totalCostumes
                                            )}
                                            %)
                                        </span>
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {numFloatsHave}/{totalFloats}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            floats (
                                            {getPercentage(
                                                numFloatsHave,
                                                totalFloats
                                            )}
                                            %)
                                        </span>
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5>
                                        <span className="stats-number">
                                            {numConcessionsHave}/
                                            {totalConcessions}
                                        </span>
                                        <br />
                                        <span className="stats-category">
                                            concessions (
                                            {getPercentage(
                                                numConcessionsHave,
                                                totalConcessions
                                            )}
                                            %)
                                        </span>
                                    </h5>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </CollectionPage>
    );
};

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps)(Stats);
