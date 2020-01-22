import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BlogComponent } from './components/blog/blog.component';
import { CooperationComponent } from './components/cooperation/cooperation.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'start', component: HomePageComponent },
  { path: 'o-mnie', component: AboutMeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'wspolpraca', component: CooperationComponent },
  { path: 'kontakt', component: ContactComponent },
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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
