import React from "react";

const OutOfDate = () => {
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <div id="out-of-date-warning">
            There's a new site version available!{" "}
            <a onClick={refreshPage} style={{ textDecoration: "underline" }}>
                Reload to get the updates
            </a>
        </div>
    );
};

export default OutOfDate;
