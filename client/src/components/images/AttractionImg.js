import React from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { getImgName } from "../../utils/utils";

const useStyles = makeStyles({
    sm: {
        maxWidth: "60px",
        maxHeight: "60px"
    }
});

const AttractionImg = ({ name, imgClass, size, ...otherProps }) => {
    const classes = useStyles();

    return (
        <img
            src={`/img/attractions/${getImgName(name)}.png`}
            alt={name}
            title={name}
            className={clsx(
                imgClass || "coll-attraction-img",
                size ? classes[size] : false
            )}
            {...otherProps}
        />
    );
};

export default AttractionImg;
