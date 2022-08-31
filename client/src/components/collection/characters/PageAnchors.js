import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { GroupImg } from "../../images";
import { getGroupStatus } from "../../../utils/utils";
import ScrollAnchor from "../../ScrollAnchor/ScrollAnchor";

const PageAnchors = ({ list, sortBy, userData, appData, appState }) => {
    const { workMode } = appState;

    // TODO: get this value
    const useLevelingData = true;

    const getLinkClass = (group) => {
        let linkClasses = ["collection-link"];
        linkClasses.push(
            sortBy === "group" ? "collection-link-group" : "collection-link-lv"
        );
        if (workMode) {
            linkClasses.push("workMode");
        }
        if (useLevelingData && sortBy === "group") {
            const groupStatus = getGroupStatus(
                group,
                userData.characters,
                appData.groups
            );
            linkClasses.push(` coll-${groupStatus}`);
        }

        return linkClasses.join(" ");
    };

    return (
        <div className="page-anchors">
            {_.map(list, ({ group }, index) => {
                if (!workMode && sortBy === "group") {
                    return (
                        <ScrollAnchor label={group} key={index}>
                            <GroupImg
                                name={group}
                                imgClass={getLinkClass(group)}
                            />
                        </ScrollAnchor>
                    );
                } else {
                    return (
                        <ScrollAnchor
                            label={group}
                            className={getLinkClass(group)}
                            key={index}
                        >
                            {group}
                        </ScrollAnchor>
                    );
                }
            })}
        </div>
    );
};

const mapStateToProps = ({ userData, appData, appState }) => {
    return { userData, appData, appState };
};

export default connect(mapStateToProps)(PageAnchors);
