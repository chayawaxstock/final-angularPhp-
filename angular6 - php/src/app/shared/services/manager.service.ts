import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Project } from '../models/project';
import { ProjectWorker } from '../models/projectWorker';
import swal from 'sweetalert2';

@Injectable()
export class ManagerService {

  userToEdit: User;
  subjectAllUsers= new Subject();
  subjectWorkerToProject=new Subject();
  subjectProject=new Subject();
  subjectIsShow=new Subject();
  workerToProject: Project;
  project: Project;
  isNew:boolean;
  isShow:boolean;
  constructor(public httpClient: HttpClient) { }


  getUsersByDepartment(depertmantName:string): Observable<User[]> {
      return this.httpClient.get<User[]>(Global.baseURLPHP+"/user/getUsersByDepartment?departmentName="+depertmantName)
  } 
  
  addUser(user: User): Observable<any> {
    user.userComputer='';
    return this.httpClient.post<any>(Global.baseURLPHP+"/user/addUser",user);
  }

   updateUser(user: User): Observable<any> {   
   return this.httpClient.put(Global.baseURLPHP+"/user/updateUser",user);
  }
  
  deleteUser(idUser: number): Observable<any> {
        return this.httpClient.post<any>(Global.baseURLPHP+"/user/deleteUser",{"userId":idUser});
    }

  deleteProject(projectId: number): Observable<any> {
      return this.httpClient.post<any>(Global.baseURLPHP+"/project/deleteProject",{"projectId":projectId});
  }

  createReport( idReport:number): Observable<any> {
     return this.httpClient.get(Global.baseURLPHP+"/project/createReports?idReport="+idReport);
    }
    
  addProject(project: Project): Observable<any> {
    console.log(project);
    debugger;
    return this.httpClient.post(Global.baseURLPHP+"/project/addProject",project);

  }

  editProjct(project: Project): Observable<any> 
  {
   project['finish']=project.isFinish?1:0;
    return this.httpClient.put(Global.baseURLPHP+"/project/updateProject",{"project":project});
  }
  
  getAllProjects(): Observable<Project[]> {

  
   return this.httpClient.get<Project[]>(Global.baseURLPHP+"/project/getAllProjects");
  }

  getWorkerNotInProject(projectId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURLPHP+"/projectworker/getWorkersNotInProject?projectId="+projectId);
  }

  addWorkersToProject(projectId:number,workers:ProjectWorker[]):Observable<any>
  {
    console.log(workers);
  return this.httpClient.put(Global.baseURLPHP+"/projectworker/addWorkersToProject?projectId="+projectId,{"workers":workers});
  }

  getWorkerInProject(projectId:number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURLPHP+"/projectworker/getWorkersInProject?projectId="+projectId)
  }

  getErrorMessage()
  {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong!', 
    })
  }
}
