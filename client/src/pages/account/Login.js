import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { fetchUserData } from "../../redux/actions/userData";
import { signIn } from "../../redux/actions/appState";

import Page from "../../components/Page/Page";
import Form from "../../components/Form/Form";

const Login = (props) => {
    const [formError, setFormError] = useState(null);

    const handleLogin = async (values) => {
        const { username, password } = values;

        try {
            const res = await axios.post("/api/account/login", {
                username,
                password
            });
            if (res.data.errorMessage) {
                setFormError(res.data.errorMessage);
            } else if (res.data.message === "success") {
                props.fetchUserData();
                props.signIn();
                props.history.push("/collection");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Page header="Login" id="login">
            <div className="row">
                <Form
                    colClass="m4 s12"
                    submitBtnText="Login"
                    onSubmit={handleLogin}
                    formError={formError}
                    inputs={formInputs}
                    clearFormError={() => setFormError(null)}
                />
            </div>
            <div id="login-helpers" className="row">
                <div className="col s12">
                    <p>
                        No account yet? <a href="/signup">Sign up</a>
                    </p>
                    <p>
                        Forgot password?{" "}
                        <a href="/forgot_password">Help me log in</a>
                    </p>
                    <p>
                        Need a new verification code?{" "}
                        <a href="/verify/new">Yes please</a>
                    </p>
                </div>
            </div>
        </Page>
    );
};

const formInputs = [
    {
        validationType: "usernameOrEmailLogin",
        type: "text",
        id: "username",
        label: "Username or email"
    },
    {
        validationType: "currentPassword",
        type: "password",
        id: "password",
        label: "Password"
    }
];

const mapStateToProps = ({ appState }) => {
    return { appState };
};

export default connect(mapStateToProps, {
    fetchUserData,
    signIn
})(withRouter(Login));
