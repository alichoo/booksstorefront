import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
var BorrowingrequestPage = /** @class */ (function () {
    function BorrowingrequestPage(navCtrl, router, modalCtrl, route, toastController, authService, alertController, alertCtrl) {
        this.navCtrl = navCtrl;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.route = route;
        this.toastController = toastController;
        this.authService = authService;
        this.alertController = alertController;
        this.alertCtrl = alertCtrl;
        this.borrowed_books = [];
    }
    BorrowingrequestPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.postDate({ user_id: null }, 'getallborrowedbooks').then(function (result) {
            _this.borrowed_books = result.data;
        }, function (error) {
        });
    };
    BorrowingrequestPage.prototype.reject = function (book_borrowing_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'confirming delete',
                            message: 'are you sure to reject the request?',
                            mode: 'ios',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancle'
                                },
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.authService.postDate({ book_borrowing_id: book_borrowing_id, borrowing_status: 'rejected' }, 'changestatusofborrowedbooks').then(function (result) {
                                        }, function (error) {
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BorrowingrequestPage.prototype.accept = function (book_borrowing_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'confirming Accept',
                            message: 'are you sure to Accept the request?',
                            mode: 'ios',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancle'
                                },
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.authService.postDate({ book_borrowing_id: book_borrowing_id, borrowing_status: 'accepted' }, 'changestatusofborrowedbooks').then(function (result) {
                                        }, function (error) {
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BorrowingrequestPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    BorrowingrequestPage.prototype.getbook = function (book_borrowing_id, product_qty) {
        this.authService.postDate({ book_borrowing_id: book_borrowing_id, product_qty: product_qty }, 'returnproduct').then(function (result) {
            console.log(result);
        }, function (error) {
            console.error(error);
        }).catch(function (err) {
            console.error(err);
        });
    };
    BorrowingrequestPage.prototype.presentToast = function (messageToToast) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: messageToToast,
                            duration: 1500,
                            position: 'top'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BorrowingrequestPage = tslib_1.__decorate([
        Component({
            selector: 'app-borrowingrequest',
            templateUrl: './borrowingrequest.page.html',
            styleUrls: ['./borrowingrequest.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Router,
            ModalController,
            ActivatedRoute,
            ToastController,
            AuthService,
            AlertController,
            AlertController])
    ], BorrowingrequestPage);
    return BorrowingrequestPage;
}());
export { BorrowingrequestPage };
//# sourceMappingURL=borrowingrequest.page.js.map