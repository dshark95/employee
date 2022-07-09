import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../class/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl:string = "http://localhost:3000";
  employeeUrl:string = this.baseUrl.concat("/employee");

  constructor(private httpService:HttpClient) { }

  getEmployeeList(){
    let url = this.employeeUrl;
    let params = new HttpParams().append("isDeleted","false");
    return this.httpService.get(url, {params}).toPromise();
  }

  addNewEmployee(employee:Employee){
    let url = this.employeeUrl;
    return this.httpService.post(url, employee).toPromise();
  }

  getEmployeeByID(id:string){
    let url = this.employeeUrl.concat("/",id);
    return this.httpService.get(url).toPromise();
  }

  updateEmployeeByID(employee:Employee){
    let url = this.employeeUrl.concat("/",employee.id.toString());
    return this.httpService.put(url, employee).toPromise();
  }
}
