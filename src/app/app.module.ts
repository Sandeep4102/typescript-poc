import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module'; 
import {HttpClientModule} from '@angular/common/http';

import { FileUploadModule } from "ng2-file-upload";
// Cloudinary module

import { Cloudinary } from "cloudinary-core";
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-5.x';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
  NgxUiLoaderService,
} from "ngx-ui-loader";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
// import { LoaderComponentComponent } from './commonComponents/loader-component/loader-component.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary,
};

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: 'red',
  // bgsOpacity: 0.5,
  // bgsPosition: POSITION.bottomLeft,
  bgsSize: 60,
  bgsType: SPINNER.chasingDots,
  // blur: 5,
  // delay: 0,
  // fastFadeOut: true,
  // fgsColor: 'red',
  // fgsPosition: POSITION.centerCenter,
  // fgsSize: 0,
  // fgsType: SPINNER.chasingDots,
  // gap: 24,
  // logoPosition: POSITION.centerCenter,
  // logoSize: 120,
  // logoUrl: "assets/images/loading.gif",
  // overlayBorderRadius: '0',
  // overlayColor: 'rgba(40, 40, 40, 0.8)',
  // pbColor: 'red'
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 5,
  hasProgressBar: false,
  text: "Please Wait...",
  // textColor: '#FFFFFF',
  // textPosition: POSITION.centerCenter,
  // maxTime: -1,
  // minTime: 500
};
@NgModule({
  declarations: [ 
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminModule,
    UserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    CloudinaryModule.forRoot(cloudinaryLib, {
      cloud_name: "ddhbxbhqh",
      upload_preset: "f6p3bhvb",
    }),
    FileUploadModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [NgxUiLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

