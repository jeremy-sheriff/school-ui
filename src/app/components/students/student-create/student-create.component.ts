import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {StudentsServiceService} from "../../../services/students/students-service.service";
import {CoursesService} from "../../../services/courses/courses-service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Student} from "../../../interfaces/students/student";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  standalone: true,
  styleUrls: ['./student-create.component.css'],
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    NgIf
  ],
  providers: [StudentsServiceService]  // Add S
})
export class StudentCreateComponent {
  courses:any
  newStudent = {name:"",admNo:"",course:""}

  constructor(
    private studentsService: StudentsServiceService,  // Inject the service
    private router: Router,
    private coursesService: CoursesService,
  ) {

    this.coursesService.getUnPaginatedCourses().subscribe({
      next: (response:any) => {
        console.log("Hello")
        this.courses = response;
      },
      error: (err) => {},
    })
  }

/*  registerNewStudent() {
    if(this.newStudent.name!=="" && this.newStudent.admNo!=="" && this.newStudent.course!==""){
      this.newStudent = {
        name:this.newStudent.name,
        admNo:this.newStudent.admNo,
        course:this.newStudent.course,
      }

      // Call the service to post the student data
      this.studentsService.saveNewStudent(this.newStudent).subscribe(
        (response:any) => {
          console.log('Student saved successfully', response);
          this.router.navigate(['/students']);  // Navigate to the students list after successful save
        },
        (error:any) => {
          console.error('Error saving student', error);
        }
      );
    }
  }*/
}
