import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-editnewarrival',
  templateUrl: './editnewarrival.page.html',
  styleUrls: ['./editnewarrival.page.scss'],
})
export class EditnewarrivalPage implements OnInit {
  products = []
  constructor(
    public toastController: ToastController,
    public authService: AuthService, public navCtrl: NavController
  ) {
    this.authService.postDate({}, 'getspecialnewarrival').then((result) => {
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
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }
  addSpecial(producID, i) {
    this.authService.postDate({product_id: producID}, 'addspecial').then((result: any) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
        this.products[i].specialproduct = '1';
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  removeSpecial(producID, i) {
    this.authService.postDate({product_id: producID}, 'delspecial').then((result: any) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
        this.products[i].specialproduct = '0';
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  addArrival(producID, i) {
    this.authService.postDate({product_id: producID}, 'addnewarrival').then((result: any) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
        this.products[i].newarrvialproduct = '1';
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  removeArrival(producID, i) {
    this.authService.postDate({product_id: producID}, 'delnewarrival').then((result: any) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
        this.products[i].newarrvialproduct = '0';
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
}
