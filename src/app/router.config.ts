import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { SessionPageComponent } from './session-page/session-page.component';

export const appRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'session/:id',      component: SessionPageComponent },
    { path: '**', redirectTo: '/' }
];
