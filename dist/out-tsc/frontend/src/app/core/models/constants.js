"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMBED_YOUTUBE_URL = exports.EMPTY_JSON_PARSE = exports.FIRESTORE_AUTH_PERSISTENCE = exports.POP_UP_VERTICAL_POSITION = exports.POP_UP_DISMISS_DURATION = exports.POP_UP_ACTION = exports.SIGNUP_FAILED = exports.LOGIN_FAILED = exports.FIRESTORE_COLLECTION = exports.InputType = void 0;
var InputType;
(function (InputType) {
    InputType["TEXT"] = "text";
    InputType["TEXTAREA"] = "textarea";
    InputType["SELECT"] = "select";
    InputType["EMAIL"] = "email";
    InputType["PASSWROD"] = "password";
    InputType["UPLOAD"] = "upload";
    InputType["EDITOR"] = "editor";
})(InputType = exports.InputType || (exports.InputType = {}));
var FIRESTORE_COLLECTION;
(function (FIRESTORE_COLLECTION) {
    FIRESTORE_COLLECTION["users"] = "users";
    FIRESTORE_COLLECTION["blogs"] = "blogs";
    FIRESTORE_COLLECTION["posts"] = "posts";
    FIRESTORE_COLLECTION["payment"] = "payment";
    FIRESTORE_COLLECTION["article"] = "article";
})(FIRESTORE_COLLECTION = exports.FIRESTORE_COLLECTION || (exports.FIRESTORE_COLLECTION = {}));
exports.LOGIN_FAILED = "Email/Password wrong, please try again";
exports.SIGNUP_FAILED = "Account sign up failed, please try again";
exports.POP_UP_ACTION = "CLOSED";
exports.POP_UP_DISMISS_DURATION = 1000;
exports.POP_UP_VERTICAL_POSITION = "top";
var FIRESTORE_AUTH_PERSISTENCE;
(function (FIRESTORE_AUTH_PERSISTENCE) {
    FIRESTORE_AUTH_PERSISTENCE["SESSION"] = "SESSION";
    FIRESTORE_AUTH_PERSISTENCE["LOCAL"] = "LOCAL";
    FIRESTORE_AUTH_PERSISTENCE["NONE"] = "NONE";
})(FIRESTORE_AUTH_PERSISTENCE = exports.FIRESTORE_AUTH_PERSISTENCE || (exports.FIRESTORE_AUTH_PERSISTENCE = {}));
exports.EMPTY_JSON_PARSE = "{}";
exports.EMBED_YOUTUBE_URL = "https://www.youtube.com/embed/";
//# sourceMappingURL=constants.js.map