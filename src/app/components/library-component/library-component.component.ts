import {Component} from '@angular/core';
import {LibraryService} from "../../services/library/library.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-library-component',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './library-component.component.html',
  styleUrl: './library-component.component.css'
})
export class LibraryComponentComponent {
  books: any[] = []; // Store book data
  errorMessage: string | null = null; // Store any error message
  loading: boolean = true; // Loading state to show/hide the loader

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  // Fetch books using the service
  fetchBooks() {
    this.libraryService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false; // Hide loader when data is fetched
      },
      error: (err) => {
        this.errorMessage = 'Error fetching books';
        this.loading = false; // Hide loader on error
        console.error(err);
      }
    });
  }
}
