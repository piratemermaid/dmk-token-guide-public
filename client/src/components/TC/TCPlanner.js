import React from "react";

const TCPlanner = (props) => {
    function renderRows() {
        let rows = [];
        for (let row in props.chars) {
            rows.push(
                <div key={row} className="row tc-planner-row">
                    {props.chars[row].forEach(
                        ({ name, featured, obtained, tired, level }) => {
                            if (!featured) {
                                // skip unobtained characters
                                if (obtained) {
                                    return (
                                        <div
                                            className={`col ${
                                                window.innerWidth < 400
                                                    ? "s12"
                                                    : null
                                            }`}
                                            key={name}
                                            onClick={() =>
                                                changeChecked(name, !tired)
                                            }
                                            onChange={() =>
                                                changeChecked(name, !tired)
                                            }
                                        >
                                            <input
                                                type="checkbox"
                                                checked={tired}
                                                onClick={() =>
                                                    changeChecked(name, !tired)
                                                }
                                                onChange={() =>
                                                    changeChecked(name, !tired)
                                                }
                                            />
                                            <span>
                                                {name} ({level})
                                            </span>
                                        </div>
                                    );
                                }
                            }
                        }
                    )}
                </div>
            );
        }
        return rows;
    }

    function changeChecked(name, tired) {
        props.checkPlannerChar(name, tired);
    }

    return (
        <div>
            <div className="row">
                <p>
                    <b>Chapter {props.chap}</b>
                </p>
                <p>
                    <a
                        className="refresh-action"
                        onClick={() => props.globalRefresh()}
                    >
                        Global Refresh
                    </a>
                </p>
            </div>
            {renderRows()}
        </div>
    );
};

export default TCPlanner;
