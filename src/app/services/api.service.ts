import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postCompany(data: any) {
    return this.http.post<any>('http://localhost:3000/companyList', data);
  }

  getCompany() {
    return this.http.get<any>('http://localhost:3000/companyList');
  }

  putCompany(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/companyList/"+id ,data);
  }
  removeCompany(id:number){
    return this.http.delete<any>("http://localhost:3000/companyList/"+ id);
  }
}
