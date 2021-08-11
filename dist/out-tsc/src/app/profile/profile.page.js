import * as tslib_1 from "tslib";
// import { Component, OnInit } from '@angular/core';
// import { NavController, ToastController, ModalController } from '@ionic/angular';
// import { AuthService } from '../auth-service.service';
// import { LoginPage } from '../login/login.page';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LoginPage } from '../login/login.page';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(modalCtrl, camera, transfer, file, imagePicker, actionSheetCtrl, toastController, navCtrl, authService) {
        this.modalCtrl = modalCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.imagePicker = imagePicker;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.lastImage = null;
        this.photo_name = "";
        this.userData = { name: '', password: '', email: '', phone: '', user_id: '', address: '', city: '', country: 'Egypt', zip: '', code: '+20', user_photo: '' };
        var userDataTemp = null;
        try {
            userDataTemp = JSON.parse(localStorage.getItem('userData'));
        }
        catch (_a) {
            userDataTemp = null;
        }
        if (userDataTemp !== null) {
            this.userData = userDataTemp;
            this.lastImage = this.userData.user_photo + '?' + new Date().getTime();
        }
    }
    ProfilePage.prototype.ionViewWillEnter = function () {
        var userDataTemp = null;
        try {
            userDataTemp = JSON.parse(localStorage.getItem('userData'));
        }
        catch (_a) {
            userDataTemp = null;
        }
        if (userDataTemp == null) {
            this.modalCtrl.create({ component: LoginPage }).then(function (modal) {
                modal.present();
            });
        }
        else {
            this.userData = userDataTemp;
            this.lastImage = this.userData.user_photo + '?' + new Date().getTime();
        }
    };
    ProfilePage.prototype.presentToast = function (messageToToast) {
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
    ProfilePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            header: 'Choose or take a picture',
            buttons: [
                {
                    text: 'Take a picture',
                    icon: 'camera',
                    handler: function () {
                        _this.camphoto();
                    }
                },
                {
                    text: 'Choose pictures',
                    icon: 'images',
                    handler: function () {
                        _this.getimage();
                    }
                }
            ]
        }).then(function (actionsheet) {
            actionsheet.present();
        });
    };
    ProfilePage.prototype.update_user = function () {
        var _this = this;
        console.log(this.userData);
        if (this.checkDataValid()) {
            this.authService.postDate(this.userData, 'updateuser').then(function (result) {
                _this.responseData = result;
                console.log(_this.responseData);
                if (!_this.responseData.error) {
                    _this.authService.postDate(_this.userData, 'getuser').then(function (result) {
                        _this.responseData = result;
                        if (!_this.responseData.error) {
                            _this.presentToast('User date updated!');
                            _this.userData = _this.responseData.userData;
                            localStorage.setItem('userData', JSON.stringify(_this.responseData.userData));
                            _this.lastImage = _this.userData.user_photo + '?' + new Date().getTime();
                        }
                        else {
                            _this.presentToast(_this.responseData.text);
                        }
                    }, function (err) {
                        _this.presentToast('Check your internet connection!');
                    });
                }
                else {
                    _this.presentToast(_this.responseData.text);
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        }
    };
    ProfilePage.prototype.logout = function () {
        localStorage.removeItem('userData');
        this.navCtrl.navigateForward('/tabs');
        this.presentToast("Logged out successfully!");
    };
    ProfilePage.prototype.checkDataValid = function () {
        if (this.userData.name == '' || this.userData.name == null || this.userData.name.split(" ").length - 1 < 1) {
            this.presentToastError("Please enter valid name.");
            return false;
        }
        if (this.userData.email == '' || this.userData.email == null || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.email)) {
            this.presentToastError("Please enter valid email.");
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
        return true;
    };
    ProfilePage.prototype.presentToastError = function (messageToToast) {
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
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    ProfilePage.prototype.camphoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            allowEdit: true,
            // sourceType: source,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            // targetWidth:400,
            //targetHeight:400,
            encodingType: this.camera.EncodingType.JPEG,
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(options).then(function (imageData) {
            var filename = imageData.substring(imageData.lastIndexOf('/') + 1);
            var path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
            _this.file.readAsDataURL(path, filename).then(function (res) { return _this.base64Image = res; });
            _this.base64Image = imageData;
            _this.uploadImage();
        }, function (err) {
        });
    };
    ProfilePage.prototype.getimage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.lastImage = _this.base64Image;
            _this.uploadImage();
        }, function (err) {
            // Handle error
        });
    };
    ProfilePage.prototype.uploadImage = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        //random int
        var random = Math.floor(Math.random() * 100);
        this.photo_name = this.userData.email + ".jpg";
        //option transfer
        var options = {
            fileKey: 'file',
            fileName: this.userData.email + ".jpg",
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "image/jpg",
            headers: {}
        };
        fileTransfer.upload(this.base64Image, 'http://localhost/PHP-Slim-Restful/api/uploaduser.php', options)
            .then(function (data) {
            console.log(data);
            _this.userData.user_photo = _this.photo_name;
            _this.lastImage = _this.base64Image;
            return true;
        }, function (err) {
            console.log(err);
            _this.userData.user_photo = null;
            _this.presentToast("Error Uploading Image");
            return true;
        });
    };
    ProfilePage.prototype.updateUrl = function () {
        this.lastImage = "assets/user.png";
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, Camera, FileTransfer, File, ImagePicker, ActionSheetController, ToastController, NavController, AuthService])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map