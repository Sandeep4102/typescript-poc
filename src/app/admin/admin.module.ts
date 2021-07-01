import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[FilterPipe]
})
export class AdminModule { }
