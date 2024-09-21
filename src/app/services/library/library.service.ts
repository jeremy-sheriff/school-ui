import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = environment.library_api_base_url+'/api/library/books';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }
  getBooks(): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
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
