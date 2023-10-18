"use strict";
/**
 * Create users table
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = async function (knex) {
    // create the new users table
    await knex.schema.createTable("users", (table) => {
        table.specificType("id", "CHAR(36)").notNullable();
        table.specificType("user_id", "CHAR(36)").notNullable();
        table.string("username", 255).nullable();
        table.string("email", 255).nullable();
        table.boolean("email_verified").notNullable();
        table.string("phone_number", 255).nullable();
        table.string("photo_url", 255).nullable();
        table.primary(["id", "user_id"]);
        table.index(["email"], "idx_users_email");
        table.index(["user_id"], "idx_users_user_id");
    });
};
exports.down = async function (knex) {
    // drop the users table
    await knex.schema.dropTableIfExists("users");
};
//# sourceMappingURL=20230313001418_users.js.map