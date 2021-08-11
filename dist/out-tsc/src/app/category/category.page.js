import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
var CategoryPage = /** @class */ (function () {
    function CategoryPage(router, navCtrl, toastController, authService, http) {
        this.router = router;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.authService = authService;
        this.http = http;
    }
    //methods
    CategoryPage.prototype.presentToast = function (messageToToast) {
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
    CategoryPage.prototype.openCat = function (index) {
        console.log(this.categories[index].cat_id);
        // tslint:disable-next-line: max-line-length
        this.router.navigate(['/editcat', { cat_id: this.categories[index].cat_id,
                cat_name: this.categories[index].cat_name,
                cat_image: this.categories[index].cat_image
            }]);
    };
    CategoryPage.prototype.deletecat = function (i) {
        var _this = this;
        this.authService.postDate({ cat_id: this.categories[i].cat_id }, 'removecat').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.categories.splice(i, 1);
                _this.presentToast('category deleted successfully');
            }
            else {
                _this.presentToast('this category has prodcuts');
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    CategoryPage.prototype.navtoadd = function () {
        this.navCtrl.navigateForward('/addcat');
    };
    CategoryPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.postDate({}, 'getcat').then(function (result) {
            _this.responseData = result;
            if (!_this.responseData.error) {
                console.log(_this.responseData);
                _this.categories = _this.responseData.category;
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    CategoryPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    CategoryPage = tslib_1.__decorate([
        Component({
            selector: 'app-category',
            templateUrl: './category.page.html',
            styleUrls: ['./category.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            NavController,
            ToastController,
            AuthService,
            HttpClient])
    ], CategoryPage);
    return CategoryPage;
}());
export { CategoryPage };
//# sourceMappingURL=category.page.js.map