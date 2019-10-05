import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { InformationService } from '../serivces/information.service';

@Component({
  selector: 'app-fiend-popup',
  templateUrl: './fiend-popup.page.html',
  styleUrls: ['./fiend-popup.page.scss'],
})
export class FiendPopupPage implements OnInit {

  @Input() uid: string;
  friendData: any = {};
  constructor(
    private navCon: NavController,
    private modalController: ModalController,
    private db: InformationService,
    private loadingCon: LoadingController,
    private alertController:AlertController
  ) { }

  ngOnInit() {
    this.db.getUserDataOne(this.uid, data => {
      this.friendData = data;
    })
  }

  async presentAlert(header,message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      mode:'ios',
      buttons: ['close']
    });
    await alert.present();
  }

  async back(status) {
    if (status) {
      let loading = await this.loadingCon.create({
        spinner: 'bubbles',
        cssClass:'loading',
        mode: 'ios'
      })
      await loading.present();
      this.db.getUserData(data => {

        if(!data){
          console.log('!data----')
          loading.dismiss();
          this.presentAlert('Failed!','การเพิ่มเพื่อนเกิดข้อผิดพลาด!');
        }
        else if (data.group && this.friendData.group) {
          console.log('data.group && this.friendData.group----')
          loading.dismiss()
          this.presentAlert('Alert!','เพื่อนของคุณมีครอบครัวเเล้ว!')
        }
        else if (!data.group && !this.friendData.group) {
          console.log('!data.group && !this.friendData.group----')
          // Create group
          let groupKey = this.db.genGroupKey();
          if (groupKey) {
            let processArray = []
            processArray.push(this.db.updateGroupOfuser(this.friendData.uid, groupKey));
            processArray.push(this.db.updateGroupOfuser(data.uid, groupKey));
            Promise.all(processArray).then(_ => {
              loading.dismiss()
              this.modalController.dismiss({ status: true });
              this.presentAlert('Successed','เพิ่มเพื่อนสำเร็จ')
            })
              .catch(err => {
                loading.dismiss()
                this.presentAlert('Failed!','การเพิ่มเพื่อนเกิดข้อผิดพลาด!')
              })
          }
        }
        else if (data.group && !this.friendData.group) {
          console.log('data.group && !this.friendData.group----')
          // Update gropup
          this.db.updateGroupOfuser(this.friendData.uid, data.group)
            .then(_ => {
              loading.dismiss()
              this.modalController.dismiss({ status: true });
              this.presentAlert('Successed','เพิ่มเพื่อนสำเร็จ')
            })
            .catch(err => {
              loading.dismiss()
              this.presentAlert('Failed!','การเพิ่มเพื่อนเกิดข้อผิดพลาด!')
            })
        }
        else if (!data.group && this.friendData.group) {
          console.log('!data.group && this.friendData.group----')
          // Update gropup
          this.db.updateGroupOfuser(data.uid, this.friendData.group)
            .then(_ => {
              loading.dismiss()
              this.modalController.dismiss({ status: true });
              this.presentAlert('Successed','เพิ่มเพื่อนสำเร็จ')
            })
            .catch(err => {
              loading.dismiss()
              this.presentAlert('Failed!','การเพิ่มเพื่อนเกิดข้อผิดพลาด!')
            })
        }
        else {
          console.log('else----')
          loading.dismiss()
          this.presentAlert('Failed!','การเพิ่มเพื่อนเกิดข้อผิดพลาด!')
        }
      })
    }
    else{
      this.modalController.dismiss({ status: status });
    }
  }

}
