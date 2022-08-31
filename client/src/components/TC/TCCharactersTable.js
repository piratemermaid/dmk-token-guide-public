import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import CharacterImg from "../images/CharacterImg";

const TCTable = ({ chars, showMyInfo }) => {
    const {
        userData: { characters: userChars },
        appState: { workMode, authenticated }
    } = useSelector((state) => {
        return state;
    });

    let chapters = {
        1: { 1: [], 2: [], 3: [], 4: [], 5: [] },
        2: { 1: [], 2: [], 3: [], 4: [], 5: [] },
        3: { 1: [], 2: [], 3: [], 4: [], 5: [] }
    };

    for (let char of chars) {
        const { name, chapter, row, featured } = char;
        let level;
        const userChar = _.find(userChars, { name });
        userChar ? (level = userChar.level) : (level = null);

        chapters[chapter][row].push({ name, featured, level });
    }

    const getTableUI = () => {
        let tableUI = [];

        for (let chapter in chapters) {
            tableUI.push(
                <tr key={chapter}>
                    <td rowSpan={6}>{chapter}</td>
                </tr>
            );

            const rows = chapters[chapter];

            for (let row in rows) {
                const rowChars = rows[row];

                if (workMode) {
                    let charStrings = [];

                    for (let char of rowChars) {
                        const { name, level, featured } = char;
                        let charString;
                        showMyInfo && authenticated
                            ? (charString = `${name} (${level || "X"})`)
                            : (charString = name);
                        if (!featured) {
                            charStrings.push(charString);
                        } else {
                            charStrings.push(`Featured: ${charString}`);
                        }
                    }

                    tableUI.push(
                        <tr key={charStrings.join(",")}>
                            <td>{charStrings.join(", ")}</td>
                        </tr>
                    );
                } else {
                    tableUI.push(
                        <tr key={`${chapter}-${row}`}>
                            <td>
                                {rowChars.map(({ name, level, featured }) => {
                                    return (
                                        <div
                                            key={name}
                                            className={clsx(
                                                "tc-char-img",
                                                !level || level < 1
                                                    ? "unob"
                                                    : false
                                            )}
                                        >
                                            <CharacterImg
                                                name={name}
                                                imgClass="char-img"
                                            />
                                            {showMyInfo && authenticated ? (
                                                <span>
                                                    {level && level > 0
                                                        ? `Lv ${level}`
                                                        : " ---"}
                                                    {featured && " (FEATURED)"}
                                                </span>
                                            ) : (
                                                <span>
                                                    {featured && "FEATURED"}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </td>
                        </tr>
                    );
                }
            }
        }

        return tableUI;
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Chapter</th>
                    <th>Characters</th>
                </tr>
            </thead>
            <tbody>{getTableUI()}</tbody>
        </table>
    );
};

export default TCTable;
