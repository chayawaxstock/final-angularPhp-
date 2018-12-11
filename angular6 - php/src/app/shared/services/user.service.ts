import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/loginUser';

import { Global } from './global';
import { Observable, Subject } from 'rxjs';
import { DepartmentEnum } from '../validators/user.validation';
import { Router } from '@angular/router';
import { DepartmentUser } from '../models/departmentUser';


@Injectable()
export class UserService {

  timer = 0;
  subject = new Subject();
  currentUser: User
  subjectAllProjects = new Subject();
  isFirst:boolean=true;
  constructor(public httpClient: HttpClient, private router: Router) {
  }

  checkDepartment() {
    if (this.currentUser.departmentId == DepartmentEnum.TEAMLEADER)
      this.router.navigate(['/teamLeader']);
    else if (this.currentUser.departmentId == DepartmentEnum.MANAGER)
      this.router.navigate(['/manager']);
    else this.router.navigate(['/worker']);
  }

  signInUser(user: LoginUser): Observable<User> {
    console.log(user);
     return this.httpClient.post<User>(Global.baseURLPHP + "/user/loginByPassword",user);
  }

  loginByUserComputer(ip: string): Observable<User> {
    let formData: FormData = new FormData();
    formData.append('ip', ip);
    return this.httpClient.post<User>(Global.baseURLPHP + "/user/loginByIp", {"ip":ip})
  }

  forgetPassword(userName: string): Observable<any> {
    return this.httpClient.get(Global.baseURLPHP + "/user/forgetPassword?userName="+userName)
  }

  changePassord(user:LoginUser,requestId:number): Observable<any>
  {
    return this.httpClient.put(Global.baseURLPHP+"/user/changePassword?requestId="+requestId,{"user":user});
  }

  getAllDepartments(): Observable<DepartmentUser[]> 
  {  
    return this.httpClient.get<DepartmentUser[]>(Global.baseURLPHP + "/department/getAllDepartments");
  }

  getAllUsers(): Observable<User[]> {
    debugger;
    return this.httpClient.get<User[]>(Global.baseURLPHP+"/user/getAllUsers");
  }

  getIp(): Observable<any> {
    return this.httpClient.get("https://api.ipify.org/?format=json")
  }

  getHoursForProjectsByUser(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(Global.baseURLPHP + "/user/getHoursForUserProjects?userId=" + userId);
  }


}
