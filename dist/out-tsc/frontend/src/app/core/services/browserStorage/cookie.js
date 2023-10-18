"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let CookieService = class CookieService {
    constructor() { }
    /**
     * Get cookie
     *
     * @public
     */
    getCookie(name) {
        const cookiesArray = document.cookie.split(";");
        const cookieName = `${name}=`;
        let value;
        cookiesArray.map((cookie) => {
            value = cookie.replace(/^\s+/g, "");
            if (value.indexOf(cookieName) == 0) {
                value = value.substring(cookieName.length, value.length);
            }
        });
        return "";
    }
    /**
     * Delete cookie
     *
     * @public
     */
    deleteCookie(name) {
        this.setCookie(name, "", -1);
    }
    /**
     * Set cookie
     *
     * @public
     */
    setCookie(name, value, expireHours, path = "") {
        const date = new Date();
        // Set expire hour for the cookie
        date.setTime(date.getTime() + expireHours * 60 * 60 * 1000);
        // Expires cookie
        const expires = "expires=" + date.toUTCString();
        // Set the cookie
        document.cookie =
            name +
                "=" +
                value +
                "; " +
                expires +
                (path.length > 0 ? "; path=" + path : "");
    }
};
CookieService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], CookieService);
exports.CookieService = CookieService;
//# sourceMappingURL=cookie.js.map