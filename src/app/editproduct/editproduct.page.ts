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
import { Router } from '@angular/router';
import { parse } from 'url';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
  base64Image: string;
  photo_name = '';
  counters = 0;
  ProductData: any  = {};
  responseData: any;
  categories: any;
  respData: any;
  fileUrl: any = null;

  productDetails: any;
  constructor(public camera: Camera ,
    public navCtrl: NavController,
    public toastController: ToastController,
    public authService: AuthService ,
    public http: HttpClient,
    private crop: Crop,
    public transfer: FileTransfer,
    public file: File,
    public imagePicker: ImagePicker,
    private router: Router,
    private route: ActivatedRoute) {
      
      this.route.params.subscribe(params => {
        this.ProductData.product_name = params['product_name'];
        this.ProductData.product_id = params['product_id'];
        this.ProductData.product_price = params['product_price'];
        this.ProductData.borrowing_price = params['borrowing_price'];
        // this.ProductData.product_colors = params['product_color'];
        // this.ProductData.product_sizes = params['product_size'];
        // this.ProductData.product_material = params['product_material'];
        this.ProductData.cat_id = params['cat_id'];
        this.ProductData.product_image = params['product_image'];
        this.ProductData.product_description = params['product_description'];

        this.authService.postDate({product_id: this.ProductData.product_id}, 'getproducdetails').then((result) => {
          let responseData;
          responseData = result;
          console.log(responseData);
          if (! responseData.error) {
            this.productDetails = responseData.products[0];
            // this.cart.product_id = this.productDetails.product_id;
            // let temouser = JSON.parse(localStorage.getItem('userData'));
            // this.cart.user_id = temouser.user_id;
          }
        }, (err) => {
          this.presentToast('Check your internet connection!');
        });
      });

      this.authService.postDate({}, 'getproducts').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData);
        if (! responseData.error) {
          this.counters = responseData.products.length + 1;
          console.log(this.counters);
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
     }

     // methods
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
          saveToPhotoAlbum: false
        };

        this.camera.getPicture(options).then((imageData) => {
          this.base64Image = 'data:image/jpg;base64,' + imageData;
        }, (err) => {
          // Handle error
        });
      }

      uploadImage() {
        const fileTransfer: FileTransferObject = this.transfer.create();
        console.log(this.counters);
        // random int
        const random = Math.floor(Math.random() * 100);
       // this.photo_name="product_name" + this.counters + ".jpg";
        // option transfer
        const options: FileUploadOptions = {
          fileKey: 'file',
          fileName: '' + this.ProductData.product_name + '.jpg',
          chunkedMode: false,
          httpMethod: 'post',
          mimeType: 'image/jpg',
          headers: {}
        };
        // file transfer action
        fileTransfer.upload(this.base64Image, 'http://localhost/PHP-Slim-Restful/api/uploaduser.php', options)
          .then((data) => {
            console.log(data);
            alert('Success');
            this.ProductData.product_photo = this.photo_name;
            this.counters++;

          }, (err) => {
            console.log(err);
            alert('Error');
          });
      }


    cat_id(event) {
    console.log(event);
    this.ProductData.cat_id = event.detail.value;
    }
    update_prod() {
    console.log(this.ProductData);
    this.authService.postDate(this.ProductData, 'updateproduct').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (!this.responseData.error) {
        this.presentToast('updated!');
      } else {
        this.presentToast(this.responseData.text);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
    }

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
  goBack() {
    this.navCtrl.back();
  }

  
}
