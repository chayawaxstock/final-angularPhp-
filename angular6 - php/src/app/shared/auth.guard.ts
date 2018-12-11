import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './services/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public userService: UserService) { }

    canActivate() {
        if (this.userService.currentUser)
            return true;
        this.router.navigate(['/home']);
        return false;
    }
}