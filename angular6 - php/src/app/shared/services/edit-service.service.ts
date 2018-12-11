import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { User } from '../models/user';
import { Global } from './global';


const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {

    data: any[] = [];
    constructor(private http: HttpClient) {
        super([]);
    }

     read() {

        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

     save(data: any, isNew?: boolean) {

        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.reset();
        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }

     remove(data: any) {
        this.reset();
        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => this.read(), () => this.read());
    }

    reset() {
        this.data = [];
    }

     fetch(action: string = '', data?: any): Observable<any[]> {
         
        if (Global.idProjectToGetWorker == 0)
            return this.http.get(Global.baseURLPHP+"/user/getAllUsers")
                .pipe(map(res => <any[]>res));
        return this.http.get<User[]>(Global.baseURLPHP + "/projectworker/getWorkersInProject?projectId=" + Global.idProjectToGetWorker)
            .pipe(map(res => <any[]>res));

    }


    private serializeModels(data?: any): string {
        return data ? `&models=${JSON.stringify([data])}` : '';
    }
}