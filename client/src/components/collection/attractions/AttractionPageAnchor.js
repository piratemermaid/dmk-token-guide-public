import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { getImgName } from "../../../utils/utils";

const AttractionPageAnchor = ({ name, sort }) => {
    const {
        appState: { workMode },
        appData: { groups }
    } = useSelector((state) => {
        return state;
    });

    if (sort !== "group" || workMode) {
        let anchorText;
        const groupInfo = _.find(groups, { name });
        if (groupInfo && groupInfo.nickname && workMode) {
            anchorText = groupInfo.nickname;
        } else {
            anchorText = name;
        }
        return <span>{anchorText}</span>;
    } else {
        return (
            <img
                className="collection-link"
                src={`/img/relics/${getImgName(name)}.png`}
                alt={`${name} relic`}
                title={`${name} relic`}
            />
        );
    }
};

export default AttractionPageAnchor;
