import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductDetailsPage } from './product-details.page';
import { ColorPickerModule } from 'ngx-color-picker';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPage
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
  declarations: [ProductDetailsPage],
})
export class ProductDetailsPageModule {}
