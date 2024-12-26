import { Component } from '@angular/core';
import {ExamService} from "../../services/exams/exam.service";
import {Exam} from "../../interfaces/exams/exam";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faGraduationCap,faClipboard} from "@fortawesome/free-solid-svg-icons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Unit} from "../../interfaces/units/unit";

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FaIconComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent {

  exams: Exam [] = []
  units: Unit [] = []
  loading: boolean = false
  loadingUnits: boolean = false
  showModal: boolean = false; // State to control the modal visibility
  isClosing = false;
  creatingExam = false;
  exam = { admNo: '', semester: '',assessmentType:"",score:"",unit:""};

  page = 0; // Current page index
  size = 10; // Page size
  totalPages = 1; // Total number of pages
  totalElements = 0; // Total number of courses


  constructor(
    private examService: ExamService,
  ) {
    this.getExams(this.page,this.size)
  }



  getUnits(page: number, size: number) {
    this.loadingUnits = true;
    this.examService.getUnits(page, size).subscribe({
      next: (response:any) => {
        console.log(response);
        this.loadingUnits = false;
        this.units = response;
      },
      error: (err) => {
        this.loadingUnits = false;
      }
    })
  }

  getExams(page: number, size: number) {
    this.loading = true;
    this.examService.getExams(page, size).subscribe({
      next: (response:any) => {
        console.log(response);
        this.loading = false;
        this.exams = response;
      },
      error: (err) => {
        this.loading = false;
      }
    })
  }

  createExamRecord(){
    if (this.exam.admNo && this.exam.semester && this.exam.assessmentType  && this.exam.score && this.exam.unit) {
      this.loading = true;
      let exam = {
        admNo: this.exam.admNo.toString(),
        semester: this.exam.semester.toString(),
        assessmentType: parseInt(this.exam.assessmentType),
        score: parseInt(this.exam.score),
        unit: this.exam.unit,
      }
      this.examService.saveExam(exam).subscribe({
        next:(response:any) => {
            this.getExams(1,10)
          this.creatingExam = false;
          this.loading = false;
          this.closeModal()
        },
        error: (err) => {
          this.loading = false;
          alert("Error saving exam record");
        }
      })
    }
  }

  protected readonly faCourses = faGraduationCap;
  protected readonly faExams = faClipboard;

  // Open modal to create a book
  openModal() {
    this.getUnits(this.page,this.size);
    this.showModal = true;
  }

  closeModal() {
    this.isClosing = true;  // Start the closing animation
    setTimeout(() => {
      this.showModal = false;  // Hide the modal after the animation
      this.isClosing = false;  // Reset the closing state
      this.exam = { admNo: '', semester: '',assessmentType:"",score:"",unit: ""}; // Reset the form
    }, 500);  // Match the duration of your closing animation (0.5s)
  }
}
