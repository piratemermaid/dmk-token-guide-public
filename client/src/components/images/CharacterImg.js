import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getImgName } from "../../utils/utils";

const CharacterImg = ({ name, imgClass, ...otherProps }) => {
    const { nightMode } = useSelector((state) => state.appState);

    return (
        <img
            src={`/img/characters/${getImgName(name)}.png`}
            className={[
                imgClass || "char-img",
                nightMode ? "nightMode-img-bg" : null
            ]
                .join(" ")
                .trim()}
            alt={name}
            title={name}
            key={name}
            {...otherProps}
        />
    );
};

CharacterImg.propTypes = {
    name: PropTypes.string.isRequired,
    imgClass: PropTypes.string
};

export default CharacterImg;
