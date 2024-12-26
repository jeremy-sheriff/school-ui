import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../environments/environment";
import {Course} from "../../interfaces/courses/course";
import {Department} from "../../interfaces/departments/department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = environment.course_api_base_url + '/departments';

  page = 0; // Current page index
  size = 10; // Page size
  totalPages = 1; // Total number of pages
  totalElements = 0; // Total number of students

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    this.getDepartments(this.page,this.size)
  }


  createDepartment(department: { id:number,name: string;}): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'  // Ensure we are sending JSON
        });
        try {
          this.http.post<Department>(`${this.apiUrl}/save`,department, { headers }).subscribe(
            data => {
              observer.next(data);  // Emit the paginated response data
              observer.complete();  // Complete the observable
            },
            error => {
              observer.error(error);  // Pass any errors to the observer
            },
          );
        }catch (error) {
          console.log(error);
        }
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }


  getDepartments(page: number, size: number) {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, {headers}).subscribe(
          data => {
            observer.next(data);  // Emit the paginated response data
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
}
