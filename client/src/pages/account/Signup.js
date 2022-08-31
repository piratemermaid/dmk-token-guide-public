import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
    batchUpdateUserData,
    updateUserCharacterData,
    updateUserBuildingData,
    updateUserFloatData,
    updateUserCostumeData
} from "../../redux/actions/userData";
import axios from "axios";

import Page from "../../components/Page/Page";
import Form from "../../components/Form/Form";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formError: null,
            emailSent: false
        };

        this.signupUser = this.signupUser.bind(this);
    }

    signupUser = async (values) => {
        const { username, newPassword, passwordMatch, email } = values;

        const res = await axios.post("/api/account/send_verification", {
            username,
            password: newPassword,
            passwordMatch,
            email
        });

        if (res.data.errorMessage) {
            this.setState({ formError: res.data.errorMessage });
        } else if (res.data.message === "success") {
            this.setState({ emailSent: true });
        }
    };

    render() {
        const { emailSent, formError } = this.state;
        return (
            <Page header="Sign Up" id="signup">
                <div className="row">
                    {!emailSent ? (
                        <>
                            <Form
                                submitBtnText="Sign Up"
                                onSubmit={this.signupUser}
                                formError={formError}
                                inputs={formInputs}
                                clearFormError={() =>
                                    this.setState({ formError: null })
                                }
                            />
                            <div
                                className="col s12"
                                style={{ paddingTop: "20px" }}
                                id="switch-to-login"
                            >
                                Already have an account?{" "}
                                <a href="/login">Log in</a>
                            </div>
                        </>
                    ) : (
                        "All right! Check your email for a verification link. Note: there may be an issue with the email client right now, so if you do not receive an email, check back in 15 minutes and try to sign in."
                    )}
                </div>
            </Page>
        );
    }
}

const formInputs = [
    {
        validationType: "username",
        type: "text",
        id: "username",
        label: "Username"
    },
    {
        validationType: "newPassword",
        type: "password",
        id: "newPassword",
        label: "Password"
    },
    {
        validationType: "passwordMatch",
        type: "password",
        id: "passwordMatch",
        label: "Confirm Password"
    },
    { validationType: "email", type: "text", id: "email", label: "Email" }
];

const mapStateToProps = (state) => {
    const { appData, userData } = state;
    return { appData, userData };
};

export default connect(mapStateToProps, {
    batchUpdateUserData,
    updateUserCharacterData,
    updateUserBuildingData,
    updateUserFloatData,
    updateUserCostumeData
})(withRouter(Signup));
