import React from "react";
import { Link as ScrollLink } from "react-scroll";

const ScrollToTop = () => {
    return (
        <ScrollLink
            className="top-link"
            to="header"
            smooth={true}
            duration={200}
        >
            Top
            <i className="material-icons tiny">arrow_upward</i>
        </ScrollLink>
    );
};

export default ScrollToTop;
