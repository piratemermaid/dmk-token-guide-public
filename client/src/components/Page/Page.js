import React from "react";
import PropTypes from "prop-types";

import "./page.scss";

const Page = ({ header, subheader, include, id, children }) => {
    return (
        <div className="container" id={id || null}>
            <div className="row col s12">
                <div className="page-header">
                    {include ? include : null}
                    <h2>{header}</h2>
                    {subheader ? <h6>{subheader}</h6> : null}
                </div>
                {children}
            </div>
        </div>
    );
};

Page.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    include: PropTypes.node, // Token Guide selected image
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default Page;
