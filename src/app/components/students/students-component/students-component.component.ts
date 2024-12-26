import { Component, OnInit } from '@angular/core';
import { StudentsServiceService } from "../../../services/students/students-service.service";
import {NgIf, NgFor, NgClass} from "@angular/common";
import { Router } from '@angular/router';
import { Student } from "../../../interfaces/students/student";
import {FormsModule} from "@angular/forms";
import {KeycloakService} from "keycloak-angular";
import {CoursesService} from "../../../services/courses/courses-service";


@Component({
  selector: 'app-students-component',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgClass,],
  templateUrl: './students-component.component.html',
  styleUrls: ['./students-component.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = []; // Store student data
  errorMessage: string | null = null; // Store any error message
  loading: boolean = true; // Loading state to show/hide the loader
  selectedStudent: Student | undefined; // Store selected student details
  showDeleteModal = false;
  selectedStudentToDelete: Student | null = null;
  showUpdateModal = false; // New variable to control update modal visibility
  updatedStudent: Student = {id:1,admNo:"",name:""}; // Store the student being updated
  showCreateModal: boolean = false;
  newStudent = {name:"",admNo:"",course:0}
  courses:any
  isClosing = false;
  creatingStudent:boolean = false;

  // Pagination properties
  page = 0; // Current page index
  size = 7; // Page size
  totalPages = 1; // Total number of pages
  totalElements = 0; // Total number of students


  // Flag to enable/disable delete button based on roles
  canDelete = false;


  constructor(
    private studentsService: StudentsServiceService,
    private router: Router,
    private coursesService: CoursesService,
    private keycloakService: KeycloakService,  // Add KeycloakService
  ) {

    console.log("Hello constructor")
    this.coursesService.getUnPaginatedCourses().subscribe({
      next: (response:any) => {
        this.courses = response;
      },
      error: (err) => {},
    })
  }

  ngOnInit(): void {
    this.fetchStudents(this.page, this.size);
    const userRoles = this.keycloakService.getUserRoles();
    this.canDelete = userRoles.includes('admin_role');
  }


  // Method to open update modal
  confirmUpdate(student: Student) {
    this.updatedStudent = { ...student } as Student; // Clone the student to prevent direct mutation
    this.showUpdateModal = true;
  }

  // Method to handle saving updates
  saveUpdate() {
    if (this.updatedStudent) {
      this.studentsService.updateStudent(this.updatedStudent).subscribe(() => {
        this.fetchStudents(this.page, this.size); // Refresh the list after update
        this.showUpdateModal = false; // Hide the modal
        this.updatedStudent = {id:1,admNo:"",name:""}; // Clear updated student
      }, error => {
        console.error('Error updating student:', error);
        // Optionally show an error message
      });
    }
  }

  // Method to cancel update and close modal
  cancelUpdate() {
    this.showCreateModal = false;
  }





  // Fetch students with pagination
  fetchStudents(page: number, size: number) {
    this.loading = true;
    this.studentsService.getStudents(page, size).subscribe({
      next: (response) => {
        this.students = response;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false; // Hide loader when data is fetched
      },
      error: (err) => {
        this.errorMessage = 'Error fetching students';
        this.loading = false; // Hide loader on error
        console.error(err);
      }
    });
  }

  // Method to navigate to student details page
  viewStudentDetails(admNo: string) {
    this.router.navigate(['/students', admNo]);
  }

  // Fetch a student by admNo
  getStudentByAdmNo(admNo: string) {
    this.loading = true;
    this.studentsService.getStudentByAdmNo(admNo).subscribe({
      next: (student) => {
        this.selectedStudent = student;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = `Error fetching student with admNo: ${admNo}`;
        this.loading = false;
        console.error(err);
      }
    });
  }

  confirmDelete(student: any) {
    this.selectedStudent = student;
    this.showDeleteModal = true;
  }

  deleteConfirmed() {
    this.studentsService.deleteStudent(this.selectedStudent).subscribe(() => {
      this.fetchStudents(this.page, this.size); // Refresh the list after deletion
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.selectedStudentToDelete = null;
  }

  // Change page
  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.fetchStudents(this.page, this.size);
    }
  }

  // Open modal to create a book
  openModal() {
    this.showCreateModal = true;
  }

  closeModal() {
    this.isClosing = true;  // Start the closing animation
    setTimeout(() => {
      this.showCreateModal = false;  // Hide the modal after the animation
      this.isClosing = false;  // Reset the closing state
      this.newStudent = { name: '', admNo: '',course: 0}; // Reset the form
    }, 500);  // Match the duration of your closing animation (0.5s)
  }

  registerNewStudent() {
    if(this.newStudent.name!=="" && this.newStudent.admNo!=="" && this.newStudent.course!==null){
      this.creatingStudent = true;
      this.newStudent = {
        name:this.newStudent.name,
        admNo:this.newStudent.admNo,
        course:parseInt(String(this.newStudent.course), 10),
      }

      // Call the service to post the student data
      this.studentsService.saveNewStudent(this.newStudent).subscribe({
        next:(response:any)=>{
        this.closeModal()
        this.fetchStudents(0,10)

        console.log('Student saved successfully', response);
        this.router.navigate(['/students']);  // Navigate to the students list after successful save
        this.creatingStudent = false;
      },
        error:(error:any)=>{
          this.creatingStudent = false;
        }
      });
    }
  }
}
