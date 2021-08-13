import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'url';
import { ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { setDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { BorrowedBooksPage } from '../borrowed-books/borrowed-books.page';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  responseData: any;
  asstax = 50;
  fromdate: any;
  todate: any ;
  maxdate: Date = new Date();
  maxdates: string = new Date().toISOString();
  today: any = new Date().toISOString();
  public def = 2;
  color: any;
  borrowingdays: any;
  productDetails: any = {};
  userData = { 'name': '', 'password': '', 'email': '', 'phone': '', 'user_id': '' };
  product: any = {};
  cart = { 'product_id': '', 'product_color': '', 'product_size': '', 'user_id': '', 'product_qty': 1 };
  modal: any;
  subdisabled = true;
  user: any;
  discount: any = null;
  totalbprice: any;
  constructor(private navCtrl: NavController,
     private router: Router,
     private modalCtrl: ModalController,
      private route: ActivatedRoute,
      public toastController: ToastController,
      public authService: AuthService,
      private alertController: AlertController) {
      // this.today = new Date().toISOString();
    this.route.params.subscribe(params => {
      this.product.product_name = params['product_name'];
      this.product.product_id = params['product_id'];
      this.authService.postDate({ product_id: this.product.product_id }, 'getproducdetails').then((result) => {
        let responseData;
        responseData = result;
        if (!responseData.error) {
          this.productDetails = responseData.products[0];
          // this.productDetails.product_colors = JSON.parse(this.productDetails.product_colors)
          // this.productDetails.product_sizes = JSON.parse(this.productDetails.product_sizes)
          this.cart.product_id = this.productDetails.product_id;
          this. totalbprice =  parseFloat(this.productDetails.borrowing_price) + this.asstax;
          // this.cart.product_color = this.productDetails.product_colors[0];
          // this.cart.product_size = this.productDetails.product_sizes[0];
          const temouser = JSON.parse(localStorage.getItem('userData'));
          this.cart.user_id = temouser.user_id;
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    });
  }
  mydate($event, todate) {

    const days = 3;
    this.maxdate = new Date (this.fromdate);
    this.maxdate = this.addDays(this.maxdate, days - 1);
    this.maxdates = new Date(this.maxdate).toISOString();
    if (!(new Date(this.fromdate).getTime() <= new Date(this.todate).getTime()) ||
    !((new Date(this.todate).getTime() - new Date(this.fromdate).getTime()) <= (days ) * (1000 * 60 * 60 * 24) )
    ) {
      this.presentToast('To Date must be GREATER or EQUAL From Date or borrowings days must be  less than 3 days ');
    }
  }
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
  findProductInCart() {
    const userDataTemp = JSON.parse(localStorage.getItem('userData'));
    if (userDataTemp === null) {
      this.router.navigate(['/']);
    } else {
      this.authService.postDate({'user_id': userDataTemp.user_id}, 'findProductInCart').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.carts.length > 0) {
          console.log('cart fiha');
          this.responseData.carts.forEach(element => {
            if (element.product_id === this.product.product_id) {
              this.addqtyInCart(element.cart_id);
              const find = true;
              console.log(element);
            }
          });
        } else {
          this.addtocart();
        }

        if (!this.responseData.error) {
          this.presentToast('find to your cart!');
          // this.modalCtrl.dismiss();
          // this.router.navigate(['/']);
            const find = false ;




        } else {
          this.presentToast(this.responseData.text);
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });

    }

  }
  addtocart() {
    const userDataTemp = JSON.parse(localStorage.getItem('userData'));
    if (userDataTemp === null) {
      this.router.navigate(['/']);
    } else {
      this.authService.postDate(this.cart, 'addtocart').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (!this.responseData.error) {
          this.presentToast('added to your cart!');
          // this.modalCtrl.dismiss();
          this.router.navigate(['/']);

        } else {
          this.presentToast(this.responseData.text);
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });

    }
  }
  addQty() {
    if (this.productDetails.product_copies > this.cart.product_qty) {
      this.cart.product_qty += 1;
    }
  }
  minQty() {
    if (this.cart.product_qty <= 1) {
      this.presentToast('Minimum order quantity!');
    } else {
      this.cart.product_qty -= 1;
    }
  }
  sendborrowbookrequest(product_id) {
    this.product.product_qty = this.cart.product_qty;
    const Borroweddays = new Date(this.borrowingdays);
    this.product.borrowing_deposit_tax = (this.asstax ) *  this.cart.product_qty;

   // this.product.borrowingdays = Borroweddays.getDay() - 1;
    const now = new Date().getTime();
    const diff = now + (Borroweddays.getDay() - 1) * (60 * 60 * 1000 * 24);
  // this.product.borrowingdays = new Date(diff);
  this.product.fromdate = this.fromdate;
  this.product.todate = this.todate;
  if (new Date(this.fromdate).getTime() <= new Date(this.todate).getTime() &&
   ((new Date(this.todate).getTime() - new Date(this.fromdate).getTime()) <= 3 * (1000 * 60 * 60 * 24) )) {
    console.log('ok ');
    this.product.user_id = this.cart.user_id;
    console.log( this.product);
   this.authService.postDate(this.product, 'borrowingbooks').then((result: any) => {
      const responseData = result;
      this.presentToast(responseData.message);


    }, (err) => {
      this.presentToast('Check your internet connection!');
    }

    );
  } else {
    this.presentToast('To Date must be GREATER or EQUAL From Date');
  }

  }
       addqtyInCart(id) {
      const userDataTemp = JSON.parse(localStorage.getItem('userData'));
    if (userDataTemp === null) {
      this.router.navigate(['/']);
    } else {
      this.authService.postDate({'cart_id': id}, 'addqtytocart').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (!this.responseData.error) {
        } else {
          this.presentToast(this.responseData.text);
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });

    }
  }
  // changeSize(i) {
  //   this.cart.product_size = this.productDetails.product_sizes[i];
  // }
  // changeColor(i) {
  //   this.cart.product_color = this.productDetails.product_colors[i];
  // }
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
  subscribenow() {
    this.router.navigate(['/membership']);
  }
  goBack() {
    this.navCtrl.back();
  }
  // customColor(e) {
  //   if (e) {
  //     this.productDetails.product_colors.unshift(e);
  //     this.cart.product_color = e;
  //   }
  // }
  // async customSize() {
  //   const alert = await this.alertController.create({
  //     header: 'Custom Size',
  //     message: 'Enter your custom product dimension in centimeters!',
  //     inputs: [
  //       {
  //         name: 'width',
  //         type: 'text',
  //         placeholder: 'Width (cm)',
  //       }, {
  //         name: 'height',
  //         type: 'text',
  //         placeholder: 'Height (cm)'
  //       },
  //       {
  //         name: 'length',
  //         type: 'text',
  //         placeholder: 'Length (cm)'
  //       }],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Ok',
  //         handler: (alertData) => {
  //           if (alertData.width < 1) alertData.width = 0;
  //           if (alertData.height < 1) alertData.height = 0;
  //           if (alertData.length < 1) alertData.length = 0;
  //           let dim = alertData.width + "x" + alertData.height + "x" + alertData.length;
  //           this.productDetails.product_sizes.unshift(dim);
  //           this.cart.product_size = dim;
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }


}
