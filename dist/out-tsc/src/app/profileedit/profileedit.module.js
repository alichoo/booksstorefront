import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfileeditPage } from './profileedit.page';
var routes = [
    {
        path: '',
        component: ProfileeditPage
    }
];
var ProfileeditPageModule = /** @class */ (function () {
    function ProfileeditPageModule() {
    }
    ProfileeditPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProfileeditPage]
        })
    ], ProfileeditPageModule);
    return ProfileeditPageModule;
}());
export { ProfileeditPageModule };
//# sourceMappingURL=profileedit.module.js.map