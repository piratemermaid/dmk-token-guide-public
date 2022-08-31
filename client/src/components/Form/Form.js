import _ from "lodash";
import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import InputField from "./InputField";
import PwVisToggle from "./PwVisToggle";
import PwStrengthIndicator from "./PwStrengthIndicator";
import PwStrengthTips from "./PwStrengthTips";

import "./form.scss";

const Form = (props) => {
    let initialValues = {};
    let initialMessages = {};
    for (let input of props.inputs) {
        const { id } = input;
        initialValues[id] = "";
        initialMessages[id] = "";
    }
    const [values, setValues] = useState(initialValues);
    const [messages, setMessages] = useState(initialMessages);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);
    const [showPasswordTips, setShowPasswordTips] = useState(false);
    const [passwordScore, setPasswordScore] = useState(0);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState(false);
    const [showPasswordToggle] = useState(
        _.some(props.inputs, { type: "password" })
    );

    // Set props formError and formSuccess in state
    // so we can more easily clear them when the user types again
    // and clear the fields on success
    useEffect(() => {
        setFormError(props.formError);
    }, [props.formError]);
    useEffect(() => {
        setFormSuccess(props.formSuccess);
        if (props.formSuccess === true) {
            setValues(initialValues);
            setMessages(initialMessages);
        }
    }, [props.formSuccess]);

    const { inputs, colClass, submitBtnText } = props;

    // validate each input individually based on validationType
    // and submit form if all are validated
    const validateInputs = (e) => {
        e.preventDefault();

        let allValidated = true;
        let newMessages = {};

        props.inputs.map(({ validationType, id }) => {
            const value = values[id];
            const message = getValidationMessage(validationType, value);
            if (message) {
                newMessages[id] = message;
                allValidated = false;
            } else {
                newMessages[id] = null;
            }
        });

        setMessages(newMessages);
        setShowPasswordTips(passwordScore < MINIMUM_STRENGTH_REQUIRED);

        if (allValidated) {
            setShowPasswordStrength(false);
            props.onSubmit(values);
        }
    };

    const getValidationMessage = (type, value) => {
        switch (type) {
            case "newPassword":
                const score = getPasswordScore(value);
                if (score < MINIMUM_STRENGTH_REQUIRED) {
                    return "Please enter a stronger password";
                }
                return null;
            case "currentPassword":
                if (!value || value.length < 1) {
                    return "Please enter your password";
                }
                return null;
            case "passwordMatch":
                const { newPassword } = values;
                if (value.length < 1) {
                    return "Please confirm the password";
                } else if (value !== newPassword) {
                    return "Passwords don't match";
                }
                return null;
            case "usernameOrEmailLogin":
                if (value.length < 1) {
                    return "Please enter your username or email";
                }
                return null;
            case "username":
                if (value.length < 1) {
                    return "Please enter a username";
                }
                return null;
            case "email":
                if (value.length < 1) {
                    return "Please enter an email";
                }
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const validated = re.test(String(value).toLowerCase());
                if (!validated) {
                    return "Please enter a valid email";
                }
                return null;
            default:
                return null;
        }
    };

    // On change, set value and remove error messages
    const onChange = (e) => {
        const id = e.target.getAttribute("id");
        const { value } = e.target;

        // Set new values and messages
        let newValues = values;
        newValues[id] = value;
        setValues(newValues);
        setMessages({});

        // If user is setting password, set new score,
        // & determine whether to show password strength & tips
        if (id === "newPassword") {
            const newScore = getPasswordScore(value);
            setPasswordScore(newScore);
            if (value.length < 1) {
                setShowPasswordStrength(false);
                setShowPasswordTips(false);
            } else {
                setShowPasswordStrength(true);
                // Only show password tips if score is weak
                setShowPasswordTips(newScore < 2);
            }
        }

        // Remove form error/success when user types
        props.clearFormError();
        setFormSuccess(false);
    };

    // Toggle password visibility
    const togglePwVis = () => {
        setShowPasswords(!showPasswords);
    };

    // If type is password, check if passwords are visible
    const getInputType = (type) => {
        if (type === "password") {
            if (!showPasswords) {
                return "password";
            } else {
                return "text";
            }
        } else {
            return type;
        }
    };

    return (
        <form id="form" onSubmit={validateInputs}>
            {inputs.map(({ validationType, type, id, label }) => {
                return (
                    <div className={`col ${colClass || "s12"}`} key={id}>
                        <InputField
                            type={getInputType(type)}
                            id={id}
                            label={label}
                            value={values[id]}
                            onChange={onChange}
                            message={messages[id]}
                        />
                        {validationType === "newPassword" &&
                        showPasswordStrength ? (
                            <PwStrengthIndicator score={passwordScore} />
                        ) : null}
                        {validationType === "newPassword" &&
                        showPasswordTips ? (
                            <PwStrengthTips />
                        ) : null}
                    </div>
                );
            })}
            {formError ? (
                <div className="form-message warning col s12">{formError}</div>
            ) : null}
            {formSuccess ? (
                <div className="form-message success col s12">Success!</div>
            ) : null}
            <div className="col s12">
                <button className="btn deep-purple lighten-2" type="submit">
                    {submitBtnText}
                </button>
                {showPasswordToggle ? (
                    <PwVisToggle
                        togglePws={togglePwVis}
                        showPasswords={showPasswords}
                    />
                ) : null}
            </div>
        </form>
    );
};

const STRENGTH_VERY_WEAK = 0;
const STRENGTH_WEAK = 1;
const MINIMUM_STRENGTH_REQUIRED = 2;

const getPasswordScore = (value) => {
    let passwordScore = zxcvbn(value).score;
    // Set weak scores if less than 8 characters
    if (passwordScore > STRENGTH_WEAK && value.length < 8) {
        if (value.length < 4 && passwordScore > STRENGTH_VERY_WEAK) {
            passwordScore = STRENGTH_VERY_WEAK;
        } else {
            passwordScore = STRENGTH_WEAK;
        }
    }
    return passwordScore;
};

export default Form;
