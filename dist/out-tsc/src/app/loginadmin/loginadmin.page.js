import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
var LoginadminPage = /** @class */ (function () {
    function LoginadminPage(modalCtrl, toastController, navCtrl, authService) {
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.adminData = { 'name': '', 'password': '', 'email': '', 'admin_id': '' };
    }
    //methods
    LoginadminPage.prototype.onclicklog = function () {
        var _this = this;
        this.authService.postDate(this.adminData, 'loginadmin').then(function (result) {
            _this.responseData = result;
            console.log(_this.responseData);
            if (!_this.responseData.error) {
                _this.presentToast('Login Successfully!');
                //    localStorage.setItem('adminData', JSON.stringify(this.responseData.adminData));
                _this.navCtrl.navigateForward('/admin');
            }
            else {
                _this.presentToast(_this.responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    LoginadminPage.prototype.presentToast = function (messageToToast) {
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
    LoginadminPage.prototype.ngOnInit = function () {
    };
    LoginadminPage = tslib_1.__decorate([
        Component({
            selector: 'app-loginadmin',
            templateUrl: './loginadmin.page.html',
            styleUrls: ['./loginadmin.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ToastController,
            NavController,
            AuthService])
    ], LoginadminPage);
    return LoginadminPage;
}());
export { LoginadminPage };
//# sourceMappingURL=loginadmin.page.js.map