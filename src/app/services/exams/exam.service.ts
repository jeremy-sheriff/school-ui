import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {Exam} from "../../interfaces/exams/exam";
import {ExamDto} from "../../interfaces/exams/exam-dto";

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private apiUrl = environment.exam_api_base_url+'/exams';
  private unitsUrl = environment.course_api_base_url+'/units';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {


  }


  getExams(page: number, size: number){
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, { headers }).subscribe({
          next: data => {

            observer.next(data);  // Emit the paginated response data
            observer.complete();
          },
          error: error => {
            observer.error(error);
          },
          complete: () => {}
          }
        );
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }

  getUnits(page: number, size: number){
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.get<any>(`${this.unitsUrl}?page=${page}&size=${size}`, { headers }).subscribe({
          next: data => {

            observer.next(data);  // Emit the paginated response data
            observer.complete();
          },
          error: error => {
            observer.error(error);
          },
          complete: () => {}
          }
        );
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }

  saveExam(exam:ExamDto) {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.post<any>(`${this.apiUrl}/save`,exam,{ headers }).subscribe({
          next: data => {
            this.getExams(0,10)
            observer.next(data);  // Emit the paginated response data
            observer.complete();
          },
          error: error => {
            observer.error(error);
          },
          complete: () => {}
          }
        );
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }

}
