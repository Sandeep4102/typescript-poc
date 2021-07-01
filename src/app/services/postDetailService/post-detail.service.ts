import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {

  baseUrl = "http://localhost:3000"

  constructor(
    private http:HttpClient
  ) { }

  saveUser(reqBody)
  {
    let url = this.baseUrl+"/userData"
    return this.http.post(url,reqBody)
  }

  updateUser(id,reqBody)
  {
    let url = this.baseUrl+"/userData/"+id
    return this.http.patch(url,reqBody)
  }
}
