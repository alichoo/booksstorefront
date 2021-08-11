import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BorrowedBooksPage } from './borrowed-books.page';
var routes = [
    {
        path: '',
        component: BorrowedBooksPage
    }
];
var BorrowedBooksPageModule = /** @class */ (function () {
    function BorrowedBooksPageModule() {
    }
    BorrowedBooksPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BorrowedBooksPage]
        })
    ], BorrowedBooksPageModule);
    return BorrowedBooksPageModule;
}());
export { BorrowedBooksPageModule };
//# sourceMappingURL=borrowed-books.module.js.map