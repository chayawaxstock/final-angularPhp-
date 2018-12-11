import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './services/user.service';
import { DepartmentEnum } from './departmentEnum';


@Injectable()
export class AuthGuardManager implements CanActivate {

    constructor(private router: Router, public userService: UserService) { }

    canActivate() {
        if (this.userService.currentUser.departmentId == DepartmentEnum.MANAGER)
            return true;
        this.router.navigate(['/home']);
        return false;
    }
}