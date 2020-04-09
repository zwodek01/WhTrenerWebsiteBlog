import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { WebsiteComponent } from './website/website.component';
import { HomeComponent } from './website/home/home.component';
import { BlogComponent } from './website/blog/blog.component';
import { CooperationComponent } from './website/cooperation/cooperation.component';
import { ContactComponent } from './website/contact/contact.component'
import { LoginComponent } from './website/login/login.component';
import { UserLoggedGuard } from './guards/user-logged.guard';
import { RegisterComponent } from './website/register/register.component';
import { AppAreaComponent } from './app-area/app-area.component';
import { DashboardComponent } from './app-area/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './website/forgot-password/forgot-password.component';
import { DashboardAdminComponent } from './app-area/dashboard-admin/dashboard-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { DietComponent } from './app-area/diet/diet.component';
import { TrainingComponent } from './app-area/training/training.component';
import { SupplementationComponent } from './app-area/supplementation/supplementation.component';
import { ReportComponent } from './app-area/report/report.component';
import { QuestionnaireComponent } from './app-area/questionnaire/questionnaire.component';
import { SettingsComponent } from './app-area/settings/settings.component';


const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      { path: '', component: HomeComponent },

      { path: 'blog', component: BlogComponent },
      { path: 'wspolpraca', component: CooperationComponent },
      { path: 'kontakt', component: ContactComponent },
      {
        path: 'logowanie',
        component: LoginComponent,
        canActivate: [UserLoggedGuard]
      },
      {
        path: 'rejestracja',
        component: RegisterComponent,
        canActivate: [UserLoggedGuard]
      },
      {
        path: 'przypomnij-haslo',
        component: ForgotPasswordComponent,
        canActivate: [UserLoggedGuard]
      }
    ]
  },
  {
    path: '',
    component: AppAreaComponent,
    children: [
      {
        path: 'panel',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'lista',
        component: DashboardAdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'trening',
        component: TrainingComponent,
        canActivate: [AuthGuard]
      },
      { path: 'dieta', component: DietComponent, canActivate: [AuthGuard] },
      {
        path: 'suplementacja',
        component: SupplementationComponent,
        canActivate: [AuthGuard]
      },
      { path: 'raport', component: ReportComponent, canActivate: [AuthGuard] },
      {
        path: 'ankieta',
        component: QuestionnaireComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ustawienia',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
