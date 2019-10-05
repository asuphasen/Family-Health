import { Component, OnInit } from '@angular/core';
import { InformationService } from 'src/app/serivces/information.service';
import { NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
interface DataFrom {
  name: string;
  birthday: string;
  blood: string;
  weight: number,
  height: number,
  diseases: any;
  medicals: any;
  drugs: any;
  foods: any;
  more: string;
}
interface UserData {
  group: string;
  image_url: string;
  name: string;
  phonenumber: string;
  uid: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  dataFrom: DataFrom = {
    name: "",
    birthday: "",
    blood: "",
    weight: 0.0,
    height: 0.0,
    diseases: [],
    medicals: [],
    drugs: [],
    foods: [],
    more: "",
  }
  userData: UserData;
  diseaseText: string = "";
  medicalText: string = "";
  drugText: string = "";
  foodText: string = "";

  uid: any;
  disabled: boolean

  constructor(
    private informationService: InformationService,
    public params: NavParams,
    public toastController: ToastController
  ) {
    this.uid = this.params.data;
    console.log("tab1 uid", this.uid)
    if (this.uid) {

      if (this.uid == localStorage.getItem('uid')) {
        this.disabled = false;
      }
      else {
        this.disabled = true;
      }

      this.informationService.getInformation(this.uid, (data: DataFrom) => {
        console.log("tab1 data", data)
        if (data) {
          this.dataFrom = data;
          this.dataFrom.diseases = this.dataFrom.diseases || []
          this.dataFrom.medicals = this.dataFrom.medicals || []
          this.dataFrom.drugs = this.dataFrom.drugs || []
          this.dataFrom.foods = this.dataFrom.foods || []
        }

      })
      this.informationService.getUserDataOne(this.uid, data => {
        if (data) {
          console.log("tab1 data2", data)
        }

      })
    }
  }

  ngOnInit() {
  }

  group: string = '';

  selectBlood(type) {
    if (!this.disabled) {
      this.dataFrom.blood = type;
    }
  }

  addFoods() {
    if (this.foodText) {
      this.dataFrom.foods.push(this.foodText);
      this.foodText = "";
    }
  }
  removeFoods(index) {
    if (index > -1) {
      this.dataFrom.foods.splice(index, 1);
    }
  }

  addDrugs() {
    if (this.drugText) {
      this.dataFrom.drugs.push(this.drugText);
      this.drugText = "";
    }
  }
  removeDrugs(index) {
    if (index > -1) {
      this.dataFrom.drugs.splice(index, 1);
    }
  }

  addDisease() {
    if (this.diseaseText) {
      this.dataFrom.diseases.push(this.diseaseText);
      this.diseaseText = "";
    }
  }
  removeDisease(index) {
    if (index > -1) {
      this.dataFrom.diseases.splice(index, 1);
    }
  }


  addMedical() {
    if (this.medicalText) {
      this.dataFrom.medicals.push(this.medicalText);
      this.medicalText = "";
    }
  }
  removeMedical(index) {
    if (index > -1) {
      this.dataFrom.medicals.splice(index, 1);
    }
  }
  save() {
    this.informationService.saveInformation(this.uid, this.dataFrom, success => {
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
