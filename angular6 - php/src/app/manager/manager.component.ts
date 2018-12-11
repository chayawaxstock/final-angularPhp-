import { Component, Input } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { Global } from '../shared/services/global';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent  {



     //----------------PROPERTIRS-------------------
  projects: Project[] = [];
  @Input() loginInfo: User;

    //----------------CONSTRUCTOR------------------
  constructor(
    public managerService: ManagerService, 
    public router: Router) { }


      //----------------METHODS-------------------
  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }

  allUsers() {
    Global.idProjectToGetWorker = 0;
    this.managerService.subjectIsShow.next(0);
  }

 
}
