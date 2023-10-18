"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const chips_1 = require("@angular/material/chips");
const post_category_controller_1 = require("./controller/post-category.controller");
const icon_1 = require("@angular/material/icon");
const card_1 = require("@angular/material/card");
let PostCategoryModule = class PostCategoryModule {
};
PostCategoryModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [post_category_controller_1.PostCategoryControllerComponent],
        imports: [common_1.CommonModule, chips_1.MatChipsModule, icon_1.MatIconModule, card_1.MatCardModule],
        exports: [post_category_controller_1.PostCategoryControllerComponent],
    })
], PostCategoryModule);
exports.PostCategoryModule = PostCategoryModule;
//# sourceMappingURL=post-category.module.js.map