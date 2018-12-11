import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { DepartmentUser } from '../shared/models/departmentUser';
import { UserService } from '../shared/services/user.service';
import { HourForDepartment } from '../shared/models/hourForDepartment';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  //----------------PROPERTIRS-------------------
  projects: Project[] = [];
  project: Project;
  departments: DepartmentUser[] = [];

  //----------------CONSTRUCTOR------------------
  constructor(
    public managerService: ManagerService,
    public router: Router,
    private userService: UserService) { }


  //----------------METHODS-------------------
  ngOnInit() {
    this.getAllProjects();
    //get all project after add ,delete 
    this.managerService.subjectProject.subscribe(v => {
      this.getAllProjects();
    })
  }

  getAllProjects() {
    this.managerService.getAllProjects()
      .subscribe(res => {
        debugger;
        this.projects = res;
      });
  }

  deleteProject(id: number) {
    swal({
      title: 'Are you sure you want to delete this project?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        let indexProject = this.projects.findIndex(p => p.projectId == id)

        this.managerService.deleteProject(id)
          .subscribe(res => {
            this.projects.splice(indexProject, 1);
            swal(
              'Deleted!',
              'The worker has been deleted.',
              'success'
            )
            this.router.navigate(["/manager/allProjects"])
          },
            err => {
              this.managerService.getErrorMessage();
            })
      }
    })
  }

  addProject() {

    this.managerService.isNew = true;
    this.project = new Project();

    this.userService.getAllDepartments()
      .subscribe((departments) => {

        //get all worker department
        let departmentsWorker = departments.filter(x => x.id > 2);

        departmentsWorker.forEach((element: DepartmentUser) => {

          let departmentUser = new DepartmentUser();
          departmentUser.id = element.id;
          departmentUser.department = element.department;

          let hour = new HourForDepartment();
          hour.departmentId = element.id;
          hour.departmentUser = departmentUser;
          this.project.hoursForDepartment.push(hour);
        });
        this.project.dateBegin = new Date();
        this.project.dateEnd = new Date();
        this.managerService.project = this.project;
        this.router.navigate(["/manager/editProject"]);
      });
  }
}