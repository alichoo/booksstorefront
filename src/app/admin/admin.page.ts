import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public camera:Camera ,public navCtrl : NavController,) {}

  //methods
  navtoslide(){
    this.navCtrl.navigateForward('/slides');
   }
  navtoproduct(){
    this.navCtrl.navigateForward('/product');
   }
  navtocat(){
    this.navCtrl.navigateForward('/category');
   }
   navtoorders(){
    this.navCtrl.navigateForward('/orders');
   }
   navtoborrowing(){
    this.navCtrl.navigateForward('/borrowingrequest');
   }
   navtospecial(){
    this.navCtrl.navigateForward('/editspecial');
   }
   navtonewarrival(){
    this.navCtrl.navigateForward('/editnewarrival');
   }
   navtoabout(){
    this.navCtrl.navigateForward('/editaboutus');
   }
  ngOnInit() {
  }
  goBack(){
    this.navCtrl.back();
  }
}
