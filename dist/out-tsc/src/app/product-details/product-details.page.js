import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
var ProductDetailsPage = /** @class */ (function () {
    function ProductDetailsPage(navCtrl, router, modalCtrl, route, toastController, authService, alertController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.route = route;
        this.toastController = toastController;
        this.authService = authService;
        this.alertController = alertController;
        this.asstax = 50;
        this.maxdate = new Date();
        this.maxdates = new Date().toISOString();
        this.today = new Date().toISOString();
        this.def = 2;
        this.productDetails = {};
        this.userData = { 'name': '', 'password': '', 'email': '', 'phone': '', 'user_id': '' };
        this.product = {};
        this.cart = { 'product_id': '', 'product_color': '', 'product_size': '', 'user_id': '', 'product_qty': 1 };
        this.subdisabled = true;
        this.discount = null;
        // this.today  date.setDate(date.getDate() + days);
        this.route.params.subscribe(function (params) {
            _this.product.product_name = params['product_name'];
            _this.product.product_id = params['product_id'];
            _this.authService.postDate({ product_id: _this.product.product_id }, 'getproducdetails').then(function (result) {
                var responseData;
                responseData = result;
                if (!responseData.error) {
                    _this.productDetails = responseData.products[0];
                    // this.productDetails.product_colors = JSON.parse(this.productDetails.product_colors)
                    // this.productDetails.product_sizes = JSON.parse(this.productDetails.product_sizes)
                    _this.cart.product_id = _this.productDetails.product_id;
                    _this.totalbprice = parseFloat(_this.productDetails.borrowing_price) + _this.asstax;
                    // this.cart.product_color = this.productDetails.product_colors[0];
                    // this.cart.product_size = this.productDetails.product_sizes[0];
                    var temouser = JSON.parse(localStorage.getItem('userData'));
                    _this.cart.user_id = temouser.user_id;
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        });
    }
    ProductDetailsPage.prototype.mydate = function ($event, todate) {
        var days = 3;
        this.maxdate = new Date(this.fromdate);
        this.maxdate = this.addDays(this.maxdate, days - 1);
        this.maxdates = new Date(this.maxdate).toISOString();
        if (!(new Date(this.fromdate).getTime() <= new Date(this.todate).getTime()) ||
            !((new Date(this.todate).getTime() - new Date(this.fromdate).getTime()) <= (days) * (1000 * 60 * 60 * 24))) {
            this.presentToast('To Date must be GREATER or EQUAL From Date or borrowings days must be  less than 3 days ');
        }
    };
    ProductDetailsPage.prototype.addDays = function (date, days) {
        date.setDate(date.getDate() + days);
        return date;
    };
    ProductDetailsPage.prototype.findProductInCart = function () {
        var _this = this;
        var userDataTemp = JSON.parse(localStorage.getItem('userData'));
        if (userDataTemp === null) {
            this.router.navigate(['/']);
        }
        else {
            this.authService.postDate({ 'user_id': userDataTemp.user_id }, 'findProductInCart').then(function (result) {
                _this.responseData = result;
                console.log(_this.responseData);
                if (_this.responseData.carts.length > 0) {
                    console.log('cart fiha');
                    _this.responseData.carts.forEach(function (element) {
                        if (element.product_id === _this.product.product_id) {
                            _this.addqtyInCart(element.cart_id);
                            var find = true;
                            console.log(element);
                        }
                    });
                }
                else {
                    _this.addtocart();
                }
                if (!_this.responseData.error) {
                    _this.presentToast('find to your cart!');
                    // this.modalCtrl.dismiss();
                    // this.router.navigate(['/']);
                    var find = false;
                }
                else {
                    _this.presentToast(_this.responseData.text);
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    ProductDetailsPage.prototype.addtocart = function () {
        var _this = this;
        var userDataTemp = JSON.parse(localStorage.getItem('userData'));
        if (userDataTemp === null) {
            this.router.navigate(['/']);
        }
        else {
            this.authService.postDate(this.cart, 'addtocart').then(function (result) {
                _this.responseData = result;
                console.log(_this.responseData);
                if (!_this.responseData.error) {
                    _this.presentToast('added to your cart!');
                    // this.modalCtrl.dismiss();
                    _this.router.navigate(['/']);
                }
                else {
                    _this.presentToast(_this.responseData.text);
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    ProductDetailsPage.prototype.addQty = function () {
        if (this.productDetails.product_copies > this.cart.product_qty) {
            this.cart.product_qty += 1;
        }
    };
    ProductDetailsPage.prototype.minQty = function () {
        if (this.cart.product_qty <= 1) {
            this.presentToast('Minimum order quantity!');
        }
        else {
            this.cart.product_qty -= 1;
        }
    };
    ProductDetailsPage.prototype.sendborrowbookrequest = function (product_id) {
        var _this = this;
        this.product.product_qty = this.cart.product_qty;
        var Borroweddays = new Date(this.borrowingdays);
        // this.product.borrowingdays = Borroweddays.getDay() - 1;
        var now = new Date().getTime();
        var diff = now + (Borroweddays.getDay() - 1) * (60 * 60 * 1000 * 24);
        // this.product.borrowingdays = new Date(diff);
        this.product.fromdate = this.fromdate;
        this.product.todate = this.todate;
        if (new Date(this.fromdate).getTime() <= new Date(this.todate).getTime() &&
            ((new Date(this.todate).getTime() - new Date(this.fromdate).getTime()) <= 3 * (1000 * 60 * 60 * 24))) {
            console.log('ok ');
            this.product.user_id = this.cart.user_id;
            console.log(this.product);
            this.authService.postDate(this.product, 'borrowingbooks').then(function (result) {
                var responseData = result;
                _this.presentToast(responseData.message);
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
        else {
            this.presentToast('To Date must be GREATER or EQUAL From Date');
        }
    };
    ProductDetailsPage.prototype.addqtyInCart = function (id) {
        var _this = this;
        var userDataTemp = JSON.parse(localStorage.getItem('userData'));
        if (userDataTemp === null) {
            this.router.navigate(['/']);
        }
        else {
            this.authService.postDate({ 'cart_id': id }, 'addqtytocart').then(function (result) {
                _this.responseData = result;
                console.log(_this.responseData);
                if (!_this.responseData.error) {
                }
                else {
                    _this.presentToast(_this.responseData.text);
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    // changeSize(i) {
    //   this.cart.product_size = this.productDetails.product_sizes[i];
    // }
    // changeColor(i) {
    //   this.cart.product_color = this.productDetails.product_colors[i];
    // }
    ProductDetailsPage.prototype.ngOnInit = function () {
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
    ProductDetailsPage.prototype.subscribenow = function () {
        this.router.navigate(['/membership']);
    };
    ProductDetailsPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    // customColor(e) {
    //   if (e) {
    //     this.productDetails.product_colors.unshift(e);
    //     this.cart.product_color = e;
    //   }
    // }
    // async customSize() {
    //   const alert = await this.alertController.create({
    //     header: 'Custom Size',
    //     message: 'Enter your custom product dimension in centimeters!',
    //     inputs: [
    //       {
    //         name: 'width',
    //         type: 'text',
    //         placeholder: 'Width (cm)',
    //       }, {
    //         name: 'height',
    //         type: 'text',
    //         placeholder: 'Height (cm)'
    //       },
    //       {
    //         name: 'length',
    //         type: 'text',
    //         placeholder: 'Length (cm)'
    //       }],
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         cssClass: 'secondary',
    //         handler: () => {
    //           console.log('Confirm Cancel');
    //         }
    //       }, {
    //         text: 'Ok',
    //         handler: (alertData) => {
    //           if (alertData.width < 1) alertData.width = 0;
    //           if (alertData.height < 1) alertData.height = 0;
    //           if (alertData.length < 1) alertData.length = 0;
    //           let dim = alertData.width + "x" + alertData.height + "x" + alertData.length;
    //           this.productDetails.product_sizes.unshift(dim);
    //           this.cart.product_size = dim;
    //         }
    //       }
    //     ]
    //   });
    //   await alert.present();
    // }
    ProductDetailsPage.prototype.presentToast = function (messageToToast) {
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
    ProductDetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-product-details',
            templateUrl: './product-details.page.html',
            styleUrls: ['./product-details.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Router,
            ModalController,
            ActivatedRoute,
            ToastController,
            AuthService,
            AlertController])
    ], ProductDetailsPage);
    return ProductDetailsPage;
}());
export { ProductDetailsPage };
//# sourceMappingURL=product-details.page.js.map