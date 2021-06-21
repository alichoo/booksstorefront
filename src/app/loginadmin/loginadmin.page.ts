import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import {FormsModule } from '@angular/forms';
@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.page.html',
  styleUrls: ['./loginadmin.page.scss'],
})
export class LoginadminPage implements OnInit {
  adminData = {'name': '', 'password': '', 'email': '','admin_id': ''};
  responseData: any;
  constructor(public modalCtrl:ModalController ,
    public toastController: ToastController,
    public navCtrl: NavController,
     public authService: AuthService) { }

     //methods
     onclicklog(){
       this.authService.postDate(this.adminData, 'loginadmin').then((result) => {
         this.responseData = result;
         console.log(this.responseData);
        if(!this.responseData.error){
         this.presentToast('Login Successfully!');
      //    localStorage.setItem('adminData', JSON.stringify(this.responseData.adminData));
         this.navCtrl.navigateForward('/admin');
        } else{
           this.presentToast(this.responseData.text);
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

  ngOnInit() {
  }

}
