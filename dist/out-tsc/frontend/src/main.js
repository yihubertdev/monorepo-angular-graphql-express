"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const main_module_1 = require("./app/main.module");
const environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    (0, core_1.enableProdMode)();
}
(0, platform_browser_dynamic_1.platformBrowserDynamic)()
    .bootstrapModule(main_module_1.MainModule)
    .catch((err) => console.error(err));
//# sourceMappingURL=main.js.map