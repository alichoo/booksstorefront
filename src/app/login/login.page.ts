import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, Platform } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import {FormsModule } from '@angular/forms';
import { SignupPage } from '../signup/signup.page';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  backButtonSubscription: any;
  responseData: any;
  userData = {'name': '', 'password': '', 'email': '', 'phone': '', 'user_id': ''};
  constructor(
    public modalCtrl: ModalController ,
    public toastController: ToastController,
    public navCtrl: NavController,
     public authService: AuthService,
      private platform: Platform
      ) { }
  onclicklog() {
    this.authService.postDate(this.userData, 'login').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (!this.responseData.error) {
        this.presentToast('Login Successfully!');
        localStorage.setItem('userData', JSON.stringify(this.responseData.userData));
        this.modalCtrl.dismiss();
        this.navCtrl.navigateForward('/tabs');
      } else {
        this.presentToast(this.responseData.text);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  async onclicksign() {
    this.modalCtrl.create({
      component: SignupPage
    }).then((modal2) => {
      modal2.present();
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward('/tabs');
  }

  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      this.navCtrl.navigateForward('/tabs');
    });
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  ngOnInit() {
  }

}
