import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MembershipPage } from './membership.page';
var routes = [
    {
        path: '',
        component: MembershipPage
    }
];
var MembershipPageModule = /** @class */ (function () {
    function MembershipPageModule() {
    }
    MembershipPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MembershipPage]
        })
    ], MembershipPageModule);
    return MembershipPageModule;
}());
export { MembershipPageModule };
//# sourceMappingURL=membership.module.js.map