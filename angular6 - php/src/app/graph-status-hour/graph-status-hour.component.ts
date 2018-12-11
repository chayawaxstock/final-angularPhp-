import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { ProjectWorker } from '../shared/models/projectWorker';

@Component({
  selector: 'app-graph-status-hour',
  templateUrl: './graph-status-hour.component.html',
  styleUrls: ['./graph-status-hour.component.css']
})
export class GraphStatusHourComponent implements OnInit {

  //----------------PROPERTIRS-------------------
  barChartOptions: any;
  barChartLabels: any[] = [];
  barChartType: any;
  barChartLegend: any;
  barChartData: any[] = [];
  projects: ProjectWorker[] = [];

  //----------------CONSTRUCTOR------------------
  constructor(
    public workerService: WorkerService,
    public userService: UserService) { }


  //----------------METHODS-------------------
  ngOnInit() {
    this.barChartData = [
      { data: [], label: 'hours done' },
      { data: [], label: 'Hours required' }
    ];

    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    this.userService.getHoursForProjectsByUser(this.userService.currentUser.userId)
      .subscribe(res => {

        this.workerService.getTasksOfWorker(this.userService.currentUser.userId)

          .subscribe(res => {
            if (res)
              res.forEach((x) => {
                this.barChartLabels.push(x.project.projectName);
                this.barChartData[0].data.push(x.sumHoursDone);
                this.barChartData[1].data.push(x.hoursForProject);
              });

          });;
      })

    this.barChartType = 'bar';
    this.barChartLegend = true;
  }
}
