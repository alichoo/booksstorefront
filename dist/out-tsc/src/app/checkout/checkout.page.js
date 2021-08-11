import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
var CheckoutPage = /** @class */ (function () {
    function CheckoutPage(authService, navCtrl, alertController, toastController) {
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.toastController = toastController;
        this.CartItem = [];
        this.products = [];
        this.discount = 0;
    }
    CheckoutPage.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.authService.postDate(this.user, 'getmembership').then(function (res) {
            var mm = [];
            mm = res.member;
            if (mm.length > 0) {
                _this.subdisabled = false;
                _this.discount = mm[0].discount;
                console.log(_this.discount);
            }
            else {
                _this.subdisabled = true;
                _this.discount = null;
            }
        });
    };
    CheckoutPage.prototype.ionViewWillEnter = function () {
        this.reloadCat();
        this.temouser = JSON.parse(localStorage.getItem('userData'));
    };
    CheckoutPage.prototype.reloadCat = function () {
        var _this = this;
        var temouser = null;
        try {
            temouser = JSON.parse(localStorage.getItem('userData'));
        }
        catch (_a) {
            temouser = null;
        }
        if (temouser !== null) {
            this.userid = temouser.user_id;
            this.authService.postDate({ user_id: this.userid }, 'getcart').then(function (result) {
                var responseData;
                responseData = result;
                console.log(responseData);
                if (!responseData.error) {
                    _this.CartItem = responseData.carts;
                    if (_this.CartItem.length > 0) {
                        _this.orderNote = _this.CartItem[0].note;
                    }
                    _this.sumall();
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    CheckoutPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    CheckoutPage.prototype.sumall = function () {
        this.orderTotal = 0;
        for (var i = 0; i < this.CartItem.length; i++) {
            this.orderTotal += parseInt(this.CartItem[i].price_all_qty) - (parseInt(this.CartItem[i].product_qty) * this.discount);
        }
    };
    CheckoutPage.prototype.presentToast = function (messageToToast) {
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
    CheckoutPage.prototype.confirmcart = function () {
        var _this = this;
        this.authService.postDate(this.user, 'confirmcart').then(function (result) {
            _this.presentToast('Purchase done Successfully!!');
        });
    };
    CheckoutPage.prototype.orderConfirmed = function () {
        var _this = this;
        this.sugesst(this.CartItem[0].cat_id);
        if (this.CartItem.length >= 1) {
            console.log(this.orderNote);
            this.authService.postDate({ order: this.CartItem, ordernote: this.orderNote }, 'sendEmailto404').then(function (result) {
                var responseData;
                responseData = result;
                console.log(responseData);
                if (!responseData.error) {
                    _this.presentToast('Order Confirmed');
                    _this.orderTotal = 0;
                    _this.CartItem = [];
                    _this.orderNote = '';
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
        else {
            this.presentToast('please add at least one item to cart');
        }
    };
    CheckoutPage.prototype.sugesst = function (cat_id) {
        var _this = this;
        this.temouser = JSON.parse(localStorage.getItem('userData'));
        this.authService.postDate({ cat_id: cat_id, user_id: this.temouser.user_id }, 'getproductofcat').then(function (result) {
            var responseData;
            responseData = result;
            _this.products = responseData.products;
            console.log(_this.products);
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    CheckoutPage = tslib_1.__decorate([
        Component({
            selector: 'app-checkout',
            templateUrl: './checkout.page.html',
            styleUrls: ['./checkout.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, NavController,
            AlertController, ToastController])
    ], CheckoutPage);
    return CheckoutPage;
}());
export { CheckoutPage };
//# sourceMappingURL=checkout.page.js.map