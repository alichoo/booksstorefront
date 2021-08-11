import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddcatPage } from './addcat.page';
var routes = [
    {
        path: '',
        component: AddcatPage
    }
];
var AddcatPageModule = /** @class */ (function () {
    function AddcatPageModule() {
    }
    AddcatPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddcatPage]
        })
    ], AddcatPageModule);
    return AddcatPageModule;
}());
export { AddcatPageModule };
//# sourceMappingURL=addcat.module.js.map