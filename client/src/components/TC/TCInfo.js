import React from "react";
import TCCharactersTable from "./TCCharactersTable";

const TCInfo = ({
    tc: {
        number,
        grand_prize,
        dateSpan,
        prizes,
        characters,
        refreshTokenTasks
    },
    showMyInfo
}) => {
    return (
        <div className="card">
            <div className="card-content">
                <h4>
                    Tower Event {number}: {grand_prize}
                </h4>
                <p>{dateSpan}</p>
                <h6>Prizes:</h6>
                <ul>
                    {prizes.map(({ name, cost, currency }) => {
                        return (
                            <li key={name}>
                                {name || "?"}: {cost || "?"} {currency || "EC"}
                            </li>
                        );
                    })}
                </ul>
                <h6>Refresh tokens:</h6>
                {!refreshTokenTasks || refreshTokenTasks.length < 1 ? (
                    "Tappers"
                ) : (
                    <ul>
                        {refreshTokenTasks.map(({ name, time, characters }) => {
                            if (characters.length === 1) {
                                const char = characters[0];
                                return (
                                    <li key={`${char.name}_${name}`}>
                                        {char.name}: {name} ({time}, lv{" "}
                                        {char.level})
                                    </li>
                                );
                            } else {
                                const char1 = characters[0];
                                const char2 = characters[1];
                                return (
                                    <li
                                        key={`${char1.name}_${char2.name}_${name}`}
                                    >
                                        {char1.name} + {char2.name}: {name} (
                                        {time}, lv {char1.level} + {char2.level}
                                        )
                                    </li>
                                );
                            }
                        })}
                    </ul>
                )}
                <TCCharactersTable chars={characters} showMyInfo={showMyInfo} />
            </div>
        </div>
    );
};

export default TCInfo;
