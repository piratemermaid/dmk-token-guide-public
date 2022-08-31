import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "../../../pages/collection/ScrollToTop";
import CollectionAttraction from "./CollectionAttraction";
import { getImgName, capitalizeFirstLetter } from "../../../utils/utils";

const AttractionGroup = ({ group, groupBuildings, sort }) => {
    if (groupBuildings.length < 1) {
        return null;
    }

    const { userData, appState } = useSelector((state) => {
        return state;
    });
    const { workMode } = appState;

    return (
        <div id={group} className="row" key={group}>
            <div className="col s12">
                <div className="card coll-section">
                    <div className="card-content">
                        {sort !== "alphabetical" ? (
                            <div className="coll-collection row">
                                {!workMode && sort === "enchantment" ? (
                                    <img
                                        src={`/img/relics/${getImgName(
                                            group
                                        )}.png`}
                                        className="coll-img"
                                        alt={group}
                                        title={group}
                                    />
                                ) : null}
                                {capitalizeFirstLetter(group)}
                            </div>
                        ) : null}
                        <div className="row">
                            {groupBuildings.map((buildingInfo) => {
                                let status = -1;
                                const userBuilding = _.find(
                                    userData.buildings,
                                    {
                                        name: buildingInfo.name
                                    }
                                );
                                if (userBuilding) {
                                    status = userBuilding.level;
                                }
                                return (
                                    <CollectionAttraction
                                        key={buildingInfo.name}
                                        attractionInfo={buildingInfo}
                                        status={status}
                                        userData={userData}
                                    />
                                );
                            })}
                        </div>
                        <div className="row right">
                            <ScrollToTop />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttractionGroup;
