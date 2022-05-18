import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeData !: any;
  deleteModalRef !: BsModalRef;
  deleteMessageModalRef !: BsModalRef;

  constructor(private data : DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllEmployeeDetails();
  }

  getAllEmployeeDetails()
  {
    this.data.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  openDeleteModal(deleteTemplate: TemplateRef<any>) {
    this.deleteModalRef = this.modalService.show(deleteTemplate, {class: 'modal-sm'});
  }
 
  close(): void {
    this.deleteModalRef.hide();
    this.deleteMessageModalRef.hide();
  }

  deleteEmployeeDetails(row : any, deleteMessageTemplate: TemplateRef<any>)
  {
    this.data.deleteEmployee(row.id)
    .subscribe(res=>{
      this.deleteModalRef.hide();
      this.deleteMessageModalRef = this.modalService.show(deleteMessageTemplate, {class: 'modal-sm'});
      this.getAllEmployeeDetails(); 
  })
  }

}
