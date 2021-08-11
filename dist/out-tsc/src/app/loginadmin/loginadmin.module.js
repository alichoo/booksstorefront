import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginadminPage } from './loginadmin.page';
var routes = [
    {
        path: '',
        component: LoginadminPage
    }
];
var LoginadminPageModule = /** @class */ (function () {
    function LoginadminPageModule() {
    }
    LoginadminPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LoginadminPage]
        })
    ], LoginadminPageModule);
    return LoginadminPageModule;
}());
export { LoginadminPageModule };
//# sourceMappingURL=loginadmin.module.js.map