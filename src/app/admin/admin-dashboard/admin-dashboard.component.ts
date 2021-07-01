import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GetDetailsService } from '../../services/getDetailService/get-details.service';
import { DeleteService } from '../../services/DeleteService/delete.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public userData: any;

  public showLoader: boolean = false;

  public allUserDetails: any = [];

  public searchText : any
  constructor(
    private router: Router,
    private authService: AuthService,
    private getDetails: GetDetailsService,
    private deleteService: DeleteService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }
  getUserList() {
    this.showLoader = true;
    this.getDetails.getAllUser().subscribe(
      (data) => {
        console.log(data, 'Data from get details service');
        this.allUserDetails = data;
        this.allUserDetails = this.allUserDetails.filter(
          (v) => v.role != 'admin'
        );
        this.showLoader = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.showLoader = false;
      }
    );
  }

  view(item) {
    this.router.navigateByUrl('userDashboard/' + item.id);
    localStorage.setItem('userDetails', 'allowed');
  }

  delete(item) {
    this.showLoader = true;
    this.deleteService.deleteUser(item.id).subscribe(
      (data) => {
        console.log(data, 'Data from delete service');
        this.getUserList();
        this.showLoader = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);

        this.showLoader = false;
      }
    );
  }
}
