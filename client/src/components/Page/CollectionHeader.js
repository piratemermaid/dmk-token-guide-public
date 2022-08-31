import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "../Router/routes";

const CollectionPageHeader = (props) => {
    function getLinkClass(page, activePage) {
        let linkClass = "col l2 m4 s6 collection-link";
        if (page === activePage) {
            linkClass += " collection-link-active";
        }
        return linkClass;
    }

    return (
        <div>
            <div id="collection-header" className="row">
                <Link
                    to={ROUTES.MANAGE_COLLECTION}
                    className={getLinkClass("Characters", props.activePage)}
                >
                    Characters
                </Link>
                <Link
                    to={ROUTES.MANAGE_ATTRACTIONS}
                    className={getLinkClass("Attractions", props.activePage)}
                >
                    Attractions
                </Link>
                <Link
                    to={ROUTES.MANAGE_COSTUMES}
                    className={getLinkClass("Costumes", props.activePage)}
                >
                    Costumes
                </Link>
                <Link
                    to={ROUTES.MANAGE_FLOATS}
                    className={getLinkClass("Floats", props.activePage)}
                >
                    Floats
                </Link>
                <Link
                    to={ROUTES.MANAGE_CONCESSIONS}
                    className={getLinkClass("Concessions", props.activePage)}
                >
                    Concessions
                </Link>
                <Link
                    to={ROUTES.STATS}
                    className={getLinkClass("Stats", props.activePage)}
                >
                    Stats
                </Link>
            </div>
            <div className="container">
                <div className="row collection-title">
                    <div className="col s12">
                        <h2>My Collection</h2>
                        <h3>{props.activePage}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionPageHeader;
