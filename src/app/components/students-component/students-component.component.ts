import { Component, OnInit } from '@angular/core';
import { StudentsServiceService } from "../../services/students-service.service";
import { NgIf } from "@angular/common";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-students-component',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './students-component.component.html',
  styleUrls: ['./students-component.component.css']
})
export class StudentsComponentComponent implements OnInit {
  students: any[] = []; // Store student data
  errorMessage: string | null = null; // Store any error message
  loading: boolean = true; // Loading state to show/hide the loader

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
}
