// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
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
import { AdminGuard } from './guards/admin.guard';
import { AppRoutingModule } from './app-routing.module';
import 'firebase/firestore';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './website/home/home.component';
import { BlogComponent } from './website/blog/blog.component';
import { CooperationComponent } from './website/cooperation/cooperation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './website/login/login.component';
import { RegisterComponent } from './website/register/register.component';
import { DashboardComponent } from './app-area/dashboard/dashboard.component';
import { DashboardAdminComponent } from './app-area/dashboard-admin/dashboard-admin.component';
import { TrainingComponent } from './app-area/training/training.component';
import { DietComponent } from './app-area/diet/diet.component';
import { SupplementationComponent } from './app-area/supplementation/supplementation.component';
import { ReportComponent } from './app-area/report/report.component';
import { QuestionnaireComponent } from './app-area/questionnaire/questionnaire.component';
import { SettingsComponent } from './app-area/settings/settings.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogPipe } from './website/blog/blog.pipe';
import { ForgotPasswordComponent } from './website/forgot-password/forgot-password.component';
import { VeryfiEmailComponent } from './website/veryfi-email/veryfi-email.component';
import { ChangeNamePopupComponent } from './components/popups/change-name-popup/change-name-popup.component';
import { ChangeEmailPopupComponent } from './components/popups/change-email-popup/change-email-popup.component';
import { ChangePasswordPopupComponent } from './components/popups/change-password-popup/change-password-popup.component';
import { DeleteAccountPopupComponent } from './components/popups/delete-account-popup/delete-account-popup.component';
import { WebsiteComponent } from './website/website.component';
import { AppAreaComponent } from './app-area/app-area.component';
import { ContactComponent } from './website/contact/contact.component';
import { FabComponent } from './components/fab/fab.component';

// ANGULAR MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { VerifyPopupComponent } from './components/popups/verify-popup/verify-popup.component';
import { RegisterPopupComponent } from './components/popups/register-popup/register-popup.component';
import { ForgotPopupComponent } from './components/popups/forgot-popup/forgot-popup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContactPopupComponent } from './components/popups/contact-popup/contact-popup.component';

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
    ForgotPopupComponent,
    ChangeNamePopupComponent,
    ChangeEmailPopupComponent,
    ChangePasswordPopupComponent,
    DeleteAccountPopupComponent,
    WebsiteComponent,
    AppAreaComponent,
    ContactComponent,
    FabComponent,
    ContactPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
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
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  providers: [
    AngularFirestore,
    VerifyPopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
