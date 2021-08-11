import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BorrowingrequestPage } from './borrowingrequest.page';
var routes = [
    {
        path: '',
        component: BorrowingrequestPage
    }
];
var BorrowingrequestPageModule = /** @class */ (function () {
    function BorrowingrequestPageModule() {
    }
    BorrowingrequestPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BorrowingrequestPage]
        })
    ], BorrowingrequestPageModule);
    return BorrowingrequestPageModule;
}());
export { BorrowingrequestPageModule };
//# sourceMappingURL=borrowingrequest.module.js.map