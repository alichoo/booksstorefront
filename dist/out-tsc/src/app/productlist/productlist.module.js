import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductlistPage } from './productlist.page';
var routes = [
    {
        path: '',
        component: ProductlistPage
    }
];
var ProductlistPageModule = /** @class */ (function () {
    function ProductlistPageModule() {
    }
    ProductlistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProductlistPage]
        })
    ], ProductlistPageModule);
    return ProductlistPageModule;
}());
export { ProductlistPageModule };
//# sourceMappingURL=productlist.module.js.map