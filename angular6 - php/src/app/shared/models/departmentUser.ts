import { User } from "./user";
import { HourForDepartment } from "./hourForDepartment";

export class DepartmentUser {
  id: number;
  department: string;
  hourForDepartment: HourForDepartment[] = []
  users: User[] = [];
}