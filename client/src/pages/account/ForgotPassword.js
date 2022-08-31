import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Page from "../../components/Page/Page";
import Form from "../../components/Form/Form";

/**
 * User can enter either email or username to receive
 * an email to reset their password.
 * Route: '/forgot_password'
 */
const ForgotPassword = () => {
    const [formError, setFormError] = useState(null);
    const [formSuccess, setFormSuccess] = useState(false);
    const history = useHistory();

    const resetPassword = async ({ email, username }) => {
        try {
            const res = await axios.post("/api/account/forgot_password", {
                email,
                username
            });
            if (res.data.errorMessage) {
                setFormError(res.data.errorMessage);
            } else if (res.data.message === "success") {
                setFormSuccess(true);
                setTimeout(() => {
                    history.push("/login");
                }, 2000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Page header="Reset Password" id="reset-password">
            <div className="row">
                <div className="col s12">
                    <p>Enter your email or username (you don't need both)</p>
                    <p>
                        If your entered email or username exists, we will send
                        you an email to reset your password.
                    </p>
                </div>
                <Form
                    colClass="m6 s12"
                    submitBtnText="Reset Password"
                    onSubmit={resetPassword}
                    formError={formError}
                    inputs={formInputs}
                    clearFormError={() => setFormError(null)}
                />
                {formSuccess ? (
                    <div className="col s12 form-message success">
                        <p>Password reset email sent, redirecting...</p>
                    </div>
                ) : null}
            </div>
        </Page>
    );
};

const formInputs = [
    {
        validationType: null,
        type: "text",
        id: "email",
        label: "Email"
    },
    {
        validationType: null,
        type: "text",
        id: "username",
        label: "Username"
    }
];

export default ForgotPassword;
