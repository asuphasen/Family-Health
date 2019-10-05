import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FiendPopupPage } from './fiend-popup.page';

const routes: Routes = [
  {
    path: '',
    component: FiendPopupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FiendPopupPage]
})
export class FiendPopupPageModule {}
