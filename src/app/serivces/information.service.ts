import { Injectable } from '@angular/core';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class InformationService {
  constructor(
    // private firebaseAuthentication: FirebaseAuthentication,
    private afd: AngularFireDatabase,
    private afa: AngularFireAuth,
  ) { }

  genGroupKey() {
    return this.afd.database.ref('/groups').push().key
  }

  updateGroupOfuser(uid, groupId) {
    return new Promise((resolve, reject) => {
      try {
        this.afd.database.ref(`/users/${uid}/group`).set(groupId)
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      } catch (error) {
        reject(error)
      }
    })
  }

  getUserData(callback) {
    try {
      console.log('----------------------------<=> getUserData')
      var uid = localStorage.getItem('uid');
      console.log('uid----------------------------------------------.', uid);
      this.afd.database.ref('users/' + uid).once('value', user => {
        console.log(user);
        callback(user.val())
      }, err => {
        callback(null)
      })
    } catch (error) {
      callback(null)
    }

  }

  getSOS(callback) {
    var uid = localStorage.getItem('uid')
    this.afd.database.ref('users/' + uid).once('value', user => {
      if (user) {
        var group = user.val().group;
        if (group) {
          this.afd.list('sos/' + group).valueChanges().subscribe(resutl => {
            callback(resutl)
          })
        }
      }
    })
  }

  sendSOS(status) {
    var uid = localStorage.getItem('uid')
    this.afd.database.ref('users/' + uid).once('value', user => {
      if (user) {
        var group = user.val().group;
        if (group) {
          if (status) {
            this.afd.database.ref('sos/' + group + '/' + uid).set({
              from: user.val().name,
              message: "ได้กดปุ่มฉุกเฉิน",
              status: true,
              uid: uid,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            })
          } else {
            this.afd.database.ref('sos/' + group + '/' + uid).set(null)
          }

        }
      }
    })
  }

  getLOGs(callback) {
    var uid = localStorage.getItem('uid')
    this.afd.database.ref('users/' + uid).once('value', user => {
      if (user) {
        var group = user.val().group;
        if (group) {
          this.afd.list('logs/' + group, ref => ref.limitToLast(50)).valueChanges().subscribe(resutl => {
            callback(resutl)
          })
        }
      }
    })
  }

  getGroup(callback) {
    var uid = localStorage.getItem('uid')
    this.afd.database.ref('users/' + uid).once('value', user => {
      if (user) {
        var group = user.val().group;
        if (group) {
          this.afd.list('users', ref => ref.orderByChild('group').equalTo(group)).valueChanges().subscribe(resutl => {
            var filteredItems = resutl.filter((item: any) => {
              return item.uid != uid;
            });
            callback(filteredItems)
          })
        }
      }
    })
  }

  getUserDataOne(uid, callback) {
    this.afd.database.ref('users/' + uid).once('value', user => {
      callback(user.val())
    })
  }
  getInformation(uid, callback) {
    this.afd.database.ref('information_general/' + uid).once('value', data => {
      callback(data.val())
    })
  }

  saveInformation(uid, data, callback, error) {
    this.afd.database.ref('information_general/' + uid)
      .set(data)
      .then((res) => {
        this.getUserDataOne(localStorage.getItem('uid'), (user: any) => {
          this.afd.database.ref('logs/' + user.group).push({
            detail: `แก้ไขข้อมูลส่วนตัว`,
            from: user.name,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
        })
        callback(res)
      })
      .catch(err => {
        error(err.code)
      })
  }


  saveImage(url, callback) {
    let uid = localStorage.getItem('uid');
    this.afd.database.ref(`users/${uid}/image_url`)
      .set(url)
      .then((res) => {
        callback({ error: false, res: res })
      })
      .catch(err => {
        callback({ error: true, res: err })
      })

  }

  saveName(name, callback) {
    let uid = localStorage.getItem('uid');
    this.afd.database.ref(`users/${uid}/name`)
      .set(name)
      .then((res) => {
        callback({ error: false, res: res })
      })
      .catch(err => {
        callback({ error: true, res: err })
      })
  }


  getDataFromMedical(uid, callback) {
    this.afd.database.ref('information_medical/' + uid).once('value', data => {
      callback(data.val())
    })
  }

  saveDataFromMedical(uid, data, callback, error) {
    this.afd.database.ref('information_medical/' + uid)
      .set(data)
      .then((res) => {
        this.getUserDataOne(localStorage.getItem('uid'), (user: any) => {
          this.afd.database.ref('logs/' + user.group).push({
            detail: `${data.docter} นัดพบที่ ${data.location} ${data.more}`,
            from: user.name,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
        })
        callback(res)
      })
      .catch(err => {
        error(err.code)
      })
  }
}
