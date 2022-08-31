import React from "react";

const PageSort = ({ sort, updateSort, sortTypes }) => {
    const SortAnchor = ({ name }) => {
        return (
            <a
                className={`anchor sort-anchor ${
                    sort === name ? "active-sort" : null
                }`}
                onClick={() => updateSort(name)}
            >
                {name}
            </a>
        );
    };

    return (
        <div className="row">
            <div className="col s12">
                Sort:{" "}
                {sortTypes.map((name) => {
                    return <SortAnchor name={name} key={name} />;
                })}
            </div>
        </div>
    );
};

export default PageSort;
