import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, ModalController, Platform } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { SignupPage } from '../signup/signup.page';
import { NavController } from '@ionic/angular';
var LoginPage = /** @class */ (function () {
    function LoginPage(modalCtrl, toastController, navCtrl, authService, platform) {
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.platform = platform;
        this.userData = { 'name': '', 'password': '', 'email': '', 'phone': '', 'user_id': '' };
    }
    LoginPage.prototype.onclicklog = function () {
        var _this = this;
        this.authService.postDate(this.userData, 'login').then(function (result) {
            _this.responseData = result;
            console.log(_this.responseData);
            if (!_this.responseData.error) {
                _this.presentToast('Login Successfully!');
                localStorage.setItem('userData', JSON.stringify(_this.responseData.userData));
                _this.modalCtrl.dismiss();
                _this.navCtrl.navigateForward('/tabs');
            }
            else {
                _this.presentToast(_this.responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    LoginPage.prototype.onclicksign = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.modalCtrl.create({
                    component: SignupPage
                }).then(function (modal2) {
                    modal2.present();
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
        this.navCtrl.navigateForward('/tabs');
    };
    LoginPage.prototype.presentToast = function (messageToToast) {
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
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.backButtonSubscription = this.platform.backButton.subscribe(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.navCtrl.navigateForward('/tabs');
                return [2 /*return*/];
            });
        }); });
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        this.backButtonSubscription.unsubscribe();
    };
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ToastController,
            NavController,
            AuthService,
            Platform])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map