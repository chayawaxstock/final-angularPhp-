import { Component, Input } from '@angular/core';
import { DepartmentUser } from '../shared/models/departmentUser';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent  {

  constructor() { }

  @Input() department:DepartmentUser[];

}
