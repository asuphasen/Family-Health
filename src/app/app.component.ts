import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
// import { FcmService } from './services/fcm.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private db: AngularFireDatabase,
    private oneSignal: OneSignal,
    public nav: NavController,
    // private fcm:FcmService
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.setupPush();
    });
  }
  async setupPush() {
    try {
      var data: any = await this.auth.getAccount();
      console.log("data", data)
      if (data) {
        var res = await this.auth.hasProfile(data.accountId);
        console.log("res", res)
        if (res) {
          await this.auth.setupPush(data.accountId);
          this.splashScreen.hide();
          this.nav.navigateRoot('home')
        } else {
          this.splashScreen.hide();
          this.nav.navigateRoot('name')
        }
      } else {
        this.splashScreen.hide();
        this.nav.navigateRoot('splashscreen')
      }
    } catch (error) {
      this.splashScreen.hide();
      this.nav.navigateRoot('splashscreen')
    }

  }
}
