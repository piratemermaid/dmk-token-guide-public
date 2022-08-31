import React from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "../../../pages/collection/ScrollToTop";
import { CollectionCharacter } from "./";
import { GroupImg } from "../../images";

const GroupCard = ({
    group,
    characters,
    sortBy,
    useReady,
    updating,
    updateSelectedToken
}) => {
    const { workMode } = useSelector((state) => {
        return state.appState;
    });

    return (
        <div id={group} className="row">
            <div className="col s12">
                <div className="card coll-section">
                    <div className="card-content">
                        <div className="coll-collection row">
                            {!workMode && sortBy === "group" && (
                                <GroupImg name={group} className="coll-img" />
                            )}
                            <span
                                className={
                                    !workMode && sortBy === "group" && "title"
                                }
                            >
                                {group}
                            </span>
                        </div>
                        <div className="row coll-chars">
                            {characters.map((char) => {
                                if (char) {
                                    return (
                                        <CollectionCharacter
                                            key={char.name}
                                            charInfo={char}
                                            useReady={useReady}
                                            updating={updating}
                                            updateSelectedToken={
                                                updateSelectedToken
                                            }
                                        />
                                    );
                                }
                            })}
                        </div>
                        <div className="row right margin-bottom">
                            <ScrollToTop />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupCard;
