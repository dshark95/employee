import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Employee } from '../class/employee';
import { EmployeeService } from '../service/employee.service';
declare var $ : any;
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  title;
  employeeForm:FormGroup;

  employeeID:string;

  constructor(private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private employeeService:EmployeeService,
    private router:Router) { }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data.pageType;

    if(this.title==="edit"){
      this.employeeID = this.activatedRoute.snapshot.params["id"];
    }

    this.formInit();


    if(this.employeeID){
      this.getEmployeeByID();
    }

    $(document).ready(()=> {
        
      $('#dob-datepicker').datepicker({
          format: 'dd/mm/yyyy',
          endDate: '+0d'
      });

      $('#dob-datepicker').on('changeDate', ()=> {
          let value = $('#dob-datepicker').datepicker('getFormattedDate');
          this.employeeForm.controls["dob"].setValue(value);
      });
    });

    
  }

  formInit(){
    this.employeeForm = this.fb.group({
      name:[null, Validators.required],
      designation:[null, Validators.required],
      salary:[null, [Validators.required, this.validateSalary]],
      bio:[null, Validators.required],
      dob:[null, Validators.required]
    });
  }

  setForm(employee:Employee){
    this.employeeForm.setValue({
      name:employee.name,
      designation:employee.designation,
      salary:employee.salary,
      bio:employee.bio,
      dob:employee.dob
    });
  }

  getEmployeeByID(){
    this.employeeService.getEmployeeByID(this.employeeID)
    .then((res:Employee)=>{
      this.setForm(res);
      this.setDatepickerInput();
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  submit(){
    if(this.employeeForm.valid){
      let employeeObj:any = {
        id: this.employeeID,
        name: this.employeeForm.controls["name"].value,
        designation: this.employeeForm.controls["designation"].value,
        salary: +this.employeeForm.controls["salary"].value,
        bio: this.employeeForm.controls["bio"].value,
        dob: this.employeeForm.controls["dob"].value,
        isDeleted: false
      };
  
      if(this.title=="create"){
        this.createEmployee(employeeObj);
      }
      else{
        this.editEmployee(employeeObj);
      }
      
    }
   
    Object.keys(this.employeeForm.controls).forEach(key=>{
      this.employeeForm.controls[key].markAsDirty();
      this.employeeForm.controls[key].updateValueAndValidity();
    });
  }

  createEmployee(newEmployee){
    this.employeeService.addNewEmployee(newEmployee).then(()=>{
      this.router.navigateByUrl("/employee");
    })
    .catch((error)=>{
      console.log("fail");
    });
  }

  editEmployee(employeeObj){
    this.employeeService.updateEmployeeByID(employeeObj).then(()=>{
      this.router.navigateByUrl("/employee");
    })
    .catch((error)=>{
      console.log("fail");
    });
  }

  isInvalid(dataKey:string){
    return this.employeeForm.controls[dataKey].dirty&&this.employeeForm.controls[dataKey].errors;
  }

  setDatepickerInput(){
    $('#dob-datepicker').datepicker('update', this.employeeForm.controls["dob"].value);
  }

  validateSalary(control: AbstractControl) {
    if (control.value && +control.value==0) {
      return { invalidSalary: true };
    }
    return null;
  }

}
