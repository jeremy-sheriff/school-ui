import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentsServiceService} from "../../services/students/students-service.service";
import {Student} from "../../interfaces/students/student";

@Component({
  selector: 'app-student-detail-component',
  standalone: true,
  imports: [],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent {

  student: Student | null = null;
  admNo: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsServiceService
  ) { }

  ngOnInit(): void {
    // Get admNo from the route parameters
    this.admNo = this.route.snapshot.paramMap.get('admNo');

    if (this.admNo) {
      this.studentsService.getStudentByAdmNo(this.admNo).subscribe({
        next: (student: Student) => {
          this.student = student;
        },
        error: (err) => {
          this.errorMessage = 'Error fetching student details';
          console.error(err);
        }
      });
    }
  }
}
