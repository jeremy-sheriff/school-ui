import { Routes } from '@angular/router';
import { LandingPageComponentComponent } from './components/landing-page-component/landing-page-component.component';
import { LibraryComponentComponent } from './components/library-component/library-component.component';
import { StudentsComponent } from './components/students/students-component/students-component.component';
import {MyAuthGuard} from "./guards/my-auth.guard";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {StudentDetailComponent} from "./components/students/student-detail/student-detail.component";
import {StudentCreateComponent} from "./components/students/student-create/student-create.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponentComponent
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [MyAuthGuard], // Use the new guard
    data: {
      roles: ['library_role'],
      breadcrumb: 'students',
    }
  },
  {
    path: 'students/create',  // Add this route for student details
    component: StudentCreateComponent,
    canActivate: [MyAuthGuard],
    data: { roles: ['library_role'],
      breadcrumb: 'Student Creation'
    }
  },
  {
    path: 'students/:admNo',  // Add this route for student details
    component: StudentDetailComponent,
    canActivate: [MyAuthGuard],
    data: { roles: ['library_role'],
      breadcrumb: 'Student Details'
    }
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
