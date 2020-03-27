// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthGuard } from './guards/auth.guard';
import { UserLoggedGuard } from './guards/user-logged.guard';
import 'firebase/firestore';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { BlogComponent } from './layout/blog/blog.component';
import { CooperationComponent } from './layout/cooperation/cooperation.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
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
import { BlogPipe } from './layout/blog/blog.pipe';
import { ForgotPasswordComponent } from './layout/forgot-password/forgot-password.component';
import { VeryfiEmailComponent } from './layout/veryfi-email/veryfi-email.component';

// ANGULAR MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { VerifyPopupComponent } from './components/popups/verify-popup/verify-popup.component';
import { RegisterPopupComponent } from './components/popups/register-popup/register-popup.component';
import { ForgotPopupComponent } from './components/popups/forgot-popup/forgot-popup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// ROUTES
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'wspolpraca', component: CooperationComponent },
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
  { path: 'panel', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'panel-admin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard]
  },
  { path: 'trening', component: TrainingComponent, canActivate: [AuthGuard] },
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
  },
  {
    path: 'przypomnij-haslo',
    component: ForgotPasswordComponent,
    canActivate: [UserLoggedGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

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
    BlogPipe,
    ForgotPasswordComponent,
    VeryfiEmailComponent,
    VerifyPopupComponent,
    RegisterPopupComponent,
    ForgotPopupComponent
  ],
  imports: [
    BrowserModule,
    ScullyLibModule,
    RouterModule.forRoot(appRoutes, routerOptions),
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatDialogModule
  ],
  providers: [MenuComponent, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
