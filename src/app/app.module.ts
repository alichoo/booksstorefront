import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import {AuthService} from '../app/auth-service.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { environment} from '../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Base64 } from '@ionic-native/base64/ngx';
import { ColorPickerModule } from 'ngx-color-picker';

import { LoginPageModule } from './login/login.module';
import { SignupPageModule } from './signup/signup.module';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    AngularCropperjsModule,
    ImageCropperModule,
    ColorPickerModule,
    LoginPageModule,
    SignupPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Camera,
    Crop,
    Stripe,
    FileTransfer,
    File,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ImagePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
