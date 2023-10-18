"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserStorageServiceModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const cookie_1 = require("./cookie");
const localStorage_1 = require("./localStorage");
const sessionStorage_1 = require("./sessionStorage");
let BrowserStorageServiceModule = class BrowserStorageServiceModule {
};
BrowserStorageServiceModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [],
        imports: [],
        providers: [cookie_1.CookieService, localStorage_1.LocalStorageService, sessionStorage_1.SessionStorageService],
        bootstrap: [],
    })
], BrowserStorageServiceModule);
exports.BrowserStorageServiceModule = BrowserStorageServiceModule;
//# sourceMappingURL=browserStorage.module.js.map