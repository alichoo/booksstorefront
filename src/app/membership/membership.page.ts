import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController, Platform } from '@ionic/angular';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  userData: any;
  subdisabled = true;

  constructor(
    public modalCtrl: ModalController ,
    public toastController: ToastController,
    public navCtrl: NavController,
     public authService: AuthService,
      private platform: Platform

  ) { }

  ngOnInit() {
this.userData = JSON.parse( localStorage.getItem('userData'));
this.userData.ismember = false;
this.userData.accepted = false;
  console.log( (this.userData));
  this.authService.postDate(this.userData, 'getmembership').then( (res: any) => {
    let mm = [];
    mm = res.member;
   // console.log(mm.length);
 if (mm.length > 0) {
this.userData.ismember = true;
this.subdisabled = true;
 } else {
  this.subdisabled = false;
 }
  });
  }
  onclicklog() {
    if (!this.userData.accepted ) {
    this.presentToast('Please Accept Conditions ');
  } else {
    if (!this.userData.ismember ) {
  this.authService.postDate(this.userData, 'addmembership').then( (res) => { this.presentToast('Subscribed Successfully !!! ');
  this.navCtrl.back(); });
    } else {
      this.presentToast('You are already a member');
    }
  }
    console.log( (this.userData));
  }
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

}
