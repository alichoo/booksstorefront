import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
var EditaboutusPage = /** @class */ (function () {
    function EditaboutusPage(toastController, navCtrl, authService) {
        var _this = this;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.about = { text: "", phone: "", insta: "", face: "", address: "", email: "", admin_email: "" };
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
    EditaboutusPage.prototype.ngOnInit = function () {
    };
    EditaboutusPage.prototype.save = function () {
        var _this = this;
        this.authService.postDate(this.about, 'setabout').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                _this.presentToast("Data Updated!");
            }
            else {
                _this.presentToast(responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    EditaboutusPage.prototype.presentToast = function (messageToToast) {
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
    EditaboutusPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    EditaboutusPage = tslib_1.__decorate([
        Component({
            selector: 'app-editaboutus',
            templateUrl: './editaboutus.page.html',
            styleUrls: ['./editaboutus.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController, NavController, AuthService])
    ], EditaboutusPage);
    return EditaboutusPage;
}());
export { EditaboutusPage };
//# sourceMappingURL=editaboutus.page.js.map