import { useSelector } from "react-redux";

import { useAuthenticated } from "../../../hooks/user";

const ReqLevelsTableEntry = ({ name, level }) => {
    const { userData } = useSelector((state) => {
        return state;
    });

    const authenticated = useAuthenticated();

    function haveNeededLevel(name, neededLevel) {
        if (!authenticated) {
            return "";
        }

        const userChar = _.find(userData.characters, { name });
        if (!userChar || userChar.level === 0) {
            return "(X)";
        } else if (neededLevel && userChar.level >= neededLevel) {
            return "✓";
        } else {
            return `(${userChar.level})`;
        }
    }

    switch (level) {
        case 0:
            return "-";
        case null:
            return "?";
        default:
            return `${level} ${haveNeededLevel(name, level)}`;
    }
};

export default ReqLevelsTableEntry;
