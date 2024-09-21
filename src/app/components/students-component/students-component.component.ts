import { Component, OnInit } from '@angular/core';
import { StudentsServiceService } from "../../services/students/students-service.service";
import { NgIf, NgFor } from "@angular/common";
import {Student} from "../../interfaces/students/student";

@Component({
  selector: 'app-students-component',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './students-component.component.html',
  styleUrls: ['./students-component.component.css']
})

export class StudentsComponentComponent implements OnInit {
  students: Student[] = []; // Store student data
  errorMessage: string | null = null; // Store any error message
  loading: boolean = true; // Loading state to show/hide the loader
  selectedStudent: Student | null = null; // Store selected student details

  constructor(private studentsService: StudentsServiceService) {}

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

  // Fetch a student by admNo
  getStudentByAdmNo(admNo: string) {
    alert("He")
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
