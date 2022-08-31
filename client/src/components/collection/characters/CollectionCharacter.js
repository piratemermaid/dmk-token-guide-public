import React from "react";
import ClickNHold from "react-click-n-hold";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
    updateUserCharacterData,
    setTargetLevel
} from "../../../redux/actions/userData";

import { CharacterImg } from "../../images";

/**
 * CollectionCharacter displays a character in the collection.
 * Parent: Characters
 */
const CollectionCharacter = (props) => {
    const { charInfo, useReady, updating, appState, displayTargetLevel } =
        props;
    const { name } = charInfo;
    const { workMode, nightMode } = appState;

    // If character is unobtained, add "unobtained" class to row
    let rowClass = "coll-char row";
    if (charInfo.level === 0) {
        rowClass += " unobtained";
    }
    if (updating && updating.name === name) {
        rowClass += " updating";
    }

    let starClass = "favorite-star";
    if (charInfo.favorite) {
        starClass += " favorite-star-active";
    }

    function lookupChar(name) {
        window.scrollTo(0, 0);
        props.updateSelectedToken({ name, type: "character" });
        props.history.push("/");
    }

    function clickNHold() {
        const level = prompt("What level do you want to set?");
        if (level && level >= 0 && level <= 10) {
            props.updateUserCharacterData({ ...charInfo, level });
        }
    }

    function setTargetLevel(name) {
        const target_level = prompt(
            `What target level do you want to set for ${name}? Enter 0 to remove target level.`
        );
        if (target_level && target_level >= 0 && target_level <= 10) {
            props.setTargetLevel(name, target_level);
        }
    }

    function promptTargetLevel(info) {
        const { name, level, ready, favorite } = info;

        // If character is already a favorite, user is unfavoriting,
        // so don't prompt for target level
        if (favorite) {
            props.updateUserCharacterData({
                ...charInfo,
                favorite: !charInfo.favorite
            });
        } else {
            const target_level = prompt(
                `You have chosen ${name} as a favorite. If you wish to set a target level for ${name}, enter it now. Cancel to favorite without setting a target level.`
            );
            // Set target level if one was entered, it is between 0 and 10,
            // and it is greater than the character's current level.
            // If not, update user info to toggle favorite without setting target level
            if (
                target_level &&
                target_level >= 0 &&
                target_level <= 10 &&
                target_level > level
            ) {
                props.setTargetLevel(name, target_level);
            } else {
                props.updateUserCharacterData({
                    ...charInfo,
                    favorite: !charInfo.favorite
                });
            }
        }
    }

    let statusText;
    if (charInfo.level === 0) {
        statusText = "---";
    } else if (charInfo.level < 10) {
        statusText = `Level ${charInfo.level}`;
    } else {
        statusText = "MAX!";
    }

    return (
        <div className="col l4 m6 s12" key={charInfo.name}>
            <div className={rowClass}>
                <div className="col s2 coll-actions">
                    <i
                        className={`material-icons coll-action coll-action-up${
                            charInfo.level === 10 ? " gray-out" : null
                        }`}
                        onClick={() =>
                            props.updateUserCharacterData({
                                ...charInfo,
                                level: charInfo.level + 1,
                                ready: false
                            })
                        }
                    >
                        arrow_drop_up
                    </i>
                    <i
                        className={`material-icons coll-action coll-action-up${
                            charInfo.level < 1 ? " gray-out" : null
                        }`}
                        onClick={() =>
                            props.updateUserCharacterData({
                                ...charInfo,
                                level: charInfo.level - 1
                            })
                        }
                    >
                        arrow_drop_down
                    </i>
                </div>
                <div className="col s9 coll-character">
                    <span
                        className={
                            workMode
                                ? "character-name name-link"
                                : "character-name"
                        }
                        onClick={() => lookupChar(name)}
                    >
                        {name}
                    </span>
                    <br />
                    <span>
                        <ClickNHold time={0.5} onClickNHold={clickNHold}>
                            <a className="character-level left">{statusText}</a>
                        </ClickNHold>
                        {useReady ? (
                            <span
                                title="Ready to level up?"
                                className={
                                    charInfo.level === 10
                                        ? "ready-trigger hidden"
                                        : "ready-trigger"
                                }
                            >
                                <div
                                    className={
                                        charInfo.ready
                                            ? "valign-wrapper center-align ready-box ready-yes"
                                            : "ready-box"
                                    }
                                    onClick={() =>
                                        props.updateUserCharacterData({
                                            ...charInfo,
                                            ready: !charInfo.ready
                                        })
                                    }
                                >
                                    {charInfo.ready ? (
                                        <i className="material-icons tiny coll-action coll-action-up">
                                            check
                                        </i>
                                    ) : null}
                                </div>
                            </span>
                        ) : null}
                    </span>
                    {displayTargetLevel && charInfo.target_level && (
                        <span>
                            <br />
                            Target Level:{" "}
                            <a
                                onClick={() => setTargetLevel(charInfo.name)}
                                className="target-level"
                            >
                                {charInfo.target_level &&
                                charInfo.target_level > charInfo.level
                                    ? charInfo.target_level
                                    : "Set"}
                            </a>
                        </span>
                    )}
                    {!workMode ? (
                        <CharacterImg
                            name={name}
                            imgClass={`char-img img-link  ${
                                nightMode ? "nightMode-img-bg" : null
                            }`}
                            onClick={() => lookupChar(name)}
                        />
                    ) : null}
                </div>
                <div className="col s1" style={{ padding: 0 }}>
                    {charInfo.level !== 10 ? (
                        <span>
                            <i
                                className={`material-icons right ${starClass}`}
                                onClick={() => promptTargetLevel(charInfo)}
                            >
                                star
                            </i>
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const { appState } = state;
    return { appState };
}

export default connect(mapStateToProps, {
    updateUserCharacterData,
    setTargetLevel
})(withRouter(CollectionCharacter));
