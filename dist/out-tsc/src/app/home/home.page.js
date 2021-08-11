import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// import { Searchbar } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(router, navCtrl, toastController, authService, http, platform) {
        var _this = this;
        this.router = router;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.authService = authService;
        this.http = http;
        this.platform = platform;
        this.ProductData = { 'product_id': '', 'cat_id': '', 'product_name': '' };
        this.temouser = { user_id: null };
        this.searchbaropened = false;
        this.segValue = 'New Arrivals';
        this.isItemAvailable = false;
        this.slideOpts = {
            initialSlide: 1,
            speed: 400,
            autoplay: true
        };
        try {
            this.temouser = JSON.parse(localStorage.getItem('userData'));
            if (!this.temouser) {
                this.temouser = { user_id: null };
            }
        }
        catch (_a) {
            this.temouser = { user_id: null };
        }
        this.authService.postDate({}, 'getslides').then(function (result) {
            _this.responseData = result;
            if (!_this.responseData.error) {
                console.log(_this.responseData);
                _this.slide = _this.responseData.slides;
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
        this.authService.postDate({}, 'getcat').then(function (result) {
            _this.responseData = result;
            if (!_this.responseData.error) {
                console.log(_this.responseData);
                _this.categories = _this.responseData.category;
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
        /*this.authService.postDate({}, 'getproducts').then((result) => {
          let responseData;
          responseData = result;
          console.log(responseData)
          if (! responseData.error) {
            this.products= responseData.products;
          }
        }, (err) => {
          this.presentToast('Check your internet connection!');
        });*/
    }
    HomePage.prototype.presentToast = function (messageToToast) {
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
    HomePage.prototype.onSearchChange = function ($event) {
        var _this = this;
        this.authService.postDate({ product_name: this.ProductData.product_name }, 'searchproduct').then(function (result) {
            // this.responseData = result;
            console.log(result);
            if (result) {
                _this.isItemAvailable = true;
                console.log(result);
                _this.search = result.products;
                console.log('$event', _this.search);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    HomePage.prototype.navtofb = function () {
        var _this = this;
        this.authService.postDate({}, 'getabout').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                window.location.href = responseData.about[0].face;
            }
            else {
                _this.presentToast(responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    HomePage.prototype.navtoinsta = function () {
        var _this = this;
        this.authService.postDate({}, 'getabout').then(function (result) {
            var responseData;
            responseData = result;
            if (!responseData.error) {
                window.location.href = responseData.about[0].insta;
            }
            else {
                _this.presentToast(responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
        // window.location.href = 'https://www.instagram.com/404gallery/';
    };
    HomePage.prototype.openProduct = function (producID, producName) {
        // console.log(index,this.product,this.products[index],);
        // let pro = this.products.filter((e) => { return e.product_id === index })
        // console.log(pro)
        // tslint:disable-next-line: max-line-length
        this.router.navigate(['/product-details', { product_id: producID, product_name: producName }]);
    };
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.openCategory = function (index) {
        console.log(this.categories[index].cat_id);
        this.router.navigate(['/productlist', { cat_id: this.categories[index].cat_id, cat_name: this.categories[index].cat_name }]);
    };
    HomePage.prototype.openproduct2 = function (index) {
        console.log(this.product[index].product_id);
        this.router.navigate(['/product-details',
            { product_id: this.product[index].product_id, product_name: this.product[index].product_name }]);
    };
    // openproduct3(index) {
    //   console.log(this.special[index].product_id);
    //   this.router.navigate(['/product-details',
    // { product_id: this.special[index].product_id, product_name: this.special[index].product_name }]);
    // }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        try {
            this.temouser = JSON.parse(localStorage.getItem('userData'));
            if (!this.temouser) {
                this.temouser = { user_id: null };
            }
        }
        catch (_a) {
            this.temouser = { user_id: null };
        }
        this.authService.postDate({ user_id: this.temouser.user_id }, 'newarrivals').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.product = responseData.carts;
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
        this.authService.postDate({ user_id: this.temouser.user_id }, 'specialpieces').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.special = responseData.carts;
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    HomePage.prototype.addToWish = function (producID, i, special) {
        var _this = this;
        if (this.temouser.user_id == null) {
            this.presentToast('Log in is required!');
            return;
        }
        if (special) {
            if (this.special[i].wishflag === '0') {
                this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'addWish').then(function (result) {
                    var responseData;
                    responseData = result;
                    if (!responseData.error) {
                        _this.special[i].wishflag = '1';
                    }
                }, function (err) {
                    _this.presentToast('Check your internet connection!');
                });
            }
            else {
                this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'delWish').then(function (result) {
                    var responseData;
                    responseData = result;
                    if (!responseData.error) {
                        _this.special[i].wishflag = '0';
                    }
                }, function (err) {
                    _this.presentToast('Check your internet connection!');
                });
            }
        }
        else {
            if (this.product[i].wishflag === '0') {
                this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'addWish').then(function (result) {
                    var responseData;
                    responseData = result;
                    if (!responseData.error) {
                        _this.product[i].wishflag = '1';
                    }
                }, function (err) {
                    _this.presentToast('Check your internet connection!');
                });
            }
            else {
                this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'delWish').then(function (result) {
                    var responseData;
                    responseData = result;
                    if (!responseData.error) {
                        _this.product[i].wishflag = '0';
                    }
                }, function (err) {
                    _this.presentToast('Check your internet connection!');
                });
            }
        }
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            NavController,
            ToastController, AuthService, HttpClient, Platform])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map