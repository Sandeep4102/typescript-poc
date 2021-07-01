import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  myimage:string="../../../assets/images/Stylo Design Institute.gif";
  constructor(private router : Router) { }

  userLogin()
  {
    this.router.navigateByUrl('/login');
  }
  // adminLogin()
  // {
  //   this.router.navigateByUrl('/adminLogin'); 
  // }

  ngOnInit(): void {
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

}
