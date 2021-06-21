import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  about:any = {text:"",phone:"",insta:"",face:"",address:"",email:""};
  constructor(public toastController: ToastController,private navCtrl: NavController,private authService: AuthService,){
    this.authService.postDate({}, 'getabout').then((result) => {
      let responseData;
      responseData = result;
      if(!responseData.error){
        this.about = responseData.about[0];
      } else{
        this.presentToast(responseData.text);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  ngOnInit() {
  }
  goBack(){
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
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
