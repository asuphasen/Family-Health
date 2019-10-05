import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {

  name: string;
  constructor(
    private nav: NavController,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  gotoOTP() {
  }
  async gotoHome() {
    if (this.name) {
      var data:any = await this.auth.getAccount();
      if (data) {
        await this.auth.initProfile(data.accountId, data.phoneNumber, this.name);
        await this.auth.setupPush(data.accountId);
        this.nav.navigateRoot('home')
      } else {
        alert("เกิดข้อผิดพลาด")
      }
    } else {
      alert("กรุณากรอกชื่อ")
    }
  }

}
