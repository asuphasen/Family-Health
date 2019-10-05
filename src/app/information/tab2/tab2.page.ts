import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { InformationService } from 'src/app/serivces/information.service';
interface DataFromMedical {
  docter: string;
  detail: string;
  date: string;
  tiem: string,
  location: string,
  phonenumber: string;
  more: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  dataFromMedical: DataFromMedical = {
    docter: "",
    detail: "",
    date: "",
    tiem: "",
    location: "",
    phonenumber: "",
    more: "",
  };
  uid: any;
  disabled: boolean
  constructor(
    private informationService: InformationService,
    public params: NavParams,
    public toastController: ToastController
  ) {
    this.uid = this.params.data;
    if (this.uid) {
      
      if (this.uid == localStorage.getItem('uid')) {
        this.disabled = false;
      }
      else {
        this.disabled = true;
      }

      this.informationService.getDataFromMedical(this.uid, data => {
        if (data) {
          this.dataFromMedical = data;
        }
      })
    }
  }

  ngOnInit() {
  }

  save() {
    console.log('saving')
    this.informationService.saveDataFromMedical(this.uid, this.dataFromMedical, success => {
      console.log("save")
      this.presentToast("บันทึกเรียบร้อย")
    }, error => {
      console.log(error)
    })
  }

  async presentToast(ms) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 2000
    });
    toast.present();
  }
}
