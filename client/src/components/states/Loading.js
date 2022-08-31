import React from "react";
import "./loading.scss";

const Loading = () => {
    return (
        <div className="lds-wrapper center-align">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
