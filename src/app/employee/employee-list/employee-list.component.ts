import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableConfig } from 'src/app/common/class/tableConfig';
import { Employee } from '../class/employee';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  tableConfig:TableConfig = {
    tableColumn: [
      { label:'Name', data:'name' },
      { label:'Designation', data:'designation' },
      { label:'Salary', data:'salary' },
      { label:'Short Bio', data:'bio', pipeType:"trunc" },
      { label:'Date Of Birth', data:'dob' },
    ],
    actionColumn: [
      { label: "Edit", action:"edit" },
      { label: "Delete", action:"delete" }
    ]
  }

  employeeList:Employee[] = [];
  getEmployee:Subscription;
  constructor(private employeeService:EmployeeService,
    private router:Router) { }
  
  ngOnInit(): void {
    this.getEmployeeList();
  }

  ngOnDestroy(): void {
  }

  getEmployeeList(){
    this.employeeService.getEmployeeList().then((response:Employee[])=>{
      this.employeeList = response;
    })
    .catch((error)=>{
      alert("error getting employee list");
    });
  }

  dropdownCallback(id:string, action:string){
    switch (action.toLowerCase()) {
      case "edit":
        this.router.navigateByUrl("/employee/edit/"+id);
        break;
      case "delete":
        let employee = this.employeeList.find(x=> x.id==+id);
        if (confirm('Are you sure you want to delete '+ employee.name +' ?')) {
            employee.isDeleted = true;
            this.employeeService.updateEmployeeByID(employee).then(()=>{
            this.getEmployeeList();
          });
        } 
        else {
          
        }
        
        
        break;
      default:
        break;
    }
  }

}
