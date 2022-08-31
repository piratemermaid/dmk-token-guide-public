import React from "react";

const PwVisToggle = (props) => {
    const { togglePws, showPasswords } = props;

    return (
        <button
            className="btn deep-purple lighten-2 pw-vis-toggle"
            type="button"
            onClick={togglePws}
        >
            {showPasswords ? (
                <i className="material-icons">visibility_off</i>
            ) : (
                <i className="material-icons">visibility</i>
            )}
        </button>
    );
};

export default PwVisToggle;
