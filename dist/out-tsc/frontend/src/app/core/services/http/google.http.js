"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleHttpService = exports.youtubeVideoValidateURL = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const firstValueFrom_1 = require("rxjs/internal/firstValueFrom");
const environment_1 = require("src/environments/environment");
const apiKey = environment_1.environment.googleCloudApiKey;
exports.youtubeVideoValidateURL = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=`;
let GoogleHttpService = class GoogleHttpService {
    constructor(http) {
        this.http = http;
    }
    /**
     *
     * @param {string}id youtube video id
     * @returns {Promise<object>} status of the youtube video
     */
    validateYoutubeVideo(id) {
        return (0, firstValueFrom_1.firstValueFrom)(this.http.get(`${exports.youtubeVideoValidateURL}${id}`));
    }
};
GoogleHttpService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: "root",
    })
], GoogleHttpService);
exports.GoogleHttpService = GoogleHttpService;
//# sourceMappingURL=google.http.js.map