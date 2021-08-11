import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditnewarrivalPage } from './editnewarrival.page';
var routes = [
    {
        path: '',
        component: EditnewarrivalPage
    }
];
var EditnewarrivalPageModule = /** @class */ (function () {
    function EditnewarrivalPageModule() {
    }
    EditnewarrivalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditnewarrivalPage]
        })
    ], EditnewarrivalPageModule);
    return EditnewarrivalPageModule;
}());
export { EditnewarrivalPageModule };
//# sourceMappingURL=editnewarrival.module.js.map