import React from "react";
import { connect, useDispatch } from "react-redux";
import { updateUserBuildingData } from "../../../redux/actions/userData";
import { AttractionImg, TokenImg } from "../../images";

const CollectionAttraction = (props) => {
    const { attractionInfo, status, userData, appState } = props;
    const { workMode } = appState;
    const { name, enchantment_group } = attractionInfo;

    const dispatch = useDispatch();

    const renderBuildingLevels = (name, status, tokens) => {
        let lvs = {};
        let lvsArr = [];

        for (let token of tokens) {
            const { level, name, tokenType } = token;
            let text;
            if (tokenType === "common") {
                text = `${name} common token`;
            } else if (tokenType === "fabric") {
                text = `${name} fabric token`;
            } else if (tokenType === "special") {
                text = name;
            } else {
                text = `${name}'s ${tokenType}`;
            }

            if (!lvs[level]) {
                lvs[level] = {
                    name,
                    tokenType,
                    text
                };
            }
        }

        for (let i = 0; i <= 5; i++) {
            const tokenDrop = lvs[i];
            lvsArr.push(
                <a
                    key={i}
                    className={
                        status === i
                            ? "token-drop-container current-level"
                            : "token-drop-container"
                    }
                    onClick={() =>
                        dispatch(updateUserBuildingData({ name, level: i }))
                    }
                    title={tokenDrop ? tokenDrop.text : null}
                >
                    <div className="token-drop-level">{i}</div>
                    {i < 5 ? (
                        <div className="token-drop-img">
                            {tokenDrop ? (
                                <TokenImg
                                    name={tokenDrop.name}
                                    type={tokenDrop.tokenType}
                                    imgClass="token-drop"
                                    ignoreWorkMode={true}
                                />
                            ) : null}
                        </div>
                    ) : (
                        <div className="token-drop-img">
                            <img
                                src="/img/other/double_drops.png"
                                alt="double drops"
                                title="double drops"
                                className="token-drop"
                            />
                        </div>
                    )}
                </a>
            );
        }

        return lvsArr;
    };

    const renderUnenchantableBuildingTokens = (name, tokens) => {
        let tokenArr = [];

        for (let token of tokens) {
            const { name, tokenType } = token;
            let text;
            if (tokenType === "common") {
                text = `${name} common token`;
            } else if (tokenType === "fabric") {
                text = `${name} fabric token`;
            } else if (tokenType === "special") {
                text = name;
            } else {
                text = `${name}'s ${tokenType}`;
            }

            tokenArr.push(
                <a
                    key={text}
                    className="token-drop-container unenchantable"
                    title={text}
                >
                    <div className="token-drop-img">
                        <TokenImg
                            name={token.name}
                            type={token.tokenType}
                            imgClass="token-drop"
                            ignoreWorkMode={true}
                        />
                    </div>
                </a>
            );
        }

        return tokenArr;
    };

    if (!workMode) {
        return (
            <div
                className={`col s12 l6 building-info 
            ${
                userData.updating && userData.updating.name === name
                    ? " updating"
                    : null
            } ${status < 0 ? "unobtained" : ""}`}
                key={name}
            >
                <div className="col s2 coll-attraction-img">
                    <AttractionImg
                        name={name}
                        imgClass="coll-attraction-img"
                        onClick={() =>
                            dispatch(
                                updateUserBuildingData({
                                    name,
                                    level: status === -1 ? 0 : -1
                                })
                            )
                        }
                    />
                </div>
                <div className="col s10 coll-attraction">
                    <p className="coll-attraction-name">{name}</p>
                    {enchantment_group ? (
                        <div className="row token-drop-row">
                            {renderBuildingLevels(
                                name,
                                status,
                                attractionInfo.tokens
                            )}
                        </div>
                    ) : (
                        <div
                            className={`row token-drop-row  ${
                                status < 0 ? "unobtained" : ""
                            }`}
                        >
                            {renderUnenchantableBuildingTokens(
                                name,
                                attractionInfo.tokens
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={`col s12 m6 l4 building-info 
            ${
                userData.updating && userData.updating.name === name
                    ? " updating"
                    : null
            }`}
                key={name}
            >
                <div
                    className="checkbox-wrapper"
                    onClick={() =>
                        dispatch(
                            updateUserBuildingData({
                                name,
                                level: status === -1 ? 0 : -1
                            })
                        )
                    }
                >
                    <input
                        type="checkbox"
                        checked={status >= 0 ? true : false}
                        onChange={() =>
                            dispatch(
                                updateUserBuildingData({
                                    name,
                                    level: status === -1 ? 0 : -1
                                })
                            )
                        }
                    />
                    <span>{name}</span>
                    {status === -1 && attractionInfo.unlock ? (
                        <span className="required">
                            {" "}
                            ({attractionInfo.unlock})
                        </span>
                    ) : null}
                </div>
                {enchantment_group ? (
                    <div
                        className={`row token-drop-row ${
                            status < 0 ? "unobtained" : ""
                        }`}
                    >
                        {renderBuildingLevels(
                            name,
                            status,
                            attractionInfo.tokens
                        )}
                    </div>
                ) : (
                    <div
                        className={`row token-drop-row  ${
                            status < 0 ? "unobtained" : ""
                        }`}
                    >
                        {renderUnenchantableBuildingTokens(
                            name,
                            attractionInfo.tokens
                        )}
                    </div>
                )}
            </div>
        );
    }
};

function mapStateToProps(state) {
    const { appState } = state;
    return { appState };
}

export default connect(mapStateToProps)(CollectionAttraction);
