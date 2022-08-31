import _ from "lodash";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useCharacterTokenData } from "../../hooks/appData";
import { useEvent } from "../../hooks/event";
import { CharacterImg } from "../images";
import { numberWithCommas } from "./levelingUtils";

// TODO: use react query to update level when leveling up

const useStyles = makeStyles({
    loadingText: { fontStyle: "italic", fontSize: "0.8em" }
});

const LevelingChar = ({
    charUserData,
    time,
    charUpdating,
    tableType,
    favoriteCharacters,
    charAppData,
    showMagic,
    showConflicts,
    lookupChar,
    levelUpChar,
    setCharReady
}) => {
    const [eventConflicts, setEventConflicts] = useState([]);
    const [favoriteConflicts, setFavoriteConflicts] = useState([]);

    const { name, level, target_level, favorite } = charUserData;
    const { magic_costs } = charAppData;

    const { workMode, nightMode } = useSelector((state) => state.appState);

    // TODO: pass from Leveling
    const event = useEvent();
    const {
        data: { conflicts: conflictsData, tokens },
        isLoading
    } = useCharacterTokenData(name);

    const classes = useStyles();

    useEffect(() => {
        if (showConflicts && conflictsData.length > 0 && event?.characters) {
            const conflicts = getConflictLists(
                conflictsData,
                event?.characters,
                favoriteCharacters
            );
            setEventConflicts(conflicts.eventConflicts);
            setFavoriteConflicts(conflicts.favoriteConflicts);
        }
    }, [showConflicts, conflictsData, event?.characters, favoriteCharacters]);

    return (
        <tr
            className={`leveling${charUpdating ? " gray-out" : ""}`}
            key={`${name}-${tableType}`}
        >
            <td className={event?.name ? "max-width-td" : null}>
                <Grid container alignItems="center">
                    {!workMode ? (
                        <Grid item>
                            <CharacterImg
                                name={name}
                                imgClass="char-img hover"
                                onClick={() => lookupChar(name)}
                            />
                        </Grid>
                    ) : null}
                    <Grid item style={{ lineHeight: "1em" }}>
                        <span
                            onClick={() => lookupChar(name)}
                            className="hover"
                        >
                            {name}
                        </span>{" "}
                        {isLoading ? (
                            <>
                                <br />
                                <span className={classes.loadingText}>
                                    Fetching conflicts...
                                </span>
                            </>
                        ) : null}
                        {eventConflicts.length > 0 ? (
                            <Warning type="Event" conflicts={eventConflicts} />
                        ) : null}
                        {favoriteConflicts.length > 0 ? (
                            <Warning
                                type="Favorite"
                                conflicts={favoriteConflicts}
                            />
                        ) : null}
                    </Grid>
                </Grid>
            </td>
            <td
                className={
                    showMagic || tableType === "favorites"
                        ? "hide-on-small-only"
                        : null
                }
            >
                {time}
            </td>
            {tableType === "favorites" ? (
                <td>
                    {!nightMode ? (
                        <span>
                            <img
                                className="target-icon"
                                src="/img/other/target_icon.png"
                                alt="target"
                                title="target"
                            />
                            {target_level || "none"}
                        </span>
                    ) : (
                        <span>
                            <img
                                className="target-icon"
                                src="/img/other/target_icon-white.png"
                                alt="target"
                                title="target"
                            />
                            {target_level || "none"}
                        </span>
                    )}
                </td>
            ) : null}
            {level !== 0 ? (
                <td>
                    <span className="hide-on-small-only">Level </span>
                    <span className="hide-on-small-only">
                        {`${level} -> ${level + 1}`}
                    </span>
                </td>
            ) : (
                <td>
                    <span className="hide-on-small-only">Welcome</span>
                </td>
            )}
            {showMagic ? (
                <td>
                    <img
                        src="/img/magic.png"
                        className="magic-icon"
                        alt="magic"
                        title="magic"
                    />
                    {magic_costs[level]
                        ? numberWithCommas(magic_costs[level])
                        : "?"}
                </td>
            ) : null}
            {showMagic && level === "unob" ? <td /> : null}
            <td>
                <div>
                    {tokens[0]?.rarity ? (
                        <div className={`rarity-circle ${tokens[0].rarity}`} />
                    ) : null}
                    {tokens[1]?.rarity ? (
                        <div className={`rarity-circle ${tokens[1].rarity}`} />
                    ) : null}
                </div>
            </td>
            <td>
                <button
                    className="btn deep-purple lighten-2"
                    onClick={() =>
                        levelUpChar({
                            name,
                            level: level + 1,
                            favorite
                        })
                    }
                >
                    <i className="material-icons">
                        {level > 0 ? "arrow_upward" : "waving_hand"}
                    </i>
                </button>
            </td>
            {tableType.includes("not") && (
                <td>
                    <button
                        className="btn deep-purple lighten-2"
                        onClick={() => setCharReady({ name, level })}
                    >
                        <i className="material-icons">done</i>
                    </button>
                </td>
            )}
        </tr>
    );
};

const getConflictLists = (conflicts, eventCharacters, favoriteCharacters) => {
    const list = _.uniq(_.map(conflicts, "name"));

    const eventConflicts = _.compact(
        eventCharacters.map((char) => {
            if (list.includes(char.name)) {
                return char.name;
            }
        })
    );

    const favoriteConflicts = _.compact(
        favoriteCharacters.filter((char) => list.includes(char))
    );

    return { eventConflicts, favoriteConflicts };
};

const Warning = ({ type, conflicts }) => {
    return (
        <span
            className={`leveling-warning leveling-warning-${type.toLowerCase()}`}
        >
            <br />
            {type} conflicts: {conflicts.join(", ")}
        </span>
    );
};

export default LevelingChar;
