import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage  {
  responseData: any;
  segValue = "wish";
  products: any;
  lastImage:string =null;
  userData = { name: '', password: '', email: '', phone: '', user_id: '', address: '', city: '', country: 'Egypt', zip: '', code: '+20', user_photo: null };
  constructor(private router: Router, public modalCtrl: ModalController, public toastController: ToastController, public navCtrl: NavController, public authService: AuthService) { }

  ionViewWillEnter() {
    let userDataTemp = null;
    try {
      userDataTemp = JSON.parse(localStorage.getItem('userData'));
    } catch{
      userDataTemp = null
    }
    if (userDataTemp == null) {
      this.modalCtrl.create({ component: LoginPage }).then((modal) => {
        modal.present();
      });
    } else {
      this.userData = userDataTemp;
      this.lastImage= this.userData.user_photo+'?'+ new Date().getTime();
      this.authService.postDate({ user_id: this.userData.user_id }, 'getmywish').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData)
        if (!responseData.error) {
          this.products = responseData.products;
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    }

  }
  ngOnInit() {
  }
  openProduct(index) {
    this.router.navigate(['/product-details', { product_id: this.products[index].product_id, product_name: this.products[index].product_name }]);
  }
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  addToWish(producID, i) {
    if (this.userData.user_id == null) {
      this.presentToast('Log in is required!');
      return
    }
    this.authService.postDate({ product_id: producID, user_id: this.userData.user_id }, 'delWish').then((result: any) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
        this.products.splice(i, 1);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
}
