import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.page.html',
  styleUrls: ['./profileedit.page.scss'],
})
export class ProfileeditPage implements OnInit {
  base64Image: string;
  lastImage:string =null;
  photo_name = "";
  responseData: any;
  userData = { name: '', password: '', email: '', phone: '', user_id: '', address: '', city: '', country: 'Egypt', zip: '', code: '+20', user_photo: '' };
  constructor(public camera: Camera,public transfer: FileTransfer, public file: File,public imagePicker: ImagePicker,public actionSheetCtrl: ActionSheetController, public toastController: ToastController, public navCtrl: NavController, public authService: AuthService) {
    let userDataTemp = null;
    try {
      userDataTemp = JSON.parse(localStorage.getItem('userData'));
    } catch{
      userDataTemp = null
    }
    if (userDataTemp !== null) {
      this.userData = userDataTemp;
      this.lastImage= this.userData.user_photo+'?'+ new Date().getTime();
    }
  }
  ionViewWillEnter() {
    
  }
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      header: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.camphoto();
          }
        },
        {
          text: 'Choose pictures',
          icon: 'images',
          handler: () => {
            this.getimage();
          }
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }

  update_user() {
    console.log(this.userData)
    if (this.checkDataValid()) {
      this.authService.postDate(this.userData, 'updateuser').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (!this.responseData.error) {
          this.authService.postDate(this.userData, 'getuser').then((result) => {
            this.responseData = result;
            if(!this.responseData.error){
              this.presentToast('User date updated!');
              this.userData = this.responseData.userData;
              localStorage.setItem('userData', JSON.stringify(this.responseData.userData));
              this.lastImage= this.userData.user_photo+'?'+ new Date().getTime();
            } else{
              this.presentToast(this.responseData.text);
            }
          }, (err) => {
            this.presentToast('Check your internet connection!');
          });
        } else {
          this.presentToast(this.responseData.text);
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    }

  }
  logout() {
    localStorage.removeItem('userData');
    this.navCtrl.navigateForward('/tabs');
  }
  checkDataValid() {
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
  }
  async presentToastError(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }
  camphoto() {
    const options: CameraOptions = {
      quality: 70,
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
      this.uploadImage();
    }, (err) => {
    });
  }
  getimage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.lastImage= this.base64Image;

      this.uploadImage();
    }, (err) => {
      // Handle error
    });
  }
  uploadImage() {
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    //random int
    var random = Math.floor(Math.random() * 100);
    this.photo_name = this.userData.email + ".jpg";
    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.userData.email + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(this.base64Image, 'https://msi-cs.com/404gallery/api/uploaduser.php', options)
      .then((data) => {
        console.log(data)
        this.userData.user_photo = this.photo_name
        this.lastImage= this.base64Image;
        return true;
      }, (err) => {
        console.log(err);
        this.userData.user_photo = null;
        this.presentToast("Error Uploading Image");
        return true;
      });

  }
  updateUrl(){
    this.lastImage= "assets/user.png";
  }
}
