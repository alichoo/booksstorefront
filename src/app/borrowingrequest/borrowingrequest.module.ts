import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BorrowingrequestPage } from './borrowingrequest.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowingrequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BorrowingrequestPage]
})
export class BorrowingrequestPageModule {}
