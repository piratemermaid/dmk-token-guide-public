import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import Loading from "../states/Loading";
import { CharacterImg, TokenImg } from "../images";
import { userDataClass, sortConflicts } from "../../utils/utils";

/**
 * ConflictCard displays the selected character's token conflicts
 * Parent: TokenGuide
 */
const ConflictCard = (props) => {
    const { workMode } = props.appState;

    if (!props.conflicts) {
        return <Loading />;
    }

    const { conflicts, useUserData } = props;

    let regularConflicts = [];
    let eventConflicts = [];
    let favoriteConflicts = [];

    for (let token of conflicts) {
        const { name, tokenType } = token;
        let skip = false;

        if (tokenType === "special") {
            const info = _.find(props.appData.specialTokens, { name });
            if (info && info.mini_event) {
                if (
                    !props.appData.event.specialTokens.includes(name) &&
                    props.appData.event.name !== info.mini_event
                ) {
                    skip = true;
                }
            }
        }

        let tokenInfo = { name };

        if (tokenType === "token" || tokenType === "ears") {
            tokenInfo.type = "character";
        } else {
            tokenInfo.type = tokenType;
        }

        const displayClass = userDataClass(
            name,
            tokenInfo.type,
            props.userData,
            useUserData,
            props.appData
        );

        if (displayClass === "skip") {
            skip = true;
        }

        if (!skip) {
            if (
                _.find(props.event.characters, { name: token.name }) ||
                props.event.specialTokens.includes(token.name)
            ) {
                if (!_.find(eventConflicts, tokenInfo)) {
                    eventConflicts.push({
                        ...tokenInfo,
                        displayClass
                    });
                }
            } else if (
                tokenInfo.type === "character" &&
                _.find(props.userCharacters, { name }) &&
                _.find(props.userCharacters, { name }).favorite &&
                !_.find(favoriteConflicts, tokenInfo)
            ) {
                favoriteConflicts.push({
                    ...tokenInfo,
                    displayClass
                });
            } else {
                if (
                    !_.find(regularConflicts, tokenInfo) &&
                    !_.find(eventConflicts, tokenInfo) &&
                    !_.find(favoriteConflicts, tokenInfo)
                ) {
                    regularConflicts.push({
                        ...tokenInfo,
                        displayClass
                    });
                }
            }
        }
    }

    regularConflicts = sortConflicts(regularConflicts, props.tokenOrder);
    eventConflicts = sortConflicts(eventConflicts, props.tokenOrder);
    favoriteConflicts = sortConflicts(favoriteConflicts, props.tokenOrder);

    function renderConflicts(arr) {
        if (arr.length < 1) {
            return <div className="col">None!</div>;
        }

        let nonDisplayed = 0;
        const displayArr = arr.map(({ name, type, displayClass }) => {
            if (displayClass === "skip") {
                nonDisplayed++;
                return null;
            }

            if (!workMode) {
                return (
                    <div
                        className={`col flex ${
                            displayClass ? displayClass : null
                        }`}
                        key={name}
                        onClick={() => props.lookup({ name, type })}
                    >
                        {type === "character" ? (
                            <CharacterImg
                                name={name}
                                imgClass="char-img img-link"
                            />
                        ) : (
                            <TokenImg
                                name={name}
                                type={type}
                                imgClass="char-img img-link"
                            />
                        )}
                    </div>
                );
            } else {
                return (
                    <div
                        className="col flex l3 m4 s6 conflict"
                        key={name}
                        onClick={() => props.lookup({ name, type })}
                    >
                        <span
                            className={`${
                                type === "character" ? "name-link" : ""
                            } ${displayClass ? displayClass : null}`}
                        >
                            {name}
                            {type === "fabric" ? " Fabric" : null}
                        </span>
                    </div>
                );
            }
        });

        if (nonDisplayed === arr.length) {
            return <div className="col">None!</div>;
        } else {
            return displayArr;
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                {props.event.name ? (
                    <div>
                        <div
                            className={
                                !workMode
                                    ? "card-title card-conflict"
                                    : "card-title card-conflict"
                            }
                            style={{ textAlign: "left" }}
                        >
                            Event conflicts:
                        </div>
                        <div className="row conflict-row">
                            {renderConflicts(eventConflicts)}
                        </div>
                    </div>
                ) : null}
                {favoriteConflicts.length > 0 ? (
                    <div>
                        <div
                            className="card-title card-conflict"
                            style={{ textAlign: "left" }}
                        >
                            Favorite character conflicts:
                        </div>
                        <div className="row conflict-row">
                            {renderConflicts(favoriteConflicts)}
                        </div>
                    </div>
                ) : null}
                <div
                    className="card-title card-conflict"
                    style={{ textAlign: "left" }}
                >
                    {props.event.name ? "Other c" : "C"}onflicts:
                </div>
                <div className="row conflict-row">
                    {renderConflicts(regularConflicts)}
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const { appState } = state;
    return { appState };
}

export default connect(mapStateToProps)(ConflictCard);
