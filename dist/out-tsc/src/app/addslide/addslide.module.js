import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddslidePage } from './addslide.page';
var routes = [
    {
        path: '',
        component: AddslidePage
    }
];
var AddslidePageModule = /** @class */ (function () {
    function AddslidePageModule() {
    }
    AddslidePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddslidePage]
        })
    ], AddslidePageModule);
    return AddslidePageModule;
}());
export { AddslidePageModule };
//# sourceMappingURL=addslide.module.js.map