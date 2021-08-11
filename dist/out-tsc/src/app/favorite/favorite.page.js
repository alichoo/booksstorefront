import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { LoginPage } from '../login/login.page';
var FavoritePage = /** @class */ (function () {
    function FavoritePage(router, modalCtrl, toastController, navCtrl, authService) {
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.segValue = "wish";
        this.lastImage = null;
        this.userData = { name: '', password: '', email: '', phone: '', user_id: '', address: '', city: '', country: 'Egypt', zip: '', code: '+20', user_photo: null };
    }
    FavoritePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var userDataTemp = null;
        try {
            userDataTemp = JSON.parse(localStorage.getItem('userData'));
        }
        catch (_a) {
            userDataTemp = null;
        }
        if (userDataTemp == null) {
            this.modalCtrl.create({ component: LoginPage }).then(function (modal) {
                modal.present();
            });
        }
        else {
            this.userData = userDataTemp;
            this.lastImage = this.userData.user_photo + '?' + new Date().getTime();
            this.authService.postDate({ user_id: this.userData.user_id }, 'getmywish').then(function (result) {
                var responseData;
                responseData = result;
                console.log(responseData);
                if (!responseData.error) {
                    _this.products = responseData.products;
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    FavoritePage.prototype.ngOnInit = function () {
    };
    FavoritePage.prototype.openProduct = function (index) {
        this.router.navigate(['/product-details', { product_id: this.products[index].product_id, product_name: this.products[index].product_name }]);
    };
    FavoritePage.prototype.presentToast = function (messageToToast) {
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
    FavoritePage.prototype.addToWish = function (producID, i) {
        var _this = this;
        if (this.userData.user_id == null) {
            this.presentToast('Log in is required!');
            return;
        }
        this.authService.postDate({ product_id: producID, user_id: this.userData.user_id }, 'delWish').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                _this.products.splice(i, 1);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    FavoritePage = tslib_1.__decorate([
        Component({
            selector: 'app-favorite',
            templateUrl: './favorite.page.html',
            styleUrls: ['./favorite.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ModalController, ToastController, NavController, AuthService])
    ], FavoritePage);
    return FavoritePage;
}());
export { FavoritePage };
//# sourceMappingURL=favorite.page.js.map