import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-project-team-leader',
  templateUrl: './project-team-leader.component.html',
  styleUrls: ['./project-team-leader.component.css']
})
export class ProjectTeamLeaderComponent implements OnInit {

  projects: Project[] = [];
  constructor(
    public teamLeaderService: TeamleaderService,
    public userService: UserService) { }

  ngOnInit() {
    this.teamLeaderService.getProjectTeamLeader(this.userService.currentUser.userId)
      .subscribe(res => {
        this.projects = res;
      });
  }

}
