exports.up = function(knex) {
    return knex.schema.table("users", function(table) {
        table.string("verify_email_token");
        table.timestamp("verify_email_token_expiry");
        table.boolean("verified");
    });
};

exports.down = function(knex) {
    return knex.schema.table("users", function(table) {
        table.dropColumn("verify_email_token");
        table.dropColumn("verify_email_token_expiry");
        table.dropColumn("verified");
    });
};
