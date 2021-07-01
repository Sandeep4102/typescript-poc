import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit { 

public email:any;
public password:any; 
public adminCredentials:any;
public flag=false;

  constructor(private router : Router, private authService:AuthService) { } 
ngOnInit() {
 
} 
adminAuth(){
  this.authService.adminData().subscribe(data=>{
    this.adminCredentials=data;
    if(this.email==this.adminCredentials.email && this.password==this.adminCredentials.password){ 
      localStorage.setItem('adminEmail', ' authenticate') 
      this.router.navigateByUrl('adminDashboard'); 
    }
    else {
      this.flag=true;
    }
  })
}


}
