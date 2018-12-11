import { Component } from '@angular/core';
import { DepartmentUser } from '../shared/models/departmentUser';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { createValidatorText, createValidatorNumber } from '../shared/validators/user.validation';
import { ManagerService } from '../shared/services/manager.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent  {

  //----------------PROPERTIRS-------------------
  departments: DepartmentUser[] = [];
  teamLeaders: User[] = [];
  formGroup: FormGroup;
  user: User;
  managerName: string;
  obj: typeof Object = Object;
  errorList: string[];

  //----------------CONSTRUCTOR------------------
  constructor(public userService: UserService, public managerService: ManagerService, public router: Router) {
    this.user = this.managerService.userToEdit;
    userService.getAllDepartments()
     .subscribe(departments => {
      this.departments = departments;
    });

    this.managerService.getUsersByDepartment("teamLeader")
    .subscribe(res => {
      this.teamLeaders = res;
      this.managerName = this.teamLeaders.find(x => x.userId == this.user.managerId).userName;
    }, 
    () => { });

    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let formGroupConfig = {
      userName: new FormControl(this.user.userName, createValidatorText("userName", 2, 15)),
      email: new FormControl(this.user.email, createValidatorText("email", 8, 30, emailPattern)),
      numHoursWork: new FormControl(this.user.numHoursWork, createValidatorNumber("numHoursWork", 4, 10)),
      departmentId: new FormControl(this.user.departmentUser.department),
      idManager: new FormControl(this.user.manager.userName),
    };
    this.formGroup = new FormGroup(formGroupConfig);

  }

  //----------------METHODS-------------------

  saveChangeUser() {

    let managerId = this.user.managerId;
    this.user.email = this.formGroup.value.email;
    this.user.userName = this.formGroup.value.userName;
    this.user.numHoursWork = this.formGroup.value.numHoursWork;
    this.user.userId = this.managerService.userToEdit.userId;
    this.user.departmentId = this.formGroup.value.departmentId;
    this.user.managerId = managerId;

    this.managerService.updateUser(this.user)
    .subscribe(() => {
      swal({
        type: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(["/manager/allUsers"]);

    }, err => {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

      })
    })
  }
}
