import { Routes } from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {AppComponent} from "./app.component";
import {LandingPageComponentComponent} from "./components/landing-page-component/landing-page-component.component";

import {LibraryComponentComponent} from "./components/library-component/library-component.component";
import {StudentsComponentComponent} from "./components/students-component/students-component.component";


export const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students',
    component: StudentsComponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    component: LibraryComponentComponent,
    canActivate: [AuthGuard]
  }
];
