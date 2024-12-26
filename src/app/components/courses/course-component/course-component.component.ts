import { Component } from '@angular/core';
import {CoursesService} from "../../../services/courses/courses-service";
import {LibraryService} from "../../../services/library/library.service";
import {Course} from "../../../interfaces/courses/course";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DepartmentService} from "../../../services/departments/department.service";
import { faClipboard, faHome, faBook, faUsers, faGraduationCap, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-course-component',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './course-component.component.html',
  styleUrl: './course-component.component.css'
})
export class CourseComponentComponent {
  courses: Course[] = []; // Store book data
  showModal: boolean = false; // State to control the modal visibility
  showDepartmentModal: boolean = false; // State to control the modal visibility
  isClosing = false;
  newCourse = {name:"",departmentId:""}
  department = {id:1,name:""}
  departments:any;
  loading: boolean = false // Loading state to show/hide the loader
  creatingCourse: boolean = false // Loading state to show/hide the loader
  creatingDepartment: boolean = false // Loading state to show/hide the loader


  faHome = faHome;
  faStudents = faUsers;
  faLibrary = faBook;
  faCourses = faGraduationCap;
  faLogout = faSignOutAlt;
  faClipboard = faClipboard;

  page = 0; // Current page index
  size = 10; // Page size
  totalPages = 1; // Total number of pages
  totalElements = 0; // Total number of courses

  constructor(
    private coursesService: CoursesService,
    private departmentService: DepartmentService,
    ) {
    this.getDepartments(this.page, this.size);
    this.getCourses(this.page, this.size)
  }





  getDepartments(page: number, size: number) {
      this.departmentService.getDepartments(page, size).subscribe({
        next: (response:any) => {
          this.departments = response;
        },
        error: (err) => {}
      })
  }


  getCourses(page: number, size: number) {
    this.loading = true;
    this.coursesService.getCourses(page, size).subscribe({
      next: (response:any) => {
        this.courses = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  // Open modal to create a book
  openModal() {
    this.showModal = true;
  }

  openDepartmentModal() {
    this.showDepartmentModal = true;
  }

  closeDepartmentModal() {
    this.isClosing = true;  // Start the closing animation
    setTimeout(() => {
      this.showDepartmentModal = false;  // Hide the modal after the animation
      this.isClosing = false;  // Reset the closing state
      // this.newCourse = { name: '', departmentId: ''}; // Reset the form
    }, 500);  // Match the duration of your closing animation (0.5s)
  }

  closeModal() {
    this.isClosing = true;  // Start the closing animation
    setTimeout(() => {
      this.showModal = false;  // Hide the modal after the animation
      this.isClosing = false;  // Reset the closing state
      this.newCourse = { name: '', departmentId: ''}; // Reset the form
    }, 500);  // Match the duration of your closing animation (0.5s)
  }

  createNewCourse() {
    if (this.newCourse.name && this.newCourse.departmentId) {
      this.creatingCourse = true;
      this.newCourse = {
        name: this.newCourse.name,
        departmentId: this.newCourse.departmentId
      };
      this.coursesService.createCourse(this.newCourse).subscribe({
        next: (response:any) => {
          this.closeModal();
          this.creatingCourse = false;
          this.getCourses(0,10)
        },
        error: (err) => {
          alert("Error adding new course");
          this.creatingCourse = false;
        }
      })
    }
  }

  createNewDepartment() {
    if (this.department.name) {
      this.creatingDepartment = true;
      this.department = {
        id:1,
        name: this.department.name
      };
      this.departmentService.createDepartment(this.department).subscribe({
        next: (response:any) => {
          console.log(response);
          this.creatingDepartment = false;
          this.closeDepartmentModal();
          // this.getCourses(0,10)
        },
        error: (err) => {
          console.log(`Error adding new Department ${err}`);
          this.creatingDepartment = false;
        }
      })
    }
  }

  // Change page
  // loading: any;
  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.getCourses(this.page, this.size);
    }
  }
}
