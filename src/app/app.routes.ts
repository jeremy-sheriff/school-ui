import { Routes } from '@angular/router';
import { LandingPageComponentComponent } from './components/landing-page-component/landing-page-component.component';
import { LibraryComponentComponent } from './components/library-component/library-component.component';
import { StudentsComponentComponent } from './components/students-component/students-component.component';
import {MyAuthGuard} from "./guards/my-auth.guard";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";

export const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponentComponent,
    canActivate: [MyAuthGuard], // Use the new guard
    data: { roles: ['admin', 'student'] } // Example roles required
  },
  {
    path: 'students',
    component: StudentsComponentComponent,
    canActivate: [MyAuthGuard], // Use the new guard
    data: { roles: ['library_role'] } // Example roles required
  },
  {
    path: 'library',
    component: LibraryComponentComponent,
    canActivate: [MyAuthGuard],
    data: { roles: ['library_role'] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
];
