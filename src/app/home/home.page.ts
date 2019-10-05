import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
// import { InformationService } from '../serivces/information.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { InformationService } from '../serivces/information.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any = {
    image_url: null
  }
  noti_status: boolean = false;
  sos: any = []
  logs: any
  group: any = []
  constructor(
    private router: Router,
    private navCon: NavController,
    private auth: AuthService,
    private oneSignal: OneSignal,
    private informationService: InformationService,
    private alertCtrl: AlertController
  ) {
  }

  otherProfile = [];

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.informationService.getUserData(user => {
      this.user = user;
      console.log(user);
    })
    this.informationService.getSOS(data => {
      console.log(data)
      for (var i in data) {
        if (data[i].uid == localStorage.getItem('uid')) {
          this.noti_status = true;
        }
      }
      this.sos = data;
    })
    this.informationService.getLOGs(data => {
      console.log(data)
      this.logs = data;
    })

    this.informationService.getGroup(data => {
      console.log(data)
      this.otherProfile = data;
    })
  }

  addOtherProfile() {
    this.otherProfile.push(1);
  }

  gotoNoti() {
    this.router.navigate(['notification']);
  }

  gotoEmer_call() {
    this.router.navigate(['notification']);
  }

  gotoMap() {
    this.router.navigate(['map-cost']);
  }

  gotoInformation(uid) {
    this.router.navigate(['information'], { queryParams: { uid: uid } });
  }

  gotoAddMember() {
    this.router.navigate(['add-member']);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'ออกจากระบบ',
      message: 'คุณต้องการออกจากระบบใช่หรือไม่?',
      mode: 'ios',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'ออกจากระบบ',
          handler: () => {
            this.auth.logout();
            this.navCon.navigateRoot('splashscreen');
          }
        }
      ]
    });
    await alert.present();
  }

  async test() {
    if (this.noti_status == true) {
      const alert = await this.alertCtrl.create({
        header: 'ยืนยันเปิดการแจ้งเตือน',
        message: 'ต้องการเปิดการแจ้งเตือนใช่หรือไม่ หลังจากเปิดการแจ้งเตือนจะถูกส่งไปยังทุกคน',
        mode: 'ios',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.noti_status = false
              this.informationService.sendSOS(this.noti_status)
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'ตกลง',
            handler: () => {
              this.noti_status = true;
              console.log('Confirm Okay');
              console.log("this is toggle status " + this.noti_status)
              this.informationService.sendSOS(this.noti_status)
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.informationService.sendSOS(this.noti_status)
    }

  }

  doRefresh(event) {
    setTimeout(() => {
      this.informationService.getUserData(user => {
        this.user = user;
        console.log(user);
      })
      this.informationService.getSOS(data => {
        console.log(data)
        for (var i in data) {
          if (data[i].uid == localStorage.getItem('uid')) {
            this.noti_status = true;
          }
        }
        this.sos = data;
      })
      this.informationService.getLOGs(data => {
        console.log(data)
        this.logs = data;
      })

      this.informationService.getGroup(data => {
        console.log(data)
        this.otherProfile = data;
      })
      event.target.complete();
    }, 2000);
  }

}
