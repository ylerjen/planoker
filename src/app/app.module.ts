import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { appRoutes } from './router.config';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SessionPageComponent } from './dashboard/session-page/session-page.component';
import { HeaderComponent } from './common/header/header.component';
import { JoinSessionFormComponent } from './home/join-session-form/join-session-form.component';
import { CreateSessionFormComponent } from './home/create-session-form/create-session-form.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UserPlacePageComponent } from './userplace/user-place-page/user-place-page.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { PokerCardComponent } from './common/poker-card/poker-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SessionPageComponent,
    HeaderComponent,
    JoinSessionFormComponent,
    CreateSessionFormComponent,
    DashboardComponent,
    UserPlacePageComponent,
    UserListComponent,
    PokerCardComponent
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
