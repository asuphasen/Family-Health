import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
// import { QRScanner, QRScannerStatus  } from '@ionic-native/qr-scanner/ngx';
import { FiendPopupPage } from '../fiend-popup/fiend-popup.page'

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  qrcodeSub;
  constructor(
    private router: Router,
    private navCon: NavController,
    // private qrScanner: QRScanner
    private qrScanner: QRScanner,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private modalController: ModalController,
  ) {
  }
  ngOnInit() {
    //this.presentModal('1');
    this.route.queryParams.subscribe(data => {
      if (data.uid) {
        setTimeout(() => {
          this.qrScanner.destroy();
        }, 500);
        let uid = data.uid;
        setTimeout(() => {
          this.presentModal(uid);
        }, 200);
      }
    })
  }

  async presentModal(uid) {
    const modal = await this.modalController.create({
      component: FiendPopupPage,
      cssClass: 'modalWater',
      componentProps: {
        'uid': uid
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log('data to dismiss ', data)
  }

  gotoQRcode() {
    this.router.navigate(['qrcode'])
  }

  back() {
    this.navCon.navigateBack(['home'])
  }

  encodedText() {
    this.router.navigate(['fh-scan']);
  }

  openQRscanner() {
    // this.qrScanner.prepare()
    //   .then((status: QRScannerStatus) => {
    //     if (status.authorized) {
    //       // camera permission was granted


    //       // start scanning
    //       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    //         console.log('Scanned something', text);

    //         this.qrScanner.hide(); // hide camera preview
    //         scanSub.unsubscribe(); // stop scanning
    //       });

    //     } else if (status.denied) {
    //       // camera permission was permanently denied
    //       // you must use QRScanner.openSettings() method to guide the user to the settings page
    //       // then they can grant the permission from there
    //     } else {
    //       // permission was denied, but not permanently. You can ask for permission again at a later time.
    //     }
    //   })
    //   .catch((e: any) => console.log('Error is', e));
  }

}
