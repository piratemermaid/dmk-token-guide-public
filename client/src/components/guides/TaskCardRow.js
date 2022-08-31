import React from "react";

import TaskCard from "./TaskCard";
import Loading from "../states/Loading";

/**
 * TaskCardRow gets task info for the selected character from utils.getTasks
 * and passes them to TaskCard to display.
 * Parent: TokenGuide
 */
const TaskCardRow = (props) => {
    if (!props.tokenInfo) {
        return <Loading />;
    }

    const { tokenInfo } = props;

    let rowClass = "col l4 m6 s12";
    if (tokenInfo.length === 2) {
        rowClass = "col m6 s12";
    }
    if (tokenInfo.length === 1) {
        rowClass = "col l6 offset-l3 s12";
    }

    if (tokenInfo.length < 1) {
        return (
            <div className="row">
                <div className="task-row">
                    <div className="card">
                        <div className="card-content">
                            <p>No tasks for this token...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="row">
            {tokenInfo.map(
                ({
                    name,
                    tokenName,
                    type,
                    rarity,
                    tasks,
                    buildings,
                    floats
                }) => {
                    return (
                        <div className={rowClass} key={`${name}-${type}`}>
                            <TaskCard
                                token={{ name, tokenName, type, rarity }}
                                tasks={tasks}
                                buildings={buildings}
                                floats={floats}
                                lookup={props.lookup}
                                rowClass={rowClass}
                                useUserData={props.useUserData}
                            />
                        </div>
                    );
                }
            )}
        </div>
    );
};

export default TaskCardRow;
