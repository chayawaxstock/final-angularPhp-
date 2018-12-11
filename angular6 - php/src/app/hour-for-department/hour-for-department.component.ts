import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentUser } from '../shared/models/departmentUser';

@Component({
  selector: 'app-hour-for-department',
  templateUrl: './hour-for-department.component.html',
  styleUrls: ['./hour-for-department.component.css']
})
export class HourForDepartmentComponent {

  @Input() department:DepartmentUser
  formGroup: any;
 
  @Output() numDepartment: EventEmitter<DepartmentUser> = new EventEmitter<DepartmentUser>();
 
  changeNumHour()
  {
    this.numDepartment.emit(this.department) ;
  }
}
