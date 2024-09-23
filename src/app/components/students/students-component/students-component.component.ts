import { Component, OnInit } from '@angular/core';
import { StudentsServiceService } from "../../../services/students/students-service.service";
import { NgIf, NgFor } from "@angular/common";
import { Router } from '@angular/router';
import {Student} from "../../../interfaces/students/student";  // Import Router


@Component({
  selector: 'app-students-component',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './students-component.component.html',
  styleUrls: ['./students-component.component.css']
})

export class StudentsComponent implements OnInit {
  students: any = []; // Store student data
  errorMessage: string | null = null; // Store any error message
  loading: boolean = true; // Loading state to show/hide the loader
  selectedStudent: Student | null = null; // Store selected student details

  constructor(
    private studentsService: StudentsServiceService,
    private router: Router  // Inject Router here
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  // Fetch students using the service
  fetchStudents() {
    this.studentsService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
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
    this.router.navigate(['/students', admNo]);  // Navigate to the student details route
  }

  // Fetch a student by admNo
  getStudentByAdmNo(admNo: string) {
    this.loading = true; // Show loader while fetching the student
    this.studentsService.getStudentByAdmNo(admNo).subscribe({
      next: (student) => {
        this.selectedStudent = student; // Store the selected student's details
        this.loading = false;
        console.log('Selected student:', student);
      },
      error: (err) => {
        this.errorMessage = `Error fetching student with admNo: ${admNo}`;
        this.loading = false;
        console.error(err);
      }
    });
  }
}