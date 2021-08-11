import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
var SlidesPage = /** @class */ (function () {
    function SlidesPage(authService, toastController, http, navCtrl) {
        this.authService = authService;
        this.toastController = toastController;
        this.http = http;
        this.navCtrl = navCtrl;
    }
    //methods
    SlidesPage.prototype.presentToast = function (messageToToast) {
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
    SlidesPage.prototype.deleteitem = function (i) {
        var _this = this;
        this.authService.postDate({ id: this.slide[i].id }, 'removeslide').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.slide.splice(i, 1);
                _this.presentToast('Item deleted successfully');
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    SlidesPage.prototype.navtoadd = function () {
        this.navCtrl.navigateForward('/addslide');
    };
    SlidesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.postDate({}, 'getslides').then(function (result) {
            _this.responseData = result;
            if (!_this.responseData.error) {
                console.log(_this.responseData);
                _this.slide = _this.responseData.slides;
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    SlidesPage = tslib_1.__decorate([
        Component({
            selector: 'app-slides',
            templateUrl: './slides.page.html',
            styleUrls: ['./slides.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            ToastController,
            HttpClient,
            NavController])
    ], SlidesPage);
    return SlidesPage;
}());
export { SlidesPage };
//# sourceMappingURL=slides.page.js.map