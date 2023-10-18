"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchViewComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const post_static_1 = require("src/app/core/static/post.static");
let SearchViewComponent = class SearchViewComponent {
    constructor() {
        this.postList = post_static_1.postList;
    }
};
SearchViewComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "post-view",
        template: ` <div style="width: 100vw; height: 90dvh">Search</div> `,
        styleUrls: ["./search.view.css"],
    })
], SearchViewComponent);
exports.SearchViewComponent = SearchViewComponent;
//# sourceMappingURL=search.view.js.map