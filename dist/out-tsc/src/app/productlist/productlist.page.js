import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
var ProductlistPage = /** @class */ (function () {
    function ProductlistPage(navCtrl, router, route, toastController, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.router = router;
        this.route = route;
        this.toastController = toastController;
        this.authService = authService;
        this.category = { "cat_name": "", "cat_id": "" };
        this.temouser = { user_id: null };
        this.route.params.subscribe(function (params) {
            _this.category.cat_name = params['cat_name'];
            _this.category.cat_id = params['cat_id'];
            try {
                _this.temouser = JSON.parse(localStorage.getItem('userData'));
                if (!_this.temouser) {
                    _this.temouser = { user_id: null };
                }
            }
            catch (_a) {
                _this.temouser = { user_id: null };
            }
            _this.authService.postDate({ cat_id: _this.category.cat_id, user_id: _this.temouser.user_id }, 'getproductofcat').then(function (result) {
                var responseData;
                responseData = result;
                console.log(responseData);
                if (!responseData.error) {
                    _this.products = responseData.products;
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        });
    }
    ProductlistPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ProductlistPage.prototype.presentToast = function (messageToToast) {
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
    ProductlistPage.prototype.openProduct = function (index) {
        console.log(this.products[index].product_id);
        // tslint:disable-next-line: max-line-length
        this.router.navigate(['/product-details', { product_id: this.products[index].product_id, product_name: this.products[index].product_name }]);
    };
    ProductlistPage.prototype.ngOnInit = function () {
    };
    ProductlistPage.prototype.addToWish = function (producID, i, special) {
        var _this = this;
        if (this.temouser.user_id == null) {
            this.presentToast('Log in is required!');
            return;
        }
        if (this.products[i].wishflag == "0") {
            this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'addWish').then(function (result) {
                var responseData;
                responseData = result;
                if (!responseData.error) {
                    _this.products[i].wishflag = '1';
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
        else {
            this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'delWish').then(function (result) {
                var responseData;
                responseData = result;
                if (!responseData.error) {
                    _this.products[i].wishflag = '0';
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    ProductlistPage = tslib_1.__decorate([
        Component({
            selector: 'app-productlist',
            templateUrl: './productlist.page.html',
            styleUrls: ['./productlist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Router,
            ActivatedRoute,
            ToastController,
            AuthService])
    ], ProductlistPage);
    return ProductlistPage;
}());
export { ProductlistPage };
//# sourceMappingURL=productlist.page.js.map