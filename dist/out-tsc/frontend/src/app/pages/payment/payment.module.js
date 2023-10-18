"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const payment_view_1 = require("./view/payment.view");
const payment_routing_module_1 = require("./payment-routing.module");
const grid_list_1 = require("@angular/material/grid-list");
const card_1 = require("@angular/material/card");
const post_category_module_1 = require("src/app/feature/postCategory/post-category.module");
let PaymentModule = class PaymentModule {
};
PaymentModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [payment_view_1.PaymentViewComponent],
        imports: [
            common_1.CommonModule,
            grid_list_1.MatGridListModule,
            card_1.MatCardModule,
            post_category_module_1.PostCategoryModule,
            payment_routing_module_1.PaymentRoutingModule,
        ],
        exports: [payment_view_1.PaymentViewComponent],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=payment.module.js.map