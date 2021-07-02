import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GetDetailsService } from '../../services/getDetailService/get-details.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  public email: string;
  public password: string;
  public flag = false;
  public showLoader: boolean = false;
  constructor(
    private service: AuthService,
    private router: Router,
    private getDetails: GetDetailsService
  ) {}

  public allUserDetails: any = [];

  ngOnInit(): void {
    this.getUserList();
    this.checkAuth()
  }

  checkAuth() {
    if (localStorage.getItem('userDetails')) {
      localStorage.removeItem('userDetails');
    }
    if(localStorage.getItem('adminDetail'))
    {
      localStorage.removeItem('adminDetail');
    }
  }

  getUserList() {
    this.showLoader = true;
    this.getDetails.getAllUser().subscribe(
      (data) => {
        // console.log(data, 'Data from get details service');
        this.allUserDetails = data;
        this.showLoader = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.showLoader = false;
      }
    );
  }
 
  userAuth() {
    if (this.email && this.password) {
      this.allUserDetails.filter((val) => {
        if (val.email == this.email && val.password == this.password) {
          if(val.role == 'user')
          {
            this.router.navigateByUrl('userDashboard/' + val.id);
            localStorage.setItem('userDetails', 'allowed');
          }
          else if(val.role == 'admin')
          {
            this.router.navigateByUrl('/adminDashboard');
            localStorage.setItem('adminDetail', 'allowed');
          }
          return val;
        } else {
          this.flag = true;
        }
      });
    } else {
      this.flag = true;
    }
  }
}
