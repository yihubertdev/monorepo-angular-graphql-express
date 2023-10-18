"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const user_profile_controller_1 = require("./controller/user-profile.controller");
const card_1 = require("@angular/material/card");
const grid_list_1 = require("@angular/material/grid-list");
const string_transform_pipe_1 = require("./controller/string-transform.pipe");
let UserProfileModule = class UserProfileModule {
};
UserProfileModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [user_profile_controller_1.UserProfileControllerComponent, string_transform_pipe_1.StringTransformPipe],
        imports: [common_1.CommonModule, card_1.MatCardModule, grid_list_1.MatGridListModule],
        exports: [user_profile_controller_1.UserProfileControllerComponent, string_transform_pipe_1.StringTransformPipe],
    })
], UserProfileModule);
exports.UserProfileModule = UserProfileModule;
//# sourceMappingURL=user-profile.module.js.map