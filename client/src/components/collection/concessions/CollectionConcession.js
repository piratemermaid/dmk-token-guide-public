import React from "react";
import { connect } from "react-redux";

import { getImgName } from "../../../utils/utils";

const CollectionConcession = (props) => {
    const {
        concession,
        obtained,
        sort,
        sortTypes,
        updating,
        updateUserConcessionData,
        appState
    } = props;
    const { workMode } = appState;
    const { name, time, magic, group, category, rarity } = concession;

    if (!workMode) {
        return (
            <div
                className={`col coll-concession ${
                    updating && updating.name === name ? "updating" : null
                }  ${!obtained ? "unobtained" : "obtained"}`}
                onClick={() => updateUserConcessionData(name)}
                key={name}
            >
                <span>
                    <img
                        src={`/img/concessions/${getImgName(name)}.png`}
                        alt={name}
                        title={name}
                    />{" "}
                    <span className="coll-concession-text">
                        {name} ({time || "?h"}, {magic || "?"} magic)
                        {sort === sortTypes.group && group
                            ? ` - ${group}`
                            : null}
                        {sort === sortTypes.rarity ? (
                            <span>
                                {` - ${rarity || "?"}`}
                                <i className={`material-icons tiny`}>star</i>
                            </span>
                        ) : null}
                        {sort === sortTypes.type ? (
                            <span> - {category}</span>
                        ) : null}
                    </span>
                </span>
            </div>
        );
    } else {
        return (
            <div
                className={`checkbox-wrapper ${
                    updating && updating.name === name ? "updating" : null
                }`}
                onClick={() => updateUserConcessionData(name)}
                key={name}
            >
                <input
                    type="checkbox"
                    checked={obtained}
                    onChange={() => updateUserConcessionData(name)}
                />
                <span>
                    {name} ({time || "?h"}, {magic || "?"} magic)
                    {sort === sortTypes.group && group ? ` - ${group}` : null}
                    {sort === sortTypes.rarity ? (
                        <span>
                            {` - ${rarity || "?"}`}
                            <i className={`material-icons tiny`}>star</i>
                        </span>
                    ) : null}
                    {sort === sortTypes.type ? (
                        <span> - {category}</span>
                    ) : null}
                </span>
            </div>
        );
    }
};

function mapStateToProps(state) {
    const { appState } = state;
    return { appState };
}

export default connect(mapStateToProps)(CollectionConcession);
