import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CharacterImg = ({ name, imgClass, ...otherProps }) => {
    const { nightMode } = useSelector((state) => state.appState);

    const formattedName = name
        .replaceAll(" ", "_")
        .replaceAll('"', "")
        .replaceAll(".", "")
        .toLowerCase();

    return (
        <img
            src={`/img/webp/characters/C-${formattedName}.webp`}
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
