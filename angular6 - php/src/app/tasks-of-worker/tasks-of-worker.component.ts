import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { WorkerService } from '../shared/services/worker.service';
import { ProjectWorker } from "../shared/models/projectWorker";

@Component({
  selector: 'app-tasks-of-worker',
  templateUrl: './tasks-of-worker.component.html',
  styleUrls: ['./tasks-of-worker.component.css']
})
export class TasksOfWorkerComponent implements OnInit {

  //----------------PROPERTIRS-------------------
  isClick: boolean = false;
  isTimerStart: boolean = false;
  projects: ProjectWorker[] = [];


  //----------------CONSTRUCTOR------------------
  constructor(
    public workerService: WorkerService,
    public userService: UserService) { }


  //----------------METHODS-------------------
  ngOnInit() {
    this.getAllProjects();

    this.userService.subjectAllProjects
      .subscribe(
        v => {
          this.getAllProjects();
        })
  }

  getAllProjects() {
    this.workerService.getTasksOfWorker(this.userService.currentUser.userId)
      .subscribe(res => {
        this.projects = res;
      },()=>{ });;
  }

  clickWork() {
    this.isClick = !this.isClick;
  }

  timer() {
    this.isTimerStart = !this.isTimerStart;
  }

}
