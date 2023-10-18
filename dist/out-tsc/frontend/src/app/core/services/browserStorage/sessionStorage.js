"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStorageService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let SessionStorageService = class SessionStorageService {
    constructor() { }
    /**
     * Get session storage
     *
     * @public
     * @param {string} key
     * @return {T}
     */
    getSessionStorage(key) {
        const result = sessionStorage.getItem(key);
        // If session data is not existed, return null
        if (!result) {
            return null;
        }
        try {
            // If session data is not json format, return null
            return JSON.parse(result);
        }
        catch {
            return null;
        }
    }
    /**
     * Get all session storage
     *
     * @public
     * @param {string} key
     * @return {T}
     */
    getAllSessionStorage() {
        return sessionStorage;
    }
    /**
     * Set session storage
     *
     * @public
     * @param {string} key
     * @param {T} value
     * @return {T}
     */
    setSessionStorage(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
        return value;
    }
    /**
     * Remove session storage
     *
     * @public
     * @param {string} key
     * @return {void}
     */
    deleteSessionStorage(key) {
        sessionStorage.removeItem(key);
    }
};
SessionStorageService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], SessionStorageService);
exports.SessionStorageService = SessionStorageService;
//# sourceMappingURL=sessionStorage.js.map