import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BorowingsendrequestPage } from './borowingsendrequest.page';
import { ColorPickerModule } from 'ngx-color-picker';

const routes: Routes = [
  {
    path: '',
    component: BorowingsendrequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorPickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BorowingsendrequestPage],
})
export class BorowingsendrequestPageModule {}
