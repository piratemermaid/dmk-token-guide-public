const { Router } = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");

const {
    AccountTable,
    hash,
    Session,
    setSession
} = require("../models/account");
const { knex } = require("../models/config");
const TABLES = require("../data/tables");
const { EMAIL } = require("../secrets");
const getEmails = require("../emails");

const router = new Router();

sgMail.setApiKey(EMAIL.API_KEY);

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        let account = await AccountTable.getAccount({ username });

        if (!account) {
            account = await AccountTable.getAccountByEmail({ email: username });
        }

        if (!account) {
            throw new Error("Incorrect username/password");
        } else {
            if (!account.verified) {
                res.send({
                    errorMessage:
                        "Account not verified. Please check your email."
                });
                return;
            }

            if (await bcrypt.compare(password, account.password)) {
                return setSession({
                    username: account.username,
                    res,
                    sessionId: account.sessionId
                }).then(() => {
                    res.send({ message: "success" });
                });
            } else {
                throw new Error("Incorrect username/password");
            }
        }
    } catch (err) {
        res.send({ errorMessage: "Incorrect username/password" });
    }
});

router.get("/logout", (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: null,
        username
    })
        .then(() => {
            res.clearCookie("sessionString");

            res.json({ message: "Successful logout" });
        })
        .catch((error) => next(error));
});

router.get("/authenticated", (req, res, next) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        res.send({ authenticated: false });
    } else {
        const { username, id } = Session.parse(sessionString);

        AccountTable.getAccount({ username })
            .then((account) => {
                if (account.verified) {
                    const authenticated = account.sessionId === id;

                    res.send({ authenticated });
                } else {
                    res.send({ authenticated: false });
                }
            })
            .catch((error) => next(error));
    }
});

router.get("/authenticated_new", async (req, res, next) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        res.status(401).send(false);
        return;
    }

    const { username, id } = Session.parse(sessionString);

    const user = await knex("users").where({ username }).first();

    if (user?.verified) {
        if (user.sessionId === id) {
            res.status(200).send(true);
        } else {
            res.status(401).send(false);
        }
    } else {
        res.status(401).send(false);
    }
});

router.get("/user", async (req, res, next) => {
    const { sessionString } = req.cookies;

    if (!sessionString || !Session.verify(sessionString)) {
        res.status(401).send(null);
        return;
    }

    const { username, id } = Session.parse(sessionString);

    const user = await knex("users").where({ username }).first();

    if (user.verified) {
        if (user.sessionId === id) {
            res.status(200).send({ username, admin: user.admin });
        } else {
            res.status(401).send(null);
        }
    } else {
        res.status(401).send(null);
    }
});

router.post("/forgot_password", async function (req, res, next) {
    const { email, username } = req.body;

    if (!email && !username) {
        res.status(400).send("Please enter an email or username");
    }

    let user;
    if (email) {
        user = await AccountTable.getAccountByEmail({ email });
    } else {
        user = await AccountTable.getAccount({ username });
    }

    if (!user) {
        res.status(400).send(
            "Account not found. Please double check your entered email/username"
        );
        return;
    }

    const token = crypto.randomBytes(20).toString("hex");
    await knex(TABLES.USERS)
        .where({ id: user.id })
        .update({
            reset_password_token: token,
            reset_token_expiry: moment().add(30, "minutes").utc().toISOString()
        });

    const msg = {
        ...getEmails.passwordReset(token),
        to: user.email
    };

    try {
        sgMail.send(msg);
        res.status(200).send({ message: "success" });
    } catch (error) {
        res.status(500).send({
            error: "Sorry, that didn't work. Please try again."
        });
    }
});

router.get("/reset", async function (req, res, next) {
    const { resetPasswordToken } = req.query;

    knex(TABLES.USERS)
        .where({
            reset_password_token: resetPasswordToken
        })
        .first()
        .then((user) => {
            if (!user) {
                res.send({
                    errorMessage:
                        "password reset link is invalid or has expired"
                });
            }
            if (user.reset_token_expiry) {
                const now = moment().utc().toISOString();
                if (moment(user.reset_token_expiry).isBefore(now)) {
                    res.send({
                        errorMessage:
                            "password reset link is invalid or has expired"
                    });
                }
            }

            res.status(200).send({
                username: user.username,
                message: "success"
            });
        });
});

router.put("/update_password_via_email", async function (req, res, next) {
    const { username, password } = req.body;

    const user = await AccountTable.getAccount({ username });
    console.log("user", user);

    if (user) {
        return knex(TABLES.USERS)
            .where({ id: user.id })
            .update({
                password: hash(password),
                reset_password_token: null,
                reset_token_expiry: null
            })
            .then(() => {
                res.send({ message: "success" });
            });
    } else {
        res.send({ errorMessage: "user does not exist in db" });
    }
});

router.post("/update_password", async function (req, res, next) {
    const { currentPassword, newPassword } = req.body;

    // first, check session
    const { sessionString } = req.cookies;

    const verified = await Session.verify(sessionString);
    if (!sessionString || !verified) {
        res.send({ errorMessage: "Invalid session" });
    }

    // get username and account
    const { username } = Session.parse(sessionString);

    let account = await AccountTable.getAccount({ username });

    // check if user's entered current password is correct
    const correctPw = await bcrypt.compare(currentPassword, account.password);
    if (correctPw) {
        await knex(TABLES.USERS)
            .where({ id: account.id })
            .update({
                password: hash(newPassword)
            });

        res.send({ message: "success" });
    } else {
        res.send({ errorMessage: "Incorrect password" });
    }
});

