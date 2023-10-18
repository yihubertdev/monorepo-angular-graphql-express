"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexfile = void 0;
const knex_1 = require("knex");
const knexfile_1 = require("src/database/knexfile");
/**
 * Create a Knex instance
 * @param {Partial<Knex.Config>} [options]
 * @returns {Knex}
 */
function getInstance(options = {}) {
    const config = (0, knexfile_1.generateKnexConfiguration)(options);
    return (0, knex_1.knex)(config);
}
exports.knexfile = {
    getInstance,
};
//# sourceMappingURL=knex.js.map