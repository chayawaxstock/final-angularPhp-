import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectWorker } from '../shared/models/projectWorker';
import { TeamleaderService } from '../shared/services/teamleader.service';
import swal from 'sweetalert2';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-project-worker-details-template',
  templateUrl: './project-worker-details-template.component.html',
  styleUrls: ['./project-worker-details-template.component.css']
})
export class ProjectWorkerDetailsTemplateComponent {

  //----------------PROPERTIRS-------------------
  Isng: boolean = true;
  hoursForProject: number;

  @Input() workerProject: ProjectWorker = new ProjectWorker();

  isEditHours: boolean = false
  workerToEditHours: ProjectWorker;

  @Input() sumHoursStay: number[] = [];

  @Output() changeSumHoursStay: EventEmitter<any> = new EventEmitter<any>();

  //----------------CONSTRUCTOR------------------
  constructor(
    public teamleaderService: TeamleaderService,
    private managerService: ManagerService) { }


  //----------------METHODS-------------------
  editHours(worker: ProjectWorker) {
    this.hoursForProject = worker.hoursForProject;

    swal({
      title: 'Change hoursForProject',
      input: 'number',
      inputValue: `${worker.hoursForProject}`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (num) => {
        this.hoursForProject = num;
        this.workerToEditHours = worker;
      },

      allowOutsideClick: () => !swal.isLoading()
    })
      .then((result) => {

        if (result.value) {
          if (this.checkNumStay(result.value) == true) {
            this.hoursForProject = result.value;
            this.updateHours();
          }
          else {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'num of hour stay to this department less than num hours to edit!'
            })
          }
        }
      })

  }

  checkNumStay(numHour: number): boolean {
    if (this.sumHoursStay[this.workerToEditHours.user.departmentId - 3] - numHour >= 0)
      return true;
    return false;
  }

  updateHours() {
    swal({
      title: `Are you sure you want to edit the hours to ${this.hoursForProject} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    })
      .then((result) => {
        if (result.value) {
          this.workerToEditHours.hoursForProject = this.hoursForProject;
          this.workerToEditHours.project = null;

          this.teamleaderService.updateHours(this.workerToEditHours)
            .subscribe(() => {
              this.changeSumHoursStay.emit({ idDepartment: this.workerToEditHours.user.departmentId, hours: this.hoursForProject })
              swal(
                `the hours update to ${this.hoursForProject}`
              )
            }, err => {
              this.managerService.getErrorMessage();
            })
        }
      })
  }
}