router.post("/send_verification", async function (req, res, next) {
    const { username, password, passwordMatch, email } = req.body;

    if (password !== passwordMatch) {
        throw new Error("Passwords do not match");
    } else {
        let account = await AccountTable.getAccount({ username });
        if (!account) {
            account = await AccountTable.getAccountByEmail({ email });
        }

        if (!account) {
            const token = crypto.randomBytes(20).toString("hex");
            const tokenExpiry = moment().add(2, "hours").utc().toISOString();
            await AccountTable.storeAccount({
                username,
                password: hash(password),
                email,
                verify_email_token: token,
                verify_email_token_expiry: tokenExpiry
            }).then(() => {
                const msg = {
                    ...getEmails.signup(token),
                    to: email
                };
                sgMail
                    .send(msg)
                    .then(() => {
                        res.status(200).send({ message: "success" });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            error: "Sorry, that didn't work. Please try again."
                        });
                    });
            });
        } else {
            res.send({
                errorMessage: "This username or email has already been taken"
            });
        }
    }
});

router.post("/send_verification_new", async function (req, res, next) {
    const { email } = req.body;

    let account = await AccountTable.getAccountByEmail({ email });

    if (account) {
        const token = crypto.randomBytes(20).toString("hex");
        const tokenExpiry = moment().add(2, "hours").utc().toISOString();
        await knex(TABLES.USERS)
            .where({ id: account.id })
            .update({
                verify_email_token: token,
                verify_email_token_expiry: tokenExpiry
            })
            .then(() => {
                const msg = {
                    ...getEmails.signup(token),
                    to: email
                };
                sgMail
                    .send(msg)
                    .then(() => {
                        res.status(200).send({ message: "success" });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            error: "Sorry, that didn't work. Please try again."
                        });
                    });
            });
    } else {
        res.send({
            errorMessage: "This email is not in the database."
        });
    }
});

router.get("/verify_email", async function (req, res, next) {
    const { verifyEmailToken } = req.query;

    const user = await knex(TABLES.USERS)
        .where({ verify_email_token: verifyEmailToken })
        .first();

    if (!user) {
        res.send({
            errorMessage: "email verification link is invalid or has expired"
        });
        return;
    }

    if (user.verify_email_token_expiry) {
        const now = moment().utc().toISOString();
        if (moment(user.verify_email_token_expiry).isBefore(now)) {
            res.send({
                errorMessage:
                    "email verification link is invalid or has expired"
            });
            return;
        }
    }

    await knex(TABLES.USERS).where({ username: user.username }).update({
        verified: true,
        verify_email_token: null,
        verify_email_token_expiry: null
    });

    const options = await knex(TABLES.OPTIONS).select("*");
    await knex(TABLES.USER_OPTIONS).insert(
        options.map(({ id, defaultValue }) => {
            return {
                user_id: user.id,
                option_id: id,
                value: defaultValue
            };
        })
    );

    await setSession({
        username: user.username,
        res
    }).then(() => {
        res.send({ message: "success" });
        next();
    });
});

/**
 * update_email
 * When user requests to update their account email from
 * the Account page, create a token for old and new emails
 * and send a notification to both.
 * If they verify the old token, the email remains on their account.
 * If they verify the new token, their account email updates.
 */
router.post("/update_email", async function (req, res, next) {
    const { email } = req.body;

    // first, check session
    const { sessionString } = req.cookies;
    const verified = await Session.verify(sessionString);
    if (!sessionString || !verified) {
        res.send({ errorMessage: "Invalid session" });
        return;
    }

    // check if email already exists in db
    const emailExists = await AccountTable.getAccountByEmail({ email });
    if (emailExists) {
        res.send({ errorMessage: "This email has already been taken" });
        return;
    }

    // get current account email
    const { username } = Session.parse(sessionString);
    const user = await AccountTable.getAccount({ username });

    const oldEmailToken = crypto.randomBytes(20).toString("hex");
    const newEmailToken = crypto.randomBytes(20).toString("hex");

    await knex("users").where({ id: user.id }).update({
        old_email_token: oldEmailToken,
        new_email_token: newEmailToken,
        new_email: email
    });

    // send to old email
    const msgOld = {
        ...getEmails.updateEmailOld(oldEmailToken, email),
        to: user.email
    };
    sgMail.send(msgOld).catch((error) => {
        console.error(error);
        res.status(500).send({
            error: "Sorry, that didn't work. Please try again."
        });
    });

    // send to new email
    const msgNew = {
        ...getEmails.updateEmailNew(newEmailToken),
        to: email
    };
    sgMail.send(msgNew).catch((error) => {
        console.error(error);
        res.status(500).send({
            error: "Sorry, that didn't work. Please try again."
        });
    });

    res.status(200).send({ message: "success" });
});

/**
 * verify_email
 * Verify the old or new email token after email change request
 */
router.get("/verify_email_change", async function (req, res, next) {
    const { token } = req.query;

    let account, isNewEmail;
    account = await knex("users").where({ old_email_token: token }).first();
    if (account) {
        isNewEmail = false;
    } else {
        account = await knex("users").where({ new_email_token: token }).first();
        if (account) {
            isNewEmail = true;
        } else {
            res.send({ errorMessage: "Invalid token" });
            return;
        }
    }

    // if new email token, set new email
    // if old email token, remove new email
    if (isNewEmail) {
        await knex("users")
            .where({ id: account.id })
            .update({ email: account.new_email, new_email: null });
    } else {
        await knex("users")
            .where({ id: account.id })
            .update({ new_email: null });
    }

    // clear tokens
    await knex("users")
        .where({ id: account.id })
        .update({ old_email_token: null, new_email_token: null });

    res.send({ message: "success", newEmail: isNewEmail });
});

module.exports = router;
