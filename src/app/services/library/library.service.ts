import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = environment.library_api_base_url + '/library/books';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
  }

  getBooks(page: number, size: number): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, {headers}).subscribe({
          next: data => {
            observer.next(data);  // Emit the paginated response data
            observer.complete();  // Complete the observable
          },
          error: error => {
            observer.next(error);
          },
          complete: () => {// Emit the paginated response data
            observer.complete();  // Complete the observable
          }
        });
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }

  getBorrowedBooks(page: number, size: number): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.http.get<any>(`${this.apiUrl + "/borrowed"}?page=${page}&size=${size}`, {headers}).subscribe(
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

  // Create a new book
  createBook(book: { bookTitle: string, bookAuthor: string, bookIsbn: string }): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'  // Ensure we are sending JSON
        });
        this.http.post<any>(this.apiUrl + "/save", book, {headers}).subscribe({
          next: data => {
            observer.next(data);
          },
          error: error => {
            observer.next(error);
          },
          complete: () => {

          },
        });
      }).catch(error => {
        console.error("Error fetching token", error);
        observer.error(error);  // Pass token error to observer
      });
    });
  }

  // Issue a book to a user
  issueBook(issueData: { admNo: string, bookIsbn: string }): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'  // Ensure we are sending JSON
        });
        // Send POST request to issue the book
        this.http.post<any>(this.apiUrl + '/issue', issueData, {headers}).subscribe(
          data => {
            observer.next(data);  // Pass the response data to the observer
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


  // Return a book to a user
  returnBook(returnData: { admNo: string, bookIsbn: string }): Observable<any> {
    return new Observable(observer => {
      this.keycloakService.getToken().then(token => {
        // Set the Authorization header with the Bearer token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'  // Ensure we are sending JSON
        });
        // Send POST request to issue the book
        this.http.post<any>(this.apiUrl + '/return', returnData, {headers}).subscribe(
          data => {
            observer.next(data);  // Pass the response data to the observer
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
