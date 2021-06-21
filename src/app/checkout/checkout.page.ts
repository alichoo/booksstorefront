import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  userid: any;
  CartItem: any = [];
  orderNote: any;
  orderTotal: number;
  temouser: any;
  products: any = [];

  constructor(public authService: AuthService, public alertController: AlertController,public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.reloadCat();
    this.temouser = JSON.parse(localStorage.getItem('userData'));
    
  }

  reloadCat() {
    let temouser = null;
    try {
      temouser = JSON.parse(localStorage.getItem('userData'));
    } catch{
      temouser = null
    }
    if (temouser !== null) {
      this.userid = temouser.user_id;
      this.authService.postDate({ user_id: this.userid }, 'getcart').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData)
        if (!responseData.error) {
          this.CartItem = responseData.carts;
          if (this.CartItem.length > 0) {
            this.orderNote = this.CartItem[0].note;
          }
          this.sumall();
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    }
  }

  sumall() {
    this.orderTotal = 0;
    for (let i = 0; i < this.CartItem.length; i++) {
      this.orderTotal += parseInt(this.CartItem[i].price_all_qty);
    }
  }

   async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  orderConfirmed() {
    this.sugesst(this.CartItem[0].cat_id);

  if (this.CartItem.length >= 1) {
    console.log(this.orderNote)
    this.authService.postDate({ order: this.CartItem, ordernote: this.orderNote }, 'sendEmailto404').then((result) => {
      let responseData;
      responseData = result;
      console.log(responseData)
      if (!responseData.error) {
        this.presentToast('Order Confirmed');
        this.orderTotal = 0;
        this.CartItem = [];
        this.orderNote = "";
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  else {
    this.presentToast('please add at least one item to cart')
  }
}

sugesst(cat_id){
  this.temouser = JSON.parse(localStorage.getItem('userData'));
  this.authService.postDate({ cat_id: cat_id, user_id: this.temouser.user_id }, 'getproductofcat').then((result) => {
    let responseData;
    responseData = result;
      this.products = responseData.products;
    console.log(this.products);

  }, (err) => {
    this.presentToast('Check your internet connection!');
  });
}

}
