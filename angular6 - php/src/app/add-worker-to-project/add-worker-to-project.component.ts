import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { User } from '../shared/models/user';
import { ManagerService } from '../shared/services/manager.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ProjectWorker } from '../shared/models/projectWorker';

@Component({
  selector: 'app-add-worker-to-project',
  templateUrl: './add-worker-to-project.component.html',
  styleUrls: ['./add-worker-to-project.component.css']
})
export class AddWorkerToProjectComponent implements OnInit {

  project:Project;
  workesNotinProject:User[]=[];
  addWorker:User[]=[];
  workersAddToProject:ProjectWorker[]=[];

  constructor(
    public managerService:ManagerService,
    public router:Router ) { }

  ngOnInit(){
      this.project=this.managerService.workerToProject; 

       this.managerService.getWorkerNotInProject(this.project.projectId)
       .subscribe(res=>{
          this.workesNotinProject=res;
          res.forEach(x=>
            {
              let worker=new ProjectWorker();
              // worker.projectId=this.project.projectId,
              worker.userId=x.userId; 
              this.workersAddToProject.push(worker)
            });
        })    
  }

  //update hours for worker in project
  numHours(workerProject:ProjectWorker)
  {
    this.workersAddToProject.filter(x=>x.userId==workerProject.userId)[0].hoursForProject=workerProject.hoursForProject;
  }

  //save add worker to project
  saveChange()
  {
    this.workersAddToProject=this.workersAddToProject.filter(x=>x.hoursForProject>0);
    this.managerService.addWorkersToProject(this.project.projectId,this.workersAddToProject)
    .subscribe(res=>{
      swal({
        type: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500
      })
      //return to allProjects component
     this.router.navigate(["/manager/allProjects"]);
    },err=>{
      {
      this.managerService.getErrorMessage();
      }
    });
  }

}
