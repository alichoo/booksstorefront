import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { parse } from 'url';
import { ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.page.html',
  styleUrls: ['./borrowed-books.page.scss'],
})
export class BorrowedBooksPage implements OnInit {

  borrowed_books = [];
  cart: any = {};
  constructor(private navCtrl: NavController, private router: Router, private modalCtrl: ModalController,
    private route: ActivatedRoute,
     public toastController: ToastController,
     public authService: AuthService,
      private alertController: AlertController) {

    const tempuser = JSON.parse(localStorage.getItem('userData'));
    this.cart.user_id = tempuser.user_id;




  }
  goBack() {
    this.navCtrl.back();
  }


  ngOnInit() {
    this.authService.postDate({ user_id: this.cart.user_id }, 'getborrowedbooksofsingleuser').then(( result: any) => {
      this.borrowed_books = result.data;
      console.log(this.borrowed_books[0]);
    }, (error) => {

    });
  }

}
