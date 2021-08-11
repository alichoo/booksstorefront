import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
var BorrowedBooksPage = /** @class */ (function () {
    function BorrowedBooksPage(navCtrl, router, modalCtrl, route, toastController, authService, alertController) {
        this.navCtrl = navCtrl;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.route = route;
        this.toastController = toastController;
        this.authService = authService;
        this.alertController = alertController;
        this.borrowed_books = [];
        this.cart = {};
        var tempuser = JSON.parse(localStorage.getItem('userData'));
        this.cart.user_id = tempuser.user_id;
    }
    BorrowedBooksPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    BorrowedBooksPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.postDate({ user_id: this.cart.user_id }, 'getborrowedbooksofsingleuser').then(function (result) {
            _this.borrowed_books = result.data;
            console.log(_this.borrowed_books[0]);
        }, function (error) {
        });
    };
    BorrowedBooksPage = tslib_1.__decorate([
        Component({
            selector: 'app-borrowed-books',
            templateUrl: './borrowed-books.page.html',
            styleUrls: ['./borrowed-books.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, Router, ModalController,
            ActivatedRoute,
            ToastController,
            AuthService,
            AlertController])
    ], BorrowedBooksPage);
    return BorrowedBooksPage;
}());
export { BorrowedBooksPage };
//# sourceMappingURL=borrowed-books.page.js.map