import React from "react";
import PropTypes from "prop-types";
import { getImgName } from "../../utils/utils";

const GroupImg = ({ name, imgClass, ...otherProps }) => {
    const groupName = name !== "Star Wars (permanent)" ? name : "Star Wars";

    return (
        <img
            src={`/img/collections/${getImgName(groupName)}.png`}
            className={imgClass || "group-img"}
            alt={name}
            title={name}
            key={name}
            {...otherProps}
        />
    );
};

GroupImg.propTypes = {
    name: PropTypes.string.isRequired,
    imgClass: PropTypes.string
};

export default GroupImg;
