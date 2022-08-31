import _ from "lodash";
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { batchUpdateUserData, fetchUserData } from "../redux/actions/userData";
import Select from "react-select";

import OptionsList from "../components/OptionsList";
import Updating from "../components/states/Updating";
import Page from "../components/Page/Page";
import Form from "../components/Form/Form";
import { OPTIONS } from "../utils/globals";

const optionsList = [
    OPTIONS.USE_LEVELING_DATA,
    OPTIONS.USE_USER_DATA,
    OPTIONS.USE_READY,
    OPTIONS.SKIP_MAXED_IN_DROPDOWN
];

const actionOptions = [
    { value: 0, type: "level", label: "Unobtained" },
    { value: 1, type: "level", label: "Level 1" },
    { value: 2, type: "level", label: "Level 2" },
    { value: 3, type: "level", label: "Level 3" },
    { value: 4, type: "level", label: "Level 4" },
    { value: 5, type: "level", label: "Level 5" },
    { value: 6, type: "level", label: "Level 6" },
    { value: 7, type: "level", label: "Level 7" },
    { value: 8, type: "level", label: "Level 8" },
    { value: 9, type: "level", label: "Level 9" },
    { value: 10, type: "level", label: "Level 10 (MAX)" },
    { value: true, type: "ready", label: "Ready to level up" },
    { value: false, type: "ready", label: "Not ready to level up" }
];

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            updating_db: false,
            formError: null,
            pwUpdateSuccess: false,
            emailFormError: null,
            emailUpdateSuccess: false
        };
    }

    handleSelectChange(e) {
        this.setState({ selected: e });
    }

    /**
     * Set user's characters to chosen level or ready status.
     * Does one at a time so get other value from user data.
     * Also, don't set unobtained characters to ready.
     */
    async batchUpdateCharacters() {
        this.setState({ updating_db: true });
        const { value, type } = this.state.selected;
        for (let char of this.props.appData.characters) {
            const { name } = char;
            const userChar = _.find(this.props.userData.characters, { name });
            let ready = false;
            let favorite = false;
            if (userChar) {
                ready = userChar.ready;
                favorite = userChar.favorite;
            }
            if (type === "level") {
                // skip if level already set to value to save time
                if (!userChar || value !== userChar.level) {
                    await axios({
                        method: "post",
                        url: "/api/user/update_character",
                        params: {
                            name,
                            level: value,
                            ready,
                            favorite
                        }
                    });
                }
            } else {
                let level = 0;
                let favorite = false;
                let ready;
                if (userChar) {
                    level = userChar.level;
                    favorite = userChar.favorite;
                    ready = userChar.ready;
                }
                // skip if ready already set to value to save time,
                // also skip unobtained characters
                if (!ready || ready !== value) {
                    if (level > 0) {
                        await axios({
                            method: "post",
                            url: "/api/user/update_character",
                            params: {
                                name,
                                level,
                                ready: value,
                                favorite
                            }
                        });
                    }
                }
            }
        }

        this.setState({ updating_db: false });
        this.props.fetchUserData();
    }

    async batchUpdateBuildings(obtained) {
        this.setState({ updating_db: true });
        for (let building of this.props.appData.buildings) {
            const { name } = building;
            const userBuilding = _.find(this.props.userData.buildings, {
                name
            });
            let level = 0;
            if (userBuilding) {
                level = userBuilding.level;
            }
            if (obtained) {
                if (!userBuilding || level !== 0) {
                    await axios({
                        method: "post",
                        url: "/api/user/update_building",
                        params: { name, level: 0 }
                    });
                }
            } else {
                if (userBuilding) {
                    await axios({
                        method: "post",
                        url: "/api/user/update_building",
                        params: { name, level: -1 }
                    });
                }
            }
        }

        this.setState({ updating_db: false });
        this.props.fetchUserData();
    }

    updatePassword = async ({ currentPassword, newPassword }) => {
        const res = await axios.post("/api/account/update_password", {
            currentPassword,
            newPassword
        });
        const { data } = res;
        if (data.errorMessage) {
            this.setState({ formError: data.errorMessage });
        } else if (data.message === "success") {
            this.setState({ pwUpdateSuccess: true });
        }
    };

    updateEmail = async ({ email }) => {
        const res = await axios.post("/api/account/update_email", { email });
        const { data } = res;
        if (data.errorMessage) {
            this.setState({ emailFormError: data.errorMessage });
        } else if (data.message === "success") {
            this.setState({ emailUpdateSuccess: true });
        }
    };

    shouldComponentUpdate(prevProps) {
        if (this.state.updating_db) {
            if (prevProps.userData && prevProps.userData.status === "success") {
                this.setState({ updating_db: false });
            }
        }

        return true;
    }

    render() {
        if (this.state.updating_db) {
            return <Updating type={this.props.userData.updating} />;
        } else {
            const {
                formError,
                pwUpdateSuccess,
                emailFormError,
                emailUpdateSuccess
            } = this.state;
            const {
                useLevelingData,
                useUserData,
                useReady,
                skipMaxedInDropdown,
                appState
            } = this.props;

            return (
                <Page header="My Account" id="my-account">
                    {appState.authenticated ? (
                        <>
                            <div className="row">
                                <div className="col s12">
                                    <h3>Change Password</h3>
                                    <div className="row">
                                        <Form
                                            colClass="m4 s12"
                                            submitBtnText="Update"
                                            onSubmit={this.updatePassword}
                                            formError={
                                                !pwUpdateSuccess
                                                    ? formError
                                                    : null
                                            }
                                            formSuccess={pwUpdateSuccess}
                                            inputs={formInputs}
                                            clearFormError={() =>
                                                this.setState({
                                                    formError: null
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <h3>Change Email</h3>
                                    <div className="row">
                                        <Form
                                            colClass="s12"
                                            submitBtnText="Update"
                                            onSubmit={this.updateEmail}
                                            formError={
                                                !emailUpdateSuccess
                                                    ? emailFormError
                                                    : null
                                            }
                                            formSuccess={emailUpdateSuccess}
                                            inputs={emailFormInputs}
                                            clearFormError={() =>
                                                this.setState({
                                                    emailFormError: null
                                                })
                                            }
                                        />
                                        {emailUpdateSuccess ? (
                                            <div className="col s12 form-message">
                                                Please check your email to
                                                verify your new email address.
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <h3>Options</h3>
                                </div>
                            </div>
                            <div className="row">
                                <OptionsList
                                    optionsList={optionsList}
                                    useLevelingData={useLevelingData}
                                    useUserData={useUserData}
                                    useReady={useReady}
                                    skipMaxedInDropdown={skipMaxedInDropdown}
                                    page="account"
                                />
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <h3>Actions</h3>
                                </div>
                                <div className="col s12 m6">
                                    Set all characters to level/ready:
                                    <br />
                                    <br />
                                    <div
                                        className="row"
                                        id="options-action-select"
                                    >
                                        <div className="col s8">
                                            <Select
                                                options={actionOptions}
                                                value={this.state.selected}
                                                onChange={(e) =>
                                                    this.handleSelectChange(e)
                                                }
                                            />
                                        </div>
                                        <div className="col s4">
                                            <button
                                                className="btn deep-purple lighten-2"
                                                onClick={() =>
                                                    this.batchUpdateCharacters()
                                                }
                                            >
                                                Go
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m6">
                                    Set all buildings to obtained:
                                    <br />
                                    <br />
                                    <button
                                        className="btn deep-purple lighten-2"
                                        style={{ height: "62px" }}
                                        onClick={() =>
                                            this.batchUpdateBuildings(true)
                                        }
                                    >
                                        Go
                                    </button>
                                </div>
                                <div className="col s12 m6">
                                    Set all buildings to unobtained:
                                    <br />
                                    <br />
                                    <button
                                        className="btn deep-purple lighten-2"
                                        style={{ height: "62px" }}
                                        onClick={() =>
                                            this.batchUpdateBuildings(false)
                                        }
                                    >
                                        Go
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            <div className="col s12">
                                You are not logged in.{" "}
                                <Link to="/login">Let me innnn</Link>
                                <br />
                                <br />
                            </div>
                        </div>
                    )}
                    <br />
                    <br />
                    <br />
                </Page>
            );
        }
    }
}

const formInputs = [
    {
        validationType: "currentPassword",
        type: "password",
        id: "currentPassword",
        label: "Current Password"
    },
    {
        validationType: "newPassword",
        type: "password",
        id: "newPassword",
        label: "New Password"
    },
    {
        validationType: "passwordMatch",
        type: "password",
        id: "newPasswordMatch",
        label: "Confirm New Password"
    }
];

const emailFormInputs = [
    {
        validationType: "email",
        type: "text",
        id: "email",
        label: "New Email"
    }
];

const mapStateToProps = (state) => {
    const { appData, userData, appState } = state;
    return { appData, userData, appState };
};

export default connect(mapStateToProps, { batchUpdateUserData, fetchUserData })(
    Account
);
