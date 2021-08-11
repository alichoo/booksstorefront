import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
var EditnewarrivalPage = /** @class */ (function () {
    function EditnewarrivalPage(toastController, authService, navCtrl) {
        var _this = this;
        this.toastController = toastController;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.products = [];
        this.authService.postDate({}, 'getspecialnewarrival').then(function (result) {
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
    EditnewarrivalPage.prototype.presentToast = function (messageToToast) {
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
    EditnewarrivalPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    EditnewarrivalPage.prototype.ngOnInit = function () {
    };
    EditnewarrivalPage.prototype.addSpecial = function (producID, i) {
        var _this = this;
        this.authService.postDate({ product_id: producID }, 'addspecial').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                _this.products[i].specialproduct = '1';
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    EditnewarrivalPage.prototype.removeSpecial = function (producID, i) {
        var _this = this;
        this.authService.postDate({ product_id: producID }, 'delspecial').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                _this.products[i].specialproduct = '0';
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    EditnewarrivalPage.prototype.addArrival = function (producID, i) {
        var _this = this;
        this.authService.postDate({ product_id: producID }, 'addnewarrival').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                _this.products[i].newarrvialproduct = '1';
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    EditnewarrivalPage.prototype.removeArrival = function (producID, i) {
        var _this = this;
        this.authService.postDate({ product_id: producID }, 'delnewarrival').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                _this.products[i].newarrvialproduct = '0';
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    EditnewarrivalPage = tslib_1.__decorate([
        Component({
            selector: 'app-editnewarrival',
            templateUrl: './editnewarrival.page.html',
            styleUrls: ['./editnewarrival.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            AuthService, NavController])
    ], EditnewarrivalPage);
    return EditnewarrivalPage;
}());
export { EditnewarrivalPage };
//# sourceMappingURL=editnewarrival.page.js.map