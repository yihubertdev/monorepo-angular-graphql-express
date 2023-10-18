"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const routing_module_1 = require("./routing.module");
const main_view_1 = require("./main.view");
const animations_1 = require("@angular/platform-browser/animations");
const grid_list_1 = require("@angular/material/grid-list");
const menu_module_1 = require("src/app/feature/menu/menu.module");
const environment_1 = require("src/environments/environment");
const compat_1 = require("@angular/fire/compat");
const services_module_1 = require("./core/services/services.module");
const progress_spinner_1 = require("@angular/material/progress-spinner");
const ngx_quill_1 = require("ngx-quill");
const http_1 = require("@angular/common/http");
const sidenav_1 = require("@angular/material/sidenav");
const mat_drawer_responsive_module_1 = require("./shared/directives/matDrawerResponsive/mat-drawer-responsive.module");
const matGridListResponsive_module_1 = require("./shared/directives/matGridListResponsive/matGridListResponsive.module");
const icon_1 = require("@angular/material/icon");
const toolbar_1 = require("@angular/material/toolbar");
const button_1 = require("@angular/material/button");
const home_page_post_module_1 = require("./feature/homePagePost/home-page-post.module");
const menu_1 = require("@angular/material/menu");
const tabs_1 = require("@angular/material/tabs");
let MainModule = class MainModule {
};
MainModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [main_view_1.MainViewComponent],
        imports: [
            platform_browser_1.BrowserModule,
            routing_module_1.RoutingModule,
            animations_1.BrowserAnimationsModule,
            grid_list_1.MatGridListModule,
            menu_module_1.MenuModule,
            services_module_1.ServiceModule,
            progress_spinner_1.MatProgressSpinnerModule,
            http_1.HttpClientModule,
            sidenav_1.MatSidenavModule,
            mat_drawer_responsive_module_1.MatDrawerResponsiveDirectiveModule,
            matGridListResponsive_module_1.GridListResponsiveDirectiveModule,
            icon_1.MatIconModule,
            tabs_1.MatTabsModule,
            menu_1.MatMenuModule,
            toolbar_1.MatToolbarModule,
            button_1.MatButtonModule,
            home_page_post_module_1.HomePagePostModule.forChatTopic(),
            ngx_quill_1.QuillModule.forRoot(),
        ],
        providers: [
            { provide: compat_1.FIREBASE_OPTIONS, useValue: environment_1.environment.firebaseConfig },
        ],
        bootstrap: [main_view_1.MainViewComponent],
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map