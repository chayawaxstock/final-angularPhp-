import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { EditService } from '../shared/services/edit-service.service';
import { map } from 'rxjs/operators/map';
import swal from 'sweetalert2';
import { ManagerService } from '../shared/services/manager.service';
import { User } from '../shared/models/user';


@Component({
    selector: 'app-workers-management',
    templateUrl: './workers-management.component.html',
    styleUrls: ['./workers-management.component.css']

})
export class WorkersManagementComponent implements OnInit {

       //----------------PROPERTIRS-------------------
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    public editDataItem: User;
    public isNew: boolean;
    private editService: EditService;
    @Input()
    isShow:number;

      //----------------CONSTRUCTOR------------------
    constructor(@Inject(EditService) editServiceFactory: any, public managerService: ManagerService) {
        this.editService = editServiceFactory();
    }

  //----------------METHODS-------------------
    public ngOnInit(): void {

        this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        this.editService.read();
        
    }

    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.read();
    }

    public addHandler() {
        this.editDataItem = new User();
        this.isNew = true;
    }

    public editHandler({ dataItem }) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(user: User) {
        this.managerService.addUser(user);
        this.editService.save(user, this.isNew);

        this.editDataItem = undefined;
    }

    public removeHandler({ dataItem }) {
        swal({
            title: `Are you sure you want to delete ${dataItem.userName}?`,
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                debugger;
                this.managerService.deleteUser(dataItem.userId)
                .subscribe(() => {
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    this.editService.remove(dataItem);
                }, err => {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: err.errors,

                    })
                });
            }
        })

    }
}
