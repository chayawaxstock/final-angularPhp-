import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  //----------------PROPERTIRS-------------------
  projects: Project[];

  //----------------CONSTRUCTOR------------------
  constructor(
    public teamLeaderService: TeamleaderService,
    public userService: UserService) { }

  //----------------METHODS-------------------
  ngOnInit() {
    this.teamLeaderService.getProjectTeamLeader(this.userService.currentUser.userId).subscribe(res => {
      this.projects = res;
    });
  }

}
