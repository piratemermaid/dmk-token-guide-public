import React from "react";
import { connect } from "react-redux";

import Loading from "../states/Loading";
import { TokenImg } from "../images";
import { getImgName, buildingWarning, floatWarning } from "../../utils/utils";
import CharacterTaskRow from "./CharacterTaskRow";
import FloatImg from "../images/FloatImg";

/**
 * TaskCard displays the tasks to get the designated token (token, ears, or coll)
 * for the selected character
 * Parent: TaskCardRow
 */
export const TaskCard = (props) => {
    const { workMode, nightMode } = props.appState;

    if (!props.tasks) {
        return <Loading />;
    }

    const { name, tokenName, type, rarity } = props.token;

    if (
        props.tasks.length < 1 &&
        props.buildings.length < 1 &&
        props.floats.length < 1
    ) {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="task-card card-title">
                        <TokenImg
                            name={name}
                            tokenName={tokenName}
                            type={type}
                            imgClass={`token-img token-${rarity}`}
                        />
                    </div>
                    No tasks for this yet...
                </div>
            </div>
        );
    }

    function renderTasks() {
        let n = 0;
        return props.tasks.map((task) => {
            n++;
            return (
                <CharacterTaskRow
                    task={task}
                    key={n}
                    index={n}
                    userData={props.userData}
                    useUserData={props.useUserData}
                    lookup={props.lookup}
                />
            );
        });
    }

    function renderBuildings() {
        if (props.buildings) {
            return props.buildings.map(({ name, level, time }) => {
                let taskRowClass = "task-row";
                const warning = props.useUserData
                    ? buildingWarning(name, level, props.userData.buildings)
                    : null;
                if (warning) {
                    taskRowClass += " task-row-unob";
                }

                if (!workMode) {
                    return (
                        <tr key={name} className={taskRowClass}>
                            <td className="col m3 s4">
                                <img
                                    src={`/img/attractions/${getImgName(
                                        name
                                    )}.png`}
                                    alt="building"
                                    title="building"
                                    className={`task-row-attraction 
                                        ${
                                            nightMode
                                                ? "nightMode-img-bg"
                                                : null
                                        }`}
                                />
                            </td>
                            <td className="col m9 s8">
                                <p>{name}</p>
                                {time || "?"}
                                {level > 0 ? ` | Lv ${level}` : null}
                                {warning ? (
                                    <p className="required">Must {warning}</p>
                                ) : null}
                            </td>
                        </tr>
                    );
                } else {
                    return (
                        <tr key={name} className={taskRowClass}>
                            <td>
                                <p>
                                    <span>{name}</span>
                                </p>
                                {time || "?"}
                                {level > 0 ? ` | Lv ${level}` : null}
                                {warning ? (
                                    <p className="required">Must {warning}</p>
                                ) : null}
                            </td>
                        </tr>
                    );
                }
            });
        } else {
            return null;
        }
    }

    function renderFloats() {
        if (props.floats) {
            return props.floats.map(({ name }) => {
                let taskRowClass = "task-row";
                const warning = props.useUserData
                    ? floatWarning(name, props.userData.floats)
                    : null;
                if (warning) {
                    taskRowClass += " task-row-unob";
                }

                if (!workMode) {
                    return (
                        <tr key={name} className={taskRowClass}>
                            <td className="col m3 s4">
                                {" "}
                                <FloatImg
                                    name={name}
                                    className={`task-row-float 
                                        ${
                                            nightMode
                                                ? "nightMode-img-bg"
                                                : null
                                        }`}
                                />
                            </td>
                            <td className="col m9 s8">
                                <p>{name} Float</p>
                                {warning ? (
                                    <p className="required">Must {warning}</p>
                                ) : null}
                            </td>
                        </tr>
                    );
                } else {
                    return (
                        <tr key={name} className={taskRowClass}>
                            <td>
                                <p>
                                    <span>{name} Float</span>
                                </p>
                                {warning ? (
                                    <p className="required">Must {warning}</p>
                                ) : null}
                            </td>
                        </tr>
                    );
                }
            });
        } else {
            return null;
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="task-card card-title">
                    <TokenImg
                        name={name}
                        tokenName={tokenName}
                        type={type}
                        imgClass={`token-img token-${rarity}`}
                    />
                </div>
                <table>
                    <tbody>
                        {renderTasks()}
                        {renderBuildings()}
                        {renderFloats()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { userData, appState } = state;
    return { userData, appState };
};

export default connect(mapStateToProps)(TaskCard);
