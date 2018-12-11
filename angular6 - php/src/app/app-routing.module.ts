import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AuthGuard } from "./shared/auth.guard";
import { ManagerComponent } from "./manager/manager.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { AddWorkerToProjectComponent } from "./add-worker-to-project/add-worker-to-project.component";
import { AllProjectsComponent } from "./all-projects/all-projects.component";
import { WorkerComponent } from "./worker/worker.component";
import { TeamLeaderComponent } from "./team-leader/team-leader.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { GraphStatusHoursProjectsComponent } from "./graph-status-hours-projects/graph-status-hours-projects.component";
import { CreateReportComponent } from "./create-report/create-report.component";
import { EditProjectComponent } from "./edit-project/edit-project.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { WorkersManagementComponent } from "./workers-management/workers-management.component";
import { TasksOfWorkerComponent } from "./tasks-of-worker/tasks-of-worker.component";
import { SendEmailComponent } from "./send-email/send-email.component";
import { GraphStatusHourComponent } from "./graph-status-hour/graph-status-hour.component";
import { ReportWorkrtsComponent } from "./report-workrts/report-workrts.component";
import { IsShowComponent } from "./is-show/is-show.component";
import { AuthGuardManager } from "./shared/auth.guardManager";
import { AuthGuardTeamleader } from "./shared/auth.guardTeamleader";



const appRoutes: Routes = [
    { path: "home", component: SignInComponent },
    { path: "", component: SignInComponent },
    { path: "changePassword/:requestId", component: ChangePasswordComponent },
    { path: "changePassword", component: ChangePasswordComponent },
    { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard],
     children: [
            { path: 'showWorkers', component: WorkersManagementComponent, canActivate: [AuthGuard, AuthGuardManager] },
            { path: 'allUsers', component: IsShowComponent, canActivate: [AuthGuard, AuthGuardManager] },
            { path: 'editUser', component: UpdateUserComponent, canActivate: [AuthGuard, AuthGuardManager] },
            { path: 'addWorkerToProject', component: AddWorkerToProjectComponent, canActivate: [AuthGuard, AuthGuardManager] },
            { path: 'allProjects', component: AllProjectsComponent, canActivate: [AuthGuard, AuthGuardManager] },
            { path: 'reports', component: CreateReportComponent, canActivate: [AuthGuard, AuthGuardManager] },
            { path: 'editProject', component: EditProjectComponent, canActivate: [AuthGuard, AuthGuardManager] },
            { path: 'reportsWorker', component: ReportWorkrtsComponent, canActivate: [AuthGuard, AuthGuardManager] },
        ]
    },
    {   path: 'worker', component: WorkerComponent, canActivate: [AuthGuard], children: [
            { path: '', component: TasksOfWorkerComponent, canActivate: [AuthGuard] },
            { path: 'myTasks', component: TasksOfWorkerComponent, canActivate: [AuthGuard] },
            { path: 'conectManager', component: SendEmailComponent, canActivate: [AuthGuard] },
            { path: 'grafStatus', component: GraphStatusHourComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: 'teamLeader', component: TeamLeaderComponent, canActivate: [AuthGuard], children: [
            { path: '', component: ProjectDetailsComponent, canActivate: [AuthGuard, AuthGuardTeamleader] },
            { path: 'projectDetails', component: ProjectDetailsComponent, canActivate: [AuthGuard, AuthGuardTeamleader] },
            { path: 'graphStatusHoursProjects', component: GraphStatusHoursProjectsComponent, canActivate: [AuthGuard, AuthGuardTeamleader] },
        ]
    },
];

const appRouter = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [appRouter]
})
export class AppRoutingModule { }