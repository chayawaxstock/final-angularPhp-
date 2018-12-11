import { Component } from '@angular/core';
import { ExcelService } from '../shared/services/excel.service';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { ManagerService } from '../shared/services/manager.service';
import { ReportWorker } from '../shared/models/reportWorker';


@Component({
    selector: 'app-report-workers',
    templateUrl: './report-workrts.component.html',
    styleUrls: ['./report-workrts.component.css']
})
export class ReportWorkrtsComponent {

    //----------------PROPERTIRS-------------------
    reportWorker: ReportWorker[] = [];
    public state: State = {
        skip: 0,
        take: 5,
    };
    public products: any[] = this.reportWorker;
    public checked = false;
    public filter: CompositeFilterDescriptor;
    public gridData: any;

    //----------------CONSTRUCTOR------------------
    constructor(
        public excelServise: ExcelService,
        public managerService: ManagerService) {

        this.managerService.createReport(2)
        .subscribe(res => {
            debugger;
            this.reportWorker = res;
            this.gridData = this.reportWorker;
        });
    }

    //----------------METHODS-------------------
    exportAsXLSX(): void {
        let workersReport = [];
        this.gridData.forEach((element: ReportWorker) => {
            workersReport.push(element);
            element.items.forEach((department: ReportWorker) => {
                workersReport.push(department);  
            })
        });

        this.excelServise.exportAsExcelFile(workersReport, 'reportProject');
    }

    public filterChange(filter: CompositeFilterDescriptor): void {
        this.filter = filter;
        this.gridData = filterBy(this.reportWorker, filter);
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

    public allData(): ExcelExportData {
        debugger;
        const result: ExcelExportData = {
            data: process(this.reportWorker, { group: this.group, sort: [{ field: 'ProductID', dir: 'asc' }] }).data,
            group: this.group
        };

        return result;
    }

    public group: any[] = [{
        field: 'id'
    }];

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.reportWorker, this.state);
    }

}
