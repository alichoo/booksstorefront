import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditspecialPage } from './editspecial.page';
var routes = [
    {
        path: '',
        component: EditspecialPage
    }
];
var EditspecialPageModule = /** @class */ (function () {
    function EditspecialPageModule() {
    }
    EditspecialPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditspecialPage]
        })
    ], EditspecialPageModule);
    return EditspecialPageModule;
}());
export { EditspecialPageModule };
//# sourceMappingURL=editspecial.module.js.map