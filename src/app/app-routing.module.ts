import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import {UserLoginComponent } from'./user/user-login/user-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import {UserRegisterComponent } from './user/user-register/user-register.component';
// import { from } from 'rxjs';
import {UsersGuard} from './guards/users.guard';
import {AdminGuard} from './adminGuard/admin.guard';


const routes: Routes = [ 
  {
    path:'homePage', component: HomePageComponent
  },
  {
    path:'', component: HomePageComponent
  },
  {
    path:'adminLogin', component: AdminLoginComponent
  },
  {
    path:'login', component: UserLoginComponent
  },
  {
    path:'adminDashboard', component: AdminDashboardComponent, canActivate:[AdminGuard]
  },
  {
    path:'userDashboard/:id', component: UserDashboardComponent, canActivate:[UsersGuard]
  },
  {
    path:'userRegister', component: UserRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
