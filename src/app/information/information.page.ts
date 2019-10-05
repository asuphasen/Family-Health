import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSegment, ModalController, LoadingController, NavController } from '@ionic/angular';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InformationService } from '../serivces/information.service';
interface UserData {
  group: string;
  image_url: string;
  name: string;
  phonenumber: string;
  uid: string;
}

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  tab1 = Tab1Page;
  tab2 = Tab2Page;
  userData: UserData = {
    group: "",
    image_url: "",
    name: "",
    phonenumber: "",
    uid: "",
  };

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonSegment) segment: IonSegment;

  uid: string;
  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    public navRoutee: NavController,
    private activatedRoute: ActivatedRoute,
    private informationService:InformationService,
    private router:Router
  ) { }

  
  canEdit: boolean = false;

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((data: ParamMap) => {
      this.uid = data.get('uid');
      if(this.uid == localStorage.getItem('uid')){
        this.canEdit = true;
      }
      console.log(this.uid)
      this.informationService.getUserDataOne(this.uid, data => {
        this.userData = data;
      })
    })
  }
  gotoBack() {
    this.navRoutee.back();
  }

  toEdit(){
    this.router.navigate(['edit-profile']);
  }

  segmentChanged(ev: any) {
    console.log('segmentChanged', ev.detail.value);
    this.slides.slideTo(ev.detail.value);
  }
  slideDidChange(e: any) {
    console.log('slideDidChange');
    this.slides.getActiveIndex().then((index: any) => {
      this.segment.value = index;
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      this.activatedRoute.queryParamMap.subscribe((data: ParamMap) => {
        this.uid = data.get('uid');
        console.log(this.uid)
        this.informationService.getUserDataOne(this.uid, data => {
          this.userData = data;
        })
      })
      event.target.complete();
    }, 2000);
  }
}
