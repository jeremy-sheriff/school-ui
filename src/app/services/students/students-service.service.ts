import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Student } from "../../interfaces/students/student";

@Injectable({
  providedIn: 'root'
})
export class StudentsServiceService {

  private apiUrl = environment.students_api_base_url + '/api/students';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  // Method to get students with Keycloak token
  getStudents(): Observable<Student> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        this.http.get<Student>(this.apiUrl+"/all", { headers }).subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }

  // Fetch a student by admNo
  getStudentByAdmNo(admNo: string): Observable<Student> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        this.http.get<Student>(`${this.apiUrl}/${admNo}`, { headers }).subscribe(
          data => {
            observer.next(data);  // Pass the data to the observer
            observer.complete();  // Complete the observable
          },
          error => {
            observer.error(error);  // Pass any errors to the observer
          }
        );
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }


// Save new student using Keycloak token
  saveNewStudent(studentData: any): Observable<Student> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        // Post to the backend
        this.http.post<Student>(`${this.apiUrl}/save`, studentData, { headers })
          .subscribe(
            (response) => {
              observer.next(response);  // Pass the response to the observer
              observer.complete();      // Complete the observable
            },
            (error) => {
              observer.error(error);  // Pass any errors to the observer
            }
          );
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }


  // Delete student using Keycloak token
  deleteNewStudent(student: Student | undefined): Observable<Student> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        this.http.delete<Student>(`${this.apiUrl}/delete/student/${student?.id}`, { headers }).subscribe()
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }
}
