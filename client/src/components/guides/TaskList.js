import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { setTargetLevel } from "../../redux/actions/userData";

import { taskWarnings, getTokenName } from "../../utils/utils";
import { TokenImg } from "../images";

/**
 * TaskList displays the selected character's tasks
 * Parent element: TaskGuide
 */
const TaskList = (props) => {
    const { selected, tasks, sortBy, userData, appState } = props;
    const { workMode, nightMode } = appState;

    const sortedTasks = props.sortTasks(tasks, sortBy);

    function renderTokens(tokens) {
        let key = 0;
        let tokenArr = [];

        for (let token of tokens) {
            const { name, tokenType } = token;
            key++;

            if (workMode) {
                tokenArr.push(
                    <li key={key}>
                        <TokenImg
                            name={name}
                            tokenName={getTokenName({
                                name,
                                tokenType,
                                characters: props.characters
                            })}
                            type={tokenType}
                        />
                    </li>
                );
            } else {
                tokenArr.push(
                    <TokenImg
                        name={name}
                        tokenName={getTokenName({
                            name,
                            tokenType,
                            characters: props.characters
                        })}
                        type={tokenType}
                        imgClass="char-img"
                    />
                );
            }
        }

        if (workMode) {
            return <ul className="task-guide-tokens">{tokenArr}</ul>;
        } else {
            return tokenArr;
        }
    }

    /**
     * Check user's current data and determine what action to take
     * e.g. If current target level is higher than the one that is being set,
     * ask the user if they want to change it.
     * @param {string} name: character name
     * @param {obj} userChar: user's info for character
     * @param {int} targetLevel: target level selected
     */
    function checkTargetLevel({ name, userChar, targetLevel }) {
        let update;

        if (!userChar || !userChar.target_level) {
            update = window.confirm(
                `Set ${name} target level to ${targetLevel}?`
            );
        } else if (userChar.target_level !== targetLevel) {
            update = window.confirm(
                `${name} target level is currently set to ${userChar.target_level}. Change to ${targetLevel}?`
            );
        } else if (userChar.target_level === targetLevel) {
            window.confirm(
                `${name} target level is already set to ${targetLevel}.`
            );
            update = false;
        }

        if (update) {
            props.setTargetLevel(name, targetLevel);
        }
    }

    function renderRequired(required, i) {
        let reqText = "";

        for (let i = 0; i < required.length; i++) {
            const req = required[i];
            if (req.type === "costume") {
                reqText += req.label;
            } else {
                reqText += req.name;
            }

            if (req.level) {
                reqText += ` level ${req.level}`;
            }

            if (i < required.length - 1) {
                reqText += ", ";
            }
        }
        return <span key={i}>{reqText}</span>;
    }

    let i = 0;

    return (
        <div className="card">
            <div className="card-content">
                <div className="card-title">{selected}'s Tasks</div>
                {props.tasks && props.tasks.length < 1 ? (
                    <div>No tasks yet...</div>
                ) : (
                    <table>
                        <tbody>
                            {sortedTasks.map((task) => {
                                const {
                                    name,
                                    time,
                                    taskCharacters,
                                    tokenConflicts,
                                    required
                                } = task;

                                let warnings = [];
                                if (userData && props.useUserData) {
                                    warnings = taskWarnings(
                                        task,
                                        props.userData
                                    );
                                }
                                let rowClass;
                                if (warnings.length > 0) {
                                    rowClass = "task-row-unob";
                                }

                                let level, joint, jointLevel, userCharJoint;

                                const userChar = _.find(userData.characters, {
                                    name: selected
                                });

                                if (taskCharacters.length > 1) {
                                    taskCharacters.map((char) => {
                                        if (char.name === props.selected) {
                                            level = char.level;
                                        } else {
                                            joint = char.name;
                                            jointLevel = char.level;
                                            userCharJoint = _.find(
                                                userData.characters,
                                                { name: char.name }
                                            );
                                        }
                                        return null;
                                    });
                                } else {
                                    level = taskCharacters[0].level;
                                }

                                let targetIconSrc = "/img/other/target_icon";
                                if (nightMode) {
                                    targetIconSrc += "-white";
                                }
                                targetIconSrc += ".png";

                                return (
                                    <tr
                                        key={name + time + level}
                                        className={rowClass}
                                    >
                                        <td>
                                            <p>
                                                {name} | {time} | Level{" "}
                                                {level || "?"}{" "}
                                                {!userChar ||
                                                userChar.level < level ? (
                                                    <img
                                                        className="target-icon-sm"
                                                        alt="Set target level"
                                                        title="Set target level"
                                                        src={targetIconSrc}
                                                        onClick={() =>
                                                            checkTargetLevel({
                                                                name: selected,
                                                                userChar,
                                                                targetLevel:
                                                                    level
                                                            })
                                                        }
                                                    />
                                                ) : null}
                                                {joint ? (
                                                    <span>
                                                        {" "}
                                                        + {joint} | Level{" "}
                                                        {jointLevel || "?"}{" "}
                                                        {!userCharJoint ||
                                                        userCharJoint.level <
                                                            jointLevel ? (
                                                            <img
                                                                className="target-icon-sm"
                                                                alt="Set target level"
                                                                title="Set target level"
                                                                src={
                                                                    targetIconSrc
                                                                }
                                                                onClick={() =>
                                                                    checkTargetLevel(
                                                                        {
                                                                            name: joint,
                                                                            userChar:
                                                                                userCharJoint,
                                                                            targetLevel:
                                                                                jointLevel
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        ) : null}
                                                    </span>
                                                ) : null}
                                            </p>
                                            {required.length > 0 ? (
                                                <p style={{ fontSize: "12px" }}>
                                                    Required:{" "}
                                                    {renderRequired(
                                                        required,
                                                        i
                                                    )}
                                                </p>
                                            ) : null}
                                            {warnings.length > 0 ? (
                                                <p style={{ fontSize: "12px" }}>
                                                    *Must {warnings.join(", ")}
                                                </p>
                                            ) : null}
                                            {renderTokens(tokenConflicts)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { userData, appState } = state;
    return { userData, appState };
};

export default connect(mapStateToProps, { setTargetLevel })(TaskList);
