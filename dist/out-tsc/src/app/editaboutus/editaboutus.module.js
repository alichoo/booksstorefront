import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditaboutusPage } from './editaboutus.page';
var routes = [
    {
        path: '',
        component: EditaboutusPage
    }
];
var EditaboutusPageModule = /** @class */ (function () {
    function EditaboutusPageModule() {
    }
    EditaboutusPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditaboutusPage]
        })
    ], EditaboutusPageModule);
    return EditaboutusPageModule;
}());
export { EditaboutusPageModule };
//# sourceMappingURL=editaboutus.module.js.map