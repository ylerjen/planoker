import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { appRoutes } from './router.config';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SessionPageComponent } from './session-page/session-page.component';
import { HeaderComponent } from './common/header/header.component';
import { JoinSessionFormComponent } from './join-session-form/join-session-form.component';
import { CreateSessionFormComponent } from './create-session-form/create-session-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SessionPageComponent,
    HeaderComponent,
    JoinSessionFormComponent,
    CreateSessionFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
