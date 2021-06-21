import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-editaboutus',
  templateUrl: './editaboutus.page.html',
  styleUrls: ['./editaboutus.page.scss'],
})
export class EditaboutusPage implements OnInit {

  about: any = { text: "", phone: "", insta: "", face: "", address: "", email: "" , admin_email:""};
  constructor(public toastController: ToastController, private navCtrl: NavController, private authService: AuthService, ) {
    this.authService.postDate({}, 'getabout').then((result) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
        this.about = responseData.about[0];
      } else {
        this.presentToast(responseData.text);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  ngOnInit() {
  }
  save() {
    this.authService.postDate(this.about, 'setabout').then((result) => {
      let responseData;
      responseData = result;
      if (!responseData.error) {
        this.presentToast("Data Updated!");
      } else {
        this.presentToast(responseData.text);
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
  goBack(){
    this.navCtrl.back();
  }
}
