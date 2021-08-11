import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
var SignupPage = /** @class */ (function () {
    function SignupPage(modalCtrl, toastController, navCtrl, authService) {
        this.modalCtrl = modalCtrl;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.userData = { name: '', password: '', email: '', phone: '', user_id: '', address: '', city: '', country: 'malaysia', zip: '', code: '+01' };
    }
    SignupPage.prototype.ngOnInit = function () {
    };
    // registrationForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.maxLength(20)]],
    //   email: [''],
    //   phone: ['',[Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]]
    // });
    // get name() {
    //   return this.registrationForm.get("name");
    // }
    // get phone() {
    //   return this.registrationForm.get('phone');
    // }
    // public errorMessages = {
    //   name: [
    //     { type: 'required', message: 'Name is required' },
    //     { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    //   ],
    //   phone: [
    //     { type: 'required', message: 'Phone number is required' },
    //     { type: 'pattern', message: 'Please enter a valid phone number' }
    //   ],
    // };  
    SignupPage.prototype.signup = function () {
        var _this = this;
        if (this.checkDataValid()) {
            // api connection
            this.authService.postDate(this.userData, 'signup').then(function (result) {
                _this.responseData = result;
                console.log(_this.responseData);
                if (!_this.responseData.error) {
                    _this.presentToast('Thanks for registration!');
                    _this.modalCtrl.dismiss();
                    _this.navCtrl.navigateForward('/tabs');
                }
                else {
                    _this.presentToast(_this.responseData.text);
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    SignupPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
        this.navCtrl.navigateForward('/tabs');
    };
    //validation
    SignupPage.prototype.checkDataValid = function () {
        if (this.userData.name == '' || this.userData.name == null || this.userData.name.split(" ").length - 1 < 1) {
            this.presentToastError("Please enter valid name.");
            return false;
        }
        if (this.userData.email == '' || this.userData.email == null || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.email)) {
            this.presentToastError("Please enter valid email.");
            return false;
        }
        if (this.userData.password == '' || this.userData.password == null || this.userData.password.length < 5) {
            this.presentToastError("Please enter valid password.");
            return false;
        }
        if (this.userData.code == '' || this.userData.code == null) {
            this.presentToastError("Please enter valid country code.");
            return false;
        }
        if (this.userData.phone == '' || this.userData.phone == null || !/^\d{10,14}$/.test(this.userData.phone)) {
            this.presentToastError("Please enter valid phone number.");
            return false;
        }
        if (this.userData.address == '' || this.userData.address == null) {
            this.presentToastError("Please enter valid address.");
            return false;
        }
        if (this.userData.zip == '' || this.userData.zip == null) {
            this.presentToastError("Please enter valid zip number.");
            return false;
        }
        if (this.userData.city == '' || this.userData.city == null) {
            this.presentToastError("Please enter valid city name.");
            return false;
        }
        if (this.userData.country == '' || this.userData.country == null) {
            this.presentToastError("Please enter valid country.");
            return false;
        }
        //this.userData.phone = this.userData.code + this.userData.phone;
        return true;
    };
    SignupPage.prototype.presentToastError = function (messageToToast) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: messageToToast,
                            duration: 3000,
                            position: 'middle'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignupPage.prototype.presentToast = function (messageToToast) {
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
    SignupPage = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ToastController,
            NavController,
            AuthService])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map