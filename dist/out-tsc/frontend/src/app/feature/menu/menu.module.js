"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const footer_controller_1 = require("./controller/footer.controller");
const icon_1 = require("@angular/material/icon");
const tabs_1 = require("@angular/material/tabs");
const router_1 = require("@angular/router");
const main_controller_1 = require("./controller/main.controller");
const divider_1 = require("@angular/material/divider");
const list_1 = require("@angular/material/list");
const header_controller_1 = require("./controller/header.controller");
const menu_1 = require("@angular/material/menu");
const button_1 = require("@angular/material/button");
let MenuModule = class MenuModule {
};
MenuModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            footer_controller_1.FooterMenuController,
            main_controller_1.MainMenuController,
            header_controller_1.HeaderMenuController,
        ],
        imports: [
            common_1.CommonModule,
            icon_1.MatIconModule,
            tabs_1.MatTabsModule,
            router_1.RouterModule,
            divider_1.MatDividerModule,
            list_1.MatListModule,
            menu_1.MatMenuModule,
            button_1.MatButtonModule,
        ],
        exports: [footer_controller_1.FooterMenuController, main_controller_1.MainMenuController, header_controller_1.HeaderMenuController],
    })
], MenuModule);
exports.MenuModule = MenuModule;
//# sourceMappingURL=menu.module.js.map