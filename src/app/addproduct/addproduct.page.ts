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
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
 })
export class AddproductPage implements OnInit {
  base64Image: string;
  ProductData = {
    'product_id': '', 
    'cat_id': '',
     'product_name': '',
     'product_photo': '',  
     'product_price': '', 
     'product_image': '', 
     'product_colors': '', 
     'product_sizes': '', 
     'product_description': '',
      'product_material': '',
      'product_case': ''};
  responseData: any;
  categories: any;
  respData: any;
  fileUrl: any=null;
  photo_name=''
  counters=0
  
  constructor(public camera:Camera ,
    public navCtrl : NavController,
    public toastController: ToastController,
    public authService: AuthService ,
    public http:HttpClient,
    private crop:Crop,
    public transfer: FileTransfer,
    public file: File,
    public imagePicker: ImagePicker) { 

      this.authService.postDate({}, 'getproducts').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData)
        if (! responseData.error) {
          this.counters=responseData.products.length+1;
          console.log(this.counters)
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
     }

    //methods
 async presentToast(messageToToast) {
  const toast = await this.toastController.create({
    message: messageToToast,
    duration: 1500,
    position: 'top'
  });
  toast.present(); 
 }


 camphoto(){
  const options: CameraOptions = {
    quality: 100,
    allowEdit: true,
   // sourceType: source,
    saveToPhotoAlbum: true,
    correctOrientation: true,
   // targetWidth:400,
    //targetHeight:400,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options).then((imageData) => {
        // let filename = imageData.substring(imageData.lastIndexOf('/')+1);
        // let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
        //      this.file.readAsDataURL(path, filename).then(res=> this.base64Image = res  );
             this.base64Image = 'data:image/jpg;base64,' + imageData;
   }, (err) => {
   });
  }
  getimage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  


  

  uploadImage(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log(this.counters)
    //random int
    var random = Math.floor(Math.random() * 100);
   // this.photo_name="product_name" + this.counters + ".jpg";
    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: "" + this.ProductData.product_name + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpg",
      headers: {}
    }
    //file transfer action
    fileTransfer.upload(this.base64Image, 'https://msi-cs.com/404gallery/api/upload.php', options)
      .then((data) => {
        console.log(data)
        alert("Success");
        this.ProductData.product_image=this.photo_name
        //this.counters++;
        
      }, (err) => {
        console.log(err);
        alert("Error");
      });
  }


cat_id(event){
console.log(event)
this.ProductData.cat_id=event.detail.value;
}
add_prod(){
console.log(this.ProductData)
this.authService.postDate(this.ProductData, 'addproduct').then((result) => {
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

  ngOnInit() {
    
    this.authService.postDate({}, 'getcat').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.categories = this.responseData.category;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  goBack(){
    this.navCtrl.back();
  }
}
