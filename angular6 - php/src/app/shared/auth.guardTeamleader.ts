import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './services/user.service';
import { DepartmentEnum } from './validators/user.validation';



@Injectable()
export class AuthGuardTeamleader implements CanActivate {

    constructor(private router: Router, public userService: UserService) { }

    canActivate() {
        if (this.userService.currentUser.departmentId == DepartmentEnum.TEAMLEADER)
            return true;
        this.router.navigate(['/home']);
        return false;
    }
}