import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getImgName } from "../../utils/utils";

/**
 * Get a token image based on its type
 * or just the string to be displayed if in workMode
 * @param {string} name: character name
 * @param {string} tokenName: token name (e.g. "Bow" for Daisy Duck)
 * @param {string} type: token type e.g. "ears"
 * @param {string} imgClass: class for image
 * @param {boolean} workMode: work mode
 * @param {string} key: key for image for if it is different than imgTitle
 */
const getTokenImg = ({
    name,
    tokenName,
    type,
    imgClass,
    appState,
    ignoreWorkMode
}) => {
    const { workMode } = appState;

    let imgSrc, imgTitle;

    switch (type) {
        case "fabric":
            imgTitle = `${name} fabric`;
            break;
        case "special":
            imgTitle = `${name} token`;
            break;
        case "common":
            imgTitle = `${name} common token`;
            break;
        case "ears":
            imgTitle = `${name} ears token`;
            break;
        default:
            imgTitle = tokenName
                ? `${name}'s ${tokenName} token`
                : `${name} token`;
            break;
    }

    if (workMode && !ignoreWorkMode) {
        return imgTitle;
    }

    switch (type) {
        case "fabric":
            imgSrc = `/img/fabric/${getImgName(name)}.png`;
            break;
        case "special":
            imgSrc = `/img/special_tokens/${getImgName(name)}.png`;
            break;
        case "common":
            imgSrc = `/img/character_tokens/${getImgName(name)}-common.png`;
            break;
        case "ears":
            imgSrc = `/img/character_tokens/${getImgName(name)}-${type}.png`;
            break;
        default:
            imgSrc = `/img/character_tokens/${getImgName(name)}-${type}.png`;
            break;
    }

    return (
        <img
            src={imgSrc}
            className={imgClass}
            alt={imgTitle}
            title={imgTitle}
            key={imgTitle}
        />
    );
};

const mapStateToProps = ({ appState }) => {
    return { appState };
};

getTokenImg.propTypes = {
    name: PropTypes.string.isRequired,
    tokenName: PropTypes.string,
    type: PropTypes.string.isRequired,
    imgClass: PropTypes.string,
    key: PropTypes.string,
    ignoreWorkMode: PropTypes.bool
};

export default connect(mapStateToProps)(getTokenImg);
