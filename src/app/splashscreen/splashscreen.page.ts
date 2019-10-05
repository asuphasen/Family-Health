import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor(
    private router: Router,
    public nav: NavController,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  async gotoPhoneNumber() {
    var data:any = await this.auth.login();
    var res = await this.auth.hasProfile(data.accountId);
    console.log("res201",res)
    if (res) {
      await this.auth.setupPush(data.accountId);
      this.nav.navigateRoot('home')
    } else {
      this.nav.navigateRoot('name')
    }
  }

}
