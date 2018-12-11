export class ReportProject {
   id: number;
   name: string;
   customerName: string
   dateBegin: Date;
   dateEnd: Date;
   totalHours: number;
   sumHoursDo: number
   precentsDone: number
   daysleft: number
   isFinish: boolean
   teamLeader: string
   items: ReportProject[] = [];
}