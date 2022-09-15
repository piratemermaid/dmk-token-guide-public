import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getImgNameNew } from "../../utils/utils";

const CharacterImg = ({ name, imgClass, ...otherProps }) => {
    const { nightMode } = useSelector((state) => state.appState);

    return (
        <img
            src={`/img/webp/characters/C-${getImgNameNew(name)}.webp`}
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
