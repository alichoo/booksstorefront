import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  delivtime: any = new Date().toISOString();
  cvv: any;
  ncard: any;
  expdate: any;
  pmethod: any;
  userid: any;
  CartItem: any = [];
  orderNote: any;
  orderTotal: number;
  temouser: any;
  products: any = [];
  user: any;
  subdisabled: boolean;
  discount: any = 0 ;
  payed = false;

  constructor(public authService: AuthService,
              private navCtrl: NavController,
               private router: Router,
     public alertController: AlertController,
      public toastController: ToastController,
      private stripe: Stripe) {
        this.stripe.setPublishableKey('pk_test_51JNonFLt0g7AUZkx2BCQrO8pFJsbjUJc0N4JJ9azcj4AOzC7E' +
        'JuMsM2651zU4EBGcHlF8p6uc7hQ3qdcJkDKfEiU009fEd2seD');
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
  mSelected() {
if (this.pmethod && this.pmethod === 'CoD') {
this.payed = true;
}
if (this.pmethod && this.pmethod === 'stripe') {
  this.payed = false;
  }
  }
  deleteitem(i) {

  }
  ionViewWillEnter() {
    this.reloadCat();
    this.temouser = JSON.parse(localStorage.getItem('userData'));

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
  goBack() {
    this.navCtrl.back();
  }

  sumall() {
    this.orderTotal = 0;
    for (let i = 0; i < this.CartItem.length; i++) {
      this.orderTotal += parseInt(this.CartItem[i].price_all_qty)-
                         (parseInt(this.CartItem[i].product_qty) * this.discount);
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
  confirmcart() {
    if (this.payed && this.delivtime) {
      let payid = '';
      if (this.pmethod === 'stripe') {
  payid = 'Payment ID: ' + localStorage.getItem('Payedid');
      }
      this.user.note = payid;
    this.authService.postDate(this.user, 'confirmcart').then((result) => {
      this.presentToast('Purchase done Successfully!!');
      this.router.navigate(['/']);
    });
  } else {
    this.presentToast('Please check informations !!');
  }
    this.sugesst(this.CartItem[0].cat_id);
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

sugesst(cat_id) {
  this.temouser = JSON.parse(localStorage.getItem('userData'));
  this.authService.postDate({ cat_id: cat_id, user_id: this.temouser.user_id }, 'getproductofcat').then((result) => {
      let responseData;
      responseData = result;
      this.products = responseData.products;
   //   console.log(this.products);

  }, (err) => {
    this.presentToast('Check your internet connection!');
  });
}

openProduct(producID, producName) {
  // console.log(index,this.product,this.products[index],);
  // let pro = this.products.filter((e) => { return e.product_id === index })
  // console.log(pro)
  // tslint:disable-next-line: max-line-length
  this.router.navigate(['/product-details', { product_id: producID, product_name: producName }]);
}
addToWish(item , i, text) {

}
paystripe() {
  if (this.ncard && this.cvv && this.expdate) {
    const expd = new Date(this.expdate);
    const card = {
      number: this.ncard,
      expMonth: expd.getMonth() + 1,
      expYear: expd.getFullYear(),
      cvc: '220'
     };
     this.stripe.createCardToken(card)
        .then(token => {console.log(token.id);
          this.presentToast('ِCard Verified Token N°:' + token.id);
          this.authService.postDate({  user_id: this.temouser.user_id ,
            email: this.temouser.email,
            amount: this.orderTotal,
             token:  token.id,
            descr: 'Pay Cart ' + new Date() }, '/stripepay')
          .then((resp: any) => {
            if (resp.error) {
            this.presentToast('ِPayment Fail: ' + resp.message);
            this.pmethod = 'CoD';
          this.payed = false;
          } else {
            this.presentToast('ِPayment Succeded id: ' + resp.message.id);
            localStorage.setItem('Payedid', resp.message.id);
            this.payed = true;
          }
            console.log(resp);
          });
        })
        .catch(error => {console.error(error);
          this.presentToast('' + error.type + ':' + error.message );
          this.pmethod = 'CoD';
          this.payed = false ;
        });
  } else {
    this.presentToast('Please check informations !!');
    this.payed = false ;
  }

}
}
