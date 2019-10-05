import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController, AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  lists = [
    // { number: '1669', hos_name: 'สถาบันการแพทย์ฉุกเฉินแห่งชาติ' },
    // { number: '1300', hos_name: 'แจ้งคนหาย' },
    // { number: '1554', hos_name: 'หน่วยแพทย์กู้ชีวิต วชิรพยาบาล' },
    // { number: '1555', hos_name: 'ศูนย์ร้องทุกข์กรุงเทพมหานคร' },
    // { number: '1196', hos_name: 'อุบัติเหตุทางน้ำ' },
    // { number: '1784', hos_name: 'กรมป้องกันและบรรเทาสาธารณภัย' },
    // { number: '1193', hos_name: 'ตำรวจทางหลวง' }
  ]

  constructor(
    private router: Router,
    private callNumber: CallNumber,
    private alertCtrl: AlertController,
    private afd: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.getEmergencyNumber();
  }

  gotoHome() {
    this.router.navigate(['home']);
  }

  async comfirmCall(no) {
    const alert = await this.alertCtrl.create({
      header: 'ยืนยันการโทร',
      message: 'ต้องการโทร ' + no + ' ใช่หรือไม่ ?',
      mode: 'ios',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            this.callNow(no);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  getEmergencyNumber() {
    this.afd.list('emergency_number').valueChanges().subscribe(snapshotChanges => {
      console.log(snapshotChanges)
      this.lists = snapshotChanges
    })


  }

}
