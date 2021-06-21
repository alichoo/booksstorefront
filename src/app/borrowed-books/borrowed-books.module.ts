import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BorrowedBooksPage } from './borrowed-books.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowedBooksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BorrowedBooksPage]
})
export class BorrowedBooksPageModule {}
