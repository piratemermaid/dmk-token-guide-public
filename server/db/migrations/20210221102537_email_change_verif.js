exports.up = async function (knex) {
    return knex.schema.table("users", function (table) {
        table.string("new_email");
        table.string("new_email_token");
        table.string("old_email_token");
    });
};

exports.down = async function (knex) {
    return knex.schema.table("users", function (table) {
        table.dropColumn("new_email");
        table.dropColumn("new_email_token");
        table.dropColumn("old_email_token");
    });
};
