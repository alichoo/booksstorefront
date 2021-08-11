import * as tslib_1 from "tslib";
import { Component, ViewChildren, QueryList } from '@angular/core';
import { Platform, ToastController, IonRouterOutlet, MenuController, ActionSheetController, PopoverController, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(modalCtrl, menu, actionSheetCtrl, popoverCtrl, platform, splashScreen, statusBar, authService, router, toastController, navCtrl) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.actionSheetCtrl = actionSheetCtrl;
        this.popoverCtrl = popoverCtrl;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.authService = authService;
        this.router = router;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.appPages = [
            {
                title: 'Home',
                url: '/tabs',
                icon: 'home',
                dir: 'root'
            }
        ];
        this.lastPages = [
            {
                title: 'About Us',
                url: '/list',
                icon: 'contacts',
                dir: 'forward'
            }
        ];
        this.showCat = false;
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            var responseData;
            var userDataTemp;
            try {
                userDataTemp = JSON.parse(localStorage.getItem('userData'));
            }
            catch (_a) {
                userDataTemp = null;
            }
            _this.platform.backButton.subscribeWithPriority(1, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var element, error_1, element, error_2, element, error_3, element, error_4;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.actionSheetCtrl.getTop()];
                        case 1:
                            element = _a.sent();
                            if (element) {
                                element.dismiss();
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.popoverCtrl.getTop()];
                        case 4:
                            element = _a.sent();
                            if (element) {
                                element.dismiss();
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_2 = _a.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.modalCtrl.getTop()];
                        case 7:
                            element = _a.sent();
                            if (element) {
                                element.dismiss();
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 9];
                        case 8:
                            error_3 = _a.sent();
                            console.log(error_3);
                            return [3 /*break*/, 9];
                        case 9:
                            _a.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, this.menu.getOpen()];
                        case 10:
                            element = _a.sent();
                            if (element !== null && element !== undefined) {
                                this.menu.close();
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 12];
                        case 11:
                            error_4 = _a.sent();
                            console.log(error_4);
                            return [3 /*break*/, 12];
                        case 12:
                            this.routerOutlets.forEach(function (outlet) {
                                if (outlet && outlet.canGoBack()) {
                                    outlet.pop();
                                }
                                else if (_this.router.url === '/tabs/home') {
                                    if (new Date().getTime() - _this.lastTimeBackPress < _this.timePeriodToExit) {
                                        navigator['app'].exitApp(); // work in ionic 4
                                    }
                                    else {
                                        _this.presentToast('Press back again to exit App.');
                                        _this.lastTimeBackPress = new Date().getTime();
                                    }
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            if (userDataTemp !== null) {
                var user_id = userDataTemp.user_id;
                _this.authService.postDate({ user_id: user_id }, 'checkadmin').then(function (result) {
                    responseData = result;
                    if (!responseData.error) {
                        _this.appPages.push({
                            title: 'Administration',
                            url: '/admin',
                            icon: 'settings',
                            dir: 'forward'
                        });
                    }
                    ;
                }, function (err) {
                });
            }
            _this.authService.postDate({}, 'getcat').then(function (result) {
                responseData = result;
                if (!responseData.error) {
                    _this.categories = responseData.category;
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        });
    }
    AppComponent.prototype.openCategory = function (index) {
        console.log(this.categories[index].cat_id);
        this.router.navigate(['/productlist', { cat_id: this.categories[index].cat_id, cat_name: this.categories[index].cat_name }]);
    };
    AppComponent.prototype.presentToast = function (messageToToast) {
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
    AppComponent.prototype.initializeApp = function () {
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('userData');
        this.navCtrl.navigateForward('/tabs');
        this.presentToast("Logged out successfully!");
    };
    tslib_1.__decorate([
        ViewChildren(IonRouterOutlet),
        tslib_1.__metadata("design:type", QueryList)
    ], AppComponent.prototype, "routerOutlets", void 0);
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            MenuController,
            ActionSheetController,
            PopoverController, Platform, SplashScreen, StatusBar, AuthService, Router, ToastController, NavController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map