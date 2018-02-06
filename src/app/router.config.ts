import { Routes } from '@angular/router';

import { HomePageComponent } from './home/home-page/home-page.component';
import { SessionPageComponent } from './dashboard/session-page/session-page.component';
import { UserPlacePageComponent } from './userplace/user-place-page/user-place-page.component';

export const appRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'session/:sid', pathMatch: 'full', component: SessionPageComponent },
    { path: 'session/:sid/user/:uid', component: UserPlacePageComponent },
    { path: '**', redirectTo: '/' }
];
