import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'url';
import { ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrowingrequest',
  templateUrl: './borrowingrequest.page.html',
  styleUrls: ['./borrowingrequest.page.scss'],
})
export class BorrowingrequestPage implements OnInit {
  borrowed_books = [];
  constructor(private navCtrl: NavController,
              private router: Router,
              private modalCtrl: ModalController,
              private route: ActivatedRoute,
              public toastController: ToastController,
              public authService: AuthService,
              private alertController: AlertController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.authService.postDate({ user_id: null }, 'getallborrowedbooks').then(( result: any) => {
      this.borrowed_books = result.data;

    }, (error) => {

    });

  }

  async reject(book_borrowing_id) {
    const alert = await this.alertCtrl.create({
      header : 'confirming delete',
      message : 'are you sure to reject the request?',
      mode : 'ios',
      buttons : [
        {
          text : 'No',
          role : 'cancle'
        },
        {
          text : 'Yes',
          handler : () => {
            this.authService.postDate({ book_borrowing_id: book_borrowing_id, borrowing_status: 'rejected' },
            'changestatusofborrowedbooks').then(( result) => {



            }, (error) => {

            });
          }
        }
      ]
    });

    await alert.present();
  }

  async accept(book_borrowing_id) {
    const alert = await this.alertCtrl.create({
      header : 'confirming Accept',
      message : 'are you sure to Accept the request?',
      mode : 'ios',
      buttons : [
        {
          text : 'No',
          role : 'cancle'
        },
        {
          text : 'Yes',
          handler : () => {
            this.authService.postDate({ book_borrowing_id: book_borrowing_id, borrowing_status: 'accepted' },
            'changestatusofborrowedbooks').then(( result) => {



            }, (error) => {

            });
          }
        }
      ]
    });

    await alert.present();
  }

  async getbook(book_borrowing_id, product_qty) {
    const alert = await this.alertCtrl.create({
      header : 'confirming Accept',
      message : 'are you sure to Return the Book?',
      mode : 'ios',
      buttons : [
        {
          text : 'No',
          role : 'cancle'
        },
        {
          text : 'Yes',
          handler : () => {
    this.authService.postDate({ book_borrowing_id: book_borrowing_id, product_qty: product_qty }, 'returnproduct').then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    }
      ).catch((err) => {
      console.error(err);
    });
  }
}
]
});
await alert.present();
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
  async getdeposit(book_borrowing_id, borrowing_deposit_tax) {
    const alert = await this.alertCtrl.create({
      header : 'confirming Accept',
      message : 'are you sure to Return the deposit tax? <br>' + borrowing_deposit_tax + ' RM',
      mode : 'ios',
      buttons : [
        {
          text : 'No',
          role : 'cancle'
        },
        {
          text : 'Yes',
          handler : () => {
    this.authService.postDate({ book_borrowing_id: book_borrowing_id, borrowing_deposit_tax:
       borrowing_deposit_tax }, 'returndeposit').then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    }
      ).catch((err) => {
      console.error(err);
    });
  }
}
]
});
await alert.present();
  }
}
