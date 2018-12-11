import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { ProjectWorker } from '../shared/models/projectWorker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details-template',
  templateUrl: './project-details-template.component.html',
  styleUrls: ['./project-details-template.component.css']
})
export class ProjectDetailsTemplateComponent implements OnInit {

     //----------------PROPERTIRS-------------------
  @Input()
  project: Project;
  workersForProject: ProjectWorker[];
  sumHoursStay: number[] = [];
  isAllDetails: boolean = false;
  toggle: boolean = false;


  //----------------CONSTRUCTOR------------------
  constructor(
    public teamleaderService: TeamleaderService, 
    public router: Router) {
  }


  ngOnInit(): void {
    if (this.project) {
      this.teamleaderService.getSumStayByProjectAndDepartment(this.project.projectId)
        .subscribe(res => {
          this.sumHoursStay = res;
        });
    }
  }

  showMoreDetails(event) {
    if (this.toggle == false) {
      this.teamleaderService.getUserBelongProject(event)
      .subscribe(res => {
        this.workersForProject = res;
        this.toggle = true
      });
    }
    else {
      this.toggle = false;
    }
  }

  showGraphHours(project: Project) {
    this.teamleaderService.projectGraph = project;
    this.router.navigate(['/teamLeader/graphStatusHoursProjects']);
  }

  changeSumHoursStay(num: { idDepartment: number, hours: number }) {
    this.sumHoursStay[num.idDepartment - 3] = num.hours;
  }
}
