import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BlogComponent } from './components/blog/blog.component';
import { CooperationComponent } from './components/cooperation/cooperation.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewPostComponent } from './components/blog/new-post/new-post.component';
import { PostComponent } from './components/blog/post/post.component';
import { SafePipe } from './safe.pipe';

const appRoutes: Routes = [
  { path: 'start', component: HomePageComponent },
  { path: 'o-mnie', component: AboutMeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'wspolpraca', component: CooperationComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: 'nowy-post', component: NewPostComponent },
  { path: 'blog/:link', component: PostComponent },
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
    NewPostComponent,
    PostComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    RichTextEditorAllModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
