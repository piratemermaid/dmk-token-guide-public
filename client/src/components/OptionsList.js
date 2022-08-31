import React from "react";
import { connect } from "react-redux";
import { updateUserOptionData } from "../redux/actions/userData";

import { OPTIONS } from "../utils/globals";

const OptionsList = (props) => {
    function getOptionText(option) {
        switch (option) {
            case OPTIONS.USE_USER_DATA:
                return {
                    main: "Use Collection Manager info in Token Guide",
                    helper:
                        "(Turn this off if you don't want to keep track of your collection)"
                };
            case OPTIONS.USE_READY:
                return {
                    main: "Keep track of ready-to-level characters",
                    helper:
                        "(Turn this off to remove checkboxes from collection manager & not get leveling info)"
                };
            case OPTIONS.USE_LEVELING_DATA:
                return {
                    main:
                        "Group color highlighting in Collection Characters page",
                    helper:
                        "(Purple = all obtained characters maxed out, green = all obtained characters ready to level up, blue = all obtained characters have completed tokens aka maxed out or level 9 and ready to level up, grayed out = do not have any characters)"
                };
            case OPTIONS.LEVELING__SHOW_EVENT:
                return { main: "Show event characters section", helper: "" };
            case OPTIONS.LEVELING__SHOW_ALL_READY:
                return {
                    main:
                        "Only show collections with everyone ready to level up",
                    helper: ""
                };
            case OPTIONS.LEVELING__SHOW_CONFLICTS:
                return {
                    main: "Show event and favorite conflict warnings",
                    helper: ""
                };
            case OPTIONS.LEVELING__SHOW_MAGIC:
                return { main: "Show magic costs", helper: "" };
            case OPTIONS.SKIP_MAXED_IN_DROPDOWN:
                return {
                    main:
                        "Skip maxed characters and obtained costumes in the Token Guide dropdown",
                    helper: ""
                };
            case OPTIONS.LEVELING__SHOW_NOT_READY:
                return { main: "Show characters NOT ready to level up" };
            default:
                return { main: "", helper: "" };
        }
    }

    let rowClass;
    props.page === "leveling"
        ? (rowClass = "option-row")
        : (rowClass = "row option-row");
    if (props.condense) {
        rowClass += " condense";
    }

    let checkboxClass = "col s2 input-field checkbox-container";
    if (props.condense) {
        checkboxClass += " condense";
    }

    const condensedCol = 12 / props.optionsList.length;
    const condensedClass = `col m${condensedCol} s12`;

    return (
        <div>
            {props.optionsList.map((name) => {
                const value = props[name];

                const checkboxUI = (
                    <div
                        className={checkboxClass}
                        style={
                            props.page === "account" ? { width: "auto" } : {}
                        }
                    >
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id={`check-${name}`}
                                checked={value}
                                onChange={() =>
                                    props.updateUserOptionData(name, !value)
                                }
                            />
                            <span
                                className="character-counter"
                                style={{ float: "right", fontSize: "12px" }}
                            />
                        </div>
                    </div>
                );

                const text = getOptionText(name);
                const textUI = (
                    <div className="col s10">
                        <p className="options-text main">{text.main}</p>
                        <p className="options-text helper">{text.helper}</p>
                    </div>
                );

                return (
                    <div
                        className={rowClass}
                        key={name}
                        onClick={() => props.updateUserOptionData(name, !value)}
                    >
                        {props.condense ? (
                            <div className={condensedClass}>
                                {checkboxUI}
                                {textUI}
                            </div>
                        ) : (
                            <div>
                                {checkboxUI}
                                {textUI}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default connect(null, { updateUserOptionData })(OptionsList);
