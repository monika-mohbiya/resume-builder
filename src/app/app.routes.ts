import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './auth-layout';
import { ComponentsComponent } from './components/components.component';
import { AuthLayoutComponent } from './auth-layout';
import { LoginComponent } from './components/auth/login/login.component';
import { canActivateGuard } from './can-activate.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResumeFormComponent } from './components/TempResume/resume-builder/resume-form/resume-form.component';
// import { ViewAnsSheetComponent } from './components/studentlist/view-ans-sheet/view-ans-sheet.component';
// import { AnswerKeyComponent } from './components/studentlist/answer-key/answer-key.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
        ],
    },
    {
        path: '',
        component: ComponentsComponent,
        canActivate: [canActivateGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'resume-form', component: ResumeFormComponent }
            // { path: 'answer-key', component: AnswerKeyComponent },
            // { path: 'views', component: ViewAnsSheetComponent },

        ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },


];
