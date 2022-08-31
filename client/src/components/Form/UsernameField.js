import React from "react";

import InputField from "./InputField";

const UsernameField = (props) => {
    const { id, label } = props;

    return (
        <InputField
            id={id || "username"}
            label={label || "Username"}
            type={"text"}
            onChange={props.onChange}
        />
    );
};

export default UsernameField;
