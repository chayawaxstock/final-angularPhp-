import { User } from "./user";
import { HourForDepartment } from "./hourForDepartment";
import { PresentDay } from "./pressentDay";

export class Project{
    projectId:number;
    projectName:string;
    customerName:string
    numHourForProject:number;
    dateBegin:Date;
    dateEnd:Date;
    isFinish:boolean;
    idManager:number;
    manager:User;
    hoursForDepartment:HourForDepartment[]=[];
    presentsDayUser:PresentDay[]=[]
   workers:User[]=[];

}