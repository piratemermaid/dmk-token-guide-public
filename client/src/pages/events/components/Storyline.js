import React from "react";
import { useEventStoryline } from "../../../hooks/event";

const Storyline = () => {
    const storyline = useEventStoryline();

    let arr = [];

    for (let date in storyline) {
        arr.push(
            <div key={date}>
                <h4 className="storyline-date">{date}</h4>
                <ul className="storyline-list">
                    {storyline[date].map((item) => {
                        const {
                            type,
                            name,
                            time,
                            EC,
                            common,
                            token,
                            ears,
                            characters,
                            specialTokens,
                            requirement,
                            amount,
                            subtask
                        } = item;
                        if (type === "welcome") {
                            return (
                                <li
                                    className={`storyline-item welcome`}
                                    key={`welcome-${name}`}
                                >
                                    Welcome {name} ({time || "?h"}) -{" "}
                                    {EC || "?"} EC, {common || "?"} common
                                    tokens, {token || token === 0 ? token : "?"}{" "}
                                    tokens, {ears || ears === 0 ? ears : "?"}{" "}
                                    ears
                                </li>
                            );
                        } else if (type === "quest") {
                            let charString = "";
                            for (let i in characters) {
                                const { name, level } = characters[i];
                                charString += `${name} (level ${
                                    level || "?"
                                }) `;
                                if (i < characters.length - 1) {
                                    charString += " + ";
                                }
                            }
                            return (
                                <li
                                    className={`storyline-item quest ${
                                        subtask
                                            ? "storyline-item-subtask"
                                            : null
                                    }`}
                                    key={`quest-${name}`}
                                >
                                    {name} ({time || "?h"}) - {charString}
                                </li>
                            );
                        } else if (type === "build") {
                            return (
                                <li
                                    className={`storyline-item build`}
                                    key={`build-${name}`}
                                >
                                    Build {name} ({time || "?h"}) - {EC || "?"}{" "}
                                    EC
                                </li>
                            );
                        } else if (type === "collect") {
                            let charString = "";
                            for (let i in characters) {
                                const { name, level } = characters[i];
                                charString += `${name} (level ${
                                    level || "?"
                                }) `;
                                if (i < characters.length - 1) {
                                    charString += " + ";
                                }
                            }
                            return (
                                <li
                                    className={`storyline-item collect`}
                                    key={`collect-${name}`}
                                >
                                    <span>
                                        <b>
                                            {name} - {requirement} x{amount} (
                                            {time || "?h"})
                                        </b>
                                    </span>
                                    <br />
                                    Characters: {charString}
                                </li>
                            );
                        } else if (type === "battle") {
                            let charString = "";
                            for (let i in characters) {
                                const { name, level } = characters[i];
                                charString += `${name} (level ${
                                    level || "?"
                                }) `;
                                if (i < characters.length - 1) {
                                    charString += " + ";
                                }
                            }
                            let specialTokenString = "";
                            for (let i in specialTokens) {
                                const { name, amount } = specialTokens[i];
                                specialTokenString += `${name} (x${
                                    amount || "?"
                                }) `;
                                if (i < specialTokens.length - 1) {
                                    specialTokenString += " + ";
                                }
                            }
                            return (
                                <li
                                    className={`storyline-item battle`}
                                    key={`battle-${name}`}
                                >
                                    <span>
                                        <b>
                                            {name} ({time || "?h"}) -{" "}
                                            {requirement} x{amount}
                                        </b>
                                    </span>
                                    <br />
                                    Tokens needed: {specialTokenString}
                                    <br />
                                    Characters: {charString}
                                </li>
                            );
                        } else {
                            // type "string" or "stringbold"
                            return (
                                <li
                                    className={`storyline-item ${type}`}
                                    key={`${type}-${name}`}
                                >
                                    {name}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        );
    }

    return <div>{arr}</div>;
};

export default Storyline;
