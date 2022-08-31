import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

import Loading from "../../components/states/Loading";
import Page from "../../components/Page/Page";
import Form from "../../components/Form/Form";

class PasswordReset extends Component {
    constructor() {
        super();

        this.state = {
            formError: null,
            formSuccess: false,
            errorInvalid: false,
            loading: true,
            username: ""
        };
    }

    async componentDidMount() {
        await axios
            .get("/api/account/reset", {
                params: {
                    resetPasswordToken: this.props.match.params.token
                }
            })
            .then((res) => {
                if (res.data.errorMessage) {
                    this.setState({
                        update: false,
                        loading: false,
                        errorInvalid: true
                    });
                } else if (res.data.message === "success") {
                    this.setState({
                        username: res.data.username,
                        loading: false,
                        errorInvalid: false
                    });
                }
            })
            .catch((error) => {
                console.log("error", error.data);
            });
    }

    updatePassword = async (values) => {
        const { newPassword } = values;

        try {
            const res = await axios.put(
                "/api/account/update_password_via_email",
                {
                    username: this.state.username,
                    password: newPassword
                }
            );
            if (res.data.errorMessage) {
                this.setState({ formError: res.data.errorMessage });
            } else if (res.data.message === "success") {
                this.setState({
                    formSuccess: true,
                    error: false
                });
                setTimeout(() => {
                    this.props.history.push("/login");
                }, 2000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const { formError, errorInvalid, loading, formSuccess } = this.state;

        if (errorInvalid) {
            return (
                <Page header="Reset Password" id="reset-password">
                    <div className="form-message warning">
                        Error: password reset link is invalid or has expired
                    </div>
                    <Link to="/forgot_password">
                        <button className="btn deep-purple lighten-2">
                            Try Again
                        </button>
                    </Link>
                </Page>
            );
        } else if (loading) {
            return (
                <div>
                    <Loading />
                </div>
            );
        } else {
            return (
                <Page header="Reset Password" id="reset-password">
                    <Form
                        submitBtnText="Update Password"
                        onSubmit={this.updatePassword}
                        formError={formError}
                        inputs={formInputs}
                        clearFormError={() =>
                            this.setState({
                                formError: null
                            })
                        }
                    />
                    {formSuccess ? (
                        <div className="form-message success">
                            Password reset successful, redirecting...
                        </div>
                    ) : null}
                </Page>
            );
        }
    }
}

const formInputs = [
    {
        validationType: "newPassword",
        type: "password",
        id: "newPassword",
        label: "New Password"
    }
];

export default withRouter(PasswordReset);
