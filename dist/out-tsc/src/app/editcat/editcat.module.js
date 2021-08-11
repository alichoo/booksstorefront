import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditcatPage } from './editcat.page';
var routes = [
    {
        path: '',
        component: EditcatPage
    }
];
var EditcatPageModule = /** @class */ (function () {
    function EditcatPageModule() {
    }
    EditcatPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditcatPage]
        })
    ], EditcatPageModule);
    return EditcatPageModule;
}());
export { EditcatPageModule };
//# sourceMappingURL=editcat.module.js.map