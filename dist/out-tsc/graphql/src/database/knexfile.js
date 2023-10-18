"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKnexConfiguration = void 0;
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
module.exports = () => {
    const configuration = generateKnexConfiguration();
    return {
        development: {
            ...configuration,
            migrations: {
                extension: "ts",
                directory: "./migrations",
                stub: "./migrations/stub.ts",
            },
        },
    };
};
//# sourceMappingURL=knexfile.js.map