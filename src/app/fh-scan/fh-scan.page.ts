import { Component, OnInit, NgZone } from '@angular/core';
import { QRScanner } from '@ionic-native/qr-scanner/ngx'
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fh-scan',
  templateUrl: './fh-scan.page.html',
  styleUrls: ['./fh-scan.page.scss'],
})
export class FhScanPage implements OnInit {

  qrcodeSub;
  constructor(
    private qrScanner: QRScanner,
    public loadingController: LoadingController,
    private router: Router,
    private ngZone: NgZone,
    private navCon: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.startScanner();
  }

  ionViewDidLeave() {
    this.closeScanner();
  }
  startScanner() {
    this.ngZone.run(() => {
      console.log("open scan")
      this.qrcodeSub = this.qrScanner.scan().subscribe(text => {
        console.log(text)
        this.qrScanner.hide();
        this.qrcodeSub.unsubscribe();
        this.router.navigate(['add-member'], { queryParams: { uid: text } })
      });
      const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
      rootElement.classList.add('cameraView');
    })

  }

  closeScanner() {
    this.ngZone.run(() => {
      console.log("close scan")
      this.qrScanner.hide();
      this.qrcodeSub.unsubscribe();
      const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
      console.log("close scan 2")
      rootElement.classList.remove('cameraView');
    })
  }

  back() {
    // this.closeScanner();
    this.navCon.back();
  }

}
