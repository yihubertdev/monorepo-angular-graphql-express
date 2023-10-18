"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselSliderModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const progress_bar_1 = require("@angular/material/progress-bar");
const fire_storage_module_1 = require("src/app/core/services/fireStorage/fire-storage.module");
const carousel_slider_component_1 = require("./carousel-slider.component");
let CarouselSliderModule = class CarouselSliderModule {
};
CarouselSliderModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [carousel_slider_component_1.CarouselSliderComponent],
        imports: [common_1.CommonModule, progress_bar_1.MatProgressBarModule, fire_storage_module_1.FireStorageServiceModule],
        exports: [carousel_slider_component_1.CarouselSliderComponent],
    })
], CarouselSliderModule);
exports.CarouselSliderModule = CarouselSliderModule;
//# sourceMappingURL=carousel-slider.module.js.map