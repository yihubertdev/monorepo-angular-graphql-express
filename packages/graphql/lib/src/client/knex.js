"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexClient = exports.generateKnexConfiguration = void 0;
const knex_1 = require("knex");
/**
 * Generate knex configuration
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex.Config}
 */
function generateKnexConfiguration(options = {}) {
    return {
        client: "mysql",
        connection: {
            insecureAuth: true,
            host: process.env["RDS_ENDPOINT"] || "localhost",
            user: process.env["RDS_ENDPOINT"] || "root",
            password: process.env["RDS_PASSWORD"] || "abc123",
            database: process.env["RDS_DB_NAME"] || "tech_blog",
        },
        pool: { min: 1, max: 1 },
        ...options,
    };
}
exports.generateKnexConfiguration = generateKnexConfiguration;
/**
 * Create a Knex instance
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex}
 */
function getInstance(options = {}) {
    const config = generateKnexConfiguration();
    return (0, knex_1.knex)(config);
}
exports.knexClient = {
    generateKnexConfiguration,
    getInstance,
};
//# sourceMappingURL=knex.js.map