import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';
import { FormsModule, FormBuilder } from '@angular/forms';
import { FormGroup, Validators,FormControl,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  responseData: any;
  userData = {name: '', password: '', email: '', phone: '', user_id: '', address: '', city:'', country:'malaysia', zip:'', code:'+01'};
 
  constructor(public modalCtrl: ModalController,
    public toastController: ToastController,
    public navCtrl: NavController,
    public authService: AuthService
    ) 
    { 
     
    }
  ngOnInit() {
  }
  


  // registrationForm = this.formBuilder.group({
  //   name: ['', [Validators.required, Validators.maxLength(20)]],
  //   email: [''],
  //   phone: ['',[Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]]
  // });

  
  // get name() {
  //   return this.registrationForm.get("name");
  // }
  // get phone() {
  //   return this.registrationForm.get('phone');
  // }
  
  // public errorMessages = {
  //   name: [
  //     { type: 'required', message: 'Name is required' },
  //     { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
  //   ],
  //   phone: [
  //     { type: 'required', message: 'Phone number is required' },
  //     { type: 'pattern', message: 'Please enter a valid phone number' }
  //   ],

  // };  


  signup() {
    if(this.checkDataValid()){
    // api connection
    this.authService.postDate(this.userData, 'signup').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (!this.responseData.error) {
        this.presentToast('Thanks for registration!');
        this.modalCtrl.dismiss();
        this.navCtrl.navigateForward('/tabs');
      } else {
        this.presentToast(this.responseData.text);
      }
    }, (err) => {
      this.presentToast('Check your internet connection!');
    });}
  }
  dismiss(){
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward('/tabs');
  }
  //validation
  
  checkDataValid(){
    if(this.userData.name == '' || this.userData.name == null || this.userData.name.split(" ").length-1 < 1){
      this.presentToastError("Please enter valid name.");
      return false;
    }
    if(this.userData.email == '' || this.userData.email == null || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.email)){
      this.presentToastError("Please enter valid email.");
      return false;
    }
    if(this.userData.password == '' || this.userData.password == null || this.userData.password.length < 5){
      this.presentToastError("Please enter valid password.");
      return false;
    }
    if(this.userData.code == '' || this.userData.code == null){
      this.presentToastError("Please enter valid country code.");
      return false;
    }
    if(this.userData.phone == '' || this.userData.phone == null || !/^\d{10,14}$/.test(this.userData.phone)){
      this.presentToastError("Please enter valid phone number.");
      return false;
    }
    if(this.userData.address == '' || this.userData.address == null){
      this.presentToastError("Please enter valid address.");
      return false;
    }
    if(this.userData.zip == '' || this.userData.zip == null){
      this.presentToastError("Please enter valid zip number.");
      return false;
    }
    if(this.userData.city == '' || this.userData.city == null ){
      this.presentToastError("Please enter valid city name.");
      return false;
    }
    if(this.userData.country == '' || this.userData.country == null){
      this.presentToastError("Please enter valid country.");
      return false;
    }

    //this.userData.phone = this.userData.code + this.userData.phone;
    return true;
  }
  async presentToastError(messageToToast) {
    const toast = await this.toastController.create({
      message: messageToToast,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
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
