import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../shared/models/user';
import { ProjectWorker } from '../shared/models/projectWorker';

@Component({
  selector: 'app-add-worker-to-project-template',
  templateUrl: './add-worker-to-project-template.component.html',
  styleUrls: ['./add-worker-to-project-template.component.css']
})
export class AddWorkerToProjectTemplateComponent implements OnInit {

  @Input() workerToProject: User;

  isChecked: boolean = false;
  hoursForProject:number;
  workerProject:ProjectWorker;

  @Output() numHours: EventEmitter<ProjectWorker> = new EventEmitter<ProjectWorker>();

  constructor() { 
    this.workerProject=new ProjectWorker();
  }

  ngOnInit() {
    this.workerProject.userId=this.workerToProject.userId;
  }

  changeWorker()
  {
      this.isChecked =!this.isChecked;
  }

  changeHoursForProject(event)
  {
    this.workerProject.hoursForProject=event.target.value;
    this.numHours.emit(this.workerProject);
  }
}
