import { Routes } from '@angular/router';
import { LandingPageComponentComponent } from './components/landing-page-component/landing-page-component.component';
import { LibraryComponentComponent } from './components/library-component/library-component.component';
import { StudentsComponent } from './components/students/students-component/students-component.component';
import {MyAuthGuard} from "./guards/my-auth.guard";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {StudentDetailComponent} from "./components/students/student-detail/student-detail.component";
import {StudentCreateComponent} from "./components/students/student-create/student-create.component";
import {BorrowedBooksComponent} from "./components/library/borrowed-books/borrowed-books.component";
import {ReturnBooksComponent} from "./components/library/return-books/return-books.component";
import {CourseComponentComponent} from "./components/courses/course-component/course-component.component";
import {ExamsComponent} from "./components/exams/exams.component";

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
    path: 'library/borrowed-books',
    component: BorrowedBooksComponent,
    canActivate: [MyAuthGuard],
    data: { roles: ['library_role'] }
  },
  {
    path: 'library/return-books',
    component: ReturnBooksComponent,
    canActivate: [MyAuthGuard],
    data: { roles: ['library_role'] }
  },


  //COURSE MICRO SERVICE
  {
    path: 'courses',
    component: CourseComponentComponent,
    canActivate: [MyAuthGuard],
    data: { roles: ['course_role'] }
  },

  // EXAM MICRO SERVICE
  {
    path: 'exams',
    component: ExamsComponent,
    canActivate: [MyAuthGuard],
    data: { roles: ['exam_role'] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
];
