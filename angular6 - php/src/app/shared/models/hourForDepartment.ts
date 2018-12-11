import { DepartmentUser } from "./departmentUser";
import { Project } from "./project";

export class HourForDepartment {

    projectId: number;
    departmentId: number;
    sumHours: number;
    project: Project ;
    departmentUser:DepartmentUser
}