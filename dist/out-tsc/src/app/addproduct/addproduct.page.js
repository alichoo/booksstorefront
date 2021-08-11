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
var AddproductPage = /** @class */ (function () {
    function AddproductPage(camera, navCtrl, toastController, authService, http, crop, transfer, file, imagePicker) {
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
        this.ProductData = {};
        this.fileUrl = null;
        this.photo_name = '';
        this.counters = 0;
        this.authService.postDate({}, 'getproducts').then(function (result) {
            var responseData;
            responseData = result;
            console.log(responseData);
            if (!responseData.error) {
                _this.counters = responseData.products.length + 1;
                console.log(_this.counters);
            }
        }, function (err) {
            _this.presentToast('Check your internet connection!');
        });
    }
    // methods
    AddproductPage.prototype.presentToast = function (messageToToast) {
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
    AddproductPage.prototype.camphoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            allowEdit: true,
            // sourceType: source,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            // targetWidth:400,
            // targetHeight:400,
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
    AddproductPage.prototype.getimage = function () {
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
    AddproductPage.prototype.uploadImage = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        console.log(this.counters);
        // random int
        var random = Math.floor(Math.random() * 100);
        // this.photo_name="product_name" + this.counters + ".jpg";
        // option transfer
        var options = {
            fileKey: 'file',
            fileName: '' + this.ProductData.product_name + '.jpg',
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: 'image/jpg',
            headers: {}
        };
        // file transfer action
        fileTransfer.upload(this.base64Image, 'https://msi-cs.com/404gallery/api/upload.php', options)
            .then(function (data) {
            console.log(data);
            alert('Success');
            _this.ProductData.product_image = _this.photo_name;
            // this.counters++;
        }, function (err) {
            console.log(err);
            alert('Error');
        });
    };
    AddproductPage.prototype.cat_id = function (event) {
        console.log(event);
        this.ProductData.cat_id = event.detail.value;
    };
    AddproductPage.prototype.add_prod = function () {
        var _this = this;
        console.log(this.ProductData);
        this.authService.postDate(this.ProductData, 'addproduct').then(function (result) {
            _this.responseData = result;
            console.log(_this.responseData);
            if (!_this.responseData.error) {
                _this.presentToast('added!');
                _this.goBack();
            }
            else {
                console.log(_this.responseData);
                _this.presentToast(_this.responseData.text);
            }
        }, function (err) {
            console.log(err);
            _this.presentToast('Check your internet connection!');
        });
    };
    /* cropUpload() {
     this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then((results) => {
       for (let i = 0; i < results.length; i++) {
           console.log('Image URI: ' + results[i]);
           this.crop.crop(results[i], { quality: 100 })
             .then(
               base64Image => {
                 console.log('new image path is: ' + this.base64Image);
                 const fileTransfer: FileTransferObject = this.transfer.create();
                 const uploadOpts: FileUploadOptions = {
                    fileKey: 'file',
                    fileName: this.base64Image.substr(this.base64Image.lastIndexOf('/') + 1)
                 };

                 fileTransfer.upload(this.base64Image, 'https://msi-cs.com/404gallery/api/upload.php', uploadOpts)
                  .then((data) => {
                    console.log(data);
                    this.respData = JSON.parse(data.response);
                    console.log(this.respData);
                    this.fileUrl = this.respData.fileUrl;
                  }, (err) => {
                    console.log(err);
                  });
               },
               error => console.error('Error cropping image', error)
             );
       }
     }, (err) => { console.log(err); });
   }*/
    AddproductPage.prototype.ngOnInit = function () {
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
    AddproductPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    AddproductPage.prototype.changed = function (id) {
        console.log(id);
    };
    AddproductPage = tslib_1.__decorate([
        Component({
            selector: 'app-addproduct',
            templateUrl: './addproduct.page.html',
            styleUrls: ['./addproduct.page.scss'],
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
    ], AddproductPage);
    return AddproductPage;
}());
export { AddproductPage };
//# sourceMappingURL=addproduct.page.js.map