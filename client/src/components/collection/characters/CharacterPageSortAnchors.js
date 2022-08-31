import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const anchorList = [
    {
        url: "/collection",
        text: "Group"
    },
    {
        url: "/collection/level",
        text: "Level"
    },
    {
        url: "/collection/favorites",
        text: "Favorites"
    }
];

const CharacterPageSortAnchors = () => {
    const { pathname } = useLocation();

    const Anchor = ({ url, text }) => {
        return (
            <Link to={url}>
                <button
                    className={`btn char-sort-btn ${
                        url === pathname && "char-sort-active"
                    }`}
                >
                    {text}
                </button>
            </Link>
        );
    };

    return (
        <div className="row">
            <div className="col s12">
                View by:
                {anchorList.map(({ url, text }) => {
                    return <Anchor key={text} url={url} text={text} />;
                })}
            </div>
        </div>
    );
};

export default CharacterPageSortAnchors;
