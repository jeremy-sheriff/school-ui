import { Component, OnInit } from '@angular/core'
import {LibraryService} from "../../../services/library/library.service";
import {NgForOf, NgIf} from "@angular/common";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  borrowedBooks: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  page: number = 0;
  size: number = 10;
  totalPages: number = 1;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  loadBorrowedBooks(): void {
    this.libraryService.getBorrowedBooks(this.page, this.size).subscribe(
      (response) => {
        this.borrowedBooks = response.content; // Assuming response.data contains the borrowed books
        this.totalPages = response.totalPages; // Assuming the API provides total pages
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading borrowed books.';
        this.loading = false;
      }
    );
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.loadBorrowedBooks();
  }

  // Method to copy ISBN to clipboard
  copyToClipboard(isbn: string): void {
    navigator.clipboard.writeText(isbn).then(() => {
      // alert('ISBN copied to clipboard!'); // Show a success message
    }).catch(err => {
      console.error('Could not copy text: ', err); // Handle error
    });
  }

  protected readonly faClipboard = faClipboard;
}
