import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import { Router } from '@angular/router';
import { EditService } from '../shared/services/edit-service.service';
import { Global } from '../shared/services/global';


@Component({
  selector: 'app-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent {

  //----------------PROPERTIRS-------------------
  @Input() project: Project;
  projects: Project[] = [];
  @Output() deleteProject: EventEmitter<number> = new EventEmitter<number>();

  //----------------CONSTRUCTOR------------------
  constructor(
    public managerService: ManagerService,
    public router: Router,
    public editService: EditService) { }


  //----------------METHODS-------------------
  addWorkerToProject() {
    this.managerService.workerToProject = this.project;
    this.router.navigate(["/manager/addWorkerToProject"])
  }

  editProject() {
    this.managerService.project = this.project;
    this.managerService.isNew = false;
    this.router.navigate(["/manager/editProject"])
  }

  showWorker() {
    Global.idProjectToGetWorker = this.project.projectId;
    this.managerService.project = this.project;
    this.managerService.subjectIsShow.next(this.project.projectId);
    this.router.navigate(["/manager/showWorkers"]);
  }


  delete() {
    this.deleteProject.emit(this.project.projectId);
  }

}


