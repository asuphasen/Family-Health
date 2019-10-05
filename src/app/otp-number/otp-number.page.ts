import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-otp-number',
  templateUrl: './otp-number.page.html',
  styleUrls: ['./otp-number.page.scss'],
})
export class OtpNumberPage implements OnInit {
  verificationId: string;
  smsCode: number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private firebaseAuthentication: FirebaseAuthentication,
    private afd: AngularFireDatabase,
    private afa: AngularFireAuth,
    private auth: AuthService,
    public nav: NavController
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((data: ParamMap) => {
      this.verificationId = data.get('verificationId');
      console.log(this.verificationId, '<-----')
    })
    // .paramMap
    //  .subscribe((queryParams: ParamMap) => {
    //     this.verificationId = queryParams.get('verificationId');
    //     console.log(queryParams)
    // });
  }

  gotoPhonenumber() {
    this.router.navigate(['phone-number']);
  }

  async gotoName() {
    // this.router.navigate(['home']);
    if (this.smsCode) {
      var result = await this.auth.checkOtp(this.verificationId, this.smsCode.toString());
      if (result) {
        localStorage.setItem('has', "true")
        this.nav.navigateRoot('home')
      } else {
        this.nav.navigateRoot('name')
      }
      // console.log(this.smsCode)
      // this.firebaseAuthentication.signInWithVerificationId(this.verificationId, this.smsCode.toString())
      //   .then(result => {
      //     if(result=='OK'){
      //       this.firebaseAuthentication.onAuthStateChanged().subscribe(user=>{
      //         console.log(user)
      //         this.afd.database.ref('users/'+user.uid).once('value',snapshot=>{
      //           if(snapshot.val()){
      //             this.router.navigate(['home']);
      //           }else{
      //             this.router.navigate(['name']);
      //           }
      //         })
      //       })
      //     }else{
      //       alert("OTP ไม่ถูกต้อง")
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     alert(error)
      //   })
    }
  }
}
