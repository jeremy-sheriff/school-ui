import { Component, OnInit } from '@angular/core';
import {StudentsServiceService} from "../../services/students-service.service";
import {NgIf} from "@angular/common";
import {NgFor} from "@angular/common";
 // Adjust the path to your service

@Component({
  selector: 'app-students-component',
  standalone: true,
  imports: [
    NgIf,NgFor
  ],
  templateUrl: './students-component.component.html',
  styleUrls: ['./students-component.component.css']
})
export class StudentsComponentComponent implements OnInit {
  students: any[] = []; // Property to store the student data
  errorMessage: string | null = null; // Property to store any error message

  // Inject the service in the constructor
  constructor(private studentsService: StudentsServiceService) {}

  // Implement OnInit lifecycle hook to call the service when the component is initialized
  ngOnInit(): void {
    this.fetchStudents();
  }

  // Method to fetch students using the service
  fetchStudents() {
    this.studentsService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching students';
        console.error(err);
      }
    });
  }
}
