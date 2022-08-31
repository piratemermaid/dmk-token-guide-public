import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import Card from "../../components/Card";
import { useAuthenticated } from "../../hooks/user";
import { useGoldTrophyDrops } from "../../hooks/event";
import {
    useUserCharacters,
    useUserBuildings,
    useUserCostumes
} from "../../hooks/userData";
import Loading from "../../components/states/Loading";
import Page from "../../components/Page/Page";
import { AttractionImg, CharacterImg } from "../../components/images";

const useStyles = makeStyles({
    item: {
        marginBottom: "10px",
        padding: "4px",
        borderRadius: "4px",
        "&:hover": { background: "#e0e0e0" }
    },
    nightModeItem: {
        "&:hover": { background: "#8b8b8b" }
    },
    unobtained: {
        opacity: 0.5,
        fontStyle: "italic",
        "&:hover": {
            opacity: 1
        }
    }
});

const StrikingGold = () => {
    const [loading, setLoading] = useState(true);

    const authenticated = useAuthenticated();
    const goldTrophyDrops = useGoldTrophyDrops();
    const userCharacters = useUserCharacters();
    const userBuildings = useUserBuildings();
    const userCostumes = useUserCostumes();

    const { nightMode } = useSelector((state) => state.appState);

    useEffect(() => {
        if (goldTrophyDrops) {
            setLoading(false);
        }
    }, [goldTrophyDrops]);

    if (loading) {
        return <Loading />;
    }

    const haveNeededCharLevel = (name, neededLevel) => {
        if (!authenticated) {
            return { have: true };
        }

        const userChar = _.find(userCharacters, { name });
        if (!userChar || userChar.level === 0) {
            return { have: false, message: "(unobtained)" };
        } else if (neededLevel && userChar.level >= neededLevel) {
            return { have: true };
        } else {
            return {
                have: false,
                message: `(have at level ${userChar.level})`
            };
        }
    };

    const haveNeededAttractionLevel = (name) => {
        if (!authenticated) {
            return { have: true };
        }

        const userAttr = _.find(userBuildings, { name });

        if (!userAttr) {
            return { have: false, message: "(unobtained)" };
        } else {
            return { have: true };
        }
    };

    // TODO: also check level
    const haveBuildingReq = ({ name }) => {
        if (!authenticated) {
            return { have: true };
        }

        const found = _.find(userBuildings, { name });

        if (!found) {
            return false;
        } else {
            return true;
        }
    };

    const haveCostumeReq = (costumeReq) => {
        const { name, character } = costumeReq;

        const found = _.find(userCostumes, { name, character });

        if (found) {
            return true;
        } else {
            return false;
        }
    };

    const canDoTask = (task) => {
        const { characters, buildingReq, costumeReq } = task;
        const char = characters[0];

        const haveCharLevel = haveNeededCharLevel(char.name, char.level).have;
        const haveBuilding = !buildingReq ? true : haveBuildingReq(buildingReq);
        const haveCostume = !costumeReq ? true : haveCostumeReq(costumeReq);

        return haveCharLevel && haveBuilding && haveCostume;
    };

    return (
        <Page header="Striking Gold" id="event-page">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card title="Tasks">
                        {goldTrophyDrops?.trophyTasks ? (
                            <ul>
                                {goldTrophyDrops.trophyTasks.map((task) => {
                                    const { name, time, characters } = task;
                                    const char = characters[0];
                                    return (
                                        <Task
                                            key={`${name}-${char.name}`}
                                            characterName={char.name}
                                            level={char.level}
                                            time={time}
                                            canDoTask={canDoTask(task)}
                                            task={task}
                                            nightMode={nightMode}
                                        />
                                    );
                                })}
                            </ul>
                        ) : (
                            <Loading />
                        )}
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card title="Attractions">
                        {goldTrophyDrops?.trophyBuildings ? (
                            <ul>
                                {goldTrophyDrops.trophyBuildings.map(
                                    ({ name, time, unlock_info }) => {
                                        return (
                                            <Attraction
                                                key={name}
                                                name={name}
                                                time={time}
                                                unlock_info={unlock_info}
                                                haveNeededLevel={haveNeededAttractionLevel(
                                                    name
                                                )}
                                                nightMode={nightMode}
                                            />
                                        );
                                    }
                                )}
                            </ul>
                        ) : (
                            <Loading />
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
};

const Task = ({ task, characterName, level, time, canDoTask, nightMode }) => {
    const { name, buildingReq, costumeReq } = task;

    const { workMode } = useSelector((state) => state.appState);

    const classes = useStyles();

    if (!workMode) {
        return (
            <li
                className={clsx(
                    classes.item,
                    nightMode ? classes.nightModeItem : "",
                    !canDoTask ? classes.unobtained : ""
                )}
            >
                <Grid container>
                    <Grid item xs={3} sm={2}>
                        <CharacterImg name={characterName} />
                    </Grid>
                    <Grid item xs={9} sm={8}>
                        <p style={{ margin: 0 }}>
                            {characterName}: {name} ({time || "?h"}, Level{" "}
                            {level || "?"}){" "}
                        </p>
                        <p style={{ marginTop: 0 }}>
                            {(buildingReq || costumeReq) && " * "}
                            {buildingReq && buildingReq.name}
                            {buildingReq && costumeReq && ", "}
                            {costumeReq &&
                                `${costumeReq.character} ${costumeReq.name} Costume`}
                        </p>
                    </Grid>
                </Grid>
            </li>
        );
    } else {
        return (
            <li className={`${!canDoTask ? classes.unobtained : ""}`}>
                {characterName}: {name} ({time || "?h"}, Level {level || "?"}){" "}
                {(buildingReq || costumeReq) && " - "}
                {buildingReq && buildingReq.name}
                {buildingReq && costumeReq && ", "}
                {costumeReq &&
                    `${costumeReq.character} ${costumeReq.name} Costume`}
            </li>
        );
    }
};

const Attraction = ({
    name,
    time,
    unlock_info,
    haveNeededLevel,
    nightMode
}) => {
    const { workMode } = useSelector((state) => state.appState);

    const classes = useStyles();

    if (!workMode) {
        return (
            <li
                className={clsx(
                    classes.item,
                    nightMode ? classes.nightModeItem : "",
                    !haveNeededLevel.have ? classes.unobtained : ""
                )}
            >
                <Grid container>
                    <Grid item xs={3} sm={2}>
                        <AttractionImg name={name} size="sm" />
                    </Grid>
                    <Grid item xs={9} sm={8}>
                        {name} ({time || "?h"}
                        {unlock_info ? `, ${unlock_info}` : null}){" "}
                        {haveNeededLevel.message}
                    </Grid>
                </Grid>
            </li>
        );
    } else {
        return (
            <li className={`${!haveNeededLevel.have ? "unobtained" : ""}`}>
                {name} ({time || "?h"}
                {unlock_info ? `, ${unlock_info}` : null}){" "}
                {haveNeededLevel.message}
            </li>
        );
    }
};

export default StrikingGold;
