import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, ToastController, NavController, Platform } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
var MembershipPage = /** @class */ (function () {
    function MembershipPage(modalCtrl, toastController, navCtrl, authService, platform) {
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.platform = platform;
        this.subdisabled = true;
    }
    MembershipPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.userData.ismember = false;
        this.userData.accepted = false;
        console.log((this.userData));
        this.authService.postDate(this.userData, 'getmembership').then(function (res) {
            var mm = [];
            mm = res.member;
            // console.log(mm.length);
            if (mm.length > 0) {
                _this.userData.ismember = true;
                _this.subdisabled = true;
            }
            else {
                _this.subdisabled = false;
            }
        });
    };
    MembershipPage.prototype.onclicklog = function () {
        var _this = this;
        if (!this.userData.accepted) {
            this.presentToast('Please Accept Conditions ');
        }
        else {
            if (!this.userData.ismember) {
                this.authService.postDate(this.userData, 'addmembership').then(function (res) {
                    _this.presentToast('Subscribed Successfully !!! ');
                    _this.navCtrl.back();
                });
            }
            else {
                this.presentToast('You are already a member');
            }
        }
        console.log((this.userData));
    };
    MembershipPage.prototype.presentToast = function (messageToToast) {
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
    MembershipPage = tslib_1.__decorate([
        Component({
            selector: 'app-membership',
            templateUrl: './membership.page.html',
            styleUrls: ['./membership.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ToastController,
            NavController,
            AuthService,
            Platform])
    ], MembershipPage);
    return MembershipPage;
}());
export { MembershipPage };
//# sourceMappingURL=membership.page.js.map