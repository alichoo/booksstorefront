import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
var AddcatPage = /** @class */ (function () {
    function AddcatPage(camera, navCtrl, toastController, authService, http, crop, transfer, file, imagePicker) {
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.authService = authService;
        this.http = http;
        this.crop = crop;
        this.transfer = transfer;
        this.file = file;
        this.imagePicker = imagePicker;
        this.catData = { 'cat_image': '', 'cat_id': '', 'cat_name': '', 'cat_photo': '' };
        this.counters = 0;
        this.photo_name = "";
    }
    AddcatPage.prototype.presentToast = function (messageToToast) {
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
    AddcatPage.prototype.camphoto = function () {
        var _this = this;
        var options = {
            quality: 40,
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
        }, function (err) {
        });
    };
    AddcatPage.prototype.getimage = function () {
        var _this = this;
        var options = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    AddcatPage.prototype.uploadImage = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        console.log(this.counters);
        //random int
        var random = Math.floor(Math.random() * 100);
        this.photo_name = "cat_name" + this.counters + ".jpg";
        //option transfer
        var options = {
            fileKey: 'file',
            fileName: "" + this.catData.cat_name + ".jpg",
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "image/jpg",
            headers: {}
        };
        //file transfer action
        fileTransfer.upload(this.base64Image, 'https://msi-cs.com/404gallery/api/uploadcat.php', options)
            .then(function (data) {
            console.log(data);
            alert("Success");
            _this.catData.cat_photo = _this.photo_name;
            _this.counters++;
        }, function (err) {
            console.log(err);
            alert("Error");
        });
    };
    AddcatPage.prototype.addcat = function () {
        var _this = this;
        console.log(this.catData);
        this.authService.postDate(this.catData, 'addcat').then(function (result) {
            _this.responseData = result;
            console.log(_this.responseData);
            if (!_this.responseData.error) {
                _this.presentToast('added!');
            }
            else {
                _this.presentToast(_this.responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    AddcatPage.prototype.ngOnInit = function () {
    };
    AddcatPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    AddcatPage = tslib_1.__decorate([
        Component({
            selector: 'app-addcat',
            templateUrl: './addcat.page.html',
            styleUrls: ['./addcat.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Camera,
            NavController,
            ToastController,
            AuthService,
            HttpClient,
            Crop,
            FileTransfer,
            File,
            ImagePicker])
    ], AddcatPage);
    return AddcatPage;
}());
export { AddcatPage };
//# sourceMappingURL=addcat.page.js.map