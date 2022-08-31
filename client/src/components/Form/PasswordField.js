import React from "react";

import InputField from "./InputField";

const PasswordField = (props) => {
    const { id, label, showPasswords } = props;

    return (
        <InputField
            id={id || "password"}
            label={label || "Password"}
            type={!showPasswords ? "password" : "text"}
            onChange={props.onChange}
        />
    );
};

export default PasswordField;
