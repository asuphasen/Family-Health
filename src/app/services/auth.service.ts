import { Injectable } from '@angular/core';
//import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    //private firebaseAuthentication: FirebaseAuthentication,
    private firebaseAuth: AngularFireAuth,
    private afd: AngularFireDatabase,
    private oneSignal: OneSignal,
  ) { }

  

  async verifyPhoneNumber(phonenumber) {
    // if (phonenumber) {
    //   // var credential = await this.firebaseAuthentication.verifyPhoneNumber(phonenumber, 30000);
    //   if (credential.error) {
    //     return {error:credential.error};
    //   }
    //   return {error:false,credential:credential};
    // }else{
    //   return {error:true}
    // }
    return { error: false, credential: true }
  }

  // async checkOtp(credential,otp){
  //   var result = await this.firebaseAuthentication.signInWithVerificationId(credential,otp);
  //   if(result=='OK'){
  //     var user:any = await this.firebaseAuthentication.onAuthStateChanged()
  //     var snapshotUser:any = await this.afd.database.ref('users/'+user.uid).once('value');
  //     localStorage.setItem('uid',user.uid);
  //     return snapshotUser.val();
  //   }else{
  //     return null;
  //   }
  // }

  async checkOtp(credential, otp) {
    // var result = await this.firebaseAuthentication.signInWithVerificationId(credential,otp);
    var result = await this.firebaseAuth.auth.signInAnonymously(); //test
    // if(result=='OK'){
    if (result.user) { //test
      // var user:any = await this.firebaseAuthentication.onAuthStateChanged()
      // var user: any = await this.firebaseAuth.authState.subscribe();//test
      var snapshotUser: any = await this.afd.database.ref('users/' + result.user.uid).once('value');
      localStorage.setItem('uid', result.user.uid);
      return snapshotUser.val();
    } else {
      return null;
    }
  }

  async setupPush(accountId) {
    this.oneSignal.startInit(environment.onesignal_app_id, environment.firebase_sender_id);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      console.log('push received')
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      console.log('push opened')
    });
    this.oneSignal.getIds()
      .then((id) => {
        console.log(id);
      })
    this.oneSignal.endInit();
    var playerId = await this.oneSignal.getIds();
    localStorage.setItem('uid', accountId)
    return this.afd.database.ref(`users/${accountId}/playerId`).set(playerId)
  }

  login(){
    return new Promise((resolve,reject)=>{
      (<any>window).AccountKitPlugin.loginWithPhoneNumber({
        useAccessToken: true,
        defaultCountryCode: "TH",
        initialPhoneNumber: ["66"]
      },data=>{
        resolve(data)
      },error=>{
        reject(error)
      })
    })
  }


  logout() {
    (<any>window).AccountKitPlugin.logout()
    this.oneSignal.deleteTag('accountId')
    localStorage.clear();
  }

  getAccount(){
    return new Promise((resolve,reject)=>{
      (<any>window).AccountKitPlugin.getAccount(data=>{
        resolve(data)
      },error=>{
        reject(error)
      })
    })
  }

  initProfile(accountId,phoneNumber,name){
    return this.afd.database.ref('users/' + accountId).set({
      uid: accountId,
      name: name,
      phonenumber: phoneNumber,
      image_url: "http://www.isi-padangpanjang.ac.id/wp-content/uploads/2012/10/person-icon-blue-18.png"
    })
  }
  async hasProfile(accountId){
    var snap = await this.afd.database.ref('users/' + accountId).once('value');
    return snap.val();
  }
}
