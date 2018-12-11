
import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { Project } from '../shared/models/project';
import { Graph } from '../shared/models/graph';
@Component({
  selector: 'app-graph-status-hours-projects',
  templateUrl: './graph-status-hours-projects.component.html',
  styleUrls: ['./graph-status-hours-projects.component.css']
})

export class GraphStatusHoursProjectsComponent implements OnInit {

  //----------------PROPERTIRS-------------------
  barChartOptions: any;
  barChartLabels: any[] = [];
  barChartType: any;
  barChartLegend: any;
  barChartData: any[] = [];
  project: Project;
  messageEmpty: string;
  usersHours: any[] = [];

  //----------------CONSTRUCTOR------------------
  constructor(
    public workerService: WorkerService,
    public userService: UserService,
    public teamLeaderService: TeamleaderService) { }


  //----------------METHODS-------------------
  ngOnInit() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    this.project = this.teamLeaderService.projectGraph;

    this.teamLeaderService.getHourWorkerTeamLeader(this.userService.currentUser.userId, this.project.projectId)
      .subscribe(res => {
        if (res == null || res.length == 0) {
          this.messageEmpty = "no have data";
          return;
        }

        this.barChartLabels.push(this.project.projectName);
        res.forEach(
          (x) => {
            let g = new Graph();
            g.data.push(x.data);
            g.label = x.label;
            this.barChartData.push(g);
          });
      },
        err => {
          this.messageEmpty = "no have data";
        });;

    this.barChartType = 'bar';
    this.barChartLegend = true;
  }

}


