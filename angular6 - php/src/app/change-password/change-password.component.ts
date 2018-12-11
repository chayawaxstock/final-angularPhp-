import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { createValidatorText } from '../shared/validators/user.validation';
import { LoginUser } from '../shared/models/loginUser';
import sha256 from 'async-sha256' ;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
 
  formGroup: FormGroup;
  obj: typeof Object = Object;
  hostname: any;
  domain: any;
  requestId:number;

  //----------------CONSTRUCTOR------------------
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {

    let formGroupConfig = {
      userName: new FormControl("", createValidatorText("userName", 2, 15)),
      password: new FormControl("", createValidatorText("password", 8, 20)),
     
    };
    this.formGroup = new FormGroup(formGroupConfig);
  }

  ngOnInit() {
    this.requestId =parseInt(this.route.snapshot.paramMap.get('requestId'));
  }

  //----------------METHODS-------------------

  submitPassword() {

    if (this.formGroup.invalid) {
      return;
    }
  
    let user: LoginUser = this.formGroup.value;
    let pass=user.password;

    //convert password to sha256
    sha256(user.password).then( p=>{
    user.password=p;
    this.changePass(user);
    });
  }

  changePass(user:LoginUser): any {

    this.userService.changePassord(user,this.requestId)
    .subscribe(() => {
      //save user in global prop
     this.userService.getAllUsers().subscribe(res => {
     res= res.filter(x=>x.userName==user.userName);

       this.userService.currentUser = res[0];
      });;
      //check promissing
      this.userService.checkDepartment();

      },
       err => {
        alert(err.errors);
      });
  }


}
