import { Routes } from '@angular/router';

import { HomePageComponent } from './home/home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UserPlacePageComponent } from './userplace/user-place-page/user-place-page.component';
import { UserJoinComponent } from './user-join/user-join/user-join.component';

export const appRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'session/:sid', pathMatch: 'full', component: DashboardComponent },
    { path: 'session/:sid/join', pathMatch: 'full', component: UserJoinComponent },
    { path: 'session/:sid/user/:uid', component: UserPlacePageComponent },
    { path: '**', redirectTo: '/' }
];
