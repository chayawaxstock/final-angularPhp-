import { DepartmentUser } from "./departmentUser";
import { Project } from "./project";
import { PresentDay } from "./pressentDay";

export class User{
    userId:number;
    userName:string;
    password:string;
    confirmPassword:string;
    email:string;
    userComputer:string;
    numHoursWork:number;
    managerId?:number;
    departmentId:number;
    departmentUser:DepartmentUser;
    projects:Project[]=[];
    manager:User;
    PresentsDayUser:PresentDay;
    users:User[]=[];
}