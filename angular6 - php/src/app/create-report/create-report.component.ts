import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../shared/services/excel.service';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { ManagerService } from '../shared/services/manager.service';
import { ReportProject } from '../shared/models/reportProject';

@Component({
    selector: 'app-create-report',
    templateUrl: './create-report.component.html',
    styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent {

    //----------------PROPERTIRS-------------------
    reportProject: ReportProject[] = [];
    public products: any[] = this.reportProject;
    public checked = false;
    public filter: CompositeFilterDescriptor;
    public gridData: any;
    public state: State = {
        skip: 0,
        take: 5,
    };

    //----------------CONSTRUCTOR------------------
    constructor(
        public excelServise: ExcelService,
        public managerService: ManagerService) {
        //get data from report 1-projectReport
        this.managerService.createReport(1)
            .subscribe(res => {
                this.reportProject = res;
                this.gridData = this.reportProject;
            });
    }


    //----------------METHODS-------------------
    exportAsXLSX(): void {
        let projectReport = [];
        this.gridData.forEach((element: ReportProject) => {
            projectReport.push(element);
            element.items.forEach((department: ReportProject) => {
                projectReport.push(department);
                element.items.forEach((worker: ReportProject) => {
                    projectReport.push(worker);
                })
            })
        });

        this.excelServise.exportAsExcelFile(projectReport, 'reportProject');
    }

    //fillter
    public filterChange(filter: CompositeFilterDescriptor): void {
        this.filter = filter;
        this.gridData = filterBy(this.reportProject, filter);
    }

    public switchChange(checked: boolean): void {
        const root = this.filter || { logic: 'and', filters: [] };

        const [filter] = flatten(root).filter(x => x.field === 'isFinish');

        if (!filter) {
            root.filters.push({
                field: 'isFinish',
                operator: 'eq',
                value: checked
            });
        }
        else {
            filter.value = checked;
        }
        this.checked = checked;
        this.filterChange(root);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.reportProject, this.state);
    }

}



