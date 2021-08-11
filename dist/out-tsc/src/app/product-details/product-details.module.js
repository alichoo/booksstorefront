import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductDetailsPage } from './product-details.page';
import { ColorPickerModule } from 'ngx-color-picker';
var routes = [
    {
        path: '',
        component: ProductDetailsPage
    }
];
var ProductDetailsPageModule = /** @class */ (function () {
    function ProductDetailsPageModule() {
    }
    ProductDetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ColorPickerModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProductDetailsPage],
        })
    ], ProductDetailsPageModule);
    return ProductDetailsPageModule;
}());
export { ProductDetailsPageModule };
//# sourceMappingURL=product-details.module.js.map