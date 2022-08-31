import React from "react";
import { Link } from "react-scroll";

const ScrollAnchor = ({ label, children, ...otherProps }) => {
    return (
        <Link
            to={label}
            key={label}
            smooth={true}
            duration={260}
            {...otherProps}
        >
            {children}
        </Link>
    );
};

export default ScrollAnchor;
