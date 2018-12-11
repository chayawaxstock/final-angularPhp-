import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { createValidatorText } from '../shared/validators/user.validation';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  
   //----------------PROPERTIRS-------------------
   formGroup: FormGroup;
   obj: typeof Object = Object;

  //----------------CONSTRUCTOR------------------
  constructor(
    public workerService:WorkerService,
    public userService:UserService,
    public router:Router) {}


  //----------------METHODS-------------------
  ngOnInit() {
    let formGroupConfig = {
      subject: new FormControl(""),
      body: new FormControl("",createValidatorText("body", 2, 15000)),

    };
    this.formGroup = new FormGroup(formGroupConfig);
  }

  sendEmail()
  {
    debugger;
    this.workerService.sendEmail(this.formGroup.value,this.userService.currentUser.userId)
    .subscribe(
      ()=>{
        swal({
          type: 'success',
          title: 'The message has been sent',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/worker"]);

      },err=>{
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'send email failed',
        })
      }
    );
  }
}
