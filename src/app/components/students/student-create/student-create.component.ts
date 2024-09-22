import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {StudentsServiceService} from "../../../services/students/students-service.service";


@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  standalone: true,
  styleUrls: ['./student-create.component.css'],
  imports: [
    ReactiveFormsModule
  ],
  providers: [StudentsServiceService]  // Add S
})
export class StudentCreateComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsServiceService,  // Inject the service
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      admNo: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;

      // Call the service to post the student data
      this.studentsService.saveNewStudent(studentData).subscribe(
        (response:any) => {
          console.log('Student saved successfully', response);
          this.router.navigate(['/students']);  // Navigate to the students list after successful save
        },
        (error:any) => {
          console.error('Error saving student', error);
        }
      );
    }
  }
}
