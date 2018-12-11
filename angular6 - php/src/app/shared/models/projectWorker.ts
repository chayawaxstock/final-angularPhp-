import { User } from "./user";
import { Project } from "./project";

export class ProjectWorker {
    projectId: number;
    userId:number;
    projectName: string;
    hoursForProject: number;
    project: Project;
    user:User;
    sumHoursDone:number;

}