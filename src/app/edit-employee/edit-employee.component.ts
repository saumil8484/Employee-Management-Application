import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data/data.service';
import { EmployeeModel } from '../data/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  ids : number = 0;
  qualification_array: string[] = []; /*Declared an array*/
  experience_array: string[] = [];
  language_array: string[] = [];
  
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();

  updateDetailsModalRef !: BsModalRef;

  constructor(private formbuilder : FormBuilder, private data : DataService, private activatedRoute : ActivatedRoute, private modalService: BsModalService) 
  {
    this.activatedRoute.params.subscribe(params =>{
      this.ids = (params['id']);
    });
    
  }

  ngOnInit(): void {
    this.qualification_array = ['B.C.A.', 'B.E.', 'B.Tech.', 'M.C.A.', 'M.E.', 'M.Tech.'] /*Initialised Array in ngONINit*/
    this.experience_array = ['Fresher', 'Less than 1 Year', '1 Year', 'More than 1 Year']
    this.language_array = ['English', 'Hindi', 'Spanish', 'French', 'German']

    this.formValue = this.formbuilder.group({
      employeeListNumber: [''],
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
    
    this.getDetails();
  }

  getDetails()
  {
    this.data.getEmployeeById(this.ids).subscribe((result:any)=>{
      this.onEdit(result);
   });
  }

  resetForm()
  {
    this.getDetails();
  }

  close(): void {
    this.updateDetailsModalRef.hide();
  }

  onEdit(row : any)
  {
    this.employeeModelObj.employeeListNumber = row.employeeListNumber;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['emailaddress'].setValue(row.emailaddress);
    this.formValue.controls['contactno'].setValue(row.contactno);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['userpassword'].setValue(row.userpassword);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['qualification'].setValue(row.qualification);
    this.formValue.controls['experience'].setValue(row.experience);
    this.formValue.controls['language'].setValue(row.language);
  }
  
  updateEmployeeDetails(updateDetailsTemplate: TemplateRef<any>)
  {
    this.employeeModelObj.id = this.ids;
    this.employeeModelObj.employeeListNumber;
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

    this.data.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      this.updateDetailsModalRef = this.modalService.show(updateDetailsTemplate, {class: 'modal-sm'});
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    },
    err=>{
      alert("Something went wrong !")
    })
  }
}
