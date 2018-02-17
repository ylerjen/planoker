import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { appRoutes } from './router.config';
import { globalState } from './stores/app.state';
import { UserEffects } from './effects/user.effect';
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
import { FooterComponent } from './common/footer/footer.component';
import { GeneratorService } from './services/generator/generator.service';
import { FirebaseService } from './services/firebase/firebase.service';
import { UserItemComponent } from './dashboard/user-item/user-item.component';

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
    PokerCardComponent,
    FooterComponent,
    UserItemComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    NgbModule.forRoot(),
    EffectsModule.forRoot([UserEffects]),
    BrowserModule,
    HttpModule,
    StoreModule.forRoot(globalState),
    StoreDevtoolsModule.instrument({
      // for redux debug => storeDevtools instrument
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [GeneratorService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
