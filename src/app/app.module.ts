import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { HomeComponent } from './layout/home/home.component';
import { BlogComponent } from './layout/blog/blog.component';
import { CooperationComponent } from './layout/cooperation/cooperation.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { DashboardAdminComponent } from './layout/dashboard-admin/dashboard-admin.component';
import { TrainingComponent } from './layout/training/training.component';
import { DietComponent } from './layout/diet/diet.component';
import { SupplementationComponent } from './layout/supplementation/supplementation.component';
import { ReportComponent } from './layout/report/report.component';
import { QuestionnaireComponent } from './layout/questionnaire/questionnaire.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostListComponent } from './layout/blog/post-list/post-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'wspolpraca', component: CooperationComponent },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegisterComponent },
  { path: 'panel', component: DashboardComponent },
  { path: 'panel-admin', component: DashboardAdminComponent },
  { path: 'trening', component: TrainingComponent },
  { path: 'dieta', component: DietComponent },
  { path: 'suplementacja', component: SupplementationComponent },
  { path: 'raport', component: ReportComponent },
  { path: 'ankieta', component: QuestionnaireComponent },
  { path: 'ustawienia', component: SettingsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    CooperationComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DashboardAdminComponent,
    TrainingComponent,
    DietComponent,
    SupplementationComponent,
    ReportComponent,
    QuestionnaireComponent,
    SettingsComponent,
    MenuComponent,
    FooterComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    ScullyLibModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
