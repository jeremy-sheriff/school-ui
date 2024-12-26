import { Injectable } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Course} from "../../interfaces/courses/course";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  newCourse = {name:"",departmentId:""}

  private apiUrl = environment.course_api_base_url+'/courses';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }



  getCourses(page: number, size: number){
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, { headers }).subscribe(
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

  getUnPaginatedCourses(){
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.get<any>(`${this.apiUrl}/un-paginated`, { headers }).subscribe(
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

  createCourse(newCourse: { name: string; departmentId: string }): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'  // Ensure we are sending JSON
        });
        this.http.post<Course>(`${this.apiUrl}/save`,newCourse, { headers }).subscribe(
          data => {
            observer.next(data);  // Emit the paginated response data
            observer.complete();  // Complete the observable
          },
          error => {
            observer.error(error);  // Pass any errors to the observer
          },
        );
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }

}
