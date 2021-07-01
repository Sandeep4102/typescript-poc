import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsService {

  baseUrl = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllUser()
  {
    let url = this.baseUrl+"/userData"
    return this.http.get(url)
  }
  getUserById(id)
  {
    let url = this.baseUrl+"/userData/"+id
    return this.http.get(url)
  }
}
