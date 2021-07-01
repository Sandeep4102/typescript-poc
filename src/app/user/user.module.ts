import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FileUploadModule } from 'ng2-file-upload';
import { LoaderComponentComponent } from '../commonComponents/loader-component/loader-component.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserDashboardComponent,
    UserRegisterComponent,
    LoaderComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule,
    FileUploadModule,
    NgxUiLoaderModule
  ],
  exports:[LoaderComponentComponent]
})
export class UserModule { }
