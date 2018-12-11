import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {

  //----------------CONSTRUCTOR------------------
  constructor(
    public userService: UserService
    , public router: Router) { }


  //----------------METHODS-------------------
  logout() {
    swal({
      title: `Are you sure you want to log out ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
      .then((result) => {
        if (result.value) {
          this.userService.currentUser = null;
          this.router.navigate(['/home']);
        }
      })
  }

}
