import React from "react";

const PwStrengthIndicator = (props) => {
    const { score } = props;

    const getPwStrengthText = (score) => {
        switch (score) {
            case 0:
                return "Very Weak";
            case 1:
                return "Weak";
            case 2:
                return "Good";
            case 3:
                return "Great";
            case 4:
                return "Very secure";
            default:
                return null;
        }
    };

    return (
        <div id="pw-strength-indicator" className={`score-${score}`}>
            Password Strength: {getPwStrengthText(score)}
        </div>
    );
};

export default PwStrengthIndicator;
