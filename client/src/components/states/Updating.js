import React from "react";

const Updating = (props) => {
    return (
        <div className="lds-wrapper center-align">
            <div>
                Waving my magic wand... please wait while I magic the database
                update
                <br />
                <br />
                {props.type ? `Updating ${props.type}...` : null}
                {props.message ? `${props.message}...` : null}
            </div>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Updating;
