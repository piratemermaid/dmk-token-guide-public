import React from "react";

import InputField from "./InputField";

const EmailField = (props) => {
    const { id, label } = props;

    return (
        <InputField
            id={id || "email"}
            label={label || "Email"}
            type={"text"}
            onChange={props.onChange}
        />
    );
};

export default EmailField;
