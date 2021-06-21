import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'url';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  category = { "cat_name": "", "cat_id": "" };
  temouser = { user_id: null };
  public products: any;
  responseData: any;
  constructor(private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController,
    public authService: AuthService) {
    this.route.params.subscribe(params => {
      this.category.cat_name = params['cat_name'];
      this.category.cat_id = params['cat_id'];
      try {
        this.temouser = JSON.parse(localStorage.getItem('userData'));
        if (!this.temouser) {
          this.temouser = { user_id: null }
        }
      } catch{
        this.temouser = { user_id: null }
      }
      this.authService.postDate({ cat_id: this.category.cat_id, user_id: this.temouser.user_id }, 'getproductofcat').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData)
        if (!responseData.error) {
          this.products = responseData.products;
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    });

  }
  goBack() {
    this.navCtrl.back();
  }
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  openProduct(index) {
    console.log(this.products[index].product_id);
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/product-details', { product_id: this.products[index].product_id, product_name: this.products[index].product_name }]);
  }
  ngOnInit() {
  }
  addToWish(producID, i, special) {
    if (this.temouser.user_id == null) {
      this.presentToast('Log in is required!');
      return
    }
    if (this.products[i].wishflag == "0") {
      this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'addWish').then((result: any) => {
        let responseData;
        responseData = result;
        if (!responseData.error) {
          this.products[i].wishflag = '1';
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    } else {
      this.authService.postDate({ product_id: producID, user_id: this.temouser.user_id }, 'delWish').then((result: any) => {
        let responseData;
        responseData = result;
        if (!responseData.error) {
          this.products[i].wishflag = '0';
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    }

  }
}
