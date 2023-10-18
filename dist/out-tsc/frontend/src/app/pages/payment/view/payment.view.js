"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentViewComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const post_static_1 = require("src/app/core/static/post.static");
let PaymentViewComponent = class PaymentViewComponent {
    constructor() {
        this.postList = post_static_1.postList;
    }
};
PaymentViewComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "post-view",
        template: ` <div>payment</div> `,
        styleUrls: ["./payment.view.css"],
    })
], PaymentViewComponent);
exports.PaymentViewComponent = PaymentViewComponent;
//# sourceMappingURL=payment.view.js.map