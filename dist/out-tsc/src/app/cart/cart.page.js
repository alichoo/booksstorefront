import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
var CartPage = /** @class */ (function () {
    function CartPage(route, navCtrl, toastController, authService, alertController) {
        this.route = route;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.authService = authService;
        this.alertController = alertController;
        this.CartItem = [];
        this.orderNote = '';
        this.orderTotal = 0;
        this.discount = 0;
    }
    CartPage.prototype.ionViewWillEnter = function () {
        this.reloadCat();
    };
    CartPage.prototype.reloadCat = function () {
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
    CartPage.prototype.addQty = function (i) {
        var _this = this;
        this.authService.postDate({ cart_id: this.CartItem[i].cart_id,
            product_id: this.CartItem[i].product_id }, 'addqtytocart').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.CartItem[i].product_qty = parseInt(_this.CartItem[i].product_qty) + 1;
                _this.CartItem[i].price_all_qty = parseInt(_this.CartItem[i].product_qty) * (_this.CartItem[i].product_price);
                _this.sumall();
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    CartPage.prototype.minQty = function (i) {
        var _this = this;
        if (this.CartItem[i].product_qty <= 1) {
            this.presentToast('Minimum order quantity!');
        }
        else {
            this.authService.postDate({ cart_id: this.CartItem[i].cart_id,
                product_id: this.CartItem[i].product_id }, 'removeqtytocart').then(function (result) {
                var responseData;
                responseData = result;
                console.log(responseData);
                if (!responseData.error) {
                    _this.CartItem[i].product_qty = parseInt(_this.CartItem[i].product_qty) - 1;
                    _this.CartItem[i].price_all_qty = parseInt(_this.CartItem[i].product_qty) * (_this.CartItem[i].product_price);
                    _this.sumall();
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    CartPage.prototype.sumall = function () {
        this.orderTotal = 0;
        for (var i = 0; i < this.CartItem.length; i++) {
            this.orderTotal += parseInt(this.CartItem[i].price_all_qty) - (parseInt(this.CartItem[i].product_qty) * this.discount);
        }
    };
    CartPage.prototype.confirmcart = function () {
        var _this = this;
        this.authService.postDate(this.user, 'confirmcart').then(function (result) {
            _this.presentToast('Purchase done Successfully!!');
        });
    };
    CartPage.prototype.deleteitem = function (i) {
        var _this = this;
        this.authService.postDate({ cart_id: this.CartItem[i].cart_id }, 'removecart').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.CartItem.splice(i, 1);
                _this.presentToast('Item deleted successfully');
                _this.sumall();
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    CartPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    CartPage.prototype.ngOnInit = function () {
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
    CartPage.prototype.presentToast = function (messageToToast) {
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
    CartPage.prototype.orderConfirmed = function () {
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
    CartPage.prototype.addNote = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Order Note',
                            message: 'Add your special note below, please!',
                            inputs: [
                                {
                                    name: 'note',
                                    type: 'text',
                                    placeholder: 'Order Note',
                                    value: this.orderNote
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (alertData) {
                                        if (alertData.note.length > 1) {
                                            _this.authService.postDate({ user_id: _this.userid, ordernote: alertData.note }, 'addOrderNote').then(function (result) {
                                                var responseData;
                                                responseData = result;
                                                console.log(responseData);
                                                if (!responseData.error) {
                                                    _this.presentToast('Note Added!');
                                                    _this.orderNote = alertData.note;
                                                    _this.CartItem[0].note = alertData.note;
                                                }
                                            }, function (err) {
                                                _this.presentToast('Check your internet connection!');
                                            });
                                        }
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
    CartPage.prototype.sugesst = function (cat_id) {
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
    CartPage = tslib_1.__decorate([
        Component({
            selector: 'app-cart',
            templateUrl: './cart.page.html',
            styleUrls: ['./cart.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, NavController,
            ToastController, AuthService, AlertController])
    ], CartPage);
    return CartPage;
}());
export { CartPage };
//# sourceMappingURL=cart.page.js.map