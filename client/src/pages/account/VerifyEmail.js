import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    fetchUserData,
    batchUpdateUserData,
    setDefaultData
} from "../../redux/actions/userData";
import { authenticateAfterEmailVerif } from "../../redux/actions/appState";
import axios from "axios";

import Page from "../../components/Page/Page";
import Form from "../../components/Form/Form";
import Updating from "../../components/states/Updating";

const VerifyEmail = (props) => {
    const [updatingDB, setUpdatingDB] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [newVerif, setNewVerif] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    // Check email verification token on mount
    useEffect(() => {
        async function checkToken() {
            if (props.match.params.token === "new") {
                setNewVerif(true);
            }

            try {
                const res = await axios.get("/api/account/verify_email", {
                    params: { verifyEmailToken: props.match.params.token }
                });
                const { data } = res;
                if (data.errorMessage) {
                    setErrorMessage(data.errorMessage);
                } else if (data.message === "success") {
                    props.authenticateAfterEmailVerif();
                    setErrorMessage(null);
                    setSuccess(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        checkToken();
    }, []);

    // Redirect after updating db
    useEffect(() => {
        if (props.userData.status === "success" && updatingDB) {
            props.history.push("/collection");
        }
    }, [props.userData]);

    const handleSubmit = async ({ email }) => {
        const res = await axios.post("/api/account/send_verification_new", {
            email
        });
        const { data } = res;
        if (data.errorMessage) {
            setErrorMessage(data.errorMessage);
        } else {
            setEmailSent(true);
        }
    };

    /**
     * Use defaults: characters level 1 and not ready,
     * buildings/floats/costumes unobtained
     */
    const useDefaultData = () => {
        setUpdatingDB(true);
        props.setDefaultData();
    };

    /**
     * When user clicks "Try Again" we set newVerif true
     * and remove the error message
     */
    const handleButtonClick = () => {
        setNewVerif(true);
        setErrorMessage(null);
    };

    return (
        <Page
            header={!updatingDB ? "Verify Email" : "Importing Data"}
            id="verify-email"
        >
            {errorMessage && !newVerif ? (
                <div className="row">
                    <div className="col s12">
                        <div className="form-info warning">
                            Error: {errorMessage}
                        </div>
                        <button
                            className="btn deep-purple lighten-2"
                            onClick={handleButtonClick}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            ) : null}
            {newVerif ? (
                <div>
                    <Form
                        submitBtnText="Send New Verification"
                        onSubmit={handleSubmit}
                        formError={errorMessage}
                        inputs={formInputs}
                        clearFormError={() => setErrorMessage(null)}
                    />
                    {emailSent ? (
                        <div className="form-message success">
                            All right! Check your email for a brand new
                            verification link.
                        </div>
                    ) : null}
                </div>
            ) : null}
            {success && !updatingDB ? (
                <div className="row">
                    <div className="col s12">
                        <div className="form-info success">
                            Email verification successful.
                        </div>
                    </div>
                    <div className="col s12">
                        Would you like to import default data? This will set all
                        characters to level 1 and attractions to obtained with
                        no enchantments.
                    </div>
                    <div className="col s12" style={{ marginTop: "20px" }}>
                        <a onClick={useDefaultData}>Import default data</a>
                        {"  |  "}
                        <Link to="/collection" onClick={props.fetchUserData}>
                            Nah, just take me to my collection
                        </Link>
                    </div>
                </div>
            ) : null}
            {updatingDB ? (
                <Updating message={props.userData.updatingMessage} />
            ) : null}
        </Page>
    );
};

const formInputs = [
    {
        validationType: "email",
        type: "text",
        id: "email",
        label: "Email"
    }
];

const mapStateToProps = (state) => {
    const { appData, userData } = state;
    return { appData, userData };
};

export default connect(mapStateToProps, {
    fetchUserData,
    batchUpdateUserData,
    setDefaultData,
    authenticateAfterEmailVerif
})(withRouter(VerifyEmail));
