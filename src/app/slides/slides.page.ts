import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  responseData:any;
  slide:any;
  constructor(
    public authService: AuthService ,
    public toastController: ToastController,
    public http:HttpClient,
    public navCtrl : NavController) { }




    //methods
    async presentToast(messageToToast) {
      const toast = await this.toastController.create({
        message: messageToToast,
        duration: 1500,
        position: 'top'
      });
      toast.present(); 
    }


    deleteitem(i){
      this.authService.postDate({id: this.slide[i].id}, 'removeslide').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData)
        if (! responseData.error) {
          this.slide.splice(i,1);
          this.presentToast('Item deleted successfully');
          
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    }
    navtoadd(){
      this.navCtrl.navigateForward('/addslide');
    }
  ngOnInit() {
    this.authService.postDate({}, 'getslides').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.slide = this.responseData.slides;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });

  }
}

