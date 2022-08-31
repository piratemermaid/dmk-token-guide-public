exports.up = function (knex) {
    return knex.schema.table("tower_challenges", function (table) {
        table.string("dateSpan");
    });
};

exports.down = function (knex) {
    return knex.schema.table("tower_challenges", function (table) {
        table.dropColumn("dateSpan");
    });
};
