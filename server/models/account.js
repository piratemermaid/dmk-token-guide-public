const { knex } = require("./config");
const uuid = require("uuid/v4");
const bcrypt = require("bcrypt");
const HASH = require("../secrets");
const TABLES = require("../data/tables");

const hash = (data) => {
    const salt = bcrypt.genSaltSync(HASH.saltRounds);
    const hash = bcrypt.hashSync(data, salt);
    return hash;
};

class AccountTable {
    static storeAccount({
        username,
        password,
        email,
        verify_email_token,
        verify_email_token_expiry
    }) {
        return knex
            .insert({
                username,
                password,
                email,
                verify_email_token,
                verify_email_token_expiry,
                verified: false
            })
            .into("users")
            .then(function () {
                return knex(TABLES.USERS).first().where("username", username);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    static getAccount({ username }) {
        return knex
            .select("*")
            .from("users")
            .where("username", "ilike", username)
            .first();
    }

    static getAccountByEmail({ email }) {
        return knex
            .select("*")
            .from("users")
            .where("email", "ilike", email)
            .first();
    }

    static updateSessionId({ sessionId, username }) {
        return knex(TABLES.USERS)
            .where({ username })
            .update({ sessionId })
            .returning("*");
    }
}

const SEPARATOR = "|";

class Session {
    constructor({ username }) {
        this.username = username;
        this.id = uuid();
    }

    toString() {
        const { username, id } = this;

        return Session.sessionString({ username, id });
    }

    static parse(sessionString) {
        const sessionData = sessionString.split(SEPARATOR);

        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        };
    }

    static async verify(sessionString) {
        const { username, id, sessionHash } = Session.parse(sessionString);

        const accountData = Session.accountData({ username, id });

        const res = await bcrypt.compare(accountData, sessionHash);
        return res;
    }

    static accountData({ username, id }) {
        return `${username}${SEPARATOR}${id}`;
    }

    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id });

        return `${accountData}${SEPARATOR}${hash(accountData)}`;
    }
}

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if (sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId });

            setSessionCookie({ sessionString, res });

            resolve({ message: "session restored" });
        } else {
            session = new Session({ username });
            sessionString = session.toString();

            AccountTable.updateSessionId({
                sessionId: session.id,
                username
            })
                .then(() => {
                    setSessionCookie({ sessionString, res });

                    resolve({ message: "session created" });
                })
                .catch((error) => reject(error));
        }
    });
};

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie("sessionString", sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true
        // , secure: true // use with https
    });
};

module.exports = { AccountTable, hash, Session, setSession };
