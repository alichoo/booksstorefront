import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
var ListPage = /** @class */ (function () {
    function ListPage(toastController, navCtrl, authService) {
        var _this = this;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.about = { text: "", phone: "", insta: "", face: "", address: "", email: "" };
        this.authService.postDate({}, 'getabout').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                _this.about = responseData.about[0];
            }
            else {
                _this.presentToast(responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    }
    ListPage.prototype.ngOnInit = function () {
    };
    ListPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ListPage.prototype.presentToast = function (messageToToast) {
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
    ListPage = tslib_1.__decorate([
        Component({
            selector: 'app-list',
            templateUrl: 'list.page.html',
            styleUrls: ['list.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController, NavController, AuthService])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.page.js.map