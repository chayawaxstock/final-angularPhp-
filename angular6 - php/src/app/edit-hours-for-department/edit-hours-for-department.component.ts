import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HourForDepartment } from '../shared/models/hourForDepartment';

@Component({
  selector: 'app-edit-hours-for-department',
  templateUrl: './edit-hours-for-department.component.html',
  styleUrls: ['./edit-hours-for-department.component.css']
})
export class EditHoursForDepartmentComponent  {

  
  @Input()hourForDepartent:HourForDepartment;
 
  @Output() numDepartment: EventEmitter<HourForDepartment> = new EventEmitter<HourForDepartment>();
  
  changeNumHour()
  {
    this.numDepartment.emit(this.hourForDepartent) ;
  }

}
