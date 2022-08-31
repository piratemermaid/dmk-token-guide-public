import React from "react";

const PwStrengthTips = () => {
    return (
        <div id="pw-suggestions" className="col s12">
            For a stronger password, try adding:
            <ul>
                <li>Mix of lowercase/uppercase</li>
                <li>Numbers</li>
                <li>Special characters</li>
                <li>Longer length</li>
            </ul>
        </div>
    );
};

export default PwStrengthTips;
