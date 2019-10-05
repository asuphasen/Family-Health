import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  // nu point
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  // { path: 'members', loadChildren: './members/member-routing.module#MemberRoutingModule'},
  // { path: 'allow', loadChildren: './public/allow/allow.module#AllowPageModule' },

  // family health
  { path: '', redirectTo: 'splashscreen', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'splashscreen', loadChildren: './splashscreen/splashscreen.module#SplashscreenPageModule' },
  { path: 'phone-number', loadChildren: './phone-number/phone-number.module#PhoneNumberPageModule' },
  { path: 'otp-number', loadChildren: './otp-number/otp-number.module#OtpNumberPageModule' },
  { path: 'name', loadChildren: './name/name.module#NamePageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'information', loadChildren: './information/information.module#InformationPageModule' },
  { path: 'tab1', loadChildren: './information/tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './information/tab2/tab2.module#Tab2PageModule' },
  { path: 'qrcode', loadChildren: './qrcode/qrcode.module#QrcodePageModule' },
  { path: 'add-member', loadChildren: './add-member/add-member.module#AddMemberPageModule' },
  { path: 'qrscanner', loadChildren: './qrscanner/qrscanner.module#QrscannerPageModule' },  { path: 'fh-scan', loadChildren: './fh-scan/fh-scan.module#FhScanPageModule' },
  { path: 'fiend-popup', loadChildren: './fiend-popup/fiend-popup.module#FiendPopupPageModule' },
  { path: 'map-cost', loadChildren: './map-cost/map-cost.module#MapCostPageModule' },
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
