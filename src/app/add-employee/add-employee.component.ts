import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data/data.service';
import { create_UUID, EmployeeModel } from '../data/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  qualification_array: string[] = []; /*Declared an array*/
  experience_array: string[] = [];
  language_array: string[] = [];

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();

  addDetailsModalRef !: BsModalRef;

  constructor(private formbuilder : FormBuilder, private data : DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.qualification_array = ['B.C.A.', 'B.E.', 'B.Tech.', 'M.C.A.', 'M.E.', 'M.Tech.'] /*Initialised Array in ngONINit*/
    this.experience_array = ['Fresher', 'Less than 1 Year', '1 Year', 'More than 1 Year']
    this.language_array = ['English', 'Hindi', 'Spanish', 'French', 'German']
    
    this.formValue = this.formbuilder.group({
      employeeListNumber: create_UUID(),
      firstname: [''],
      lastname: [''],
      emailaddress: [''],
      contactno: [''],
      address: [''],
      username: [''],
      userpassword: [''],
      gender: [''],
      qualification: [''],
      experience: [''],
      language: [''],
      id: ['']
    })
  }

  resetForm()
  {
    this.formValue.reset();
  }
 
  close(): void {
    this.addDetailsModalRef.hide();
  }

  postEmployeeDetails(addDetailsTemplate: TemplateRef<any>)
  {
    
    
    this.employeeModelObj.employeeListNumber = this.formValue.value.employeeListNumber;
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.emailaddress = this.formValue.value.emailaddress;
    this.employeeModelObj.contactno = this.formValue.value.contactno;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.username = this.formValue.value.username;
    this.employeeModelObj.userpassword = this.formValue.value.userpassword;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.qualification = this.formValue.value.qualification;
    this.employeeModelObj.experience = this.formValue.value.experience;
    this.employeeModelObj.language = this.formValue.value.language;

    this.data.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      this.addDetailsModalRef = this.modalService.show(addDetailsTemplate, {class: 'modal-sm'});
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    },
    err=>{
      alert("Something went wrong !")
    })
  }

}
