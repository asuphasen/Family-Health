import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { QRScanner} from '@ionic-native/qr-scanner/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { FiendPopupPageModule } from './fiend-popup/fiend-popup.module'
import { CallNumber } from '@ionic-native/call-number/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Tab1PageModule } from './information/tab1/tab1.module';
import { Tab2PageModule } from './information/tab2/tab2.module';

import { Camera } from '@ionic-native/camera/ngx';
// import { AngularFireModule } from '@angular/fire'
// import { AngularFireAuthModule } from '@angular/fire/auth'

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    FiendPopupPageModule,
    Tab1PageModule,
    Tab2PageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    // Firebase,
    PhotoLibrary,
    CallNumber,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
