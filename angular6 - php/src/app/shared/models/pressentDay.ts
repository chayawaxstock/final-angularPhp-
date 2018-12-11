import { User } from "./user";
import { Project } from "./project";

export  class PresentDay{

    presentDayId :number
    timeBegin:Date;
    timeEnd :Date;
    sumHoursDay :number;
    userId :number;
    projectId :number;
     user:User ;
    project: Project;
}