import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ViewChild } from '@angular/core';
// import { Searchbar } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ProductData = { 'product_id': '', 'cat_id': '', 'product_name': '' };
  temouser = { user_id: null };
  public searchbaropened = false;
  public slide: any;
  public slides: any;
  public product: any[];
  public search: any;
  public special: any;
  public categories: any;
  responseData: any;
  segValue: any = 'New Arrivals';
  public isItemAvailable = false;
  public items: any;
  public products: any[];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true
  };
  constructor(private router: Router,
     public navCtrl: NavController,
     public toastController: ToastController, public authService: AuthService, public http: HttpClient, public platform: Platform) {
    try {
      this.temouser = JSON.parse(localStorage.getItem('userData'));
      if (!this.temouser) {
        this.temouser = { user_id: null };
      }
    } catch {
      this.temouser = { user_id: null };
    }
    this.authService.postDate({}, 'getslides').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.slide = this.responseData.slides;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
    this.authService.postDate({}, 'getcat').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.categories = this.responseData.category;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
    /*this.authService.postDate({}, 'getproducts').then((result) => {
      let responseData;
      responseData = result;
      console.log(responseData)
      if (! responseData.error) {
        this.products= responseData.products;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });*/

  }
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  onSearchChange($event: any) {
    this.authService.postDate({ product_name: this.ProductData.product_name }, 'searchproduct').then((result: any) => {
      // this.responseData = result;
      console.log(result);
      if (result) {
        this.isItemAvailable = true;
        console.log(result);
        this.search = result.products;
        console.log('$event', this.search);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }

  navtofb() {
    this.authService.postDate({}, 'getabout').then((result) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
         window.location.href = responseData.about[0].face;
      } else {
        this.presentToast(responseData.text);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });

  }
  navtoinsta() {
    this.authService.postDate({}, 'getabout').then((result) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
         window.location.href = responseData.about[0].insta;
      } else {
        this.presentToast(responseData.text);
      }
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

  ngOnInit() {

  }
  openCategory(index) {
    console.log(this.categories[index].cat_id);
    this.router.navigate(['/productlist', { cat_id: this.categories[index].cat_id, cat_name: this.categories[index].cat_name }]);
  }

  openproduct2(index) {
    console.log(this.product[index].product_id);
    this.router.navigate(['/product-details',
     { product_id: this.product[index].product_id, product_name: this.product[index].product_name }]);
  }

  // openproduct3(index) {
  //   console.log(this.special[index].product_id);
  //   this.router.navigate(['/product-details',
  // { product_id: this.special[index].product_id, product_name: this.special[index].product_name }]);
  // }

  ionViewWillEnter() {
    try {
      this.temouser = JSON.parse(localStorage.getItem('userData'));
      if (!this.temouser) {
        this.temouser = { user_id: null };
      }
    } catch {
      this.temouser = { user_id: null };
    }
    this.authService.postDate({ user_id: this.temouser.user_id }, 'newarrivals').then((result) => {
      let responseData;
      responseData = result;
      console.log(responseData);
      if (!responseData.error) {
        this.product = responseData.carts;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
    // this.authService.postDate({ user_id: this.temouser.user_id }, 'specialpieces').then((result) => {
    //   let responseData;
    //   responseData = result;
    //   console.log(responseData);
    //   if (!responseData.error) {
    //     this.special = responseData.carts;
    //   }
    // }, (err) => {
    //   this.presentToast('Check your internet connection!');
    // });

  }

  addToWish(producID, i, special) {
    if (this.temouser.user_id == null) {
      this.presentToast('Log in is required!');
      return;
    }
    if (special) {
      if (this.special[i].wishflag === '0') {
        this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id}, 'addWish').then((result: any) => {
          let responseData;
          responseData = result;
          if (!responseData.error) {
              this.special[i].wishflag = '1';
          }
        }, (err) => {
          this.presentToast('Check your 1 internet connection!');
        });
      } else {
        this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id}, 'delWish').then((result: any) => {
          let responseData;
          responseData = result;
          if (!responseData.error) {
              this.special[i].wishflag = '0';
          }
        }, (err) => {
          this.presentToast('Check your 2 internet connection!');
        });
      }
    } else {
      if (this.product[i].wishflag === '0') {
        this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id}, 'addWish').then((result: any) => {
          let responseData;
          responseData = result;
          if (!responseData.error) {
            this.product[i].wishflag = '1';
          }
        }, (err) => {
          this.presentToast('Check your 3 internet connection!');
        });
      } else {
        this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id}, 'delWish').then((result: any) => {
          let responseData;
          responseData = result;
          if (!responseData.error) {
            this.product[i].wishflag = '0';
          }
        }, (err) => {
          this.presentToast('Check your 4 internet connection!');
        });
      }
    }

  }
}
