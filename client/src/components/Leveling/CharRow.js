import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { CharacterImg } from "../images";

const CharRow = ({
    char,
    tableType,
    charUpdating,
    warning,
    time,
    charRarities,
    levelUpChar,
    setCharReady,
    lookupChar
}) => {
    const appData = useSelector((state) => state.appData);
    const userData = useSelector((state) => state.userData);
    const appState = useSelector((state) => state.appState);

    const { name, level, welcome_time, target_level } = char;

    const charInfo = _.find(appData.characters, { name });
    const { magic_costs, favorite } = charInfo;

    const showMagic = _.find(userData.options, { name: "leveling__showMagic" })
        .value;

    return (
        <tr className={`leveling${charUpdating ? " gray-out" : ""}`} key={name}>
            <td className={appData.event.name ? "max-width-td" : null}>
                {!appState.workMode ? (
                    <CharacterImg
                        name={name}
                        imgClass="char-img hover"
                        onClick={() => lookupChar(name)}
                    />
                ) : null}
                <p>
                    <span onClick={() => lookupChar(name)} className="hover">
                        {name}
                    </span>{" "}
                    {warning && warning.bool ? (
                        <span
                            className={`leveling-warning leveling-warning-${warning.type}`}
                        >
                            <span className="hide-on-med-and-up">
                                <br />
                            </span>
                            ({warning.text})
                        </span>
                    ) : null}
                </p>
            </td>
            <td
                className={
                    showMagic || tableType === "favorites"
                        ? "hide-on-small-only"
                        : null
                }
            >
                {time}
            </td>
            {tableType === "favorites" ? (
                <td>
                    {!appState.nightMode ? (
                        <span>
                            <img
                                className="target-icon"
                                src="/img/other/target_icon.png"
                                alt="target"
                                title="target"
                            />
                            {target_level || "none"}
                        </span>
                    ) : (
                        <span>
                            <img
                                className="target-icon"
                                src="/img/other/target_icon-white.png"
                                alt="target"
                                title="target"
                            />
                            {target_level || "none"}
                        </span>
                    )}
                </td>
            ) : null}
            {level !== 0 ? (
                <td>
                    <span className="hide-on-small-only">Level </span>
                    <span className="hide-on-small-only">
                        {`${level} -> ${level + 1}`}
                    </span>
                </td>
            ) : (
                <td>
                    <span className="hide-on-small-only">Welcome</span>
                </td>
            )}
            {showMagic ? (
                <td>
                    <img
                        src="/img/magic.png"
                        className="magic-icon"
                        alt="magic"
                        title="magic"
                    />
                    {magic_costs[level]
                        ? numberWithCommas(magic_costs[level])
                        : "?"}
                </td>
            ) : null}
            {showMagic && level === "unob" ? <td /> : null}
            <td>
                {charRarities ? (
                    <div>
                        <div className={`rarity-circle ${charRarities[0]}`} />
                        <div className={`rarity-circle ${charRarities[1]}`} />
                    </div>
                ) : null}
            </td>
            <td>
                <button
                    className="btn deep-purple lighten-2"
                    onClick={() =>
                        levelUpChar({
                            name,
                            level: level + 1,
                            favorite
                        })
                    }
                >
                    <i className="material-icons">
                        {level > 0 ? "arrow_upward" : "waving_hand"}
                    </i>
                </button>
            </td>
            {tableType.includes("not") && (
                <td>
                    <button
                        className="btn deep-purple lighten-2"
                        onClick={() => setCharReady({ name, level })}
                    >
                        <i className="material-icons">done</i>
                    </button>
                </td>
            )}
        </tr>
    );
};

export default CharRow;

function numberWithCommas(x) {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
