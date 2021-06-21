import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.page.html',
  styleUrls: ['./addcat.page.scss'],
})
export class AddcatPage implements OnInit {
  base64Image: string;
  catData = { 'cat_image': '', 'cat_id': '', 'cat_name': '', 'cat_photo': '' };
  counters = 0;
  photo_name = "";
  responseData: any;
  constructor(public camera: Camera,
    public navCtrl: NavController,
    public toastController: ToastController,
    public authService: AuthService,
    public http: HttpClient,
    private crop: Crop,
    public transfer: FileTransfer,
    public file: File,
    public imagePicker: ImagePicker) { }

  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }


  camphoto() {
    const options: CameraOptions = {
      quality: 40,
      allowEdit: true,
      // sourceType: source,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      // targetWidth:400,
      //targetHeight:400,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
    }
    this.camera.getPicture(options).then((imageData) => {
      let filename = imageData.substring(imageData.lastIndexOf('/') + 1);
      let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, filename).then(res => this.base64Image = res);
      this.base64Image = imageData;
    }, (err) => {
    });
  }
  getimage() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  uploadImage() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log(this.counters)
    //random int
    var random = Math.floor(Math.random() * 100);
    this.photo_name = "cat_name" + this.counters + ".jpg";
    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: "" + this.catData.cat_name + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(this.base64Image, 'https://msi-cs.com/404gallery/api/uploadcat.php', options)
      .then((data) => {
        console.log(data)
        alert("Success");
        this.catData.cat_photo = this.photo_name
        this.counters++;
      }, (err) => {
        console.log(err);
        alert("Error");
      });
  }
  addcat() {
    console.log(this.catData)
    this.authService.postDate(this.catData, 'addcat').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (!this.responseData.error) {
        this.presentToast('added!');
      } else {
        this.presentToast(this.responseData.text);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }

}
