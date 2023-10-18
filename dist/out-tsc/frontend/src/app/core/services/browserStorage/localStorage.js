"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const constants_1 = require("../../models/constants");
let LocalStorageService = class LocalStorageService {
    constructor() { }
    /**
     * Get local storage
     *
     * @public
     * @param {string} key
     * @return {T}
     */
    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key) ?? constants_1.EMPTY_JSON_PARSE);
    }
    /**
     * Set local storage
     *
     * @public
     * @param {string} key
     * @param {T} value
     * @return {T}
     */
    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    }
    /**
     * Remove local storage
     *
     * @public
     * @param {string} key
     * @return {void}
     */
    deleteLocalStorage(key) {
        localStorage.removeItem(key);
    }
};
LocalStorageService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localStorage.js.map