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
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
var EditcatPage = /** @class */ (function () {
    function EditcatPage(camera, navCtrl, toastController, authService, http, crop, transfer, file, imagePicker, router, route) {
        var _this = this;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.authService = authService;
        this.http = http;
        this.crop = crop;
        this.transfer = transfer;
        this.file = file;
        this.imagePicker = imagePicker;
        this.router = router;
        this.route = route;
        this.CatData = {
            'cat_id': '',
            'cat_image': '',
            'cat_name': ''
        };
        this.route.params.subscribe(function (params) {
            _this.CatData.cat_name = params['cat_name'];
            _this.CatData.cat_id = params['cat_id'];
            _this.CatData.cat_image = params['cat_image'];
            _this.authService.postDate({ product_id: _this.ProductData.product_id }, 'getproducdetails').then(function (result) {
                var responseData;
                responseData = result;
                console.log(responseData);
                if (!responseData.error) {
                    _this.productDetails = responseData.products[0];
                    // this.cart.product_id = this.productDetails.product_id;
                    // let temouser = JSON.parse(localStorage.getItem('userData'));
                    // this.cart.user_id = temouser.user_id;
                }
            }, function (err) {
                _this.presentToast('Check your internet connection!');
            });
        });
    }
    //
    EditcatPage.prototype.presentToast = function (messageToToast) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: messageToToast,
                            duration: 150,
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
    EditcatPage.prototype.camphoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            allowEdit: true,
            // sourceType: source,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            // targetWidth:400,
            //targetHeight:400,
            encodingType: this.camera.EncodingType.JPEG,
            destinationType: this.camera.DestinationType.DATA_URL
        };
        this.camera.getPicture(options).then(function (imageData) {
            // let filename = imageData.substring(imageData.lastIndexOf('/')+1);
            // let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
            //      this.file.readAsDataURL(path, filename).then(res=> this.base64Image = res  );
            _this.base64Image = 'data:image/jpg;base64,' + imageData;
        }, function (err) {
        });
    };
    EditcatPage.prototype.getimage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    EditcatPage.prototype.uploadImage = function () {
        var fileTransfer = this.transfer.create();
        console.log(this.counters);
        //random int
        var random = Math.floor(Math.random() * 100);
        // this.photo_name="product_name" + this.counters + ".jpg";
        //option transfer
        var options = {
            fileKey: 'file',
            fileName: "" + this.CatData.cat_name + ".jpg",
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
            //this.ProductData.product_photo=this.photo_name
            //this.counters++;
        }, function (err) {
            console.log(err);
            alert("Error");
        });
    };
    // cat_id(event){
    // console.log(event)
    // this.CatData.cat_id=event.detail.value;
    // }
    EditcatPage.prototype.update_prod = function () {
        var _this = this;
        console.log(this.CatData);
        this.authService.postDate(this.CatData, 'updatecat').then(function (result) {
            _this.responseData = result;
            console.log(_this.responseData);
            if (!_this.responseData.error) {
                _this.presentToast('updated!');
            }
            else {
                _this.presentToast(_this.responseData.text);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    };
    EditcatPage.prototype.ngOnInit = function () {
    };
    EditcatPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    EditcatPage = tslib_1.__decorate([
        Component({
            selector: 'app-editcat',
            templateUrl: './editcat.page.html',
            styleUrls: ['./editcat.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Camera,
            NavController,
            ToastController,
            AuthService,
            HttpClient,
            Crop,
            FileTransfer,
            File,
            ImagePicker,
            Router,
            ActivatedRoute])
    ], EditcatPage);
    return EditcatPage;
}());
export { EditcatPage };
//# sourceMappingURL=editcat.page.js.map