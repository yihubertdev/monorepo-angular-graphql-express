"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const payment_view_1 = require("./view/payment.view");
const routes = [{ path: "", component: payment_view_1.PaymentViewComponent }];
let PaymentRoutingModule = class PaymentRoutingModule {
};
PaymentRoutingModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], PaymentRoutingModule);
exports.PaymentRoutingModule = PaymentRoutingModule;
//# sourceMappingURL=payment-routing.module.js.map