import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresentDay } from '../models/pressentDay';
import { Observable, Subject } from 'rxjs';
import { Global } from './global';
import { SendEmail } from '../models/sendEmail';
import { ProjectWorker } from '../models/projectWorker';


@Injectable()
export class WorkerService {
 
  timerSubject=new Subject();
  constructor(public httpClient:HttpClient) { }
  
  updateDayPressent(pressentDay:PresentDay): Observable<any> {
      return this.httpClient.put(Global.baseURLPHP+"/presenceday/updatePresenceDayWorker",pressentDay)
    }

  sendEmail(message: SendEmail,userId:number): Observable<any> {
   return this.httpClient.put(Global.baseURLPHP+"/user/sendMessageToManagers?userId="+userId,message );
  }

  addPresentDay(pressantDay: PresentDay): Observable<any> {
    debugger;
   return this.httpClient.post(Global.baseURLPHP+"/presenceday/addPresent",pressantDay);
  }

  getTasksOfWorker(userId):Observable<ProjectWorker[]>{
    return this.httpClient.get<ProjectWorker[]>(Global.baseURLPHP+"/projectworker/getProjectsByUserId?userId="+userId);
  }
   
}
