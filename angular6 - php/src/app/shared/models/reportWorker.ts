export class ReportWorker{
    id:number;
    name :string;
    department :string;
    year :number;
    month:number;
    totalHours :number
    sumHoursDoMonth :number;
    sumHoursDo :number;
    precentsDone :number;
    teamLeader :string
    items :ReportWorker[]=[];
}