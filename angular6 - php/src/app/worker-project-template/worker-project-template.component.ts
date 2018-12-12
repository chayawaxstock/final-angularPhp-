import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProjectWorker } from '../shared/models/projectWorker';
import { PresentDay } from '../shared/models/pressentDay';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { IntlService } from '@progress/kendo-angular-intl';
import { ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'app-worker-project-template',
  templateUrl: './worker-project-template.component.html',
  styleUrls: ['./worker-project-template.component.css']
})

export class WorkerProjectTemplateComponent implements OnInit{

  //----------------PROPERTIRS-------------------
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 300,
    'canvasHeight': 300,
    
  };
  @Input()
  project: ProjectWorker;

  @Input()
  isClick: boolean;

  stopClick: boolean = false;
  preccentDay: PresentDay = new PresentDay();

  @Output() clickWork: EventEmitter<number> = new EventEmitter<number>();
  @Output() isStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  isStop: boolean = false;
  //----------------CONSTRUCTOR------------------
  constructor(
    public workerService: WorkerService,
    public userService: UserService,
    public router: Router,
    public intl: IntlService) { }


  //----------------METHODS-------------------
  ngOnInit() {
    if(this.workerService.idWorkingProject==this.project.projectId)
    {
      this.stopClick=true;
      this.isClick=true;
      this.clickWork.emit();
      // this.workerService.timerSubject.next(this.stopClick);
    }
    else if(this.workerService.idWorkingProject!=null)
    {
      this.stopClick=false;
      this.isClick=true;
    }
  }

  clickUpdateWork(projectId: number) {

    this.workerService.timerSubject.next(this.stopClick);
    this.stopClick = !this.stopClick;
    this.clickWork.emit(this.project.projectId);

    if (this.stopClick == true) {
      this.startTimer(projectId);
      this.workerService.idWorkingProject=this.project.projectId;
      this.isStart.emit(false);
    }
    else this.stopTimer(projectId);
  }

  startTimer(projectId: number) {
    this.preccentDay.timeBegin = new Date();
    this.preccentDay.timeEnd = new Date();
    this.preccentDay.userId = this.userService.currentUser.userId;
    this.preccentDay.projectId = projectId;
    debugger;
    this.workerService.addPresentDay(this.preccentDay)
      .subscribe(() => {
        swal({
          type: 'success',
          title: 'Start',
          showConfirmButton: false,
          timer: 1500
        })
      },
        err => {
          {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        })
  }

  stopTimer(projectId: number) {
    this.preccentDay.userId = this.userService.currentUser.userId;
    this.preccentDay.projectId = projectId;
    this.isStop = true;

  }


  clear() {
    this.signaturePad.clear();
  }
  ok() {
    this.preccentDay.timeEnd = new Date(this.intl.formatDate(new Date(), "d"));

    this.workerService.updateDayPressent(this.preccentDay)
      .subscribe(() => {
        swal({
          type: 'success',
          title: 'Stop',
          showConfirmButton: false,
          timer: 1500
        });
        this.workerService.idWorkingProject=null;
        this.userService.subjectAllProjects.next("true");
      },
        err => {
          {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        })
  }
}
