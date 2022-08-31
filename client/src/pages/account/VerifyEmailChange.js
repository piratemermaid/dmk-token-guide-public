import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import Page from "../../components/Page/Page";
import Loading from "../../components/states/Loading";

/**
 * VerifyEmailChange
 * When a user requests to change their account email
 * from the Account page, we send a verification token
 * to their current and new requested email address
 * with a link to this page.
 * Here, we check the token and determine whether to keep
 * the old email address or update to the new.
 */
const VerifyEmailChange = () => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const [verifSuccess, setVerifSuccess] = useState(false);
    const [newEmail, setNewEmail] = useState(null);

    const { token } = useParams();

    useEffect(() => {
        async function checkToken() {
            try {
                const res = await axios.get(
                    "/api/account/verify_email_change",
                    { params: { token } }
                );
                const { data } = res;
                if (data.errorMessage) {
                    setErrorMessage(data.errorMessage);
                } else if (data.message === "success") {
                    setVerifSuccess(true);
                    setNewEmail(data.newEmail);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        checkToken();
    }, []);

    return (
        <Page header="Verify Email Change" id="verify-email-change">
            <div className="row">
                <div className="col s12">
                    {loading ? <Loading /> : null}
                    {errorMessage ? (
                        <div className="form-message warning">
                            {errorMessage}
                        </div>
                    ) : null}
                    {verifSuccess ? (
                        <div>
                            <p>
                                Verification successful.{" "}
                                {newEmail
                                    ? "Your account is now using your new email address."
                                    : "Your account is sticking with your previous email address."}
                            </p>
                            <Link to="/collection">
                                <button className="btn deep-purple lighten-2">
                                    Ok!
                                </button>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </Page>
    );
};

export default VerifyEmailChange;
