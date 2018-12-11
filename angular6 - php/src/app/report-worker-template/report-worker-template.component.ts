import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-report-worker-template',
  templateUrl: './report-worker-template.component.html',
  styleUrls: ['./report-worker-template.component.css']
})
export class ReportWorkerTemplateComponent   {

  @Input() pressents:any[];
  constructor() { }


}
