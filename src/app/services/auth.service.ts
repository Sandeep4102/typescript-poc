import { Injectable } from '@angular/core';    
import {HttpClient,  HttpClientModule} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }   

  userURL="http://localhost:3000/users";
  adminURL="http://localhost:3000/admin"

  public send=new BehaviorSubject({})
  public collect=<any>this.send.asObservable(); 
  
  addUser(data){
    return this.http.post(this.userURL,data);
  } 
  
  userData(){
    return this.http.get(this.userURL);
  }

  adminData(){
  return this.http.get(this.adminURL);
  } 

  updateUserStatus(id,data){
    return this.http.put(`${this.userURL}`+`/${id}`,data);
  }

  userAuthentication(email:string,password:string)
  {
    
  }

}

