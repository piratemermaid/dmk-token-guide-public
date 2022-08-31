import React from "react";
import PropTypes from "prop-types";

const InputField = ({
    id,
    label,
    value,
    onChange,
    type,
    message,
    ...otherProps
}) => {
    return (
        <div className="input-field">
            <input
                id={id || label}
                type={type || "text"}
                value={value || ""}
                onChange={onChange}
                {...otherProps}
            />
            <label htmlFor={id}>{label}</label>
            <span className="form-info warning">{message}</span>
        </div>
    );
};

InputField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    message: PropTypes.string,
    otherProps: PropTypes.any
};

export default InputField;
