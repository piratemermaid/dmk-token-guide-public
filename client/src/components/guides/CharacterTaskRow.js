import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { CharacterImg, TokenImg } from "../images";
import { taskWarnings } from "../../utils/utils";

/**
 * Parent: TaskCard
 */
const CharacterTaskRow = (props) => {
    const { task, index, userData, appState } = props;
    const { workMode } = appState;
    const {
        name,
        taskCharacters,
        time,
        tokenConflicts,
        required
        // trophies //TODO: show trophies
    } = task;

    let type, taskChar, joint;
    if (taskCharacters && taskCharacters.length > 0) {
        type = "char";
        taskChar = taskCharacters[0];
        if (!taskChar) {
            return null;
        }
        if (!taskChar.level) {
            taskChar.level = "?";
        }
        if (taskCharacters[1]) {
            joint = taskCharacters[1];
            if (!joint.level) {
                joint.level = "?";
            }
        }
    } else {
        type = "other";
    }

    let taskText = name;
    if (required && required.length > 0) {
        taskText += "*";
    }

    let taskRowClass = "task-row";
    let noHaveRequired;

    let warnings = [];
    // show no warnings if user isn't using collection tracking
    if (props.useUserData) {
        warnings = taskWarnings(task, userData);
    }
    if (warnings.length > 0) {
        taskRowClass += " task-row-unob";
    }

    // Condense characters with multiple token drops
    // (use this if later adding option to view by token)
    // Doing it without lodash because of dupe names with non-character tokens
    // e.g. Aladdin
    let conflictsByName = [];
    for (let token of tokenConflicts) {
        const { name, tokenType } = token;
        if (tokenType === "token" || tokenType === "ears") {
            if (!_.find(conflictsByName, { name })) {
                conflictsByName.push(token);
            }
        } else {
            if (!_.find(conflictsByName, { name, tokenType })) {
                conflictsByName.push(token);
            }
        }
    }

    let taskConflictsUI;
    if (tokenConflicts.length > 0) {
        if (workMode) {
            const taskConflictsArr = conflictsByName.map(
                ({ name, tokenType }) => {
                    let conflictText = name;
                    if (tokenType === "fabric") {
                        conflictText += " Fabric";
                    }
                    return conflictText;
                }
            );
            taskConflictsUI = taskConflictsArr.join(", ");
        } else {
            taskConflictsUI = conflictsByName.map(({ name, tokenType }) => {
                return (
                    <TokenImg
                        key={`${name}-${tokenType}`}
                        name={name}
                        type={tokenType}
                        imgClass="task-conflict"
                    />
                );
            });
        }
    }

    if (!taskChar) {
        return null;
    }
    if (!workMode) {
        return (
            <tr key={index} className={taskRowClass}>
                <td className="col m3 s4">
                    {getImg(type, taskChar.name, joint)}
                    {joint ? getImg("joint", joint.name, false) : null}
                </td>
                <td className="col m9 s8">
                    <p>{taskText}</p>
                    {time || "?"}
                    {taskChar && taskChar.level
                        ? getLevel(taskChar.level, joint)
                        : null}
                    {required ? (
                        <p className="required">{renderRequired(required)}</p>
                    ) : null}
                    {tokenConflicts.length > 0 ? (
                        <p className="task-conflicts">
                            Conflicts:
                            <br />
                            {taskConflictsUI}
                        </p>
                    ) : null}
                    {warnings.length > 0 ? (
                        <p className="required">Must {warnings.join(", ")}</p>
                    ) : null}
                </td>
            </tr>
        );
    } else {
        return (
            <tr key={index} className={taskRowClass}>
                <td>
                    <p>
                        <span
                            className="name-link"
                            onClick={() =>
                                props.lookup({
                                    name: taskChar.name,
                                    type: "character"
                                })
                            }
                        >
                            {taskChar.name}
                        </span>{" "}
                        {joint ? (
                            <span>
                                +{" "}
                                <span
                                    className="name-link"
                                    onClick={() =>
                                        props.lookup({
                                            name: joint.name,
                                            type: "character"
                                        })
                                    }
                                >
                                    {joint.name}
                                </span>
                            </span>
                        ) : null}
                    </p>
                    {type !== "other" ? <p>{taskText}</p> : null}
                    {time || "?"}
                    {noHaveRequired ? <p>{noHaveRequired}</p> : null}
                    {taskChar && taskChar.level
                        ? getLevel(taskChar.level, joint)
                        : null}
                    {required ? (
                        <p className="required">{renderRequired(required)}</p>
                    ) : null}
                    {tokenConflicts.length > 0 ? (
                        <p className="task-conflicts">
                            Conflicts:
                            <br />
                            {taskConflictsUI}
                        </p>
                    ) : null}
                    {warnings.length > 0 ? (
                        <p className="required">Must {warnings.join(", ")}</p>
                    ) : null}
                </td>
            </tr>
        );
    }

    function getImg(type, name, info) {
        let imgClass;
        if (type === "char") {
            // info - joint
            info
                ? (imgClass = "char-img img-link joint-yes")
                : (imgClass = "char-img img-link joint-no");
        } else if (type === "joint") {
            imgClass = "char-img img-link joint-img";
        }

        return (
            <CharacterImg
                name={name}
                className={imgClass}
                onClick={() =>
                    props.lookup({
                        name,
                        type: type === "char" ? "character" : ""
                    })
                }
            />
        );
    }

    function getLevel(level, joint) {
        let levelStr = ` | Lv ${level || "?"}`;
        if (joint) {
            levelStr += ` + Lv ${joint.level || "?"}`;
        }
        return levelStr;
    }

    function renderRequired(required) {
        if (required.length < 1) {
            return null;
        }

        let requirementStrings = [];
        for (let req of required) {
            let reqStr = "";
            if (req.type === "costume") {
                reqStr = req.label;
            } else {
                reqStr += req.name;
                if (req.level) {
                    reqStr += ` level ${req.level}`;
                }
            }
            requirementStrings.push(reqStr);
        }

        return (
            <span className="required">
                *Required: {requirementStrings.join(" + ")}
            </span>
        );
    }
};

function mapStateToProps(state) {
    const { appState } = state;
    return { appState };
}

export default connect(mapStateToProps)(CharacterTaskRow);
