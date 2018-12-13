import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { createValidatorNumber, DepartmentEnum, createValidatorText, validatePassword } from '../shared/validators/user.validation';
import { User } from '../shared/models/user';
import { DepartmentUser } from '../shared/models/departmentUser';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from '../shared/services/manager.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { EditService } from '../shared/services/edit-service.service';
import sha256 from 'async-sha256';


@Component({
    selector: 'kendo-grid-edit-form',
    styles: [
        'input[type=text] { width: 100%; }'
    ],
    templateUrl: './edit-form.component.html'
})

export class GridEditFormComponent {

    //----------------PROPERTIRS-------------------
    editService: EditService;
    formGroup: FormGroup;
    obj: typeof Object = Object;
    departments: Array<{ text: string, value: number }> = [];
    usersByDepartments: Array<{ text: string, value: number }> = [];
    public active = false;
    public emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    defaultItem: { text: string, value: number };
    defaultItemTeamleader: { text: string, value: number };
    user: User = new User();

    @Input() public isNew = false;

    @Input() public set model(user: User) {
        if (user != undefined) {
            this.managerService.userToEdit = user;
            this.user = user;

            if (this.isNew == false) {
                this.defaultItem = { text: user.departmentUser.department, value: user.departmentUser.id };
                this.defaultItemTeamleader = { text: user.manager.userName, value: user.manager.userId };
            }
            else {
                this.defaultItem = { text: '', value: null };
                this.defaultItemTeamleader = { text: '', value: null };
                this.formGroup.addControl("password", new FormControl('', createValidatorText("password", 8, 8)))
                this.formGroup.addControl("confirmPassword", new FormControl('', createValidatorText("confirmPassword", 8, 8)))
                this.formGroup.setValidators(validatePassword);
            }
            this.formGroup.reset(user);
        }
        this.active = user !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<User> = new EventEmitter();


    //----------------CONSTRUCTOR------------------
    constructor(
        public userService: UserService,
        public managerService: ManagerService,
        public router: Router,
        @Inject(EditService) editServiceFactory: any) {

        this.editService = editServiceFactory();
        userService.getAllDepartments()
            .subscribe(departments => {
                departments.forEach((element: DepartmentUser) => {
                    this.departments.push({ text: element.department, value: element.id })
                });
            });

        let formGroupConfig = {
            'userName': new FormControl('', createValidatorText("userName", 2, 15)),
            'email': new FormControl("", createValidatorText("email", 5, 30, this.emailPattern)),
            'numHoursWork': new FormControl("", createValidatorNumber("numHoursWork", 4, 9)),
            'departmentId': new FormControl("", [Validators.required]),
            'managerId': new FormControl(),

        };
        this.formGroup = new FormGroup(formGroupConfig);
    }


    //----------------METHODS-------------------
    public onSave(e): void {
        e.preventDefault();
        if (this.isNew == false) {
            this.formGroup.value.userId = this.managerService.userToEdit.userId;
            this.managerService.updateUser(this.formGroup.value)
                .subscribe(
                    res => {
                        swal({
                            type: 'success',
                            title: 'Success!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        e.preventDefault();
                        this.save.emit(this.formGroup.value);
                    },
                    err => {
                        this.managerService.getErrorMessage();
                    });
        }
        //add new
        else {
            sha256(this.formGroup.value.password)
                .then(p => {
                    this.formGroup.value.password = p;
                    sha256(this.formGroup.value.confirmPassword)
                        .then(pass => {
                            this.formGroup.value.confirmPassword = pass;

                            this.managerService.addUser(this.formGroup.value)
                                .subscribe(res => {
                                    swal({
                                        type: 'success',
                                        title: 'Success adding worker!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    this.formGroup.reset();
                                    e.preventDefault();

                                    this.save.emit(this.formGroup.value);
                                }, err => {
                                    this.managerService.getErrorMessage();
                                });
                        });
                });
            this.active = false;
        }
    }
    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();

    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }

    chooseDepartment(value: any) {
        this.usersByDepartments = [];
        this.defaultItemTeamleader = { text: "", value: null };//not work remove default value

        //tamLeader
        if (value == DepartmentEnum.TEAMLEADER) {
            this.managerService.getUsersByDepartment("manager")
                .subscribe(users => {
                    users.forEach((element: User) => {
                        this.usersByDepartments.push({ text: element.userName, value: element.userId })
                    });
                });
            this.defaultItemTeamleader.text = this.user.manager.userName;

        }
        //manager
        else if (value != DepartmentEnum.MANAGER) {
            this.managerService.getUsersByDepartment("teamLeader")
                .subscribe(users => {
                    users.forEach((element: User) => {
                        this.usersByDepartments.push({ text: element.userName, value: element.userId })
                    });
                });

            if (this.isNew == false)
                this.defaultItemTeamleader.text = this.user.manager.userName;
        }
        else {
            this.usersByDepartments = [];

        }
    }
}

