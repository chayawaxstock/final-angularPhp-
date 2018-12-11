import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';
import { ProjectWorker } from '../models/projectWorker';
import { Graph } from '../models/graph';

@Injectable()
export class TeamleaderService {
 
  constructor(public httpClient:HttpClient) { }
  projectGraph:Project;

  getProjectTeamLeader(teamLeaderId:number):Observable<Project[]>
  {
    return this.httpClient.get<Project[]>(Global.baseURLPHP+"/project/getProjectsManager?teamLeaderId="+teamLeaderId);
  }

  getUserBelongProject(projectId:number):Observable<ProjectWorker[]>
  {
    return this.httpClient.get<ProjectWorker[]>(Global.baseURLPHP+"/projectworker/getUsersBelongProject?projectId="+projectId);
  }

 

  updateHours(worker:ProjectWorker): Observable<any> {   
  return this.httpClient.put(Global.baseURLPHP+"/projectworker/updateProjectHoursForUser",worker);
  } 

 getHourWorkerTeamLeader(userId: number,projectIdGraph:number): Observable<any[]>  {
  return this.httpClient.get<any[]>(Global.baseURLPHP+"/projectworker/getSumHoursDoneForUsers?teamLeaderId="+userId+"&projectId="+projectIdGraph);
  }

  getSumStayByProjectAndDepartment(idProject:number): Observable<any> {
   return this.httpClient.get(Global.baseURLPHP+"/projectworker/getSumStayByProjectAndDepartment?projectId="+idProject);
  }
 

}
