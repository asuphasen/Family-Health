import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { InformationService } from '../serivces/information.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from '@angular/fire/database'


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(
    private navCon: NavController,
    private afd: InformationService,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    public loadingController: LoadingController,
    private FireStorage: AngularFireStorage,
    private alertController: AlertController,
    private toastController:ToastController

  ) { }

  user: any = {};
  uid: string;
  alertMessage: string = '';

  ngOnInit() {
    let uid = localStorage.getItem('uid');
    this.afd.getUserDataOne(uid, data => {
      this.user = data
    })
  }

  async toCamera() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selete',
      mode: 'ios',
      buttons: [
        {
          text: 'Take picture',
          handler: () => {
            console.log('Take picture');
            this.takePicture(1);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            console.log('Gallery');
            this.takePicture(0);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    }
    this.camera.getPicture(options).then(async (imageData) => {
      const loading = await this.loadingController.create({
        spinner: "bubbles",
        cssClass: "loading",
        mode: 'ios'
      });
      await loading.present();

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      const ref = this.FireStorage.storage.ref('images/' + localStorage.getItem('uid') + '/' + Date.now() + '.jpg');
      const uploadTask = ref.putString(base64Image, 'data_url');
      uploadTask.on('state_changed', snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload ${progress}%`);
      }, error => {
        this.alertMessage = 'Upload image fail!.';
        this.presentAlert();
        loading.dismiss();
        console.log('Upload image : Data error! :', error);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            console.log('File available at', downloadURL);
            this.user.image_url = downloadURL;
            this.afd.saveImage(this.user.image_url, res => {
              if (res.error) {
                this.showToast("ไม่สามารถบันทึกรูปได้!")
              }
              else {
                this.showToast("บันทึกรูปเเล้ว")
              }
            })
            loading.dismiss();
          })
          .catch(error => {
            this.alertMessage = 'Get image url fail!.';
            this.presentAlert();
            loading.dismiss();
            console.log('Get image url fail! :', error);
          })
      })
    })
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



  back() {
    this.navCon.back()
  }
  leaveGroup() {
    let uid = localStorage.getItem('uid');
    this.afd.updateGroupOfuser(uid,null)
    .then(_=>{
      // this.showToast('ออกจากกลุ่มเเล้ว') 
      this.presentAlert2('Successed','ออกจากกลุ่มเเล้ว');
      this.navCon.back();
    })
    .catch(err=>{
      // this.showToast('การออกจากกลุ่มผิดพลาด!') 
      this.presentAlert2('Failed!','การออกจากกลุ่มผิดพลาด!');
    })
  }

  save() {
    if(this.user.name!='' && this.user.name!=null){
      this.afd.saveName(this.user.name,res=>{
        if(!res.error){
          // this.showToast('เเก้ไขข้อมูลสำเร็จ');
          this.presentAlert2('Successed','เเก้ไขข้อมูลสำเร็จ');
          this.navCon.back(); 
        }
        else{
          // this.showToast('เเก้ไขข้อมูลสำเร็จผิดพลาด!') 
          this.presentAlert2('Failed!','เเก้ไขข้อมูลสำเร็จผิดพลาด!')
        }
      })
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Upload image',
      message: this.alertMessage,
      buttons: ['Close'],
      mode: 'ios'
    });
    await alert.present();
  }

  async presentAlert2(header,message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      mode:'ios',
      buttons: ['close']
    });
    await alert.present();
  }
}
