import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddproductPage } from './addproduct.page';
var routes = [
    {
        path: '',
        component: AddproductPage
    }
];
var AddproductPageModule = /** @class */ (function () {
    function AddproductPageModule() {
    }
    AddproductPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddproductPage]
        })
    ], AddproductPageModule);
    return AddproductPageModule;
}());
export { AddproductPageModule };
//# sourceMappingURL=addproduct.module.js.map