import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BlogComponent } from './components/blog/blog.component';
import { CooperationComponent } from './components/cooperation/cooperation.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewPostComponent } from './components/blog/new-post/new-post.component';
import { PostComponent } from './components/blog/post/post.component';
import { SafePipe } from './safe.pipe';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent, data: { animation: 'Home' } },
  { path: 'o-mnie', component: AboutMeComponent, data: { animation: 'AboutMe' } },
  { path: 'blog', component: BlogComponent, data: { animation: 'Blog' } },
  { path: 'wspolpraca', component: CooperationComponent, data: { animation: 'Cooperation' } },
  { path: 'kontakt', component: ContactComponent, data: { animation: 'Contact' } },
  { path: 'nowy-post', component: NewPostComponent },
  { path: 'blog/:link', component: PostComponent, data: { animation: 'Post' } },
  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomePageComponent,
    AboutMeComponent,
    CooperationComponent,
    BlogComponent,
    ContactComponent,
    PageNotFoundComponent,
    FooterComponent,
    NewPostComponent,
    PostComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    RichTextEditorAllModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
