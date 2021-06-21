import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage  {
  responseData: any;
  categories: any;

  constructor(
    private router: Router,
    public navCtrl : NavController,
    public toastController: ToastController,
    public authService: AuthService ,
    public http:HttpClient)  { }

    //methods
    async presentToast(messageToToast) {
      const toast = await this.toastController.create({
        message: messageToToast,
        duration: 1500,
        position: 'top'
      });
      toast.present(); 
    }

    openCat(index){
      console.log(this.categories[index].cat_id);
      // tslint:disable-next-line: max-line-length
      this.router.navigate(['/editcat', { cat_id: this.categories[index].cat_id ,
         cat_name : this.categories[index].cat_name,
         cat_image : this.categories[index].cat_image
        }]);
    }

    deletecat(i){
      this.authService.postDate({cat_id: this.categories[i].cat_id}, 'removecat').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData)
        if (! responseData.error) {
          this.categories.splice(i,1);
          this.presentToast('category deleted successfully');
        }
        else{
          this.presentToast('this category has prodcuts');
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    }
    navtoadd(){
      this.navCtrl.navigateForward('/addcat');
    }


  ngOnInit() {
    this.authService.postDate({}, 'getcat').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.categories = this.responseData.category;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  goBack(){
    this.navCtrl.back();
  }
}
