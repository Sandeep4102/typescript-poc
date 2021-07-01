import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  baseUrl = "http://localhost:3000"

  constructor(
    private http : HttpClient
  ) { }

  deleteUser(id)
  {
    
      let url = this.baseUrl+"/userData/"+id
      return this.http.delete(url,{})
  }
}
