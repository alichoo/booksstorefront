import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
 
  responseData: any;
  product: any;
 


  constructor( public authService: AuthService ,
    public toastController: ToastController,
    public http:HttpClient,
    public navCtrl : NavController,
    private router: Router) { }

    //methods
    async presentToast(messageToToast) {
      const toast = await this.toastController.create({
        message: messageToToast,
        duration: 1500,
        position: 'top'
      });
      toast.present(); 
    }

    openProduct(index){
      console.log(this.product[index].product_id);
      // tslint:disable-next-line: max-line-length
      this.router.navigate(['/editproduct', { product_id: this.product[index].product_id ,
         product_name : this.product[index].product_name,
         product_price : this.product[index].product_price,
         borrowing_price : this.product[index].borrowing_price,
        //  product_material : this.product[index].product_material,
        //  product_color : this.product[index].product_colors,
         product_description : this.product[index].product_description,
        //  product_size : this.product[index].product_sizes,
         cat_id : this.product[index].cat_id,
         product_image : this.product[index].product_image
        }]);
    }

    deleteproduct(i){
      this.authService.postDate({product_id: this.product[i].product_id}, 'removeproduct').then((result) => {
        let responseData;
        responseData = result;
        console.log(responseData)
        if (! responseData.error) {
          this.product.splice(i,1);
          this.presentToast('Item deleted successfully');
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    }
    navtoadd(){
      this.navCtrl.navigateForward('/addproduct');
    }

  ngOnInit() {
    this.authService.postDate({}, 'getproducts').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.product = this.responseData.products;
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });
  }
  goBack(){
    this.navCtrl.back();
  }
}
