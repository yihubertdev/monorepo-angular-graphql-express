"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
/**
 * sdf
 */
async function test(knexClient) {
    const result = await knexClient("users").select();
}
exports.users = {
    test,
};
//# sourceMappingURL=users.js.map