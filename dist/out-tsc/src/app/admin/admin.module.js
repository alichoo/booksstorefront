import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminPage } from './admin.page';
var routes = [
    {
        path: '',
        component: AdminPage
    }
];
var AdminPageModule = /** @class */ (function () {
    function AdminPageModule() {
    }
    AdminPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AdminPage]
        })
    ], AdminPageModule);
    return AdminPageModule;
}());
export { AdminPageModule };
//# sourceMappingURL=admin.module.js.map