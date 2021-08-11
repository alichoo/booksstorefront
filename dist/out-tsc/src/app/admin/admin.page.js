import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
var AdminPage = /** @class */ (function () {
    function AdminPage(camera, navCtrl) {
        this.camera = camera;
        this.navCtrl = navCtrl;
    }
    //methods
    AdminPage.prototype.navtoslide = function () {
        this.navCtrl.navigateForward('/slides');
    };
    AdminPage.prototype.navtoproduct = function () {
        this.navCtrl.navigateForward('/product');
    };
    AdminPage.prototype.navtocat = function () {
        this.navCtrl.navigateForward('/category');
    };
    AdminPage.prototype.navtoorders = function () {
        this.navCtrl.navigateForward('/orders');
    };
    AdminPage.prototype.navtoborrowing = function () {
        this.navCtrl.navigateForward('/borrowingrequest');
    };
    AdminPage.prototype.navtospecial = function () {
        this.navCtrl.navigateForward('/editspecial');
    };
    AdminPage.prototype.navtonewarrival = function () {
        this.navCtrl.navigateForward('/editnewarrival');
    };
    AdminPage.prototype.navtoabout = function () {
        this.navCtrl.navigateForward('/editaboutus');
    };
    AdminPage.prototype.ngOnInit = function () {
    };
    AdminPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    AdminPage = tslib_1.__decorate([
        Component({
            selector: 'app-admin',
            templateUrl: './admin.page.html',
            styleUrls: ['./admin.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Camera, NavController])
    ], AdminPage);
    return AdminPage;
}());
export { AdminPage };
//# sourceMappingURL=admin.page.js.map