import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CheckoutPage } from './checkout.page';
var routes = [
    {
        path: '',
        component: CheckoutPage
    }
];
var CheckoutPageModule = /** @class */ (function () {
    function CheckoutPageModule() {
    }
    CheckoutPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CheckoutPage]
        })
    ], CheckoutPageModule);
    return CheckoutPageModule;
}());
export { CheckoutPageModule };
//# sourceMappingURL=checkout.module.js.map