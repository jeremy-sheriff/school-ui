import { Routes } from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {AppComponent} from "./app.component";
import {LandingPageComponentComponent} from "./components/landing-page-component/landing-page-component.component";


export const routes: Routes = [
  {
    path: '/',
    component: AppComponent,
    canActivate: [AuthGuard]  // Protect this route with the AuthGuard
  }
];
