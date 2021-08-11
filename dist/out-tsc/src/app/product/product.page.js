import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
var ProductPage = /** @class */ (function () {
    function ProductPage(authService, toastController, http, navCtrl, router) {
        this.authService = authService;
        this.toastController = toastController;
        this.http = http;
        this.navCtrl = navCtrl;
        this.router = router;
    }
    //methods
    ProductPage.prototype.presentToast = function (messageToToast) {
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
    ProductPage.prototype.openProduct = function (index) {
        console.log(this.product[index].product_id);
        // tslint:disable-next-line: max-line-length
        this.router.navigate(['/editproduct', { product_id: this.product[index].product_id,
                product_name: this.product[index].product_name,
                product_price: this.product[index].product_price,
                product_material: this.product[index].product_material,
                product_color: this.product[index].product_colors,
                product_description: this.product[index].product_description,
                product_size: this.product[index].product_sizes,
                cat_id: this.product[index].cat_id,
                product_image: this.product[index].product_image
            }]);
    };
    ProductPage.prototype.deleteproduct = function (i) {
        var _this = this;
        this.authService.postDate({ product_id: this.product[i].product_id }, 'removeproduct').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.product.splice(i, 1);
                _this.presentToast('Item deleted successfully');
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    ProductPage.prototype.navtoadd = function () {
        this.navCtrl.navigateForward('/addproduct');
    };
    ProductPage.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.postDate({}, 'getproducts').then(function (result) {
            _this.responseData = result;
            if (!_this.responseData.error) {
                console.log(_this.responseData);
                _this.product = _this.responseData.products;
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    ProductPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ProductPage = tslib_1.__decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.page.html',
            styleUrls: ['./product.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            ToastController,
            HttpClient,
            NavController,
            Router])
    ], ProductPage);
    return ProductPage;
}());
export { ProductPage };
//# sourceMappingURL=product.page.js.map