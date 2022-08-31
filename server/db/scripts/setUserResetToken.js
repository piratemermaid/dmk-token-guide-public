const username = "testaccount";
const { knex } = require("../../models/config");
const crypto = require("crypto");
const moment = require("moment");

const setUserResetToken = async () => {
    const user = await knex("users")
        .where("username", "ilike", username)
        .first();

    const token = crypto.randomBytes(20).toString("hex");
    const insert = await knex("users")
        .where({ id: user.id })
        .update({
            reset_password_token: token,
            reset_token_expiry: moment().add(1, "day").utc().toISOString()
        })
        .returning("*");

    console.log(`new url: https://dmktokenguide.com/reset/${token}`);

    console.log("done");
};

setUserResetToken();
