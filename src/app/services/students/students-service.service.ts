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

  private apiUrl = environment.students_api_base_url + '/students';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }




  // Method to get students with Keycloak token
  getStudents(page: number, size: number): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        // Append page and size parameters to the API request
        this.http.get<any>(`${this.apiUrl}/all?page=${page}&size=${size}`, { headers }).subscribe(
          data => {
            observer.next(data); // Emit the paginated response data
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
  deleteStudent(student: Student | undefined): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        // Make the delete request
        this.http.delete(`${this.apiUrl}/delete/student/${student?.id}`, { headers }).subscribe({
          next: (response) => {
            // Notify success
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            // Notify error
            observer.error(error);
          }
        });

      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Notify observer of the token fetch error
      });
    });
  }

  updateStudent(updatedStudent: Student) {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        // Make the delete request
        this.http.delete(`${this.apiUrl}/delete/student/${updatedStudent?.id}`, { headers }).subscribe({
          next: (response) => {
            // Notify success
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            // Notify error
            observer.error(error);
          }
        });

      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Notify observer of the token fetch error
      });
    });
  }
}
