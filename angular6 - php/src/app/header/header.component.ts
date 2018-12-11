import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  
 department:string;

  constructor(private userService:UserService) {
    
   this.department=this.userService.currentUser.departmentUser.department;
  }
}
