import { Component, ViewChildren, QueryList } from '@angular/core';
import { Platform, ToastController, IonRouterOutlet, MenuController, ActionSheetController, PopoverController, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public appPages = [
    {
      title: 'Home',
      url: '/tabs',
      icon: 'home',
      dir: 'root'
    }
  ];
  lastPages = [
    {
      title: 'About Us',
      url: '/list',
      icon: 'contacts',
      dir: 'forward'
    }
  ]
  showCat = false;
  categories: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController, private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, public authService: AuthService, private router: Router, public toastController: ToastController, private navCtrl : NavController) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let responseData: any;
      let userDataTemp;
      try {
        userDataTemp = JSON.parse(localStorage.getItem('userData'));
      } catch{
        userDataTemp = null;
      }
      this.platform.backButton.subscribeWithPriority(1, async () => {
        try {
          const element = await this.actionSheetCtrl.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {
        }
        try {
          const element = await this.popoverCtrl.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {
        }
        try {
          const element = await this.modalCtrl.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {
          console.log(error);

        }
        try {
          const element = await this.menu.getOpen();
          if (element !== null && element !== undefined) {
            this.menu.close();
            return;
          }
        } catch (error) {
          console.log(error);
        }
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            outlet.pop();

          } else if (this.router.url === '/tabs/home') {
            if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
              navigator['app'].exitApp(); // work in ionic 4

            } else {
              this.presentToast('Press back again to exit App.');
              this.lastTimeBackPress = new Date().getTime();
            }
          }
        });
      });
      if (userDataTemp !== null) {
        let user_id = userDataTemp.user_id;
        this.authService.postDate({ user_id: user_id }, 'checkadmin').then((result) => {
          responseData = result;
          if (!responseData.error) {
            this.appPages.push({
              title: 'Administration',
              url: '/admin',
              icon: 'settings',
              dir: 'forward'
            })
          };
        }, (err) => {
        });
      }
      this.authService.postDate({}, 'getcat').then((result) => {
        responseData = result;
        if (!responseData.error) {
          this.categories = responseData.category;
        }
      }, (err) => {
        this.presentToast('Check your internet connection!');
      });
    });

  }
  openCategory(index) {
    console.log(this.categories[index].cat_id);
    this.router.navigate(['/productlist', { cat_id: this.categories[index].cat_id, cat_name: this.categories[index].cat_name }]);
  }
  async presentToast(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  initializeApp() {

  }
  logout() {
    localStorage.removeItem('userData');
    this.navCtrl.navigateForward('/tabs');
    this.presentToast("Logged out successfully!")
  }

}

