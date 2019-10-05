import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  qrCodeData: string = null;
  constructor(
    private navCtrl: NavController
  ) {
    this.qrCodeData = localStorage.getItem('uid');
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.navigateBack(['add-member'])
  }

}
