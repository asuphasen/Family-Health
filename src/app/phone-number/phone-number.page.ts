import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AuthService } from '../services/auth.service';

// import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.page.html',
  styleUrls: ['./phone-number.page.scss'],
})
export class PhoneNumberPage implements OnInit {

  phonenumber: string = "0805892261"; //0805892261 otp 123456
  constructor(
    private router: Router,
    // private firebaseAuthentication: FirebaseAuthentication,
    private auth:AuthService
  ) { }

  ngOnInit() {
  }

  gotoSplash() {
    this.router.navigate(['splashscreen']);
    // setTimeout(() => {
    // this.router.navigate(['otp-number']);
    // }, 300);

  }
  async gotoOTP() {
    // if (this.phonenumber){
    //   const tell = '+66' + this.phonenumber;
    //   var result = await this.auth.verifyPhoneNumber(tell);
    //   if(!result.error){
    //     this.router.navigate(['otp-number'], {
    //       queryParams: {
    //         verificationId: result.credential
    //       }
    //     });
    //   }
    // }

    //----------------------------------------------------------------------Sign in with anonymously
    if (this.phonenumber){
      const tell = '+66' + this.phonenumber;
      var result = await this.auth.verifyPhoneNumber(tell);
      if(!result.error){
        this.router.navigate(['otp-number'], {
          queryParams: {
            verificationId: result.credential
          }
        });
      }
    }
    
    // if (this.phonenumber) {
    //   const tell = '+66' + this.phonenumber;
    //   console.log()
    //   var credential = await this.firebaseAuthentication.verifyPhoneNumber(tell, 30000);
    //   if (credential.error) {
    //     console.log(credential.error)
    //     return;
    //   }
    //   console.log(credential)
    //   this.router.navigate(['otp-number'], {
    //     queryParams: {
    //       verificationId: credential
    //     }
    //   });

    // }


  }

}
