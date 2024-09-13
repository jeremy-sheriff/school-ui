import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'https://muhohodev.com/api/library/books';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  // Method to get students with Keycloak token
  getBooks(): Observable<any> {
    // Return the Observable directly
    return new Observable(observer => {
      // Use async/await inside the Observable's subscribe logic
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        // Make the HTTP GET request to the API
        this.http.get<any>(this.apiUrl, { headers }).subscribe(
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
}
