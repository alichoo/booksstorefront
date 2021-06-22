import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  CartItem: any = [];
  orderNote = '';
  userid: any;
  cartid: any;
  orderTotal = 0;
  products;
  temouser: any;
  discount: any = 0;
  user: any;
  subdisabled: boolean;
  constructor(private route: ActivatedRoute, private navCtrl: NavController,
     public toastController: ToastController, public authService: AuthService, public alertController: AlertController) { }
  ionViewWillEnter() {
    this.reloadCat();

  }
  reloadCat() {
    let temouser = null;
    try {
      temouser = JSON.parse(localStorage.getItem('userData'));
    } catch {
      temouser = null;
    }
    if (temouser !== null) {
      this.userid = temouser.user_id;
      this.authService.postDate({ user_id: this.userid }, 'getcart').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData);
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

  addQty(i) {
    this.authService.postDate({ cart_id: this.CartItem[i].cart_id,
      product_id: this.CartItem[i].product_id }, 'addqtytocart').then((result) => {
      let responseData;
      responseData = result;
      console.log(responseData);
      if (!responseData.error) {
        this.CartItem[i].product_qty = parseInt(this.CartItem[i].product_qty) + 1;
        this.CartItem[i].price_all_qty = parseInt(this.CartItem[i].product_qty) * (this.CartItem[i].product_price);

        this.sumall();
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  minQty(i) {
    if (this.CartItem[i].product_qty <= 1) {
      this.presentToast('Minimum order quantity!');
    } else {
      this.authService.postDate({ cart_id: this.CartItem[i].cart_id,
        product_id: this.CartItem[i].product_id }, 'removeqtytocart').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData);
        if (!responseData.error) {
          this.CartItem[i].product_qty = parseInt(this.CartItem[i].product_qty) - 1;
          this.CartItem[i].price_all_qty = parseInt(this.CartItem[i].product_qty) * (this.CartItem[i].product_price);

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
      this.orderTotal += parseInt(this.CartItem[i].price_all_qty) - (parseInt(this.CartItem[i].product_qty) * this.discount);
    }
  }
  confirmcart() {
    this.authService.postDate(this.user, 'confirmcart').then((result) => {
      this.presentToast('Purchase done Successfully!!');
    });
  }
  deleteitem(i) {
    this.authService.postDate({ cart_id: this.CartItem[i].cart_id }, 'removecart').then((result) => {
      let responseData;
      responseData = result;
      console.log(responseData);
      if (!responseData.error) {
        this.CartItem.splice(i, 1);
        this.presentToast('Item deleted successfully');
        this.sumall();
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
    this.user = JSON.parse( localStorage.getItem('userData'));
    this.authService.postDate(this.user, 'getmembership').then( (res: any) => {
    let mm = [];
        mm = res.member;
   if (mm.length > 0) {
     this.subdisabled = false;
     this.discount = mm[0].discount;
     console.log(this.discount);
   } else {
     this.subdisabled = true;
     this.discount = null;
   }
    });
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
      console.log(this.orderNote);
      this.authService.postDate({ order: this.CartItem, ordernote: this.orderNote }, 'sendEmailto404').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData);
        if (!responseData.error) {
          this.presentToast('Order Confirmed');
          this.orderTotal = 0;
          this.CartItem = [];
          this.orderNote = '';
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    } else {
      this.presentToast('please add at least one item to cart');
    }
  }
  async addNote() {
    const alert = await this.alertController.create({
      header: 'Order Note',
      message: 'Add your special note below, please!',
      inputs: [
        {
          name: 'note',
          type: 'text',
          placeholder: 'Order Note',
          value: this.orderNote
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            if (alertData.note.length > 1) {
              this.authService.postDate({ user_id: this.userid, ordernote: alertData.note }, 'addOrderNote').then((result) => {
                let responseData;
                responseData = result;
                console.log(responseData);
                if (!responseData.error) {
                  this.presentToast('Note Added!');
                  this.orderNote = alertData.note;
                  this.CartItem[0].note = alertData.note;
                }
              }, (err) => {
                this.presentToast('Check your internet connection!');
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  sugesst(cat_id) {
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
