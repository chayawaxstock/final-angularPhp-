import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../shared/services/manager.service';
import { Global } from '../shared/services/global';
import { EditService } from '../shared/services/edit-service.service';

@Component({
  selector: 'app-is-show',
  templateUrl: './is-show.component.html',
  styleUrls: ['./is-show.component.css']
})
export class IsShowComponent implements OnInit {

  //----------------PROPERTIRS-------------------
  isShow: number = 0;

  //----------------CONSTRUCTOR------------------
  constructor(
    private managerService: ManagerService,
    private editService: EditService) { }

  //----------------METHODS-------------------
  ngOnInit() {
    this.managerService.subjectIsShow
      .subscribe(v => {
        this.isShow = Number(v);
        Global.idProjectToGetWorker = this.isShow;
        this.editService.data = [];
        this.editService.read();
      })
  }

}
