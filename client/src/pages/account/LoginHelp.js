import React, { Component } from "react";
import { withRouter } from "react-router";

import Page from "../../components/Page/Page";
import { validateEmail } from "../../utils/utils";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { email: "", errorMessage: null };
    }

    emailUsername(e, { email }) {
        if (!validateEmail(email)) {
            this.setState({ errorMessage: "Please enter a valid email" });
            return;
        }
        alert("email username");
        this.props.history.push("/login");
    }

    resetPassword(e, { email }) {
        if (!validateEmail(email)) {
            this.setState({ errorMessage: "Please enter a valid email" });
            return;
        }
        alert("reset password");
        this.props.history.push("/login");
    }

    onInputChange(e, field) {
        this.setState({ errorMessage: null });
        this.setState({ [field]: e.target.value });
    }

    render() {
        return (
            <Page header="Login Help" id="login-help">
                <div className="row">
                    <form id="login-form">
                        <div className="input-field">
                            <input
                                id="email"
                                type="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={(e) => this.onInputChange(e, "email")}
                            />
                        </div>
                        <div className="form-info error">
                            {this.state.errorMessage}
                        </div>
                        <div>
                            If your entered email exists with an account, we
                            will send you an email to provide you your username
                            or to reset your password
                        </div>
                        <br />
                        <button
                            className="btn deep-purple lighten-2"
                            type="submit"
                            onClick={(e) =>
                                this.emailUsername(e, {
                                    email: this.state.email
                                })
                            }
                        >
                            Email username
                        </button>
                        <button
                            className="btn deep-purple lighten-2"
                            style={{ marginLeft: "10px" }}
                            type="submit"
                            onClick={(e) =>
                                this.resetPassword(e, {
                                    email: this.state.email
                                })
                            }
                        >
                            Reset password
                        </button>
                    </form>
                </div>
            </Page>
        );
    }
}

export default withRouter(Login);
